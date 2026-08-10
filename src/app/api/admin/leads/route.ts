import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session-server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { formatNoteTimestamp } from "@/lib/admin-format";

// -----------------------------------------------------------------------
// GET /api/admin/leads
//
// Backs the admin Leads tab — every lead, newest first, so the page can
// group them by status client-side the same way AdminBookingsClient
// groups "All Jobs" by status. Not paginated/filtered server-side yet
// (matches the same 200-row cap the bookings/follow-ups routes use) —
// fine for a single-garage volume of enquiries.
// -----------------------------------------------------------------------

export async function GET() {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ configured: false, leads: [] });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ configured: false, leads: [] });
  }

  const { data, error } = await supabase
    .from("leads")
    .select(
      "id, name, plate, phone, email, service_interest, message, source, status, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    console.error("[admin-leads] query failed", error);
    return NextResponse.json({ error: "Couldn't load leads" }, { status: 500 });
  }

  const leads = (data ?? []).map((l) => ({
    id: l.id,
    name: l.name,
    plate: l.plate,
    phone: l.phone,
    email: l.email,
    serviceInterest: l.service_interest,
    message: l.message,
    source: l.source as "contact_form" | "phone" | "walk_in" | "other",
    status: l.status as "new" | "contacted" | "booked" | "lost",
    createdLabel: formatNoteTimestamp(l.created_at),
  }));

  return NextResponse.json({ configured: true, leads });
}
