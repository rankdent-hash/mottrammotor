import type { Metadata } from "next";
import { Phone, Clock, CircleCheckBig } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Request an Appointment",
  description:
    "Request an NHS or private dental appointment at iSmile Dental Practice. Reception will call you back to confirm a time.",
};

export default async function BookPage(props: PageProps<"/book">) {
  // Treatment pages link here with ?treatment=... so the form arrives with
  // the right option already chosen.
  const { treatment } = await props.searchParams;
  const initialTreatment = typeof treatment === "string" ? treatment : "";

  return (
    <>
      <PageHeader
        eyebrow="Appointments"
        title="Request an appointment"
        intro="Fill this in and reception will call you back to agree a time. It takes about a minute, and there is nothing to pay online."
      />

      <section className="container-page py-14 sm:py-16 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BookingForm initialTreatment={initialTreatment} />
        </div>

        <aside className="space-y-5">
          <div className="rounded-xl border border-brand-100 bg-brand-50 p-6">
            <h2 className="flex items-center gap-2.5 font-semibold text-brand-900">
              <Phone className="h-5 w-5 text-brand-600" aria-hidden="true" />
              Would rather call?
            </h2>
            <p className="mt-3 text-sm text-brand-800">
              Reception answers the phone during opening hours and can book you
              in there and then.
            </p>
            <a
              href={business.phoneHref}
              className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-brand-300 px-5 py-2.5 text-sm font-semibold text-brand-900 hover:bg-white transition-colors"
            >
              {business.phone}
            </a>
          </div>

          <div className="rounded-xl border border-brand-100 bg-white p-6">
            <h2 className="flex items-center gap-2.5 font-semibold text-brand-900">
              <Clock className="h-5 w-5 text-brand-600" aria-hidden="true" />
              What happens next
            </h2>
            <ol className="mt-4 space-y-3 text-sm text-brand-700">
              {[
                "We read your request the same working day.",
                "Reception calls you back to agree a date and time.",
                "You get a confirmation, and a reminder before the appointment.",
              ].map((step) => (
                <li key={step} className="flex items-start gap-2.5">
                  <CircleCheckBig
                    className="h-4 w-4 shrink-0 text-brand-600 mt-0.5"
                    aria-hidden="true"
                  />
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-xl border border-coral-500/40 bg-coral-100 p-6">
            <h2 className="font-semibold text-brand-900">In pain right now?</h2>
            <p className="mt-2 text-sm text-brand-800">
              Do not use this form — call the practice as early in the day as you
              can, or NHS 111 if we are closed.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
