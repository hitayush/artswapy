'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/motion/gsap';

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop devices with a fine pointer (mouse / trackpad)
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFine || isReduced) {
      return;
    }

    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!root || !ring || !dot) return;

    let started = false;
    let isPressed = false;
    let currentTargetState: 'default' | 'interactive' | 'media' | 'text' = 'default';
    let isInverse = false;

    // Fast GSAP quickTo setters for extreme responsiveness and zero lag
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.04, ease: 'power3' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.04, ease: 'power3' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.16, ease: 'power2.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.16, ease: 'power2.out' });

    const applyVisualState = () => {
      if (currentTargetState === 'text') {
        // Hide custom cursor over editable text inputs so native text cursor displays cleanly
        gsap.to(root, { opacity: 0, duration: 0.12, overwrite: 'auto' });
        return;
      }

      gsap.to(root, { opacity: 1, duration: 0.12, overwrite: 'auto' });

      let ringScale = 1;
      let ringBorderColor = isInverse ? 'rgba(246, 244, 239, 0.45)' : 'rgba(22, 22, 20, 0.35)';
      let ringBg = 'transparent';
      let dotScale = 1;
      let dotBg = isInverse ? '#f6f4ef' : 'var(--ink, #161614)';

      if (currentTargetState === 'interactive') {
        ringScale = isPressed ? 1.2 : 1.5;
        ringBorderColor = 'var(--accent, #ff551f)';
        ringBg = 'rgba(255, 85, 31, 0.08)';
        dotScale = isPressed ? 1.4 : 1.2;
        dotBg = 'var(--accent, #ff551f)';
      } else if (currentTargetState === 'media') {
        ringScale = isPressed ? 1.3 : 1.7;
        ringBorderColor = 'var(--accent, #ff551f)';
        ringBg = 'rgba(255, 85, 31, 0.05)';
        dotScale = isPressed ? 1.3 : 1.1;
        dotBg = 'var(--accent, #ff551f)';
      } else if (isPressed) {
        ringScale = 0.85;
        dotScale = 1.3;
      }

      gsap.to(ring, {
        scale: ringScale,
        borderColor: ringBorderColor,
        backgroundColor: ringBg,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      gsap.to(dot, {
        scale: dotScale,
        backgroundColor: dotBg,
        duration: 0.16,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!started) {
        started = true;
        document.documentElement.classList.add('custom-cursor-active');
        root.classList.add('visible');
        gsap.set(dot, { x: e.clientX, y: e.clientY });
        gsap.set(ring, { x: e.clientX, y: e.clientY });
      }

      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Text inputs & editables: yield cleanly to native text selection I-beam
      if (target.closest('input, textarea, select, [contenteditable], iframe, video')) {
        currentTargetState = 'text';
      }
      // 2. Links, buttons, interactive controls
      else if (target.closest('a, button, [role="button"], input[type="submit"], .cta, .project-circle-btn, .hero-scroll-cue, .menu-btn, .nav a')) {
        currentTargetState = 'interactive';
      }
      // 3. Project cards & media frames
      else if (target.closest('.work-h-card, .project-card-frame, .shutter, .intro-card-inner')) {
        currentTargetState = 'media';
      } else {
        currentTargetState = 'default';
      }

      // Check dark/inverse grounds
      isInverse = !!target.closest('[data-inverse-section], .header[data-on-inverse], .work-h-project-card, .work-h-outro-card, .menu');

      applyVisualState();
    };

    const onPointerDown = () => {
      isPressed = true;
      applyVisualState();
    };

    const onPointerUp = () => {
      isPressed = false;
      applyVisualState();
    };

    const onMouseLeave = () => {
      gsap.to(root, { opacity: 0, duration: 0.15 });
    };

    const onMouseEnter = () => {
      if (started && currentTargetState !== 'text') {
        gsap.to(root, { opacity: 1, duration: 0.15 });
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div ref={rootRef} className="as-cursor-root" aria-hidden="true">
      <div ref={ringRef} className="as-cursor-ring" />
      <div ref={dotRef} className="as-cursor-dot" />
    </div>
  );
}
