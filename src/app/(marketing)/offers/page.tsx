import type { Metadata } from "next";
import { Tag } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Current Offers",
  description: "Current MOT, servicing and repair offers from Mottram Motor Garage, Manchester.",
};

export default function OffersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Offers"
        title="Current Offers"
        intro="Seasonal offers and bundle deals will appear here — check back, or ask when you book."
      />

      <section className="container-page py-14 sm:py-16">
        <div className="rounded-xl border border-dashed border-navy-200 bg-navy-50 p-10 text-center max-w-xl mx-auto">
          <Tag className="mx-auto h-8 w-8 text-amber-500" aria-hidden="true" />
          <h2 className="mt-3 font-semibold text-navy-900">No live offers yet</h2>
          <p className="mt-2 text-sm text-navy-600">
            This page is ready to go — add MOT + service bundles, seasonal
            tyre or air-con offers, or referral discounts here whenever
            there&apos;s a promotion running.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
