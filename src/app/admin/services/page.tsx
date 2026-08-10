"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminPreviewBanner from "@/components/admin/AdminPreviewBanner";
import AdminBackBar from "@/components/admin/AdminBackBar";

// -----------------------------------------------------------------------
// Services tab — one card per service the garage offers (src/lib/services.ts,
// the same list customers pick from on the booking/contact forms), showing
// open jobs, recently completed jobs, and interested new leads for each.
// The dashboard's existing tiles are MOT/booking-centric (Today's
// Bookings, MOT Due Soon); this gives staff a glance across everything
// else too — tyres, servicing, repairs, air-con — not just MOT work.
//
// Each card links to the bookings list pre-filtered to that service
// (?service=<name>, see AdminBookingsClient) so "12 open Tyres jobs" is
// one tap away from the actual list.
// -----------------------------------------------------------------------

type ServiceSummary = {
  name: string;
  openBookings: number;
  completedBookings: number;
  newLeads: number;
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/services/summary", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { services?: ServiceSummary[]; configured?: boolean }) => {
        if (cancelled) return;
        setServices(data.services ?? []);
        setConfigured(data.configured);
      })
      .catch(() => {
        if (!cancelled) setServices([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AdminGuard>
      {() => (
        <>
          <AdminBackBar href="/admin/dashboard" title="Our Services" />
          <AdminPreviewBanner configured={configured} />

          <div className="mx-auto max-w-3xl px-5 py-6">
            {loading && (
              <p className="text-center text-slate-400 py-10 flex items-center justify-center gap-2 text-lg">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Loading…
              </p>
            )}

            {!loading && configured === false && (
              <p className="text-center text-slate-400 py-10 text-lg">
                Not connected to the database yet.
              </p>
            )}

            {!loading && configured !== false && (
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <Link
                    key={s.name}
                    href={`/admin/bookings?service=${encodeURIComponent(s.name)}`}
                    className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3 border-b-4 border-b-teal-500 hover:shadow-lg transition"
                  >
                    <span className="font-bold text-navy-900 text-lg">{s.name}</span>
                    <div className="flex flex-wrap gap-2">
                      <Stat label="Open jobs" value={s.openBookings} tone="bg-blue-100 text-blue-700" />
                      <Stat
                        label="Completed"
                        value={s.completedBookings}
                        tone="bg-green-100 text-green-700"
                      />
                      {s.newLeads > 0 && (
                        <Stat
                          label="New leads"
                          value={s.newLeads}
                          tone="bg-amber-100 text-amber-700"
                        />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </AdminGuard>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${tone}`}>
      {value} {label}
    </span>
  );
}
