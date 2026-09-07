import Prose from "@/components/Prose";
import { SectionShell } from "@/components/sections/Blocks";
import type { WhyChooseSection } from "@/lib/content/types";

/** Section 5. Why here, not the practice down the road. */
export default function WhyChoose({ section }: { section: WhyChooseSection }) {
  return (
    <SectionShell h2={section.h2}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {section.points.map((point) => (
          <div
            key={point.title}
            className="rounded-xl border border-ink-100 bg-white p-6 shadow-sm"
          >
            <h3 className="font-semibold text-ink-900">{point.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              <Prose parts={point.body} />
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
