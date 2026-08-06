import { buildPageMeta, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import AboutClient from "./about-client";

export const metadata = buildPageMeta({
  title: "About B LEADER — Luxury Experience Curator in Salento, Puglia",
  description:
    "B LEADER is a luxury experience curator based in Salento, Puglia. Founded in 2023, we specialize in Ferrari driving tours, yacht charters, and premium concierge services for discerning travelers from around the world.",
  path: "/about",
  keywords: [
    "about B LEADER",
    "luxury experience curator Salento",
    "Puglia luxury travel",
    "B LEADER team",
    "Italian luxury experiences",
    "Salento Ferrari tours",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <AboutClient />
    </>
  );
}
