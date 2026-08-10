"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Car, Loader2, Search } from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminPreviewBanner from "@/components/admin/AdminPreviewBanner";
import AdminBackBar from "@/components/admin/AdminBackBar";
import type { VehicleLookupResult } from "@/lib/dvla";

// -----------------------------------------------------------------------
// Add New Customer — one screen: name, phone (required), plate (optional,
// auto-fills make/model/year/colour via the existing /api/vehicle-lookup
// route from Phase 2), email (optional). See admin-panel-plan.md §6.
// -----------------------------------------------------------------------

type LookupState = "idle" | "loading" | "done";

export default function AdminNewCustomerPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [plate, setPlate] = useState("");

  const [lookupState, setLookupState] = useState<LookupState>("idle");
  const [lookupResult, setLookupResult] = useState<VehicleLookupResult | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duplicate, setDuplicate] = useState<{ id: string; name?: string } | null>(null);

  async function runLookup() {
    const cleaned = plate.trim();
    if (!cleaned) {
      setLookupResult(null);
      setLookupState("idle");
      return;
    }
    setLookupState("loading");
    try {
      const res = await fetch(`/api/vehicle-lookup?reg=${encodeURIComponent(cleaned)}`);
      const data = (await res.json()) as VehicleLookupResult;
      setLookupResult(data);
    } catch {
      setLookupResult(null);
    } finally {
      setLookupState("done");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setDuplicate(null);

    if (!name.trim() || !phone.trim()) {
      setError("Name and phone are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          plate: plate.trim() || undefined,
          make: lookupResult?.found ? lookupResult.make : undefined,
          colour: lookupResult?.found ? lookupResult.colour : undefined,
          year: lookupResult?.found ? lookupResult.yearOfManufacture : undefined,
          motDueDate: lookupResult?.found ? lookupResult.motExpiryDate : undefined,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setDuplicate({ id: data.existingCustomerId, name: data.existingCustomerName });
        return;
      }
      if (!res.ok) {
        setError(data.error ?? "Couldn't create the customer — try again.");
        return;
      }

      router.push(`/admin/customers/${data.customerId}`);
    } catch {
      setError("Couldn't reach the server — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminGuard>
      {() => (
        <>
          <AdminBackBar href="/admin/dashboard" title="Add New Customer" />
          <AdminPreviewBanner />

          <div className="mx-auto max-w-3xl px-5 py-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-5 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-500 mb-1.5">
                  Full name <span className="text-amber-600">*</span>
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  required
                  className="w-full text-lg border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-slate-500 mb-1.5">
                  Phone number <span className="text-amber-600">*</span>
                </label>
                <input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07xxx xxxxxx"
                  type="tel"
                  required
                  className="w-full text-lg border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label htmlFor="plate" className="block text-sm font-bold text-slate-500 mb-1.5">
                  Number plate <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <div className="flex items-stretch gap-2">
                  <input
                    id="plate"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value.toUpperCase())}
                    onBlur={runLookup}
                    placeholder="AB12 CDE"
                    className="flex-1 min-w-0 text-lg font-mono font-bold tracking-wider uppercase border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={runLookup}
                    disabled={lookupState === "loading" || !plate.trim()}
                    className="shrink-0 flex items-center gap-2 px-4 rounded-xl border-2 border-slate-200 font-bold text-slate-600 disabled:opacity-50"
                  >
                    {lookupState === "loading" ? (
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    ) : (
                      <Search className="h-5 w-5" aria-hidden="true" />
                    )}
                    <span className="hidden sm:inline">Look up</span>
                  </button>
                </div>

                {lookupState === "done" && lookupResult?.found && (
                  <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-4 flex items-start gap-3">
                    <Car className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="font-semibold text-navy-900">
                        {[lookupResult.make, lookupResult.colour, lookupResult.yearOfManufacture]
                          .filter(Boolean)
                          .join(" · ") || "Vehicle found"}
                      </p>
                      {lookupResult.source === "demo" && (
                        <p className="text-sm text-slate-400 mt-1">
                          {lookupResult.note ?? "Demo data — live DVLA lookup not yet connected."}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {lookupState === "done" && lookupResult && !lookupResult.found && (
                  <p className="mt-2 text-sm text-slate-400">
                    No vehicle details found for that plate — you can still save the customer.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-500 mb-1.5">
                  Email <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  type="email"
                  className="w-full text-lg border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-amber-400"
                />
              </div>

              {duplicate && (
                <div className="rounded-xl bg-amber-100 text-amber-900 p-4">
                  <p className="font-bold mb-2">This customer already exists.</p>
                  <Link
                    href={`/admin/customers/${duplicate.id}`}
                    className="inline-block bg-navy-900 text-white font-semibold px-4 py-2.5 rounded-xl"
                  >
                    View {duplicate.name ?? "existing"} record
                  </Link>
                </div>
              )}

              {error && <p className="text-red-500 font-semibold">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold text-lg py-4 rounded-xl shadow disabled:opacity-50"
              >
                {submitting ? "Saving…" : "Save Customer"}
              </button>
            </form>
          </div>
        </>
      )}
    </AdminGuard>
  );
}
