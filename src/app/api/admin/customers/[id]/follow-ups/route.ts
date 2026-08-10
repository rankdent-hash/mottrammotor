import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session-server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { formatFollowUpDue } from "@/lib/admin-format";

// POST /api/admin/customers/[id]/follow-ups  { dueDate, note? }
//
// Creates a manual follow-up. `source` is always 'manual' here — automatic
// MOT/service reminder generation is a later phase, not this one (see
// admin-panel-plan.md §5). Assigned to whoever's logged in, matching the
// mock UI's previous behaviour; there's no "assign to someone else" picker
// yet, which keeps this simple per the brief.
type FollowUpPayload = { dueDate?: string; note?: string };

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;
  const { session } = auth;

  const { id: customerId } = await params;

  let body: FollowUpPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const dueDate = body.dueDate?.trim();
  if (!dueDate) {
    return NextResponse.json({ error: "Due date is required" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Not connected to the database yet." }, { status: 503 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Not connected to the database yet." }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("follow_ups")
    .insert({
      customer_id: customerId,
      due_date: dueDate,
      note: body.note?.trim() || null,
      source: "manual",
      assigned_staff_id: session.staffId,
      status: "open",
    })
    .select("id, due_date, note")
    .single();

  if (error || !data) {
    console.error("[admin-follow-ups] insert failed", error);
    return NextResponse.json({ error: "Couldn't create the follow-up — try again." }, { status: 500 });
  }

  const due = formatFollowUpDue(data.due_date);
  return NextResponse.json(
    {
      followUp: {
        id: data.id,
        title: data.note || "Follow-up",
        dueLabel: due.label,
        urgency: due.urgency,
        assignedTo: session.staffName,
        done: false,
      },
    },
    { status: 201 }
  );
}
