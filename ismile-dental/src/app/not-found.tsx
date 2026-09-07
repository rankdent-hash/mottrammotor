import Link from "next/link";
import { business } from "@/lib/site-data";

export default function NotFound() {
  return (
    <section className="container-page py-20 sm:py-28 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">
        404
      </p>
      <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 max-w-lg mx-auto text-brand-700">
        The page may have moved or never existed. Try our treatments page, or
        call {business.name} and we will point you in the right direction.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/treatments"
          className="inline-flex items-center justify-center rounded-md bg-coral-600 px-6 py-3.5 font-semibold text-white hover:bg-coral-700 transition-colors"
        >
          Browse treatments
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-brand-200 px-6 py-3.5 font-semibold text-brand-900 hover:bg-brand-50 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
