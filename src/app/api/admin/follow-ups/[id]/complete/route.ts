import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session-server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";

// POST /api/admin/follow-ups/[id]/complete — marks a follow-up done.
// completed_by always comes from the verified session.
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;
  const { session } = auth;

  const { id } = await params;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Not connected to the database yet." }, { status: 503 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Not connected to the database yet." }, { status: 503 });
  }

  const { error } = await supabase
    .from("follow_ups")
    .update({
      status: "done",
      completed_at: new Date().toISOString(),
      completed_by: session.staffId,
    })
    .eq("id", id);

  if (error) {
    console.error("[admin-follow-ups] complete failed", error);
    return NextResponse.json({ error: "Couldn't mark this as done — try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
