import Link from 'next/link';
import {
  Languages,
  CreditCard,
  ShieldCheck,
  MapPinned,
  Clock,
  Sparkles,
} from 'lucide-react';

const points = [
  {
    icon: Languages,
    title: 'English-first concierge',
    body: 'Briefings, contracts, and day-of support in clear English — built for guests flying in from the US and beyond.',
  },
  {
    icon: Sparkles,
    title: 'Experiences, not desk rental',
    body: 'Ferrari days and private yacht charters curated end to end — route, timing, and presentation at a private-client standard.',
  },
  {
    icon: CreditCard,
    title: 'International cards welcome',
    body: 'Pricing in EUR with transparent totals. Major international cards accepted; USD guidance on request before you book.',
  },
  {
    icon: ShieldCheck,
    title: 'Licenses & insurance clarity',
    body: 'We walk you through IDP/license rules, deposits, and coverage so there are no surprises at the wheel or on the dock.',
  },
  {
    icon: MapPinned,
    title: 'Routes worth the jet lag',
    body: 'Coastal Ferrari drives, cliff roads, and Ionian/Adriatic yacht lines curated for first-time Salento visitors.',
  },
  {
    icon: Clock,
    title: 'US-friendly response window',
    body: 'WhatsApp and email concierge with fast replies across time zones — plan from New York, arrive ready for the coast.',
  },
];

type Props = {
  compact?: boolean;
  id?: string;
};

/**
 * Trust block for US / international luxury travelers.
 * Server component — no client JS. No phone. No airport pickup claims.
 */
export function UsTravelersSection({ compact = false, id = 'for-us-travelers' }: Props) {
  return (
    <section
      id={id}
      className={`border-y border-[#c9a96e]/10 bg-[#0c0c0c] ${compact ? 'py-16 sm:py-20' : 'py-20 sm:py-28'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-[10px] font-heading font-semibold tracking-[0.45em] text-[#c9a96e] mb-4">
            FOR US &amp; INTERNATIONAL GUESTS
          </p>
          <h2 className="text-3xl sm:text-5xl font-elegant font-light text-white tracking-wide mb-5 italic">
            Designed for travelers
            <span className="not-italic shimmer-text"> who fly in</span>
          </h2>
          <p className="text-[#888] font-body font-light leading-relaxed text-base sm:text-lg">
            Salento is having a moment with American luxury travelers. B LEADER makes the experience
            effortless — so the memory is the coast, the engine note, and the sunset, not the paperwork.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {points.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-[#1f1f1f] bg-[#111]/60 p-6 hover:border-[#c9a96e]/25 transition-colors duration-300"
            >
              <Icon size={20} className="text-[#c9a96e] mb-4" />
              <h3 className="text-lg font-elegant text-white mb-2 tracking-wide">{title}</h3>
              <p className="text-sm font-body text-[#888] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/experiences/salento-from-usa"
            className="text-[11px] font-heading font-semibold tracking-[0.25em] text-[#c9a96e] hover:text-[#d4af37] transition-colors"
          >
            US TRAVEL GUIDE →
          </Link>
          <span className="hidden sm:inline text-[#333]">|</span>
          <Link
            href="/#reserve"
            className="inline-flex px-8 py-3 bg-[#c9a96e] hover:bg-[#d4af37] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.2em] transition-all duration-300"
          >
            REQUEST YOUR DATES
          </Link>
        </div>
      </div>
    </section>
  );
}
