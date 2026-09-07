import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { faqs } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to the questions our reception team is asked most — NHS availability, costs, nervous patients, exemptions, emergencies and check-up intervals.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQs"
        title="Frequently asked questions"
        intro="If your question is not here, call the practice or send us a message — we would rather answer it than have you guess."
      />

      <section className="container-page py-14 sm:py-16">
        <div className="max-w-3xl">
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTASection
        title="Still not sure?"
        subtitle="Send us a message and reception will get back to you within one working day."
      />
    </>
  );
}
