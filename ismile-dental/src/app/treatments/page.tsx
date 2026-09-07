import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TreatmentCard from "@/components/TreatmentCard";
import CTASection from "@/components/CTASection";
import { treatments, type TreatmentCategory } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Dental Treatments",
  description:
    "NHS and private dental treatments — check-ups and hygiene, white fillings, crowns, root canal treatment, implants, whitening, clear aligners, veneers and dentures.",
};

const categories: TreatmentCategory[] = ["General", "Restorative", "Cosmetic"];

const categoryIntros: Record<TreatmentCategory, string> = {
  General: "The everyday care that keeps problems small.",
  Restorative: "Repairing and replacing teeth that are already damaged.",
  Cosmetic: "Elective treatments to change how your teeth look.",
};

export default function TreatmentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Treatments"
        title="What we can do for you"
        intro="Most of what follows is available on the NHS. Where a treatment is private only, it says so on the card — and we will always tell you what the NHS alternative is before you decide."
      />

      {categories.map((category) => {
        const inCategory = treatments.filter((t) => t.category === category);
        if (inCategory.length === 0) return null;

        return (
          <section key={category} className="container-page py-12 sm:py-14">
            <h2 className="text-2xl font-bold text-brand-900">{category}</h2>
            <p className="mt-2 text-brand-700">{categoryIntros[category]}</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {inCategory.map((t) => (
                <TreatmentCard key={t.slug} treatment={t} />
              ))}
            </div>
          </section>
        );
      })}

      <CTASection title="Not sure what you need?" subtitle="Book a check-up and we will tell you — including when the answer is that nothing needs doing." />
    </>
  );
}
