"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminPreviewBanner from "@/components/admin/AdminPreviewBanner";
import AdminBackBar from "@/components/admin/AdminBackBar";
import PlateBadge from "@/components/admin/PlateBadge";

// -----------------------------------------------------------------------
// Bookings list — backs both the "Today's Bookings" and "All Jobs"
// dashboard tiles. A minimal readable list grouped by status for "All
// Jobs", per website-structure-plan.md §7's phasing: the fuller
// drag-and-drop job board is explicitly future work, not this pass.
// -----------------------------------------------------------------------

type BookingStatus = "requested" | "confirmed" | "completed" | "cancelled";

type Booking = {
  id: string;
  customerName: string;
  plate: string | null;
  serviceType: string;
  dateLabel: string;
  time: string | null;
  status: BookingStatus;
};

const STATUS_STYLES: Record<BookingStatus, string> = {
  requested: "bg-slate-200 text-slate-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<BookingStatus, string> = {
  requested: "Requested",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_ORDER: BookingStatus[] = ["requested", "confirmed", "completed", "cancelled"];

export default function AdminBookingsClient({
  initialScope,
}: {
  initialScope: "today" | "all";
}) {
  const [scope, setScope] = useState<"today" | "all">(initialScope);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState<boolean | undefined>(undefined);

  // Loading starts true (see useState above) for the initial fetch. Later
  // scope switches re-arm it from the button's onClick handler below,
  // rather than synchronously inside this effect — see the comment on the
  // equivalent pattern in the search page.
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/admin/bookings?scope=${scope}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { bookings?: Booking[]; configured?: boolean }) => {
        if (cancelled) return;
        setBookings(data.bookings ?? []);
        setConfigured(data.configured);
      })
      .catch(() => {
        if (!cancelled) setBookings([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [scope]);

  const title = scope === "today" ? "Today's Bookings" : "All Jobs";

  return (
    <AdminGuard>
      {() => (
        <>
          <AdminBackBar href="/admin/dashboard" title={title} />
          <AdminPreviewBanner configured={configured} />

          <div className="mx-auto max-w-3xl px-5 py-6">
            <div className="grid grid-cols-2 gap-2 mb-5">
              <button
                onClick={() => {
                  setScope("today");
                  setLoading(true);
                }}
                className={`font-bold text-lg py-3 rounded-xl border-2 transition ${
                  scope === "today"
                    ? "bg-navy-900 text-white border-navy-900"
                    : "bg-white text-navy-900 border-slate-200"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => {
                  setScope("all");
                  setLoading(true);
                }}
                className={`font-bold text-lg py-3 rounded-xl border-2 transition ${
                  scope === "all"
                    ? "bg-navy-900 text-white border-navy-900"
                    : "bg-white text-navy-900 border-slate-200"
                }`}
              >
                All Jobs
              </button>
            </div>

            {loading && (
              <p className="text-center text-slate-400 py-10 flex items-center justify-center gap-2 text-lg">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Loading…
              </p>
            )}

            {!loading && bookings.length === 0 && (
              <p className="text-center text-slate-400 py-10 text-lg">
                {configured === false ? "Not connected to the database yet." : "No bookings here yet."}
              </p>
            )}

            {!loading && bookings.length > 0 && scope === "today" && (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <BookingCard key={b.id} booking={b} />
                ))}
              </div>
            )}

            {!loading && bookings.length > 0 && scope === "all" && (
              <div className="space-y-6">
                {STATUS_ORDER.map((status) => {
                  const group = bookings.filter((b) => b.status === status);
                  if (group.length === 0) return null;
                  return (
                    <div key={status}>
                      <h2 className="font-bold text-slate-500 text-sm uppercase tracking-wide mb-2">
                        {STATUS_LABELS[status]} ({group.length})
                      </h2>
                      <div className="space-y-3">
                        {group.map((b) => (
                          <BookingCard key={b.id} booking={b} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </AdminGuard>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
      {booking.plate ? (
        <PlateBadge plate={booking.plate} />
      ) : (
        <div
          className="w-16 h-10 rounded-md border-2 border-dashed border-slate-300 shrink-0"
          aria-hidden="true"
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="font-bold text-lg text-navy-900 truncate">{booking.customerName}</div>
        <div className="text-slate-500 truncate">
          {booking.serviceType} &middot; {booking.dateLabel}
          {booking.time ? ` · ${booking.time}` : ""}
        </div>
      </div>
      <span
        className={`text-sm font-bold px-3 py-1.5 rounded-full whitespace-nowrap ${STATUS_STYLES[booking.status]}`}
      >
        {STATUS_LABELS[booking.status]}
      </span>
    </div>
  );
}
