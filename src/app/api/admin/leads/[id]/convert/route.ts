import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session-server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";

// -----------------------------------------------------------------------
// POST /api/admin/leads/[id]/convert
//
// Turns a lead into a real customer (and vehicle, if it has a plate),
// following the same find-or-create-by-phone / find-or-create-by-plate
// dedupe pattern already used by /api/booking and /api/admin/customers —
// a lead whose phone matches an existing customer attaches to that
// customer rather than creating a duplicate.
//
// Requires the lead to have both a name and a phone number, same as the
// "Add New Customer" flow's own requirement — a customer record needs
// something to call them and someone to call. Leads missing either simply
// don't show a Convert button on the admin page rather than hitting this
// route and failing; this route re-checks anyway rather than trusting the
// client.
// -----------------------------------------------------------------------

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  const { id } = await params;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Not connected to the database yet." }, { status: 503 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Not connected to the database yet." }, { status: 503 });
  }

  const { data: lead, error: leadErr } = await supabase
    .from("leads")
    .select("id, name, plate, phone, email, status")
    .eq("id", id)
    .maybeSingle();

  if (leadErr) {
    console.error("[admin-leads-convert] lookup failed", leadErr);
    return NextResponse.json({ error: "Couldn't load this lead — try again." }, { status: 500 });
  }
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
  if (!lead.name || !lead.phone) {
    return NextResponse.json(
      { error: "This lead needs a name and a phone number before it can become a customer." },
      { status: 400 }
    );
  }

  const { data: existingCustomer, error: findCustomerErr } = await supabase
    .from("customers")
    .select("id")
    .eq("phone", lead.phone)
    .maybeSingle();
  if (findCustomerErr) {
    console.error("[admin-leads-convert] customer lookup failed", findCustomerErr);
    return NextResponse.json({ error: "Something went wrong — try again." }, { status: 500 });
  }

  let customerId: string;
  if (existingCustomer) {
    customerId = existingCustomer.id;
  } else {
    const { data: newCustomer, error: createCustomerErr } = await supabase
      .from("customers")
      .insert({ name: lead.name, phone: lead.phone, email: lead.email })
      .select("id")
      .single();
    if (createCustomerErr || !newCustomer) {
      console.error("[admin-leads-convert] create customer failed", createCustomerErr);
      return NextResponse.json({ error: "Couldn't create the customer — try again." }, { status: 500 });
    }
    customerId = newCustomer.id;
  }

  if (lead.plate) {
    const { data: existingVehicle, error: findVehicleErr } = await supabase
      .from("vehicles")
      .select("id")
      .eq("plate", lead.plate)
      .maybeSingle();
    if (findVehicleErr) {
      console.error("[admin-leads-convert] vehicle lookup failed", findVehicleErr);
    } else if (!existingVehicle) {
      const { error: createVehicleErr } = await supabase
        .from("vehicles")
        .insert({ customer_id: customerId, plate: lead.plate });
      if (createVehicleErr) {
        // Not fatal — the customer record already exists at this point;
        // the vehicle can be added by hand from the customer record.
        console.error("[admin-leads-convert] create vehicle failed", createVehicleErr);
      }
    }
  }

  const { error: updateErr } = await supabase
    .from("leads")
    .update({ status: "booked", customer_id: customerId })
    .eq("id", id);
  if (updateErr) {
    console.error("[admin-leads-convert] lead update failed", updateErr);
    return NextResponse.json({ error: "Customer created, but couldn't update the lead." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, customerId });
}
