import type { Metadata, Viewport } from 'next';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import SmoothScroll from '@/components/providers/SmoothScroll';
import CustomCursor from '@/components/layout/CustomCursor.client';
import { about, site } from '@/content/site';
import './globals.css';
import { cn } from "@/lib/utils";


const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  adjustFontFallback: true,
  variable: '--font-space'
});

const dm = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  adjustFontFallback: true,
  variable: '--font-dm'
});

const title = 'ArtSwapy | Brand Strategy, Identity & Packaging Design';
const description =
  'ArtSwapy is the independent brand design practice of Swapnil Gathibandhe, shaping clear brands through strategy, identity, packaging and communications.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: site.name,
  authors: [{ name: about.name, url: site.url }],
  creator: about.name,
  publisher: site.name,
  category: 'Brand design',
  alternates: {
    canonical: new URL('/', site.url)
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
    url: site.url,
    siteName: site.name,
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description
  },
  icons: { icon: '/favicon.svg' }
};

export const viewport: Viewport = { themeColor: '#f6f4ef', width: 'device-width', initialScale: 1 };

/* Runs before paint: marks JS-capable and activates the editorial intro (reduced-motion uses a quick static fade). */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.motion=r?'reduced':'full';d.dataset.intro='play'}catch(e){d.dataset.intro='done'}})();`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description,
      inLanguage: 'en',
      publisher: { '@id': `${site.url}/#practice` }
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${site.url}/#practice`,
      name: site.name,
      url: site.url,
      description,
      email: site.email.address,
      founder: { '@id': `${site.url}/#founder` }
    },
    {
      '@type': 'Person',
      '@id': `${site.url}/#founder`,
      name: about.name,
      worksFor: { '@id': `${site.url}/#practice` },
      image: new URL(about.portrait.src, site.url).toString()
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(space.variable, dm.variable)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
