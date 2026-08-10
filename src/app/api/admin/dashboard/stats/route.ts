import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session-server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { daysFromNowIso, todayIso } from "@/lib/admin-format";

// -----------------------------------------------------------------------
// GET /api/admin/dashboard/stats
//
// Powers the dashboard tile counts. `configured: false` (counts all null)
// when Supabase isn't set up — the dashboard shows a neutral "—"/"not
// connected" state for that rather than a fake zero, same honesty
// principle as the rest of this codebase.
// -----------------------------------------------------------------------

const MOT_DUE_SOON_DAYS = 30;

export async function GET() {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      configured: false,
      todaysBookings: null,
      followUpsDue: null,
      motDueSoon: null,
      newLeads: null,
    });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({
      configured: false,
      todaysBookings: null,
      followUpsDue: null,
      motDueSoon: null,
      newLeads: null,
    });
  }

  const today = todayIso();
  const in30Days = daysFromNowIso(MOT_DUE_SOON_DAYS);

  const [bookingsRes, followUpsRes, motRes, leadsRes] = await Promise.all([
    supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("requested_date", today)
      .neq("status", "cancelled"),
    supabase
      .from("follow_ups")
      .select("id", { count: "exact", head: true })
      .eq("status", "open")
      .lte("due_date", today),
    supabase
      .from("vehicles")
      .select("id", { count: "exact", head: true })
      .gte("mot_due_date", today)
      .lte("mot_due_date", in30Days),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  if (bookingsRes.error || followUpsRes.error || motRes.error || leadsRes.error) {
    console.error(
      "[admin-dashboard-stats] query failed",
      bookingsRes.error,
      followUpsRes.error,
      motRes.error,
      leadsRes.error
    );
    return NextResponse.json({
      configured: true,
      todaysBookings: null,
      followUpsDue: null,
      motDueSoon: null,
      newLeads: null,
      error: "Some counts failed to load",
    });
  }

  return NextResponse.json({
    configured: true,
    todaysBookings: bookingsRes.count ?? 0,
    followUpsDue: followUpsRes.count ?? 0,
    motDueSoon: motRes.count ?? 0,
    newLeads: leadsRes.count ?? 0,
  });
}
