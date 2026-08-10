import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BlogCard from "@/components/BlogCard";
import CTASection from "@/components/CTASection";
import { getAllPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Car Care Advice & Guides",
  description:
    "MOT, servicing, tyres and repair advice from Mottram Motor Garage in Manchester — honest, plain-English guides to help you look after your car.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Advice & Guides"
        title="Car Care Advice from Mottram Motor Garage"
        intro="Plain-English guides on MOTs, servicing, repairs and tyres — written by the team who'll actually be working on your car in Manchester."
      />

      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <CTASection
        title="Can't find what you're looking for?"
        subtitle="Give us a call and we'll talk through your car's issue directly — no guesswork, no upselling."
      />
    </>
  );
}
