import { isPlaceholder, type TrustStripSection } from "@/lib/content/types";
import Placeholder from "@/components/Placeholder";
import { Check } from "lucide-react";

/** Section 2. Proof chips directly under the hero. */
export default function TrustStrip({ section }: { section: TrustStripSection }) {
  return (
    <section className="border-b border-sand-200 bg-sand-50">
      <div className="container-page flex flex-wrap gap-x-8 gap-y-3 py-4">
        {section.items.map((item, i) => (
          <p key={i} className="flex items-center gap-2 text-sm font-medium text-ink-800">
            <Check className="h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
            {isPlaceholder(item) ? <Placeholder data={item} /> : item}
          </p>
        ))}
      </div>
    </section>
  );
}
