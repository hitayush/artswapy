'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';
import { setLenis } from '@/lib/motion/lenis';

/** Lenis on one shared ticker with ScrollTrigger. Not started under reduced motion; touch stays native. */
export default function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      tick = null;
      setLenis(null);
    };

    const start = () => {
      if (lenis || mq.matches) return;
      lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.4,
        syncTouch: false
      });
      lenis.on('scroll', ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    };

    const onChange = () => (mq.matches ? stop() : start());
    start();
    mq.addEventListener('change', onChange);
    return () => {
      mq.removeEventListener('change', onChange);
      stop();
    };
  }, []);

  return null;
}
