import Link from "next/link";
import { UserRound } from "lucide-react";
import Prose from "@/components/Prose";
import Placeholder from "@/components/Placeholder";
import { SectionShell } from "@/components/sections/Blocks";
import { isPlaceholder, type TeamMember, type TeamSection } from "@/lib/content/types";

/**
 * The reusable team-member block from copy/01-core-pages.md Page 3, Section 9.
 *
 * The /team/ page is the largest single credibility gap on the site — the old
 * one carries a name and a GDC number and nothing else, while the practice's
 * main local competitor publishes full bios with photographs. The structure
 * is built out here so that filling it in is data entry rather than design
 * work, but per that page's own instruction it must not go live until at
 * least Dr Azimi's block is complete: a bio page with visible gaps is worse
 * than the thin page it replaces.
 */
export default function Team({ section }: { section: TeamSection }) {
  return (
    <SectionShell h2={section.h2}>
      {section.intro && (
        <div className="prose-body mb-8 max-w-2xl text-ink-800">
          {section.intro.map((paragraph, i) => (
            <p key={i}>
              <Prose parts={paragraph} />
            </p>
          ))}
        </div>
      )}

      {/* A single member is the featured clinician block, so it gets the full
          measure rather than sitting in half a two-column grid. */}
      <div className={section.members.length === 1 ? "grid gap-6" : "grid gap-6 lg:grid-cols-2"}>
        {section.members.map((member, i) => (
          <MemberCard key={i} member={member} />
        ))}
      </div>
    </SectionShell>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="rounded-xl border border-ink-100 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-5">
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-ink-300 bg-ink-50 text-ink-400"
          aria-hidden="true"
        >
          <UserRound className="h-8 w-8" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-ink-900">
            {isPlaceholder(member.name) ? <Placeholder data={member.name} /> : member.name}
          </h3>
          <p className="mt-0.5 text-sm text-ink-600">
            {isPlaceholder(member.role) ? <Placeholder data={member.role} /> : member.role}
          </p>
          {member.gdc && (
            <p className="mt-1.5 text-sm font-medium text-ink-800">
              GDC Number:{" "}
              {isPlaceholder(member.gdc) ? <Placeholder data={member.gdc} /> : member.gdc}
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs">
        <Placeholder data={member.photo} />
      </p>

      {member.fields.length > 0 && (
        <dl className="mt-5 space-y-2.5 border-t border-ink-100 pt-5 text-sm">
          {member.fields.map((field) => (
            <div key={field.label}>
              <dt className="font-semibold text-ink-900">{field.label}</dt>
              <dd className="mt-0.5 text-ink-700">
                {isPlaceholder(field.value) ? (
                  <Placeholder data={field.value} />
                ) : (
                  field.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {member.bio.length > 0 && (
        <div className="prose-body mt-5 border-t border-ink-100 pt-5 text-sm text-ink-700">
          {member.bio.map((paragraph, i) => (
            <p key={i}>
              <Prose parts={paragraph} />
            </p>
          ))}
        </div>
      )}

      {member.pullQuote && (
        <blockquote className="mt-5 border-l-4 border-ink-400 bg-ink-50 py-3 pl-4 text-sm italic text-ink-800">
          <Placeholder data={member.pullQuote} />
        </blockquote>
      )}

      {member.link && (
        <p className="mt-5">
          <Link
            href={member.link.href}
            className="text-sm font-semibold text-ink-700 underline underline-offset-4 hover:text-clay-700"
          >
            {member.link.label}
          </Link>
        </p>
      )}
    </article>
  );
}
