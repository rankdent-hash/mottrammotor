"use client";

import { useState, type FormEvent } from "react";
import { CircleCheckBig, Loader2, Info } from "lucide-react";
import { business, treatments } from "@/lib/site-data";

type Status = "idle" | "submitting" | "success" | "error";

const timePreferences = ["Morning", "Afternoon", "Either"];

export default function BookingForm({
  initialTreatment = "",
}: {
  initialTreatment?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "booking" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(
        "Something went wrong sending your request. Please call the practice instead and we will book you in over the phone."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-8 text-center">
        <CircleCheckBig className="mx-auto h-10 w-10 text-brand-600" aria-hidden="true" />
        <h2 className="mt-3 text-lg font-semibold text-brand-900">
          Request received
        </h2>
        <p className="mt-1.5 text-sm text-brand-700">
          Thank you — reception will call you back to confirm a time. This is a
          request, not a confirmed appointment. If you are in pain today, please
          call us rather than waiting for us to ring back.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset className="space-y-5" disabled={status === "submitting"}>
        <legend className="sr-only">Appointment request</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" name="name" required autoComplete="name" />
          <Field
            label="Phone number"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            hint="We will call you back on this number."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email address" name="email" type="email" autoComplete="email" />
          <Select label="Are you already a patient here?" name="patientType">
            <option>New patient</option>
            <option>Existing patient</option>
          </Select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Select label="NHS or private?" name="careType">
            <option>Not sure — please advise</option>
            <option>NHS</option>
            <option>Private</option>
          </Select>
          <Select label="What do you need?" name="treatment" defaultValue={initialTreatment}>
            <option value="">Please choose…</option>
            <option value="Check-up">Routine check-up</option>
            <option value="Emergency">Emergency / in pain</option>
            {treatments.map((t) => (
              <option key={t.slug} value={t.name}>
                {t.name}
              </option>
            ))}
            <option value="Not sure">Something else / not sure</option>
          </Select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Preferred date" name="preferredDate" type="date" />
          <Select label="Preferred time" name="preferredTime">
            {timePreferences.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold uppercase tracking-wide text-brand-600 mb-1.5"
          >
            Anything else we should know?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded-md border border-brand-200 px-3.5 py-2.5 text-brand-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
          <p className="mt-2 flex items-start gap-2 text-xs text-brand-600">
            <Info className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
            Please do not send detailed medical history through this form — we
            will take that securely at your appointment.
          </p>
        </div>

        <label className="flex items-start gap-3 text-sm text-brand-800">
          <input
            type="checkbox"
            name="nervous"
            className="mt-1 h-4 w-4 rounded border-brand-300"
          />
          I am nervous about dental treatment — please allow extra time.
        </label>

        <label className="flex items-start gap-3 text-sm text-brand-800">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-4 w-4 rounded border-brand-300"
          />
          <span>
            I am happy for the practice to contact me about this request.{" "}
            <span className="text-coral-700">*</span>
          </span>
        </label>
      </fieldset>

      {error && (
        <p role="alert" className="rounded-md bg-coral-100 px-4 py-3 text-sm text-coral-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-coral-600 px-6 py-3.5 font-semibold text-white hover:bg-coral-700 disabled:opacity-70 transition-colors sm:w-auto"
      >
        {status === "submitting" && (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        )}
        {status === "submitting" ? "Sending…" : "Send appointment request"}
      </button>

      <p className="text-xs text-brand-600">
        Sending this form is a request, not a confirmed booking — reception will
        contact you to agree a time. If you are in pain today, call{" "}
        {business.phone} instead.
      </p>
    </form>
  );
}

// --- Small form primitives, local to this file -----------------------------

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-semibold uppercase tracking-wide text-brand-600 mb-1.5"
      >
        {label} {required && <span className="text-coral-700">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-md border border-brand-200 px-3.5 py-2.5 text-brand-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
      />
      {hint && <p className="mt-1.5 text-xs text-brand-600">{hint}</p>}
    </div>
  );
}

function Select({
  label,
  name,
  children,
  defaultValue,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
  defaultValue?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-semibold uppercase tracking-wide text-brand-600 mb-1.5"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-brand-200 bg-white px-3.5 py-2.5 text-brand-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
      >
        {children}
      </select>
    </div>
  );
}
