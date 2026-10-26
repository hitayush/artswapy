'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { findHashTarget, getLenis, scrollToHash, setLenis } from '@/lib/motion/lenis';

/**
 * Global Lenis smooth scroll provider.
 * Synchronized with GSAP's ticker for 100% lockstep frame updates with ScrollTrigger.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Under prefers-reduced-motion, keep native accessible scroll
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Premium studio smooth scroll physics:
    // duration 1.25s gives that signature buttery, luxurious flywheel feel without sluggishness
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.0,
      syncTouch: false, // native touch feel on touchscreens, silky wheel on desktop
      autoResize: true,
    });

    // 1. Notify ScrollTrigger on every Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Drive Lenis directly via GSAP's ticker for 100% lockstep frame sync
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    // Smooth frame latency hitching during heavy layout/decodes
    gsap.ticker.lagSmoothing(1000, 16);

    setLenis(lenis);
    (window as unknown as { __lenis?: unknown }).__lenis = lenis;

    // 3. Pause Lenis while preloader intro is playing
    if (document.documentElement.dataset.intro === 'play') {
      lenis.stop();
    }

    // 4. Smooth in-page anchor navigation interceptor
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

    return () => {
      window.removeEventListener('click', handleHashClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      setLenis(null);
      (window as unknown as { __lenis?: unknown }).__lenis = null;
    };
  }, []);

  // Route change → immediately position at top or target hash without backwards scroll
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
