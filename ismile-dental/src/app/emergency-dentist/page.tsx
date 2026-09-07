import type { Metadata } from "next";
import Link from "next/link";
import { Phone, TriangleAlert, CircleCheckBig } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Emergency Dentist",
  description:
    "Dental emergencies — toothache, a broken tooth, a lost filling or crown, swelling or bleeding. What to do now, when to call NHS 111, and when to go to A&E.",
};

const emergencies = [
  {
    problem: "Severe toothache",
    now: "Take your usual painkiller at the normal dose — paracetamol or ibuprofen, whichever you can take. Avoid very hot or cold food and drink.",
    dont: "Do not hold an aspirin against the gum; it burns the tissue.",
  },
  {
    problem: "Broken or chipped tooth",
    now: "Keep any pieces in milk or saliva and bring them with you. Rinse gently with warm salty water.",
    dont: "Do not chew on that side until we have seen it.",
  },
  {
    problem: "Knocked-out adult tooth",
    now: "Hold it by the crown, not the root. If it is clean, push it back into the socket and bite gently on a clean cloth. Otherwise keep it in milk and call us immediately — minutes matter.",
    dont: "Do not scrub the root or let the tooth dry out.",
  },
  {
    problem: "Lost filling or crown",
    now: "Keep the crown safe and bring it in — it can often be re-cemented. Emergency dental cement from a pharmacy is a reasonable stopgap.",
    dont: "Do not use household glue to stick a crown back.",
  },
  {
    problem: "Swelling or an abscess",
    now: "Call us the same day. Swelling in the face or jaw means infection that will not settle on its own.",
    dont: "Do not wait to see if it goes down overnight.",
  },
  {
    problem: "Bleeding after an extraction",
    now: "Bite firmly on a clean, rolled-up handkerchief or gauze for 20 minutes without checking it. Sit upright.",
    dont: "Do not rinse, spit or smoke — all three restart the bleeding.",
  },
];

export default function EmergencyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Urgent care"
        title="Dental emergencies"
        intro="We keep appointment slots back each day for patients in pain. Call as early in the day as you can — the earlier you ring, the more likely we can see you today."
      />

      <section className="container-page py-10">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-xl bg-brand-900 p-6 text-white lg:col-span-1">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold">
              <Phone className="h-5 w-5 text-brand-400" aria-hidden="true" />
              During opening hours
            </h2>
            <p className="mt-3 text-sm text-brand-100">
              Call the practice on <strong>{business.phone}</strong>. Tell
              reception it is an emergency and describe the problem.
            </p>
            <a
              href={business.phoneHref}
              className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-coral-600 px-5 py-3 font-semibold text-white hover:bg-coral-700 transition-colors"
            >
              Call the practice
            </a>
          </div>

          <div className="rounded-xl border border-brand-200 bg-brand-50 p-6 lg:col-span-1">
            <h2 className="text-lg font-semibold text-brand-900">
              Out of hours
            </h2>
            <p className="mt-3 text-sm text-brand-800">
              Call <strong>NHS 111</strong>. They will assess you and direct you
              to the nearest urgent dental service. NHS 111 is free, 24 hours a
              day.
            </p>
            <p className="mt-3 text-sm text-brand-700">
              You do not need to be registered with a dentist to use it.
            </p>
          </div>

          <div className="rounded-xl border border-coral-500/40 bg-coral-100 p-6 lg:col-span-1">
            <h2 className="flex items-start gap-2.5 text-lg font-semibold text-brand-900">
              <TriangleAlert
                className="h-5 w-5 shrink-0 text-coral-700 mt-0.5"
                aria-hidden="true"
              />
              Go to A&amp;E now if
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-brand-800">
              <li>Swelling is closing your eye</li>
              <li>Swelling affects your breathing or swallowing</li>
              <li>Bleeding will not stop after 20 minutes of firm pressure</li>
              <li>You have a serious injury to the face or jaw</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
          What to do while you wait
        </h2>
        <p className="mt-3 max-w-2xl text-brand-700">
          None of this is a substitute for being seen — it is what helps most in
          the hours before your appointment.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {emergencies.map((item) => (
            <div
              key={item.problem}
              className="rounded-xl border border-brand-100 bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold text-brand-900">{item.problem}</h3>
              <p className="mt-3 flex items-start gap-2.5 text-sm text-brand-800">
                <CircleCheckBig
                  className="h-4 w-4 shrink-0 text-brand-600 mt-0.5"
                  aria-hidden="true"
                />
                {item.now}
              </p>
              <p className="mt-2.5 flex items-start gap-2.5 text-sm text-coral-700">
                <TriangleAlert
                  className="h-4 w-4 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                {item.dont}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-14">
        <div className="rounded-xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-brand-900">
            What an emergency appointment covers
          </h2>
          <p className="mt-3 text-brand-800 leading-relaxed">
            An emergency appointment is about getting you out of pain and making
            the tooth safe — that might be draining an abscess, dressing a tooth,
            or removing it. Definitive treatment such as a root filling or a
            crown is usually booked separately once the pain has settled. We will
            explain which is which, and what each costs, before we start.
          </p>
          <Link
            href="/prices"
            className="mt-5 inline-flex items-center justify-center rounded-md border border-brand-300 px-5 py-2.5 text-sm font-semibold text-brand-900 hover:bg-white transition-colors"
          >
            See our prices
          </Link>
        </div>
      </section>

      <CTASection
        title="Not urgent, but needs looking at?"
        subtitle="Send an appointment request and reception will call you back with the next available slot."
      />
    </>
  );
}
