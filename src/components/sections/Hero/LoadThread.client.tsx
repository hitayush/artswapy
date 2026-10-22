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
  useGSAP(() => {
    // Check if user prefers reduced motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if entrance already played in this browser session
    let alreadyDone = false;
    try {
      alreadyDone = sessionStorage.getItem('as-intro') === '1';
    } catch {
      alreadyDone = false;
    }

    const name = document.querySelector<HTMLElement>('.hero-name');
    const thread = document.querySelector<HTMLElement>('.load-thread');
    const riseItems = document.querySelectorAll<HTMLElement>('.hero-rise-item');

    if (!name || !thread) return;

    // If repeat visit or reduced motion, immediately settle with full visibility
    if (reduce || alreadyDone || document.documentElement.dataset.intro === 'done') {
      document.documentElement.dataset.intro = 'done';
      gsap.set(name, { yPercent: 0, opacity: 1, clearProps: 'transform,opacity' });
      gsap.set(thread, { clipPath: 'inset(0)', opacity: 1, clearProps: 'clipPath' });
      gsap.set(riseItems, { opacity: 1, y: 0, clearProps: 'transform,opacity' });
      return;
    }

    try {
      CustomEase.create('art-out', ART_EASING.out.join(', '));
      CustomEase.create('art-inOut', ART_EASING.inOut.join(', '));
    } catch {
      // already registered
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        document.documentElement.dataset.intro = 'done';
        try {
          sessionStorage.setItem('as-intro', '1');
        } catch {}
        // Clear GSAP inline styles so layout and text responsiveness stay pristine
        gsap.set([name, thread, riseItems], { clearProps: 'transform,opacity' });
      }
    });

    // Step 1: Smooth vertical mask reveal of the oversized ArtSwapy wordmark
    tl.fromTo(
      name,
      { yPercent: 105 },
      {
        yPercent: 0,
        duration: 0.52,
        ease: 'power3.out'
      },
      0
    );

    // Step 2: Draw the signature electric orange thread underneath the wordmark
    tl.fromTo(
      thread,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.44,
        ease: 'power2.inOut'
      },
      0.22
    );

    // Step 3: Stagger in the supporting studio statements and scroll cue
    if (riseItems.length > 0) {
      tl.fromTo(
        riseItems,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.38,
          stagger: 0.07,
          ease: 'power2.out'
        },
        0.36
      );
    }
  });

  return null;
}
