import ExperienceList from "@/components/ExperienceList";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import SectionReveal from "@/components/SectionReveal";
import { buildPageMeta } from "@/lib/seo";

export const metadata = buildPageMeta({
  title: "Experiences — Editorial Days in Salento",
  description: "Curated experiences by B LEADER: supercar tours, flybridge yacht charters and sunset rituals across land and sea.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <>
      <div className="mx-auto max-w-[1600px] px-5 pb-4 pt-32 md:px-10 md:pt-40">
        <Reveal>
          <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            <span className="h-px w-12 bg-gold/70" /> Curated days
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
            Experiences, <em className="text-gold-light">written like editorials.</em>
          </h1>
        </Reveal>
      </div>
      <SectionReveal accentLine>
        <ExperienceList />
      </SectionReveal>
      <SectionReveal>
        <CTASection />
      </SectionReveal>
    </>
  );
}
