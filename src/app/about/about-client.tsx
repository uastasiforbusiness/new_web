import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";

/* ── Values — the three pillars of B LEADER ──────────────────────────── */
const values: { numeral: string; title: string; description: string }[] = [
  {
    numeral: "01",
    title: "Passion",
    description:
      "We grew up on these roads and seas — and we share them because they moved us first.",
  },
  {
    numeral: "02",
    title: "Exclusive Knowledge",
    description:
      "Years of running Salento's coast mean we know which coves are swimmable at 11 AM in August — and which clifftop roads deserve the roof down.",
  },
  {
    numeral: "03",
    title: "Discretion",
    description:
      "Your privacy and comfort are not negotiable. No shared charters, no data sold, no surprises.",
  },
];

export default function AboutClient() {
  return (
    <>
      {/* ── Page intro ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <Reveal>
          <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            <span className="h-px w-12 bg-gold/70" /> About — Salento · Puglia
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
            The story of
            <br />
            <em className="gold-text pr-2">B LEADER.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-10 max-w-3xl text-xl font-light leading-10 text-sand md:text-2xl md:leading-[1.7]">
            Born in the heart of Salento, in Puglia, B LEADER opens the
            Ionian and Adriatic coasts of Salento — shoreline few travelers
            ever see without the crowds — through automotive and nautical
            experiences built on craft, place, and privacy.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mt-6 max-w-3xl text-[15px] leading-8 text-mute">
Born in Salento and based in Porto Gaio, we run the coast with
              Italian Master–licensed skippers and chauffeurs who have driven these
              roads for years. Every itinerary is tested by us before you arrive —
              the same coves, the same light we would choose for our own family.
          </p>
        </Reveal>
      </div>

      {/* ── Values ───────────────────────────────────────────────────── */}
      <SectionReveal accentLine>
        <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
              <span className="h-px w-12 bg-gold/70" /> What we stand for
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-serif text-4xl font-light leading-[1.05] text-ivory md:text-6xl">
              Our <em className="gold-text">Values</em>
            </h2>
          </Reveal>

          <div className="mt-16 md:mt-24">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                y={40}
                delay={i * 0.08}
                className={i > 0 ? "border-t border-line" : ""}
              >
                <article className="grid items-center gap-8 py-12 md:grid-cols-12 md:gap-16 md:py-16">
                  <div className="flex items-start gap-6 md:col-span-5">
                    <span className="text-outline-gold select-none pt-3 font-display text-5xl font-bold leading-none md:text-[5rem]">
                      {v.numeral}
                    </span>
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="font-serif text-3xl font-light leading-tight text-ivory md:text-5xl">
                      {v.title}
                    </h3>
                    <p className="mt-5 max-w-lg text-[15px] leading-8 text-sand">
                      {v.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionReveal>

      <CTASection />
    </>
  );
}