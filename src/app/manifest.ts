import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * PWA web manifest. Served at /manifest.webmanifest thanks to the
 * App Router metadata convention.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.tagline,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    categories: ["travel", "shopping", "business"],
    lang: SITE.lang,
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
