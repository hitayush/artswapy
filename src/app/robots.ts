import type { MetadataRoute } from 'next';
import { canonicalUrl, SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/'
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended'
        ],
        allow: '/'
      }
    ],
    host: new URL(SITE_URL).host,
    sitemap: canonicalUrl('/sitemap.xml')
  };
}
