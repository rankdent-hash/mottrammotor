import Link from "next/link";
import { Phone, CalendarCheck } from "lucide-react";
import { practice } from "@/lib/practice";

/** Sticky tap-to-call bar (content-brief.md §5, pre-launch checklist). */
export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 bg-ink-950 text-sm font-semibold text-white shadow-[0_-2px_10px_rgba(0,0,0,0.25)] lg:hidden">
      <a
        href={practice.phoneHref}
        className="flex items-center justify-center gap-2 border-r border-ink-800 py-3.5"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call {practice.phone}
      </a>
      <Link href="/contact/" className="flex items-center justify-center gap-2 bg-clay-600 py-3.5">
        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        Book
      </Link>
    </div>
  );
}
