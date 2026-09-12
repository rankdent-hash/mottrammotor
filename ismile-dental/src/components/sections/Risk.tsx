import { TriangleAlert } from "lucide-react";
import { Blocks } from "@/components/sections/Blocks";
import type { RiskSection } from "@/lib/content/types";

/**
 * Risks, side effects and aftercare. Required on the aesthetics pages, where
 * stating risk honestly is both the compliance position and, per
 * compliance.md §6, the conversion strategy.
 */
export default function Risk({ section }: { section: RiskSection }) {
  return (
    <section className="border-y border-sand-200 bg-sand-50">
      <div className="container-page py-14 sm:py-18">
        <h2 className="flex max-w-3xl items-start gap-3 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
          <TriangleAlert className="mt-1 h-6 w-6 shrink-0 text-clay-600" aria-hidden="true" />
          {section.h2}
        </h2>
        <div className="mt-7">
          <Blocks blocks={section.blocks} />
        </div>
      </div>
    </section>
  );
}
