# iSmile Dental Practice — website rebuild

Next.js 16 (App Router) + Tailwind v4, built for Vercel. Replaces the 2021
WordPress site at `ismiledentalpractice.co.uk`.

Built against the RankDent copy pack — `CLAUDE.md`, `research.md`,
`content-brief.md`, `compliance.md`, `build-plan.md` and `copy/*`. **Read
`compliance.md` before editing any copy.** Several of its rules are legal,
not stylistic.

## The one thing to understand

**Copy is data; there is one renderer.**

- `src/lib/content/*.ts` — one module per page. Slug, meta, H1, keywords, and
  a typed array of sections.
- `src/components/sections/*` — one component per section type.
- `src/components/PageRenderer.tsx` maps between them.
- `src/app/[...slug]/page.tsx` is the only route file for all 22 pages.

So a change to how a section looks lands on every page at once, no page can
drift out of the 13-section structure, and the copy stays in a shape someone
can edit without touching React.

The section types are the 13-section landing page structure from
`content-brief.md` §2, plus the extras the brief gives specific pages
(`risk` on the aesthetics pages, `urgent` on extractions).

## Guards — run these before you push

```bash
npm run check          # nap + compliance + lint
npm run prelaunch      # the above, plus the outstanding-placeholder list
```

| Script | What it fails on |
|---|---|
| `check:nap` | Any retired NAP variant: a phone grouping other than `01892 547286` / `01892547286`, a `tel:` containing a space, `Mount Pleasant Ave`, the locality without "Royal", the Yahoo address, `iSmile Dental & Skin Clinic` as the entity name, the Dentistify line. |
| `check:compliance` | Any botulinum toxin brand name anywhere in source — including alt text, form values and schema fields. Plus superlatives, "painless", "specialist", guarantee claims, "free consultation", finance claims, the comparative mercury claim, and `AggregateRating` schema. |
| `check:placeholders` | Lists every unresolved `[PLACEHOLDER]` / `[BUILD]` marker with its file and line. A pre-launch gate, not a build gate. |

Comments are stripped before matching, so a comment explaining *why* a claim
was dropped doesn't trip the guard it documents. A reviewed exemption is an
`allow-<rule id>` comment on the same line — there is currently exactly one,
on the deliberately retained `/botox-tunbridge-wells/` URL.

These guards cover source only. They cannot see the Google Business Profile,
social captions or directory listings, where `compliance.md` §1 expects the
same MHRA breach to be live. That audit is separate and still outstanding.

## Placeholders

Every unverified fact renders as a visible amber `[PLACEHOLDER: …]` marker.
**Do not fill one with a plausible guess.** A wrong price or an invented
opening time is worse than a visible gap, and several of these are ASA
exposure. `build-plan.md` §3 is the client-facing list of what's needed.

## URLs and the migration

- `trailingSlash: true` — every old URL carries one, and the whole point of
  retaining them is matching exactly.
- The five merges from `research.md` §3 are 301s in `next.config.ts`.
- **Status codes:** Next emits **308**, not 301, and ignores an explicit
  `statusCode: 301` under `trailingSlash`. 308 is a permanent redirect that
  also preserves the request method, and Google treats the two identically
  for consolidating ranking signals. Each indexed old URL reaches its
  destination in one hop, which is what actually matters. Flagged here
  because `build-plan.md` §5 asks for "301 redirects live and tested".

## Schema

Emitted per page from `src/lib/schema.tsx`: `Dentist`, `Organization`,
`WebSite`, `Person` (Dr Azimi, GDC number as `identifier`), `BreadcrumbList`,
plus `MedicalProcedure` on treatment pages and `FAQPage` on every FAQ block.

Deliberately **not** emitted:
- `AggregateRating` / `Review` — until real verified reviews are wired in.
- `openingHoursSpecification` — the hours have never been published. Inventing
  them would poison the Google Business Profile as well as the site.
- `sameAs` — two competing `g.page` profiles are in circulation and no social
  profiles were found. Pointing `sameAs` at the wrong profile actively harms
  the entity.

## Environment variables

None are required to build or run.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and schema. Defaults to `https://ismiledentalpractice.co.uk`. |
| `RESEND_API_KEY` | Turns on enquiry notification emails. |
| `ENQUIRY_NOTIFY_EMAIL` | The practice's business-domain inbox. Not the Yahoo address. |

## Patient data

The enquiry form is the native replacement for the JotForm iframe, which sent
health-related enquiry data to a free Yahoo consumer inbox. It captures
explicit consent and tells patients not to send clinical detail.

There is deliberately **no database**. Before adding one — or a CRM, an
analytics tool or a chat widget — decide where that data lives, who can read
it, and how long it is kept. A privacy notice page is still outstanding and
is a launch blocker.

## Build status

**8 of 22 pages built.** Phase 1 is the four core pages plus the three hubs and
Dental Implants, per `build-plan.md` §1 — they carry the navigation and the
internal linking structure, so they come before the pages they parent.

| | |
|---|---|
| Built | Home · About Us · Meet the Team · Contact · General Dentistry hub · Cosmetic Dentistry hub · Skin Clinic hub · Dental Implants |
| Next | The 13 remaining treatment pages, in `build-plan.md` §1 commercial order: Invisalign → Veneers → Whitening → Composite Bonding → Crowns → Bridges → Dentures → Root Canal → Extractions → Check-Ups → Hygiene → White Fillings, plus Anti-Wrinkle Treatments and Dermal Fillers |
| Then | Blog migration — `/blog/`, four posts unchanged, `/category/dental/` |
| Not started | The nine location pages. **Their copy has not been written yet** (`build-plan.md` §4). `locationPagesBuilt` in `src/lib/locations.ts` renders them as plain text until they exist, rather than linking to 404s. |
| Not written | Fees & Membership · Nervous Patients · New Patients · Complaints Procedure. All recommended in `build-plan.md` §4; the complaints page is a GDC Standards requirement and a launch blocker. |

### Pages that must not go live as they stand

- **`/team/`** — the copy pack's own instruction. A bio page with visible gaps
  is worse than the thin page it replaces. Dr Azimi's block must be filled
  first; the client checklist is at the foot of `copy/01-core-pages.md`.
- **`/facial-rejuvenation/`** and its two children — blocked on the POM
  advertising review in `compliance.md` §1, and on Dr Azimi's aesthetics
  training and qualifications, which are the core trust asset on those pages.

### Open launch blockers carried in the copy

- Both treatment guarantees (five-year and ten-year) are omitted. They
  contradict each other and neither has written terms.
- The complaints procedure does not exist as a page.
- The privacy notice does not exist as a page, and the enquiry form links to it.
- The verified Google Business Profile is unconfirmed — two competing
  `g.page` links are in circulation, splitting reviews.

## Development

```bash
npm install
npm run dev
npm run build && npm run start
```
