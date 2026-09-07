import Link from "next/link";
import { CalendarCheck, Phone, Clock, CircleCheckBig } from "lucide-react";
import { business } from "@/lib/site-data";

export default function Hero() {
  return (
    <section className="bg-brand-900 text-white">
      <div className="container-page grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">
            NHS &amp; private dental care
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            A dentist you can actually relax at
          </h1>
          <p className="mt-5 max-w-xl text-brand-100 leading-relaxed">
            {business.name} looks after families across{" "}
            {business.areaServed[0]} and the surrounding area — routine
            check-ups, same-day emergencies, and the bigger work when you need
            it. You will always get a written plan and a price before we start.
          </p>

          <ul className="mt-6 space-y-2.5 text-sm text-brand-100">
            {[
              "Written treatment plan and estimate before any work begins",
              "Extra appointment time for nervous patients, just ask",
              "Free NHS dental care for under-18s",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <CircleCheckBig
                  className="h-5 w-5 shrink-0 text-brand-400"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-coral-600 px-6 py-3.5 font-semibold text-white hover:bg-coral-700 transition-colors"
            >
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Request an Appointment
            </Link>
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-600 px-6 py-3.5 font-semibold text-white hover:bg-brand-800 transition-colors"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              {business.phone}
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 sm:p-8 text-brand-900 shadow-xl">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="h-5 w-5 text-brand-600" aria-hidden="true" />
            Opening hours
          </h2>
          <dl className="mt-4 divide-y divide-brand-100 text-sm">
            {business.hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-4 py-2.5">
                <dt className="text-brand-700">{h.day}</dt>
                <dd className="font-semibold text-right">{h.time}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 rounded-lg bg-brand-50 p-4 text-sm text-brand-800">
            <p className="font-semibold">In pain today?</p>
            <p className="mt-1">
              Call us as early in the day as you can — we keep emergency slots
              back for exactly this.{" "}
              <Link href="/emergency-dentist" className="font-semibold underline">
                Emergency dental care
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
