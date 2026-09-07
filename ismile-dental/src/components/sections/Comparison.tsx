import Prose from "@/components/Prose";
import { Blocks, SectionShell, Table } from "@/components/sections/Blocks";
import type { ComparisonSection } from "@/lib/content/types";

/**
 * Section 10. "X vs Y" content — disproportionately strong for AI retrieval,
 * and genuinely useful to someone deciding between two treatments.
 */
export default function Comparison({ section }: { section: ComparisonSection }) {
  return (
    <SectionShell h2={section.h2} tint="ink">
      <div className="max-w-3xl space-y-5">
        {section.intro?.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-ink-800">
            <Prose parts={paragraph} />
          </p>
        ))}
        {section.table && <Table table={section.table} />}
      </div>
      {section.blocks && (
        <div className="mt-6">
          <Blocks blocks={section.blocks} />
        </div>
      )}
    </SectionShell>
  );
}
