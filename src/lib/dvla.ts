// ---------------------------------------------------------------------------
// DVLA Vehicle Enquiry Service (VES) lookup.
//
// Real behaviour once configured: POSTs a registration number to the DVLA's
// Vehicle Enquiry Service API and returns the vehicle's make, colour, year,
// MOT status and tax status. Needs a DVLA_API_KEY (free to request at
// https://developer-portal.driver-vehicle-licensing.api.gov.uk/), set in
// Vercel's environment variables.
//
// Nobody has a DVLA_API_KEY yet, so right now this always takes the demo
// path below: it returns clearly-labelled fake-but-deterministic data (same
// reg always produces the same demo vehicle) so the booking form's
// reg-lookup UI can be built and tested without waiting on API access. This
// is a progressive-enhancement feature bolted onto a booking form — a
// failed or unconfigured lookup must never stop someone from completing a
// booking, so every path below returns a result object instead of throwing.
// ---------------------------------------------------------------------------

const DVLA_ENDPOINT =
  "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles";

export type VehicleLookupResult = {
  found: boolean;
  source: "dvla" | "demo" | "error";
  reg: string;
  make?: string;
  colour?: string;
  yearOfManufacture?: number;
  motStatus?: string;
  motExpiryDate?: string;
  taxStatus?: string;
  taxDueDate?: string;
  fuelType?: string;
  engineCapacity?: number;
  // Present on demo results, and on errors — a human-readable explanation
  // of why this isn't live DVLA data.
  note?: string;
  error?: string;
};

// Shape of the fields we actually use from DVLA's response. The real API
// returns more fields than this (e.g. artEndDate, euroStatus) — we only
// declare what we map, rather than modelling the entire response.
type DvlaVehicleResponse = {
  make?: string;
  colour?: string;
  yearOfManufacture?: number;
  motStatus?: string;
  motExpiryDate?: string;
  taxStatus?: string;
  taxDueDate?: string;
  fuelType?: string;
  engineCapacity?: number;
};

function normaliseReg(reg: string): string {
  return reg.trim().toUpperCase().replace(/\s+/g, "");
}

// Three or four canned demo vehicles, chosen deterministically per reg via
// a tiny string hash — the same reg always maps to the same entry, so the
// booking form behaves consistently across repeat visits/refreshes.
const DEMO_VEHICLES: Omit<VehicleLookupResult, "found" | "source" | "reg" | "note">[] = [
  {
    make: "Ford",
    colour: "Blue",
    yearOfManufacture: 2019,
    motStatus: "Valid",
    taxStatus: "Taxed",
    fuelType: "Petrol",
    engineCapacity: 1499,
  },
  {
    make: "Vauxhall",
    colour: "Red",
    yearOfManufacture: 2018,
    motStatus: "Valid",
    taxStatus: "Taxed",
    fuelType: "Diesel",
    engineCapacity: 1598,
  },
  {
    make: "Volkswagen",
    colour: "Grey",
    yearOfManufacture: 2020,
    motStatus: "Valid",
    taxStatus: "Taxed",
    fuelType: "Petrol",
    engineCapacity: 999,
  },
  {
    make: "Toyota",
    colour: "White",
    yearOfManufacture: 2021,
    motStatus: "Valid",
    taxStatus: "SORN",
    fuelType: "Hybrid Electric",
    engineCapacity: 1490,
  },
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function isoDateDaysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function buildDemoResult(cleanedReg: string): VehicleLookupResult {
  const hash = hashString(cleanedReg);
  const template = DEMO_VEHICLES[hash % DEMO_VEHICLES.length];
  // Deterministic per-reg offsets (still derived from the hash, not
  // Math.random()) so MOT/tax due dates vary between demo vehicles but
  // stay stable for a given reg across repeat lookups.
  const motExpiryDate = isoDateDaysFromNow(10 + (hash % 300));
  const taxDueDate = isoDateDaysFromNow(5 + ((hash >> 3) % 200));

  return {
    found: true,
    source: "demo",
    reg: cleanedReg,
    ...template,
    motExpiryDate,
    taxDueDate,
    note: "Demo data — DVLA_API_KEY not configured, connect it in Vercel to enable live lookups.",
  };
}

export async function lookupVehicle(reg: string): Promise<VehicleLookupResult> {
  const cleanedReg = normaliseReg(reg);

  if (!cleanedReg) {
    return {
      found: false,
      source: "error",
      reg: cleanedReg,
      error: "No registration number provided",
    };
  }

  const apiKey = process.env.DVLA_API_KEY;

  if (!apiKey) {
    return buildDemoResult(cleanedReg);
  }

  try {
    const res = await fetch(DVLA_ENDPOINT, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ registrationNumber: cleanedReg }),
    });

    if (res.status === 404) {
      return { found: false, source: "dvla", reg: cleanedReg };
    }

    if (!res.ok) {
      throw new Error(`DVLA API responded with status ${res.status}`);
    }

    const data = (await res.json()) as DvlaVehicleResponse;

    return {
      found: true,
      source: "dvla",
      reg: cleanedReg,
      make: data.make,
      colour: data.colour,
      yearOfManufacture: data.yearOfManufacture,
      motStatus: data.motStatus,
      motExpiryDate: data.motExpiryDate,
      taxStatus: data.taxStatus,
      taxDueDate: data.taxDueDate,
      fuelType: data.fuelType,
      engineCapacity: data.engineCapacity,
    };
  } catch (err) {
    console.error("[dvla] vehicle lookup failed", err);
    return {
      found: false,
      source: "error",
      reg: cleanedReg,
      error: err instanceof Error ? err.message : "Unknown error contacting DVLA",
    };
  }
}
