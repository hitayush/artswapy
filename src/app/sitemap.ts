import type { MetadataRoute } from 'next';
import { site, hero, projects } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: new URL(`/work/${p.id}`, site.url).toString(),
    images: p.image ? [new URL(p.image, site.url).toString()] : undefined,
    lastModified: new Date()
  }));

  return [
    {
      url: new URL('/', site.url).toString(),
      images: [new URL(hero.portrait.src, site.url).toString()],
      lastModified: new Date()
    },
    ...projectEntries
  ];
}
