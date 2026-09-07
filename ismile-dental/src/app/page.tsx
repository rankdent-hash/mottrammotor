import Link from "next/link";
import { ArrowRight, TriangleAlert, CircleCheckBig } from "lucide-react";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TreatmentCard from "@/components/TreatmentCard";
import ReviewsSection from "@/components/ReviewsSection";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import { business, faqs, practiceValues, treatments } from "@/lib/site-data";

export default function Home() {
  const featured = treatments.slice(0, 6);

  return (
    <>
      <Hero />
      <TrustBar />

      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
            Treatments we offer
          </h2>
          <p className="mt-3 text-brand-700">
            Everyday dental care on the NHS, plus private options when you want
            them — never instead of them.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => (
            <TreatmentCard key={t.slug} treatment={t} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 font-semibold text-brand-800 hover:text-coral-700"
          >
            See all {treatments.length} treatments
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-brand-50 border-y border-brand-100">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
              How we work
            </h2>
            <p className="mt-3 text-brand-700">
              Four things we hold ourselves to, on every appointment.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {practiceValues.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-brand-100 bg-white p-6"
              >
                <CircleCheckBig
                  className="h-6 w-6 text-brand-600"
                  aria-hidden="true"
                />
                <h3 className="mt-3 font-semibold text-brand-900">{value.title}</h3>
                <p className="mt-1.5 text-sm text-brand-700">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-coral-700">
            In pain today?
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-brand-900">
            Emergency dental appointments
          </h2>
          <p className="mt-4 text-brand-700 leading-relaxed">
            Toothache, a broken tooth, a lost filling or crown, swelling or
            bleeding after an extraction — call us as early in the day as you
            can and we will do our best to see you the same day.
          </p>
          <Link
            href="/emergency-dentist"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-coral-600 px-6 py-3.5 font-semibold text-white hover:bg-coral-700 transition-colors"
          >
            What to do in a dental emergency
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="rounded-xl border border-coral-500/40 bg-coral-100 p-6 sm:p-8">
          <h3 className="flex items-start gap-2.5 font-semibold text-brand-900">
            <TriangleAlert
              className="h-5 w-5 shrink-0 text-coral-700 mt-0.5"
              aria-hidden="true"
            />
            When to go straight to A&amp;E
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-800">
            <li>Facial swelling that is closing your eye</li>
            <li>Swelling affecting your breathing or swallowing</li>
            <li>Bleeding that will not stop after 20 minutes of pressure</li>
            <li>A serious injury to the face, mouth or jaw</li>
          </ul>
          <p className="mt-4 text-sm text-brand-800">
            Outside our opening hours, call{" "}
            <strong>NHS 111</strong> for urgent dental care.
          </p>
        </div>
      </section>

      <ReviewsSection />

      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
            Common questions
          </h2>
          <p className="mt-3 text-brand-700">
            The things people ask reception most often.
          </p>
        </div>
        <div className="mt-10 max-w-3xl mx-auto">
          <FAQAccordion items={faqs.slice(0, 5)} />
          <p className="mt-6 text-center text-sm">
            <Link href="/faqs" className="font-semibold text-brand-800 hover:text-coral-700">
              Read all frequently asked questions
            </Link>
          </p>
        </div>
      </section>

      <CTASection
        subtitle={`Serving ${business.areaServed.join(", ")}. Send a request online and reception will call you back to agree a time.`}
      />
    </>
  );
}
