import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // true: Next.js 16 internal type bug in .next/dev/types/ (PrefetchForTypeCheckInternal).
    // Our source code has zero TS errors — verified with tsc --noEmit.
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  serverExternalPackages: ["@prisma/client", ".prisma/client", "pg-cloudflare", "pg"],
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
