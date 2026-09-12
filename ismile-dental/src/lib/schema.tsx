// ---------------------------------------------------------------------------
// JSON-LD builders (content-brief.md §4).
//
// Emitted: Dentist (a LocalBusiness subtype) sitewide, Organization, WebSite,
// Person for Dr Azimi with the GDC number as `identifier`, BreadcrumbList
// sitewide, MedicalProcedure per treatment page, FAQPage per FAQ block.
//
// NOT emitted: AggregateRating / Review. Those may only appear once real,
// verified reviews are wired in — `npm run check:compliance` fails if the
// property reappears before then.
//
// openingHoursSpecification is deliberately absent: the hours have never been
// published anywhere and inventing them would poison the Google Business
// Profile as well as the site. It is added here the day they are confirmed.
// ---------------------------------------------------------------------------

import { practice } from "@/lib/practice";
import type { FaqsSection, PageContent } from "@/lib/content/types";
import { isPlaceholder, type Prose } from "@/lib/content/types";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ismiledentalpractice.co.uk";

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: `${practice.address.building}, ${practice.address.street}`,
  addressLocality: practice.address.locality,
  addressRegion: practice.address.region,
  postalCode: practice.address.postcode,
  addressCountry: practice.address.country,
};

const dentistNode = {
  "@type": "Dentist",
  "@id": `${siteUrl}/#practice`,
  name: practice.name,
  description: practice.descriptor,
  url: siteUrl,
  telephone: practice.phone,
  address: postalAddress,
  areaServed: [
    "Royal Tunbridge Wells",
    "Southborough",
    "Rusthall",
    "Langton Green",
    "Speldhurst",
    "Pembury",
    "Tonbridge",
    "Bidborough",
    "Frant",
    "Groombridge",
  ],
  medicalSpecialty: "Dentistry",
  // sameAs is intentionally empty: the verified Google Business Profile is
  // unconfirmed (two competing g.page links) and no social profiles were
  // found. Pointing sameAs at the wrong profile actively harms the entity.
};

const personNode = {
  "@type": "Person",
  "@id": `${siteUrl}/#dr-simon-azimi`,
  name: practice.dentist.name,
  jobTitle: "Dentist",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "GDC registration number",
    value: practice.dentist.gdc,
  },
  worksFor: { "@id": `${siteUrl}/#practice` },
};

/** Flattens copy to plain text for a schema string field. */
function plain(parts: Prose): string {
  return parts
    .map((part) => (isPlaceholder(part) ? "" : part.replace(/\*\*/g, "")))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildPageSchema(page: PageContent) {
  const graph: Record<string, unknown>[] = [dentistNode, personNode];

  graph.push({
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: practice.name,
    publisher: { "@id": `${siteUrl}/#practice` },
  });

  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}${page.slug}#breadcrumbs`,
    itemListElement: page.breadcrumb.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `${siteUrl}${crumb.href}`,
    })),
  });

  if (page.procedure) {
    graph.push({
      "@type": "MedicalProcedure",
      "@id": `${siteUrl}${page.slug}#procedure`,
      name: page.procedure.name,
      description: page.procedure.description,
      provider: { "@id": `${siteUrl}/#practice` },
performer: { "@id": `${siteUrl}/#dr-simon-azimi` },
    });
  }

  const faqs = page.sections.find((s): s is FaqsSection => s.type === "faqs");
  if (faqs) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${siteUrl}${page.slug}#faqs`,
      mainEntity: faqs.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: plain(item.a) },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function JsonLd({ page }: { page: PageContent }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPageSchema(page)) }}
    />
  );
}
