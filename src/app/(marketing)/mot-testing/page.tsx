import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "MOT Testing in Manchester",
  description:
    "Book your MOT test in Manchester with Mottram Motor Garage. Fast turnaround, clear pass/fail explanations, and same-day retests where possible.",
};

const motFaqs = [
  {
    q: "How much does an MOT cost?",
    a: "[Confirm final MOT price with garage — DVSA maximum fee for a standard car is £54.85.]",
  },
  {
    q: "How long does an MOT take?",
    a: "A standard MOT test itself takes around 45–60 minutes. We recommend booking ahead, though we can often fit same-day tests in subject to availability.",
  },
  {
    q: "What happens if my car fails?",
    a: "We'll explain exactly what failed, in plain English, and give you a no-obligation quote to fix it. If it's minor and safe, we can often complete the repair and retest the same day.",
  },
  {
    q: "Can I bring my car in early?",
    a: "Yes — you can test up to a month (minus a day) before your current MOT expires without losing any time on your renewal date.",
  },
];

export default function MotTestingPage() {
  return (
    <>
      <PageHeader
        eyebrow="MOT Testing"
        title="MOT Testing in Manchester"
        intro="Fully qualified MOT testing for cars, with straightforward explanations if anything needs attention — no jargon, no pressure."
      />

      <section className="container-page py-14 sm:py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-navy-900">What&apos;s included</h2>
            <ul className="mt-4 space-y-3">
              {[
                "Full statutory MOT test covering all required checks",
                "Clear, itemised explanation of any advisories or failures",
                "Free re-check on repairs carried out by us",
                "Digital record of your test result",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-navy-700">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900">Common reasons cars fail</h2>
            <p className="mt-2 text-navy-600 text-sm">
              These are the most frequent MOT failure points nationally — we
              check every one of them as standard.
            </p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {[
                "Worn brake pads or discs",
                "Faulty lights or bulbs",
                "Worn tyres / low tread depth",
                "Windscreen chips or cracks in the driver's view",
                "Suspension wear",
                "Emissions above the legal limit",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-navy-700 text-sm">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-4">MOT FAQs</h2>
            <FAQAccordion items={motFaqs} />
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-xl border border-navy-100 bg-navy-50 p-6 sticky top-24">
            <h3 className="font-semibold text-navy-900">MOT at a glance</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-navy-600">Price</dt>
                <dd className="font-semibold text-navy-900">From £[TBC]</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-navy-600">Duration</dt>
                <dd className="font-semibold text-navy-900">45–60 mins</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-navy-600">Vehicle types</dt>
                <dd className="font-semibold text-navy-900">Cars &amp; light vehicles</dd>
              </div>
            </dl>
            <Link
              href="/book"
              className="mt-6 block w-full rounded-md bg-amber-500 py-3 text-center font-semibold text-navy-950 hover:bg-amber-400 transition-colors"
            >
              Book MOT Now
            </Link>
          </div>
        </aside>
      </section>

      <RelatedArticles href="/mot-testing" />

      <CTASection
        title="Due an MOT soon?"
        subtitle="Book online in under a minute, or call us and we'll find you a slot."
      />
    </>
  );
}
