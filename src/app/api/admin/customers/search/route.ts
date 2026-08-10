import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session-server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { computeMotStatus } from "@/lib/admin-format";

// -----------------------------------------------------------------------
// GET /api/admin/customers/search?q=...
//
// The "one box, three ways" search from admin-panel-plan.md §3: a UK
// plate, a phone number, or a name, without staff having to say which.
//
// The candidate set for a single garage is small enough (hundreds, not
// millions, of customers) that fetching a bounded set and matching in code
// is simpler and more reliable than three separate SQL shapes — in
// particular, phone numbers are stored exactly as customers typed them on
// the booking form (see src/app/api/booking/route.ts), so a plain SQL
// ilike would miss "07911223344" against a stored "07911 223344". Matching
// after stripping whitespace on both sides sidesteps that without needing
// a normalised column/migration.
// -----------------------------------------------------------------------

const UK_PLATE_RE = /^[A-Z]{2}\d{2}[A-Z]{3}$/;

type QueryType = "plate" | "phone" | "name";

function detectQueryType(q: string): QueryType {
  const compact = q.replace(/\s+/g, "").toUpperCase();
  if (UK_PLATE_RE.test(compact)) return "plate";
  const digitsOnly = compact.replace(/[+()-]/g, "");
  if (digitsOnly.length >= 6 && /^\d+$/.test(digitsOnly)) return "phone";
  return "name";
}

type VehicleRow = {
  id: string;
  plate: string;
  make: string | null;
  model: string | null;
  year: number | null;
  colour: string | null;
  mot_due_date: string | null;
};

type CustomerRow = {
  id: string;
  name: string;
  phone: string | null;
  vehicles: VehicleRow[] | null;
};

export async function GET(request: Request) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  const configured = isSupabaseConfigured();
  if (!configured) {
    return NextResponse.json({ customers: [], configured: false });
  }

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();
  if (!q) {
    return NextResponse.json({ customers: [], configured: true });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ customers: [], configured: false });
  }

  const { data, error } = await supabase
    .from("customers")
    .select("id, name, phone, vehicles(id, plate, make, model, year, colour, mot_due_date)")
    .limit(1000);

  if (error) {
    console.error("[admin-customers-search] query failed", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }

  const rows = (data ?? []) as unknown as CustomerRow[];
  const type = detectQueryType(q);
  const qLower = q.toLowerCase();
  const qCompact = q.replace(/\s+/g, "").toLowerCase();

  const matches = rows.filter((c) => {
    if (type === "plate") {
      return (c.vehicles ?? []).some((v) =>
        v.plate.replace(/\s+/g, "").toLowerCase().includes(qCompact)
      );
    }
    if (type === "phone") {
      return (c.phone ?? "").replace(/\s+/g, "").toLowerCase().includes(qCompact);
    }
    return c.name.toLowerCase().includes(qLower);
  });

  const customers = matches.slice(0, 25).map((c) => ({
    id: c.id,
    name: c.name,
    phone: c.phone ?? "",
    vehicles: (c.vehicles ?? []).map((v) => {
      const mot = computeMotStatus(v.mot_due_date);
      return {
        id: v.id,
        plate: v.plate,
        make: v.make ?? "",
        model: v.model ?? "",
        year: v.year ?? undefined,
        colour: v.colour ?? "",
        motStatus: mot.status,
        motDueLabel: mot.label,
      };
    }),
  }));

  return NextResponse.json({ customers, configured: true });
}
