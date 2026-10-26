"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

// Global custom cursor adapted from ClimbX (components/effects/cursor.tsx)
// and styled as an ArtSwapy design element (--accent #ff551f & --on-accent #161614).
//
// Position is a bare rAF lerp — no springs, no React state on every frame, no per-frame
// allocation, and the loop parks itself once it catches up. Velocity drives the directional
// stretch/pinch deformation on `blendSkew`, while scale and the click swell stay pure CSS.
//
// Opt in per element with data-cursor="explore" | "button" | "none"; plain <a>/<button>
// get the button state for free, and project/media cards get the explore state.
const BASE = 96; // px — every state is a scale of this, so we only ever animate transform
const SCALE = { dot: 9 / BASE, button: 44 / BASE, explore: 72 / BASE };
// Fraction of the remaining gap closed per frame. 0.36 gives an ultra-responsive, silky feel on 60/120/144Hz displays
const LERP = 0.36;
const SETTLED = 0.05; // px — sub-pixel, so parking the loop here is invisible, not a snap
const STRETCH_AT = 260; // px of lag that would mean full deformation
const MAX_STRETCH = 0.34; // hard cap — past this the dot reads as a smear, not a cursor
// Click swell on empty space
const PULSE_MAX = 2; // 9px dot → 18px at full swell
const SWELL_UP = "190ms";
const SWELL_DOWN = "480ms"; // out slower than in — a fast return reads as a twitch

type Mode = keyof typeof SCALE;

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("dot");
  const [onOrange, setOnOrange] = useState(false);
  const [away, setAway] = useState(false); // pointer has left the window
  const blend = useRef<HTMLDivElement>(null);
  const blendSkew = useRef<HTMLDivElement>(null);
  const disc = useRef<HTMLDivElement>(null);
  // The deform loop runs outside React, so it needs the mode as a ref, not as state.
  const modeRef = useRef<Mode>("dot");

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    let tx = -200;
    let ty = -200;
    let cx = -200;
    let cy = -200;
    let raf = 0;
    let running = false;

    const write = (stretch = 0, angle = 0) => {
      const move = `translate3d(${cx}px, ${cy}px, 0)`;
      if (blend.current) blend.current.style.transform = move;
      // Only the dot/button deforms; explore stays perfectly round so the arrow never spins.
      const deform =
        modeRef.current === "explore"
          ? "none"
          : `rotate(${angle}rad) scale(${1 + stretch}, ${1 - stretch})`;
      if (blendSkew.current) blendSkew.current.style.transform = deform;
    };

    const loop = () => {
      const dx = tx - cx;
      const dy = ty - cy;
      cx += dx * LERP;
      cy += dy * LERP;
      if (Math.abs(dx) < SETTLED && Math.abs(dy) < SETTLED) {
        cx = tx;
        cy = ty;
        write(); // back to a perfect circle
        running = false; // caught up — stop burning frames until the pointer moves
        return;
      }
      write(Math.min(Math.hypot(dx, dy) / STRETCH_AT, MAX_STRETCH), Math.atan2(dy, dx));
      raf = requestAnimationFrame(loop);
    };

    const wake = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setAway((a) => (a ? false : a));
      wake();
    };

    // pointerover fires on every target change, so it doubles as "what am I on now?"
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const isOrangeTarget = Boolean(
        target?.closest?.(".cta, .card-featured .project-circle-btn")
      );
      setOnOrange((prev) => (prev === isOrangeTarget ? prev : isOrangeTarget));

      const el = target?.closest?.(
        "[data-cursor],a,button,[role='button'],.work-h-project-card,.project-card-frame,.cs-hero-media"
      );
      const flag = el?.getAttribute("data-cursor");
      const isExploreCard = Boolean(
        el?.matches?.(".work-h-project-card,.project-card-frame,.cs-hero-media")
      );

      const next: Mode =
        flag === "explore" || isExploreCard
          ? "explore"
          : flag === "none" || !el
            ? "dot"
            : flag === "button" ||
                flag === "interactive" ||
                el.tagName === "A" ||
                el.tagName === "BUTTON" ||
                el.getAttribute("role") === "button"
              ? "button"
              : "dot";

      modeRef.current = next;
      setMode((m) => (m === next ? m : next));
    };

    // Click on nothing in particular → the dot swells and falls back.
    const onDown = (e: PointerEvent) => {
      if (
        (e.target as HTMLElement | null)?.closest?.(
          "a,button,[role='button'],input,textarea,select,[data-cursor],.work-h-project-card,.project-card-frame,.cs-hero-media"
        )
      )
        return;
      const el = disc.current;
      if (!el) return;
      el.style.transitionDuration = SWELL_UP;
      el.style.transform = `scale(${PULSE_MAX})`;
    };

    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) setAway(true);
    };
    const onIn = () => setAway(false);
    const onBlur = () => setAway(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.addEventListener("mouseover", onIn, { passive: true });
    window.addEventListener("blur", onBlur, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseover", onIn);
    };
  }, []);

  // The swell falls back the moment it lands.
  const onSwelled = () => {
    const el = disc.current;
    if (!el || el.style.transform === "scale(1)") return;
    el.style.transitionDuration = SWELL_DOWN;
    el.style.transform = "scale(1)";
  };

  if (!enabled) return null;

  const box = { width: BASE, height: BASE, marginLeft: -BASE / 2, marginTop: -BASE / 2 } as const;
  const morph = "transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]";

  // ArtSwapy design tokens for each state:
  // - dot (9px): solid ArtSwapy Electric Orange (--accent: #ff551f)
  // - button (44px): translucent orange lens + crisp orange ring (or near-black ink ring on orange CTAs)
  // - explore (72px): solid ArtSwapy Electric Orange disc with near-black ink ArrowUpRight
  const discStyle: React.CSSProperties =
    mode === "button"
      ? onOrange
        ? {
            backgroundColor: "rgba(22, 22, 20, 0.16)",
            boxShadow: "inset 0 0 0 3.5px var(--on-accent, #161614)",
          }
        : {
            backgroundColor: "rgba(255, 85, 31, 0.16)",
            boxShadow: "inset 0 0 0 3.5px var(--accent, #ff551f)",
          }
      : {
          backgroundColor: "var(--accent, #ff551f)",
          boxShadow:
            mode === "explore"
              ? "0 12px 28px -6px rgba(255, 85, 31, 0.45), inset 0 0 0 2px rgba(22, 22, 20, 0.14)"
              : "none",
        };

  return (
    <div
      aria-hidden="true"
      ref={blend}
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ transform: "translate3d(-200px, -200px, 0)", contain: "layout style size" }}
    >
      <div ref={blendSkew} style={box}>
        <div
          className={`relative h-full w-full ${morph}`}
          style={{ transform: `scale(${away ? 0 : SCALE[mode]})` }}
        >
          <div
            ref={disc}
            onTransitionEnd={onSwelled}
            className="h-full w-full rounded-full transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={discStyle}
          />
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-150"
            style={{
              opacity: mode === "explore" ? 1 : 0,
              color: "var(--on-accent, #161614)",
            }}
          >
            <ArrowUpRight size={34} strokeWidth={2.25} />
          </div>
        </div>
      </div>
    </div>
  );
}
