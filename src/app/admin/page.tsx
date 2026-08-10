"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { Delete, Loader2, Eye, EyeOff } from "lucide-react";
import { setCachedAdminSession } from "@/lib/admin-session";

type StaffOption = { id: string; name: string; initial: string };

// The real seeded PIN is 6 digits — this only controls how many dots the
// keypad shows. It isn't itself a secret and nothing here checks the PIN
// against it: verification happens server-side via the verify_staff_pin()
// Postgres function, called from POST /api/admin/login (see
// src/lib/admin-auth.ts) — this page only ever sees "correct" or "wrong".
const PIN_LENGTH = 6;

export default function AdminLoginPage() {
  const router = useRouter();
  const [staff, setStaff] = useState<StaffOption[]>([]);
  const [staffLoading, setStaffLoading] = useState(true);
  const [selected, setSelected] = useState<StaffOption | null>(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/staff")
      .then((res) => res.json())
      .then((data: { staff?: StaffOption[] }) => {
        if (!cancelled) setStaff(data.staff ?? []);
      })
      .catch(() => {
        if (!cancelled) setStaff([]);
      })
      .finally(() => {
        if (!cancelled) setStaffLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-focus the typed-PIN input whenever the PIN screen appears, and
  // again after a failed attempt clears the PIN (checking flips back to
  // false) so staff can immediately retype without clicking into the box.
  useEffect(() => {
    if (selected && !checking) {
      inputRef.current?.focus();
    }
  }, [selected, checking]);

  function pickStaff(s: StaffOption) {
    setSelected(s);
    setPin("");
    setError(null);
  }

  function backToPicker() {
    setSelected(null);
    setPin("");
    setError(null);
  }

  // Shared by both input methods — the on-screen keypad and the typed
  // <input> below funnel every change through updatePin so they can never
  // drift out of sync, then both trigger the same submitPin once
  // PIN_LENGTH is reached.
  async function submitPin(candidate: string) {
    if (!selected) return;
    setChecking(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staffId: selected.id, pin: candidate }),
      });
      const data = await res.json();

      if (res.ok) {
        setCachedAdminSession({
          staffId: data.staffId,
          staffName: data.staffName,
          role: data.role,
        });
        router.push("/admin/dashboard");
        return;
      }

      setPin("");
      setError(data.error ?? "Wrong PIN — try again");
    } catch {
      setPin("");
      setError("Couldn't reach the server — check your connection and try again.");
    } finally {
      setChecking(false);
    }
  }

  function updatePin(next: string) {
    if (!selected || checking) return;
    // Strip anything non-numeric and cap the length — the keypad only ever
    // passes digits, but typed/pasted input might include stray characters.
    const cleaned = next.replace(/\D/g, "").slice(0, PIN_LENGTH);
    setPin(cleaned);
    setError(null);
    if (cleaned.length === PIN_LENGTH) {
      void submitPin(cleaned);
    }
  }

  function pressDigit(digit: string) {
    if (!selected || pin.length >= PIN_LENGTH || checking) return;
    updatePin(pin + digit);
  }

  function pressDelete() {
    if (checking) return;
    updatePin(pin.slice(0, -1));
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    updatePin(e.target.value);
  }

  function handleInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (pin.length === PIN_LENGTH && !checking) {
      void submitPin(pin);
    }
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl px-6 py-4 shadow-xl">
            <span className="text-2xl font-extrabold text-navy-900">
              Mottram Motor Garage
            </span>
          </div>
        </div>

        {!selected ? (
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <h1 className="text-2xl font-bold text-center text-navy-900 mb-1">
              Who&apos;s working today?
            </h1>
            <p className="text-center text-slate-500 mb-6 text-base">
              Tap your name to sign in
            </p>

            {staffLoading ? (
              <p className="text-center text-slate-400 py-6 flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Loading staff…
              </p>
            ) : staff.length === 0 ? (
              <p className="text-center text-slate-400 py-6 text-base">
                No staff accounts found — check the database connection.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {staff.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => pickStaff(s)}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 hover:bg-amber-100 border-2 border-slate-200 hover:border-amber-400 transition"
                  >
                    <div className="w-16 h-16 rounded-full bg-navy-900 text-white flex items-center justify-center text-2xl font-bold">
                      {s.initial}
                    </div>
                    <span className="font-semibold text-lg text-navy-900">{s.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <button
              onClick={backToPicker}
              className="text-slate-500 font-medium mb-2"
            >
              &larr; Back
            </button>
            <div className="flex flex-col items-center mb-5">
              <div className="w-16 h-16 rounded-full bg-navy-900 text-white flex items-center justify-center text-2xl font-bold mb-2">
                {selected.initial}
              </div>
              <h2 className="text-xl font-bold text-navy-900">
                Hi {selected.name}, enter your PIN
              </h2>
              {checking && (
                <p className="text-slate-400 font-medium mt-1 flex items-center gap-1.5">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Checking…
                </p>
              )}
              {error && !checking && (
                <p className="text-red-500 font-semibold mt-1 text-center">{error}</p>
              )}
            </div>
            <div className="mb-6">
              <div className="relative max-w-xs mx-auto">
                <input
                  ref={inputRef}
                  type={showPin ? "text" : "password"}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  maxLength={PIN_LENGTH}
                  value={pin}
                  disabled={checking}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  aria-label="PIN"
                  placeholder={"•".repeat(PIN_LENGTH)}
                  className="w-full text-center text-3xl tracking-[0.5em] font-bold text-navy-900 bg-slate-50 border-2 border-slate-200 focus:border-amber-400 focus:outline-none rounded-2xl py-3 pl-4 pr-12 transition disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPin((v) => !v)}
                  disabled={checking}
                  aria-label={showPin ? "Hide PIN" : "Show PIN"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy-900 transition disabled:opacity-50"
                >
                  {showPin ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              <div className="flex justify-center gap-2.5 mt-3">
                {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full border-2 border-navy-900 ${
                      i < pin.length ? "bg-navy-900" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
                <button
                  key={d}
                  onClick={() => pressDigit(d)}
                  disabled={checking}
                  className="bg-slate-100 hover:bg-navy-900 hover:text-white text-2xl font-bold text-navy-900 rounded-2xl py-4 transition disabled:opacity-50"
                >
                  {d}
                </button>
              ))}
              <div />
              <button
                onClick={() => pressDigit("0")}
                disabled={checking}
                className="bg-slate-100 hover:bg-navy-900 hover:text-white text-2xl font-bold text-navy-900 rounded-2xl py-4 transition disabled:opacity-50"
              >
                0
              </button>
              <button
                onClick={pressDelete}
                disabled={checking}
                aria-label="Delete"
                className="bg-slate-100 hover:bg-red-100 text-red-500 rounded-2xl py-4 flex items-center justify-center transition disabled:opacity-50"
              >
                <Delete className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <p className="text-center text-slate-400 text-sm mt-5">
              Forgot your PIN? Ask the manager to reset it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
