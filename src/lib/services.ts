// ---------------------------------------------------------------------------
// The canonical list of services this garage offers, as shown to customers
// on the booking/contact forms and used by the admin panel's Services tab
// to group jobs and leads by type.
//
// Single source of truth: everywhere else that needs "what services do we
// offer" (BookingForm, ContactForm, the leads table's service_interest
// column, /admin/services) imports this rather than keeping its own copy,
// so adding, renaming or reordering a service only ever needs to happen
// here. Previously BookingForm.tsx kept its own local copy of this list —
// consolidated 10 Aug so the admin Services tab can report against the
// exact same categories customers actually pick from, not a second list
// that could quietly drift out of sync with it.
// ---------------------------------------------------------------------------

export const SERVICES = [
  "MOT Testing",
  "Full Service",
  "Interim Service",
  "Repair / Diagnostics",
  "Tyres",
  "Air Conditioning",
  "Other / Not sure",
] as const;

export type ServiceName = (typeof SERVICES)[number];
