import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleCheckBig, Info, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import TreatmentIcon from "@/components/TreatmentIcon";
import { getTreatment, treatments } from "@/lib/site-data";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(
  props: PageProps<"/treatments/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const treatment = getTreatment(slug);
  if (!treatment) return {};

  return {
    title: treatment.name,
    description: `${treatment.short} ${treatment.nhs ? "Available on the NHS and privately" : "A private treatment"} at iSmile Dental Practice.`,
  };
}

export default async function TreatmentPage(
  props: PageProps<"/treatments/[slug]">
) {
  const { slug } = await props.params;
  const treatment = getTreatment(slug);
  if (!treatment) notFound();

  const related = treatments
    .filter((t) => t.slug !== treatment.slug && t.category === treatment.category)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={treatment.category}
        title={treatment.name}
        intro={treatment.intro}
      />

      <section className="container-page py-14 sm:py-16 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-xl font-semibold text-brand-900">
              What&apos;s involved
            </h2>
            <ul className="mt-4 space-y-3">
              {treatment.involved.map((item) => (
                <li key={item} className="flex items-start gap-3 text-brand-800">
                  <CircleCheckBig
                    className="h-5 w-5 text-brand-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-900">
              This may be right for you if…
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {treatment.suitableFor.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-800"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-brand-200 bg-white p-6">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold text-brand-900">
              <Info className="h-5 w-5 text-brand-600" aria-hidden="true" />
              Good to know
            </h2>
            <p className="mt-3 text-brand-700 leading-relaxed">
              {treatment.goodToKnow}
            </p>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-xl border border-brand-100 bg-brand-50 p-6 lg:sticky lg:top-24">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-brand-800">
              <TreatmentIcon icon={treatment.icon} className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-semibold text-brand-900">
              {treatment.name} at a glance
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-brand-600">Available on the NHS</dt>
                <dd className="font-semibold text-brand-900">
                  {treatment.nhs ? "Yes" : "No — private only"}
                </dd>
              </div>
              {treatment.fromPrice && (
                <div className="flex justify-between gap-4">
                  <dt className="text-brand-600">Private price</dt>
                  <dd className="font-semibold text-brand-900 text-right">
                    {treatment.fromPrice}
                  </dd>
                </div>
              )}
              {treatment.duration && (
                <div className="flex justify-between gap-4">
                  <dt className="text-brand-600">Typical time</dt>
                  <dd className="font-semibold text-brand-900 text-right">
                    {treatment.duration}
                  </dd>
                </div>
              )}
            </dl>
            <Link
              href={`/book?treatment=${encodeURIComponent(treatment.name)}`}
              className="mt-6 block w-full rounded-md bg-coral-600 py-3 text-center font-semibold text-white hover:bg-coral-700 transition-colors"
            >
              Request an appointment
            </Link>
            <p className="mt-3 text-xs text-brand-600">
              Prices are a guide. You will get a written estimate for your own
              treatment before anything starts.
            </p>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="border-t border-brand-100 bg-brand-50">
          <div className="container-page py-12">
            <h2 className="text-lg font-semibold text-brand-900">
              Related treatments
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {related.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-lg border border-brand-100 bg-white px-4 py-3.5 text-sm font-semibold text-brand-900 hover:border-coral-500"
                  >
                    {t.name}
                    <ArrowRight
                      className="h-4 w-4 text-brand-500 group-hover:text-coral-700"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
