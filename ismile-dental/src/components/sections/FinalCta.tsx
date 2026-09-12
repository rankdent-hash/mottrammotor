import Link from "next/link";
import Prose from "@/components/Prose";
import { practice } from "@/lib/practice";
import Placeholder from "@/components/Placeholder";
import { unconfirmed } from "@/lib/practice";
import type { FinalCtaSection } from "@/lib/content/types";

/** Section 13. The ask, plus the low-commitment alternative. */
export default function FinalCta({ section }: { section: FinalCtaSection }) {
  return (
    <section className="bg-ink-900 text-white">
      <div className="container-page py-14 text-center sm:py-18">
        <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
          {section.h2}
        </h2>
        <div className="prose-body mx-auto mt-4 max-w-2xl text-ink-100">
          {section.body.map((paragraph, i) => (
            <p key={i}>
              <Prose parts={paragraph} />
            </p>
          ))}
        </div>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/contact/"
            className="inline-flex items-center justify-center rounded-md bg-clay-600 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-clay-700"
          >
            {section.primaryLabel}
          </Link>
          <a
            href={practice.phoneHref}
            className="inline-flex items-center justify-center rounded-md border border-ink-600 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-ink-800"
          >
            Call {practice.phone}
          </a>
        </div>

        <p className="mt-5 text-sm text-ink-100">
          <Prose parts={section.secondary} />
        </p>

        <p className="mt-6 text-sm text-ink-200">
          <Placeholder data={{ placeholder: `[PLACEHOLDER: ${unconfirmed.openingHours}]` }} />
          <br />
          {practice.addressLine}
        </p>
      </div>
    </section>
  );
}
