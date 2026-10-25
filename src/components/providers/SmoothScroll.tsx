'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { cubicBezier } from '@/lib/ease';
import { ScrollTrigger } from '@/lib/motion/gsap';
import { findHashTarget, getLenis, scrollToHash, setLenis } from '@/lib/motion/lenis';

// The page scrolls on the exact cubicBezier(0.16, 1, 0.3, 1) curve from ClimbX.
const EASE = cubicBezier(0.16, 1, 0.3, 1);

// One Lenis instance for the whole app (from ClimbX components/layout/smooth-scroll.tsx),
// wired to GSAP ScrollTrigger so pinned sections stay synchronized.
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // native scroll

    const lenis = new Lenis({
      // Fast, immediate departure and silky settle: every wheel notch immediately moves
      // elements continuously down the page with zero sluggishness or delay.
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);
    setLenis(lenis);

    // If preloader is locking scroll on initial boot, pause Lenis until Hero handoff
    if (document.documentElement.dataset.intro === 'play') {
      lenis.stop();
    }

    const handleHashClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;
      const target = findHashTarget(href);
      if (!target) return;
      e.preventDefault();
      scrollToHash(href, { immediate: e.detail === 0 });
      history.replaceState(null, '', href);
    };

    window.addEventListener('click', handleHashClick);

    let raf = 0;
    const frame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('click', handleHashClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // route change → start the new page at the top (or target hash), without a smooth scroll-back
  useEffect(() => {
    const lenis = getLenis();
    const hash = window.location.hash;

    if (hash && findHashTarget(hash)) {
      window.requestAnimationFrame(() => {
        scrollToHash(hash, { immediate: true });
        ScrollTrigger.refresh();
      });
      return;
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [pathname]);

  return null;
}
