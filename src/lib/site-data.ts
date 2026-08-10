// ---------------------------------------------------------------------------
// Central content/config for the Mottram Motor Garage site.
//
// IMPORTANT: address, opening hours, pricing and accreditations below are
// PLACEHOLDERS for the initial build. They must be confirmed by Mottram
// Motor Garage before this site is treated as final/live. See the
// `siteStatus` banner copy in layout.tsx.
// ---------------------------------------------------------------------------

export const business = {
  name: "Mottram Motor Garage",
  legalName: "Mottram Motor Garage Ltd",
  companyNumber: "15691341",
  tagline: "MOT Testing, Car Repairs & Tyres in Manchester",
  phone: "0161 566 1319",
  phoneHref: "tel:+441615661319",
  // Placeholder — confirm real trading address before launch.
  addressLine1: "[Workshop address to be confirmed]",
  addressLine2: "Manchester, Greater Manchester",
  postcode: "[Postcode TBC]",
  areaServed: [
    "Manchester",
    "Tameside",
    "Ashton-under-Lyne",
    "Stockport",
    "Denton",
    "Hyde",
  ],
  // Placeholder — confirm real opening hours before launch.
  hours: [
    { day: "Monday – Friday", time: "8:30am – 5:30pm" },
    { day: "Saturday", time: "9:00am – 1:00pm" },
    { day: "Sunday", time: "Closed" },
  ],
  socials: {
    facebook: "",
    instagram: "",
  },
};

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "MOT Testing", href: "/mot-testing" },
  { label: "Servicing", href: "/servicing" },
  { label: "Repairs", href: "/repairs" },
  { label: "Tyres", href: "/tyres" },
  { label: "EV & Hybrid", href: "/electric-hybrid" },
  { label: "Pricing", href: "/pricing" },
  { label: "Advice", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type ServiceSummary = {
  slug: string;
  name: string;
  short: string;
  icon: "brake" | "clutch" | "exhaust" | "battery" | "diagnostics" | "ac" | "suspension";
  intro: string;
  included: string[];
  fromPrice?: string;
  duration?: string;
  warningSigns: string[];
};

export const repairServices: ServiceSummary[] = [
  {
    slug: "brakes",
    name: "Brakes",
    short: "Pads, discs & full brake system checks.",
    icon: "brake",
    intro:
      "Worn brakes are one of the most common MOT failure points and one of the most safety-critical repairs on any vehicle. We inspect pads, discs, callipers, fluid and handbrake performance, and only replace what genuinely needs replacing.",
    included: [
      "Free brake inspection with any service or MOT",
      "Pad and disc replacement (all makes)",
      "Brake fluid change and system bleed",
      "Handbrake adjustment and testing",
    ],
    fromPrice: "£69",
    duration: "45–90 minutes",
    warningSigns: [
      "Squealing or grinding when braking",
      "Car pulling to one side under braking",
      "Spongy or soft brake pedal",
      "Dashboard brake warning light",
    ],
  },
  {
    slug: "clutch",
    name: "Clutch",
    short: "Clutch diagnosis, repair and replacement.",
    icon: "clutch",
    intro:
      "A slipping or failing clutch doesn't fix itself. We diagnose whether it's the clutch plate, release bearing or hydraulics, and give you an honest quote before any work starts.",
    included: [
      "Full clutch system diagnosis",
      "Clutch kit replacement (plate, cover, bearing)",
      "Hydraulic clutch bleed and repair",
      "Post-repair road test",
    ],
    fromPrice: "£299",
    duration: "Typically 1 day",
    warningSigns: [
      "Clutch pedal feels loose, high or spongy",
      "Difficulty selecting gears",
      "Burning smell when pulling away",
      "Engine revs rising without matching acceleration",
    ],
  },
  {
    slug: "exhausts",
    name: "Exhausts",
    short: "Exhaust and emissions repairs.",
    icon: "exhaust",
    intro:
      "From a blown silencer to a failing catalytic converter, exhaust problems affect both your MOT result and your fuel economy. We check the full system, not just the noisy bit.",
    included: [
      "Full exhaust system inspection",
      "Silencer and pipe repair/replacement",
      "Catalytic converter diagnosis",
      "Emissions check ahead of MOT",
    ],
    fromPrice: "£49",
    duration: "30–60 minutes",
    warningSigns: [
      "Noticeably louder engine noise",
      "Visible rust or hanging exhaust section",
      "Smell of fumes inside the cabin",
      "Failed emissions on a previous MOT",
    ],
  },
  {
    slug: "batteries",
    name: "Batteries",
    short: "Battery testing, charging & replacement.",
    icon: "battery",
    intro:
      "Slow starts in cold weather are usually a battery on its way out. We test charge, cranking performance and the charging system, and fit like-for-like replacements while you wait.",
    included: [
      "Free battery health check",
      "Charging system test (alternator)",
      "Like-for-like battery replacement",
      "Battery recycling included",
    ],
    fromPrice: "£85",
    duration: "20–30 minutes",
    warningSigns: [
      "Slow or hesitant engine start",
      "Dashboard battery warning light",
      "Dimming headlights at idle",
      "Battery over 4–5 years old",
    ],
  },
  {
    slug: "diagnostics",
    name: "Diagnostics",
    short: "Engine warning lights & fault diagnosis.",
    icon: "diagnostics",
    intro:
      "An engine management light doesn't tell you what's wrong on its own — it tells you where to start looking. We run a full diagnostic scan and explain the fault in plain English before recommending any repair.",
    included: [
      "Full OBD diagnostic scan",
      "Fault code interpretation and report",
      "Sensor and component testing",
      "Clear, no-obligation repair quote",
    ],
    fromPrice: "£45",
    duration: "30–45 minutes",
    warningSigns: [
      "Engine management / check engine light",
      "Loss of power or rough idling",
      "Poor fuel economy",
      "Unusual engine noises",
    ],
  },
  {
    slug: "air-conditioning",
    name: "Air Conditioning",
    short: "Air-con re-gas, repair & servicing.",
    icon: "ac",
    intro:
      "Air-con systems lose a small amount of refrigerant every year even without a fault. A re-gas keeps it working properly, and we'll flag any leaks before they become a bigger repair.",
    included: [
      "Air-con performance check",
      "Re-gas (all refrigerant types)",
      "Leak detection",
      "Cabin filter check",
    ],
    fromPrice: "£59",
    duration: "45–60 minutes",
    warningSigns: [
      "Air-con blowing warm or weak air",
      "Musty smell from the vents",
      "Noisy compressor when air-con is on",
    ],
  },
  {
    slug: "suspension-steering",
    name: "Suspension & Steering",
    short: "Shocks, springs, tracking & steering repairs.",
    icon: "suspension",
    intro:
      "Worn suspension affects braking distance, tyre wear and how safely the car handles — not just comfort. We check shocks, springs, bushes and steering components as part of every MOT and full service.",
    included: [
      "Full suspension and steering inspection",
      "Shock absorber and spring replacement",
      "Wheel alignment / tracking",
      "Bush and ball joint replacement",
    ],
    fromPrice: "£39",
    duration: "From 30 minutes",
    warningSigns: [
      "Knocking noise over bumps",
      "Uneven tyre wear",
      "Car pulling or wandering on straight roads",
      "Excessive bounce after a pothole",
    ],
  },
];

export const faqGeneral = [
  {
    q: "Do I need to book an MOT in advance?",
    a: "We'd always recommend booking ahead to guarantee your preferred slot, but we do also take same-day bookings where availability allows. Use the online booking form or call us on 0161 566 1319.",
  },
  {
    q: "Can I book my MOT up to a month before it's due?",
    a: "Yes. You can book and take your MOT test up to one calendar month (minus a day) before it expires, and your renewal date stays the same as if you'd tested on the original expiry date.",
  },
  {
    q: "What happens if my car fails its MOT?",
    a: "We'll talk you through exactly what failed and why, give you a clear no-obligation quote for the repair, and — where it's safe and legal to do so — can usually get the work done the same day so you can retest.",
  },
  {
    q: "Do you offer a courtesy car or waiting area?",
    a: "Please ask when you book — availability depends on the day and length of job. [Confirm with garage: courtesy car / waiting area / local drop-off options.]",
  },
  {
    q: "Which makes and models do you work on?",
    a: "We work on all makes and models, including most electric and hybrid vehicles. [Confirm with garage: any brands/EV models not currently covered.]",
  },
];

export const reviewsPlaceholder = [
  {
    name: "Sample review",
    rating: 5,
    text: "This is placeholder review content shown for layout purposes only. Replace with genuine customer reviews (e.g. pulled from Google) before launch.",
  },
  {
    name: "Sample review",
    rating: 5,
    text: "Real reviews build far more trust than placeholder text — connect a Google Business Profile feed or manually add verified reviews here.",
  },
  {
    name: "Sample review",
    rating: 4,
    text: "Placeholder testimonial. Swap out once the garage has live Google or Trustpilot reviews to display.",
  },
];

export const siteUrl = "https://mottrammotor.vercel.app";
