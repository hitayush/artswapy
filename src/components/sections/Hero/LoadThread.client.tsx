'use client';

import { preloader } from '@/content/site';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap';
import { getLenis } from '@/lib/motion/lenis';

/**
 * Wait for actual document + webfont readiness, bounded by a fail-safe cap
 * so slow external assets never trap the visitor on the loading screen.
 */
function waitForPageReady(maxWaitMs = 2000): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  const windowLoaded =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          window.addEventListener('load', () => resolve(), { once: true });
        });

  const fontsReady =
    typeof document !== 'undefined' && 'fonts' in document && document.fonts?.ready
      ? document.fonts.ready.then(() => undefined).catch(() => undefined)
      : Promise.resolve();

  const failSafe = new Promise<void>((resolve) => {
    window.setTimeout(resolve, maxWaitMs);
  });

  return Promise.race([Promise.all([windowLoaded, fontsReady]).then(() => undefined), failSafe]);
}

/**
 * LoadThread orchestrates the ArtSwapy editorial quote preloader,
 * tracks real page/font readiness, locks background scrolling while active,
 * and hands off seamlessly into the Hero section.
 */
export default function LoadThread() {
  useGSAP(() => {
    const html = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const preloaderEl = document.getElementById('preloader');
    const skipBtn = document.getElementById('preloader-skip');
    const progressBar = document.getElementById('preloader-progressbar');
    const shutterTop = document.querySelector<HTMLElement>('.shutter-top');
    const shutterBottom = document.querySelector<HTMLElement>('.shutter-bottom');
    const seamThread = document.querySelector<HTMLElement>('.as-seam-thread');
    const innerContent = document.querySelector<HTMLElement>('.as-preloader-inner');
    const counterVal = document.querySelector<HTMLElement>('.as-counter-val');
    const progressEl = document.querySelector<HTMLElement>('.as-preloader-progress');
    const quoteIdxEl = document.querySelector<HTMLElement>('.as-quote-idx');
    const quotePillarEl = document.querySelector<HTMLElement>('.as-quote-pillar');
    const quoteNoteEl = document.querySelector<HTMLElement>('.as-quote-note');
    const statusLabelEl = document.querySelector<HTMLElement>('.as-status-label');
    const statusTextEl = document.querySelector<HTMLElement>('.as-preloader-status-text');
    const readyIndicatorEl = document.querySelector<HTMLElement>('.as-ready-indicator');
    const cornerCrosses = document.querySelectorAll<HTMLElement>('.as-corner-cross');
    const quoteSlides = document.querySelectorAll<HTMLElement>('.as-quote-slide');
    const quotePips = document.querySelectorAll<HTMLElement>('.as-quote-pip');
    const quotePipFills = document.querySelectorAll<HTMLElement>('.as-quote-pip-fill');

    // Hero elements
    const name = document.querySelector<HTMLElement>('.hero-name');
    const charInners = document.querySelectorAll<HTMLElement>('.hero-char-inner');
    const charRollers = document.querySelectorAll<HTMLElement>('.hero-char-roller');
    const charBars = document.querySelectorAll<HTMLElement>('.hero-char-bar');
    const thread = document.querySelector<HTMLElement>('.load-thread');
    const riseItems = document.querySelectorAll<HTMLElement>('.hero-rise-item');
    const tiles = document.querySelectorAll<HTMLElement>('.grid-cell-tile');

    const unlockScroll = () => {
      html.dataset.intro = 'done';
      document.body.style.overflow = '';
      html.style.overflow = '';
      getLenis()?.start();
      ScrollTrigger.refresh();
    };

    const settleHeroImmediately = () => {
      unlockScroll();
      if (preloaderEl) preloaderEl.style.display = 'none';
      if (name) gsap.set(name, { yPercent: 0, opacity: 1, clearProps: 'transform,opacity' });
      if (charInners.length > 0) gsap.set(charInners, { yPercent: 0, opacity: 1, scale: 1, rotate: 0, clearProps: 'transform,opacity' });
      if (charRollers.length > 0) gsap.set(charRollers, { yPercent: 0, clearProps: 'transform' });
      if (charBars.length > 0) gsap.set(charBars, { scaleX: 0, opacity: 0, clearProps: 'transform,opacity' });
      if (thread) gsap.set(thread, { clipPath: 'inset(0)', opacity: 1, clearProps: 'clipPath' });
      if (riseItems.length > 0) gsap.set(riseItems, { opacity: 1, y: 0, clearProps: 'transform,opacity' });
      if (tiles.length > 0) gsap.set(tiles, { opacity: 0, display: 'none' });
    };

    if (html.dataset.intro === 'done' || !preloaderEl) {
      settleHeroImmediately();
      return;
    }

    // Lock background scroll while preloader is active
    getLenis()?.stop();
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const quotes = preloader.quotes;
    const totalQuotesStr = String(quotes.length).padStart(2, '0');

    const updateProgressUI = (val: number) => {
      const clamped = Math.max(0, Math.min(100, Math.round(val)));
      if (counterVal) counterVal.textContent = String(clamped).padStart(2, '0');
      if (progressEl) gsap.set(progressEl, { scaleX: clamped / 100 });
      if (progressBar) progressBar.setAttribute('aria-valuenow', String(clamped));
    };

    const applyQuoteMeta = (index: number) => {
      const q = quotes[index];
      if (!q) return;
      if (quoteIdxEl) quoteIdxEl.textContent = q.index;
      if (quotePillarEl) quotePillarEl.textContent = q.pillar;
      if (quoteNoteEl) quoteNoteEl.textContent = q.note;
      if (statusLabelEl) statusLabelEl.textContent = `[ THOUGHT ${q.index}/${totalQuotesStr} ]`;
      if (statusTextEl) {
        statusTextEl.textContent = `${q.pillar.toUpperCase()} — ${q.note.toUpperCase()}`;
      }
      quotePips.forEach((pip, idx) => {
        pip.dataset.state = idx < index ? 'done' : idx === index ? 'active' : 'upcoming';
      });
    };

    // 1. Accessibility: Reduced-motion quick static transition (no sliding shutters or translateY)
    if (reduce) {
      if (name) gsap.set(name, { yPercent: 0, opacity: 1, clearProps: 'transform,opacity' });
      if (charInners.length > 0) gsap.set(charInners, { yPercent: 0, opacity: 1, scale: 1, rotate: 0, clearProps: 'transform,opacity' });
      if (charRollers.length > 0) gsap.set(charRollers, { yPercent: 0, clearProps: 'transform' });
      if (charBars.length > 0) gsap.set(charBars, { scaleX: 0, opacity: 0, clearProps: 'transform,opacity' });
      if (thread) gsap.set(thread, { clipPath: 'inset(0)', opacity: 1, clearProps: 'clipPath' });
      if (riseItems.length > 0) gsap.set(riseItems, { opacity: 1, y: 0, clearProps: 'transform,opacity' });
      if (tiles.length > 0) gsap.set(tiles, { opacity: 0, display: 'none' });

      applyQuoteMeta(0);
      updateProgressUI(100);
      if (readyIndicatorEl) readyIndicatorEl.textContent = 'PORTFOLIO READY';

      let cancelled = false;
      const finishReduced = () => {
        if (cancelled) return;
        cancelled = true;
        gsap.to(preloaderEl, {
          opacity: 0,
          duration: 0.24,
          ease: 'none',
          onComplete: () => {
            settleHeroImmediately();
          }
        });
      };

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') finishReduced();
      };
      skipBtn?.addEventListener('click', finishReduced);
      window.addEventListener('keydown', onKeyDown);

      const minDisplay = new Promise<void>((r) => window.setTimeout(r, 320));
      Promise.all([waitForPageReady(600), minDisplay]).then(finishReduced);

      return () => {
        cancelled = true;
        skipBtn?.removeEventListener('click', finishReduced);
        window.removeEventListener('keydown', onKeyDown);
      };
    }

    // 2. Full Editorial Opening Sequence
    if (seamThread) gsap.set(seamThread, { scaleX: 0, transformOrigin: 'center center' });
    if (progressEl) gsap.set(progressEl, { scaleX: 0, transformOrigin: 'left center' });
    if (quotePipFills.length > 0) {
      gsap.set(quotePipFills, { scaleX: 0, transformOrigin: 'left center' });
    }

    quoteSlides.forEach((slide, idx) => {
      const text = slide.querySelector<HTMLElement>('.as-quote-text');
      if (idx === 0) {
        slide.dataset.active = 'true';
        slide.removeAttribute('aria-hidden');
        gsap.set(slide, { opacity: 1 });
        if (text) gsap.set(text, { yPercent: 0, opacity: 1 });
      } else {
        slide.dataset.active = 'false';
        slide.setAttribute('aria-hidden', 'true');
        gsap.set(slide, { opacity: 0 });
        if (text) gsap.set(text, { yPercent: 100, opacity: 0 });
      }
    });

    applyQuoteMeta(0);
    updateProgressUI(0);

    let isHandingOff = false;
    let isDisposed = false;
    const progressObj = { value: 0 };

    const quoteTl = gsap.timeline();

    // Subtle corner registration fade-in
    if (cornerCrosses.length > 0) {
      quoteTl.fromTo(
        cornerCrosses,
        { opacity: 0.15 },
        { opacity: 0.75, duration: 0.35, stagger: 0.05, ease: 'power2.out' },
        0
      );
    }

    // First quote gentle entrance from mask
    const firstSlideText = quoteSlides[0]?.querySelector<HTMLElement>('.as-quote-text');
    if (firstSlideText) {
      quoteTl.fromTo(
        firstSlideText,
        { yPercent: 35, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.42, ease: 'power3.out' },
        0
      );
    }

    // Pacing per quote: comfortable reading window, fast and responsive on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const holdDuration = isMobile ? 0.62 : 0.88;
    const transitionDuration = isMobile ? 0.28 : 0.34;
    const stepSlot = holdDuration + transitionDuration;

    quotes.forEach((_, idx) => {
      const slotStart = idx * stepSlot;
      const targetProgress = idx === quotes.length - 1 ? 96 : Math.round(((idx + 1) / quotes.length) * 94);
      const pipFill = quotePipFills[idx];

      // Animate active pip fill across the quote's reading window
      if (pipFill) {
        quoteTl.fromTo(
          pipFill,
          { scaleX: 0 },
          { scaleX: 1, duration: holdDuration, ease: 'none' },
          slotStart
        );
      }

      // Advance overall progress bar smoothly during this quote
      quoteTl.to(
        progressObj,
        {
          value: targetProgress,
          duration: holdDuration,
          ease: 'power1.inOut',
          onUpdate: () => updateProgressUI(progressObj.value)
        },
        slotStart
      );

      // Transition to the next quote if one exists
      if (idx < quotes.length - 1) {
        const nextIdx = idx + 1;
        const changeTime = slotStart + holdDuration;
        const currSlide = quoteSlides[idx];
        const nextSlide = quoteSlides[nextIdx];
        const currText = currSlide?.querySelector<HTMLElement>('.as-quote-text');
        const nextText = nextSlide?.querySelector<HTMLElement>('.as-quote-text');

        if (currText && currSlide) {
          quoteTl.to(
            currText,
            {
              yPercent: -85,
              opacity: 0,
              duration: transitionDuration * 0.75,
              ease: 'power2.in',
              onComplete: () => {
                currSlide.dataset.active = 'false';
                currSlide.setAttribute('aria-hidden', 'true');
                gsap.set(currSlide, { opacity: 0 });
              }
            },
            changeTime
          );
        }

        if (nextSlide && nextText) {
          quoteTl.call(
            () => {
              nextSlide.dataset.active = 'true';
              nextSlide.removeAttribute('aria-hidden');
              gsap.set(nextSlide, { opacity: 1 });
              applyQuoteMeta(nextIdx);
            },
            [],
            changeTime + transitionDuration * 0.45
          );

          quoteTl.fromTo(
            nextText,
            { yPercent: 95, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: transitionDuration,
              ease: 'power3.out'
            },
            changeTime + transitionDuration * 0.45
          );
        }
      }
    });

    // Seamless Handoff into Hero Section
    const runHeroHandoff = (fast = false) => {
      if (isHandingOff || isDisposed) return;
      isHandingOff = true;
      quoteTl.pause();

      const timeScale = fast ? 1.45 : 1;
      const handoffTl = gsap.timeline({
        defaults: { overwrite: 'auto' },
        onComplete: () => {
          if (preloaderEl) preloaderEl.style.display = 'none';
          if (tiles.length > 0) gsap.set(tiles, { display: 'none' });
          gsap.set([name, charInners, charRollers, charBars, thread, riseItems], {
            clearProps: 'transform,opacity,clipPath'
          });
          unlockScroll();
        }
      });
      handoffTl.timeScale(timeScale);

      // 1. Complete progress to 100%
      handoffTl.to(
        progressObj,
        {
          value: 100,
          duration: 0.2,
          ease: 'power2.out',
          onStart: () => {
            if (readyIndicatorEl) readyIndicatorEl.textContent = 'PORTFOLIO READY';
            if (statusLabelEl) statusLabelEl.textContent = '[ 100% · READY ]';
            if (statusTextEl) statusTextEl.textContent = 'ENTERING ARTSWAPY STUDIO';
          },
          onUpdate: () => updateProgressUI(progressObj.value)
        },
        0
      );

      // 2. Draw razor-sharp orange horizon seam thread
      if (seamThread) {
        handoffTl.to(
          seamThread,
          {
            scaleX: 1,
            duration: 0.32,
            ease: 'power3.inOut'
          },
          0.04
        );
      }

      // 3. Fade out preloader editorial stage
      if (innerContent) {
        handoffTl.to(
          innerContent,
          {
            opacity: 0,
            scale: 0.985,
            duration: 0.26,
            ease: 'power2.in'
          },
          0.14
        );
      }

      // Unlock scroll as shutters begin to part so the hero feels immediately responsive
      handoffTl.call(
        () => {
          html.style.overflow = '';
          document.body.style.overflow = '';
          getLenis()?.start();
        },
        [],
        0.32
      );

      // 4. Part architectural split shutters revealing the Hero underneath
      if (shutterTop && shutterBottom) {
        handoffTl.to(
          shutterTop,
          {
            yPercent: -100,
            duration: 0.56,
            ease: 'power3.inOut'
          },
          0.32
        );
        handoffTl.to(
          shutterBottom,
          {
            yPercent: 100,
            duration: 0.56,
            ease: 'power3.inOut'
          },
          0.32
        );
      }

      if (seamThread) {
        handoffTl.to(
          seamThread,
          {
            opacity: 0,
            duration: 0.26,
            ease: 'power2.out'
          },
          0.38
        );
      }

      // 5. Hero Monumental Headline Kinetic Character Wave & Dual-Layer Roll
      if (charInners.length > 0) {
        handoffTl.fromTo(
          charInners,
          {
            yPercent: 108,
            scale: 0.96,
            opacity: 0
          },
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.62,
            stagger: {
              each: 0.036,
              from: 'start'
            },
            ease: 'power3.out'
          },
          0.34
        );
      } else if (name) {
        handoffTl.fromTo(
          name,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.54,
            ease: 'power3.out'
          },
          0.38
        );
      }

      // Dynamic orange-to-ink glyph roll pulse as characters lock into place
      if (charRollers.length > 0) {
        handoffTl.fromTo(
          charRollers,
          { yPercent: -100 },
          {
            yPercent: 0,
            duration: 0.48,
            stagger: {
              each: 0.034,
              from: 'start'
            },
            ease: 'power3.inOut'
          },
          0.44
        );
      }

      // Per-character baseline tick wave
      if (charBars.length > 0) {
        handoffTl.fromTo(
          charBars,
          { scaleX: 0, opacity: 1 },
          {
            keyframes: [
              { scaleX: 1, opacity: 1, duration: 0.2, ease: 'power2.out' },
              { scaleX: 0, opacity: 0, duration: 0.28, ease: 'power2.in' }
            ],
            stagger: {
              each: 0.034,
              from: 'start'
            }
          },
          0.5
        );
      }

      if (tiles.length > 0) {
        handoffTl.to(
          tiles,
          {
            scale: 0.94,
            opacity: 0,
            duration: 0.3,
            stagger: {
              grid: [4, 16],
              from: 'center',
              amount: 0.3,
              ease: 'power2.out'
            }
          },
          0.36
        );
      }

      // 6. Sweep Hero Electric Orange Thread & Rise Supporting Grid Elements
      if (thread) {
        handoffTl.fromTo(
          thread,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.5,
            ease: 'power2.inOut'
          },
          0.54
        );
      }

      if (riseItems.length > 0) {
        handoffTl.fromTo(
          riseItems,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.44,
            stagger: 0.055,
            ease: 'power2.out'
          },
          0.58
        );
      }
    };

    // Restrained scroll-driven depth shift on Hero monument (desktop, normal motion only)
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const heroSection = document.querySelector<HTMLElement>('.hero');
      const heroCenter = document.querySelector<HTMLElement>('.hero-center');
      if (!heroSection || !heroCenter) return;

      gsap.to(heroCenter, {
        yPercent: -10,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          fastScrollEnd: true
        }
      });
    });

    // Coordinate quote sequence completion with actual page + font readiness
    const sequenceFinished = new Promise<void>((resolve) => {
      quoteTl.eventCallback('onComplete', () => resolve());
    });

    Promise.all([sequenceFinished, waitForPageReady(2000)]).then(() => {
      runHeroHandoff(false);
    });

    // Interactive Skip affordance (Click or Escape key)
    const handleSkip = () => {
      runHeroHandoff(true);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        runHeroHandoff(true);
      }
    };

    skipBtn?.addEventListener('click', handleSkip);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isDisposed = true;
      skipBtn?.removeEventListener('click', handleSkip);
      window.removeEventListener('keydown', handleKeyDown);
      quoteTl.kill();
      mm.revert();
    };
  });

  return null;
}
