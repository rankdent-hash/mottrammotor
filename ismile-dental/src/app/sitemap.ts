import type { MetadataRoute } from "next";
import { siteUrl, treatments } from "@/lib/site-data";

const staticRoutes = [
  "",
  "/new-patients",
  "/treatments",
  "/emergency-dentist",
  "/prices",
  "/about",
  "/faqs",
  "/contact",
  "/book",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const treatmentEntries: MetadataRoute.Sitemap = treatments.map((t) => ({
    url: `${siteUrl}/treatments/${t.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...treatmentEntries];
}
