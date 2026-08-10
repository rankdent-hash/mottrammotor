import { business, siteUrl } from "@/lib/site-data";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: business.name,
    image: `${siteUrl}/logo-badge.png`,
    logo: `${siteUrl}/logo-horizontal.png`,
    telephone: business.phone,
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.addressLine1,
      addressLocality: "Manchester",
      addressRegion: "Greater Manchester",
      addressCountry: "GB",
    },
    areaServed: business.areaServed,
    openingHoursSpecification: business.hours
      .filter((h) => h.time !== "Closed")
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: h.time.split(" – ")[0],
        closes: h.time.split(" – ")[1],
      })),
    url: siteUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
