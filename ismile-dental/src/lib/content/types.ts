// ---------------------------------------------------------------------------
// The 13-section landing page structure from content-brief.md §2, as types.
//
// Every page is data. Nothing about a page's markup lives in its content
// module, and nothing about its copy lives in a component. That keeps 22
// pages consistent, makes a section fix apply everywhere at once, and leaves
// the copy in a shape the agency can edit without touching React.
//
// Section numbers below map 1:1 to the brief so a copy file can be followed
// top to bottom. Pages may omit sections that don't apply and add the extras
// at the bottom of this union where the brief gives them one.
// ---------------------------------------------------------------------------

import type { LucideIcon } from "lucide-react";

/** A marked gap. Renders visibly; never fill one with a plausible guess. */
export type Placeholder = { placeholder: string };

export function isPlaceholder(v: unknown): v is Placeholder {
  return typeof v === "object" && v !== null && "placeholder" in v;
}

/** Body text that may be interrupted by a placeholder mid-sentence. */
export type Prose = (string | Placeholder)[];

export type Link = { label: string; href: string };

export type TableRow = { cells: (string | Placeholder)[] };
export type Table = { headers: string[]; rows: TableRow[] };

// --- Section 1 -------------------------------------------------------------

/**
 * Four fields maximum, one button (content-brief.md §2). `formOptions` is the
 * "what can we help with" dropdown; on a treatment page it is pre-filled to
 * that treatment. Values are indexable text — never put a product name in one.
 */
export type HeroSection = {
  type: "hero";
  h1: string;
  subhead: string;
  formHeading: string;
  formOptions: string[];
  /** Never "Submit". */
  buttonLabel: string;
  /**
   * Four fields maximum is the rule for a treatment page's hero. The Contact
   * page is specified with six, so the extras are opt-in per page rather than
   * something a page can drift into.
   */
  extraFields?: ("email" | "message")[];
  underForm: Prose;
  /**
   * An in-page anchor (e.g. "#location") for a small map-pin button rendered
   * beside the hero copy — a one-tap jump straight to the map/address section
   * for anyone who opened the page only to find directions. Omit on pages
   * that have no such section to jump to.
   */
  locationAnchor?: string;
};

// --- Section 2 -------------------------------------------------------------

export type TrustStripSection = {
  type: "trustStrip";
  items: (string | Placeholder)[];
};

/**
 * A ribbon of jump links, typically placed straight after the hero so a
 * visitor can get to "call", "directions" or "opening hours" in one tap
 * without reading the page. Each href is an in-page anchor or a direct
 * action link (tel:) — never an external link, so it never needs a new tab.
 */
export type QuickLinksSection = {
  type: "quickLinks";
  items: { label: string; href: string; icon: LucideIcon }[];
};

// --- Sections 3 & 4 --------------------------------------------------------

/** "You might recognise this" (3) and "The outcome" (4) share a shape. */
export type ProseSection = {
  type: "recognise" | "outcome";
  h2: string;
  body: Prose[];
};

// --- Section 5 -------------------------------------------------------------

export type WhyChooseSection = {
  type: "whyChoose";
  h2: string;
  points: { title: string; body: Prose }[];
};

// --- Section 6 -------------------------------------------------------------

/**
 * The biggest credibility gap in the rebuild (research.md §7). Three static
 * quotes so the section survives the embed failing to load, plus the embed
 * itself. Every quote in the pack is a placeholder — publishing invented
 * reviews is an ASA breach.
 *
 * `embed: false` on the anti-wrinkle page: a live review naming a toxin brand
 * would still be the practice's publication (compliance.md §1 open item 5).
 */
export type ReviewsSection = {
  type: "reviews";
  h2: string;
  aggregate: Placeholder;
  embed: boolean;
  quotes: { quote: Placeholder; attribution: string }[];
  link?: Link;
};

// --- Section 7 -------------------------------------------------------------

/** The SEO/AEO engine room. Free-form blocks so any page shape fits. */
export type ExplainerBlock =
  | { kind: "h3"; text: string }
  | { kind: "p"; text: Prose }
  /** The definitional sentence a model will quote. Rendered with emphasis. */
  | { kind: "definition"; text: string }
  | { kind: "list"; items: Prose[] }
  | { kind: "table"; table: Table }
  | { kind: "link"; link: Link }
  | { kind: "note"; text: Prose }
  /**
   * The practice's postal address, pulled from `practice.ts` rather than
   * typed out here — a `list` block renders one bullet per line, which reads
   * like a set of unrelated facts rather than a single address.
   */
  | { kind: "address" }
  /** Embedded map + "Get directions" link, both derived from `practice.ts`. */
  | { kind: "map" };

export type ExplainerSection = {
  type: "explainer";
  h2: string;
  blocks: ExplainerBlock[];
  /** Anchor id for in-page jump links (a quick-links ribbon, a hero button). */
  id?: string;
};

// --- Section 8 -------------------------------------------------------------

export type JourneySection = {
  type: "journey";
  h2: string;
  steps: { title: string; body: Prose }[];
};

// --- Section 9 -------------------------------------------------------------

export type CostSection = {
  type: "cost";
  h2: string;
  intro?: Prose[];
  table?: Table;
  notes?: Prose[];
  link?: Link;
};

// --- Section 10 ------------------------------------------------------------

/** "X vs Y" content — disproportionately strong for AI retrieval. */
export type ComparisonSection = {
  type: "comparison";
  h2: string;
  intro?: Prose[];
  table?: Table;
  blocks?: ExplainerBlock[];
};

// --- Section 11 ------------------------------------------------------------

/** Answer-first. Emitted as FAQPage schema as well as rendered. */
export type FaqsSection = {
  type: "faqs";
  h2: string;
  items: { q: string; a: Prose }[];
};

// --- Section 12 ------------------------------------------------------------

/** Framed as travel convenience, never as a keyword list. */
export type AreasSection = {
  type: "areas";
  h2: string;
  body: Prose[];
};

// --- Section 13 ------------------------------------------------------------

export type FinalCtaSection = {
  type: "finalCta";
  h2: string;
  body: Prose[];
  primaryLabel: string;
  secondary: Prose;
};

// --- Extras, where a page earns one ----------------------------------------

/** Risks and side effects, stated honestly. Required on the aesthetics pages. */
export type RiskSection = {
  type: "risk";
  h2: string;
  blocks: ExplainerBlock[];
};

/**
 * A team member card. Fields marked clinical-only in the brief are optional
 * here and must be omitted entirely for reception and administrative staff —
 * publishing a GDC number for someone who does not hold one is worse than
 * publishing nothing.
 */
export type TeamMember = {
  name: string | Placeholder;
  role: string | Placeholder;
  /** Clinical staff only. Rendered as "GDC Number: XXXXX". */
  gdc?: string | Placeholder;
  /** Always a placeholder until real practice photography exists. */
  photo: Placeholder;
  fields: { label: string; value: string | Placeholder }[];
  bio: Prose[];
  pullQuote?: Placeholder;
  link?: Link;
};

export type TeamSection = {
  type: "team";
  h2: string;
  intro?: Prose[];
  members: TeamMember[];
};

/** Urgent/emergency block, placed high. Extractions page. */
export type UrgentSection = {
  type: "urgent";
  h2: string;
  body: Prose[];
};

export type Section =
  | HeroSection
  | TrustStripSection
  | QuickLinksSection
  | ProseSection
  | WhyChooseSection
  | ReviewsSection
  | ExplainerSection
  | JourneySection
  | CostSection
  | ComparisonSection
  | FaqsSection
  | AreasSection
  | FinalCtaSection
  | RiskSection
  | UrgentSection
  | TeamSection;

// --- The page --------------------------------------------------------------

export type PageContent = {
  /** With trailing slash, matching the live URL exactly. */
  slug: string;
  /** Under 60 characters. */
  metaTitle: string;
  /** 140–155 characters. */
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** What the page was written against. Documentation, not rendered. */
  coreDesire: string;
  breadcrumb: { label: string; href: string }[];
  sections: Section[];
  /** MedicalProcedure schema, on treatment pages only. */
  procedure?: { name: string; description: string };
  /** Rendered as the author block: "Reviewed by …, last reviewed …". */
  reviewed?: { by: string; date: Placeholder | string };
};
