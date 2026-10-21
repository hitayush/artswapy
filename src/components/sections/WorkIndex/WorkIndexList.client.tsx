'use client';

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useRef, useState } from 'react';
import Mark from '@/components/primitives/Mark';
import PlaceholderTag from '@/components/primitives/PlaceholderTag';
import { mailto } from '@/lib/mailto';
import type { MailtoTemplate, Project } from '@/types/content';

interface Props {
  projects: Project[];
  to: string;
  enquiry: { subjectPrefix: string; body: string };
}

/** Unzip rows with a fixed preview. Pointer-only motion; keyboard focus swaps instantly. */
export default function WorkIndexList({ projects, to, enquiry }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [instant, setInstant] = useState(false);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const x = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 400, damping: 40, mass: 0.6 });
  const transform = useMotionTemplate`translateX(${sx}px)`;

  const pct = (i: number, clientX: number) => {
    const r = rows.current[i]?.getBoundingClientRect();
    if (!r) return 0;
    return Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
  };

  const activate = (i: number, clientX: number | null, keyboard: boolean) => {
    setInstant(keyboard);
    if (i === active) return;
    const cx = clientX ?? 0;
    const prev = rows.current[active];
    // Origin-aware: the old band closes toward where the pointer left, the new one opens from where it entered.
    if (prev && clientX !== null) prev.style.setProperty('--x', `${pct(active, cx)}%`);
    const next = rows.current[i];
    if (next) {
      next.style.setProperty('--x', clientX !== null ? `${pct(i, cx)}%` : '0%');
      void next.offsetWidth; // commit the closed state before opening
    }
    setActive(i);
  };

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = rows.current[active]?.getBoundingClientRect();
    if (!r) return;
    x.set(Math.min(Math.max(e.clientX - r.left, 0), Math.max(0, r.width - 72)));
  };

  return (
    <div className="work-grid">
      <ul className="work-list" data-instant={instant ? '' : undefined} onPointerMove={onMove}>
        {projects.map((p, i) => (
          <li
            key={p.id}
            ref={(el) => {
              rows.current[i] = el;
            }}
            className="work-row"
            data-active={active === i}
            data-r="rise"
            style={{ '--i': i } as React.CSSProperties}
            onPointerEnter={(e) => e.pointerType === 'mouse' && activate(i, e.clientX, false)}
          >
            <a
              href={p.href ?? mailto({ to, subject: enquiry.subjectPrefix + p.name, body: enquiry.body } satisfies MailtoTemplate)}
              aria-label={`${p.name}, ${p.category}, concept project. Start a project like this`}
              onFocus={(e) => activate(i, null, e.currentTarget.matches(':focus-visible'))}
            >
              <span className="name poster">{p.name}</span>
              <span className="meta small muted" aria-hidden="true">
                <span className="main">
                  {p.category}
                  <br />
                  {p.year} · Concept
                </span>
                <span className="alt">Start one like this →</span>
              </span>
            </a>
            {active === i && (
              <motion.span className="thread-pos" aria-hidden="true" style={reduce ? undefined : { transform }}>
                <span className="thread thread-draw" data-drawn="true" />
              </motion.span>
            )}
          </li>
        ))}
      </ul>
      <div className="work-preview" data-r="rise" style={{ '--i': 2 } as React.CSSProperties}>
        <div className="preview-frame" role="img" aria-label={`Concept mark for ${projects[active].name}`}>
          {projects.map((p, i) => (
            <div className="mark-layer" key={p.id} data-active={active === i} aria-hidden="true">
              <Mark id={p.preview.mark} />
            </div>
          ))}
          <PlaceholderTag>Concept placeholder</PlaceholderTag>
        </div>
      </div>
    </div>
  );
}
