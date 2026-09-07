# iSmile Dental Practice — Website

Marketing website for iSmile Dental Practice (NHS and private dental care),
built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4, and
intended for deployment on Vercel.

## Status

This is a complete, deployable Phase 1 build: every page renders, the
appointment request and contact forms submit end to end, and the site passes
`next build` and `eslint` clean. What it does **not** yet have:

- **Real business details.** Address, phone number, email, opening hours,
  prices, team members and patient reviews are all placeholders. Every one of
  them is wrapped in square brackets and marked `TBC` — run
  `grep -rn "TBC" src/` to list them. A banner sits above the header on every
  page until they are filled in; delete
  `src/components/PlaceholderBanner.tsx` and its use in
  `src/app/layout.tsx` once they are.
- **Persistence.** Enquiries are validated, logged to the server, and emailed
  to the practice if `RESEND_API_KEY` and `ENQUIRY_NOTIFY_EMAIL` are set.
  There is no database, by design — see the patient-data note in
  [SETUP.md](./SETUP.md) before adding one.
- **Real photography and branding.** The wordmark
  (`src/components/Logo.tsx`) and favicon (`src/app/icon.tsx`) are drawn in
  code rather than shipped as image files, so there is no placeholder binary
  to mistake for a real asset.
- **A map.** The contact page has an honest "map to be added" placeholder
  rather than an embedded map pointing at an invented address.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Deployment and account setup

See [SETUP.md](./SETUP.md) — it covers creating the GitHub and Vercel
accounts, connecting Claude Code to the repo, and the environment variables.

## Project structure

- `src/lib/site-data.ts` — **all** business content in one place: practice
  details, navigation, treatments, prices, team, reviews and FAQs. Almost
  every content change starts and ends here.
- `src/app/*` — one directory per route:
  - `/` home, `/new-patients`, `/treatments`, `/treatments/[slug]`,
    `/emergency-dentist`, `/prices`, `/about`, `/faqs`, `/contact`, `/book`
  - `sitemap.ts`, `robots.ts`, `icon.tsx` — generated metadata
  - `api/enquiry/route.ts` — appointment request and contact form handler
- `src/components/*` — shared UI. `Header`, `Footer`, `MobileCTA` and
  `PlaceholderBanner` make up the site chrome in `src/app/layout.tsx`.

## Conventions worth knowing

- **Colour.** Two palettes are defined in `src/app/globals.css`: `brand`
  (deep petrol teal, for structure and text) and `coral` (calls to action).
  `coral-600` is the lightest coral that clears 4.5:1 against white text, so
  CTA buttons stay at `coral-600` or darker and **darken** on hover.
- **Placeholders are visible on purpose.** Nothing is invented to look
  finished — no made-up phone number, no fabricated patient testimonials, no
  guessed NHS band charges (they change every April). A visible `[… TBC]` is
  easier to catch before launch than a plausible wrong number.
- **Regulatory content.** The footer carries the GDC and CQC statements and
  the complaints note that a UK dental practice site is expected to display.
  `JsonLd.tsx` deliberately omits `Review`/`AggregateRating` markup until
  there are real reviews to put in it.
