import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session-server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { computeMotStatus, daysFromNowIso, todayIso } from "@/lib/admin-format";

// GET /api/admin/vehicles/mot-due-soon — vehicles whose MOT is due within
// the next 30 days, backing the dashboard's "MOT Due Soon" tile.
const MOT_DUE_SOON_DAYS = 30;

type CustomerRef = { name: string; phone: string | null } | { name: string; phone: string | null }[] | null;

function customerInfo(customer: CustomerRef): { name: string; phone: string } {
  const c = Array.isArray(customer) ? customer[0] : customer;
  return { name: c?.name ?? "Unknown", phone: c?.phone ?? "" };
}

export async function GET() {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ configured: false, vehicles: [] });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ configured: false, vehicles: [] });
  }

  const { data, error } = await supabase
    .from("vehicles")
    .select("id, plate, make, model, mot_due_date, customer_id, customers(name, phone)")
    .gte("mot_due_date", todayIso())
    .lte("mot_due_date", daysFromNowIso(MOT_DUE_SOON_DAYS))
    .order("mot_due_date", { ascending: true })
    .limit(200);

  if (error) {
    console.error("[admin-mot-due-soon] query failed", error);
    return NextResponse.json({ error: "Couldn't load vehicles" }, { status: 500 });
  }

  const vehicles = (data ?? []).map((v) => {
    const { name, phone } = customerInfo(v.customers as CustomerRef);
    const mot = computeMotStatus(v.mot_due_date);
    return {
      id: v.id,
      plate: v.plate,
      make: v.make ?? "",
      model: v.model ?? "",
      motStatus: mot.status,
      motDueLabel: mot.label,
      customerId: v.customer_id,
      customerName: name,
      phone,
    };
  });

  return NextResponse.json({ configured: true, vehicles });
}
