import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session-server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { formatNoteTimestamp } from "@/lib/admin-format";

// POST /api/admin/customers/[id]/notes  { text, tag? }
//
// staff_id always comes from the verified session, never the request body
// — a client-supplied staff id would let anyone attribute a note to
// whoever they liked.
type NotePayload = { text?: string; tag?: string };

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;
  const { session } = auth;

  const { id: customerId } = await params;

  let body: NotePayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const text = body.text?.trim();
  if (!text) {
    return NextResponse.json({ error: "Note text is required" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Not connected to the database yet." }, { status: 503 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Not connected to the database yet." }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("notes")
    .insert({
      customer_id: customerId,
      staff_id: session.staffId,
      text,
      tag: body.tag?.trim() || null,
    })
    .select("id, text, tag, created_at")
    .single();

  if (error || !data) {
    console.error("[admin-notes] insert failed", error);
    return NextResponse.json({ error: "Couldn't save the note — try again." }, { status: 500 });
  }

  return NextResponse.json(
    {
      note: {
        id: data.id,
        author: session.staffName,
        timestamp: formatNoteTimestamp(data.created_at),
        text: data.text,
        tag: data.tag ?? undefined,
      },
    },
    { status: 201 }
  );
}
