import type { Metadata } from "next";
import { Info } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { nhsBands, privatePrices } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Prices",
  description:
    "NHS dental charge bands and our private treatment prices. Every patient gets a written treatment plan and estimate before any work starts.",
};

export default function PricesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prices"
        title="What treatment costs"
        intro="NHS dentistry in England is charged in three national bands — the same at every practice. Private treatment is priced per item. Whichever route you take, you get the price in writing before anything starts."
      />

      <section className="container-page py-14 sm:py-16">
        <h2 className="text-2xl font-bold text-brand-900">NHS charges</h2>
        <p className="mt-3 max-w-2xl text-brand-700">
          You pay one band charge per course of treatment, not per item. If you
          need several fillings, that is still a single Band 2 charge.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {nhsBands.map((band) => (
            <div
              key={band.band}
              className="flex flex-col rounded-xl border border-brand-100 bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold text-brand-900">{band.band}</h3>
              <p className="mt-2 text-2xl font-bold text-brand-900">
                {band.price}
              </p>
              <p className="mt-3 text-sm text-brand-700 flex-1">{band.covers}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5 text-sm text-brand-800">
          <p className="flex items-start gap-2.5">
            <Info className="h-5 w-5 shrink-0 text-brand-600 mt-0.5" aria-hidden="true" />
            <span>
              NHS charges are set nationally and change each April. Some
              treatment — an urgent appointment, or a repair to a denture — is
              charged at Band 1. NHS treatment is free if you are under 18 (or
              under 19 in full-time education), pregnant, have had a baby in the
              last 12 months, or receive certain benefits. Check the current
              charges and exemptions at{" "}
              <a
                href="https://www.nhs.uk/nhs-services/dentists/"
                className="font-semibold underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                nhs.uk
              </a>
              .
            </span>
          </p>
        </div>
      </section>

      <section className="bg-brand-50 border-y border-brand-100">
        <div className="container-page py-14 sm:py-16">
          <h2 className="text-2xl font-bold text-brand-900">Private prices</h2>
          <p className="mt-3 max-w-2xl text-brand-700">
            A guide only — your written estimate is the price that counts.
            Complex treatment costs more than the &ldquo;from&rdquo; figure, and
            we will tell you that at the assessment, not afterwards.
          </p>

          <div className="mt-8 overflow-x-auto rounded-xl border border-brand-100 bg-white">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <caption className="sr-only">Private treatment prices</caption>
              <thead className="border-b border-brand-100 bg-brand-50">
                <tr>
                  <th scope="col" className="px-5 py-3.5 font-semibold text-brand-900">
                    Treatment
                  </th>
                  <th scope="col" className="px-5 py-3.5 font-semibold text-brand-900 text-right">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                {privatePrices.map((row) => (
                  <tr key={row.item}>
                    <th scope="row" className="px-5 py-3.5 font-medium text-brand-900">
                      {row.item}
                      {row.note && (
                        <span className="block text-xs font-normal text-brand-600">
                          {row.note}
                        </span>
                      )}
                    </th>
                    <td className="px-5 py-3.5 text-right font-semibold text-brand-900">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-brand-100 bg-white p-6">
          <h2 className="font-semibold text-brand-900">Paying for treatment</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-700">
            [Confirm accepted payment methods and any finance options TBC.]
            Larger courses of private treatment can usually be staged so the cost
            is spread across appointments — ask at reception.
          </p>
        </div>
        <div className="rounded-xl border border-brand-100 bg-white p-6">
          <h2 className="font-semibold text-brand-900">Missed appointments</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-700">
            Please give at least 24 hours&apos; notice if you cannot come, so we
            can offer the slot to someone in pain. [Confirm the practice&apos;s
            missed-appointment policy TBC.]
          </p>
        </div>
      </section>

      <CTASection
        title="Want a price for your own treatment?"
        subtitle="Book an assessment and you will leave with a written plan and estimate."
      />
    </>
  );
}
