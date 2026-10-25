'use client';

import { useEffect, useRef } from 'react';
import { hero, site } from '@/content/site';
import { gsap } from '@/lib/motion/gsap';
import { playCharHover, playSfx } from '@/lib/audio/sfx';

const COLS = 16;
const ROWS = 4;
const TOTAL_CELLS = COLS * ROWS;

const TITLE_CHARS = Array.from(site.name.toUpperCase());

export default function HeroTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hudCoordRef = useRef<HTMLSpanElement>(null);
  const hudCharRef = useRef<HTMLSpanElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const charMasksRef = useRef<(HTMLSpanElement | null)[]>([]);
  const charInnersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const charRollersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const charBarsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || isReduced) return;

    const container = containerRef.current;
    const hud = hudRef.current;
    const hudCoord = hudCoordRef.current;
    const hudChar = hudCharRef.current;
    if (!container) return;

    let activeIdx: number | null = null;
    let prevNeighbors: number[] = [];
    let prevClosestCharIdx = -1;
    let rafId: number | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let isInside = false;

    const updateInteractivePhysics = () => {
      rafId = null;
      if (document.documentElement.dataset.intro === 'play') return;

      const rect = container.getBoundingClientRect();
      const x = pointerX - rect.left;
      const y = pointerY - rect.top;

      if (!isInside || x < 0 || y < 0 || x > rect.width || y > rect.height) {
        clearHover();
        return;
      }

      // 1. Update 16x4 Architectural Grid Matrix
      const col = Math.min(COLS - 1, Math.max(0, Math.floor((x / rect.width) * COLS)));
      const row = Math.min(ROWS - 1, Math.max(0, Math.floor((y / rect.height) * ROWS)));
      const idx = row * COLS + col;

      if (idx !== activeIdx) {
        activeIdx = idx;
        prevNeighbors.forEach((nIdx) => {
          const el = cellsRef.current[nIdx];
          if (el) el.classList.remove('cell-active', 'cell-near');
        });

        const activeEl = cellsRef.current[idx];
        if (activeEl) activeEl.classList.add('cell-active');

        const neighbors: number[] = [];
        if (col > 0) neighbors.push(idx - 1);
        if (col < COLS - 1) neighbors.push(idx + 1);
        if (row > 0) neighbors.push(idx - COLS);
        if (row < ROWS - 1) neighbors.push(idx + COLS);

        neighbors.forEach((nIdx) => {
          const el = cellsRef.current[nIdx];
          if (el && nIdx !== idx) el.classList.add('cell-near');
        });

        prevNeighbors = [idx, ...neighbors];

        if (hud && hudCoord) {
          hud.classList.add('hud-visible');
          hudCoord.textContent = `${String(col + 1).padStart(2, '0')} : ${String(row + 1).padStart(2, '0')}`;
        }
      }

      // 2. Restrained Magnetic Per-Character Proximity & Dual-Layer Roll
      const radius = Math.max(160, rect.width * 0.22);
      let closestCharIdx = -1;
      let minCharDist = Infinity;

      charMasksRef.current.forEach((maskEl, i) => {
        const innerEl = charInnersRef.current[i];
        const rollerEl = charRollersRef.current[i];
        const barEl = charBarsRef.current[i];
        if (!maskEl || !innerEl || !rollerEl) return;

        const cRect = maskEl.getBoundingClientRect();
        const cx = cRect.left + cRect.width * 0.5;
        const cy = cRect.top + cRect.height * 0.5;
        const dx = pointerX - cx;
        const dy = pointerY - cy;
        const dist = Math.hypot(dx, dy);

        if (dist < minCharDist) {
          minCharDist = dist;
          closestCharIdx = i;
        }

        const proximity = Math.max(0, 1 - dist / radius);
        const weight = proximity * proximity * (3 - 2 * proximity);

        if (weight > 0.01) {
          const pullX = (dx / radius) * -6 * weight;
          const liftY = -8 * weight + (dy / radius) * 2.5 * weight;
          const scale = 1 + 0.035 * weight;
          const tilt = (dx / radius) * -2.2 * weight;

          innerEl.style.transform = `translate3d(${pullX.toFixed(2)}px, ${liftY.toFixed(2)}px, 0) scale(${scale.toFixed(3)}) rotate(${tilt.toFixed(2)}deg)`;

          const rollPct = weight > 0.56 ? Math.min(1, (weight - 0.56) / 0.36) * -100 : 0;
          rollerEl.style.transform = `translate3d(0, ${rollPct.toFixed(1)}%, 0)`;

          if (barEl) {
            barEl.style.transform = `scaleX(${weight.toFixed(3)})`;
            barEl.style.opacity = `${Math.min(1, weight * 1.2).toFixed(2)}`;
          }
        } else {
          innerEl.style.transform = 'translate3d(0px, 0px, 0) scale(1) rotate(0deg)';
          rollerEl.style.transform = 'translate3d(0, 0%, 0)';
          if (barEl) {
            barEl.style.transform = 'scaleX(0)';
            barEl.style.opacity = '0';
          }
        }
      });

      if (hudChar && closestCharIdx >= 0 && TITLE_CHARS[closestCharIdx]) {
        hudChar.textContent = TITLE_CHARS[closestCharIdx];
      }

      if (closestCharIdx >= 0 && closestCharIdx !== prevClosestCharIdx) {
        prevClosestCharIdx = closestCharIdx;
        playCharHover(closestCharIdx, TITLE_CHARS.length);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      isInside = true;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateInteractivePhysics);
      }
    };

    const clearHover = () => {
      isInside = false;
      activeIdx = null;
      prevClosestCharIdx = -1;
      prevNeighbors.forEach((nIdx) => {
        const el = cellsRef.current[nIdx];
        if (el) el.classList.remove('cell-active', 'cell-near');
      });
      prevNeighbors = [];
      if (hud) hud.classList.remove('hud-visible');

      charInnersRef.current.forEach((innerEl, i) => {
        const rollerEl = charRollersRef.current[i];
        const barEl = charBarsRef.current[i];
        if (innerEl) innerEl.style.transform = 'translate3d(0px, 0px, 0) scale(1) rotate(0deg)';
        if (rollerEl) rollerEl.style.transform = 'translate3d(0, 0%, 0)';
        if (barEl) {
          barEl.style.transform = 'scaleX(0)';
          barEl.style.opacity = '0';
        }
      });
    };

    const onClickWave = (e: MouseEvent) => {
      if (document.documentElement.dataset.intro === 'play') return;
      playSfx('stamp');
      const inners = charInnersRef.current.filter((el): el is HTMLSpanElement => el !== null);
      const bars = charBarsRef.current.filter((el): el is HTMLSpanElement => el !== null);
      if (inners.length === 0) return;

      const rect = container.getBoundingClientRect();
      const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const originIndex = Math.round(clickRatio * (inners.length - 1));

      gsap.fromTo(
        inners,
        { yPercent: 0, scale: 1 },
        {
          keyframes: [
            { yPercent: -12, scale: 1.04, duration: 0.18, ease: 'power2.out' },
            { yPercent: 0, scale: 1, duration: 0.34, ease: 'power3.out' }
          ],
          stagger: {
            each: 0.034,
            from: originIndex
          },
          overwrite: 'auto'
        }
      );

      if (bars.length > 0) {
        gsap.fromTo(
          bars,
          { scaleX: 0, opacity: 1 },
          {
            keyframes: [
              { scaleX: 1, opacity: 1, duration: 0.2, ease: 'power2.out' },
              { scaleX: 0, opacity: 0, duration: 0.3, ease: 'power2.in' }
            ],
            stagger: {
              each: 0.034,
              from: originIndex
            },
            overwrite: 'auto'
          }
        );
      }
    };

    const onMouseEnter = () => {
      playSfx('hover');
    };

    container.addEventListener('mouseenter', onMouseEnter, { passive: true });
    container.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mouseleave', clearHover, { passive: true });
    container.addEventListener('click', onClickWave);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', clearHover);
      container.removeEventListener('click', onClickWave);
    };
  }, []);

  return (
    <div
      className="hero-name-wrap"
      ref={containerRef}
      data-cursor="interactive"
      title="Move cursor or click to interact with ArtSwapy"
    >
      {/* Centered founder introduction above the ArtSwapy wordmark */}
      <p className="hero-founder-byline hero-founder-byline-row hero-rise-item" style={{ '--i': 0 } as React.CSSProperties}>
        {hero.founderTitle}
      </p>

      <div className="hero-name-stage">
        <div className="hero-name-mask">
          <h1 className="hero-name" aria-label={site.name}>
            <span className="sr-only">
              {site.name} (Art Swapy) — Independent Brand Strategy, Visual Identity &amp; Packaging Design Studio by {site.founder}
            </span>
            {TITLE_CHARS.map((char, globalIndex) => (
              <span
                key={globalIndex}
                className="hero-char-mask"
                ref={(el) => {
                  charMasksRef.current[globalIndex] = el;
                }}
                onPointerEnter={() => {
                  playCharHover(globalIndex, TITLE_CHARS.length);
                }}
                aria-hidden="true"
              >
                <span
                  className="hero-char-inner"
                  ref={(el) => {
                    charInnersRef.current[globalIndex] = el;
                  }}
                >
                  <span
                    className="hero-char-roller"
                    ref={(el) => {
                      charRollersRef.current[globalIndex] = el;
                    }}
                  >
                    <span className="hero-char-glyph hero-char-primary">{char}</span>
                    <span className="hero-char-glyph hero-char-accent">{char}</span>
                  </span>
                </span>
                <span
                  className="hero-char-bar"
                  ref={(el) => {
                    charBarsRef.current[globalIndex] = el;
                  }}
                />
              </span>
            ))}
          </h1>
        </div>

        {/* Fine-Line 16x4 Architectural Grid Matrix Overlay */}
        <div className="hero-box-grid" aria-hidden="true">
          {Array.from({ length: TOTAL_CELLS }).map((_, i) => (
            <div
              key={i}
              className="grid-cell"
              ref={(el) => {
                cellsRef.current[i] = el;
              }}
            >
              <div className="grid-cell-tile" />
              <span className="grid-cell-corner tl" />
              <span className="grid-cell-corner tr" />
              <span className="grid-cell-corner bl" />
              <span className="grid-cell-corner br" />
            </div>
          ))}
        </div>

        {/* Interactive Micro HUD readout */}
        <div className="hero-grid-hud mono" ref={hudRef} aria-hidden="true">
          <span className="hud-badge">[ SPECIMEN ]</span>
          <span className="hud-char-badge">
            GLYPH <strong ref={hudCharRef}>A</strong>
          </span>
          <span className="hud-coords" ref={hudCoordRef}>
            01 : 01
          </span>
        </div>

        {/* Baseline Electric Orange Thread */}
        <span className="load-thread" aria-hidden="true" />
      </div>
    </div>
  );
}
