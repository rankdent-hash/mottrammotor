import { Wrench } from "lucide-react";

// Distinct from the public site's PlaceholderBanner. Phase 3 wired this
// panel up to real Supabase data, so this only renders a warning when the
// page fetching it has confirmed the database ISN'T connected
// (SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY unset) — pass `configured={false}`
// once a page's API call comes back that way. Leave `configured` unset
// while a page is still loading (default: render nothing) rather than
// flashing a false warning before the real answer is known, and once
// something's confirmed live, this renders nothing at all — no reason to
// keep telling staff "this works" once it just does.
export default function AdminPreviewBanner({ configured }: { configured?: boolean }) {
  if (configured !== false) return null;

  return (
    <div className="bg-amber-100 text-amber-900 text-sm font-medium">
      <div className="mx-auto max-w-3xl px-5 py-2.5 flex items-center gap-2">
        <Wrench className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>
          Not connected to the live database yet — nothing here will save, and nothing real
          will show, until SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are set.
        </span>
      </div>
    </div>
  );
}
