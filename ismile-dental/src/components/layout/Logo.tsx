import { practice } from "@/lib/practice";

/**
 * Wordmark drawn in markup. The practice has no supplied brand asset, and an
 * invented logo file is worse than honest type — swap this for an <Image>
 * when real artwork arrives.
 */
export default function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const word = variant === "light" ? "text-white" : "text-ink-900";

  return (
    <span className="flex items-baseline gap-2">
      <span className={`text-2xl font-bold tracking-tight ${word}`}>
        i<span className="text-ink-400">Smile</span>
      </span>
      <span
        className={`hidden text-[0.7rem] font-medium uppercase tracking-[0.15em] sm:inline ${
          variant === "light" ? "text-ink-200" : "text-ink-600"
        }`}
      >
        Dental Practice
      </span>
      <span className="sr-only">{practice.name} — home</span>
    </span>
  );
}
