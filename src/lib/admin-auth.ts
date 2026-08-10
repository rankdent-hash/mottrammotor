// ---------------------------------------------------------------------------
// Server-only admin session signing/verification.
//
// The admin panel's session cookie is a signed token rather than an opaque
// ID backed by a sessions table — simpler to reason about, and nothing to
// clean up. Format: `<base64url(payload json)>.<base64url(hmac-sha256)>`.
// Verifying just means recomputing the HMAC over the payload and comparing
// it (timing-safe) to the one in the cookie, then checking the embedded
// expiry hasn't passed. Node's built-in crypto module does the signing —
// no extra dependency needed.
//
// ADMIN_SESSION_SECRET is the HMAC key, and it's deliberately NOT given a
// build-safe fallback the way other unconfigured integrations in this repo
// are (compare src/lib/dvla.ts's demo data, or supabase.ts's null client).
// Those degrade to clearly-labelled fake/empty behaviour because there's a
// safe "not configured yet" state to fall back to. There isn't one here: a
// guessable or missing signing secret would let anyone forge a staff
// session, which isn't a degraded experience, it's a security hole. So
// when the secret isn't set, createSessionToken() and verifySessionToken()
// both simply refuse (return null) rather than falling back to anything —
// the login route turns that into an honest "not set up yet" response
// instead of ever issuing a session nobody can trust.
// ---------------------------------------------------------------------------

import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";

// 25 minutes — inside the 20-30 minute inactivity-logout window from
// admin-panel-plan.md. Every /api/admin/login call issues a token with a
// fresh expiry; there's no sliding/refresh-on-activity yet (noted in the
// Phase 3 brief as a nice-to-have, not a requirement).
export const SESSION_TTL_SECONDS = 25 * 60;

export type AdminSessionPayload = {
  staffId: string;
  staffName: string;
  role: string;
  exp: number; // epoch milliseconds
};

export function isAdminAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_SESSION_SECRET);
}

/**
 * Builds a signed session token, or `null` if ADMIN_SESSION_SECRET isn't
 * set. Callers must treat `null` as "cannot issue a session right now" —
 * never invent a token or skip signing.
 */
export function createSessionToken(
  data: Pick<AdminSessionPayload, "staffId" | "staffName" | "role">
): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;

  const payload: AdminSessionPayload = {
    ...data,
    exp: Date.now() + SESSION_TTL_SECONDS * 1000,
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = createHmac("sha256", secret).update(payloadB64).digest("base64url");
  return `${payloadB64}.${signature}`;
}

/**
 * Verifies a session token (as stored in the admin_session cookie).
 * Returns the decoded payload if — and only if — the secret is configured,
 * the signature matches, and the token hasn't expired. Never throws.
 */
export function verifySessionToken(token: string | undefined | null): AdminSessionPayload | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, signature] = parts;
  if (!payloadB64 || !signature) return null;

  const expectedSignature = createHmac("sha256", secret).update(payloadB64).digest("base64url");
  const actualBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);
  if (actualBuf.length !== expectedBuf.length || !timingSafeEqual(actualBuf, expectedBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8")
    ) as AdminSessionPayload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    if (!payload.staffId || !payload.staffName || !payload.role) return null;
    return payload;
  } catch {
    return null;
  }
}
