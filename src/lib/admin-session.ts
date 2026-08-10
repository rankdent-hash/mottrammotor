"use client";

// ---------------------------------------------------------------------------
// Client-side admin session helper.
//
// Phase 3 replaces the old sessionStorage-based mock (trivially readable
// and writable from the browser console, with a PIN checked client-side —
// see the git history of this file) with a real httpOnly, signed cookie
// set by POST /api/admin/login (src/lib/admin-auth.ts issues it,
// src/proxy.ts enforces it server-side on every /admin/* request). Browser
// JS can no longer read that cookie directly — that's the point — so this
// file just wraps GET /api/admin/session and caches the last known result
// for components (AdminGuard) that want to render immediately rather than
// show a loading flash on every navigation.
//
// The AdminSession shape below matches what the page components already
// destructure (session.staffName etc.), so nothing downstream needed to
// change beyond where the value comes from.
// ---------------------------------------------------------------------------

export type AdminSession = { staffId: string; staffName: string; role?: string };

let cached: AdminSession | null = null;

export function getCachedAdminSession(): AdminSession | null {
  return cached;
}

// Called right after a successful /api/admin/login response, so the
// dashboard can render immediately without waiting on a second round trip
// to /api/admin/session.
export function setCachedAdminSession(session: AdminSession) {
  cached = session;
}

let inFlight: Promise<AdminSession | null> | null = null;

/**
 * Asks the server "am I signed in?" — the only source of truth, since the
 * session cookie itself is httpOnly and unreadable from here. Coalesces
 * concurrent calls into a single request.
 */
export async function fetchAdminSession(): Promise<AdminSession | null> {
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const res = await fetch("/api/admin/session", { cache: "no-store" });
      if (!res.ok) {
        cached = null;
        return null;
      }
      const data = (await res.json()) as { staffId: string; staffName: string; role?: string };
      cached = { staffId: data.staffId, staffName: data.staffName, role: data.role };
      return cached;
    } catch {
      cached = null;
      return null;
    }
  })();

  try {
    return await inFlight;
  } finally {
    inFlight = null;
  }
}

export async function logoutAdminSession(): Promise<void> {
  cached = null;
  try {
    await fetch("/api/admin/logout", { method: "POST" });
  } catch {
    // Best-effort — even if this fails to reach the server, the cookie's
    // short expiry means a "logged out" client that couldn't reach the
    // server will stop being able to use it once it lapses anyway.
  }
}
