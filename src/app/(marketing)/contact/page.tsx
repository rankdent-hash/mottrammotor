import type { Metadata } from "next";
import { Phone, MapPin, Clock } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Mottram Motor Garage in Manchester — phone, location and opening hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Contact Us"
        intro="Call us, or send a booking request below and we'll get straight back to you."
      />

      <section className="container-page py-14 sm:py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 rounded-xl border border-navy-100 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-navy-900 mb-5">Send us a message</h2>
          <BookingForm />
        </div>

        <aside className="space-y-4 text-sm">
          <div className="rounded-xl bg-navy-50 border border-navy-100 p-6 space-y-4">
            <a href={business.phoneHref} className="flex items-center gap-3 font-semibold text-navy-900">
              <Phone className="h-5 w-5 text-amber-500 shrink-0" aria-hidden="true" />
              {business.phone}
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-navy-700">
                {business.addressLine1}
                <br />
                {business.addressLine2}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-navy-700">
                {business.hours.map((h) => (
                  <div key={h.day}>
                    {h.day}: {h.time}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-navy-100 overflow-hidden aspect-video bg-navy-100 flex items-center justify-center text-navy-400 text-xs">
            Map placeholder — embed Google Maps once the real address is confirmed
          </div>
        </aside>
      </section>
    </>
  );
}
