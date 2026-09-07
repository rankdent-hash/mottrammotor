import type { MetadataRoute } from "next";
import { allSlugs } from "@/lib/content";
import { siteUrl } from "@/lib/schema";

export default function sitemap(): MetadataRoute.Sitemap {
  return allSlugs().map((slug) => ({
    url: `${siteUrl}${slug}`,
    changeFrequency: slug === "/" ? "weekly" : "monthly",
    priority: slug === "/" ? 1 : 0.7,
  }));
}
