import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/admin-session-server";

// GET /api/admin/session — the only source of truth client components use
// to find out who's signed in (the cookie itself is httpOnly). Returns 401
// if there's no valid session, which is exactly what AdminGuard treats as
// "bounce back to /admin".
export async function GET() {
  const session = await getServerAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  return NextResponse.json({
    staffId: session.staffId,
    staffName: session.staffName,
    role: session.role,
  });
}
