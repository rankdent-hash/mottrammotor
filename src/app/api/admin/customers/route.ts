import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session-server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";

// -----------------------------------------------------------------------
// POST /api/admin/customers  { name, phone, email?, plate?, make?, model?,
//                               year?, colour?, motDueDate? }
//
// Powers the "Add New Customer" flow (admin-panel-plan.md §6). Name and
// phone are required; the rest — including the vehicle fields, normally
// filled in from a DVLA plate lookup on the client via the existing
// /api/vehicle-lookup route — are optional.
//
// Duplicate detection: an existing customer with the same phone, or an
// existing vehicle with the same plate, both count as "this person is
// probably already in the system" — rather than silently creating a
// duplicate, this returns 409 with the existing customer's id so the page
// can offer "already exists, view record" instead of a generic error.
// -----------------------------------------------------------------------

type NewCustomerPayload = {
  name?: string;
  phone?: string;
  email?: string;
  plate?: string;
  make?: string;
  model?: string;
  year?: number;
  colour?: string;
  motDueDate?: string;
};

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  let body: NewCustomerPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const plate = body.plate?.trim().toUpperCase().replace(/\s+/g, "") || null;

  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Not connected to the database yet — SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY need to be set." },
      { status: 503 }
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Not connected to the database yet." },
      { status: 503 }
    );
  }

  const { data: existingByPhone, error: phoneErr } = await supabase
    .from("customers")
    .select("id, name")
    .eq("phone", phone)
    .maybeSingle();
  if (phoneErr) {
    console.error("[admin-customers] phone dedupe check failed", phoneErr);
    return NextResponse.json({ error: "Something went wrong — try again." }, { status: 500 });
  }
  if (existingByPhone) {
    return NextResponse.json(
      {
        error: "A customer with this phone number already exists.",
        existingCustomerId: existingByPhone.id,
        existingCustomerName: existingByPhone.name,
      },
      { status: 409 }
    );
  }

  if (plate) {
    const { data: existingVehicle, error: plateErr } = await supabase
      .from("vehicles")
      .select("id, customer_id")
      .eq("plate", plate)
      .maybeSingle();
    if (plateErr) {
      console.error("[admin-customers] plate dedupe check failed", plateErr);
      return NextResponse.json({ error: "Something went wrong — try again." }, { status: 500 });
    }
    if (existingVehicle) {
      const { data: existingCustomer } = await supabase
        .from("customers")
        .select("id, name")
        .eq("id", existingVehicle.customer_id)
        .maybeSingle();
      return NextResponse.json(
        {
          error: "A vehicle with this plate is already linked to another customer.",
          existingCustomerId: existingVehicle.customer_id,
          existingCustomerName: existingCustomer?.name,
        },
        { status: 409 }
      );
    }
  }

  const { data: newCustomer, error: createErr } = await supabase
    .from("customers")
    .insert({ name, phone, email: body.email?.trim() || null })
    .select("id")
    .single();
  if (createErr || !newCustomer) {
    console.error("[admin-customers] create customer failed", createErr);
    return NextResponse.json({ error: "Couldn't create the customer — try again." }, { status: 500 });
  }

  if (plate) {
    const { error: vehicleErr } = await supabase.from("vehicles").insert({
      customer_id: newCustomer.id,
      plate,
      make: body.make?.trim() || null,
      model: body.model?.trim() || null,
      year: body.year ?? null,
      colour: body.colour?.trim() || null,
      mot_due_date: body.motDueDate || null,
    });
    if (vehicleErr) {
      // The customer record already exists at this point — not fatal
      // enough to fail the whole request. Logged for visibility; the
      // vehicle can be added from the customer record afterwards (vehicle
      // editing on an existing customer is out of scope for this pass).
      console.error("[admin-customers] create vehicle failed", vehicleErr);
    }
  }

  return NextResponse.json({ ok: true, customerId: newCustomer.id }, { status: 201 });
}
