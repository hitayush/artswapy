import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { hero } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL('/', site.url).toString(),
      images: [new URL(hero.portrait.src, site.url).toString()]
    }
  ];
}
