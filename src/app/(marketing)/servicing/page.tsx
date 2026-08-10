import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Car Servicing in Manchester",
  description:
    "Full and interim car servicing in Manchester for all makes and models, carried out to manufacturer schedules by Mottram Motor Garage.",
};

const tiers = [
  {
    name: "Interim Service",
    price: "From £[TBC]",
    recommended: "Every 6 months / 6,000 miles",
    items: [
      "Engine oil and filter change",
      "Full fluid level check and top-up",
      "Brake, tyre and suspension visual check",
      "Lights and battery check",
      "Multi-point safety inspection",
    ],
  },
  {
    name: "Full Service",
    price: "From £[TBC]",
    recommended: "Every 12 months / 12,000 miles",
    items: [
      "Everything in the Interim Service",
      "Air and pollen filter replacement",
      "Spark plug check/replacement",
      "Brake fluid check",
      "Comprehensive under-vehicle inspection",
      "Full diagnostic health check",
    ],
  },
];

export default function ServicingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Car Servicing"
        title="Car Servicing in Manchester"
        intro="Interim and full services carried out to manufacturer schedules, for all makes and models — so your warranty and resale value stay protected."
      />

      <section className="container-page py-14 sm:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              id={tier.name === "Interim Service" ? "interim-service" : "full-service"}
              className="scroll-mt-24 rounded-xl border border-navy-100 bg-white p-7 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-navy-900">{tier.name}</h2>
              <p className="mt-1 text-sm text-navy-500">Recommended: {tier.recommended}</p>
              <p className="mt-4 text-2xl font-bold text-navy-900">{tier.price}</p>
              <ul className="mt-5 space-y-2.5">
                {tier.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-navy-700">
                    <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/book"
                className="mt-6 block w-full rounded-md bg-navy-900 py-3 text-center font-semibold text-white hover:bg-navy-800 transition-colors"
              >
                Book {tier.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-navy-50 border border-navy-100 p-6 text-sm text-navy-700">
          <strong className="text-navy-900">Not sure which service you need?</strong>{" "}
          Tell us your registration and mileage when you book and we&apos;ll
          recommend the right one based on your vehicle&apos;s service
          schedule.
        </div>
      </section>

      <RelatedArticles href="/servicing" />

      <CTASection
        title="Book your service today"
        subtitle="All makes and models welcome, including electric and hybrid vehicles."
      />
    </>
  );
}
