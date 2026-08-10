import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { formatPostDate, type BlogPost } from "@/lib/blog-data";

const categoryStyles: Record<BlogPost["category"], string> = {
  MOT: "bg-teal-100 text-teal-700",
  Servicing: "bg-amber-100 text-amber-700",
  Repairs: "bg-navy-100 text-navy-700",
  Tyres: "bg-amber-100 text-amber-700",
  "EV & Hybrid": "bg-teal-100 text-teal-700",
  Advice: "bg-navy-100 text-navy-700",
};

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl border border-navy-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-amber-400 transition-all"
    >
      <span
        className={`self-start rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${categoryStyles[post.category]}`}
      >
        {post.category}
      </span>
      <h3 className="mt-3 font-semibold text-navy-900 leading-snug">{post.title}</h3>
      <p className="mt-2 text-sm text-navy-600 flex-1">{post.excerpt}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-navy-500">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {post.readTime}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 group-hover:text-amber-600">
          Read more <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
