import Link from "next/link";
import Prose from "@/components/Prose";
import { SectionShell } from "@/components/sections/Blocks";
import { locations, locationPagesBuilt } from "@/lib/locations";
import type { AreasSection } from "@/lib/content/types";

/**
 * Section 12. Framed as journey time and convenience, never as a keyword
 * list. Which towns lead and how the framing works is varied per page in the
 * copy — this component only renders it.
 *
 * The location pages themselves are not built yet (their copy has not been
 * written), so the list renders as plain text rather than links to 404s until
 * `locationPagesBuilt` flips.
 */
export default function Areas({ section }: { section: AreasSection }) {
  return (
    <SectionShell h2={section.h2} tint="sand">
      <div className="prose-body max-w-2xl text-ink-800">
        {section.body.map((paragraph, i) => (
          <p key={i}>
            <Prose parts={paragraph} />
          </p>
        ))}
      </div>

      <ul className="mt-6 flex flex-wrap gap-2.5">
        {locations.map((location) =>
          locationPagesBuilt ? (
            <li key={location.href}>
              <Link
                href={location.href}
                className="inline-flex rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-clay-500 hover:text-clay-700"
              >
                Dentist near {location.name}
              </Link>
            </li>
          ) : (
            <li
              key={location.href}
              className="inline-flex rounded-full border border-dashed border-ink-200 bg-white/60 px-4 py-2 text-sm text-ink-600"
            >
              {location.name}
            </li>
          )
        )}
      </ul>

      {!locationPagesBuilt && (
        <p className="mt-4 text-sm">
          <mark className="rounded bg-amber-100 px-1.5 py-0.5 text-amber-900 ring-1 ring-amber-300">
            [BUILD: the nine location pages are planned but their copy is not
            yet written (build-plan.md §4). These render as plain text until
            the pages exist — flip `locationPagesBuilt` in src/lib/locations.ts
            to link them.]
          </mark>
        </p>
      )}
    </SectionShell>
  );
}
