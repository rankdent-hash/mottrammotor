import { ChevronDown } from "lucide-react";
import Prose from "@/components/Prose";
import { SectionShell } from "@/components/sections/Blocks";
import type { FaqsSection } from "@/lib/content/types";

/**
 * Section 11. Answer-first, and emitted as FAQPage schema by the page
 * renderer. Rendered with <details> so the answers are in the DOM for
 * crawlers and answer engines whether or not the reader opens them.
 */
export default function Faqs({ section }: { section: FaqsSection }) {
  return (
    <SectionShell h2={section.h2}>
      <div className="max-w-3xl divide-y divide-ink-100 rounded-xl border border-ink-100 bg-white">
        {section.items.map((item) => (
          <details key={item.q} className="group p-5 sm:p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink-900">
              <h3 className="text-base font-semibold">{item.q}</h3>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-ink-500 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 leading-relaxed text-ink-700">
              <Prose parts={item.a} />
            </p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}
