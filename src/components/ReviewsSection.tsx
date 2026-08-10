import { Star } from "lucide-react";
import { reviewsPlaceholder } from "@/lib/site-data";

export default function ReviewsSection() {
  return (
    <section className="bg-navy-50">
      <div className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
            What customers say
          </h2>
          <p className="mt-3 text-navy-600">
            Sample layout only — connect a live Google review feed or add
            verified customer reviews here before launch.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {reviewsPlaceholder.map((review, i) => (
            <div key={i} className="rounded-xl bg-white p-6 shadow-sm border border-navy-100">
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4"
                    fill={idx < review.rating ? "currentColor" : "none"}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-navy-700 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-navy-400">
                {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
