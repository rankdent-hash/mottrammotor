import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Electric & Hybrid Vehicle Servicing in Manchester",
  description:
    "EV and hybrid servicing, MOT testing and diagnostics in Manchester from Mottram Motor Garage.",
};

export default function ElectricHybridPage() {
  return (
    <>
      <PageHeader
        eyebrow="EV & Hybrid"
        title="Electric & Hybrid Vehicle Servicing"
        intro="MOT testing, servicing and diagnostics for electric and hybrid vehicles — [confirm with garage: specific EV certifications/equipment held]."
      />

      <section className="container-page py-14 sm:py-16">
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-navy-900">What we cover</h2>
          <ul className="mt-4 space-y-3">
            {[
              "MOT testing for EVs and hybrids",
              "Routine servicing (brakes, tyres, cabin filters, fluids)",
              "High-voltage system safety checks [confirm certification level]",
              "Hybrid battery health diagnostics",
              "Charging system and onboard charger checks",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-navy-700">
                <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl bg-navy-50 border border-navy-100 p-6 text-sm text-navy-700">
            <strong className="text-navy-900">Note:</strong> EV/hybrid work
            requires specific technician certification (e.g. IMI Level 3
            Award in EV). Confirm accreditation held before publishing this
            page live, and update the copy above to reflect exactly which
            EV/hybrid work is safely offered in-house.
          </div>
        </div>
      </section>

      <RelatedArticles href="/electric-hybrid" />

      <CTASection title="Own an EV or hybrid?" subtitle="Book a service or MOT and let us know your make and model when booking." />
    </>
  );
}
