import type { Metadata, Viewport } from 'next';
import { DM_Sans, Space_Grotesk, Montserrat } from 'next/font/google';
import SmoothScroll from '@/components/providers/SmoothScroll';
import SoundEffects from '@/components/providers/SoundEffects.client';
import CustomCursor from '@/components/layout/CustomCursor.client';
import {
  buildHomeJsonLd,
  buildPageMetadata,
  DEFAULT_TITLE,
  SITE_URL,
  TITLE_TEMPLATE
} from '@/lib/seo';
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

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  adjustFontFallback: true,
  variable: '--font-montserrat'
});

const baseMetadata = buildPageMetadata({ path: '/' });

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: TITLE_TEMPLATE
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: ['/favicon.svg']
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f4ef' },
    { media: '(prefers-color-scheme: dark)', color: '#11110f' }
  ],
  width: 'device-width',
  initialScale: 1
};

/* Runs before paint: resolves saved/system theme without FOUC, marks JS-capable, and activates the editorial intro. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var s=localStorage.getItem('artswapy-theme');var m=matchMedia('(prefers-color-scheme: dark)').matches;var t=s==='dark'||s==='light'?s:(m?'dark':'light');d.dataset.theme=t;d.classList.toggle('dark',t==='dark');d.style.colorScheme=t}catch(e){d.dataset.theme='light'}try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.motion=r?'reduced':'full';d.dataset.intro='play'}catch(e){d.dataset.intro='done'}})();`;

const jsonLd = buildHomeJsonLd();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(space.variable, dm.variable, montserrat.variable)} suppressHydrationWarning>
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
        <SoundEffects />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
