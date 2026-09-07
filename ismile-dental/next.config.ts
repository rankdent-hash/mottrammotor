import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old site is WordPress and every indexed URL carries a trailing slash
  // (`/our-story/`, `/dental-implants/`). Matching that exactly is the whole
  // point of retaining those URLs — see build-plan.md §2.
  trailingSlash: true,

  turbopack: {
    // This app currently lives in a subdirectory of a repo with its own
    // lockfile at the top level, so Turbopack's root detection picks the
    // parent and compiles the wrong app. Pin it. Still correct once this
    // folder becomes its own repository root.
    root: path.dirname(new URL(import.meta.url).pathname),
  },

  // The five merges from research.md §3. Everything else keeps its URL.
  //
  // NOTE ON STATUS CODES: build-plan.md §2 asks for 301s; Next emits 308 here
  // and ignores an explicit `statusCode: 301` under `trailingSlash: true`.
  // 308 is a permanent redirect that additionally preserves the request
  // method, and Google treats 301 and 308 identically for consolidating
  // ranking signals. Each indexed old URL reaches its destination in a single
  // hop, which is the thing that actually matters for the migration.
  async redirects() {
    return [
      { source: "/fillings/", destination: "/white-fillings/", permanent: true },
      { source: "/composite-restoration/", destination: "/white-fillings/", permanent: true },
      { source: "/extractions/", destination: "/oral-surgery/", permanent: true },
      { source: "/whitening/", destination: "/teeth-whitening-tunbridge-wells/", permanent: true },
      { source: "/orthodontic/", destination: "/invisalign/", permanent: true },
    ];
  },
};

export default nextConfig;
