import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TreatmentIcon from "@/components/TreatmentIcon";
import type { Treatment } from "@/lib/site-data";

export default function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <Link
      href={`/treatments/${treatment.slug}`}
      className="group flex flex-col rounded-xl border border-brand-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-coral-500 transition-all"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-800 group-hover:bg-coral-100 group-hover:text-coral-700 transition-colors">
        <TreatmentIcon icon={treatment.icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-semibold text-brand-900">{treatment.name}</h3>
      <p className="mt-1.5 text-sm text-brand-700 flex-1">{treatment.short}</p>
      <span className="mt-4 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800 group-hover:text-coral-700">
          Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
        <span
          className={
            treatment.nhs
              ? "rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-800"
              : "rounded-full bg-coral-100 px-2.5 py-0.5 text-xs font-semibold text-coral-700"
          }
        >
          {treatment.nhs ? "NHS & private" : "Private"}
        </span>
      </span>
    </Link>
  );
}
