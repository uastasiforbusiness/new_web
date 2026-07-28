import { type NavLink } from "@/components/velox/data";

export function getNavHref(link: NavLink, isHome: boolean): string {
  if (!link.href) return link.pageHref!;
  if (isHome) return link.href;
  return link.pageHref ?? `/${link.href}`;
}
