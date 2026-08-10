import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/availability";

// -----------------------------------------------------------------------
// GET /api/availability?days=14
//
// Returns the next `days` calendar days of open slots, grouped by date.
// `days` defaults to 14 and is capped at 30 to keep the response (and the
// Supabase query behind it, once configured) bounded.
// -----------------------------------------------------------------------

const DEFAULT_DAYS = 14;
const MAX_DAYS = 30;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const daysParam = searchParams.get("days");

  let days = DEFAULT_DAYS;
  if (daysParam) {
    const parsed = Number.parseInt(daysParam, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      days = Math.min(parsed, MAX_DAYS);
    }
  }

  const availability = await getAvailableSlots(days);
  return NextResponse.json({ days: availability });
}
