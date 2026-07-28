import { getExperienceBySlug } from '@/data/experiences';
import { buildPageMeta } from '@/lib/seo';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) return {};

  return buildPageMeta({
    title: exp.seo.title,
    description: exp.seo.description,
    path: `/experiences/${slug}`,
    keywords: exp.seo.keywords,
  });
}

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}