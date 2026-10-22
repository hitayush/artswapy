'use client';

import { useRef } from 'react';
import RevealRoot from '@/components/primitives/RevealRoot';
import Thread from '@/components/primitives/Thread';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap';
import { getLenis } from '@/lib/motion/lenis';
import type { ProcessStage } from '@/types/content';

const PIN_QUERY = '(min-width: 900px) and (min-height: 541px) and (prefers-reduced-motion: no-preference)';

/**
 * Signature move: the process stays pinned on the inverse field while one thread
 * ties five stages together. Rich editorial cards fill the space on both desktop and mobile.
 * Stage index lives in data attributes (no per-frame React state).
 */
export default function ProcessStory({ heading, stages }: { heading: string; stages: ProcessStage[] }) {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const count = stages.length;

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const layer = section.querySelector<HTMLElement>('.process-layer');
      if (!layer) return;
      const mm = gsap.matchMedia();

      mm.add(PIN_QUERY, () => {
        section.setAttribute('data-pinned', '');
        const items = Array.from(section.querySelectorAll<HTMLElement>('.stage'));
        const knots = Array.from(section.querySelectorAll<HTMLElement>('.knot'));
        const labels = Array.from(section.querySelectorAll<HTMLElement>('.label-btn'));
        const line = section.querySelector<HTMLElement>('.rail-line');
        let current = -1;

        const apply = (p: number) => {
          const idx = Math.min(count - 1, Math.floor(p * count));
          const x = Math.min(1, 0.1 + p);
          if (line) line.style.clipPath = `inset(0 ${(1 - x) * 100}% 0 0)`;
          if (idx === current) return;
          current = idx;
          items.forEach((li, i) => {
            li.dataset.state = i < idx ? 'past' : i === idx ? 'active' : 'before';
            if (i === idx) li.setAttribute('aria-current', 'step');
            else li.removeAttribute('aria-current');
          });
          knots.forEach((k, i) => {
            k.dataset.on = String(i <= idx);
            k.dataset.current = String(i === idx);
          });
          labels.forEach((l, i) => {
            if (i === idx) l.setAttribute('aria-current', 'step');
            else l.removeAttribute('aria-current');
          });
        };

        apply(0);
        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=350%',
          pin: true,
          pinSpacing: true,
          scrub: true,
          refreshPriority: 1,
          anticipatePin: 1,
          onUpdate: (self) => apply(self.progress)
        });
        trigger.current = st;

        /* Re-measure once fonts settle (nothing waits on them). */
        const refresh = () => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        };
        window.addEventListener('resize', refresh);
        window.addEventListener('orientationchange', refresh);
        document.fonts?.ready.then(refresh);

        ScrollTrigger.sort();
        ScrollTrigger.refresh();

        return () => {
          window.removeEventListener('resize', refresh);
          window.removeEventListener('orientationchange', refresh);
          st.kill();
          trigger.current = null;
          section.removeAttribute('data-pinned');
          items.forEach((li) => {
            delete li.dataset.state;
            li.removeAttribute('aria-current');
          });
          knots.forEach((k) => {
            delete k.dataset.on;
            delete k.dataset.current;
          });
          labels.forEach((l) => l.removeAttribute('aria-current'));
          if (line) line.style.clipPath = '';
        };
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  const jump = (i: number, keyboard: boolean) => {
    const st = trigger.current;
    if (!st) return;
    const y = st.start + ((i + 0.1) / count) * (st.end - st.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { immediate: keyboard });
    else window.scrollTo({ top: y });
  };

  return (
    <section ref={root} id="process" className="process" data-inverse-section aria-labelledby="process-title">
      <RevealRoot className="process-layer">
        <div className="process-header">
          <div className="process-kicker-row">
            <span className="eyebrow">[ FIVE-PHASE PROCESS ]</span>
            <span className="small muted">From Strategic Core to Brand Scale</span>
          </div>
          <h2 id="process-title" className="heading process-main-title">
            {heading}
          </h2>
        </div>

        <ol className="stages">
          {stages.map((s, i) => (
            <li className="stage" key={s.id} style={{ '--i': i } as React.CSSProperties}>
              {/* Left Column: Phase identity & narrative */}
              <div className="stage-main">
                <div className="stage-phase-tag">
                  <span className="eyebrow stage-phase-num">{s.phase || `Phase 0${i + 1}`}</span>
                  <span className="stage-index-badge">0{i + 1} / 0{count}</span>
                </div>

                <div className="thread-wrap">
                  <div className="name-mask">
                    <h3 className="poster poster-long">
                      <span className="stage-name">{s.name}</span>
                    </h3>
                  </div>
                  <Thread />
                </div>

                <p className="stage-line">{s.line}</p>
                {s.description && <p className="stage-desc">{s.description}</p>}

                <div className="stage-meta-row small">
                  <span className="stage-duration-tag">Timeline: {s.duration || '1–2 Weeks'}</span>
                  <span className="stage-meta-bullet" aria-hidden="true">·</span>
                  <span className="stage-collab-tag">Direct Founder Collaboration</span>
                </div>
              </div>

              {/* Right Column: Key Deliverables Card */}
              <div className="stage-card">
                <div className="stage-card-header">
                  <span className="eyebrow card-label">[ KEY DELIVERABLES ]</span>
                  <span className="small muted card-gives">{s.gives}</span>
                </div>

                {s.deliverables && s.deliverables.length > 0 && (
                  <ul className="stage-deliverables-list">
                    {s.deliverables.map((d, dIdx) => (
                      <li key={dIdx} className="deliverable-item">
                        <span className="deliverable-bullet" aria-hidden="true">✓</span>
                        <span className="deliverable-text">{d}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.output && (
                  <div className="stage-card-footer small">
                    <span className="output-kicker">OUTPUT:</span>
                    <strong className="output-text">{s.output}</strong>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="rail" aria-hidden="true">
          <span className="rail-line" />
          {stages.map((s, i) => (
            <span key={s.id} className="knot" style={{ left: `${10 + (80 / (count - 1)) * i}%` }} />
          ))}
        </div>

        <div className="labels">
          {stages.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className="label-btn"
              style={{ left: `${10 + (80 / (count - 1)) * i}%` }}
              onClick={(e) => jump(i, e.detail === 0)}
            >
              <span className="label-text">
                <span className="label-num">0{i + 1} </span>
                {s.name}
                <Thread absolute />
              </span>
            </button>
          ))}
        </div>
      </RevealRoot>
    </section>
  );
}
