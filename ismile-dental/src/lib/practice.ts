// ---------------------------------------------------------------------------
// Practice NAP and standing facts. THE single source of truth.
//
// research.md §4 found the old site running two practice names, three phone
// groupings and two address formats — sometimes on the same page. Google
// matches a site against the Google Business Profile and directory citations
// character by character, so that inconsistency is a live local-SEO problem.
//
// Every one of these values is byte-identical everywhere it appears. Never
// hard-code any of them in a component or a content module; import from here.
// `npm run check:nap` fails the build if a forbidden variant reappears.
// ---------------------------------------------------------------------------

export const practice = {
  /** The entity name. Never "iSmile Dental & Skin Clinic" — that is a descriptor. */
  name: "iSmile Dental Practice",
  descriptor: "Dental & Skin Clinic, Royal Tunbridge Wells",

  phone: "01892 547286",
  /** No spaces, every instance. The old site shipped `tel:0189 254 7286`. */
  phoneHref: "tel:01892547286",

  address: {
    building: "1 The Lodge",
    street: "Mount Pleasant Avenue",
    locality: "Royal Tunbridge Wells",
    region: "Kent",
    postcode: "TN1 1QY",
    country: "GB",
  },

  /** The one-line form used in body copy and CTAs. */
  addressLine:
    "1 The Lodge, Mount Pleasant Avenue, Royal Tunbridge Wells, Kent TN1 1QY",

  /**
   * A genuine wayfinding asset, not a keyword — content-brief.md §1 thread 2.
   * Use it as convenience, and vary the framing between pages.
   */
  landmark:
    "at the entrance to Calverley Park, directly opposite Tunbridge Wells railway station",

  dentist: {
    name: "Dr Simon Azimi",
    gdc: "81382",
    /** Rendered as "Dr Simon Azimi, GDC 81382" wherever attribution is needed. */
    credit: "Dr Simon Azimi, GDC 81382",
  },
} as const;

// --- Everything below is unconfirmed. Do not guess. ------------------------
// build-plan.md §3 lists these as items the client must supply. They render
// as visible [PLACEHOLDER] markers until they land; `npm run check:placeholders`
// lists what is outstanding.

export const unconfirmed = {
  email: "business-domain address needed; recommend info@ismiledentalpractice.co.uk",
  openingHours: "opening hours — never published on the old site",
  googleBusinessProfile:
    "two competing g.page profiles exist; client must confirm the verified one",
  socialProfiles: "none found",
  cqcNumber: "CQC provider registration number for display",
} as const;

export type NavChild = { label: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  /** Mega-menu columns, per content-brief.md §5. */
  groups?: { heading: string; items: NavChild[] }[];
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/our-story/" },
  {
    label: "Treatments",
    href: "/general-dentistry/",
    groups: [
      {
        heading: "General Dentistry",
        items: [
          { label: "General dentistry", href: "/general-dentistry/" },
          { label: "Dental check-ups", href: "/dental-check-ups/" },
          { label: "Dental hygiene", href: "/dental-hygiene/" },
          { label: "White fillings", href: "/white-fillings/" },
          { label: "Crowns", href: "/crown/" },
          { label: "Bridges", href: "/bridges/" },
          { label: "Dentures", href: "/dentures/" },
          {
            label: "Root canal treatment",
            href: "/root-canal-treatment-in-tunbridge-wells/",
          },
          { label: "Extractions & oral surgery", href: "/oral-surgery/" },
        ],
      },
      {
        heading: "Cosmetic Dentistry",
        items: [
          { label: "Cosmetic dentistry", href: "/cosmetic-dentistry/" },
          { label: "Dental veneers", href: "/dental-veneers/" },
          { label: "Composite bonding", href: "/composite-bonding/" },
          {
            label: "Teeth whitening",
            href: "/teeth-whitening-tunbridge-wells/",
          },
          { label: "Invisalign", href: "/invisalign/" },
        ],
      },
      {
        heading: "Implants & Skin Clinic",
        items: [
          { label: "Dental implants", href: "/dental-implants/" },
          { label: "Skin clinic", href: "/facial-rejuvenation/" },
          { label: "Anti-wrinkle treatments", href: "/botox-tunbridge-wells/" }, // allow-pom-brand-name: URL retained for equity, all copy rewritten (compliance.md §1)
          { label: "Dermal fillers", href: "/dermal-fillers/" },
        ],
      },
    ],
  },
  { label: "Meet the Team", href: "/team/" },
  { label: "Contact", href: "/contact/" },
];
