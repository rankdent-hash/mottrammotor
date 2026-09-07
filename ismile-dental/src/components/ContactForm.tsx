"use client";

import { useState, type FormEvent } from "react";
import { CircleCheckBig, Loader2, Info } from "lucide-react";
import { business } from "@/lib/site-data";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
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
        body: JSON.stringify({ ...data, type: "contact" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(
        `Something went wrong sending your message. Please call the practice on ${business.phone} instead.`
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-8 text-center">
        <CircleCheckBig className="mx-auto h-10 w-10 text-brand-600" aria-hidden="true" />
        <h2 className="mt-3 text-lg font-semibold text-brand-900">Message sent</h2>
        <p className="mt-1.5 text-sm text-brand-700">
          Thank you — we aim to reply within one working day. This inbox is not
          monitored out of hours, so please call NHS 111 if you need urgent
          dental care.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <fieldset className="space-y-5" disabled={status === "submitting"}>
        <legend className="sr-only">Contact the practice</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold uppercase tracking-wide text-brand-600 mb-1.5"
            >
              Your name <span className="text-coral-700">*</span>
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              className="w-full rounded-md border border-brand-200 px-3.5 py-2.5 text-brand-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-semibold uppercase tracking-wide text-brand-600 mb-1.5"
            >
              Phone number <span className="text-coral-700">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className="w-full rounded-md border border-brand-200 px-3.5 py-2.5 text-brand-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-wide text-brand-600 mb-1.5"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-md border border-brand-200 px-3.5 py-2.5 text-brand-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold uppercase tracking-wide text-brand-600 mb-1.5"
          >
            Message <span className="text-coral-700">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full rounded-md border border-brand-200 px-3.5 py-2.5 text-brand-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
          <p className="mt-2 flex items-start gap-2 text-xs text-brand-600">
            <Info className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
            Please keep clinical details out of this form — email is not a
            secure way to send health information.
          </p>
        </div>

        <label className="flex items-start gap-3 text-sm text-brand-800">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-4 w-4 rounded border-brand-300"
          />
          <span>
            I am happy for the practice to contact me about this message.{" "}
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
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
