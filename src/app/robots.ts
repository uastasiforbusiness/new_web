import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * Dynamic robots.txt — Next.js lo sirve en /robots.txt
 * Define qué rastrear y dónde está el sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/", "/fleet", "/yacht", "/locations/salento", "/services", "/about", "/contact"],
        disallow: ["/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: ["/", "/fleet", "/yacht", "/locations/salento", "/services", "/about", "/contact"],
        disallow: ["/api/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
