import type { Metadata, Viewport } from 'next';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Preloader from '@/components/layout/Preloader.client';
import { about, site } from '@/content/site';
import './globals.css';

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

const description =
  'ArtSwapy is an independent brand design and consulting practice led by Swapnil Gathibandhe: strategy, identity and packaging for businesses that want to be understood.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'ArtSwapy | Brand design and consulting by Swapnil Gathibandhe',
  description,
  openGraph: {
    title: 'ArtSwapy | Brand design and consulting',
    description,
    url: site.url,
    siteName: site.name,
    type: 'website'
  },
  icons: { icon: '/favicon.svg' }
};

export const viewport: Viewport = { themeColor: '#f6f4ef', width: 'device-width', initialScale: 1 };

/* Runs before paint: marks JS-capable, and decides whether the one-time load thread plays. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.intro=(r||sessionStorage.getItem('as-intro'))?'done':'play'}catch(e){d.dataset.intro='done'}})();`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  url: site.url,
  description,
  email: site.email.address,
  founder: { '@type': 'Person', name: about.name }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${space.variable} ${dm.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Preloader />
        <a className="skip-link" href="#main">Skip to content</a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
