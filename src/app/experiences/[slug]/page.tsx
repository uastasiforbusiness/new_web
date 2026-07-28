import { getExperienceBySlug } from '@/data/experiences';
import { notFound } from 'next/navigation';
import { ExperienceHero } from '@/components/velox/sections/experience-hero';
import { ExperienceTimeline } from '@/components/velox/sections/experience-timeline';
import { ExperienceIncludes } from '@/components/velox/sections/experience-includes';
import { ExperienceCTA } from '@/components/velox/sections/experience-cta';
import { ExperienceRelated } from '@/components/velox/sections/experience-related';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <ExperienceHero experience={experience} />
      <ExperienceTimeline experience={experience} />
      <ExperienceIncludes experience={experience} />
      <ExperienceCTA experience={experience} />
      <ExperienceRelated currentSlug={slug} />
    </main>
  );
}

// Generate static params for all experiences
export async function generateStaticParams() {
  const { experiences } = await import('@/data/experiences');
  return experiences.map((exp) => ({ slug: exp.slug }));
}