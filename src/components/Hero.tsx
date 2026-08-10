import Link from "next/link";
import { ShieldCheck, Star, Clock3 } from "lucide-react";
import RegPlate from "./RegPlate";
import { business } from "@/lib/site-data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="container-page relative py-14 sm:py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-navy-800 px-3 py-1 text-xs font-semibold text-amber-400 mb-5">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Independent MOT &amp; Repair Centre
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            MOT Testing &amp; Car Repairs in Manchester,{" "}
            <span className="text-amber-400">done right the first time.</span>
          </h1>
          <p className="mt-5 text-navy-100 text-base sm:text-lg max-w-xl">
            MOTs, servicing, repairs and tyre fitting for all makes and
            models — honest pricing, qualified technicians, and no work done
            without your say-so.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-md bg-amber-500 px-6 py-3.5 font-semibold text-navy-950 hover:bg-amber-400 transition-colors"
            >
              Book Your MOT / Service
            </Link>
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center rounded-md border border-navy-600 px-6 py-3.5 font-semibold text-white hover:bg-navy-800 transition-colors"
            >
              Call {business.phone}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-navy-200">
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-400" aria-hidden="true" />
              Trusted local garage
            </span>
            <span className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-amber-400" aria-hidden="true" />
              Same-day MOT slots (subject to availability)
            </span>
          </div>
        </div>

        <div className="bg-white text-navy-900 rounded-xl shadow-xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold mb-1">Check your MOT / book online</h2>
          <p className="text-sm text-navy-600 mb-5">
            Enter your registration to get started — we&apos;ll pull your
            vehicle details automatically.
          </p>
          <form action="/book" className="space-y-4">
            <div>
              <label htmlFor="hero-reg" className="block text-xs font-semibold uppercase tracking-wide text-navy-500 mb-1.5">
                Registration number
              </label>
              <div className="flex items-stretch gap-2">
                <input
                  id="hero-reg"
                  name="reg"
                  type="text"
                  placeholder="AB12 CDE"
                  className="flex-1 rounded-md border border-navy-100 bg-navy-50 px-3.5 py-3 font-mono font-semibold tracking-wider uppercase text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-navy-900 py-3.5 font-semibold text-white hover:bg-navy-800 transition-colors"
            >
              Continue to booking
            </button>
          </form>
          <div className="mt-5 flex items-center gap-2 text-xs text-navy-500">
            <RegPlate className="text-[11px] py-0.5 px-2" />
            <span>Example plate shown for illustration.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
