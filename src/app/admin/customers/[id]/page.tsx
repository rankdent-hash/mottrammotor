"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Plus, Check, Loader2 } from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminPreviewBanner from "@/components/admin/AdminPreviewBanner";
import AdminBackBar from "@/components/admin/AdminBackBar";
import PlateBadge from "@/components/admin/PlateBadge";
import StatusPill from "@/components/admin/StatusPill";
import type { MotStatus } from "@/lib/admin-mock-data";

const QUICK_TAGS = ["Called", "No answer", "Booked in", "Waiting on parts", "Complaint"];

type Tab = "notes" | "followups" | "history";

type Vehicle = {
  id: string;
  plate: string;
  make: string;
  model: string;
  year?: number;
  colour: string;
  motStatus: MotStatus;
  motDueLabel: string;
  serviceLabel: string;
};

type Note = {
  id: string;
  author: string;
  timestamp: string;
  text: string;
  tag?: string;
};

type FollowUp = {
  id: string;
  title: string;
  dueLabel: string;
  urgency: "overdue" | "due-soon" | "later";
  assignedTo: string;
  done: boolean;
};

type HistoryItem = {
  id: string;
  title: string;
  dateLabel: string;
  detail: string;
};

type CustomerDetail = {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicles: Vehicle[];
  notes: Note[];
  followUps: FollowUp[];
  history: HistoryItem[];
};

type LoadState =
  | { status: "loading" }
  | { status: "not-found" }
  | { status: "not-connected" }
  | { status: "error"; message: string }
  | { status: "ready"; customer: CustomerDetail };

export default function AdminCustomerPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [tab, setTab] = useState<Tab>("notes");

  const [draft, setDraft] = useState("");
  const [showComposer, setShowComposer] = useState(false);
  const [savingNote, setSavingNote] = useState(false);

  const [showFollowUpComposer, setShowFollowUpComposer] = useState(false);
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpNote, setFollowUpNote] = useState("");
  const [savingFollowUp, setSavingFollowUp] = useState(false);

  const [markingDoneId, setMarkingDoneId] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    // Deliberately no synchronous setState({ status: "loading" }) here —
    // the initial useState above already covers first mount, and calling
    // setState directly in an effect body (rather than after the fetch
    // settles) triggers cascading renders the React Compiler's lint rule
    // flags. On the rare case `id` changes without a full remount, the
    // previous record stays on screen until the new one loads rather than
    // flashing a loading state.
    fetch(`/api/admin/customers/${id}`, { cache: "no-store" })
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 404) {
          setState({ status: "not-found" });
          return;
        }
        if (res.status === 503) {
          setState({ status: "not-connected" });
          return;
        }
        if (!res.ok) {
          setState({ status: "error", message: "Something went wrong loading this record." });
          return;
        }
        const data = (await res.json()) as { customer: CustomerDetail };
        setState({ status: "ready", customer: data.customer });
      })
      .catch(() => {
        if (!cancelled) {
          setState({ status: "error", message: "Couldn't reach the server — check your connection." });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function addNote(text: string, tag?: string) {
    if (!text.trim() || state.status !== "ready") return;
    setSavingNote(true);
    try {
      const res = await fetch(`/api/admin/customers/${id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tag }),
      });
      if (!res.ok) return;
      const data = (await res.json()) as { note: Note };
      setState((s) =>
        s.status === "ready"
          ? { ...s, customer: { ...s.customer, notes: [data.note, ...s.customer.notes] } }
          : s
      );
    } finally {
      setSavingNote(false);
    }
  }

  async function markDone(followUpId: string) {
    setMarkingDoneId(followUpId);
    try {
      const res = await fetch(`/api/admin/follow-ups/${followUpId}/complete`, { method: "POST" });
      if (!res.ok) return;
      setState((s) =>
        s.status === "ready"
          ? {
              ...s,
              customer: {
                ...s.customer,
                followUps: s.customer.followUps.map((f) =>
                  f.id === followUpId ? { ...f, done: true } : f
                ),
              },
            }
          : s
      );
    } finally {
      setMarkingDoneId(null);
    }
  }

  async function addFollowUp() {
    if (!followUpDate || state.status !== "ready") return;
    setSavingFollowUp(true);
    try {
      const res = await fetch(`/api/admin/customers/${id}/follow-ups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dueDate: followUpDate, note: followUpNote }),
      });
      if (!res.ok) return;
      const data = (await res.json()) as { followUp: FollowUp };
      setState((s) =>
        s.status === "ready"
          ? { ...s, customer: { ...s.customer, followUps: [...s.customer.followUps, data.followUp] } }
          : s
      );
      setFollowUpDate("");
      setFollowUpNote("");
      setShowFollowUpComposer(false);
    } finally {
      setSavingFollowUp(false);
    }
  }

  if (state.status === "loading") {
    return (
      <AdminGuard>
        {() => (
          <>
            <AdminBackBar href="/admin/search" title="Customer Record" />
            <div className="mx-auto max-w-3xl px-5 py-16 text-center text-slate-400 flex items-center justify-center gap-2 text-lg">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Loading customer record…
            </div>
          </>
        )}
      </AdminGuard>
    );
  }

  if (state.status === "not-found") {
    return (
      <AdminGuard>
        {() => (
          <>
            <AdminBackBar href="/admin/search" title="Customer Record" />
            <div className="mx-auto max-w-3xl px-5 py-16 text-center">
              <p className="text-xl font-semibold text-navy-900 mb-2">Customer not found</p>
              <p className="text-slate-500 mb-6">
                There&apos;s no record with that ID.
              </p>
              <Link
                href="/admin/search"
                className="inline-block bg-navy-900 text-white font-semibold px-5 py-3 rounded-xl"
              >
                Back to search
              </Link>
            </div>
          </>
        )}
      </AdminGuard>
    );
  }

  if (state.status === "not-connected" || state.status === "error") {
    return (
      <AdminGuard>
        {() => (
          <>
            <AdminBackBar href="/admin/search" title="Customer Record" />
            <AdminPreviewBanner configured={false} />
            <div className="mx-auto max-w-3xl px-5 py-16 text-center">
              <p className="text-xl font-semibold text-navy-900 mb-2">
                {state.status === "not-connected" ? "Not connected to the database" : "Something went wrong"}
              </p>
              <p className="text-slate-500 mb-6">
                {state.status === "not-connected"
                  ? "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY need to be set before customer records can load."
                  : state.message}
              </p>
              <Link
                href="/admin/search"
                className="inline-block bg-navy-900 text-white font-semibold px-5 py-3 rounded-xl"
              >
                Back to search
              </Link>
            </div>
          </>
        )}
      </AdminGuard>
    );
  }

  const customer = state.customer;
  const heroVehicle = customer.vehicles[0];
  const extraVehicles = customer.vehicles.slice(1);

  return (
    <AdminGuard>
      {() => (
        <>
          <AdminBackBar href="/admin/search" title="Customer Record" />
          <AdminPreviewBanner />

          <div className="mx-auto max-w-3xl px-5 py-6">
            {/* Header card */}
            <div className="bg-white rounded-2xl shadow p-5 mb-4">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-navy-900">{customer.name}</h2>
                  {customer.phone && (
                    <a
                      href={`tel:${customer.phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-2 text-lg font-semibold text-blue-600 mt-1"
                    >
                      <Phone className="h-5 w-5" aria-hidden="true" />
                      {customer.phone}
                    </a>
                  )}
                </div>
                {heroVehicle && <PlateBadge plate={heroVehicle.plate} size="lg" />}
              </div>
              {heroVehicle && (
                <div className="flex flex-wrap gap-3 items-center">
                  <span className="text-slate-600 text-lg">
                    {heroVehicle.make} {heroVehicle.model}
                    {heroVehicle.year ? ` · ${heroVehicle.year}` : ""}
                    {heroVehicle.colour ? ` · ${heroVehicle.colour}` : ""}
                  </span>
                  <StatusPill tone={heroVehicle.motStatus}>{heroVehicle.motDueLabel}</StatusPill>
                  <StatusPill tone="ok">{heroVehicle.serviceLabel}</StatusPill>
                  {extraVehicles.length > 0 && (
                    <span className="text-sm font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
                      +{extraVehicles.length} more vehicle{extraVehicles.length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {(
                [
                  ["notes", "Notes"],
                  ["followups", "Follow-ups"],
                  ["history", "History"],
                ] as [Tab, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`font-bold text-lg py-3 rounded-xl border-2 transition ${
                    tab === key
                      ? "bg-navy-900 text-white border-navy-900"
                      : "bg-white text-navy-900 border-slate-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === "notes" && (
              <div>
                <button
                  onClick={() => setShowComposer((v) => !v)}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold text-lg py-3.5 rounded-xl mb-4 shadow"
                >
                  <Plus className="h-6 w-6" aria-hidden="true" />
                  Add a Note
                </button>

                {showComposer && (
                  <div className="bg-white rounded-2xl shadow p-4 mb-4">
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="What happened?"
                      rows={3}
                      className="w-full text-lg outline-none border border-slate-200 rounded-xl p-3 mb-3"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setShowComposer(false);
                          setDraft("");
                        }}
                        className="px-4 py-2.5 rounded-xl font-semibold text-slate-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          await addNote(draft);
                          setDraft("");
                          setShowComposer(false);
                        }}
                        disabled={savingNote || !draft.trim()}
                        className="px-5 py-2.5 rounded-xl font-semibold bg-navy-900 text-white disabled:opacity-50"
                      >
                        {savingNote ? "Saving…" : "Save Note"}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-5">
                  {QUICK_TAGS.map((tagLabel) => (
                    <button
                      key={tagLabel}
                      onClick={() => addNote(tagLabel, tagLabel)}
                      disabled={savingNote}
                      className="bg-slate-200 hover:bg-slate-300 px-3 py-2 rounded-full text-sm font-semibold text-slate-700 disabled:opacity-50"
                    >
                      {tagLabel}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {customer.notes.length === 0 && (
                    <p className="text-slate-400 text-center py-8">No notes yet — add one above.</p>
                  )}
                  {customer.notes.map((note) => (
                    <div key={note.id} className="bg-white rounded-2xl shadow p-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-navy-900">{note.author}</span>
                        <span className="text-slate-400 text-sm">{note.timestamp}</span>
                      </div>
                      <p className="text-slate-700 text-lg">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "followups" && (
              <div>
                <button
                  onClick={() => setShowFollowUpComposer((v) => !v)}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold text-lg py-3.5 rounded-xl mb-4 shadow"
                >
                  <Plus className="h-6 w-6" aria-hidden="true" />
                  Add a Follow-up
                </button>

                {showFollowUpComposer && (
                  <div className="bg-white rounded-2xl shadow p-4 mb-4 space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-slate-500 mb-1">
                        Due date
                      </label>
                      <input
                        type="date"
                        value={followUpDate}
                        onChange={(e) => setFollowUpDate(e.target.value)}
                        className="w-full text-lg outline-none border border-slate-200 rounded-xl p-3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-500 mb-1">
                        What&apos;s it about?
                      </label>
                      <textarea
                        value={followUpNote}
                        onChange={(e) => setFollowUpNote(e.target.value)}
                        placeholder="e.g. Call about rear tyres"
                        rows={2}
                        className="w-full text-lg outline-none border border-slate-200 rounded-xl p-3"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setShowFollowUpComposer(false);
                          setFollowUpDate("");
                          setFollowUpNote("");
                        }}
                        className="px-4 py-2.5 rounded-xl font-semibold text-slate-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={addFollowUp}
                        disabled={savingFollowUp || !followUpDate}
                        className="px-5 py-2.5 rounded-xl font-semibold bg-navy-900 text-white disabled:opacity-50"
                      >
                        {savingFollowUp ? "Saving…" : "Save Follow-up"}
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {customer.followUps.length === 0 && (
                    <p className="text-slate-400 text-center py-8">
                      Nothing outstanding for this customer.
                    </p>
                  )}
                  {customer.followUps.map((f) => (
                    <div
                      key={f.id}
                      className={`bg-white rounded-2xl shadow p-4 flex items-center gap-4 border-l-4 ${
                        f.done
                          ? "border-l-green-500 opacity-60"
                          : f.urgency === "overdue"
                            ? "border-l-red-500"
                            : f.urgency === "due-soon"
                              ? "border-l-amber-400"
                              : "border-l-slate-300"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-bold text-lg text-navy-900 ${f.done ? "line-through" : ""}`}
                        >
                          {f.title}
                        </div>
                        <div className="text-slate-500">
                          {f.dueLabel} &middot; assigned to {f.assignedTo}
                        </div>
                      </div>
                      {f.done ? (
                        <span className="flex items-center gap-1 text-green-600 font-bold shrink-0">
                          <Check className="h-5 w-5" aria-hidden="true" /> Done
                        </span>
                      ) : (
                        <button
                          onClick={() => markDone(f.id)}
                          disabled={markingDoneId === f.id}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-xl shrink-0 disabled:opacity-50"
                        >
                          {markingDoneId === f.id ? "Saving…" : "Mark Done"}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "history" && (
              <div className="space-y-3">
                {customer.history.length === 0 && (
                  <p className="text-slate-400 text-center py-8">
                    No service history recorded yet.
                  </p>
                )}
                {customer.history.map((h) => (
                  <div
                    key={h.id}
                    className="bg-white rounded-2xl shadow p-4 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-lg text-navy-900">{h.title}</div>
                      <div className="text-slate-500">{h.dateLabel}</div>
                    </div>
                    <span className="text-green-600 font-bold">{h.detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </AdminGuard>
  );
}
