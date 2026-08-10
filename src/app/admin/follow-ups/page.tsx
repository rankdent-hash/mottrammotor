"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Check } from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminPreviewBanner from "@/components/admin/AdminPreviewBanner";
import AdminBackBar from "@/components/admin/AdminBackBar";

// Backs the dashboard's "Follow-ups Due" tile — everything open that's
// overdue or due today, matching admin-panel-plan.md's "anything overdue
// or due today" wording (same set the tile's count reflects).
type FollowUpDue = {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  dueLabel: string;
  urgency: "overdue" | "due-soon" | "later";
};

export default function AdminFollowUpsPage() {
  const [followUps, setFollowUps] = useState<FollowUpDue[]>([]);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState<boolean | undefined>(undefined);
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [markingId, setMarkingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/follow-ups", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { followUps?: FollowUpDue[]; configured?: boolean }) => {
        if (cancelled) return;
        setFollowUps(data.followUps ?? []);
        setConfigured(data.configured);
      })
      .catch(() => {
        if (!cancelled) setFollowUps([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function markDone(id: string) {
    setMarkingId(id);
    try {
      const res = await fetch(`/api/admin/follow-ups/${id}/complete`, { method: "POST" });
      if (!res.ok) return;
      setDoneIds((prev) => new Set(prev).add(id));
    } finally {
      setMarkingId(null);
    }
  }

  return (
    <AdminGuard>
      {() => (
        <>
          <AdminBackBar href="/admin/dashboard" title="Follow-ups Due" />
          <AdminPreviewBanner configured={configured} />

          <div className="mx-auto max-w-3xl px-5 py-6">
            {loading && (
              <p className="text-center text-slate-400 py-10 flex items-center justify-center gap-2 text-lg">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Loading…
              </p>
            )}

            {!loading && followUps.length === 0 && (
              <p className="text-center text-slate-400 py-10 text-lg">
                {configured === false
                  ? "Not connected to the database yet."
                  : "Nothing overdue or due today — all caught up."}
              </p>
            )}

            <div className="space-y-3">
              {followUps.map((f) => {
                const done = doneIds.has(f.id);
                return (
                  <div
                    key={f.id}
                    className={`bg-white rounded-2xl shadow p-4 flex items-center gap-4 border-l-4 ${
                      done ? "border-l-green-500 opacity-60" : "border-l-red-500"
                    }`}
                  >
                    <Link href={`/admin/customers/${f.customerId}`} className="flex-1 min-w-0">
                      <div className={`font-bold text-lg text-navy-900 ${done ? "line-through" : ""}`}>
                        {f.customerName}
                      </div>
                      <div className="text-slate-500 truncate">
                        {f.title} &middot; {f.dueLabel}
                      </div>
                    </Link>
                    {done ? (
                      <span className="flex items-center gap-1 text-green-600 font-bold shrink-0">
                        <Check className="h-5 w-5" aria-hidden="true" /> Done
                      </span>
                    ) : (
                      <button
                        onClick={() => markDone(f.id)}
                        disabled={markingId === f.id}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-xl shrink-0 disabled:opacity-50"
                      >
                        {markingId === f.id ? "Saving…" : "Mark Done"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </AdminGuard>
  );
}
