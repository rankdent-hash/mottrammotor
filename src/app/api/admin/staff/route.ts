import { NextResponse } from "next/server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";

// -----------------------------------------------------------------------
// GET /api/admin/staff
//
// Public-safe staff list for the login picker screen (id, name, initial
// only — never pin_hash, and the route never touches that column at all,
// letting Postgres RLS be the backstop rather than relying solely on this
// select list). No session required: this is what renders *before*
// anyone's signed in.
//
// Falls back to the three real seeded names/ids when Supabase isn't
// configured, purely so the login screen still renders locally without a
// DB — signing in obviously won't succeed until Supabase is connected,
// which is expected and fine.
// -----------------------------------------------------------------------

const FALLBACK_STAFF = [
  { id: "d503ca6e-3326-4572-b729-92eb18f7299e", name: "Dave", initial: "D" },
  { id: "691d28ac-b356-4233-ac60-a98dd7dc95d9", name: "Sue", initial: "S" },
  { id: "2c8676e4-235d-48f6-98f5-4f23af0ba20c", name: "Mo", initial: "M" },
];

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ staff: FALLBACK_STAFF, source: "fallback" });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ staff: FALLBACK_STAFF, source: "fallback" });
  }

  const { data, error } = await supabase
    .from("staff")
    .select("id, name, initial")
    .eq("active", true)
    .order("name");

  if (error || !data) {
    console.error("[admin-staff] query failed", error);
    return NextResponse.json({ staff: FALLBACK_STAFF, source: "fallback" });
  }

  return NextResponse.json({ staff: data, source: "supabase" });
}
