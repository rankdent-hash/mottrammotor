import { Quote } from "lucide-react";
import Placeholder from "@/components/Placeholder";
import { SectionShell } from "@/components/sections/Blocks";
import type { ReviewsSection } from "@/lib/content/types";

/**
 * Section 6, placed at the decision point immediately after the selling
 * points. The old site has no visible review proof anywhere while the primary
 * local competitor runs live embeds — research.md §7 calls this the single
 * biggest credibility gap in the rebuild.
 *
 * Three static quotes sit alongside the embed so the section still has
 * content if the embed fails to load. Every quote is a placeholder;
 * publishing invented reviews is an ASA breach and the fastest route to
 * losing a Google Business Profile.
 */
export default function Reviews({ section }: { section: ReviewsSection }) {
  return (
    <SectionShell h2={section.h2} tint="ink">
      <p className="text-lg font-semibold text-ink-900">
        <Placeholder data={section.aggregate} />
      </p>

      {section.embed ? (
        <div className="mt-6 rounded-xl border border-dashed border-ink-300 bg-white p-6 text-sm text-ink-700">
          <p className="font-semibold text-ink-900">Google reviews embed</p>
          <p className="mt-1.5">
            <mark className="rounded bg-amber-100 px-1.5 py-0.5 text-amber-900 ring-1 ring-amber-300">
              [BUILD: wire a live Google reviews embed (Elfsight, Trustindex or
              similar) to the verified Google Business Profile. Two competing
              g.page links are in circulation — the client must confirm which
              is verified before this is connected.]
            </mark>
          </p>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-clay-500/40 bg-clay-100 p-5 text-sm text-ink-900">
          <p className="font-semibold">Static screened quotes only on this page.</p>
          <p className="mt-1.5">
            A live embed is deliberately not used here: a patient review naming
            a prescription-only product would still be the practice&apos;s own
            publication. Quotes on this page must be screened before use.
          </p>
        </div>
      )}

      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {section.quotes.map((review, i) => (
          <figure key={i} className="rounded-xl border border-ink-100 bg-white p-6">
            <Quote className="h-5 w-5 text-ink-400" aria-hidden="true" />
            <blockquote className="mt-3 text-sm leading-relaxed text-ink-800">
              <Placeholder data={review.quote} />
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-ink-900">
              {review.attribution}
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}
