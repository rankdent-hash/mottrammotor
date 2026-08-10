import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceIcon from "./ServiceIcon";
import type { ServiceSummary } from "@/lib/site-data";

export default function ServiceCard({ service }: { service: ServiceSummary }) {
  return (
    <Link
      href={`/repairs/${service.slug}`}
      className="group flex flex-col rounded-xl border border-navy-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-amber-400 transition-all"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-navy-800 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
        <ServiceIcon icon={service.icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-semibold text-navy-900">{service.name}</h3>
      <p className="mt-1.5 text-sm text-navy-600 flex-1">{service.short}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 group-hover:text-amber-600">
        Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
