import Prose from "@/components/Prose";
import { SectionShell } from "@/components/sections/Blocks";
import type { JourneySection } from "@/lib/content/types";

/** Section 8. Removes uncertainty — numbered, with realistic timings. */
export default function Journey({ section }: { section: JourneySection }) {
  return (
    <SectionShell h2={section.h2} tint="sand">
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {section.steps.map((step, i) => (
          <li key={step.title} className="rounded-xl border border-sand-200 bg-white p-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-white">
              {i + 1}
            </span>
            <h3 className="mt-4 font-semibold text-ink-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              <Prose parts={step.body} />
            </p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
