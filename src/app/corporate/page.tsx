import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceBands from '@/components/ServiceBands';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import SectionReveal from '@/components/SectionReveal';
import { buildPageMeta } from '@/lib/seo';

export const metadata = buildPageMeta({
  title: 'Corporate & Business — Executive Chauffeur Fleet in Puglia',
  description:
    'Board-grade logistics for retreats, launches and visiting delegations across Puglia: bilingual chauffeurs, NDA-grade discretion, VAT invoicing, fleet coordination up to 40 guests.',
  path: '/corporate',
});

export default function CorporatePage() {
  return (
    <>
      <div className="mx-auto max-w-[1600px] px-5 pb-4 pt-32 md:px-10 md:pt-40">
        <Reveal>
          <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            <span className="h-px w-12 bg-gold/70" /> Corporate &amp; business
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
            The boardroom, <em className="text-gold-light">on the road.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl text-[15px] leading-8 text-sand">
            Retreats, launches, delegations — handled with the discretion a board
            expects and the punctuality a schedule demands. VAT invoicing included.
          </p>
        </Reveal>
      </div>
      <SectionReveal accentLine>
        <ServiceBands audience="corporate" />
      </SectionReveal>

      {/* Leisure cross-link */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-6 px-5 py-12 md:px-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-gold">
              Weddings &amp; celebrations
            </p>
            <p className="mt-2 max-w-md font-serif text-2xl font-light leading-snug text-ivory">
              Planning something personal? The leisure side lives on its own page.
            </p>
          </div>
          <Link
            href="/services"
            className="group flex items-center gap-3 border border-gold/50 px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
          >
            Weddings &amp; Events
            <ArrowRight size={14} className="text-gold transition-transform duration-500 group-hover:translate-x-2" />
          </Link>
        </div>
      </div>

      <SectionReveal>
        <CTASection />
      </SectionReveal>
    </>
  );
}