import Prose from "@/components/Prose";
import EnquiryForm from "@/components/EnquiryForm";
import { practice } from "@/lib/practice";
import type { HeroSection } from "@/lib/content/types";

/**
 * Section 1. Every page is a landing page: name the outcome, capture the
 * enquiry before they scroll (content-brief.md §2).
 */
export default function Hero({
  section,
  source,
}: {
  section: HeroSection;
  source: string;
}) {
  return (
    <section className="bg-ink-900 text-white">
      <div className="container-page grid gap-10 py-14 sm:py-18 lg:grid-cols-[1fr_26rem] lg:items-center lg:gap-14">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {section.h1}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-100">
            {section.subhead}
          </p>

          <div className="mt-8 space-y-1.5 text-ink-100">
            {section.underForm.map((line, i) => (
              <p key={i} className={i === 0 ? "font-medium text-white" : "text-sm"}>
                <Prose parts={[line]} />
              </p>
            ))}
          </div>

          <a
            href={practice.phoneHref}
            className="mt-6 inline-flex items-center justify-center rounded-md border border-ink-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-ink-800 lg:hidden"
          >
            Call {practice.phone}
          </a>
        </div>

        <div className="text-ink-900">
          <EnquiryForm
            heading={section.formHeading}
            options={section.formOptions}
            buttonLabel={section.buttonLabel}
            defaultOption={section.formOptions[0]}
            source={source}
          />
        </div>
      </div>
    </section>
  );
}
