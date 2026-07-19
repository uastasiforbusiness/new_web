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
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 75, 100],  // Next.js 16 requiere allowlist explícita
  },
  serverExternalPackages: ["@prisma/client", ".prisma/client", "@neondatabase/serverless", "@prisma/adapter-neon"],
  // ─── Agent discovery: RFC 8288 Link headers ───────────────────────────
  // Anuncia recursos legítimos (que existen) a agentes/crawlers vía Link.
  // Relaciones IANA registradas: sitemap, describedby, terms-of-service,
  // privacy-policy. No se anuncian APIs privadas (/api/*) ni assets.
  // Refs: RFC 8288, RFC 9727, IANA Link Relations.
  async headers() {
    const linkValue = [
      '</sitemap.xml>; rel="sitemap"; type="application/xml"',
      '</about>; rel="describedby"; type="text/html"',
      '</terms>; rel="terms-of-service"; type="text/html"',
      '</privacy>; rel="privacy-policy"; type="text/html"',
    ].join(', ');

    return [
      {
        // HTML routes only — excluye /_next/*, /api/*, y assets con extensión.
        source: '/((?!_next/static|_next/image|api|favicon\\.svg|images|robots\\.txt|sitemap\\.xml).*)',
        headers: [
          { key: 'Link', value: linkValue },
        ],
      },
    ];
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
