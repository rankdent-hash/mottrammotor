import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // This app lives in a subdirectory of a repo that has its own lockfile at
    // the top level, so Turbopack's automatic root detection picks the parent
    // directory and then tries to compile the parent app's files. Pin the root
    // to this directory. Harmless — and still correct — once the folder is
    // pushed to its own repository as the project root.
    root: path.dirname(new URL(import.meta.url).pathname),
  },
};

export default nextConfig;
