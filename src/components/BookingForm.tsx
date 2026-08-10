"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Search, Info, Car } from "lucide-react";
import type { VehicleLookupResult } from "@/lib/dvla";
import type { DayAvailability } from "@/lib/availability";

const SERVICE_OPTIONS = [
  "MOT Testing",
  "Full Service",
  "Interim Service",
  "Repair / Diagnostics",
  "Tyres",
  "Air Conditioning",
  "Other / Not sure",
];

// How many total slots (across all dates) to show as pills before the list
// is cut off — keeps the picker to a glance-able size rather than dumping
// every slot for the next fortnight on screen at once.
const MAX_SLOTS_SHOWN = 10;

type Status = "idle" | "submitting" | "success" | "error";
type LookupStatus = "idle" | "loading" | "done";
type AvailabilityStatus = "loading" | "ready" | "unavailable";

export default function BookingForm({ initialReg = "" }: { initialReg?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  // --- Vehicle lookup ------------------------------------------------
  const [reg, setReg] = useState(initialReg);
  const [lookupStatus, setLookupStatus] = useState<LookupStatus>("idle");
  const [lookupResult, setLookupResult] = useState<VehicleLookupResult | null>(null);

  async function runLookup() {
    const cleaned = reg.trim();
    if (!cleaned) return;
    setLookupStatus("loading");
    try {
      const res = await fetch(`/api/vehicle-lookup?reg=${encodeURIComponent(cleaned)}`);
      if (!res.ok) throw new Error("Lookup failed");
      const data = (await res.json()) as VehicleLookupResult;
      setLookupResult(data);
    } catch {
      // Non-blocking — the booking form still works without a vehicle
      // lookup result, so just clear any stale result and move on.
      setLookupResult(null);
    } finally {
      setLookupStatus("done");
    }
  }

  // Prefill from the homepage Hero mini-form (?reg=... -> /book) runs an
  // initial lookup automatically so the result card is there immediately.
  // Deferred with setTimeout rather than calling runLookup() straight from
  // the effect body, so the state update happens outside the synchronous
  // render/effect pass.
  useEffect(() => {
    if (!initialReg.trim()) return;
    const timer = setTimeout(() => {
      runLookup();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Availability / slot picker -------------------------------------
  const [availabilityStatus, setAvailabilityStatus] = useState<AvailabilityStatus>("loading");
  const [days, setDays] = useState<DayAvailability[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAvailability() {
      try {
        const res = await fetch("/api/availability");
        if (!res.ok) throw new Error("Availability request failed");
        const data = (await res.json()) as { days: DayAvailability[] };
        if (cancelled) return;
        if (data.days && data.days.some((d) => d.slots.length > 0)) {
          setDays(data.days);
          setAvailabilityStatus("ready");
        } else {
          setAvailabilityStatus("unavailable");
        }
      } catch {
        if (!cancelled) setAvailabilityStatus("unavailable");
      }
    }

    loadAvailability();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(
        "Something went wrong sending your request — please call us on 0161 566 1319 instead."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-teal-500/30 bg-teal-100 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-teal-600" aria-hidden="true" />
        <h3 className="mt-3 text-lg font-semibold text-navy-900">
          Request received
        </h3>
        <p className="mt-1 text-sm text-navy-700">
          Thanks — we&apos;ll be in touch shortly to confirm your booking. For
          anything urgent, call us on 0161 566 1319.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="reg" className="block text-xs font-semibold uppercase tracking-wide text-navy-500 mb-1.5">
            Registration number <span className="text-amber-600">*</span>
          </label>
          <div className="flex items-stretch gap-2">
            <input
              id="reg"
              name="reg"
              type="text"
              placeholder="AB12 CDE"
              required
              value={reg}
              onChange={(e) => setReg(e.target.value)}
              onBlur={runLookup}
              className="flex-1 min-w-0 rounded-md border border-navy-100 bg-navy-50 px-3.5 py-3 font-mono font-semibold tracking-wider uppercase text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="button"
              onClick={runLookup}
              disabled={lookupStatus === "loading" || !reg.trim()}
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-navy-200 px-3.5 text-xs font-semibold text-navy-700 hover:bg-navy-50 disabled:opacity-50 transition-colors shrink-0"
            >
              {lookupStatus === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Search className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">Look up</span>
            </button>
          </div>
        </div>
        <Select label="Service needed" name="service" options={SERVICE_OPTIONS} required />
      </div>

      {lookupStatus === "loading" && (
        <p className="text-xs text-navy-500 flex items-center gap-1.5">
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          Looking up vehicle details...
        </p>
      )}

      {lookupStatus === "done" && lookupResult && lookupResult.found && (
        <VehicleLookupCard result={lookupResult} />
      )}

      {availabilityStatus === "ready" ? (
        <SlotPicker days={days} selected={selectedSlot} onSelect={setSelectedSlot} />
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Preferred date" name="preferredDate" type="date" />
          <Field label="Preferred time" name="preferredTime" type="time" />
        </div>
      )}

      {availabilityStatus === "ready" && (
        <>
          <input type="hidden" name="preferredDate" value={selectedSlot?.date ?? ""} />
          <input type="hidden" name="preferredTime" value={selectedSlot?.time ?? ""} />
        </>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" name="name" placeholder="Jane Smith" required />
        <Field label="Phone number" name="phone" placeholder="07xxx xxxxxx" required type="tel" />
      </div>

      <Field label="Email address" name="email" placeholder="you@example.com" type="email" />

      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wide text-navy-500 mb-1.5">
          Anything else we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="e.g. warning light on dashboard, noise when braking..."
          className="w-full rounded-md border border-navy-100 bg-navy-50 px-3.5 py-3 text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <label className="flex items-start gap-2.5 text-xs text-navy-600">
        <input
          type="checkbox"
          name="smsConsent"
          className="mt-0.5 h-4 w-4 rounded border-navy-300 text-amber-500 focus:ring-amber-500"
        />
        I&apos;m happy to receive booking confirmations and MOT/service
        reminders by SMS and email.
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 px-8 py-3.5 font-semibold text-navy-950 hover:bg-amber-400 disabled:opacity-60 transition-colors"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === "submitting" ? "Sending request..." : "Request booking"}
      </button>
      <p className="text-xs text-navy-500">
        This sends a booking request — it isn&apos;t confirmed until we get
        back to you. For same-day urgent work, please call.
      </p>
    </form>
  );
}

function VehicleLookupCard({ result }: { result: VehicleLookupResult }) {
  const details = [result.make, result.colour, result.yearOfManufacture]
    .filter(Boolean)
    .join(" · ");

  const motTone =
    result.motStatus?.toLowerCase() === "valid"
      ? "bg-teal-100 text-teal-700"
      : result.motStatus
        ? "bg-red-100 text-red-700"
        : "bg-navy-100 text-navy-600";

  return (
    <div className="rounded-md border border-navy-100 bg-navy-50 p-4">
      <div className="flex items-start gap-3">
        <Car className="h-5 w-5 text-navy-500 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-navy-900">
            {details || "Vehicle found"}
          </p>
          {result.motStatus && (
            <span className={`mt-1.5 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${motTone}`}>
              MOT: {result.motStatus}
            </span>
          )}
          {result.source === "demo" && (
            <p className="mt-1.5 flex items-start gap-1.5 text-xs text-navy-500">
              <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true" />
              {result.note ?? "Demo data — live DVLA lookup not yet connected."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Pure helper: flattens/trims the day list down to at most MAX_SLOTS_SHOWN
// slots in total, kept out of the component body so the render function
// itself never mutates a running counter across renders.
function buildVisibleDays(days: DayAvailability[]): DayAvailability[] {
  const visible: DayAvailability[] = [];
  let shown = 0;
  for (const day of days) {
    if (shown >= MAX_SLOTS_SHOWN) break;
    const slotsToShow = day.slots.slice(0, MAX_SLOTS_SHOWN - shown);
    if (slotsToShow.length === 0) continue;
    shown += slotsToShow.length;
    visible.push({ date: day.date, slots: slotsToShow });
  }
  return visible;
}

function SlotPicker({
  days,
  selected,
  onSelect,
}: {
  days: DayAvailability[];
  selected: { date: string; time: string } | null;
  onSelect: (slot: { date: string; time: string } | null) => void;
}) {
  const visibleDays = buildVisibleDays(days);
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div>
      <p className="block text-xs font-semibold uppercase tracking-wide text-navy-500 mb-2">
        Preferred date &amp; time
      </p>
      <div className="space-y-3">
        {visibleDays.map((day) => {
          const label = dateFormatter.format(new Date(`${day.date}T00:00:00`));

          return (
            <div key={day.date}>
              <p className="text-xs font-semibold text-navy-700 mb-1.5">{label}</p>
              <div className="flex flex-wrap gap-2">
                {day.slots.map((time) => {
                  const isSelected = selected?.date === day.date && selected?.time === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => onSelect(isSelected ? null : { date: day.date, time })}
                      className={`rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                        isSelected
                          ? "bg-amber-500 text-navy-950"
                          : "bg-navy-50 border border-navy-100 text-navy-700 hover:border-amber-400"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-navy-500">
        Don&apos;t see a time that works? Submit the form anyway and mention
        your preference in the notes below, or call us.
      </p>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
  type = "text",
  mono = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  mono?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-wide text-navy-500 mb-1.5">
        {label} {required && <span className="text-amber-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-md border border-navy-100 bg-navy-50 px-3.5 py-3 text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
          mono ? "font-mono font-semibold tracking-wider uppercase" : ""
        }`}
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-wide text-navy-500 mb-1.5">
        {label} {required && <span className="text-amber-600">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-md border border-navy-100 bg-navy-50 px-3.5 py-3 text-navy-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <option value="" disabled>
          Select a service
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
