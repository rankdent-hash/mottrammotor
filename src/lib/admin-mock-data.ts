// ---------------------------------------------------------------------------
// Sample data for the /admin staff panel — now superseded by real data.
//
// Phase 3 wired the admin pages up to Supabase-backed /api/admin/* routes
// (see src/lib/admin-format.ts, src/app/api/admin/**) instead of the
// sample `customers` array and `findCustomer`/`searchCustomers` helpers
// below, so nothing in the real pages imports those anymore. This file is
// kept because the *types* (Customer, Vehicle, Note, FollowUp, HistoryItem,
// MotStatus) are still the shared shape the new API responses are built to
// match — StatusPill and several admin pages import MotStatus from here —
// and because the sample data itself is a harmless fixture to keep around
// (e.g. for local UI work without a database connection).
// ---------------------------------------------------------------------------

export type Staff = { id: string; name: string; initial: string };

export const staffMembers: Staff[] = [
  { id: "dave", name: "Dave", initial: "D" },
  { id: "sue", name: "Sue", initial: "S" },
  { id: "mo", name: "Mo", initial: "M" },
];

export type MotStatus = "ok" | "due-soon" | "overdue";

export type Vehicle = {
  id: string;
  plate: string;
  make: string;
  model: string;
  year: number;
  colour: string;
  motDueLabel: string;
  motStatus: MotStatus;
  serviceLabel: string;
};

export type Note = {
  id: string;
  author: string;
  timestamp: string;
  text: string;
  tag?: string;
};

export type FollowUp = {
  id: string;
  title: string;
  dueLabel: string;
  urgency: "overdue" | "due-soon" | "later";
  assignedTo: string;
  done: boolean;
};

export type HistoryItem = {
  id: string;
  title: string;
  dateLabel: string;
  detail: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  vehicles: Vehicle[];
  notes: Note[];
  followUps: FollowUp[];
  history: HistoryItem[];
};

export const customers: Customer[] = [
  {
    id: "janet-wilkinson",
    name: "Janet Wilkinson",
    phone: "07700 900123",
    vehicles: [
      {
        id: "ab12cde",
        plate: "AB12 CDE",
        make: "Ford",
        model: "Fiesta",
        year: 2019,
        colour: "Blue",
        motDueLabel: "MOT due in 12 days (19 Aug)",
        motStatus: "due-soon",
        serviceLabel: "Service: OK until Jan 2027",
      },
      {
        id: "yt19xlm",
        plate: "YT19 XLM",
        make: "Vauxhall",
        model: "Corsa",
        year: 2019,
        colour: "Red",
        motDueLabel: "MOT: OK until 2 Mar 2027",
        motStatus: "ok",
        serviceLabel: "Service: OK until Jun 2027",
      },
    ],
    notes: [
      {
        id: "n1",
        author: "Sue",
        timestamp: "Today, 9:14am",
        text: "Called Janet to remind her MOT is due in 2 weeks. She'd like to book Saturday morning if possible.",
        tag: "Called",
      },
      {
        id: "n2",
        author: "Dave",
        timestamp: "3 Feb 2026",
        text: "Replaced front pads and discs. Advised rear tyres will need doing within 3 months — flagged for follow-up.",
      },
    ],
    followUps: [
      { id: "f1", title: "Call about rear tyres", dueLabel: "Due today", urgency: "overdue", assignedTo: "Dave", done: false },
      { id: "f2", title: "MOT reminder — 3 days before", dueLabel: "Due 16 Aug", urgency: "due-soon", assignedTo: "Auto-reminder", done: false },
    ],
    history: [
      { id: "h1", title: "Full Service", dateLabel: "3 Feb 2026", detail: "£189 · Complete" },
      { id: "h2", title: "MOT Test", dateLabel: "19 Aug 2025", detail: "Pass" },
    ],
  },
  {
    id: "peter-hargreaves",
    name: "Peter Hargreaves",
    phone: "07811 223344",
    vehicles: [
      {
        id: "ky20vwn",
        plate: "KY20 VWN",
        make: "Volkswagen",
        model: "Golf",
        year: 2020,
        colour: "Grey",
        motDueLabel: "MOT: OK until 4 Oct 2026",
        motStatus: "ok",
        serviceLabel: "Service: OK until Nov 2026",
      },
    ],
    notes: [],
    followUps: [],
    history: [{ id: "h3", title: "MOT Test", dateLabel: "4 Oct 2025", detail: "Pass" }],
  },
  {
    id: "amara-okafor",
    name: "Amara Okafor",
    phone: "07922 556677",
    vehicles: [
      {
        id: "ll69fpz",
        plate: "LL69 FPZ",
        make: "Toyota",
        model: "Yaris",
        year: 2021,
        colour: "White",
        motDueLabel: "MOT overdue since 5 Aug",
        motStatus: "overdue",
        serviceLabel: "Service: due now",
      },
    ],
    notes: [
      { id: "n3", author: "Mo", timestamp: "Yesterday", text: "Left voicemail about overdue MOT, no callback yet." },
    ],
    followUps: [
      { id: "f3", title: "Second call — MOT overdue", dueLabel: "Overdue by 2 days", urgency: "overdue", assignedTo: "Mo", done: false },
    ],
    history: [],
  },
];

export function findCustomer(id: string): Customer | undefined {
  return customers.find((c) => c.id === id);
}

// The single universal search box (admin-panel-plan.md §3) recognises a UK
// plate, a phone number, or a name without the user having to say which.
export function searchCustomers(query: string): Customer[] {
  const q = query.trim().toLowerCase();
  if (!q) return customers;
  const compact = q.replace(/\s+/g, "");
  return customers.filter((c) => {
    const nameMatch = c.name.toLowerCase().includes(q);
    const phoneMatch = c.phone.replace(/\s+/g, "").includes(compact);
    const plateMatch = c.vehicles.some((v) =>
      v.plate.replace(/\s+/g, "").toLowerCase().includes(compact)
    );
    return nameMatch || phoneMatch || plateMatch;
  });
}
