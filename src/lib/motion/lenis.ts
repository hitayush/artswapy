'use client';

import type Lenis from 'lenis';
import { ScrollTrigger } from '@/lib/motion/gsap';
import { cubicBezier } from '@/lib/ease';

let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}

function getHeaderHeight(): number {
  if (typeof document !== 'undefined') {
    const el = document.querySelector('.header') as HTMLElement | null;
    if (el && el.offsetHeight > 0) return el.offsetHeight;
  }
  return 64;
}

/** Exact parametric cubic-bezier(0.16, 1, 0.3, 1) curve from ClimbX for Lenis scroll runs. */
export const LENIS_EASE = cubicBezier(0.16, 1, 0.3, 1);

/** Safely resolve an in-page `#hash` target by ID without throwing on malformed CSS selectors. */
export function findHashTarget(hash: string): HTMLElement | null {
  if (typeof document === 'undefined' || !hash || !hash.startsWith('#') || hash === '#') {
    return null;
  }
  const rawId = hash.slice(1);
  try {
    return document.getElementById(decodeURIComponent(rawId)) ?? document.getElementById(rawId);
  } catch {
    return document.getElementById(rawId);
  }
}

/** Scroll to a hash target through Lenis when running, else the native scroll. */
export function scrollToHash(hash: string, opts: { immediate?: boolean } = {}) {
  if (hash === '#top' || hash === '#' || hash === '') {
    if (instance) {
      instance.scrollTo(0, {
        immediate: opts.immediate,
        duration: opts.immediate ? 0 : 1.25,
        easing: LENIS_EASE
      });
    } else {
      window.scrollTo({ top: 0, behavior: opts.immediate ? 'auto' : 'smooth' });
    }
    return;
  }
  const el = findHashTarget(hash);
  if (!el) return;

  if (typeof window !== 'undefined') {
    ScrollTrigger.update();
  }

  let targetY: number;
  const pinnedTrigger =
    typeof window !== 'undefined'
      ? ScrollTrigger.getAll().find(
          (t) => (t.pin === el || (t.trigger === el && Boolean(t.vars.pin))) && typeof t.start === 'number'
        )
      : null;

  if (pinnedTrigger && typeof pinnedTrigger.start === 'number') {
    targetY = pinnedTrigger.start;
  } else {
    const rect = el.getBoundingClientRect();
    targetY = Math.max(0, rect.top + window.scrollY - getHeaderHeight());
  }

  if (instance) {
    instance.scrollTo(targetY, {
      immediate: opts.immediate,
      duration: opts.immediate ? 0 : 1.25,
      easing: LENIS_EASE,
      onComplete: () => {
        ScrollTrigger.update();
      }
    });
  } else {
    window.scrollTo({
      top: targetY,
      behavior: opts.immediate ? 'auto' : 'smooth'
    });
  }
}

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
