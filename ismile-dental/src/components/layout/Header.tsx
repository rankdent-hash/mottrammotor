"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, MapPin, Menu, X, ChevronDown } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { practice, primaryNav, unconfirmed } from "@/lib/practice";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ink-900 text-white shadow-md">
      {/* Top bar — phone, address, hours (content-brief.md §5). */}
      <div className="hidden border-b border-ink-800 lg:block">
        <div className="container-page flex items-center justify-between gap-6 py-2 text-xs text-ink-100">
          <p className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-ink-400" aria-hidden="true" />
            {practice.addressLine}
          </p>
          <p className="flex items-center gap-4">
            <mark className="rounded bg-amber-100 px-1.5 py-0.5 text-amber-900">
              [PLACEHOLDER: {unconfirmed.openingHours}]
            </mark>
            <a href={practice.phoneHref} className="flex items-center gap-2 font-semibold text-white">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {practice.phone}
            </a>
          </p>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium xl:flex">
          {primaryNav.map((item) =>
            item.groups ? (
              // Hover/focus-driven in CSS rather than React state: a state
              // version has to reconcile mouseenter with click, which is how
              // the panel ends up closing on the click that should open it.
              // focus-within also makes it keyboard-reachable for free.
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 py-2 text-ink-100 transition-colors hover:text-white group-focus-within:text-white"
                >
                  {item.label}
                  <ChevronDown
                    className="h-4 w-4 transition-transform group-hover:rotate-180"
                    aria-hidden="true"
                  />
                </Link>

                <div className="invisible absolute left-1/2 top-full z-50 w-[46rem] -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility] group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-3 gap-6 rounded-xl border border-ink-100 bg-white p-6 text-ink-900 shadow-2xl">
                    {item.groups.map((group) => (
                      <div key={group.heading}>
                        <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                          {group.heading}
                        </p>
                        <ul className="mt-3 space-y-1.5">
                          {group.items.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="flex items-center gap-2 rounded px-2 py-1 text-sm text-ink-800 hover:bg-ink-50 hover:text-clay-700"
                              >
                                <child.icon
                                  className="h-4 w-4 shrink-0 text-ink-500"
                                  aria-hidden="true"
                                />
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-ink-100 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <a
            href={practice.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-ink-100 hover:text-white"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {practice.phone}
          </a>
          <Link
            href="/contact/"
            className="rounded-md bg-clay-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-clay-700"
          >
            Book a consultation
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-800 bg-ink-900 xl:hidden">
          <nav className="container-page flex max-h-[70vh] flex-col overflow-y-auto py-3">
            {primaryNav.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-ink-800 py-2.5 font-medium text-white"
                >
                  {item.label}
                </Link>
                {item.groups?.map((group) => (
                  <div key={group.heading} className="border-b border-ink-800 py-2 pl-3">
                    <p className="py-1 text-xs font-semibold uppercase tracking-wide text-ink-400">
                      {group.heading}
                    </p>
                    {group.items.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 py-1.5 text-sm text-ink-100"
                      >
                        <child.icon className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ))}
            <Link
              href="/contact/"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center rounded-md bg-clay-600 py-3 font-semibold text-white"
            >
              Book a consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
