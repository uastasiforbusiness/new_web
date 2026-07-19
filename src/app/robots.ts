import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * Dynamic robots.txt — single source of truth (do not keep public/robots.txt).
 *
 * Strategy for US luxury discovery:
 * - Allow major search engines + social preview bots
 * - Allow AI answer engines used by US travelers (ChatGPT, Perplexity, Claude search)
 * - Block bulk training scrapers (CCBytes / CCBot)
 * - Never expose /api/*
 */
export default function robots(): MetadataRoute.Robots {
  const disallowApi = ["/api/"];

  return {
    rules: [
      // ─── Search engines ───────────────────────────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: disallowApi,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: disallowApi,
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: disallowApi,
      },

      // ─── Social preview crawlers (Open Graph / cards) ─────────────────
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },

      // ─── AI answer / discovery engines (US travel queries) ────────────
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: disallowApi,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: disallowApi,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: disallowApi,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: disallowApi,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: disallowApi,
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: disallowApi,
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: disallowApi,
      },
      // Gemini app grounding (not classic Google Search ranking)
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: disallowApi,
      },

      // ─── Bulk corpus scrapers — no SEO value ──────────────────────────
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },

      // ─── Default ──────────────────────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowApi,
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
