'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/motion/gsap';

type CursorState = 'default' | 'interactive' | 'on-orange' | 'media' | 'text' | 'white-text';

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fineMql = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMql = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!fineMql.matches || reduceMql.matches) {
      return;
    }

    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!root || !ring || !dot) return;

    let started = false;
    let isPressed = false;
    let currentTargetState: CursorState = 'default';
    let rafId: number | null = null;
    let lastClientX = -9999;
    let lastClientY = -9999;
    let activeSpotlightEl: HTMLElement | null = null;

    // Tight, low-latency GSAP quickTo setters (Emil Kowalski animation guidelines: 120fps GPU tracking)
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.024, ease: 'power3.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.024, ease: 'power3.out' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.09, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.09, ease: 'power3.out' });

    const syncCssSpotlight = () => {
      document.documentElement.style.setProperty('--as-cursor-x', `${lastClientX}px`);
      document.documentElement.style.setProperty('--as-cursor-y', `${lastClientY}px`);
      rafId = null;
    };

    const clearActiveSpotlight = () => {
      if (activeSpotlightEl) {
        activeSpotlightEl.style.removeProperty('--as-local-x');
        activeSpotlightEl.style.removeProperty('--as-local-y');
        activeSpotlightEl = null;
      }
    };

    const applyVisualState = () => {
      if (currentTargetState === 'text') {
        gsap.to(root, { opacity: 0, duration: 0.12, overwrite: 'auto' });
        return;
      }

      gsap.to(root, { opacity: 1, duration: 0.12, overwrite: 'auto' });

      let ringScale = isPressed ? 0.88 : 1;
      let ringOpacity = 1;
      let ringBorderColor = 'rgba(255, 85, 31, 0.72)';
      let ringBg = 'rgba(255, 85, 31, 0.03)';
      let ringShadow = 'none';
      let dotScale = isPressed ? 1.25 : 1;
      let dotOpacity = 1;
      let dotBg = '#ff551f';
      let showLabel = false;

      if (currentTargetState === 'on-orange') {
        // High-contrast near-black ink cursor when hovering solid orange CTA buttons
        ringScale = isPressed ? 1.15 : 1.4;
        ringBorderColor = 'rgba(22, 22, 20, 0.82)';
        ringBg = 'rgba(22, 22, 20, 0.12)';
        dotScale = isPressed ? 0.9 : 0.7;
        dotBg = '#161614';
      } else if (currentTargetState === 'interactive') {
        ringScale = isPressed ? 1.2 : 1.45;
        ringBorderColor = '#ff551f';
        ringBg = 'rgba(255, 85, 31, 0.12)';
        dotScale = isPressed ? 0.9 : 0.65;
        dotBg = '#ff551f';
      } else if (currentTargetState === 'white-text') {
        // Spotlight aperture framing the text reveal
        ringScale = isPressed ? 1.35 : 1.55;
        ringBorderColor = 'rgba(255, 85, 31, 0.88)';
        ringBg = 'rgba(255, 85, 31, 0.04)';
        ringShadow = '0 0 16px rgba(255, 85, 31, 0.22)';
        dotScale = isPressed ? 0.95 : 0.75;
        dotBg = '#ff551f';
      } else if (currentTargetState === 'media') {
        ringScale = isPressed ? 1.85 : 2.15;
        ringBorderColor = '#ff551f';
        ringBg = 'rgba(255, 85, 31, 0.94)';
        dotScale = 0;
        dotOpacity = 0;
        showLabel = true;
      }

      gsap.to(ring, {
        scale: ringScale,
        opacity: ringOpacity,
        borderColor: ringBorderColor,
        backgroundColor: ringBg,
        boxShadow: ringShadow,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      gsap.to(dot, {
        scale: dotScale,
        opacity: dotOpacity,
        backgroundColor: dotBg,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      if (label) {
        gsap.to(label, {
          opacity: showLabel ? 1 : 0,
          scale: showLabel ? 1 : 0.7,
          duration: 0.16,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    const isHeroHeadline = (el: HTMLElement) => {
      return Boolean(
        el.closest(
          '.hero-name, .hero-name-mask, .hero-char-mask, .hero-name-stage, #top h1, .hero-center'
        )
      );
    };

    const isWhiteTextElement = (el: HTMLElement) => {
      // 1. Strict exclusion of the hero headline
      if (isHeroHeadline(el)) return false;

      // 2. Check if inside inverse section or dark container
      const isInverse = Boolean(
        el.closest('[data-inverse-section], .footer, .showreel, .cs-inverse, .as-spotlight-text')
      );

      // 3. Check if dark theme is active
      const isDarkTheme =
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        document.documentElement.classList.contains('dark');

      // 4. Must be a typographic element or child of one
      const isTypo = Boolean(
        el.closest('h1, h2, h3, h4, h5, h6, p, blockquote, .poster, .wordmark-big, .hero-stat-text, .showreel-quote-statement, .showreel-sub-desc')
      );

      // 5. Must not be explicitly styled with orange accent, button, or thread
      const isAccent = Boolean(el.closest('.cta, .accent, [data-accent], .load-thread, .hero-scroll-cue'));

      return !isAccent && isTypo && (isInverse || isDarkTheme);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') {
        return;
      }
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

      lastClientX = e.clientX;
      lastClientY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(syncCssSpotlight);
      }

      // Precision local coordinates: guarantees 100% concentric alignment even with CSS transforms
      const target = e.target as HTMLElement | null;
      if (target && isWhiteTextElement(target)) {
        const currentEl = target.closest<HTMLElement>(
          '.wordmark-big span, .footer-invite, .showreel-quote-statement, .showreel-sub-desc, .hero-stat-text, .poster, h1, h2, h3, h4, h5, h6, p, blockquote, span, a'
        ) || target;

        if (activeSpotlightEl && activeSpotlightEl !== currentEl) {
          activeSpotlightEl.style.removeProperty('--as-local-x');
          activeSpotlightEl.style.removeProperty('--as-local-y');
        }

        activeSpotlightEl = currentEl;
        const rect = currentEl.getBoundingClientRect();
        currentEl.style.setProperty('--as-local-x', `${e.clientX - rect.left}px`);
        currentEl.style.setProperty('--as-local-y', `${e.clientY - rect.top}px`);
      } else if (activeSpotlightEl) {
        clearActiveSpotlight();
      }
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      let nextState: CursorState = 'default';

      // 1. Native cursor fields (inputs, textareas, embeds)
      if (target.closest('input, textarea, select, [contenteditable], iframe, video, [data-native-cursor]')) {
        nextState = 'text';
      }
      // 2. Solid orange CTA buttons
      else if (target.closest('.cta, .card-featured .project-circle-btn')) {
        nextState = 'on-orange';
      }
      // 3. Interactive links, buttons, toggles, accordions
      else if (
        target.closest(
          'a, button, [role="button"], .project-circle-btn, .hero-scroll-cue, .menu-btn, .nav a, .svc-btn, .theme-toggle'
        )
      ) {
        nextState = 'interactive';
      }
      // 4. Project cards & case study media frames
      else if (target.closest('.work-h-project-card, .project-card-frame, .work-row, .cs-hero-media')) {
        nextState = 'media';
      }
      // 5. White text hover spotlight (hero headline strictly excluded)
      else if (isWhiteTextElement(target)) {
        nextState = 'white-text';
      }

      if (nextState === currentTargetState) {
        return;
      }

      currentTargetState = nextState;
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
      gsap.to(root, { opacity: 0, duration: 0.14 });
      lastClientX = -9999;
      lastClientY = -9999;
      document.documentElement.style.setProperty('--as-cursor-x', '-9999px');
      document.documentElement.style.setProperty('--as-cursor-y', '-9999px');
      clearActiveSpotlight();
    };

    const onMouseEnter = () => {
      if (started && currentTargetState !== 'text') {
        gsap.to(root, { opacity: 1, duration: 0.14 });
      }
    };

    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.remove('custom-cursor-active');
        root.classList.remove('visible');
        document.documentElement.style.removeProperty('--as-cursor-x');
        document.documentElement.style.removeProperty('--as-cursor-y');
        clearActiveSpotlight();
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    reduceMql.addEventListener('change', onReducedMotionChange);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      reduceMql.removeEventListener('change', onReducedMotionChange);
      if (rafId) cancelAnimationFrame(rafId);
      document.documentElement.style.removeProperty('--as-cursor-x');
      document.documentElement.style.removeProperty('--as-cursor-y');
      clearActiveSpotlight();
    };
  }, []);

  return (
    <div ref={rootRef} className="as-cursor-root" aria-hidden="true">
      <div ref={ringRef} className="as-cursor-ring">
        <span ref={labelRef} className="as-cursor-label mono">
          VIEW
        </span>
      </div>
      <div ref={dotRef} className="as-cursor-dot" />
    </div>
  );
}
