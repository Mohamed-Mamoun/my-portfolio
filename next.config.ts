import type { NextConfig } from "next";

/**
 * Velite deliberately does NOT run from here. Next 16 loads the config
 * synchronously and rejects top-level await, and hooking a content
 * pipeline into the bundler is exactly what killed Contentlayer.
 * It runs as its own process from the npm scripts instead.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
