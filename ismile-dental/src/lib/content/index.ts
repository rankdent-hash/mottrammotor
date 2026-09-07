// ---------------------------------------------------------------------------
// The page registry. One entry per URL, keyed by the exact slug (with its
// trailing slash) so the catch-all route, the sitemap and the internal links
// all read from the same list.
//
// Adding a page: write its content module, import it here, add it to the
// registry. There is no per-page route file to keep in step.
// ---------------------------------------------------------------------------

import type { PageContent } from "@/lib/content/types";
import { home } from "@/lib/content/home";
import { ourStory } from "@/lib/content/our-story";
import { team } from "@/lib/content/team";
import { contact } from "@/lib/content/contact";
import { generalDentistry } from "@/lib/content/general-dentistry";
import { cosmeticDentistry } from "@/lib/content/cosmetic-dentistry";

const pages: PageContent[] = [
  // Core
  home,
  ourStory,
  team,
  contact,

  // General Dentistry
  generalDentistry,

  // Cosmetic Dentistry
  cosmeticDentistry,
];

export const registry = new Map(pages.map((page) => [page.slug, page]));

export function getPage(slug: string): PageContent | undefined {
  return registry.get(slug);
}

/** Every slug except the home page, as path segment arrays for the catch-all. */
export function pageParams(): { slug: string[] }[] {
  return pages
    .filter((page) => page.slug !== "/")
    .map((page) => ({ slug: page.slug.replace(/^\/|\/$/g, "").split("/") }));
}

export function allSlugs(): string[] {
  return pages.map((page) => page.slug);
}
