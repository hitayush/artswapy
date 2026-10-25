'use client';

import { useEffect } from 'react';
import { initSfx, playSfx, preloadSfx } from '@/lib/audio/sfx';

export default function SoundEffects() {
  useEffect(() => {
    initSfx();

    // Warm up the audio context on first user interaction
    const unlockAudio = () => {
      preloadSfx();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio, { passive: true, once: true });
    window.addEventListener('keydown', unlockAudio, { passive: true, once: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true, once: true });

    // Idle preload so buffer is decoded ahead of time
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => preloadSfx());
    } else {
      setTimeout(() => preloadSfx(), 1200);
    }

    // Global Click Handler for tactile audio feedback
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Skip elements explicitly marked no-sfx
      if (target.closest('[data-no-sfx]')) return;

      const interactive = target.closest<HTMLElement>(
        'button, a, [role="button"], input[type="submit"], input[type="button"], .project-circle-btn, .process-step-pill, .service-row-button, .showreel-learn-more'
      );

      if (!interactive) return;

      const customSfx = interactive.getAttribute('data-sfx');
      if (customSfx === 'toggle') {
        playSfx('toggle');
      } else if (customSfx === 'stamp') {
        playSfx('stamp');
      } else if (customSfx === 'drawer') {
        playSfx('drawer');
      } else {
        playSfx('click');
      }
    };

    // Global Hover Handler for delicate pointer micro-ticks
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let handlePointerOver: ((e: PointerEvent) => void) | null = null;

    if (isFinePointer) {
      handlePointerOver = (e: PointerEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        if (target.closest('[data-no-sfx]')) return;

        const hoverable = target.closest<HTMLElement>(
          '.nav a, .cta, .btn, .project-circle-btn, .theme-toggle-btn, .sound-toggle-btn, .process-step-pill, .service-row-button, .menu-links a, .email-poster'
        );

        if (hoverable) {
          playSfx('hover');
        }
      };

      window.addEventListener('pointerover', handlePointerOver, { passive: true });
    }

    window.addEventListener('click', handleClick, { capture: true, passive: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', handleClick, { capture: true });
      if (handlePointerOver) {
        window.removeEventListener('pointerover', handlePointerOver);
      }
    };
  }, []);

  return null;
}
