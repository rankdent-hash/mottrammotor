import Link from "next/link";
import { practice } from "@/lib/practice";

export default function NotFound() {
  return (
    <section className="container-page py-20 text-center sm:py-28">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">404</p>
      <h1 className="mt-3 text-3xl font-bold text-ink-900 sm:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-ink-700">
        It may have moved. Try the treatments menu, or call the practice on{" "}
        {practice.phone} and we will point you in the right direction.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/general-dentistry/"
          className="inline-flex items-center justify-center rounded-md bg-clay-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-clay-700"
        >
          Browse treatments
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-ink-200 px-6 py-3.5 font-semibold text-ink-900 transition-colors hover:bg-ink-50"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
