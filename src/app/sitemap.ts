import type { MetadataRoute } from "next";
import { repairServices, siteUrl } from "@/lib/site-data";
import { blogPosts } from "@/lib/blog-data";

const staticRoutes = [
  "",
  "/mot-testing",
  "/servicing",
  "/repairs",
  "/tyres",
  "/electric-hybrid",
  "/pricing",
  "/book",
  "/about",
  "/reviews",
  "/contact",
  "/offers",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const repairEntries: MetadataRoute.Sitemap = repairServices.map((s) => ({
    url: `${siteUrl}/repairs/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...repairEntries, ...blogEntries];
}
