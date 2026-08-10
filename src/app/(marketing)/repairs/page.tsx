import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { repairServices } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Car Repairs in Manchester",
  description:
    "Brakes, clutches, exhausts, diagnostics and more — car repairs in Manchester from Mottram Motor Garage, with honest quotes before any work starts.",
};

export default function RepairsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Car Repairs"
        title="Car Repairs in Manchester"
        intro="From a warning light on the dash to a full brake overhaul — we diagnose the real problem and quote honestly before any work begins."
      />

      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {repairServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <CTASection
        title="Not sure what's wrong with your car?"
        subtitle="Book a diagnostic check and we'll tell you exactly what's going on — no guesswork."
      />
    </>
  );
}
