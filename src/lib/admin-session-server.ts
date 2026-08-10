// ---------------------------------------------------------------------------
// Server-side helper for reading the verified admin session inside Route
// Handlers, via next/headers' cookies(). Not usable from src/proxy.ts —
// Proxy reads/writes cookies through NextRequest/NextResponse instead
// (next/headers isn't available there) — and not usable from client
// components, which go through GET /api/admin/session instead (see
// src/lib/admin-session.ts), since the cookie is httpOnly and deliberately
// unreadable from the browser.
// ---------------------------------------------------------------------------

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  verifySessionToken,
  type AdminSessionPayload,
} from "@/lib/admin-auth";

export async function getServerAdminSession(): Promise<AdminSessionPayload | null> {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

/**
 * Defense-in-depth check for admin API routes that also sit behind
 * src/proxy.ts's cookie check. Every /api/admin/* route that mutates or
 * reads customer data calls this itself rather than trusting proxy alone —
 * see the Data Security guidance in Next's proxy docs: a matcher change or
 * refactor could silently remove proxy coverage, so each route verifies
 * its own auth too.
 *
 * Usage:
 *   const auth = await requireAdminSession();
 *   if ("response" in auth) return auth.response;
 *   const { session } = auth;
 */
export async function requireAdminSession(): Promise<
  { session: AdminSessionPayload } | { response: NextResponse }
> {
  const session = await getServerAdminSession();
  if (!session) {
    return { response: NextResponse.json({ error: "Not signed in" }, { status: 401 }) };
  }
  return { session };
}
