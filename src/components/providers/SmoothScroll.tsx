'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { getLenis, scrollToHash, setLenis } from '@/lib/motion/lenis';

/**
 * Lenis on one shared ticker with GSAP ScrollTrigger across the entire website.
 * - Disabled under `prefers-reduced-motion: reduce`
 * - Native touch scroll (`syncTouch: false`)
 * - Automatically intercepts in-page `#hash` anchor clicks for smooth Lenis scrolling
 * - Resets scroll position and refreshes ScrollTrigger on route navigation (`/` <-> `/work/[slug]`)
 * - Tracks layout shifts via ResizeObserver so Lenis limits and ScrollTrigger pins stay synced
 */
export default function SmoothScroll() {
  const pathname = usePathname();
  const isFirstMount = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    let onRefresh: (() => void) | null = null;
    let ro: ResizeObserver | null = null;
    let refreshTimer: number | null = null;

    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize'
    });

    const handleHashClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      e.preventDefault();
      scrollToHash(href, { immediate: e.detail === 0 });
      history.replaceState(null, '', href);
    };

    const stop = () => {
      if (refreshTimer !== null) {
        window.clearTimeout(refreshTimer);
        refreshTimer = null;
      }
      ro?.disconnect();
      ro = null;
      window.removeEventListener('click', handleHashClick);
      if (tick) gsap.ticker.remove(tick);
      if (onRefresh) ScrollTrigger.removeEventListener('refresh', onRefresh);
      lenis?.destroy();
      lenis = null;
      tick = null;
      onRefresh = null;
      setLenis(null);
    };

    const start = () => {
      if (lenis || mq.matches) return;

      lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
        syncTouch: false,
        autoResize: true
      });

      lenis.on('scroll', ScrollTrigger.update);

      onRefresh = () => {
        lenis?.resize();
      };
      ScrollTrigger.addEventListener('refresh', onRefresh);

      tick = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);

      // Keep Lenis scroll dimensions synced when dynamic content (accordions, images) resizes body
      if ('ResizeObserver' in window) {
        let lastHeight = document.documentElement.scrollHeight;
        ro = new ResizeObserver(() => {
          const nextHeight = document.documentElement.scrollHeight;
          if (Math.abs(nextHeight - lastHeight) > 2) {
            lastHeight = nextHeight;
            lenis?.resize();
            if (refreshTimer !== null) window.clearTimeout(refreshTimer);
            refreshTimer = window.setTimeout(() => {
              ScrollTrigger.refresh();
            }, 120);
          }
        });
        ro.observe(document.body);
      }

      window.addEventListener('click', handleHashClick);

      // If preloader is currently locking scroll on initial boot, pause Lenis until Hero handoff
      if (document.documentElement.dataset.intro === 'play') {
        lenis.stop();
      }
    };

    const onChange = () => (mq.matches ? stop() : start());
    start();
    mq.addEventListener('change', onChange);
    return () => {
      mq.removeEventListener('change', onChange);
      stop();
    };
  }, []);

  // Synchronize Lenis & ScrollTrigger across client-side route transitions
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const lenis = getLenis();
    const hash = window.location.hash;

    if (hash && document.querySelector(hash)) {
      window.requestAnimationFrame(() => {
        scrollToHash(hash, { immediate: true });
        ScrollTrigger.refresh();
      });
    } else {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
      window.requestAnimationFrame(() => {
        lenis?.resize();
        ScrollTrigger.refresh();
      });
    }
  }, [pathname]);

  return null;
}
