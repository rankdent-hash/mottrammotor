import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session-server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";

// -----------------------------------------------------------------------
// PATCH /api/admin/leads/[id]  { status }
//
// Updates a lead's status only — "Mark Contacted" and "Mark Lost" on the
// Leads tab both call this. Turning a lead into a real customer is a
// bigger operation (creates/matches a customer + vehicle) and lives at
// POST /api/admin/leads/[id]/convert instead, not here.
// -----------------------------------------------------------------------

type UpdatePayload = { status?: string };

const VALID_STATUSES = new Set(["new", "contacted", "booked", "lost"]);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  const { id } = await params;

  let body: UpdatePayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.status || !VALID_STATUSES.has(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Not connected to the database yet." }, { status: 503 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Not connected to the database yet." }, { status: 503 });
  }

  const { error } = await supabase.from("leads").update({ status: body.status }).eq("id", id);

  if (error) {
    console.error("[admin-leads] status update failed", error);
    return NextResponse.json({ error: "Couldn't update this lead — try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
