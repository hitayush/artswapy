'use client';

import { useRef, useState } from 'react';
import Thread from '@/components/primitives/Thread';
import { scrollToHash } from '@/lib/motion/lenis';
import { hasUserGestureOccurred, isPageScrolling, playSfx } from '@/lib/audio/sfx';
import type { Service } from '@/types/content';

/**
 * Editorial Services Accordion.
 * Clicking a service row unfolds the big definition directly BELOW with smooth height expansion and vibrant accent colors.
 */
export default function ServicesAccordion({ services }: { services: Service[] }) {
  // All services must be closed on initial page load
  const [open, setOpen] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [instant, setInstant] = useState<string | null>(null);

  // Track which service title is currently entered by mouse to ensure exactly one sound per entry
  const hoveredServiceIdRef = useRef<string | null>(null);

  const handleTitlePointerEnter = (serviceId: string, e: React.PointerEvent) => {
    // 1. Mouse pointer only (strictly reject touch, pen, etc.)
    if (e.pointerType !== 'mouse') return;
    // 2. Do not play sound while page is scrolling
    if (isPageScrolling()) return;
    // 3. Do not attempt playback if audio has not been unlocked by a genuine user gesture
    if (!hasUserGestureOccurred()) return;
    // 4. Play sound once per entry, not continuously during pointer movement
    if (hoveredServiceIdRef.current === serviceId) return;
    hoveredServiceIdRef.current = serviceId;
    playSfx('hover');
  };

  const handleTitlePointerLeave = (serviceId: string, e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    if (hoveredServiceIdRef.current === serviceId) {
      hoveredServiceIdRef.current = null;
    }
  };

  const handleDiscuss = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToHash('#contact');
  };

  return (
    <ul className="services-list">
      {services.map((s, i) => {
        const isOpen = open === s.id;
        const poster = s.title.length > 12 ? 'poster poster-long' : 'poster';
        return (
          <li
            key={s.id}
            className="svc"
            data-open={isOpen}
            data-hover={hover === s.id}
            data-instant={instant === s.id ? '' : undefined}
            data-r="rise"
            style={{ '--i': i } as React.CSSProperties}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(s.id)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(null)}
          >
            {/* Clickable Header Row: Click, tap, or keyboard-activate triggers the definition below */}
            <h3 className="svc-title">
              <button
                type="button"
                className="svc-row-btn"
                data-no-sfx
                aria-expanded={isOpen}
                aria-controls={`svc-drawer-${s.id}`}
                id={`svc-btn-${s.id}`}
                onClick={() => {
                  playSfx('drawer');
                  setOpen((prev) => (prev === s.id ? null : s.id));
                }}
                onFocus={(e) => setInstant(e.currentTarget.matches(':focus-visible') ? s.id : null)}
                onBlur={() => setInstant(null)}
              >
                <div className="svc-left-group">
                  <span className="svc-index mono">0{i + 1}</span>
                  <span
                    className={`${poster} svc-name`}
                    onPointerEnter={(e) => handleTitlePointerEnter(s.id, e)}
                    onPointerLeave={(e) => handleTitlePointerLeave(s.id, e)}
                  >
                    {s.title}
                    <Thread drawn={isOpen || hover === s.id} absolute />
                  </span>
                </div>

                <div className="svc-right-group">
                  <span className="svc-fact-badge mono" id={`svc-fact-${s.id}`}>
                    {s.fact}
                  </span>
                  <span className="svc-toggle-circle" aria-hidden="true">
                    <span className="svc-plus-icon" />
                  </span>
                </div>
              </button>
            </h3>

            {/* The Big Definition Drawer — unfolds smoothly directly BELOW */}
            <div
              className="svc-drawer"
              id={`svc-drawer-${s.id}`}
              role="region"
              aria-labelledby={`svc-btn-${s.id}`}
              aria-hidden={!isOpen}
              inert={!isOpen ? true : undefined}
            >
              <div className="svc-drawer-inner">
                <div className="svc-drawer-card">
                  <div className="svc-card-header">
                    <span className="eyebrow svc-card-kicker">[ SERVICE FOCUS &amp; SCOPE ]</span>
                  </div>

                  <p className="svc-big-definition">
                    {s.description}
                  </p>

                  <div className="svc-card-footer">
                    <a
                      href="#contact"
                      className="svc-action-link"
                      onClick={handleDiscuss}
                      tabIndex={isOpen ? 0 : -1}
                      aria-label={`Enquire about ${s.title}`}
                    >
                      <span className="svc-action-text">Enquire about {s.title}</span>
                      <span className="svc-action-arrow" aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
