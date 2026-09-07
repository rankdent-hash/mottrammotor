#!/usr/bin/env node
// Fails if any NAP variant retired in research.md §4 reappears in source.
// Pre-launch checklist item: "NAP byte-identical sitewide".
import { scan, report } from "./_scan.mjs";

const DIGITS = "01892547286";
// The only two forms allowed anywhere: the display form and the href form.
const ALLOWED = new Set(["01892 547286", "01892547286"]);

const rules = [
  {
    id: "phone-grouping",
    // Find every run of digits-and-spaces long enough to be a phone number,
    // normalise it, and flag any that IS this practice's number but is not
    // written in one of the two allowed forms. The old site shipped three
    // groupings, one of them baked into a broken `tel:` href.
    test(line) {
      const candidates = line.match(/[\d][\d\s]{7,}[\d]/g) ?? [];
      return candidates.some((raw) => {
        const trimmed = raw.trim();
        return trimmed.replace(/\s/g, "") === DIGITS && !ALLOWED.has(trimmed);
      });
    },
    why: "the practice number written in a grouping other than `01892 547286` (display) or `01892547286` (href).",
  },
  {
    id: "tel-with-space",
    // Only inside a string literal — a `tel:` in prose is not a dial link.
    pattern: /["'`]tel:[^"'`]*\s/,
    why: "a `tel:` href containing a space. It may fail to dial on some devices.",
  },
  {
    id: "address-abbreviated",
    pattern: /Mount Pleasant Ave[^n]/,
    why: '"Mount Pleasant Ave" — the street is spelled out as "Mount Pleasant Avenue".',
  },
  {
    id: "address-no-royal",
    pattern: /Mount Pleasant Avenue,\s*Tunbridge Wells/,
    why: 'the locality is "Royal Tunbridge Wells", not "Tunbridge Wells", in the address.',
  },
  {
    id: "yahoo-email",
    pattern: /ismiledentalpractice@yahoo/i,
    why: "the old Yahoo consumer address. A business-domain address is required (build-plan.md §3.4).",
  },
  {
    id: "entity-name",
    pattern: /iSmile Dental & Skin Clinic/,
    why: '"iSmile Dental & Skin Clinic" — a descriptor, never the entity name.',
  },
  {
    id: "stale-footer",
    pattern: /Dentistify/i,
    why: "the Dentistify \"Diamond Member\" line, to be removed unless the membership is current (build-plan.md §5).",
  },
];

process.exit(
  report(
    "NAP consistency",
    await scan(rules),
    "  Import every NAP value from src/lib/practice.ts. Never hard-code one.\n"
  )
);
