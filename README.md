# Mottram Motor Garage — Website

Public marketing website for Mottram Motor Garage (MOT testing, servicing,
repairs and tyre fitting in Manchester), built with Next.js (App Router),
TypeScript and Tailwind CSS, deployed on Vercel.

## Status

This is the **Phase 1 (marketing site)** build from the project's website
structure plan. It is a fully working, deployable site with a booking
*request* form, but it does not yet include:

- Real business details — address, opening hours, pricing and
  accreditations throughout the site are placeholders (search the codebase
  for `TBC` / `[confirm` to find every spot that needs real content).
- A persistent CRM backend — bookings submitted via `/book` or `/contact`
  currently just log server-side (see `src/app/api/booking/route.ts`) and
  optionally email a notification if `RESEND_API_KEY` /
  `BOOKING_NOTIFY_EMAIL` env vars are set. Wiring this up to a real
  database (e.g. Supabase), DVLA vehicle lookup, and automated SMS/email
  MOT reminders is Phase 2/3 of the plan.
- An admin/CRM dashboard.

See the full structure and phased build plan in the project workspace
(`website-structure-plan.md`).

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

## Project structure

- `src/app/*` — one route per page (see the site map in the structure plan)
- `src/app/repairs/[slug]` — dynamic template for individual repair pages,
  driven by `src/lib/site-data.ts`
- `src/components/*` — shared UI (header, footer, booking form, etc.)
- `src/app/api/booking/route.ts` — booking request handler
- `src/lib/site-data.ts` — all business content/config in one place
