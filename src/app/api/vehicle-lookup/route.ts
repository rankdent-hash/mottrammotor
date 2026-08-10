import { NextResponse } from "next/server";
import { lookupVehicle } from "@/lib/dvla";

// -----------------------------------------------------------------------
// GET /api/vehicle-lookup?reg=AB12CDE
//
// Thin wrapper around src/lib/dvla.ts. Always returns 200 with a
// VehicleLookupResult body (found/not-found/demo/error are all modelled in
// the payload, not the HTTP status) — the only thing that gets a non-200 is
// a missing/empty reg, since that's a caller mistake rather than a lookup
// outcome.
// -----------------------------------------------------------------------

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reg = searchParams.get("reg")?.trim();

  if (!reg) {
    return NextResponse.json({ error: "Missing reg parameter" }, { status: 400 });
  }

  const result = await lookupVehicle(reg);
  return NextResponse.json(result);
}
