import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { practice, primaryNav, unconfirmed } from "@/lib/practice";
import { locations, locationPagesBuilt } from "@/lib/locations";

const treatmentGroups = primaryNav.find((item) => item.groups)?.groups ?? [];

export default function Footer() {
  return (
    // pb-24 on mobile clears the fixed tap-to-call bar.
    <footer className="bg-ink-950 pb-24 text-ink-100 lg:pb-0">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed">
            An independent private dental and skin clinic in Royal Tunbridge
            Wells, {practice.landmark}.
          </p>

          <address className="mt-5 flex items-start gap-2.5 text-sm not-italic">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
            <span>
              {practice.address.building}
              <br />
              {practice.address.street}
              <br />
              {practice.address.locality}
              <br />
              {practice.address.region} {practice.address.postcode}
            </span>
          </address>

          <div className="mt-4 space-y-2 text-sm">
            <a href={practice.phoneHref} className="flex items-center gap-2.5 hover:text-white">
              <Phone className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
              {practice.phone}
            </a>
            <p className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
              <mark className="rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-900">
                [PLACEHOLDER: {unconfirmed.email}]
              </mark>
            </p>
            <p className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
              <mark className="rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-900">
                [PLACEHOLDER: {unconfirmed.openingHours}]
              </mark>
            </p>
          </div>
        </div>

        {treatmentGroups.map((group) => (
          <div key={group.heading}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              {group.heading}
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Practice</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/our-story/" className="hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link href="/team/" className="hover:text-white">
                Meet the team
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/blog/" className="hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Areas We Serve component — content-brief.md §5. */}
      <div className="border-t border-ink-800">
        <div className="container-page py-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
            Areas we serve
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {locations.map((location) => (
              <li key={location.href}>
                {locationPagesBuilt ? (
                  <Link href={location.href} className="hover:text-white">
                    Dentist near {location.name}
                  </Link>
                ) : (
                  <span className="text-ink-200">{location.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Regulatory footer. A complaints procedure is a GDC Standards
          requirement and was absent sitewide on the old site. */}
      <div className="border-t border-ink-800">
        <div className="container-page space-y-3 py-8 text-xs leading-relaxed">
          <p>
            {practice.name} is an independent private dental practice.{" "}
            {practice.dentist.credit} is registered with the General Dental
            Council; you can check any clinician&apos;s registration on the{" "}
            <a
              href="https://olr.gdc-uk.org/SearchRegister"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              GDC register
            </a>
            .
          </p>
          <p>
            Registered with and inspected by the Care Quality Commission.{" "}
            <mark className="rounded bg-amber-100 px-1.5 py-0.5 text-amber-900">
              [PLACEHOLDER: {unconfirmed.cqcNumber}]
            </mark>
          </p>
          <p>
            <mark className="rounded bg-amber-100 px-1.5 py-0.5 text-amber-900">
              [PLACEHOLDER: complaints procedure — named handler and response
              timescales required, then published as its own page and linked
              here. A GDC Standards requirement, currently missing sitewide.]
            </mark>
          </p>
          <p className="pt-2 text-ink-200">
            © {new Date().getFullYear()} {practice.name}. Information on this
            site is general in nature and is not a substitute for an
            examination by a dentist.
          </p>
        </div>
      </div>
    </footer>
  );
}
