import Link from 'next/link';
import { experiences } from '@/data/experiences';

export function ExperienceCard({
  slug,
  title,
  subtitle,
  duration,
  price,
  color,
  tagline,
}: {
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  price: string;
  color: string;
  tagline: string;
}) {
  return (
    <Link
      href={`/experiences/${slug}`}
      className="group block relative overflow-hidden rounded-lg border border-white/5 hover:border-[#c9a96e]/20 transition-all duration-500 bg-[#0e0e0e]"
    >
      {/* Hover gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${color}08, transparent)`,
        }}
      />

      <div className="relative p-6 sm:p-8">
        {/* Tagline */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-[9px] tracking-[0.25em] uppercase text-gray-500 font-heading font-semibold">
            {tagline}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-2xl font-bold text-white group-hover:text-[#c9a96e] transition-colors duration-300 mb-2"
          style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
        >
          {title}
        </h3>
        <p
          className="text-gray-400 text-sm italic mb-4 line-clamp-2"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          {subtitle}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{duration}</span>
          <div className="flex items-center gap-2">
            <span
              className="font-bold text-sm"
              style={{ color }}
            >
              {price}
            </span>
            <span className="text-[#c9a96e] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-4px] group-hover:translate-x-0">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ExperiencesShowcase() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="text-center mb-16">
          <p
            className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase font-semibold mb-4"
            style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
          >
            Curated Experiences
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
          >
            Live{' '}
            <span
              className="italic text-[#c9a96e]"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              La Dolce Vita
            </span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Four ways to experience the magic of Salento — by land and by sea.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.slug}
              slug={exp.slug}
              title={exp.title}
              subtitle={exp.subtitle}
              duration={exp.duration}
              price={exp.price}
              color={exp.color}
              tagline={exp.tagline}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 text-[#c9a96e] text-xs tracking-[0.25em] uppercase font-semibold hover:text-[#d4af37] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
          >
            View All Experiences →
          </Link>
        </div>
      </div>
    </section>
  );
}