import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import RelatedArticles from "@/components/RelatedArticles";
import { repairServices } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Indicative pricing for MOT testing, servicing, repairs and tyres at Mottram Motor Garage, Manchester.",
};

const rows = [
  { name: "MOT Test", price: "From £[TBC]" },
  { name: "Interim Service", price: "From £[TBC]" },
  { name: "Full Service", price: "From £[TBC]" },
  { name: "Tyre fitting (per tyre, excl. tyre cost)", price: "From £[TBC]" },
  ...repairServices.map((s) => ({ name: `${s.name} repairs`, price: s.fromPrice ? `From ${s.fromPrice}` : "Quote on inspection" })),
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Pricing"
        intro="Indicative starting prices below — final cost depends on your vehicle and what's needed. We'll always confirm before any work begins."
      />

      <section className="container-page py-14 sm:py-16">
        <div className="max-w-3xl rounded-xl border border-navy-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-navy-900 text-white">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Service</th>
                <th className="text-right px-5 py-3 font-semibold">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100 bg-white">
              {rows.map((row) => (
                <tr key={row.name}>
                  <td className="px-5 py-3.5 text-navy-800">{row.name}</td>
                  <td className="px-5 py-3.5 text-right font-semibold text-navy-900">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-navy-500 max-w-3xl">
          Prices shown are placeholders pending confirmation from the garage.
          Replace every &ldquo;[TBC]&rdquo; with real pricing before this
          page goes live — transparent, accurate pricing is one of the
          biggest trust and conversion factors for garage websites.
        </p>
        <Link
          href="/book"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-amber-500 px-6 py-3.5 font-semibold text-navy-950 hover:bg-amber-400 transition-colors"
        >
          Book Now
        </Link>
      </section>

      <RelatedArticles href="/pricing" />

      <CTASection />
    </>
  );
}
