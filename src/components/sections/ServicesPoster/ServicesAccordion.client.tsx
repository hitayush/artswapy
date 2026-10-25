'use client';

import { useState } from 'react';
import Thread from '@/components/primitives/Thread';
import { scrollToHash } from '@/lib/motion/lenis';
import { playSfx } from '@/lib/audio/sfx';
import type { Service } from '@/types/content';

/**
 * Editorial Services Accordion.
 * Clicking a service row unfolds the big definition directly BELOW with smooth height expansion and vibrant accent colors.
 */
export default function ServicesAccordion({ services }: { services: Service[] }) {
  // Let the first service be open by default for immediate impact, or allow toggling any item
  const [open, setOpen] = useState<string | null>(services[0]?.id ?? null);
  const [hover, setHover] = useState<string | null>(null);
  const [instant, setInstant] = useState<string | null>(null);

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
            {/* Clickable Header Row: Click triggers the big definition to come below */}
            <button
              type="button"
              className="svc-row-btn"
              aria-expanded={isOpen}
              aria-controls={`svc-drawer-${s.id}`}
              id={`svc-btn-${s.id}`}
              onClick={() => {
                playSfx('drawer');
                setOpen(isOpen ? null : s.id);
              }}
              onFocus={(e) => setInstant(e.currentTarget.matches(':focus-visible') ? s.id : null)}
              onBlur={() => setInstant(null)}
            >
              <div className="svc-left-group">
                <span className="svc-index mono">0{i + 1}</span>
                <h3 className={`${poster} svc-title`}>
                  <span className="svc-name">
                    {s.title}
                    <Thread drawn={isOpen || hover === s.id} absolute />
                  </span>
                </h3>
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

            {/* The Big Definition Drawer — unfolds smoothly directly BELOW */}
            <div
              className="svc-drawer"
              id={`svc-drawer-${s.id}`}
              role="region"
              aria-labelledby={`svc-btn-${s.id}`}
              aria-hidden={!isOpen}
            >
              <div className="svc-drawer-inner">
                <div className="svc-drawer-card">
                  <div className="svc-card-header">
                    <span className="eyebrow svc-card-kicker">[ SERVICE FOCUS &amp; SCOPE ]</span>
                    <span className="svc-card-badge mono">{s.fact}</span>
                  </div>

                  <p className="svc-big-definition">
                    {s.description}
                  </p>

                  <div className="svc-card-footer">
                    <a
                      href="#contact"
                      className="svc-action-link"
                      onClick={handleDiscuss}
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
