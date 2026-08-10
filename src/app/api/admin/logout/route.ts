import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

// POST /api/admin/logout — clears the session cookie. Always succeeds
// (even with no cookie present, or an already-invalid one) since clearing
// a stale session should never itself be blocked.
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
