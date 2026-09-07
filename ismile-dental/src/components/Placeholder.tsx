import type { Placeholder as PlaceholderData } from "@/lib/content/types";

/**
 * A marked gap the client must fill (build-plan.md §3).
 *
 * Deliberately loud. content-brief.md §6: "A visible gap is better than a
 * wrong price or an invented opening time." The final pre-launch checklist
 * item is that none of these ship visible — `npm run check:placeholders`
 * lists what is outstanding.
 */
export default function Placeholder({ data }: { data: PlaceholderData }) {
  return (
    <mark className="mx-0.5 rounded bg-amber-100 px-1.5 py-0.5 text-[0.85em] font-medium text-amber-900 ring-1 ring-amber-300">
      {data.placeholder}
    </mark>
  );
}
