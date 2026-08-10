import AdminBookingsClient from "./AdminBookingsClient";

// Server wrapper so `scope` comes from the URL (?scope=today, linked from
// the dashboard's "Today's Bookings" tile) without needing a client-side
// useSearchParams() + Suspense boundary — matches the pattern already used
// by src/app/(marketing)/book/page.tsx for its ?reg= prefill.
export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ scope?: string }>;
}) {
  const params = await searchParams;
  const initialScope = params.scope === "today" ? "today" : "all";

  return <AdminBookingsClient initialScope={initialScope} />;
}
