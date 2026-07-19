import { buildPageMeta, SITE } from '@/lib/seo';
import { HomeClient } from './_components/home-client';

export const metadata = buildPageMeta({
  title: SITE.defaultTitle,
  description: SITE.defaultDescription,
  path: '/',
});

export default function Home() {
  return <HomeClient />;
}
