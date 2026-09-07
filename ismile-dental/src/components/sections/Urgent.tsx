import Prose from "@/components/Prose";
import { practice } from "@/lib/practice";
import type { UrgentSection } from "@/lib/content/types";

/**
 * Urgent/emergency block, placed high on the pages that earn one — the
 * extractions page especially, where someone in pain should not have to
 * scroll past the sales copy to find out what to do.
 */
export default function Urgent({ section }: { section: UrgentSection }) {
  return (
    <section className="border-b border-clay-500/30 bg-clay-100">
      <div className="container-page py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-lg font-bold text-ink-900">{section.h2}</h2>
            <div className="prose-body mt-2 text-sm text-ink-800">
              {section.body.map((paragraph, i) => (
                <p key={i}>
                  <Prose parts={paragraph} />
                </p>
              ))}
            </div>
          </div>
          <a
            href={practice.phoneHref}
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-clay-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-clay-700"
          >
            Call {practice.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
