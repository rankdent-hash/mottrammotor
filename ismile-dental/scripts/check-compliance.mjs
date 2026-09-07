#!/usr/bin/env node
// Turns compliance.md into something CI enforces.
//
// The MHRA rules here are legal, not stylistic: advertising a prescription-only
// medicine to the public is a criminal offence under the Human Medicines
// Regulations 2012. This guard covers source text — headings, body copy, meta,
// alt text, form values and schema fields all live in the same files.
//
// It cannot cover the Google Business Profile, social captions or directory
// listings. compliance.md §1 open item 3 flags those as a separate audit.
import { scan, report } from "./_scan.mjs";

const rules = [
  // --- MHRA: prescription-only medicines -----------------------------------
  {
    id: "pom-brand-name",
    pattern: /\b(botox|azzalure|bocouture|dysport|xeomin|vistabel|nuceiva)\b/i,
    why: "names a botulinum toxin product. Advertising a POM to the public is a criminal offence. Use the category — 'anti-wrinkle treatments', 'wrinkle-relaxing injections'. (The /botox-tunbridge-wells/ slug itself is exempted at its definition.)",
  },
  {
    id: "pom-generic-promotional",
    pattern: /\bbotulinum\b/i,
    why: "'botulinum' appears. It is permitted ONLY in the legal under-18s prohibition statement, where it is a restriction and not a claim. Mark that line `allow-pom-generic-promotional` if it is the legal statement.",
  },

  // --- ASA/CAP: superlatives and unevidenced claims -------------------------
  {
    id: "superlative",
    pattern: /\b(best dentist|leading dent|top dentist|number one dent|#1 |world-class|state-of-the-art|cutting-edge)\b/i,
    why: "an unsubstantiated superlative. ASA/CAP breach (compliance.md §4).",
  },
  {
    id: "painless",
    pattern: /\bpainless\b/i,
    why: "'painless' is not a defensible claim. Use 'comfortable', or 'most patients are surprised how little they feel'.",
  },
  {
    id: "protected-term",
    pattern: /\b(specialist|specialty|orthodontic expert)\b/i,
    why: "'specialist' is a protected GDC term, usable only for a clinician on the relevant GDC specialist list. Use 'with a special interest in' or 'extensive experience in'.",
  },
  {
    id: "guarantee",
    pattern: /\b(guarantee[ds]?|guaranteed outcome|lasts a lifetime|lifetime guarantee)\b/i,
    why: "a guarantee claim. The old site ran contradictory 10-year and 5-year guarantees, both unevidenced (compliance.md §4). Needs written terms and legal review.",
  },
  {
    id: "free-consultation",
    pattern: /free consultation/i,
    why: "'free consultation'. Not repeated until the client confirms which appointment types it genuinely covers — an advertised free consultation that is not available is an ASA breach.",
  },
  {
    id: "finance-claim",
    pattern: /0%\s*finance|interest[- ]free/i,
    why: "a finance claim. FCA authorisation and specific disclosure wording are required.",
  },
  {
    id: "comparative-mercury",
    pattern: /one of a few[^.]*mercury|100% completely mercury/i,
    why: "the retired comparative mercury claim. 'We are a mercury-free practice' as plain fact is fine; the comparative is not.",
  },
  {
    id: "aggregate-rating",
    pattern: /aggregateRating|AggregateRating/,
    why: "AggregateRating schema. It may only be present once real, verified reviews are wired in — fabricated ratings are an ASA breach and the fastest way to lose a Google Business Profile.",
  },
];

process.exit(
  report(
    "Regulatory compliance (GDC / ASA / MHRA)",
    await scan(rules),
    "  Read compliance.md before overriding any of these. Several are legal, not stylistic.\n" +
      "  A reviewed exemption is an `allow-<rule id>` comment on the same line.\n"
  )
);
