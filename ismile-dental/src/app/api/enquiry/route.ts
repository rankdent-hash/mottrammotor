import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Enquiry endpoint — the native replacement for the JotForm iframe.
//
// compliance.md §5: the old form delivered health-related enquiry data to a
// free Yahoo consumer inbox. Before launch this needs a business-domain
// destination, a privacy notice, explicit consent (captured here) and a
// defined retention position.
//
// There is deliberately no database. An enquiry from a dental patient is
// health-adjacent personal data, so persistence needs a decision about where
// it lives, who can read it and how long it is kept — not a default.
//
// Set both to turn on notifications:
//   RESEND_API_KEY        — from https://resend.com
//   ENQUIRY_NOTIFY_EMAIL  — the practice's business-domain inbox
// Until then the route validates, logs and returns ok, so the form works end
// to end in a preview deployment.
// ---------------------------------------------------------------------------

type EnquiryPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  interest?: string;
  callTime?: string;
  consent?: string;
  /** The page slug the enquiry came from. */
  source?: string;
};

export async function POST(request: Request) {
  let body: EnquiryPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const missing = (["name", "phone"] as const).filter(
    (key) => !body[key]?.toString().trim()
  );
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
          subject: `Website enquiry — ${body.name}`,
          text: [
            `Name: ${body.name}`,
            `Phone: ${body.phone}`,
            `Email: ${body.email ?? "not given"}`,
            `Enquiring about: ${body.interest ?? "not given"}`,
            `Best time to call: ${body.callTime ?? "not given"}`,
            `Page: ${body.source ?? "unknown"}`,
            "",
            `Message: ${body.message?.trim() || "none"}`,
          ].join("\n"),
        }),
      });
    } catch (err) {
      // Never fail the patient's enquiry because the notification bounced —
      // the log line above already captured it.
      console.error("[enquiry] notification email failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
