'use client';

import { useState } from 'react';
import Thread from '@/components/primitives/Thread';
import type { Service } from '@/types/content';

/** Fold accordion. Hover previews, click or Enter pins; one open at a time. Keyboard focus is instant. */
export default function ServicesAccordion({ services }: { services: Service[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [instant, setInstant] = useState<string | null>(null);

  return (
    <ul>
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
            <div className="svc-head">
              <h3 className={poster}>
                <button
                  type="button"
                  className="svc-btn"
                  aria-expanded={isOpen}
                  aria-controls={`svc-${s.id}`}
                  id={`svc-btn-${s.id}`}
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  onFocus={(e) => setInstant(e.currentTarget.matches(':focus-visible') ? s.id : null)}
                  onBlur={() => setInstant(null)}
                >
                  <span className="svc-name">
                    {s.title}
                    <Thread drawn={isOpen || hover === s.id} absolute />
                  </span>
                  <span className="svc-plus" aria-hidden="true" />
                </button>
              </h3>
              <span className="svc-fact small-ish">{s.fact}</span>
              <div className="svc-desc" id={`svc-${s.id}`} role="region" aria-labelledby={`svc-btn-${s.id}`}>
                <div>
                  <p>{s.description}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
