"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminPreviewBanner from "@/components/admin/AdminPreviewBanner";
import AdminBackBar from "@/components/admin/AdminBackBar";
import PlateBadge from "@/components/admin/PlateBadge";
import StatusPill from "@/components/admin/StatusPill";
import type { MotStatus } from "@/lib/admin-mock-data";

type VehicleDue = {
  id: string;
  plate: string;
  make: string;
  model: string;
  motStatus: MotStatus;
  motDueLabel: string;
  customerId: string;
  customerName: string;
  phone: string;
};

export default function AdminMotDueSoonPage() {
  const [vehicles, setVehicles] = useState<VehicleDue[]>([]);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/vehicles/mot-due-soon", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { vehicles?: VehicleDue[]; configured?: boolean }) => {
        if (cancelled) return;
        setVehicles(data.vehicles ?? []);
        setConfigured(data.configured);
      })
      .catch(() => {
        if (!cancelled) setVehicles([]);
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
          <AdminBackBar href="/admin/dashboard" title="MOT Due Soon" />
          <AdminPreviewBanner configured={configured} />

          <div className="mx-auto max-w-3xl px-5 py-6">
            {loading && (
              <p className="text-center text-slate-400 py-10 flex items-center justify-center gap-2 text-lg">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Loading…
              </p>
            )}

            {!loading && vehicles.length === 0 && (
              <p className="text-center text-slate-400 py-10 text-lg">
                {configured === false
                  ? "Not connected to the database yet."
                  : "Nothing due in the next 30 days."}
              </p>
            )}

            <div className="space-y-3">
              {vehicles.map((v) => (
                <Link
                  key={v.id}
                  href={`/admin/customers/${v.customerId}`}
                  className="w-full text-left bg-white rounded-2xl shadow p-4 flex items-center gap-4 hover:shadow-lg border border-slate-200 transition"
                >
                  <PlateBadge plate={v.plate} />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-lg text-navy-900 truncate">{v.customerName}</div>
                    <div className="text-slate-500 truncate">
                      {v.make} {v.model} &middot; {v.phone}
                    </div>
                  </div>
                  <StatusPill tone={v.motStatus}>{v.motDueLabel}</StatusPill>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </AdminGuard>
  );
}
