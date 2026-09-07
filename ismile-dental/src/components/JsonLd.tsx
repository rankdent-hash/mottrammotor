import { business, siteUrl } from "@/lib/site-data";

// Site-wide structured data. Deliberately does NOT emit Review or
// AggregateRating markup: the reviews in site-data are placeholders, and
// publishing invented ratings as structured data would be both a Google
// spam-policy violation and a breach of the GDC's advertising guidance.
// Add it once there are real, verifiable patient reviews.
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: business.name,
    description: business.tagline,
    telephone: business.phone,
    email: business.email,
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.addressLine1,
      addressLocality: business.addressLine2,
      postalCode: business.postcode,
      addressCountry: "GB",
    },
    areaServed: business.areaServed,
    openingHoursSpecification: business.hours
      .filter((h) => h.time.includes("–"))
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: h.time.split(" – ")[0],
        closes: h.time.split(" – ")[1],
      })),
    medicalSpecialty: "Dentistry",
    url: siteUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
