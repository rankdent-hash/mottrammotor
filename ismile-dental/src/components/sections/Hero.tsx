import { MapPin } from "lucide-react";
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

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={practice.phoneHref}
              className="inline-flex items-center justify-center rounded-md border border-ink-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-ink-800 lg:hidden"
            >
              Call {practice.phone}
            </a>
            {section.locationAnchor && (
              <a
                href={section.locationAnchor}
                aria-label="Jump to map and address"
                title="Jump to map and address"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-600 text-white transition-colors hover:bg-ink-800"
              >
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div id="enquiry-form" className="scroll-mt-20 text-ink-900 lg:scroll-mt-32">
          <EnquiryForm
            heading={section.formHeading}
            options={section.formOptions}
            buttonLabel={section.buttonLabel}
            defaultOption={section.formOptions[0]}
            extraFields={section.extraFields}
            source={source}
          />
        </div>
      </div>
    </section>
  );
}
