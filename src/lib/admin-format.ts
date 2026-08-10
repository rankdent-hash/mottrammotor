// ---------------------------------------------------------------------------
// Shared date/status formatting for the admin API routes.
//
// Pure functions, no Supabase/env dependency — these turn raw `date`/
// `timestamptz` columns into the same label/tone shapes the admin panel's
// mock data (src/lib/admin-mock-data.ts) used, so swapping the pages over
// to real data didn't require touching PlateBadge/StatusPill or the tab
// rendering logic.
// ---------------------------------------------------------------------------

import type { MotStatus } from "@/lib/admin-mock-data";

const MOT_DUE_SOON_DAYS = 30;
const FOLLOW_UP_DUE_SOON_DAYS = 7;

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

// Postgres `date` columns come back as "YYYY-MM-DD" strings. Parsing that
// directly with `new Date("2026-08-19")` reads it as UTC midnight, which
// can render as the previous day in local timezones west of UTC — parsing
// with an explicit local midnight avoids that off-by-one.
function parseDateOnly(value: string): Date {
  return new Date(`${value}T00:00:00`);
}

export function todayIso(): string {
  return startOfToday().toISOString().slice(0, 10);
}

export function daysFromNowIso(days: number): string {
  const d = startOfToday();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function computeMotStatus(
  motDueDate: string | null | undefined
): { status: MotStatus; label: string } {
  if (!motDueDate) {
    return { status: "ok", label: "MOT date not on record" };
  }
  const due = parseDateOnly(motDueDate);
  const diffDays = Math.round((due.getTime() - startOfToday().getTime()) / 86_400_000);
  const dateLabel = due.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (diffDays < 0) {
    return { status: "overdue", label: `MOT overdue since ${dateLabel}` };
  }
  if (diffDays <= MOT_DUE_SOON_DAYS) {
    return {
      status: "due-soon",
      label:
        diffDays === 0
          ? `MOT due today (${dateLabel})`
          : `MOT due in ${diffDays} day${diffDays === 1 ? "" : "s"} (${dateLabel})`,
    };
  }
  return { status: "ok", label: `MOT: OK until ${dateLabel}` };
}

export function computeServiceLabel(serviceDueDate: string | null | undefined): string {
  if (!serviceDueDate) return "Service: not on record";
  const due = parseDateOnly(serviceDueDate);
  if (due.getTime() < startOfToday().getTime()) return "Service: due now";
  return `Service: OK until ${due.toLocaleDateString("en-GB", { month: "short", year: "numeric" })}`;
}

export function formatFollowUpDue(dueDate: string): {
  label: string;
  urgency: "overdue" | "due-soon" | "later";
} {
  const due = parseDateOnly(dueDate);
  const diffDays = Math.round((due.getTime() - startOfToday().getTime()) / 86_400_000);
  const dateLabel = due.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  if (diffDays < 0) {
    const daysOverdue = Math.abs(diffDays);
    return { label: `Overdue by ${daysOverdue} day${daysOverdue === 1 ? "" : "s"}`, urgency: "overdue" };
  }
  if (diffDays === 0) return { label: "Due today", urgency: "overdue" };
  if (diffDays <= FOLLOW_UP_DUE_SOON_DAYS) return { label: `Due ${dateLabel}`, urgency: "due-soon" };
  return { label: `Due ${dateLabel}`, urgency: "later" };
}

export function formatNoteTimestamp(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const time = d.toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit" });
  if (d.toDateString() === now.toDateString()) return `Today, ${time}`;
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return `Yesterday, ${time}`;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function formatDateLabel(dateStr: string): string {
  return parseDateOnly(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
