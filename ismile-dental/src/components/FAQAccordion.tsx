import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/site-data";

export default function FAQAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-brand-100 rounded-xl border border-brand-100 bg-white">
      {items.map((item) => (
        <details key={item.q} className="group p-5 sm:p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-900">
            {item.q}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-brand-500 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-brand-700">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
