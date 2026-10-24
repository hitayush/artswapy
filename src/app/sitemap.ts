import type { MetadataRoute } from 'next';
import { hero, projects } from '@/content/site';
import { canonicalUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: canonicalUrl(`/work/${p.id}`),
    images: p.image ? [canonicalUrl(p.image)] : undefined,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85
  }));

  return [
    {
      url: canonicalUrl('/'),
      images: [
        canonicalUrl(hero.portrait.src),
        ...projects.filter((p) => Boolean(p.image)).map((p) => canonicalUrl(p.image!))
      ],
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    ...projectEntries
  ];
}
