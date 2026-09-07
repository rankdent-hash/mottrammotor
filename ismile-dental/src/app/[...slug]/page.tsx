import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageRenderer from "@/components/PageRenderer";
import { getPage, pageParams } from "@/lib/content";

// One route for all 22 pages. Every page shares the same 13-section structure
// and differs only in content, so a per-page route file would be 22 copies of
// this with nothing but an import changed — and 22 chances to drift.

export function generateStaticParams() {
  return pageParams();
}

function slugToPath(slug: string[]) {
  return `/${slug.join("/")}/`;
}

export async function generateMetadata(
  props: PageProps<"/[...slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getPage(slugToPath(slug));
  if (!page) return {};

  const canonical = page.slug;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonical,
    },
  };
}

export default async function ContentPage(props: PageProps<"/[...slug]">) {
  const { slug } = await props.params;
  const page = getPage(slugToPath(slug));
  if (!page) notFound();

  return <PageRenderer page={page} />;
}
