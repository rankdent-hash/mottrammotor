import { Quote } from "lucide-react";
import { reviews } from "@/lib/site-data";

export default function ReviewsSection() {
  return (
    <section className="bg-brand-50 border-y border-brand-100">
      <div className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
            What our patients say
          </h2>
          <p className="mt-3 text-brand-700">
            Reviews are published with the patient&apos;s permission and are
            never edited beyond removing identifying details.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.author + review.treatment}
              className="rounded-xl border border-brand-100 bg-white p-6"
            >
              <Quote className="h-6 w-6 text-brand-400" aria-hidden="true" />
              <blockquote className="mt-3 text-sm leading-relaxed text-brand-800">
                {review.quote}
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-brand-900">{review.author}</span>
                <span className="block text-brand-600">{review.treatment}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
