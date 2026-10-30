import type { Metadata } from 'next';
import { about, contact, process, projects, services, site } from '@/content/site';
import type { Project } from '@/types/content';
import { socialImageAlt, socialImageSize } from '@/lib/social-image';

export const SITE_URL = site.url.replace(/\/+$/, '');
export const SITE_NAME = site.name;
export const SITE_ALTERNATE_NAMES = [
  'Art Swapy',
  'www.artswapy.com',
  'artswapy.com',
  'ArtSwapy Studio',
  'ArtSwapy Brand Design'
];

export const DEFAULT_TITLE =
  'ArtSwapy — Brand Strategy, Identity & Packaging Design Studio';
export const TITLE_TEMPLATE = '%s | ArtSwapy';

export const DEFAULT_DESCRIPTION =
  'ArtSwapy (Art Swapy) is the independent brand design and consulting practice of Swapnil Gathibandhe—crafting complete brand systems across strategy, visual identity, packaging, communications, and digital applications.';

export const SITE_KEYWORDS = [
  'ArtSwapy',
  'Art Swapy',
  'artswapy.com',
  'Swapnil Gathibandhe',
  'brand design studio',
  'independent brand designer',
  'brand strategy and consulting',
  'visual identity design',
  'packaging design studio',
  'logo and brand identity system',
  'brand architecture',
  'creative director Nagpur India',
  'branding studio India',
  'luxury packaging design',
  'complete brand systems'
];

/**
 * Normalizes any relative or absolute path into a canonical absolute URL.
 * In accordance with next.config.ts (trailingSlash: true), page routes
 * maintain a canonical trailing slash, while static assets and image routes retain their file format.
 */
export function canonicalUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) {
    try {
      const parsed = new URL(path);
      if (parsed.hostname === 'artswapy.com' || parsed.hostname === 'www.artswapy.com') {
        const isSpecialFile = /^\/(?:opengraph-image|twitter-image)/i.test(parsed.pathname);
        const hasExtension = /\.[a-z0-9]+$/i.test(parsed.pathname);
        if (isSpecialFile || hasExtension) {
          return `${SITE_URL}${parsed.pathname}${parsed.search}${parsed.hash}`;
        }
        const cleanPath = parsed.pathname.replace(/\/+$/, '');
        return `${SITE_URL}${cleanPath}/${parsed.search}${parsed.hash}`;
      }
    } catch {
      return path;
    }
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const isSpecialFile = /^\/(?:opengraph-image|twitter-image)/i.test(normalized);
  const hasExtension = /\.[a-z0-9]+$/i.test(normalized);
  if (isSpecialFile || hasExtension) {
    return `${SITE_URL}${normalized}`;
  }
  if (normalized === '/') {
    return `${SITE_URL}/`;
  }
  const clean = normalized.replace(/\/+$/, '');
  return `${SITE_URL}${clean}/`;
}

export interface PageMetadataOptions {
  path: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  keywords?: string[];
}

export function buildPageMetadata({
  path,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = '/opengraph-image',
  imageAlt = socialImageAlt,
  type = 'website',
  keywords = SITE_KEYWORDS
}: PageMetadataOptions): Metadata {
  const url = canonicalUrl(path);
  const ogImageUrl = canonicalUrl(image);

  return {
    title,
    description,
    keywords,
    applicationName: SITE_NAME,
    authors: [{ name: about.name, url: SITE_URL }],
    creator: about.name,
    publisher: SITE_NAME,
    category: 'Brand Design & Strategy',
    alternates: {
      canonical: url
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type,
      images: [
        {
          url: ogImageUrl,
          width: socialImageSize.width,
          height: socialImageSize.height,
          alt: imageAlt
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: about.name,
      images: [ogImageUrl]
    }
  };
}

/**
 * Comprehensive Schema.org @graph for the Home page & global brand entity recognition.
 * Connects WebSite, ProfessionalService, Person (Swapnil Gathibandhe), OfferCatalog,
 * ItemList of case studies, and FAQPage.
 */
export function buildHomeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: SITE_ALTERNATE_NAMES,
        description: DEFAULT_DESCRIPTION,
        inLanguage: 'en',
        publisher: { '@id': `${SITE_URL}/#practice` }
      },
      {
        '@type': ['ProfessionalService', 'DesignAgency'],
        '@id': `${SITE_URL}/#practice`,
        name: SITE_NAME,
        alternateName: SITE_ALTERNATE_NAMES,
        url: SITE_URL,
        logo: canonicalUrl('/favicon.svg'),
        image: canonicalUrl(about.portrait.src),
        description: DEFAULT_DESCRIPTION,
        email: site.email.address,
        founder: { '@id': `${SITE_URL}/#founder` },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Nagpur',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN'
        },
        areaServed: 'Worldwide',
        knowsAbout: [
          'Brand Strategy',
          'Brand Positioning',
          'Visual Identity Systems',
          'Logo Design',
          'Packaging Design',
          'Brand Communications',
          'Digital & Physical Brand Applications'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Brand Design & Consulting Capabilities',
          itemListElement: services.items.map((svc, index) => ({
            '@type': 'Offer',
            position: index + 1,
            itemOffered: {
              '@type': 'Service',
              '@id': `${SITE_URL}/#service-${svc.id}`,
              name: `Brand ${svc.title}`,
              description: `${svc.fact} — ${svc.description}`,
              provider: { '@id': `${SITE_URL}/#practice` }
            }
          }))
        }
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#founder`,
        name: about.name,
        jobTitle: about.role,
        description: about.bio.text,
        url: SITE_URL,
        email: site.email.address,
        image: canonicalUrl(about.portrait.src),
        worksFor: { '@id': `${SITE_URL}/#practice` },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Nagpur',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN'
        },
        knowsAbout: about.disciplines
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#practice` },
        mainEntity: { '@id': `${SITE_URL}/#practice` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: canonicalUrl('/opengraph-image')
        }
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#work-list`,
        name: 'Selected Brand Case Studies by ArtSwapy',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${project.name} — ${project.category} (${project.discipline ?? 'Brand Identity'})`,
          description: project.summary,
          url: canonicalUrl(project.href ?? `/work/${project.id}`),
          image: project.image ? canonicalUrl(project.image) : undefined
        }))
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is ArtSwapy (Art Swapy)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ArtSwapy is an independent brand design and consulting practice founded by Swapnil Gathibandhe in Nagpur, India, working worldwide with founders, business owners, and marketing leads to build complete brand systems.'
            }
          },
          {
            '@type': 'Question',
            name: 'What services does ArtSwapy provide?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ArtSwapy delivers complete 5-pillar brand systems: (1) Strategy (positioning, audience, narrative), (2) Visual Identity (logomarks, typography, colour systems, brand guidelines), (3) Packaging (structural die-lines, labels, tactile print finishes), (4) Communications (campaigns, editorial print, brand voice), and (5) Applications (digital touchpoints, signage, and collateral).'
            }
          },
          {
            '@type': 'Question',
            name: 'How does a branding project with Swapnil Gathibandhe work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Every engagement works directly founder-to-founder with Swapnil Gathibandhe across five structured phases: ${process.stages.map((s) => `${s.name} (${s.duration})`).join(', ')}.`
            }
          },
          {
            '@type': 'Question',
            name: 'How can I start a branding project with ArtSwapy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `You can start a project by emailing ${site.email.address} directly from artswapy.com. ${contact.routes.find((r) => r.id === 'availability')?.value ?? 'Available for new projects'}.`
            }
          }
        ]
      }
    ]
  };
}

/**
 * Per-case-study Schema.org @graph with CreativeWork, BreadcrumbList, and author attribution.
 */
export function buildCaseStudyJsonLd(project: Project) {
  const pageUrl = canonicalUrl(`/work/${project.id}`);
  const imageUrl = project.image ? canonicalUrl(project.image) : canonicalUrl('/opengraph-image');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${pageUrl}#case-study`,
        url: pageUrl,
        name: `${project.name} — ${project.category} Brand Case Study`,
        headline: `${project.name}: ${project.summary}`,
        description: project.caseStudy
          ? `${project.summary} ${project.caseStudy.challenge}`
          : project.summary,
        ...(/^\d{4}$/.test(project.year) ? { datePublished: `${project.year}-01-01` } : {}),
        inLanguage: 'en',
        genre: project.discipline ?? 'Brand Strategy & Identity',
        keywords: [
          project.name,
          project.category,
          project.discipline ?? 'Brand Identity',
          'ArtSwapy',
          'Art Swapy',
          'Swapnil Gathibandhe',
          ...(project.caseStudy?.deliverables ?? [])
        ],
        image: imageUrl,
        author: { '@id': `${SITE_URL}/#founder` },
        creator: { '@id': `${SITE_URL}/#practice` },
        publisher: { '@id': `${SITE_URL}/#practice` },
        isPartOf: { '@id': `${SITE_URL}/#website` }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'ArtSwapy Studio',
            item: SITE_URL
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Selected Work',
            item: `${SITE_URL}/#work`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.name,
            item: pageUrl
          }
        ]
      }
    ]
  };
}
