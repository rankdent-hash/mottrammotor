import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getPostsForService } from "@/lib/blog-data";

/**
 * "Related articles" block for a service page, linking down into the blog
 * posts that reference it — the other half of the two-way link between
 * service pages and blog content (posts link up to services in-body).
 */
export default function RelatedArticles({ href }: { href: string }) {
  const posts = getPostsForService(href);
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-navy-100 bg-navy-50">
      <div className="container-page py-14 sm:py-16">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-5 w-5 text-navy-700" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-navy-900">Related articles</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl border border-navy-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-amber-400 transition-all"
            >
              <h3 className="font-semibold text-navy-900 leading-snug">{post.title}</h3>
              <p className="mt-1.5 text-sm text-navy-600 flex-1">{post.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 group-hover:text-amber-600">
                Read more <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
