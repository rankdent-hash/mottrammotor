import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "@/components/Logo";
import { business, primaryNav, treatments } from "@/lib/site-data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    // pb-20 on mobile clears the fixed MobileCTA bar.
    <footer className="bg-brand-950 text-brand-100 pb-20 lg:pb-0">
      <div className="container-page py-12 sm:py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed">{business.tagline}</p>
          <p className="mt-4 text-sm">
            <span className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand-400" aria-hidden="true" />
              <span>
                {business.addressLine1}
                <br />
                {business.addressLine2}
                <br />
                {business.postcode}
              </span>
            </span>
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
            Opening hours
          </h2>
          <dl className="mt-4 space-y-2 text-sm">
            {business.hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-4">
                <dt>{h.day}</dt>
                <dd className="text-right text-white">{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 flex items-start gap-2 text-sm">
            <Clock className="h-4 w-4 mt-0.5 shrink-0 text-brand-400" aria-hidden="true" />
            Outside these hours, call NHS 111 for urgent dental care.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
            Treatments
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {treatments.slice(0, 6).map((t) => (
              <li key={t.slug}>
                <Link href={`/treatments/${t.slug}`} className="hover:text-white">
                  {t.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/treatments" className="font-semibold hover:text-white">
                All treatments
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
            Practice
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 text-sm">
            <a href={business.phoneHref} className="flex items-center gap-2 hover:text-white">
              <Phone className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
              {business.phone}
            </a>
            <a href={business.emailHref} className="flex items-center gap-2 hover:text-white">
              <Mail className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
              {business.email}
            </a>
          </div>
        </div>
      </div>

      {/* Regulatory footer — required on a UK dental practice website. */}
      <div className="border-t border-brand-800">
        <div className="container-page py-8 space-y-3 text-xs leading-relaxed">
          <p>
            {business.regulatory.gdcNote}{" "}
            <a
              href={business.regulatory.gdcRegisterUrl}
              className="underline hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Check the GDC register
            </a>
            .
          </p>
          <p>
            {business.regulatory.cqcNote} CQC provider ID:{" "}
            {business.regulatory.cqcProviderId}.
          </p>
          <p>{business.regulatory.complaintsNote}</p>
          <p className="pt-2 text-brand-200">
            © {year} {business.legalName}, trading as {business.name}. Company
            number {business.companyNumber}. Information on this site is general
            in nature and is not a substitute for an examination by a dentist.
          </p>
        </div>
      </div>
    </footer>
  );
}
