// ---------------------------------------------------------------------------
// Server-only Supabase client factory.
//
// This file must never be imported from a "use client" component — it reads
// SUPABASE_SERVICE_ROLE_KEY, which bypasses Row Level Security entirely and
// must never reach the browser. It's only safe to use from API routes and
// other server-side code (route.ts files, server components).
//
// No real Supabase project exists yet, so both env vars below are unset in
// every environment right now. That's expected: isSupabaseConfigured()
// returns false and getSupabaseAdmin() returns null rather than throwing,
// so every caller degrades to its no-database fallback instead of crashing.
// Once a Supabase project exists, set SUPABASE_URL and
// SUPABASE_SERVICE_ROLE_KEY in Vercel (Project Settings → Environment
// Variables) and this whole file — and everything that depends on it —
// switches on automatically, no code changes required.
// ---------------------------------------------------------------------------

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;
let cachedForUrl: string | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Returns a server-side Supabase client using the service role key, or
 * `null` if SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY aren't set. Never
 * throws — callers should treat `null` as "database not configured yet"
 * and fall back to their existing no-op/demo behaviour.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  // Reuse a single client across calls within the same server process
  // (Vercel functions can be warm-reused), rebuilding only if the URL
  // somehow changes between calls.
  if (cachedClient && cachedForUrl === url) {
    return cachedClient;
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  cachedForUrl = url;

  return cachedClient;
}
