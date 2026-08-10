import AdminBookingsClient from "./AdminBookingsClient";

// Server wrapper so `scope` (and `service`) come from the URL (?scope=today,
// linked from the dashboard's "Today's Bookings" tile; ?service=Tyres,
// linked from the Services tab's cards) without needing a client-side
// useSearchParams() + Suspense boundary — matches the pattern already used
// by src/app/(marketing)/book/page.tsx for its ?reg= prefill.
export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ scope?: string; service?: string }>;
}) {
  const params = await searchParams;
  const initialScope = params.scope === "today" ? "today" : "all";
  const initialService = params.service?.trim() || null;

  return <AdminBookingsClient initialScope={initialScope} initialService={initialService} />;
}
