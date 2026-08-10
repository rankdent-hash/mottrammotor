import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session-server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import {
  computeMotStatus,
  computeServiceLabel,
  formatDateLabel,
  formatFollowUpDue,
  formatNoteTimestamp,
} from "@/lib/admin-format";

// -----------------------------------------------------------------------
// GET /api/admin/customers/[id]
//
// Full customer record: customer fields, all vehicles, notes (newest
// first), follow-ups, and history. There's no separate "job history"
// table yet, so `bookings` rows with status `completed` are the closest
// real analogue for now — it's expected/fine for this to be sparse or
// empty, since nothing's been marked completed yet.
// -----------------------------------------------------------------------

type StaffRef = { name: string } | { name: string }[] | null;

function staffName(staff: StaffRef): string | undefined {
  if (!staff) return undefined;
  return Array.isArray(staff) ? staff[0]?.name : staff.name;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  const { id } = await params;

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Not connected to the database yet.", configured: false },
      { status: 503 }
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Not connected to the database yet.", configured: false },
      { status: 503 }
    );
  }

  const { data: customer, error: customerErr } = await supabase
    .from("customers")
    .select("id, name, phone, email")
    .eq("id", id)
    .maybeSingle();

  if (customerErr) {
    console.error("[admin-customer] query failed", customerErr);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  const [vehiclesRes, notesRes, followUpsRes, historyRes] = await Promise.all([
    supabase
      .from("vehicles")
      .select("id, plate, make, model, year, colour, mot_due_date, service_due_date")
      .eq("customer_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("notes")
      .select("id, text, tag, created_at, staff:staff_id(name)")
      .eq("customer_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("follow_ups")
      .select("id, due_date, note, status, assigned_staff_id, staff:assigned_staff_id(name)")
      .eq("customer_id", id)
      .order("due_date", { ascending: true }),
    supabase
      .from("bookings")
      .select("id, service_type, requested_date, status")
      .eq("customer_id", id)
      .eq("status", "completed")
      .order("requested_date", { ascending: false }),
  ]);

  const vehicles = (vehiclesRes.data ?? []).map((v) => {
    const mot = computeMotStatus(v.mot_due_date);
    return {
      id: v.id,
      plate: v.plate,
      make: v.make ?? "",
      model: v.model ?? "",
      year: v.year ?? undefined,
      colour: v.colour ?? "",
      motStatus: mot.status,
      motDueLabel: mot.label,
      serviceLabel: computeServiceLabel(v.service_due_date),
    };
  });

  const notes = (notesRes.data ?? []).map((n) => ({
    id: n.id,
    author: staffName(n.staff as StaffRef) ?? "Unknown",
    timestamp: formatNoteTimestamp(n.created_at),
    text: n.text,
    tag: n.tag ?? undefined,
  }));

  const followUps = (followUpsRes.data ?? []).map((f) => {
    const due = formatFollowUpDue(f.due_date);
    return {
      id: f.id,
      title: f.note || "Follow-up",
      dueLabel: due.label,
      urgency: due.urgency,
      assignedTo: staffName(f.staff as StaffRef) ?? "Unassigned",
      done: f.status === "done",
    };
  });

  const history = (historyRes.data ?? []).map((b) => ({
    id: b.id,
    title: b.service_type,
    dateLabel: b.requested_date ? formatDateLabel(b.requested_date) : "Date not recorded",
    detail: "Complete",
  }));

  return NextResponse.json({
    customer: {
      id: customer.id,
      name: customer.name,
      phone: customer.phone ?? "",
      email: customer.email ?? "",
      vehicles,
      notes,
      followUps,
      history,
    },
    configured: true,
  });
}
