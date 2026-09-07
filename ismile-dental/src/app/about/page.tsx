import type { Metadata } from "next";
import { ShieldCheck, Accessibility, Bus, ParkingMeter } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import ReviewsSection from "@/components/ReviewsSection";
import { business, practiceValues, team } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About the Practice",
  description:
    "Meet the team at iSmile Dental Practice, how we work, and our GDC and CQC registration details.",
};

const access = [
  { icon: Accessibility, label: "Step-free access", note: "[Confirm accessibility details TBC]" },
  { icon: ParkingMeter, label: "Parking", note: "[Confirm parking arrangements TBC]" },
  { icon: Bus, label: "Public transport", note: "[Confirm nearest bus/rail links TBC]" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={`Inside ${business.name}`}
        intro="A family practice looking after NHS and private patients. Small enough that you see the same faces, big enough to cover most of what you will ever need."
      />

      <section className="container-page py-14 sm:py-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-brand-900">Our approach</h2>
          <div className="mt-4 space-y-4 text-brand-700 leading-relaxed">
            <p>
              Most dental problems are preventable, and most of the rest are far
              cheaper to fix early. So the appointment we care most about is the
              routine one — the check-up where we find nothing, or find something
              small enough to watch.
            </p>
            <p>
              When treatment is needed, you get the options, the costs and the
              consequences of doing nothing, in writing, before you decide. If
              something can be done on the NHS, we will tell you that before we
              offer a private alternative.
            </p>
            <p>
              [Add the practice&apos;s own history and story here TBC — when it
              opened, who founded it, what has changed.]
            </p>
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:content-start">
          {practiceValues.map((value) => (
            <li
              key={value.title}
              className="rounded-xl border border-brand-100 bg-brand-50 p-5"
            >
              <h3 className="font-semibold text-brand-900">{value.title}</h3>
              <p className="mt-1.5 text-sm text-brand-700">{value.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-brand-50 border-y border-brand-100">
        <div className="container-page py-14 sm:py-16">
          <h2 className="text-2xl font-bold text-brand-900">The team</h2>
          <p className="mt-3 max-w-2xl text-brand-700">
            Every clinician here is registered with the General Dental Council.
            Their registration numbers are published below so you can check them
            on the GDC register yourself.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <article
                key={member.role}
                className="rounded-xl border border-brand-100 bg-white p-6"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700"
                  aria-hidden="true"
                >
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-brand-900">{member.name}</h3>
                <p className="text-sm text-brand-600">{member.role}</p>
                <p className="mt-1 text-xs text-brand-600">GDC {member.gdcNumber}</p>
                <p className="mt-3 text-sm leading-relaxed text-brand-700">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <h2 className="text-2xl font-bold text-brand-900">Getting here</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {access.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-brand-100 bg-white p-6"
            >
              <item.icon className="h-6 w-6 text-brand-600" aria-hidden="true" />
              <h3 className="mt-3 font-semibold text-brand-900">{item.label}</h3>
              <p className="mt-1.5 text-sm text-brand-700">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <ReviewsSection />
      <CTASection />
    </>
  );
}
