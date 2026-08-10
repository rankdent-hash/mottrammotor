import Link from "next/link";
import { business } from "@/lib/site-data";

export default function CTASection({
  title = "Ready to book your MOT or service?",
  subtitle = "Enter your registration online, or give us a call — we'll find the next available slot.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-navy-900">
      <div className="container-page py-14 sm:py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        <p className="mt-3 text-navy-200 max-w-xl mx-auto">{subtitle}</p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-md bg-amber-500 px-6 py-3.5 font-semibold text-navy-950 hover:bg-amber-400 transition-colors"
          >
            Book Online
          </Link>
          <a
            href={business.phoneHref}
            className="inline-flex items-center justify-center rounded-md border border-navy-600 px-6 py-3.5 font-semibold text-white hover:bg-navy-800 transition-colors"
          >
            Call {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
