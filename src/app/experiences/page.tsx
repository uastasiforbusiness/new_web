import { ExperienceIndexHero } from '@/components/velox/sections/experience-index-hero';
import { experiences } from '@/data/experiences';
import Link from 'next/link';

export default function ExperiencesPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <ExperienceIndexHero />

      {/* Experiences grid */}
      <section className="py-20 -mt-20 relative z-10">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid gap-6">
            {experiences.map((exp) => (
              <Link
                key={exp.slug}
                href={`/experiences/${exp.slug}`}
                className="group block relative overflow-hidden rounded-lg border border-white/5 hover:border-[#c9a96e]/20 transition-all duration-500 bg-[#0e0e0e]"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${exp.color}08, transparent)`,
                  }}
                />
                <div className="relative p-8 sm:p-10">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: exp.color }}
                        />
                        <span className="text-[9px] tracking-[0.25em] uppercase text-gray-500 font-heading font-semibold">
                          {exp.tagline}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#c9a96e] transition-colors duration-300 mb-2 font-heading">
                        {exp.title}
                      </h2>
                      <p className="text-gray-400 text-base italic font-elegant">
                        {exp.subtitle}
                      </p>
                      <p className="text-gray-500 text-sm mt-3 max-w-lg leading-relaxed">
                        {exp.concept.length > 150
                          ? exp.concept.slice(0, 150) + '...'
                          : exp.concept}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                      <span className="text-xs text-gray-500">{exp.duration}</span>
                      <span
                        className="text-xl font-bold"
                        style={{ color: exp.color }}
                      >
                        {exp.price}
                      </span>
                      <span className="text-[#c9a96e] text-xs opacity-0 group-hover:opacity-100 transition-all duration-300">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}