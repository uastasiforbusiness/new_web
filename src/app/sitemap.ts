import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * App Router metadata sitemap.
 * Currently a single-page site, so we expose the home URL only.
 * When individual fleet pages are added later, append them here
 * (e.g. generated from the `cars` array).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
