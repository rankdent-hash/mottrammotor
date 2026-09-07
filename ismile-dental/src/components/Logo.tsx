import { business } from "@/lib/site-data";

// Wordmark drawn in markup rather than shipped as a binary asset — the
// practice has no logo file yet, and inline SVG/text avoids a placeholder
// image that would have to be replaced anyway. Swap this component out for
// an <Image> once real brand assets exist.
export default function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const wordColor = variant === "light" ? "text-white" : "text-brand-900";
  const markBg = variant === "light" ? "bg-white" : "bg-brand-900";
  const markFg = variant === "light" ? "text-brand-900" : "text-white";

  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${markBg} ${markFg}`}
        aria-hidden="true"
      >
        {/* Simplified tooth mark */}
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M12 2.4c-2 0-2.9.9-4.6.9C5.2 3.3 3.6 4.9 3.6 7.6c0 2.2.7 3.6 1.3 5.4.5 1.5.7 2.7.9 4.2.2 1.6.5 3.6 1.9 3.6 1.3 0 1.6-1.5 1.9-3.2.3-1.6.6-3 1.9-3s1.6 1.4 1.9 3c.3 1.7.6 3.2 1.9 3.2 1.4 0 1.7-2 1.9-3.6.2-1.5.4-2.7.9-4.2.6-1.8 1.3-3.2 1.3-5.4 0-2.7-1.6-4.3-3.8-4.3-1.7 0-2.6-.9-4.6-.9Z" />
        </svg>
      </span>
      <span className={`text-lg font-bold tracking-tight ${wordColor}`}>
        i<span className="text-brand-400">Smile</span>
        <span className="sr-only"> {business.name}</span>
      </span>
    </span>
  );
}
