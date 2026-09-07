import Link from "next/link";
import { Phone, CalendarCheck, MapPin } from "lucide-react";
import { business } from "@/lib/site-data";

export default function MobileCTA() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-3 bg-brand-950 text-white text-xs font-semibold shadow-[0_-2px_10px_rgba(0,0,0,0.25)]">
      <a
        href={business.phoneHref}
        className="flex flex-col items-center justify-center gap-1 py-2.5 border-r border-brand-800"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call
      </a>
      <Link
        href="/book"
        className="flex flex-col items-center justify-center gap-1 py-2.5 bg-coral-600 border-r border-coral-700"
      >
        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        Book
      </Link>
      <Link
        href="/contact"
        className="flex flex-col items-center justify-center gap-1 py-2.5"
      >
        <MapPin className="h-4 w-4" aria-hidden="true" />
        Find Us
      </Link>
    </div>
  );
}
