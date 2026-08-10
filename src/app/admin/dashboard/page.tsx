"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  CalendarDays,
  AlarmClock,
  Car,
  UserPlus,
  ClipboardList,
  LogOut,
} from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminPreviewBanner from "@/components/admin/AdminPreviewBanner";
import { logoutAdminSession } from "@/lib/admin-session";

type DashboardStats = {
  configured: boolean;
  todaysBookings: number | null;
  followUpsDue: number | null;
  motDueSoon: number | null;
};

function countLabel(n: number | null | undefined): string {
  if (n === null || n === undefined) return "—";
  return String(n);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/dashboard/stats", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: DashboardStats) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) {
          setStats({ configured: false, todaysBookings: null, followUpsDue: null, motDueSoon: null });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const followUpsDue = stats?.followUpsDue ?? null;
  const followUpsUrgent = Boolean(followUpsDue && followUpsDue > 0);

  return (
    <AdminGuard>
      {(session) => (
        <>
          <div className="bg-navy-900 text-white">
            <div className="mx-auto max-w-3xl px-5 py-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-amber-500 text-navy-900 flex items-center justify-center font-bold text-lg shrink-0">
                  {session.staffName[0]}
                </div>
                <div>
                  <div className="text-sm text-navy-300">Good to see you</div>
                  <div className="text-xl font-bold">{session.staffName}</div>
                </div>
              </div>
              <button
                onClick={async () => {
                  await logoutAdminSession();
                  router.push("/admin");
                }}
                className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 px-4 py-2.5 rounded-xl font-semibold"
              >
                <LogOut className="h-5 w-5" aria-hidden="true" />
                Log out
              </button>
            </div>
          </div>
          <AdminPreviewBanner configured={stats?.configured} />

          <div className="mx-auto max-w-3xl px-5 py-6">
            <Link
              href="/admin/search"
              className="w-full flex items-center gap-3 bg-white rounded-2xl shadow-md px-5 py-5 mb-6 border-2 border-slate-200 hover:border-amber-400 transition"
            >
              <Search className="h-7 w-7 text-slate-500 shrink-0" aria-hidden="true" />
              <span className="text-lg text-slate-500">
                Find a customer by name, phone number or number plate&hellip;
              </span>
            </Link>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Link
                href="/admin/search"
                className="bg-white rounded-2xl shadow p-5 flex flex-col items-center gap-2 border-b-4 border-b-amber-500 hover:shadow-lg transition text-center"
              >
                <Search className="h-9 w-9 text-navy-900" aria-hidden="true" />
                <span className="font-bold text-navy-900 text-lg">Find a Customer</span>
              </Link>

              <Link
                href="/admin/bookings?scope=today"
                className="bg-white rounded-2xl shadow p-5 flex flex-col items-center gap-2 border-b-4 border-b-blue-500 hover:shadow-lg transition text-center"
              >
                <CalendarDays className="h-9 w-9 text-navy-900" aria-hidden="true" />
                <span className="font-bold text-navy-900 text-lg">Today&apos;s Bookings</span>
                <span className="text-sm font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                  {stats ? countLabel(stats.todaysBookings) : "…"}
                </span>
              </Link>

              <Link
                href="/admin/follow-ups"
                className="bg-white rounded-2xl shadow p-5 flex flex-col items-center gap-2 border-b-4 border-b-red-500 hover:shadow-lg transition text-center"
              >
                <AlarmClock className="h-9 w-9 text-navy-900" aria-hidden="true" />
                <span className="font-bold text-navy-900 text-lg">Follow-ups Due</span>
                <span
                  className={`text-sm font-bold px-3 py-1 rounded-full ${
                    followUpsUrgent ? "bg-red-500 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {stats ? countLabel(stats.followUpsDue) : "…"}
                </span>
              </Link>

              <Link
                href="/admin/mot-due-soon"
                className="bg-white rounded-2xl shadow p-5 flex flex-col items-center gap-2 border-b-4 border-b-amber-400 hover:shadow-lg transition text-center"
              >
                <Car className="h-9 w-9 text-navy-900" aria-hidden="true" />
                <span className="font-bold text-navy-900 text-lg">MOT Due Soon</span>
                <span className="text-sm font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                  {stats ? countLabel(stats.motDueSoon) : "…"}
                </span>
              </Link>

              <Link
                href="/admin/customers/new"
                className="bg-white rounded-2xl shadow p-5 flex flex-col items-center gap-2 border-b-4 border-b-green-500 hover:shadow-lg transition text-center"
              >
                <UserPlus className="h-9 w-9 text-navy-900" aria-hidden="true" />
                <span className="font-bold text-navy-900 text-lg">Add New Customer</span>
              </Link>

              <Link
                href="/admin/bookings"
                className="bg-white rounded-2xl shadow p-5 flex flex-col items-center gap-2 border-b-4 border-b-slate-400 hover:shadow-lg transition text-center"
              >
                <ClipboardList className="h-9 w-9 text-navy-900" aria-hidden="true" />
                <span className="font-bold text-navy-900 text-lg">All Jobs</span>
              </Link>
            </div>

            <p className="text-center text-slate-400 text-sm mt-6">
              Only the manager sees Settings &amp; Reports — kept off this screen to avoid clutter.
            </p>
          </div>
        </>
      )}
    </AdminGuard>
  );
}
