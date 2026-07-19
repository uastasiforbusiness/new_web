import Link from 'next/link';
import { UsTravelersSection } from '@/components/velox/sections/us-travelers-section';

export type ExperienceFaq = { question: string; answer: string };

export type ExperienceLandingProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  lead: string;
  paragraphs: string[];
  highlights: { label: string; detail: string }[];
  faqs: ExperienceFaq[];
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  showUsBlock?: boolean;
};

/**
 * Shared luxury layout for SEO experience landings (server component).
 */
export function ExperienceLanding({
  eyebrow,
  title,
  titleAccent,
  lead,
  paragraphs,
  highlights,
  faqs,
  primaryCta = { href: '/#reserve', label: 'RESERVE EXPERIENCE' },
  secondaryCta,
  showUsBlock = true,
}: ExperienceLandingProps) {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <section className="relative py-16 sm:py-24 border-b border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-heading font-semibold tracking-[0.45em] text-[#c9a96e] mb-5">
            {eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-elegant font-light text-white tracking-wide mb-6 italic">
            {title}
            {titleAccent ? (
              <>
                <br />
                <span className="not-italic shimmer-text">{titleAccent}</span>
              </>
            ) : null}
          </h1>
          <p className="text-base sm:text-lg font-body font-light text-[#999] leading-relaxed max-w-2xl">
            {lead}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={primaryCta.href}
              className="inline-flex px-8 py-3 bg-[#c9a96e] hover:bg-[#d4af37] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.2em] transition-all duration-300"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex px-8 py-3 border border-[#c9a96e]/35 text-[#c9a96e] hover:border-[#c9a96e] text-[11px] font-heading font-semibold tracking-[0.2em] transition-all duration-300"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 48)} className="text-[#888] font-body font-light leading-relaxed text-base sm:text-lg">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16 border-y border-[#1a1a1a] bg-[#0c0c0c]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-5">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-xl border border-[#1f1f1f] p-6 hover:border-[#c9a96e]/20 transition-colors"
            >
              <p className="text-[10px] font-heading tracking-[0.3em] text-[#c9a96e] mb-2">{h.label}</p>
              <p className="text-[#bbb] font-body font-light leading-relaxed text-sm sm:text-base">{h.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-elegant text-white mb-8 tracking-wide">
            Questions travelers ask
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-[#1a1a1a] pb-6">
                <h3 className="text-lg font-elegant text-white mb-2">{faq.question}</h3>
                <p className="text-sm sm:text-base font-body text-[#888] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showUsBlock ? <UsTravelersSection compact /> : null}
    </main>
  );
}
