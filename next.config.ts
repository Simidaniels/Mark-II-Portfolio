import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // Legacy concept-page URLs → rebuilt routes
    const map: Record<string, string> = {
      nova: "nova",
      sport: "sport",
      store: "store",
      fashion: "fashion",
      novaleap: "novaleap",
      novaspace: "novaspace",
    };
    return Object.entries(map).flatMap(([from, to]) => [
      { source: `/concepts/${from}/index.html`, destination: `/concepts/${to}`, permanent: true },
    ]);
  },
};

export default nextConfig;
