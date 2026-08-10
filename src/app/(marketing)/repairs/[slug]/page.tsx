import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import ServiceIcon from "@/components/ServiceIcon";
import RelatedArticles from "@/components/RelatedArticles";
import { repairServices } from "@/lib/site-data";

export function generateStaticParams() {
  return repairServices.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  return repairServices.find((s) => s.slug === slug);
}

export async function generateMetadata(
  props: PageProps<"/repairs/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: `${service.name} Repairs in Manchester`,
    description: `${service.intro} Book ${service.name.toLowerCase()} repairs in Manchester with Mottram Motor Garage.`,
  };
}

export default async function RepairDetailPage(
  props: PageProps<"/repairs/[slug]">
) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Car Repairs"
        title={`${service.name} Repairs`}
        intro={service.intro}
      />

      <section className="container-page py-14 sm:py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-navy-900">What&apos;s included</h2>
            <ul className="mt-4 space-y-3">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-navy-700">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900">Signs you might need this</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {service.warningSigns.map((item) => (
                <li key={item} className="flex items-start gap-3 text-navy-700 text-sm">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-xl border border-navy-100 bg-navy-50 p-6 sticky top-24">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-navy-800">
              <ServiceIcon icon={service.icon} className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-semibold text-navy-900">{service.name} at a glance</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {service.fromPrice && (
                <div className="flex justify-between">
                  <dt className="text-navy-600">Price</dt>
                  <dd className="font-semibold text-navy-900">{service.fromPrice}</dd>
                </div>
              )}
              {service.duration && (
                <div className="flex justify-between">
                  <dt className="text-navy-600">Duration</dt>
                  <dd className="font-semibold text-navy-900">{service.duration}</dd>
                </div>
              )}
            </dl>
            <Link
              href="/book"
              className="mt-6 block w-full rounded-md bg-amber-500 py-3 text-center font-semibold text-navy-950 hover:bg-amber-400 transition-colors"
            >
              Book {service.name}
            </Link>
          </div>
        </aside>
      </section>

      <RelatedArticles href={`/repairs/${service.slug}`} />

      <CTASection />
    </>
  );
}
