'use client';

import type Lenis from 'lenis';

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
  if (instance) instance.scrollTo(el, { offset: -HEADER_H, immediate: opts.immediate, duration: opts.immediate ? 0 : 1.2 });
  else el.scrollIntoView({ behavior: opts.immediate ? 'auto' : 'smooth' });
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
