'use client';

import { useRef } from 'react';
import { gsap, useGSAP, CustomEase } from '@/lib/motion/gsap';
import { ART_EASING } from '@/lib/motion/easing';

/**
 * LoadThread implements the cinematic intro sequence.
 * 1. Draw a thread across the monument name.
 * 2. Rise the hero elements (Name and Bottom Bar).
 * 3. Fade out the thread.
 */
export default function LoadThread() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Register the custom easings from our registry
      CustomEase.create('art-out', ART_EASING.out.join(', '));
      CustomEase.create('art-inOut', ART_EASING.inOut.join(', '));

      const tl = gsap.timeline({
        defaults: { ease: 'art-out' }
      });

      // Target the elements based on the classes defined in Hero.tsx and globals.css
      // We use a selector because these elements are outside this component's return
      const nameWrap = document.querySelector('.hero-name-wrap');
      const thread = document.querySelector('.load-thread');
      const riseElements = document.querySelectorAll('.hero-rise');

      if (!thread || !nameWrap) return;

      // Initial state
      gsap.set(thread, {
        display: 'block',
        clipPath: 'inset(0 100% 0 0)',
        opacity: 1
      });
      gsap.set(riseElements, {
        opacity: 0,
        y: 16
      });

      tl.to(thread, {
        clipPath: 'inset(0)',
        duration: 0.7,
        ease: 'art-inOut'
      })
      .to(riseElements, {
        opacity: 1,
        y: 0,
        duration: 0.48,
        stagger: 0.07,
        ease: 'art-out'
      }, '-=0.2')
      .to(thread, {
        opacity: 0,
        duration: 0.3,
        ease: 'art-out'
      }, '+=0.2');

      // Mark intro as done for CSS/State tracking
      tl.add(() => {
        document.documentElement.dataset.intro = 'done';
        try {
          sessionStorage.setItem('as-intro', '1');
        } catch (e) {
          // Ignore storage errors
        }
      });
    },
    { scope: scope }
  );

  return <div ref={scope} style={{ display: 'none' }} />;
}
