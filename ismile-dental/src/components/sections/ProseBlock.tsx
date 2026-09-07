import Prose from "@/components/Prose";
import { SectionShell } from "@/components/sections/Blocks";
import type { ProseSection } from "@/lib/content/types";

/**
 * Sections 3 and 4 — "You might recognise this" and "The outcome". The
 * emotional core of the page, so it gets generous measure and leading and
 * no visual furniture competing with it.
 */
export default function ProseBlock({ section }: { section: ProseSection }) {
  return (
    <SectionShell h2={section.h2} tint={section.type === "outcome" ? "sand" : undefined}>
      <div className="prose-body max-w-2xl text-lg text-ink-800">
        {section.body.map((paragraph, i) => (
          <p key={i}>
            <Prose parts={paragraph} />
          </p>
        ))}
      </div>
    </SectionShell>
  );
}
