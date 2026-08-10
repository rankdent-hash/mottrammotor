"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminPreviewBanner from "@/components/admin/AdminPreviewBanner";
import AdminBackBar from "@/components/admin/AdminBackBar";
import PlateBadge from "@/components/admin/PlateBadge";
import StatusPill from "@/components/admin/StatusPill";
import type { MotStatus } from "@/lib/admin-mock-data";

type SearchVehicle = {
  id: string;
  plate: string;
  make: string;
  model: string;
  motStatus: MotStatus;
  motDueLabel: string;
};

type SearchCustomer = {
  id: string;
  name: string;
  phone: string;
  vehicles: SearchVehicle[];
};

export default function AdminSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchCustomer[]>([]);
  const [loading, setLoading] = useState(false);
  const [configured, setConfigured] = useState<boolean | undefined>(undefined);

  // setQuery/setLoading/setResults here run inside an onChange event
  // handler, not inside the debounce effect below — keeps the effect's own
  // body free of synchronous setState calls (see the effect's comment).
  function handleQueryChange(value: string) {
    setQuery(value);
    if (value.trim()) {
      setLoading(true);
    } else {
      setLoading(false);
      setResults([]);
    }
  }

  useEffect(() => {
    const q = query.trim();
    if (!q) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      fetch(`/api/admin/customers/search?q=${encodeURIComponent(q)}`, { cache: "no-store" })
        .then((res) => res.json())
        .then((data: { customers?: SearchCustomer[]; configured?: boolean }) => {
          if (cancelled) return;
          setResults(data.customers ?? []);
          setConfigured(data.configured);
        })
        .catch(() => {
          if (!cancelled) setResults([]);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <AdminGuard>
      {() => (
        <>
          <AdminBackBar href="/admin/dashboard" title="Find a Customer" />
          <AdminPreviewBanner configured={configured} />

          <div className="mx-auto max-w-3xl px-5 py-6">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="bg-white rounded-2xl shadow p-4 mb-4 flex items-center gap-3 border-2 border-amber-400"
            >
              {loading ? (
                <Loader2 className="h-6 w-6 text-slate-500 shrink-0 animate-spin" aria-hidden="true" />
              ) : (
                <Search className="h-6 w-6 text-slate-500 shrink-0" aria-hidden="true" />
              )}
              <input
                autoFocus
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Type a name, phone number, or number plate…"
                className="flex-1 text-xl font-semibold outline-none min-w-0"
              />
            </form>
            <p className="text-slate-500 mb-4 text-base">
              Type any of these — the same box works for all three:{" "}
              <strong>number plate</strong>, <strong>name</strong>, or{" "}
              <strong>phone number</strong>.
            </p>

            <div className="space-y-3">
              {query.trim() !== "" && !loading && results.length === 0 && (
                <p className="text-center text-slate-400 py-10 text-lg">
                  No matches — check the spelling and try again.
                </p>
              )}
              {results.flatMap((customer) =>
                customer.vehicles.length > 0 ? (
                  customer.vehicles.map((vehicle) => (
                    <Link
                      key={vehicle.id}
                      href={`/admin/customers/${customer.id}`}
                      className="w-full text-left bg-white rounded-2xl shadow p-4 flex items-center gap-4 hover:shadow-lg border border-slate-200 transition"
                    >
                      <PlateBadge plate={vehicle.plate} />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-lg text-navy-900 truncate">
                          {customer.name}
                        </div>
                        <div className="text-slate-500 truncate">
                          {vehicle.make} {vehicle.model} &middot; {customer.phone}
                        </div>
                      </div>
                      <StatusPill tone={vehicle.motStatus}>
                        {vehicle.motStatus === "ok"
                          ? "MOT: OK"
                          : vehicle.motStatus === "overdue"
                            ? "MOT overdue"
                            : "MOT due soon"}
                      </StatusPill>
                    </Link>
                  ))
                ) : (
                  <Link
                    key={customer.id}
                    href={`/admin/customers/${customer.id}`}
                    className="w-full text-left bg-white rounded-2xl shadow p-4 flex items-center gap-4 hover:shadow-lg border border-slate-200 transition"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-lg text-navy-900 truncate">
                        {customer.name}
                      </div>
                      <div className="text-slate-500 truncate">
                        {customer.phone} &middot; no vehicle on record
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </>
      )}
    </AdminGuard>
  );
}
