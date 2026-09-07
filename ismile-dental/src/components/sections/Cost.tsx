import Link from "next/link";
import Prose from "@/components/Prose";
import { SectionShell, Table } from "@/components/sections/Blocks";
import type { CostSection } from "@/lib/content/types";

/**
 * Section 9. The question everyone has and nobody asks first.
 *
 * A published fee list is one of the strongest local conversion assets in
 * private dentistry and its absence from the old site is conspicuous
 * (build-plan.md §4). Every figure is a placeholder until the client supplies
 * a genuine one — an ASA breach otherwise, and a wrong price is worse than
 * a visible gap.
 */
export default function Cost({ section }: { section: CostSection }) {
  return (
    <SectionShell h2={section.h2}>
      <div className="max-w-3xl space-y-5">
        {section.intro?.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-ink-800">
            <Prose parts={paragraph} />
          </p>
        ))}

        {section.table && <Table table={section.table} />}

        {section.notes?.map((note, i) => (
          <p key={i} className="text-sm leading-relaxed text-ink-700">
            <Prose parts={note} />
          </p>
        ))}

        {section.link && (
          <p>
            <Link
              href={section.link.href}
              className="font-semibold text-ink-700 underline underline-offset-4 hover:text-clay-700"
            >
              {section.link.label}
            </Link>
          </p>
        )}
      </div>
    </SectionShell>
  );
}
