import { NextResponse } from "next/server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";

// -----------------------------------------------------------------------
// Booking request endpoint.
//
// Current behaviour: validates the payload, logs it server-side (visible in
// Vercel's function logs) and — once Supabase is configured — persists it
// as a customer + vehicle + booking row. This is still a placeholder for
// the fuller CRM integration (Phase 3 of the build plan):
//   - real staff-facing job/diary tracking (booked -> in progress -> ...)
//   - SMS reminders and automated MOT/service follow-ups
//
// To wire up email notifications, set RESEND_API_KEY and
// BOOKING_NOTIFY_EMAIL env vars in Vercel — this route sends a
// notification automatically once both are present.
//
// To wire up database persistence, set SUPABASE_URL and
// SUPABASE_SERVICE_ROLE_KEY in Vercel (see src/lib/supabase.ts and
// supabase/schema.sql) — this route starts writing customers/vehicles/
// bookings automatically once both are present. Until then, isSupabaseConfigured()
// is false and this route behaves exactly as it did before: validate, log,
// maybe email.
// -----------------------------------------------------------------------

type BookingPayload = {
  reg?: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  smsConsent?: string;
};

export async function POST(request: Request) {
  let body: BookingPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const required: (keyof BookingPayload)[] = ["reg", "service", "name", "phone"];
  const missing = required.filter((key) => !body[key]?.toString().trim());

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  // Structured log — visible in Vercel function logs, and the only record
  // of this request until Supabase is configured below.
  console.log("[booking-request]", {
    ...body,
    receivedAt: new Date().toISOString(),
  });

  if (isSupabaseConfigured()) {
    try {
      await persistBooking(body);
    } catch (err) {
      // A database failure shouldn't stop the customer's request from
      // going through — the log line above already captured it, and the
      // email notification below (if configured) still fires. Same
      // tolerate-and-log approach as the Resend block below.
      console.error("[booking-request] Supabase persistence failed", err);
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
          subject: `New booking request — ${body.reg} (${body.service})`,
          text: [
            `Registration: ${body.reg}`,
            `Service: ${body.service}`,
            `Preferred date/time: ${body.preferredDate ?? "n/a"} ${body.preferredTime ?? ""}`,
            `Name: ${body.name}`,
            `Phone: ${body.phone}`,
            `Email: ${body.email ?? "n/a"}`,
            `SMS/email consent: ${body.smsConsent ? "yes" : "no"}`,
            `Notes: ${body.message ?? "n/a"}`,
          ].join("\n"),
        }),
      });
    } catch (err) {
      console.error("[booking-request] email notification failed", err);
      // Don't fail the booking just because the email failed to send.
    }
  }

  return NextResponse.json({ ok: true });
}

// Writes the booking to Supabase: find-or-create the customer (matched by
// phone, which is a required field), find-or-create the vehicle (matched
// by plate, linked to that customer), then insert the booking row itself.
// Throws on failure — the caller (POST above) is responsible for catching
// and logging rather than failing the request.
async function persistBooking(body: BookingPayload): Promise<void> {
  const supabase = getSupabaseAdmin();
  // isSupabaseConfigured() already passed by the time this is called, so
  // this should always be non-null — but treat it the same way as "not
  // configured" rather than throwing, just in case.
  if (!supabase) return;

  const phone = body.phone!.trim();
  const plate = body.reg!.trim().toUpperCase().replace(/\s+/g, "");

  const { data: existingCustomer, error: findCustomerError } = await supabase
    .from("customers")
    .select("id")
    .eq("phone", phone)
    .maybeSingle();
  if (findCustomerError) throw findCustomerError;

  let customerId: string;
  if (existingCustomer) {
    customerId = (existingCustomer as { id: string }).id;
  } else {
    const { data: newCustomer, error: createCustomerError } = await supabase
      .from("customers")
      .insert({
        name: body.name,
        phone,
        email: body.email?.trim() || null,
        marketing_consent: Boolean(body.smsConsent),
      })
      .select("id")
      .single();
    if (createCustomerError || !newCustomer) {
      throw createCustomerError ?? new Error("Failed to create customer record");
    }
    customerId = (newCustomer as { id: string }).id;
  }

  const { data: existingVehicle, error: findVehicleError } = await supabase
    .from("vehicles")
    .select("id")
    .eq("plate", plate)
    .maybeSingle();
  if (findVehicleError) throw findVehicleError;

  let vehicleId: string;
  if (existingVehicle) {
    vehicleId = (existingVehicle as { id: string }).id;
  } else {
    const { data: newVehicle, error: createVehicleError } = await supabase
      .from("vehicles")
      .insert({ customer_id: customerId, plate })
      .select("id")
      .single();
    if (createVehicleError || !newVehicle) {
      throw createVehicleError ?? new Error("Failed to create vehicle record");
    }
    vehicleId = (newVehicle as { id: string }).id;
  }

  const { error: bookingError } = await supabase.from("bookings").insert({
    customer_id: customerId,
    vehicle_id: vehicleId,
    service_type: body.service,
    requested_date: body.preferredDate || null,
    requested_time: body.preferredTime || null,
    message: body.message?.trim() || null,
    sms_email_consent: Boolean(body.smsConsent),
    status: "requested",
  });
  if (bookingError) throw bookingError;
}
