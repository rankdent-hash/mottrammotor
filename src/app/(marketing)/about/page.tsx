import type { Metadata } from "next";
import { ShieldCheck, Users, Wrench, Award } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Mottram Motor Garage — independent MOT testing, servicing and repairs in Manchester.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="About Mottram Motor Garage"
        intro="An independent garage serving Manchester with MOT testing, servicing, repairs and tyre fitting — built on straightforward advice and fair pricing."
      />

      <section className="container-page py-14 sm:py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6 text-navy-700 leading-relaxed">
          <p>
            [Placeholder company story — replace with real background: when
            the garage was founded, who runs it, and what makes it different.
            e.g. years of combined experience, specialisms, or community
            ties to the Manchester/Tameside area.]
          </p>
          <p>
            We believe drivers deserve straight answers: what your car
            actually needs, what it costs, and why — not a list of
            add-ons you didn&apos;t ask for. Every MOT, service and repair
            comes with a clear explanation before we do any work.
          </p>
          <p>
            [Placeholder — add specific accreditations, qualifications (e.g.
            IMI, ATA), or scheme memberships (e.g. RAC Approved Garage,
            Good Garage Scheme) once confirmed.]
          </p>
        </div>

        <aside className="space-y-4">
          {[
            { icon: ShieldCheck, label: "Qualified, experienced technicians" },
            { icon: Wrench, label: "All makes and models welcome" },
            { icon: Award, label: "[Accreditations — confirm and list]" },
            { icon: Users, label: "Local, independent, and here to stay" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-lg border border-navy-100 bg-white p-4 text-sm font-medium text-navy-800">
              <item.icon className="h-5 w-5 text-amber-500 shrink-0" aria-hidden="true" />
              {item.label}
            </div>
          ))}
        </aside>
      </section>

      <CTASection />
    </>
  );
}
