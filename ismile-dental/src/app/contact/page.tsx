import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact & Find Us",
  description:
    "Address, opening hours, phone number and directions for iSmile Dental Practice, plus a form to send the practice a message.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        intro="Reception answers the phone during opening hours. Messages sent through this form are picked up on the next working day — please call NHS 111 if you need urgent dental care."
      />

      <section className="container-page py-14 sm:py-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-brand-900">
            Send us a message
          </h2>
          <p className="mt-2 text-sm text-brand-700">
            For appointments, the{" "}
            <a href="/book" className="font-semibold underline">
              appointment request form
            </a>{" "}
            gets you to the right place faster.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-brand-900">
              {business.name}
            </h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-brand-600 mt-0.5" aria-hidden="true" />
                <address className="not-italic text-brand-800">
                  {business.addressLine1}
                  <br />
                  {business.addressLine2}
                  <br />
                  {business.postcode}
                </address>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 shrink-0 text-brand-600 mt-0.5" aria-hidden="true" />
                <span className="text-brand-800">{business.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 shrink-0 text-brand-600 mt-0.5" aria-hidden="true" />
                <span className="text-brand-800">{business.email}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-brand-100 bg-white p-6">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold text-brand-900">
              <Clock className="h-5 w-5 text-brand-600" aria-hidden="true" />
              Opening hours
            </h2>
            <dl className="mt-4 divide-y divide-brand-100 text-sm">
              {business.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-brand-700">{h.day}</dt>
                  <dd className="font-semibold text-brand-900 text-right">
                    {h.time}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Map placeholder — swap for an embedded map once the practice
              address is confirmed. An iframe pointing at a made-up address
              would be worse than an honest gap. */}
          <div className="rounded-xl border border-dashed border-brand-300 bg-brand-50 p-8 text-center">
            <MapPin className="mx-auto h-8 w-8 text-brand-400" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-brand-900">
              Map to be added
            </p>
            <p className="mt-1 text-sm text-brand-700">
              An embedded map will go here once the practice address is
              confirmed.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
