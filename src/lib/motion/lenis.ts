'use client';

import type Lenis from 'lenis';
import { ScrollTrigger } from '@/lib/motion/gsap';

let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}

const HEADER_H = 64;

/** Scroll to a hash target through Lenis when running, else the native scroll. */
export function scrollToHash(hash: string, opts: { immediate?: boolean } = {}) {
  if (hash === '#top' || hash === '#' || hash === '') {
    if (instance) instance.scrollTo(0, { immediate: opts.immediate, duration: opts.immediate ? 0 : 1.2 });
    else window.scrollTo({ top: 0, behavior: opts.immediate ? 'auto' : 'smooth' });
    return;
  }
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;

  // Determine exact target scroll offset
  let targetY: number;
  const trigger = typeof window !== 'undefined'
    ? ScrollTrigger.getAll().find((t) => t.trigger === el || t.pin === el)
    : null;

  if (trigger && typeof trigger.start === 'number') {
    // If the target element is pinned, scroll directly to the trigger's start position
    targetY = trigger.start;
  } else {
    // For standard unpinned elements, calculate absolute document position minus header offset
    const rect = el.getBoundingClientRect();
    targetY = Math.max(0, rect.top + window.scrollY - HEADER_H);
  }

  if (instance) {
    instance.scrollTo(targetY, {
      immediate: opts.immediate,
      duration: opts.immediate ? 0 : 1.2
    });
  } else {
    window.scrollTo({
      top: targetY,
      behavior: opts.immediate ? 'auto' : 'smooth'
    });
  }
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
