import type { Metadata } from "next";
import { Star } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { reviewsPlaceholder } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Reviews",
  description: "See what customers say about Mottram Motor Garage, Manchester.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title="Customer Reviews"
        intro="Real reviews build trust faster than anything else on this page — replace the sample content below with genuine, verified reviews before launch."
      />

      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviewsPlaceholder.map((review, i) => (
            <div key={i} className="rounded-xl bg-white p-6 shadow-sm border border-navy-100">
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4" fill={idx < review.rating ? "currentColor" : "none"} aria-hidden="true" />
                ))}
              </div>
              <p className="mt-3 text-sm text-navy-700 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-navy-400">{review.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-navy-50 border border-navy-100 p-6 text-sm text-navy-700 max-w-2xl">
          <strong className="text-navy-900">Next step:</strong> connect a
          Google Business Profile review feed, or manually add verified
          reviews here as they come in. An automated post-job review request
          (SMS/email) is the fastest way to build up a genuine review base.
        </div>
      </section>

      <CTASection />
    </>
  );
}
