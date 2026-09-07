// ---------------------------------------------------------------------------
// Central content/config for the iSmile Dental Practice site.
//
// IMPORTANT: every value wrapped in square brackets below is a PLACEHOLDER
// for the initial build and must be confirmed by the practice before this
// site goes live. Search the codebase for `TBC` to find every spot that
// still needs real content. The banner in components/PlaceholderBanner.tsx
// stays on screen until they are all filled in.
//
// Regulatory note: a UK dental practice website must display its GDC
// registration details, the practice's CQC registration (England), and a
// complaints procedure. Those fields are all marked TBC below.
// ---------------------------------------------------------------------------

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ismile-dental.vercel.app";

export const business = {
  name: "iSmile Dental Practice",
  legalName: "[Registered legal name TBC]",
  companyNumber: "[Company number TBC]",
  tagline: "Gentle NHS & private dentistry for the whole family",

  // Placeholder — replace with the real number and change phoneHref to
  // `tel:+44...` at the same time. Until then every "call us" control
  // routes to /contact rather than dialling a made-up number.
  phone: "[Phone number TBC]",
  phoneHref: "/contact",
  email: "[Email address TBC]",
  emailHref: "/contact",

  addressLine1: "[Practice address TBC]",
  addressLine2: "[Town/City TBC]",
  postcode: "[Postcode TBC]",

  areaServed: ["[Primary town TBC]", "[Neighbouring area 1 TBC]", "[Neighbouring area 2 TBC]"],

  hours: [
    { day: "Monday – Thursday", time: "8:30am – 5:30pm" },
    { day: "Friday", time: "8:30am – 4:30pm" },
    { day: "Saturday", time: "By appointment only" },
    { day: "Sunday", time: "Closed" },
  ],

  // Shown in the footer — legally required on a UK dental practice site.
  regulatory: {
    gdcNote:
      "All of our dentists and hygienists are registered with the General Dental Council.",
    gdcRegisterUrl: "https://olr.gdc-uk.org/SearchRegister",
    cqcProviderId: "[CQC provider ID TBC]",
    cqcNote:
      "This practice is registered with and inspected by the Care Quality Commission.",
    complaintsNote:
      "If you are unhappy with any part of your care, please ask at reception for a copy of our complaints procedure — we aim to acknowledge every complaint within three working days.",
  },

  socials: {
    facebook: "",
    instagram: "",
  },
};

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "New Patients", href: "/new-patients" },
  { label: "Treatments", href: "/treatments" },
  { label: "Emergency", href: "/emergency-dentist" },
  { label: "Prices", href: "/prices" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

// ---------------------------------------------------------------------------
// Treatments
// ---------------------------------------------------------------------------

export type TreatmentIconName =
  | "checkup"
  | "filling"
  | "crown"
  | "rootcanal"
  | "implant"
  | "whitening"
  | "aligners"
  | "veneers"
  | "dentures"
  | "children";

export type TreatmentCategory = "General" | "Restorative" | "Cosmetic";

export type Treatment = {
  slug: string;
  name: string;
  short: string;
  icon: TreatmentIconName;
  category: TreatmentCategory;
  /** Available on the NHS, subject to clinical need and band. */
  nhs: boolean;
  intro: string;
  /** Bullet list rendered as "What's involved". */
  involved: string[];
  /** Bullet list rendered as "This may be right for you if…". */
  suitableFor: string[];
  /** Placeholder pricing — confirm before launch. */
  fromPrice?: string;
  duration?: string;
  /** Honest note on limits/aftercare. Keeps the page from reading as a sales pitch. */
  goodToKnow: string;
};

export const treatments: Treatment[] = [
  {
    slug: "check-ups-and-hygiene",
    name: "Check-ups & Hygiene",
    short: "Routine examinations, scale and polish, and gum health care.",
    icon: "checkup",
    category: "General",
    nhs: true,
    intro:
      "A routine examination is the single most useful appointment you can keep. We check your teeth, gums, bite and soft tissues, screen for early signs of oral cancer, and agree how often you need to come back — which for a healthy adult may be anywhere from three months to two years.",
    involved: [
      "Full examination of teeth, gums, bite and soft tissues",
      "Oral cancer screening at every routine appointment",
      "X-rays where clinically needed, not by default",
      "Scale and polish, and tailored cleaning advice from a hygienist",
      "A written treatment plan and estimate before anything is started",
    ],
    suitableFor: [
      "You are due a routine check-up",
      "Your gums bleed when you brush or floss",
      "You have persistent bad breath",
      "You have not seen a dentist for a while and want a fresh start",
    ],
    fromPrice: "[Price TBC]",
    duration: "20–30 minutes",
    goodToKnow:
      "Gum disease is usually painless until it is advanced, so it is very common to feel fine and still need treatment. If we find anything, we will explain what it means and what happens if you do nothing.",
  },
  {
    slug: "white-fillings",
    name: "White Fillings",
    short: "Tooth-coloured composite fillings that blend with your smile.",
    icon: "filling",
    category: "Restorative",
    nhs: true,
    intro:
      "A filling repairs a tooth damaged by decay or a fracture. Composite (white) fillings are bonded directly to the tooth and shaded to match it, so the repair is far less visible than a traditional amalgam filling.",
    involved: [
      "Decay removed under local anaesthetic",
      "Composite placed in layers and cured, then shaped to your bite",
      "Polished so it feels like the rest of the tooth",
      "Usually completed in a single appointment",
    ],
    suitableFor: [
      "You have a cavity found at a check-up",
      "A tooth is sensitive to cold or sweet things",
      "An old filling has worn, chipped or discoloured",
      "You would prefer not to have visible metal fillings",
    ],
    fromPrice: "[Price TBC]",
    duration: "30–60 minutes",
    goodToKnow:
      "On NHS treatment, white fillings are routinely available for front teeth; for back teeth the material used depends on clinical need. We will always tell you which option is available on the NHS before you decide.",
  },
  {
    slug: "crowns-and-bridges",
    name: "Crowns & Bridges",
    short: "Rebuilding heavily damaged teeth and replacing missing ones.",
    icon: "crown",
    category: "Restorative",
    nhs: true,
    intro:
      "A crown caps a tooth that is too broken down or heavily filled to hold a normal filling. A bridge uses the teeth on either side of a gap to carry a replacement tooth. Both are made in a dental laboratory from an impression or digital scan.",
    involved: [
      "Tooth prepared and scanned or impressed",
      "Temporary crown fitted while the laboratory makes the final one",
      "Shade matched to your neighbouring teeth",
      "Fitted, adjusted to your bite and cemented at a second visit",
    ],
    suitableFor: [
      "A tooth is cracked, worn down or heavily filled",
      "You have had root canal treatment on a back tooth",
      "You have a single gap with healthy teeth either side",
      "An existing crown or bridge has come loose",
    ],
    fromPrice: "[Price TBC]",
    duration: "Two appointments, 2–3 weeks apart",
    goodToKnow:
      "A bridge means preparing the healthy teeth on either side of the gap. If those teeth are untouched, an implant is often the more conservative option — we will go through both with you rather than assuming.",
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    short: "Saving an infected tooth rather than taking it out.",
    icon: "rootcanal",
    category: "Restorative",
    nhs: true,
    intro:
      "When the nerve inside a tooth becomes infected, root canal treatment removes the infection, cleans and shapes the canals, and seals them. It is the treatment that lets you keep a tooth that would otherwise have to be extracted.",
    involved: [
      "Local anaesthetic — the tooth is numb throughout",
      "Infected pulp removed and the canals cleaned and shaped",
      "Canals sealed, then the tooth restored with a filling or crown",
      "One or two appointments depending on the tooth",
    ],
    suitableFor: [
      "You have severe or throbbing toothache",
      "A tooth is painful to bite on or sensitive to heat",
      "There is swelling or an abscess around a tooth",
      "A tooth has darkened after an injury",
    ],
    fromPrice: "[Price TBC]",
    duration: "60–90 minutes per appointment",
    goodToKnow:
      "Root canal treatment has a reputation it no longer deserves — with modern anaesthetic it should feel much like having a filling. A back tooth almost always needs a crown afterwards to stop it fracturing, so budget for both.",
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    short: "A fixed, long-term replacement for one or more missing teeth.",
    icon: "implant",
    category: "Restorative",
    nhs: false,
    intro:
      "An implant is a small titanium post placed in the jawbone to support a crown, bridge or denture. Because it replaces the root as well as the tooth, it does not rely on the neighbouring teeth for support.",
    involved: [
      "Assessment including a 3D scan to check bone volume",
      "Implant placed under local anaesthetic",
      "A healing period of roughly 3–6 months while the bone integrates",
      "Final crown, bridge or denture fitted on top",
    ],
    suitableFor: [
      "You have one or more missing teeth",
      "You dislike a removable denture and want something fixed",
      "You would rather not have healthy teeth prepared for a bridge",
    ],
    fromPrice: "[Price TBC]",
    duration: "Treatment spans 3–6 months",
    goodToKnow:
      "Implants are a private treatment and are not routinely available on the NHS. They also need healthy gums and enough bone — smoking and untreated gum disease both materially reduce success rates, so we assess honestly before recommending one.",
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    short: "Dentist-supervised whitening with custom-made trays.",
    icon: "whitening",
    category: "Cosmetic",
    nhs: false,
    intro:
      "Professional whitening lifts staining built up from tea, coffee, red wine and age. We take impressions for trays made to fit your teeth exactly, then supply the gel and show you how to use it at home over a couple of weeks.",
    involved: [
      "Check-up first to confirm your teeth and gums are healthy",
      "Impressions or a scan taken for custom whitening trays",
      "Trays and professional-strength gel supplied with instructions",
      "Review appointment to check the result and your comfort",
    ],
    suitableFor: [
      "Your teeth have yellowed or dulled with age",
      "You have staining from tea, coffee, red wine or smoking",
      "You have an event coming up and want a subtle lift",
    ],
    fromPrice: "[Price TBC]",
    duration: "2–3 weeks of home wear",
    goodToKnow:
      "In the UK, tooth whitening is legally a dental procedure — it may only be carried out by, or under the prescription of, a registered dental professional. Whitening does not change the colour of crowns, veneers or fillings, so existing restorations may need replacing to match.",
  },
  {
    slug: "clear-aligners",
    name: "Clear Aligners",
    short: "Discreet, removable braces for mild to moderate crowding.",
    icon: "aligners",
    category: "Cosmetic",
    nhs: false,
    intro:
      "Clear aligners are a series of removable, near-invisible trays that move your teeth in small steps. They suit adults who want straighter front teeth without fixed metal braces, and are taken out to eat and clean.",
    involved: [
      "Assessment and digital scan, with a preview of the likely result",
      "A series of aligners worn 20–22 hours a day",
      "Trays changed every 1–2 weeks",
      "Retainers afterwards to hold the result",
    ],
    suitableFor: [
      "Your front teeth are crowded, gappy or have relapsed after braces",
      "You want a discreet alternative to fixed braces",
      "You can commit to wearing the trays nearly full time",
    ],
    fromPrice: "[Price TBC]",
    duration: "Typically 6–18 months",
    goodToKnow:
      "Aligners are not right for every case — complex bite problems are better treated with fixed braces or by an orthodontist, and we will say so. Results relapse without retainers, so retainer wear is lifelong.",
  },
  {
    slug: "veneers",
    name: "Veneers",
    short: "Thin facings that reshape and brighten front teeth.",
    icon: "veneers",
    category: "Cosmetic",
    nhs: false,
    intro:
      "A veneer is a thin layer of porcelain or composite bonded to the front of a tooth to change its shape, shade or alignment. They are most often used on the upper front teeth.",
    involved: [
      "Smile assessment, photographs and a discussion of what you want to change",
      "A small amount of enamel removed where needed",
      "Impressions or scan sent to the laboratory (porcelain), or built up in one visit (composite)",
      "Fitted, adjusted and bonded",
    ],
    suitableFor: [
      "You have chipped, worn or uneven front teeth",
      "You have staining that whitening will not shift",
      "You have small gaps between your front teeth",
    ],
    fromPrice: "[Price TBC]",
    duration: "One to two appointments per tooth",
    goodToKnow:
      "Porcelain veneers usually involve removing some enamel, which cannot be put back — the tooth will always need a veneer or crown from then on. Where whitening, bonding or aligners would achieve what you want, we will recommend those first.",
  },
  {
    slug: "dentures",
    name: "Dentures",
    short: "Full and partial dentures, repairs and relines.",
    icon: "dentures",
    category: "Restorative",
    nhs: true,
    intro:
      "Dentures replace missing teeth with a removable appliance. A partial denture fills gaps and clips to your remaining teeth; a full denture replaces a whole arch. Both are made over a series of fitting appointments.",
    involved: [
      "Impressions and bite records over several short visits",
      "A try-in stage so you can see and approve the look before it is finished",
      "Fitting, then review appointments to adjust any sore spots",
      "Repairs, relines and additions to existing dentures",
    ],
    suitableFor: [
      "You have several missing teeth",
      "Your existing denture is loose, worn or uncomfortable",
      "You want a cost-effective alternative to implants or bridges",
    ],
    fromPrice: "[Price TBC]",
    duration: "4–5 appointments over 6–8 weeks",
    goodToKnow:
      "New dentures always take some getting used to, and a small number of adjustment visits is normal rather than a sign something went wrong. Implant-retained dentures are an option if looseness is the main problem.",
  },
  {
    slug: "childrens-dentistry",
    name: "Children's Dentistry",
    short: "Free NHS dental care for under-18s, in a calm, unhurried way.",
    icon: "children",
    category: "General",
    nhs: true,
    intro:
      "NHS dental treatment is free for children under 18 (and under 19 in full-time education). We keep first visits short and friendly — often just a ride in the chair and a count of the teeth — so that the dentist is never something to be afraid of.",
    involved: [
      "Routine check-ups and preventive advice",
      "Fluoride varnish application",
      "Fissure sealants on adult back teeth",
      "Early monitoring of how the adult teeth are coming through",
    ],
    suitableFor: [
      "Your child has their first teeth coming through",
      "You want to register the whole family at one practice",
      "Your child is anxious and needs a gentle introduction",
    ],
    fromPrice: "Free on the NHS for under-18s",
    duration: "15–20 minutes",
    goodToKnow:
      "Bring children along to your own appointments before they need one of their own — familiarity does more for dental anxiety than anything we can do in the chair.",
  },
];

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

// ---------------------------------------------------------------------------
// Pricing
//
// NHS charges in England are set nationally in three bands and change each
// April. The band *structure* below is stable; the amounts are deliberately
// left as placeholders so nobody publishes a stale figure by accident.
// Check the current charges at https://www.nhs.uk/nhs-services/dentists/
// ---------------------------------------------------------------------------

export type PriceRow = { item: string; price: string; note?: string };

export const nhsBands: { band: string; price: string; covers: string }[] = [
  {
    band: "Band 1",
    price: "[Current NHS Band 1 charge TBC]",
    covers:
      "Examination, diagnosis and advice. Includes X-rays, a scale and polish if clinically needed, and preventive care such as fluoride varnish.",
  },
  {
    band: "Band 2",
    price: "[Current NHS Band 2 charge TBC]",
    covers:
      "Everything in Band 1, plus additional treatment such as fillings, root canal treatment or extractions.",
  },
  {
    band: "Band 3",
    price: "[Current NHS Band 3 charge TBC]",
    covers:
      "Everything in Bands 1 and 2, plus laboratory-made items such as crowns, dentures and bridges.",
  },
];

export const privatePrices: PriceRow[] = [
  { item: "New patient examination", price: "[Price TBC]" },
  { item: "Routine examination", price: "[Price TBC]" },
  { item: "Hygienist appointment (30 min)", price: "[Price TBC]" },
  { item: "White filling", price: "From [Price TBC]" },
  { item: "Crown", price: "From [Price TBC]" },
  { item: "Root canal treatment", price: "From [Price TBC]", note: "Depends on the tooth" },
  { item: "Dental implant (single tooth)", price: "From [Price TBC]" },
  { item: "Take-home teeth whitening", price: "[Price TBC]" },
  { item: "Clear aligners", price: "From [Price TBC]", note: "Case dependent" },
  { item: "Emergency appointment", price: "[Price TBC]" },
];

// ---------------------------------------------------------------------------
// Team, reviews and FAQs
// ---------------------------------------------------------------------------

export type TeamMember = {
  name: string;
  role: string;
  gdcNumber: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: "[Principal dentist name TBC]",
    role: "Principal Dentist",
    gdcNumber: "[GDC no. TBC]",
    bio: "[Short biography TBC — qualifications, year qualified, special interests.]",
  },
  {
    name: "[Associate dentist name TBC]",
    role: "Associate Dentist",
    gdcNumber: "[GDC no. TBC]",
    bio: "[Short biography TBC.]",
  },
  {
    name: "[Hygienist name TBC]",
    role: "Dental Hygienist",
    gdcNumber: "[GDC no. TBC]",
    bio: "[Short biography TBC.]",
  },
  {
    name: "[Practice manager name TBC]",
    role: "Practice Manager",
    gdcNumber: "—",
    bio: "[Short biography TBC.]",
  },
];

export type Review = { quote: string; author: string; treatment: string };

// Placeholder testimonials. Replace with real, attributable patient reviews
// before launch — inventing testimonials for a healthcare provider is both
// misleading and a breach of the GDC's advertising guidance.
export const reviews: Review[] = [
  {
    quote: "[Real patient review TBC]",
    author: "[Patient initials TBC]",
    treatment: "Check-up & hygiene",
  },
  {
    quote: "[Real patient review TBC]",
    author: "[Patient initials TBC]",
    treatment: "Emergency appointment",
  },
  {
    quote: "[Real patient review TBC]",
    author: "[Patient initials TBC]",
    treatment: "Clear aligners",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Are you taking on new NHS patients?",
    a: "[Confirm current NHS availability TBC.] NHS availability changes, so the most reliable answer is always the one you get by calling us or sending the form on our contact page — we will tell you where things stand that day and, if we have no NHS space, what your options are.",
  },
  {
    q: "How much will my treatment cost?",
    a: "NHS treatment in England is charged in three fixed bands, whatever the practice. Private treatment is priced per item. Either way you will get a written treatment plan and estimate before any work starts, and we will tell you if something can be done on the NHS before offering a private alternative.",
  },
  {
    q: "I am nervous about the dentist. What can you do?",
    a: "Tell us when you book and we will allow extra time. A first appointment can be nothing more than a chat and a look, with no treatment at all. We use a stop signal so you stay in control, and we explain what we are doing before we do it.",
  },
  {
    q: "Do I have to pay for NHS treatment?",
    a: "NHS dental treatment is free if you are under 18 (or under 19 and in full-time education), pregnant or have had a baby in the last 12 months, or if you receive certain benefits. Bring proof of your exemption to your appointment — claims are checked, and penalty charges apply for incorrect claims.",
  },
  {
    q: "What happens if I have a dental emergency?",
    a: "Call us as early in the day as possible and we will do our best to see you the same day. Outside our opening hours, call NHS 111 for urgent dental care. Go straight to A&E if you have facial swelling that is closing your eye or affecting your breathing or swallowing.",
  },
  {
    q: "How often should I have a check-up?",
    a: "There is no single right answer. NICE guidance recommends an interval set by your individual risk — as short as three months for someone with active disease, and up to two years for an adult with consistently healthy teeth and gums. Your dentist will agree an interval with you at each visit.",
  },
  {
    q: "Can I bring my children to the same practice?",
    a: "Yes. We see the whole family, and NHS dental care is free for under-18s. Bringing children along to your own appointments first is a good way to make the practice feel familiar before they need treatment of their own.",
  },
  {
    q: "What if I need to cancel?",
    a: "Please give us at least 24 hours' notice so we can offer the slot to someone else. [Confirm the practice's missed-appointment policy TBC.]",
  },
];

// Reasons-to-choose-us blocks, used on the homepage and the about page.
export const practiceValues = [
  {
    title: "NHS and private, side by side",
    desc: "We will always tell you what is available on the NHS before we offer a private alternative.",
  },
  {
    title: "A written plan before we start",
    desc: "You get a treatment plan and a cost estimate in writing, so there are no surprises at reception.",
  },
  {
    title: "Time for nervous patients",
    desc: "Tell us when you book and we will book you longer, go at your pace, and stop whenever you ask.",
  },
  {
    title: "Prevention first",
    desc: "The cheapest treatment is the one you never need. We would rather spend the appointment on why it happened.",
  },
];
