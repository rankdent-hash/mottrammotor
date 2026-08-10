import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session-server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { formatDateLabel, todayIso } from "@/lib/admin-format";

// -----------------------------------------------------------------------
// GET /api/admin/bookings?scope=today|all
//
// Backs both the "Today's Bookings" and "All Jobs" dashboard tiles — same
// data, different filter. `scope=today` (used by "Today's Bookings")
// returns only today's non-cancelled bookings, sorted by time; the default
// (`all`, used by "All Jobs") returns everything, for the page to group by
// status. A minimal list, not the fuller drag-and-drop job board scoped
// for a later phase.
// -----------------------------------------------------------------------

type CustomerRef = { name: string } | { name: string }[] | null;
type VehicleRef = { plate: string } | { plate: string }[] | null;

function customerName(customer: CustomerRef): string {
  if (!customer) return "Unknown";
  return Array.isArray(customer) ? (customer[0]?.name ?? "Unknown") : customer.name;
}

function vehiclePlate(vehicle: VehicleRef): string | null {
  if (!vehicle) return null;
  return Array.isArray(vehicle) ? (vehicle[0]?.plate ?? null) : vehicle.plate;
}

export async function GET(request: Request) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ configured: false, bookings: [] });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ configured: false, bookings: [] });
  }

  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope") === "today" ? "today" : "all";

  let query = supabase
    .from("bookings")
    .select("id, service_type, requested_date, requested_time, status, customers(name), vehicles(plate)")
    .order("requested_date", { ascending: true, nullsFirst: false })
    .order("requested_time", { ascending: true, nullsFirst: false });

  if (scope === "today") {
    query = query.eq("requested_date", todayIso()).neq("status", "cancelled");
  }

  const { data, error } = await query.limit(200);

  if (error) {
    console.error("[admin-bookings] query failed", error);
    return NextResponse.json({ error: "Couldn't load bookings" }, { status: 500 });
  }

  const bookings = (data ?? []).map((b) => ({
    id: b.id,
    customerName: customerName(b.customers as CustomerRef),
    plate: vehiclePlate(b.vehicles as VehicleRef),
    serviceType: b.service_type,
    dateLabel: b.requested_date ? formatDateLabel(b.requested_date) : "No date set",
    time: b.requested_time ?? null,
    status: b.status as "requested" | "confirmed" | "completed" | "cancelled",
  }));

  return NextResponse.json({ configured: true, bookings });
}
