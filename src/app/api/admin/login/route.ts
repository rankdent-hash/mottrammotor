import { NextResponse } from "next/server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import {
  ADMIN_SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
  isAdminAuthConfigured,
} from "@/lib/admin-auth";

// -----------------------------------------------------------------------
// POST /api/admin/login  { staffId, pin }
//
// Verifies the PIN server-side via Supabase's verify_staff_pin(uuid, text)
// RPC — app code never sees pin_hash, only a match/no-match. On a match,
// issues a signed, httpOnly session cookie (see src/lib/admin-auth.ts).
//
// Two genuinely different "not configured" situations here, both honest
// 503s rather than a fake success:
//   - ADMIN_SESSION_SECRET unset: no session can be safely issued at all,
//     so login flatly refuses (see admin-auth.ts for why there's no
//     insecure fallback for this one specifically).
//   - Supabase unset: there's no PIN to check against, so there's nothing
//     to verify. Unlike the public booking form, staff login has no safe
//     "demo mode" — fabricating a successful login when the database is
//     unreachable would mean anyone who opens /admin gets in.
// -----------------------------------------------------------------------

type LoginPayload = { staffId?: string; pin?: string };
type VerifyPinRow = { id: string; name: string; initial: string; role: string };

export async function POST(request: Request) {
  let body: LoginPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const staffId = body.staffId?.trim();
  const pin = body.pin?.trim();
  if (!staffId || !pin) {
    return NextResponse.json({ error: "Missing staffId or pin" }, { status: 400 });
  }

  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      {
        error:
          "Admin login isn't set up yet — ADMIN_SESSION_SECRET (any long random string) needs to be set before staff can sign in.",
      },
      { status: 503 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Admin login needs the database connected — SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY need to be set before staff can sign in.",
      },
      { status: 503 }
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Admin login needs the database connected." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase.rpc("verify_staff_pin", {
    p_staff_id: staffId,
    p_pin: pin,
  });

  if (error) {
    console.error("[admin-login] verify_staff_pin RPC failed", error);
    return NextResponse.json(
      { error: "Something went wrong checking that PIN — try again." },
      { status: 500 }
    );
  }

  const row = (Array.isArray(data) ? data[0] : data) as VerifyPinRow | undefined;
  if (!row) {
    return NextResponse.json({ error: "Wrong PIN — try again" }, { status: 401 });
  }

  const token = createSessionToken({ staffId: row.id, staffName: row.name, role: row.role });
  if (!token) {
    // Shouldn't happen given the isAdminAuthConfigured() check above, but
    // createSessionToken() is the null-safe source of truth — trust it
    // rather than assuming.
    return NextResponse.json(
      { error: "Admin login isn't set up yet — ADMIN_SESSION_SECRET needs to be set." },
      { status: 503 }
    );
  }

  const res = NextResponse.json({
    ok: true,
    staffId: row.id,
    staffName: row.name,
    role: row.role,
  });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
