"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { business, primaryNav } from "@/lib/site-data";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-navy-900 text-white shadow-md">
      <div className="container-page flex items-center justify-between h-16 sm:h-20">
        <Link href="/" className="flex items-center shrink-0" aria-label={`${business.name} — home`}>
          <span className="flex items-center rounded-md bg-white px-3 py-1.5 sm:px-3.5 sm:py-2">
            <Image
              src="/logo-horizontal.png"
              alt={business.name}
              width={300}
              height={120}
              priority
              className="h-8 sm:h-9 w-auto"
            />
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-navy-100 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <a
            href={business.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-navy-100 hover:text-white"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {business.phone}
          </a>
          <Link
            href="/book"
            className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-amber-400 transition-colors"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="xl:hidden inline-flex items-center justify-center rounded-md p-2 text-white"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-navy-700 bg-navy-900">
          <nav className="container-page flex flex-col py-3">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-navy-100 hover:text-white border-b border-navy-800 last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={business.phoneHref}
              className="mt-3 flex items-center justify-center gap-2 rounded-md border border-navy-700 py-2.5 font-semibold"
            >
              <Phone className="h-4 w-4" /> Call {business.phone}
            </a>
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center rounded-md bg-amber-500 py-2.5 font-semibold text-navy-950"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
