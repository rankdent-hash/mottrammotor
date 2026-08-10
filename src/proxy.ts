import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";

// ---------------------------------------------------------------------------
// Server-side gate for the staff admin panel.
//
// Next.js 16 deprecated the `middleware.ts` file convention and renamed it
// to `proxy.ts` (same behaviour, just a rename — see
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md).
// This file is what a reader following the Phase 3 brief's "New
// middleware.ts at the repo root" instruction should look for instead.
//
// It runs before every /admin/* page and /api/admin/* route, verifies the
// signed admin_session cookie (see src/lib/admin-auth.ts), and bounces
// anyone without a valid one. This is what makes the login real
// server-side auth rather than a client-side sessionStorage check anyone
// could fake from devtools — the old src/lib/admin-session.ts placeholder
// this replaces.
//
// A handful of /api/admin/* routes have to keep working *before* someone's
// signed in, so they're exempted here: login (obviously), logout (clearing
// a stale/invalid cookie should always succeed), session (its whole job is
// answering "am I signed in?"), and staff (the public-safe name list the
// login picker renders). Every other /api/admin/* route — and every
// /admin/* page except the login screen itself — requires a valid cookie.
//
// Defense in depth: each protected route handler also calls
// requireAdminSession() itself (src/lib/admin-session-server.ts) rather
// than trusting this file alone, per Next's own guidance that a matcher
// change could silently remove proxy coverage.
// ---------------------------------------------------------------------------

const PUBLIC_API_ROUTES = new Set([
  "/api/admin/login",
  "/api/admin/logout",
  "/api/admin/session",
  "/api/admin/staff",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The login/staff-picker screen itself must stay reachable without a
  // session — everything else under /admin needs one.
  if (pathname === "/admin") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const session = verifySessionToken(token);

  if (pathname.startsWith("/api/admin/")) {
    if (PUBLIC_API_ROUTES.has(pathname) || session) {
      return NextResponse.next();
    }
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  // Everything else this file matches is an /admin/* page.
  if (session) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/admin", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
