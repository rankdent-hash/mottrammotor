import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock } from "lucide-react";
import { business, primaryNav } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100 pb-16 lg:pb-0">
      <div className="container-page py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="inline-flex items-center rounded-xl bg-white p-3 mb-4">
            <Image
              src="/logo-badge.png"
              alt={business.name}
              width={256}
              height={220}
              className="h-16 w-auto"
            />
          </span>
          <p className="text-sm text-navy-300 max-w-xs">
            Independent MOT testing, car servicing, repairs and tyre fitting
            serving {business.addressLine2}.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
            Services
          </h3>
          <ul className="space-y-2 text-sm">
            {primaryNav.slice(0, 5).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white">About Us</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">Advice &amp; Guides</Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-white">Reviews</Link>
            </li>
            <li>
              <Link href="/offers" className="hover:text-white">Offers</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="text-white font-semibold mb-1 text-sm uppercase tracking-wide">
            Get in touch
          </h3>
          <a href={business.phoneHref} className="flex items-center gap-2 hover:text-white">
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            {business.phone}
          </a>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              {business.addressLine1}, {business.addressLine2}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              {business.hours.map((h) => (
                <div key={h.day}>
                  {h.day}: {h.time}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="container-page py-5 flex flex-col sm:flex-row gap-2 justify-between text-xs text-navy-400">
          <p>
            © {new Date().getFullYear()} {business.legalName}. Company No.{" "}
            {business.companyNumber}. All rights reserved.
            {" · "}
            <Link href="/admin" className="hover:text-white underline underline-offset-2">
              Staff Login
            </Link>
          </p>
          <p>Manchester, UK</p>
        </div>
      </div>
    </footer>
  );
}
