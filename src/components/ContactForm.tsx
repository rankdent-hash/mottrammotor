"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { SERVICES } from "@/lib/services";

// ---------------------------------------------------------------------------
// The Contact page's "send us a message" form. Deliberately lighter than
// BookingForm (no reg lookup, no slot picker) — this page is for a general
// enquiry ("someone got in touch"), not a specific appointment request, so
// it posts to /api/leads and lands in the admin Leads tab rather than
// straight into the bookings table. Previously this page reused
// <BookingForm/> itself, which meant every "just asking a question"
// message came with a full vehicle-lookup + slot-picker flow attached —
// swapped 10 Aug for this purpose-built form as part of adding a real
// Leads section to the admin panel.
//
// A name or a plate (or both) is enough to submit — matches the leads
// table's own constraint (supabase/schema.sql) that at least one must be
// present — plus a phone or an email, since staff need some way to follow
// up.
// ---------------------------------------------------------------------------

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const name = data.name?.trim();
    const plate = data.plate?.trim();
    const phone = data.phone?.trim();
    const email = data.email?.trim();

    if (!name && !plate) {
      setStatus("error");
      setError("Let us know your name or your vehicle registration so we know who's asking.");
      return;
    }
    if (!phone && !email) {
      setStatus("error");
      setError("Add a phone number or an email address so we can get back to you.");
      return;
    }

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/leads", {
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
        "Something went wrong sending your message — please call us on 0161 566 1319 instead."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-teal-500/30 bg-teal-100 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-teal-600" aria-hidden="true" />
        <h3 className="mt-3 text-lg font-semibold text-navy-900">Message received</h3>
        <p className="mt-1 text-sm text-navy-700">
          Thanks — we&apos;ll be in touch shortly. For anything urgent, call us on 0161 566 1319.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" name="name" placeholder="Jane Smith" />
        <Field label="Vehicle registration" name="plate" placeholder="AB12 CDE" mono />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Phone number" name="phone" placeholder="07xxx xxxxxx" type="tel" />
        <Field label="Email address" name="email" placeholder="you@example.com" type="email" />
      </div>

      <div>
        <label
          htmlFor="service"
          className="block text-xs font-semibold uppercase tracking-wide text-navy-500 mb-1.5"
        >
          What&apos;s it about?
        </label>
        <select
          id="service"
          name="service"
          defaultValue=""
          className="w-full rounded-md border border-navy-100 bg-navy-50 px-3.5 py-3 text-navy-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="">Not sure / general question</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-semibold uppercase tracking-wide text-navy-500 mb-1.5"
        >
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="How can we help?"
          className="w-full rounded-md border border-navy-100 bg-navy-50 px-3.5 py-3 text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 px-8 py-3.5 font-semibold text-navy-950 hover:bg-amber-400 disabled:opacity-60 transition-colors"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
      <p className="text-xs text-navy-500">
        Want to book a specific slot instead?{" "}
        <a href="/book" className="underline hover:text-navy-700">
          Use the booking form
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  mono = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  mono?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-semibold uppercase tracking-wide text-navy-500 mb-1.5"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-md border border-navy-100 bg-navy-50 px-3.5 py-3 text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
          mono ? "font-mono font-semibold tracking-wider uppercase" : ""
        }`}
      />
    </div>
  );
}
