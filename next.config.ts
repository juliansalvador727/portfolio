import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  async redirects() {
    // The about content now lives on the home page.
    return [{ source: "/about", destination: "/", permanent: false }];
  },
};

export default nextConfig;
