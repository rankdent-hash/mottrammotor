-- ---------------------------------------------------------------------------
-- Mottram Motor Garage — Phase 2/3 schema
--
-- This is the database schema for the booking flow (Phase 2 — reg lookup,
-- availability, booking form) and lays the groundwork for the admin/CRM
-- panel (Phase 3 — staff logins, customer notes, follow-ups) so that phase
-- doesn't require a redesign later. See claude/website-structure-plan.md §10
-- and claude/admin-panel-plan.md §9 for the plans this implements.
--
-- Applied 8 August 2026 to a dedicated Supabase project ("mottrammotor",
-- ref jykvubviajyyrulswxug, eu-west-2, £0/mo tier) — kept separate from
-- rankdent's other Supabase project (supabase-emerald-harbor) so this
-- garage's customer data never mixes with an unrelated site's.
-- SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY still need setting in Vercel
-- before the app actually uses this (see claude/build-status.md). Safe to
-- re-run against this or any other project thanks to `if not exists` /
-- `create or replace` throughout.
-- ---------------------------------------------------------------------------

-- gen_random_uuid() ships built into Postgres 13+ (which Supabase runs), but
-- pgcrypto is enabled defensively in case this ever targets an older/non-
-- Supabase Postgres instance.
create extension if not exists pgcrypto;

-- Powers the trigram (partial-match) search index on customers.name, so
-- staff typing "Wilkin" in the admin search box finds "Janet Wilkinson".
create extension if not exists pg_trgm;

-- A small helper used by the `updated_at` triggers below, so every mutable
-- table stamps itself automatically instead of relying on application code
-- to remember to set it.
create or replace function set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- staff — front-desk / manager logins for the Phase 3 admin panel.
-- Not used by anything in Phase 2; created now so notes/follow_ups below
-- have somewhere to point staff_id/assigned_staff_id at, and so Phase 3
-- doesn't need a migration that touches tables already holding real data.
-- ---------------------------------------------------------------------------
create table if not exists staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  -- Hashed PIN (never plain text) — see admin-panel-plan.md §2. Nullable
  -- because a staff record can exist before a PIN is issued.
  pin_hash text,
  role text not null default 'front_desk' check (role in ('front_desk', 'manager')),
  active boolean not null default true,
  -- One-letter avatar fallback (e.g. "D" for Dave) and/or a photo URL —
  -- mirrors the Staff shape already used by the admin panel mock data.
  initial text,
  photo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists staff_set_updated_at on staff;
create trigger staff_set_updated_at
  before update on staff
  for each row execute function set_updated_at();

-- verify_staff_pin — the only way application code (src/app/api/admin/login)
-- ever checks a PIN. It returns a matching row if p_pin is correct for
-- p_staff_id, zero rows otherwise — app code never selects pin_hash
-- directly. security definer + a locked search_path so it can read
-- pin_hash despite staff's RLS having no policies (see the RLS section at
-- the bottom of this file), without granting broader table access.
-- search_path is `public, extensions` (not just `public`) because Supabase
-- installs pgcrypto into the `extensions` schema, not `public` — the
-- original `public`-only version of this function looked correct and
-- passed `npm run build`, but every real login call failed at runtime with
-- "function crypt(text, text) does not exist", since a locked search_path
-- means this function can't see functions outside the schemas it lists,
-- regardless of what's on the caller's search_path. Fixed 9 August 2026
-- after Fred reported PIN login not working; verified with a live RPC call
-- (correct PIN → matching row, wrong PIN → zero rows) before rolling this
-- fix out here. Already applied to the live project (ref jykvubviajyyrulswxug)
-- — included here so this file stays the reproducible source of truth.
create or replace function verify_staff_pin(p_staff_id uuid, p_pin text)
returns table (id uuid, name text, initial text, role text)
language sql
security definer
set search_path = public, extensions
as $$
  select s.id, s.name, s.initial, s.role
  from staff s
  where s.id = p_staff_id
    and s.active
    and s.pin_hash is not null
    and s.pin_hash = crypt(p_pin, s.pin_hash);
$$;

-- ---------------------------------------------------------------------------
-- customers — one row per person, shared by the booking flow and the
-- admin/CRM panel. Bookings match against this table by phone number to
-- avoid creating duplicate customer records for repeat bookers.
-- ---------------------------------------------------------------------------
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  -- SMS/email marketing + reminder consent (PECR) — sourced from the
  -- booking form's consent checkbox.
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists customers_set_updated_at on customers;
create trigger customers_set_updated_at
  before update on customers
  for each row execute function set_updated_at();

-- Plain btree — customers are looked up by exact/normalised phone number,
-- not partial match, so no trigram index needed here.
create index if not exists idx_customers_phone on customers (phone);

-- Trigram index for partial, misspelling-tolerant name search (the
-- "universal search box" from admin-panel-plan.md §3).
create index if not exists idx_customers_name_trgm on customers using gin (name gin_trgm_ops);

-- ---------------------------------------------------------------------------
-- vehicles — one row per car, linked to the customer who booked it in.
-- Populated either by DVLA reg lookup (make/colour/year) or left partially
-- filled if the lookup wasn't available at booking time.
-- ---------------------------------------------------------------------------
create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  plate text not null,
  make text,
  model text,
  year integer,
  colour text,
  mot_due_date date,
  service_due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists vehicles_set_updated_at on vehicles;
create trigger vehicles_set_updated_at
  before update on vehicles
  for each row execute function set_updated_at();

-- Plain btree — plates are looked up by exact match (normalised uppercase,
-- no spaces, by the application layer before querying).
create index if not exists idx_vehicles_plate on vehicles (plate);
create index if not exists idx_vehicles_customer_id on vehicles (customer_id);

-- ---------------------------------------------------------------------------
-- bookings — a booking request made through the website, from the point a
-- customer submits the booking form through to the job being completed or
-- cancelled. This is deliberately simple for Phase 2 (a single request per
-- row); Phase 3's fuller job-tracking board (booked → in progress →
-- awaiting parts → complete → invoiced, per website-structure-plan.md §7)
-- can extend this table rather than replace it.
-- ---------------------------------------------------------------------------
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  service_type text not null,
  -- The requested slot. Stored as separate date/time columns (rather than
  -- a single timestamptz) because the booking form collects them
  -- separately and a requested slot isn't guaranteed to become a real
  -- appointment — both can be null if someone submits without picking one
  -- and asks to be called instead.
  requested_date date,
  requested_time time,
  status text not null default 'requested'
    check (status in ('requested', 'confirmed', 'completed', 'cancelled')),
  message text,
  sms_email_consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists bookings_set_updated_at on bookings;
create trigger bookings_set_updated_at
  before update on bookings
  for each row execute function set_updated_at();

create index if not exists idx_bookings_customer_id on bookings (customer_id);
create index if not exists idx_bookings_vehicle_id on bookings (vehicle_id);

-- Supports the availability check (src/lib/availability.ts): "which slots
-- in this date range are already taken by a non-cancelled booking?".
create index if not exists idx_bookings_requested_date on bookings (requested_date, status);

-- ---------------------------------------------------------------------------
-- leads — raw enquiries from the website's Contact page (and, later,
-- phone/walk-in), before they become a real customer/booking. Kept
-- separate from `bookings` ("please book me a slot") and `customers` (a
-- confirmed person with a history) because a contact-form message is
-- neither yet — it's just "someone got in touch." Treating every message
-- as an instant customer/booking record risks nameless or junk enquiries
-- polluting the data staff actually rely on day to day. Staff explicitly
-- convert a lead into a customer once it's real (POST
-- /api/admin/leads/[id]/convert), which is the standard "pipeline before
-- the real record" pattern most CRMs use for inbound enquiries.
--
-- A lead can arrive with just a name, just a plate, or both — the contact
-- form only asks for whichever the customer wants to give — so `name` is
-- nullable and `plate` is nullable, but at least one of the two must be
-- present (the check constraint below) since a lead with neither is
-- unactionable.
-- ---------------------------------------------------------------------------
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  plate text,
  phone text,
  email text,
  -- Free text matching the SERVICES list in src/lib/services.ts (not a
  -- foreign key/enum — that list can change without a migration, and a
  -- lead's "what service?" answer is advisory context for staff, not data
  -- integrity-critical the way e.g. a booking's status is).
  service_interest text,
  message text,
  source text not null default 'contact_form'
    check (source in ('contact_form', 'phone', 'walk_in', 'other')),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'booked', 'lost')),
  assigned_staff_id uuid references staff(id) on delete set null,
  -- Set by the convert action once this lead becomes a real customer —
  -- keeps the lead's own history rather than deleting or duplicating it.
  customer_id uuid references customers(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint leads_name_or_plate check (name is not null or plate is not null)
);

drop trigger if exists leads_set_updated_at on leads;
create trigger leads_set_updated_at
  before update on leads
  for each row execute function set_updated_at();

-- Backs the admin Leads tab's status-grouped list (idx on status) and the
-- "already have a lead for this plate?" checks a future dedupe pass could
-- add (idx on plate). Trigram index on name mirrors customers' — same
-- partial/misspelling-tolerant search rationale.
create index if not exists idx_leads_status on leads (status, created_at);
create index if not exists idx_leads_plate on leads (plate);
create index if not exists idx_leads_name_trgm on leads using gin (name gin_trgm_ops);

-- ---------------------------------------------------------------------------
-- notes — internal staff notes against a customer (and optionally a
-- specific vehicle), e.g. "called about rear tyres, no answer". Phase 3
-- admin panel feature; see admin-panel-plan.md §5.
-- ---------------------------------------------------------------------------
create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  vehicle_id uuid references vehicles(id) on delete set null,
  -- set null (not cascade) so a departing staff member's historical notes
  -- stay on the customer record rather than disappearing with them.
  staff_id uuid references staff(id) on delete set null,
  -- Quick one-tap tags from the admin UI (Called, No answer, Booked in,
  -- Waiting on parts, Complaint) — free text otherwise, so nullable.
  tag text,
  text text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_notes_customer_id on notes (customer_id);

-- ---------------------------------------------------------------------------
-- follow_ups — the admin panel's follow-up checklist: manual reminders
-- ("call about rear tyres in 3 months") plus ones the system will
-- eventually create automatically ahead of MOT/service due dates. Phase 3
-- feature; see admin-panel-plan.md §5 and §9.
-- ---------------------------------------------------------------------------
create table if not exists follow_ups (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  due_date date not null,
  status text not null default 'open' check (status in ('open', 'done')),
  assigned_staff_id uuid references staff(id) on delete set null,
  source text not null default 'manual'
    check (source in ('manual', 'auto-mot', 'auto-service')),
  note text,
  completed_at timestamptz,
  completed_by uuid references staff(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists follow_ups_set_updated_at on follow_ups;
create trigger follow_ups_set_updated_at
  before update on follow_ups
  for each row execute function set_updated_at();

create index if not exists idx_follow_ups_customer_id on follow_ups (customer_id);
create index if not exists idx_follow_ups_due_date on follow_ups (due_date, status);

-- ---------------------------------------------------------------------------
-- Row Level Security — locked down by default.
--
-- Every table below only has RLS *enabled*, with no policies added. That
-- means: the anon/public key (safe to ship to the browser) can read or
-- write nothing, on any table, until a policy explicitly allows it. The
-- server-side service role key (src/lib/supabase.ts) bypasses RLS
-- entirely, which is why all of Phase 2's reads/writes go through that key
-- from API routes rather than a browser-side client.
--
-- When Phase 3 adds real staff logins, add targeted policies here (e.g.
-- "authenticated staff can read/write their garage's rows") rather than
-- disabling RLS.
-- ---------------------------------------------------------------------------
alter table staff enable row level security;
alter table customers enable row level security;
alter table vehicles enable row level security;
alter table bookings enable row level security;
alter table notes enable row level security;
alter table follow_ups enable row level security;
alter table leads enable row level security;
