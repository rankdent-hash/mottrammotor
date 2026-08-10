"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchAdminSession,
  getCachedAdminSession,
  type AdminSession,
} from "@/lib/admin-session";

// Real server-side gate: src/proxy.ts already blocks the page request
// itself if the signed session cookie is missing/invalid/expired, so by
// the time this component runs in the browser the navigation was already
// allowed through. This component's job is just to find out *who* is
// signed in (the cookie is httpOnly — unreadable from here, see
// src/lib/admin-session.ts) and to catch the case where the session
// expires *while* the tab stays open, since proxy only runs on
// navigation/requests, not continuously in the background.
export default function AdminGuard({
  children,
}: {
  children: (session: AdminSession) => React.ReactNode;
}) {
  const router = useRouter();
  const [session, setSession] = useState<AdminSession | null>(() => getCachedAdminSession());

  useEffect(() => {
    let cancelled = false;
    fetchAdminSession().then((s) => {
      if (cancelled) return;
      if (!s) {
        router.replace("/admin");
      } else {
        setSession(s);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-400 text-lg">
        Loading…
      </div>
    );
  }

  return <>{children(session)}</>;
}
