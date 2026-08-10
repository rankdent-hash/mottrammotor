import { NextResponse } from "next/server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";

// -----------------------------------------------------------------------
// POST /api/leads — the Contact page's submission endpoint.
//
// Mirrors /api/booking's shape (validate, log, persist-if-configured,
// email-if-configured) but writes to `leads` instead of `bookings` — see
// supabase/schema.sql's comment on the leads table for why the two are
// kept separate. Same honesty principle as the rest of this codebase: a
// database failure is logged and swallowed rather than failing the
// customer's request (the log line is still a record of it), and no
// insecure/fake success is invented when Supabase isn't configured.
// -----------------------------------------------------------------------

type LeadPayload = {
  name?: string;
  plate?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = body.name?.trim() || null;
  const plate = body.plate?.trim().toUpperCase().replace(/\s+/g, "") || null;
  const phone = body.phone?.trim() || null;
  const email = body.email?.trim() || null;

  if (!name && !plate) {
    return NextResponse.json(
      { error: "A name or a vehicle registration is required" },
      { status: 400 }
    );
  }
  if (!phone && !email) {
    return NextResponse.json(
      { error: "A phone number or an email address is required" },
      { status: 400 }
    );
  }

  console.log("[lead-submission]", {
    ...body,
    receivedAt: new Date().toISOString(),
  });

  if (isSupabaseConfigured()) {
    try {
      await persistLead({ name, plate, phone, email, body });
    } catch (err) {
      console.error("[lead-submission] Supabase persistence failed", err);
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.BOOKING_NOTIFY_EMAIL;

  if (resendKey && notifyEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Mottram Motor Garage Website <bookings@resend.dev>",
          to: [notifyEmail],
          subject: `New website enquiry${name ? ` — ${name}` : plate ? ` — ${plate}` : ""}`,
          text: [
            `Name: ${name ?? "n/a"}`,
            `Registration: ${plate ?? "n/a"}`,
            `Phone: ${phone ?? "n/a"}`,
            `Email: ${email ?? "n/a"}`,
            `Interested in: ${body.service ?? "n/a"}`,
            `Message: ${body.message ?? "n/a"}`,
          ].join("\n"),
        }),
      });
    } catch (err) {
      console.error("[lead-submission] email notification failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}

async function persistLead({
  name,
  plate,
  phone,
  email,
  body,
}: {
  name: string | null;
  plate: string | null;
  phone: string | null;
  email: string | null;
  body: LeadPayload;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const { error } = await supabase.from("leads").insert({
    name,
    plate,
    phone,
    email,
    service_interest: body.service?.trim() || null,
    message: body.message?.trim() || null,
    source: "contact_form",
    status: "new",
  });
  if (error) throw error;
}
