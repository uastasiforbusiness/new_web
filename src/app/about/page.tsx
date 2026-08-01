import { Shield, Heart, MapPin, Award, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMeta, breadcrumbSchema } from "@/lib/seo";

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

const values: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Shield,
    title: "Excellence",
    description:
      "Every vehicle is meticulously maintained, every itinerary carefully planned. We accept nothing less than perfection.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "Born from a love for Italian automotive heritage and the breathtaking landscapes of Puglia. We share what moves us.",
  },
  {
    icon: MapPin,
    title: "Local Mastery",
    description:
      "Deep roots in Salento mean we know the hidden coves, the scenic roads, and the best vineyards that tourists never find.",
  },
  {
    icon: Award,
    title: "Discretion",
    description:
      "White-glove service from booking to drop-off. Your privacy and comfort are our highest priority.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* Hero */}
      <div className="mx-auto max-w-[1600px] px-5 pb-4 pt-32 md:px-10 md:pt-40">
        <Reveal>
          <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            <span className="h-px w-12 bg-gold/70" /> Est. 2023 · Salento, Puglia
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
            The B LEADER <em className="gold-text pr-2">story.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-8 max-w-2xl text-[15px] leading-8 text-sand">
            Founded in the heart of Salento, Puglia, B LEADER was born from a
            vision to offer the world&apos;s most discerning travelers access
            to Italy&apos;s finest automotive and nautical experiences.
          </p>
        </Reveal>
      </div>

      {/* Values */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} y={40} delay={i * 0.06}>
              <div className="group flex h-full flex-col bg-ink p-8 transition-colors duration-500 hover:bg-carbon/70 md:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                  <v.icon size={17} strokeWidth={1.5} />
                </span>
                <h2 className="mt-7 font-serif text-3xl font-light text-ivory md:text-4xl">
                  {v.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-mute">{v.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
