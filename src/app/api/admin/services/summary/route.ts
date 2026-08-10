import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session-server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { SERVICES } from "@/lib/services";

// -----------------------------------------------------------------------
// GET /api/admin/services/summary
//
// Backs the admin Services tab: for every service in the canonical
// SERVICES list (src/lib/services.ts), how many open jobs, completed
// jobs, and interested new leads there are right now. Gives staff a
// glance across everything the garage does, not just the MOT-centric
// tiles the dashboard already has (Today's Bookings, MOT Due Soon) — a
// tyre-only or servicing-only day shows up here too.
//
// One query per service rather than a single grouped query — Supabase's
// JS client doesn't have a clean `group by` helper, and with 7 services
// and a single-garage volume of rows this is simple and fast enough
// (all fired in parallel via Promise.all).
// -----------------------------------------------------------------------

export async function GET() {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ configured: false, services: [] });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ configured: false, services: [] });
  }

  const results = await Promise.all(
    SERVICES.map(async (name) => {
      const [openRes, completedRes, leadsRes] = await Promise.all([
        supabase
          .from("bookings")
          .select("id", { count: "exact", head: true })
          .eq("service_type", name)
          .in("status", ["requested", "confirmed"]),
        supabase
          .from("bookings")
          .select("id", { count: "exact", head: true })
          .eq("service_type", name)
          .eq("status", "completed"),
        supabase
          .from("leads")
          .select("id", { count: "exact", head: true })
          .eq("service_interest", name)
          .eq("status", "new"),
      ]);

      return {
        name,
        openBookings: openRes.count ?? 0,
        completedBookings: completedRes.count ?? 0,
        newLeads: leadsRes.count ?? 0,
        hadError: Boolean(openRes.error || completedRes.error || leadsRes.error),
      };
    })
  );

  const anyError = results.some((r) => r.hadError);
  if (anyError) {
    console.error("[admin-services-summary] one or more counts failed", results);
  }

  return NextResponse.json({
    configured: true,
    services: results.map(({ name, openBookings, completedBookings, newLeads }) => ({
      name,
      openBookings,
      completedBookings,
      newLeads,
    })),
  });
}
