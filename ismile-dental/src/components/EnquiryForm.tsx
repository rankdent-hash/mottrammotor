"use client";

import { useState, type FormEvent } from "react";
import { CircleCheckBig, Loader2 } from "lucide-react";
import { practice } from "@/lib/practice";

// ---------------------------------------------------------------------------
// The native replacement for the old JotForm iframe
// (form.jotform.com/202874539093362), which was slow, unstyled, invisible to
// analytics as a conversion, had inaccessible field labels, and delivered
// health-related enquiry data to a free Yahoo consumer inbox — a UK GDPR
// problem (compliance.md §5).
//
// Four fields maximum and one button, per content-brief.md §2. Option values
// are indexable text: never put a prescription-only medicine's brand name in
// one.
// ---------------------------------------------------------------------------

type Status = "idle" | "submitting" | "success" | "error";

const CALL_TIMES = ["Morning", "Afternoon", "Evening"];

export default function EnquiryForm({
  heading,
  options,
  buttonLabel,
  /** Pre-selects the page's own treatment on a treatment page. */
  defaultOption,
  source,
  compact = true,
}: {
  heading: string;
  options: string[];
  buttonLabel: string;
  defaultOption?: string;
  source: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-ink-200 bg-ink-50 p-8 text-center">
        <CircleCheckBig className="mx-auto h-9 w-9 text-ink-600" aria-hidden="true" />
        <p className="mt-3 font-semibold text-ink-900">Thank you — we have your details.</p>
        <p className="mt-1.5 text-sm text-ink-700">
          We will call you back at the time you asked for. If it is urgent,
          please ring the practice on {practice.phone}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        compact
          ? "rounded-xl bg-white p-6 shadow-xl ring-1 ring-ink-100 sm:p-7"
          : "rounded-xl border border-ink-100 bg-white p-6 sm:p-8"
      }
    >
      <h2 className="text-lg font-semibold text-ink-900">{heading}</h2>

      <fieldset className="mt-5 space-y-4" disabled={status === "submitting"}>
        <legend className="sr-only">{heading}</legend>

        <Field label="Your name" name="name" autoComplete="name" required />
        <Field label="Phone number" name="phone" type="tel" autoComplete="tel" required />

        <Select
          label="What can we help with?"
          name="interest"
          defaultValue={defaultOption ?? options[0]}
          options={options}
        />
        <Select label="Best time to call" name="callTime" options={CALL_TIMES} />

        <label className="flex items-start gap-3 text-sm text-ink-800">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-4 w-4 shrink-0 rounded border-ink-300"
          />
          <span>
            I agree to iSmile Dental Practice contacting me about this enquiry.{" "}
            <span className="text-clay-700">*</span>
          </span>
        </label>
      </fieldset>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-md bg-clay-100 px-4 py-3 text-sm text-clay-700">
          Something went wrong sending that. Please call the practice on{" "}
          {practice.phone} instead.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-clay-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-clay-700 disabled:opacity-70"
      >
        {status === "submitting" && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
        {status === "submitting" ? "Sending…" : buttonLabel}
      </button>

      {/*
        Required before launch: a privacy notice at a real URL, and a defined
        retention position (compliance.md §5). Written as a link so the copy
        does not have to change when the page exists.
      */}
      <p className="mt-3 text-xs leading-relaxed text-ink-600">
        We use your details only to answer this enquiry. Please do not send
        clinical or medical history through this form — we will take that
        securely at your appointment. See our privacy notice{" "}
        <mark className="rounded bg-amber-100 px-1 text-amber-900 ring-1 ring-amber-300">
          [PLACEHOLDER: privacy notice page required before launch]
        </mark>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={`enquiry-${name}`}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-600"
      >
        {label} {required && <span className="text-clay-700">*</span>}
      </label>
      <input
        id={`enquiry-${name}`}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-md border border-ink-200 px-3.5 py-2.5 text-ink-900 outline-none focus:border-ink-500 focus:ring-2 focus:ring-ink-200"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <div>
      <label
        htmlFor={`enquiry-${name}`}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-600"
      >
        {label}
      </label>
      <select
        id={`enquiry-${name}`}
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-ink-200 bg-white px-3.5 py-2.5 text-ink-900 outline-none focus:border-ink-500 focus:ring-2 focus:ring-ink-200"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
