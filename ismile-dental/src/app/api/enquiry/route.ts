import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Appointment request / contact enquiry endpoint.
//
// Current behaviour: validates the payload and logs it server-side (visible
// in Vercel's function logs), then emails the practice if RESEND_API_KEY and
// ENQUIRY_NOTIFY_EMAIL are set. There is deliberately no database yet —
// enquiries contain personal data about health care, so persistence should
// be added only alongside a decision about where that data lives, who can
// see it, and how long it is kept (UK GDPR Art. 9 special category data).
//
// To turn on email notifications, set both env vars in Vercel:
//   RESEND_API_KEY         — from https://resend.com
//   ENQUIRY_NOTIFY_EMAIL   — the practice inbox that should receive them
// Until then this route validates, logs and returns ok, so the form still
// works end to end in a preview deployment.
// ---------------------------------------------------------------------------

type EnquiryPayload = {
  type?: "booking" | "contact";
  name?: string;
  phone?: string;
  email?: string;
  patientType?: string;
  careType?: string;
  treatment?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  nervous?: string;
  consent?: string;
};

export async function POST(request: Request) {
  let body: EnquiryPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const required: (keyof EnquiryPayload)[] = ["name", "phone"];
  const missing = required.filter((key) => !body[key]?.toString().trim());

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  if (!body.consent) {
    return NextResponse.json(
      { error: "Consent to be contacted is required" },
      { status: 400 }
    );
  }

  // Structured log — visible in Vercel function logs, and the only record of
  // this enquiry until the email notification below is configured.
  console.log("[enquiry]", { ...body, receivedAt: new Date().toISOString() });

  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.ENQUIRY_NOTIFY_EMAIL;

  if (resendKey && notifyEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "iSmile Dental Practice Website <enquiries@resend.dev>",
          to: [notifyEmail],
          subject:
            body.type === "contact"
              ? `Website enquiry — ${body.name}`
              : `Appointment request — ${body.name} (${body.treatment || "unspecified"})`,
          text: formatEnquiry(body),
        }),
      });
    } catch (err) {
      // Don't fail the patient's request just because the notification email
      // bounced — the structured log above already captured it.
      console.error("[enquiry] email notification failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}

function formatEnquiry(body: EnquiryPayload): string {
  const lines = [
    `Type: ${body.type === "contact" ? "General enquiry" : "Appointment request"}`,
    `Name: ${body.name}`,
    `Phone: ${body.phone}`,
    `Email: ${body.email || "not given"}`,
  ];

  if (body.type !== "contact") {
    lines.push(
      `Patient: ${body.patientType || "not given"}`,
      `NHS/private: ${body.careType || "not given"}`,
      `Treatment: ${body.treatment || "not given"}`,
      `Preferred: ${body.preferredDate || "no date"} — ${body.preferredTime || "any time"}`,
      `Nervous patient: ${body.nervous ? "yes — allow extra time" : "no"}`
    );
  }

  lines.push(`Notes: ${body.message?.trim() || "none"}`);
  return lines.join("\n");
}
