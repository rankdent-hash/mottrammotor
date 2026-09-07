import Link from "next/link";
import { business } from "@/lib/site-data";

export default function CTASection({
  title = "Ready to book an appointment?",
  subtitle = "Send a request online and we will come back to you with a time, or call the practice and we will find you one now.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-brand-900">
      <div className="container-page py-14 sm:py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        <p className="mt-3 text-brand-100 max-w-xl mx-auto">{subtitle}</p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-md bg-coral-600 px-6 py-3.5 font-semibold text-white hover:bg-coral-700 transition-colors"
          >
            Request an Appointment
          </Link>
          <a
            href={business.phoneHref}
            className="inline-flex items-center justify-center rounded-md border border-brand-600 px-6 py-3.5 font-semibold text-white hover:bg-brand-800 transition-colors"
          >
            Call {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
