import { experiences, type Experience } from '@/data/experiences';
import Link from 'next/link';

interface Props {
  currentSlug?: string;
  experience?: Experience;
}

export function ExperienceRelated({ currentSlug }: Props) {
  const related = experiences.filter((e) => e.slug !== currentSlug);

  return (
    <section className="py-20 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20">
        <p
          className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase font-semibold mb-4 text-center"
          style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
        >
          Also Available
        </p>
        <h2
          className="text-2xl sm:text-3xl font-bold text-white mb-12 text-center"
          style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
        >
          More{' '}
          <span
            className="italic text-[#c9a96e]"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            B LEADER
          </span>{' '}
          Experiences
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {related.map((exp) => (
            <Link
              key={exp.slug}
              href={`/experiences/${exp.slug}`}
              className="group block p-6 rounded-lg border border-white/5 hover:border-[#c9a96e]/20 transition-all duration-500"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: exp.color }}
                />
                <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-heading font-semibold">
                  {exp.duration}
                </span>
              </div>
              <h3
                className="text-lg font-bold text-white group-hover:text-[#c9a96e] transition-colors duration-300 mb-2"
                style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
              >
                {exp.title}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed italic line-clamp-2">
                {exp.subtitle}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span
                  className="text-sm font-bold"
                  style={{ color: exp.color }}
                >
                  {exp.price}
                </span>
                <span className="text-[#c9a96e] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}