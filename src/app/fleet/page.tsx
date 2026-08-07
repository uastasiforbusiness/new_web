import FleetShowcase from "@/components/FleetShowcase";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import SectionReveal from "@/components/SectionReveal";
import { buildPageMeta } from "@/lib/seo";

export const metadata = buildPageMeta({
  title: "The Fleet — Ferrari, Maserati & Mercedes",
  description: "Ferrari California T, Ferrari California, Maserati Ghibli and Mercedes E 220d Cabrio — supercar hire in Salento.",
  path: "/fleet",
});

export default function FleetPage() {
  return (
    <>
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <Reveal>
          <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            <span className="h-px w-12 bg-gold/70" /> The fleet
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
            Machines with <em className="gold-text pr-2">an accent.</em>
          </h1>
        </Reveal>
      </div>

      {/* Full-bleed giant wordmark band — one per page, editorial signature */}
      <div aria-hidden className="select-none overflow-hidden border-t border-line py-12 md:py-20">
        <div className="text-outline -mt-[0.08em] px-0 font-display text-[24vw] font-bold leading-[0.85] tracking-tight text-ivory">
          FLEET
        </div>
      </div>

      <SectionReveal>
        <FleetShowcase />
      </SectionReveal>

      <SectionReveal>
        <CTASection mode="experiences" />
      </SectionReveal>
    </>
  );
}
