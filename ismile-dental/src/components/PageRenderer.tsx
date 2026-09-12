import Link from "next/link";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import QuickLinks from "@/components/sections/QuickLinks";
import ProseBlock from "@/components/sections/ProseBlock";
import WhyChoose from "@/components/sections/WhyChoose";
import Reviews from "@/components/sections/Reviews";
import Explainer from "@/components/sections/Explainer";
import Journey from "@/components/sections/Journey";
import Cost from "@/components/sections/Cost";
import Comparison from "@/components/sections/Comparison";
import Faqs from "@/components/sections/Faqs";
import Areas from "@/components/sections/Areas";
import FinalCta from "@/components/sections/FinalCta";
import Risk from "@/components/sections/Risk";
import Urgent from "@/components/sections/Urgent";
import Team from "@/components/sections/Team";
import Placeholder from "@/components/Placeholder";
import { JsonLd } from "@/lib/schema";
import { isPlaceholder, type PageContent } from "@/lib/content/types";

/**
 * Renders a page from its content module. Every page in the site goes through
 * here, so a fix to a section applies to all 22 at once and no page can drift
 * out of the 13-section structure.
 */
export default function PageRenderer({ page }: { page: PageContent }) {
  return (
    <>
      <JsonLd page={page} />
      <Breadcrumbs page={page} />

      {page.sections.map((section, i) => {
        switch (section.type) {
          case "hero":
            return <Hero key={i} section={section} source={page.slug} />;
          case "trustStrip":
            return <TrustStrip key={i} section={section} />;
          case "quickLinks":
            return <QuickLinks key={i} section={section} />;
          case "recognise":
          case "outcome":
            return <ProseBlock key={i} section={section} />;
          case "whyChoose":
            return <WhyChoose key={i} section={section} />;
          case "reviews":
            return <Reviews key={i} section={section} />;
          case "explainer":
            return <Explainer key={i} section={section} />;
          case "journey":
            return <Journey key={i} section={section} />;
          case "cost":
            return <Cost key={i} section={section} />;
          case "comparison":
            return <Comparison key={i} section={section} />;
          case "faqs":
            return <Faqs key={i} section={section} />;
          case "areas":
            return <Areas key={i} section={section} />;
          case "finalCta":
            return <FinalCta key={i} section={section} />;
          case "risk":
            return <Risk key={i} section={section} />;
          case "urgent":
            return <Urgent key={i} section={section} />;
          case "team":
            return <Team key={i} section={section} />;
        }
      })}

      {page.reviewed && <AuthorBlock page={page} />}
    </>
  );
}

/** Rendered above the hero, matching the BreadcrumbList in the schema graph. */
function Breadcrumbs({ page }: { page: PageContent }) {
  if (page.breadcrumb.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className="border-b border-ink-100 bg-white">
      <ol className="container-page flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-sm text-ink-600">
        {page.breadcrumb.map((crumb, i) => {
          const isLast = i === page.breadcrumb.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-medium text-ink-900">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link href={crumb.href} className="hover:text-clay-700 hover:underline">
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * E-E-A-T attribution — content attributed to a named, GDC-registered
 * clinician with a last-reviewed date (content-brief.md §4).
 */
function AuthorBlock({ page }: { page: PageContent }) {
  if (!page.reviewed) return null;
  const { by, date } = page.reviewed;

  return (
    <div className="border-t border-ink-100 bg-white">
      <p className="container-page py-6 text-sm italic text-ink-600">
        Reviewed by {by} — Last reviewed:{" "}
        {isPlaceholder(date) ? <Placeholder data={date} /> : date}
      </p>
    </div>
  );
}
