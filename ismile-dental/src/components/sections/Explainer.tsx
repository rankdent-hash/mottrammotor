import { Blocks, SectionShell } from "@/components/sections/Blocks";
import type { ExplainerSection } from "@/lib/content/types";

/**
 * Section 7 — the SEO/AEO engine room. H2s are real questions, and the first
 * 40–60 words under each answer it completely and quotably before any
 * elaboration (content-brief.md §4).
 */
export default function Explainer({ section }: { section: ExplainerSection }) {
  return (
    <SectionShell h2={section.h2} id={section.id}>
      <Blocks blocks={section.blocks} />
    </SectionShell>
  );
}
