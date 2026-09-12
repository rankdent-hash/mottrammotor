// The nine local-SEO targets, scoped to a 7-mile radius (research.md §6).
// Sevenoaks was retired at 12–13 miles. Bidborough, Frant and Groombridge are
// combined onto one page to avoid thin duplicate content.
//
// URL pattern is `/dentist-near-[location]/`. Title tags target
// "Dentist in [Location]"; H1s read "Dentist Near [Location]" — a deliberate
// distinction balancing search targeting against factual accuracy.

export type Location = { name: string; href: string };

export const locations: Location[] = [
  { name: "Southborough", href: "/dentist-near-southborough/" },
  { name: "Rusthall", href: "/dentist-near-rusthall/" },
  { name: "Langton Green", href: "/dentist-near-langton-green/" },
  { name: "Speldhurst", href: "/dentist-near-speldhurst/" },
  { name: "Pembury", href: "/dentist-near-pembury/" },
  { name: "Tonbridge", href: "/dentist-near-tonbridge/" },
  {
    name: "Surrounding villages",
    href: "/dentist-near-surrounding-villages/",
  },
];

/**
 * Location page copy has not been written yet (build-plan.md §4), so these
 * links have no destination. Until the pages exist the footer and the
 * "Areas we serve" sections render them as plain text rather than as links
 * to 404s.
 */
export const locationPagesBuilt = false;
