import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session-server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { formatFollowUpDue, todayIso } from "@/lib/admin-format";

// GET /api/admin/follow-ups — open follow-ups due today or overdue, i.e.
// exactly the set the dashboard's "Follow-ups Due" tile counts (see
// admin-panel-plan.md: "anything overdue or due today"). Backs the
// /admin/follow-ups list page that tile links to.
type CustomerRef = { name: string } | { name: string }[] | null;

function customerName(customer: CustomerRef): string {
  if (!customer) return "Unknown";
  return Array.isArray(customer) ? (customer[0]?.name ?? "Unknown") : customer.name;
}

export async function GET() {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ configured: false, followUps: [] });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ configured: false, followUps: [] });
  }

  const { data, error } = await supabase
    .from("follow_ups")
    .select("id, due_date, note, customer_id, customers(name)")
    .eq("status", "open")
    .lte("due_date", todayIso())
    .order("due_date", { ascending: true })
    .limit(200);

  if (error) {
    console.error("[admin-follow-ups-due] query failed", error);
    return NextResponse.json({ error: "Couldn't load follow-ups" }, { status: 500 });
  }

  const followUps = (data ?? []).map((f) => {
    const due = formatFollowUpDue(f.due_date);
    return {
      id: f.id,
      customerId: f.customer_id,
      customerName: customerName(f.customers as CustomerRef),
      title: f.note || "Follow-up",
      dueLabel: due.label,
      urgency: due.urgency,
    };
  });

  return NextResponse.json({ configured: true, followUps });
}
