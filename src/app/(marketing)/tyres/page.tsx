import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import RegPlate from "@/components/RegPlate";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Tyre Fitting in Manchester",
  description:
    "Tyre fitting, balancing, puncture repair and tracking in Manchester. Mottram Motor Garage fits a wide range of tyre brands while you wait.",
};

export default function TyresPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tyres"
        title="Tyre Fitting in Manchester"
        intro="New tyres, punctures, balancing and tracking — fitted while you wait, with a range of budget and premium brands available."
      />

      <section className="container-page py-14 sm:py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-navy-900">Our tyre services</h2>
            <ul className="mt-4 space-y-3">
              {[
                "New tyre supply and fitting — budget to premium brands",
                "Puncture repair (where safe and legal to repair)",
                "Wheel balancing",
                "Wheel alignment / tracking",
                "Tyre pressure monitoring system (TPMS) checks",
                "Seasonal tyre changeovers",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-navy-700">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-navy-50 border border-navy-100 p-6">
            <h2 className="font-semibold text-navy-900">Check your tyres in 30 seconds</h2>
            <p className="mt-2 text-sm text-navy-600">
              Legal minimum tread depth in the UK is 1.6mm across the central
              three-quarters of the tyre. If you&apos;re unsure, pop in and
              we&apos;ll check for free — no appointment needed for a quick
              tyre check.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm sticky top-24">
            <h3 className="font-semibold text-navy-900 mb-1">Get a tyre quote</h3>
            <p className="text-sm text-navy-600 mb-4">
              Enter your registration when you book and we&apos;ll confirm
              the right tyre size for your vehicle.
            </p>
            <RegPlate className="mb-4" />
            <a
              href="/book"
              className="block w-full rounded-md bg-amber-500 py-3 text-center font-semibold text-navy-950 hover:bg-amber-400 transition-colors"
            >
              Book Tyre Fitting
            </a>
          </div>
        </aside>
      </section>

      <RelatedArticles href="/tyres" />

      <CTASection title="Need new tyres?" subtitle="Book online or call us and we'll get you sorted, usually same day." />
    </>
  );
}
