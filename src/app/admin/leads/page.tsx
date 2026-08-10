"use client";

import { useEffect, useState } from "react";
import { Loader2, Phone, Mail, UserCheck, UserX, UserPlus2 } from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminPreviewBanner from "@/components/admin/AdminPreviewBanner";
import AdminBackBar from "@/components/admin/AdminBackBar";
import PlateBadge from "@/components/admin/PlateBadge";

// -----------------------------------------------------------------------
// Leads list — backs the dashboard's "New Leads" tile. Shows every lead
// grouped by status (same "fetch once, group client-side" pattern as
// AdminBookingsClient's "All Jobs" view), newest first within each group.
//
// A lead's display name falls back to its plate, and vice versa — the
// leads table only requires one of the two (supabase/schema.sql), so a
// plate-only lead still needs *something* to show as its heading.
// -----------------------------------------------------------------------

type LeadStatus = "new" | "contacted" | "booked" | "lost";

type Lead = {
  id: string;
  name: string | null;
  plate: string | null;
  phone: string | null;
  email: string | null;
  serviceInterest: string | null;
  message: string | null;
  source: "contact_form" | "phone" | "walk_in" | "other";
  status: LeadStatus;
  createdLabel: string;
};

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  booked: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  booked: "Converted",
  lost: "Lost",
};

const SOURCE_LABELS: Record<Lead["source"], string> = {
  contact_form: "Contact form",
  phone: "Phone",
  walk_in: "Walk-in",
  other: "Other",
};

const STATUS_ORDER: LeadStatus[] = ["new", "contacted", "booked", "lost"];

function displayName(lead: Lead): string {
  if (lead.name) return lead.name;
  if (lead.plate) return `Unnamed — ${lead.plate}`;
  return "Unknown enquiry";
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState<boolean | undefined>(undefined);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/leads", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { leads?: Lead[]; configured?: boolean }) => {
        if (cancelled) return;
        setLeads(data.leads ?? []);
        setConfigured(data.configured);
      })
      .catch(() => {
        if (!cancelled) setLeads([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function setStatus(id: string, status: LeadStatus) {
    setBusyId(id);
    setActionError(null);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } catch {
      setActionError("Couldn't update that lead — try again.");
    } finally {
      setBusyId(null);
    }
  }

  async function convert(id: string) {
    setBusyId(id);
    setActionError(null);
    try {
      const res = await fetch(`/api/admin/leads/${id}/convert`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error ?? "Couldn't convert this lead — try again.");
        return;
      }
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: "booked" } : l)));
    } catch {
      setActionError("Couldn't convert this lead — try again.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <AdminGuard>
      {() => (
        <>
          <AdminBackBar href="/admin/dashboard" title="Leads" />
          <AdminPreviewBanner configured={configured} />

          <div className="mx-auto max-w-3xl px-5 py-6">
            {loading && (
              <p className="text-center text-slate-400 py-10 flex items-center justify-center gap-2 text-lg">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Loading…
              </p>
            )}

            {!loading && leads.length === 0 && (
              <p className="text-center text-slate-400 py-10 text-lg">
                {configured === false
                  ? "Not connected to the database yet."
                  : "No leads yet — messages from the Contact page will show up here."}
              </p>
            )}

            {actionError && (
              <p className="mb-4 text-sm font-semibold text-red-600 text-center">{actionError}</p>
            )}

            {!loading && leads.length > 0 && (
              <div className="space-y-6">
                {STATUS_ORDER.map((status) => {
                  const group = leads.filter((l) => l.status === status);
                  if (group.length === 0) return null;
                  return (
                    <div key={status}>
                      <h2 className="font-bold text-slate-500 text-sm uppercase tracking-wide mb-2">
                        {STATUS_LABELS[status]} ({group.length})
                      </h2>
                      <div className="space-y-3">
                        {group.map((lead) => (
                          <LeadCard
                            key={lead.id}
                            lead={lead}
                            busy={busyId === lead.id}
                            onMarkContacted={() => setStatus(lead.id, "contacted")}
                            onMarkLost={() => setStatus(lead.id, "lost")}
                            onConvert={() => convert(lead.id)}
                          />
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

function LeadCard({
  lead,
  busy,
  onMarkContacted,
  onMarkLost,
  onConvert,
}: {
  lead: Lead;
  busy: boolean;
  onMarkContacted: () => void;
  onMarkLost: () => void;
  onConvert: () => void;
}) {
  const canConvert = Boolean(lead.name && lead.phone) && lead.status !== "booked";
  const canMarkContacted = lead.status === "new";
  const canMarkLost = lead.status === "new" || lead.status === "contacted";

  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-3">
      <div className="flex items-center gap-4">
        {lead.plate ? (
          <PlateBadge plate={lead.plate} />
        ) : (
          <div
            className="w-16 h-10 rounded-md border-2 border-dashed border-slate-300 shrink-0"
            aria-hidden="true"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-lg text-navy-900 truncate">{displayName(lead)}</div>
          <div className="text-slate-500 truncate">
            {lead.serviceInterest || "General enquiry"} &middot; {SOURCE_LABELS[lead.source]}
            &middot; {lead.createdLabel}
          </div>
        </div>
        <span
          className={`text-sm font-bold px-3 py-1.5 rounded-full whitespace-nowrap ${STATUS_STYLES[lead.status]}`}
        >
          {STATUS_LABELS[lead.status]}
        </span>
      </div>

      {(lead.phone || lead.email) && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
          {lead.phone && (
            <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 hover:text-navy-900">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {lead.phone}
            </a>
          )}
          {lead.email && (
            <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-navy-900">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {lead.email}
            </a>
          )}
        </div>
      )}

      {lead.message && <p className="text-sm text-slate-500 italic">&ldquo;{lead.message}&rdquo;</p>}

      {(canConvert || canMarkContacted || canMarkLost) && (
        <div className="flex flex-wrap gap-2 pt-1">
          {canMarkContacted && (
            <button
              onClick={onMarkContacted}
              disabled={busy}
              className="inline-flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-sm px-3.5 py-2 rounded-xl disabled:opacity-50 transition"
            >
              <UserCheck className="h-4 w-4" aria-hidden="true" />
              Mark Contacted
            </button>
          )}
          {canConvert && (
            <button
              onClick={onConvert}
              disabled={busy}
              className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-3.5 py-2 rounded-xl disabled:opacity-50 transition"
            >
              <UserPlus2 className="h-4 w-4" aria-hidden="true" />
              Convert to Customer
            </button>
          )}
          {canMarkLost && (
            <button
              onClick={onMarkLost}
              disabled={busy}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 font-semibold text-sm px-3.5 py-2 rounded-xl disabled:opacity-50 transition"
            >
              <UserX className="h-4 w-4" aria-hidden="true" />
              Mark Lost
            </button>
          )}
        </div>
      )}
    </div>
  );
}
