// ---------------------------------------------------------------------------
// Booking slot availability.
//
// Generates hourly appointment slots (each booking assumed to take ~60
// minutes) from tomorrow onward, based on the opening hours in
// `business.hours` (src/lib/site-data.ts). Those hours are stored as human
// strings for display on the site (e.g. "Monday – Friday" / "8:30am –
// 5:30pm", "Sunday" / "Closed") rather than structured data, so this file
// includes a small parser for that exact format rather than pulling in a
// date/scheduling library for what is a handful of fixed weekly patterns.
//
// If Supabase is configured, already-booked slots (any booking in that date
// range whose status isn't "cancelled") are filtered out. If it isn't
// configured, there's no bookings table to check against yet, so every
// generated slot is returned as available — that's a reasonable Phase 2
// fallback, not a bug: nothing has been persisted anywhere for it to
// conflict with.
// ---------------------------------------------------------------------------

import { business } from "@/lib/site-data";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";

export type DayAvailability = {
  date: string; // YYYY-MM-DD
  slots: string[]; // "HH:MM", 24-hour, matching <input type="time"> values
};

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type OpenHours = { openMinutes: number; closeMinutes: number };

// Splits a day label into the weekday indices (0 = Sunday .. 6 = Saturday)
// it covers. Handles a single day ("Saturday") or an en-dash/hyphen range
// ("Monday – Friday").
function parseDayRange(dayLabel: string): number[] {
  const parts = dayLabel
    .split(/[–-]/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length === 1) {
    const idx = DAY_NAMES.indexOf(parts[0]);
    return idx === -1 ? [] : [idx];
  }

  const startIdx = DAY_NAMES.indexOf(parts[0]);
  const endIdx = DAY_NAMES.indexOf(parts[parts.length - 1]);
  if (startIdx === -1 || endIdx === -1) return [];

  const days: number[] = [];
  let i = startIdx;
  // Walk forward around the week from start to end (inclusive) — a plain
  // numeric range wouldn't handle a wrap like "Friday – Monday".
  while (true) {
    days.push(i);
    if (i === endIdx) break;
    i = (i + 1) % 7;
  }
  return days;
}

// Parses a single clock time like "8:30am" or "5:30pm" into minutes since
// midnight. Returns null if it doesn't match the expected format.
function parseClockTime(value: string): number | null {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
  if (!match) return null;

  let hour = Number.parseInt(match[1], 10);
  const minute = Number.parseInt(match[2], 10);
  const meridiem = match[3].toLowerCase();

  if (hour === 12) hour = 0;
  if (meridiem === "pm") hour += 12;

  return hour * 60 + minute;
}

// Parses a time range like "8:30am – 5:30pm" into open/close minutes, or
// null if the day is marked "Closed" (or the string doesn't parse).
function parseTimeRange(timeLabel: string): OpenHours | null {
  if (/closed/i.test(timeLabel)) return null;

  const parts = timeLabel.split(/[–-]/).map((p) => p.trim());
  if (parts.length !== 2) return null;

  const openMinutes = parseClockTime(parts[0]);
  const closeMinutes = parseClockTime(parts[1]);
  if (openMinutes === null || closeMinutes === null) return null;

  return { openMinutes, closeMinutes };
}

// Expands business.hours into a lookup from weekday index -> opening hours
// (or null if closed that day).
function getWeeklyOpenHours(): Record<number, OpenHours | null> {
  const weekly: Record<number, OpenHours | null> = {};
  for (const entry of business.hours) {
    const days = parseDayRange(entry.day);
    const hours = parseTimeRange(entry.time);
    for (const day of days) {
      weekly[day] = hours;
    }
  }
  return weekly;
}

function toIsoDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function minutesToTimeLabel(minutes: number): string {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

const SLOT_LENGTH_MINUTES = 60;

export async function getAvailableSlots(days = 14): Promise<DayAvailability[]> {
  const weeklyHours = getWeeklyOpenHours();
  const generated: DayAvailability[] = [];
  const today = new Date();

  for (let offset = 1; offset <= days; offset++) {
    const date = new Date(today);
    date.setDate(date.getDate() + offset);

    const hours = weeklyHours[date.getDay()];
    if (!hours) continue; // closed that day

    const slots: string[] = [];
    for (
      let start = hours.openMinutes;
      start + SLOT_LENGTH_MINUTES <= hours.closeMinutes;
      start += SLOT_LENGTH_MINUTES
    ) {
      slots.push(minutesToTimeLabel(start));
    }

    if (slots.length > 0) {
      generated.push({ date: toIsoDate(date), slots });
    }
  }

  if (!isSupabaseConfigured() || generated.length === 0) {
    return generated;
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return generated;

  try {
    const firstDate = generated[0].date;
    const lastDate = generated[generated.length - 1].date;

    const { data, error } = await supabase
      .from("bookings")
      .select("requested_date, requested_time")
      .gte("requested_date", firstDate)
      .lte("requested_date", lastDate)
      .neq("status", "cancelled");

    if (error) throw error;

    const taken = new Set<string>();
    for (const row of (data ?? []) as { requested_date: string | null; requested_time: string | null }[]) {
      if (!row.requested_date || !row.requested_time) continue;
      // requested_time comes back as "HH:MM:SS" — trim to "HH:MM" to match
      // the generated slot labels.
      taken.add(`${row.requested_date}T${row.requested_time.slice(0, 5)}`);
    }

    for (const day of generated) {
      day.slots = day.slots.filter((slot) => !taken.has(`${day.date}T${slot}`));
    }
  } catch (err) {
    console.error("[availability] failed to check existing bookings, returning unfiltered slots", err);
  }

  return generated;
}
