import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * Dynamic robots.txt — sirve instructores para crawlers y AI bots.
 * Define qué rastrear, qué ignorar, y dónde está el sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ─── Googlebot ─────────────────────────────────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      // ─── Bingbot ───────────────────────────────────────────────────────
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      // ─── AI / LLM Crawlers — bloquear todos ────────────────────────────
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "PerplexityBot",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      // ─── Default — allow crawl, block API ──────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
