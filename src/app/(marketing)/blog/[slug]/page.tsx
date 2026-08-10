import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, CheckCircle2 } from "lucide-react";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import LinkedParagraph from "@/components/LinkedParagraph";
import { blogPosts, getPostBySlug, formatPostDate } from "@/lib/blog-data";
import { business, siteUrl } from "@/lib/site-data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${siteUrl}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const primaryService = post.relatedServices[0];
  let anchorUsed = false;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: business.name },
    publisher: { "@type": "Organization", name: business.name },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-navy-900 text-white">
        <div className="container-page py-12 sm:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-navy-200 hover:text-white mb-5"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All advice &amp; guides
          </Link>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400 mb-2">
            {post.category}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-3xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-navy-200">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {formatPostDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16 grid lg:grid-cols-3 gap-10">
        <article className="lg:col-span-2 space-y-8 min-w-0">
          {post.keyTakeaways.length > 0 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-700 mb-3">
                Key takeaways
              </h2>
              <ul className="space-y-2">
                {post.keyTakeaways.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-navy-800">
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {post.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-semibold text-navy-900">{section.heading}</h2>
              <div className="mt-3 space-y-4 text-navy-700 leading-relaxed">
                {section.paragraphs.map((para, pi) => {
                  const applyLink =
                    !anchorUsed && !!primaryService && para.includes(post.inlineLinkAnchor);
                  if (applyLink) anchorUsed = true;
                  return (
                    <LinkedParagraph
                      key={pi}
                      text={para}
                      anchor={post.inlineLinkAnchor}
                      href={primaryService?.href ?? "/"}
                      applyLink={applyLink}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          {post.faqs.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-navy-900 mb-4">Frequently asked questions</h2>
              <FAQAccordion items={post.faqs} />
            </div>
          )}
        </article>

        <aside className="lg:col-span-1">
          <div className="rounded-xl border border-navy-100 bg-navy-50 p-6 sticky top-24">
            <h3 className="font-semibold text-navy-900">Need this sorted?</h3>
            <p className="mt-2 text-sm text-navy-600">
              {business.name} covers everything in this guide — book online or call and
              we&apos;ll talk you through it honestly before any work begins.
            </p>
            {post.relatedServices.length > 0 && (
              <ul className="mt-4 space-y-2">
                {post.relatedServices.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="flex items-center justify-between rounded-md bg-white border border-navy-100 px-3.5 py-2.5 text-sm font-semibold text-navy-800 hover:border-amber-400 hover:text-amber-600 transition-colors"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link
              href="/book"
              className="mt-4 block w-full rounded-md bg-amber-500 py-3 text-center font-semibold text-navy-950 hover:bg-amber-400 transition-colors"
            >
              Book Online
            </Link>
            <a
              href={business.phoneHref}
              className="mt-2 block w-full rounded-md border border-navy-200 py-3 text-center font-semibold text-navy-800 hover:bg-white transition-colors"
            >
              Call {business.phone}
            </a>
          </div>
        </aside>
      </section>

      <CTASection />
    </>
  );
}
