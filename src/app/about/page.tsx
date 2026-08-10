import { buildPageMeta, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import AboutClient from "./about-client";

export const metadata = buildPageMeta({
  title: "About B LEADER — The Story of Luxury in Salento, Puglia",
  description:
    "Born in the heart of Salento, Puglia. B LEADER curates private automotive and nautical experiences along the Ionian and Adriatic coasts — craft, place, and privacy, one itinerary at a time.",
  path: "/about",
  keywords: [
    "about B LEADER",
    "luxury experience curator Salento",
    "Puglia luxury travel",
    "B LEADER story",
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
