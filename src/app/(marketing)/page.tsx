import Link from "next/link";
import {
  ShieldCheck,
  Wrench,
  Gauge,
  CircleDot,
  BadgeCheck,
  Banknote,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import BlogCard from "@/components/BlogCard";
import ReviewsSection from "@/components/ReviewsSection";
import CTASection from "@/components/CTASection";
import { business, repairServices } from "@/lib/site-data";
import { getAllPosts } from "@/lib/blog-data";

const mainServices = [
  {
    href: "/mot-testing",
    icon: BadgeCheck,
    name: "MOT Testing",
    desc: "Fast, fully-qualified MOT testing with clear pass/fail explanations.",
  },
  {
    href: "/servicing",
    icon: Wrench,
    name: "Car Servicing",
    desc: "Full and interim services to manufacturer schedules, all makes.",
  },
  {
    href: "/repairs",
    icon: Gauge,
    name: "Repairs & Diagnostics",
    desc: "From brakes to warning lights — honest diagnosis, honest quotes.",
  },
  {
    href: "/tyres",
    icon: CircleDot,
    name: "Tyres",
    desc: "Tyre fitting, balancing and puncture repair, fitted while you wait.",
  },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: "Qualified technicians",
    desc: "Work carried out by trained, experienced mechanics — not guesswork.",
  },
  {
    icon: Banknote,
    title: "Transparent pricing",
    desc: "You'll always get a clear quote before any work starts.",
  },
  {
    icon: BadgeCheck,
    title: "No unnecessary work",
    desc: "We tell you what needs doing now and what can wait — not everything at once.",
  },
  {
    icon: MapPin,
    title: "Local & easy to reach",
    desc: `Serving ${business.areaServed.slice(0, 4).join(", ")} and the surrounding area.`,
  },
];

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />

      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
            Everything your car needs, under one roof
          </h2>
          <p className="mt-3 text-navy-600">
            MOT testing, servicing, repairs and tyres — booked online in
            minutes.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mainServices.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col rounded-xl border border-navy-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-amber-400 transition-all"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-navy-800 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-navy-900">{s.name}</h3>
              <p className="mt-1.5 text-sm text-navy-600 flex-1">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 group-hover:text-amber-600">
                Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-navy-50">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
              Why drivers choose Mottram Motor Garage
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <div key={item.title} className="rounded-xl bg-white p-6 border border-navy-100">
                <item.icon className="h-6 w-6 text-amber-500" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-1.5 text-sm text-navy-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
              Common repairs we handle every week
            </h2>
            <p className="mt-3 text-navy-600">
              A few of the most requested jobs — see the full repairs list
              for everything we cover.
            </p>
          </div>
          <Link
            href="/repairs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-amber-600 shrink-0"
          >
            View all repairs <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {repairServices.slice(0, 4).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 border-t border-navy-100">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
              Car care advice from our team
            </h2>
              <p className="mt-3 text-navy-600">
                Honest, plain-English guides on MOTs, servicing, repairs and
                tyres — no jargon, no scare tactics.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-amber-600 shrink-0"
            >
              View all advice <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <ReviewsSection />
      <CTASection />
    </>
  );
}
