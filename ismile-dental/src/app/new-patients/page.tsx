import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheckBig, Clock, CreditCard, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "New Patients",
  description:
    "Joining iSmile Dental Practice — what happens at your first appointment, what to bring, NHS and private options, and how to register.",
};

const firstVisit = [
  {
    title: "A conversation first",
    desc: "We go through your dental history, anything that worries you, and what you want out of your care. Nothing happens in the chair until we have had that chat.",
  },
  {
    title: "A full examination",
    desc: "Teeth, gums, bite, jaw joints and soft tissues, plus an oral cancer screening. X-rays only where they will change what we do.",
  },
  {
    title: "A written plan",
    desc: "You leave with a treatment plan and a cost estimate in writing — including what is available on the NHS and what is not.",
  },
  {
    title: "A recall interval",
    desc: "We agree together how soon you should come back. For a healthy adult that can be up to two years; if there is active disease it may be three months.",
  },
];

const bring = [
  "A list of any medicines you take, including anything from a pharmacy",
  "Details of any medical conditions or allergies",
  "Proof of NHS exemption if you do not pay for treatment",
  "Your previous dentist's details, if you would like your records transferred",
];

export default function NewPatientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="New patients"
        title="Joining the practice"
        intro="Whether you are moving into the area, coming back after a long gap, or looking for somewhere calmer than your last practice — here is exactly what to expect."
      />

      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            icon={Users}
            title="NHS availability"
            body="[Confirm current NHS availability TBC.] NHS lists open and close depending on our contracted activity, so please ask — we will tell you honestly where things stand rather than take your details and leave you waiting."
          />
          <InfoCard
            icon={CreditCard}
            title="Private patients"
            body="Private appointments are available without a waiting list. Private care costs more, but it is not better dentistry by default — we will tell you where it genuinely gives you an option the NHS does not."
          />
          <InfoCard
            icon={Clock}
            title="Nervous patients"
            body="Say so when you book and we will allow extra time. Your first appointment can be a conversation and nothing more — no instruments, no treatment, no pressure."
          />
        </div>
      </section>

      <section className="bg-brand-50 border-y border-brand-100">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
              Your first appointment
            </h2>
            <p className="mt-3 text-brand-700">
              Allow about 30 minutes. Nothing on this list costs extra.
            </p>
          </div>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2">
            {firstVisit.map((step, i) => (
              <li
                key={step.title}
                className="rounded-xl border border-brand-100 bg-white p-6"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-900 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-brand-900">{step.title}</h3>
                <p className="mt-1.5 text-sm text-brand-700 leading-relaxed">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-brand-900">What to bring</h2>
          <ul className="mt-5 space-y-3">
            {bring.map((item) => (
              <li key={item} className="flex items-start gap-3 text-brand-800">
                <CircleCheckBig
                  className="h-5 w-5 shrink-0 text-brand-600 mt-0.5"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-brand-900">
            Finding us
          </h2>
          <address className="mt-4 not-italic text-brand-800">
            {business.addressLine1}
            <br />
            {business.addressLine2}
            <br />
            {business.postcode}
          </address>
          <dl className="mt-5 space-y-2 text-sm">
            {business.hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-4">
                <dt className="text-brand-700">{h.day}</dt>
                <dd className="font-semibold text-brand-900 text-right">{h.time}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-md border border-brand-300 px-5 py-2.5 text-sm font-semibold text-brand-900 hover:bg-white transition-colors"
          >
            Directions &amp; parking
          </Link>
        </div>
      </section>

      <CTASection
        title="Ready to register?"
        subtitle="Send us your details and reception will call you back to arrange a first appointment."
      />
    </>
  );
}

function InfoCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Users;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-brand-100 bg-white p-6 shadow-sm">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h2 className="mt-4 font-semibold text-brand-900">{title}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-brand-700">{body}</p>
    </div>
  );
}
