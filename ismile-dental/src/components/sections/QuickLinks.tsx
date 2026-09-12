import type { QuickLinksSection } from "@/lib/content/types";

/**
 * A ribbon of jump links straight after the hero — someone who landed on
 * this page for one specific reason (the phone number, the map, the hours)
 * shouldn't have to scroll and read to find it.
 */
export default function QuickLinks({ section }: { section: QuickLinksSection }) {
  return (
    <nav aria-label="Quick links" className="border-b border-ink-100 bg-white">
      <div className="container-page flex gap-2 overflow-x-auto py-3 sm:justify-center sm:gap-3">
        {section.items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex shrink-0 items-center gap-2 rounded-full border border-ink-100 px-4 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-clay-500 hover:text-clay-700"
          >
            <item.icon className="h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
