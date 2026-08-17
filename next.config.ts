import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // false: código no tiene errores de TS. Confirmado con build CI.
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Wave 1: 140 añadido — era el ancho del logo del footer en next/Image y causaba 400.
    imageSizes: [16, 32, 48, 64, 96, 128, 140, 256, 384],
    qualities: [25, 50, 75, 100],  // Next.js 16 requiere allowlist explícita
  },
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
