import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Book Online",
  description:
    "Book your MOT, service, repair or tyre fitting online with Mottram Motor Garage, Manchester.",
};

export default async function BookPage(props: PageProps<"/book">) {
  const searchParams = await props.searchParams;
  const regParam = searchParams.reg;
  // The homepage Hero mini-form (action="/book", field name "reg") submits
  // as a plain GET, so this can arrive as a single string or (in theory,
  // if someone crafts a ?reg=a&reg=b URL) an array — only the string case
  // is a real registration, so anything else is treated as "not provided".
  const initialReg = typeof regParam === "string" ? regParam : "";

  return (
    <>
      <PageHeader
        eyebrow="Booking"
        title="Book Your Appointment"
        intro="Fill in the form below and we'll confirm your slot. Prefer to talk it through first? Call us instead."
      />

      <section className="container-page py-14 sm:py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 rounded-xl border border-navy-100 bg-white p-6 sm:p-8 shadow-sm">
          <BookingForm initialReg={initialReg} />
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl bg-navy-50 border border-navy-100 p-6 text-sm">
            <h3 className="font-semibold text-navy-900 mb-2">Prefer to call?</h3>
            <p className="text-navy-600 mb-3">
              Speak to us directly and we can often find you a same-day slot.
            </p>
            <a
              href={business.phoneHref}
              className="block w-full rounded-md bg-navy-900 py-3 text-center font-semibold text-white hover:bg-navy-800 transition-colors"
            >
              Call {business.phone}
            </a>
          </div>
          <div className="rounded-xl border border-navy-100 p-6 text-sm text-navy-600">
            <h3 className="font-semibold text-navy-900 mb-2">Opening hours</h3>
            {business.hours.map((h) => (
              <div key={h.day} className="flex justify-between py-1">
                <span>{h.day}</span>
                <span className="font-medium text-navy-800">{h.time}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}
