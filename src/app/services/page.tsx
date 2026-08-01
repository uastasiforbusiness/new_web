import ServiceBands from '@/components/ServiceBands';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import { buildPageMeta } from '@/lib/seo';

export const metadata = buildPageMeta({
  title: 'Chauffeured Services — Weddings, Corporate & Events',
  description:
    'Uniformed chauffeurs and flawless logistics for weddings, corporate delegations and social events across Salento.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <div className="mx-auto max-w-[1600px] px-5 pb-4 pt-32 md:px-10 md:pt-40">
        <Reveal>
          <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            <span className="h-px w-12 bg-gold/70" /> Chauffeured services
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
            Weddings, boardrooms, <em className="text-gold-light">everything sequinned.</em>
          </h1>
        </Reveal>
      </div>
      <ServiceBands />
      <CTASection />
    </>
  );
}
