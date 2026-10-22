'use client';

import { useReducedMotion } from 'motion/react';
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

  const pct = (i: number, clientX: number) => {
    const r = rows.current[i]?.getBoundingClientRect();
    if (!r) return 0;
    return Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
  };

  const activate = (i: number, clientX: number | null, keyboard: boolean) => {
    setInstant(keyboard);
    if (i === active) return;

    const cx = clientX ?? 0;

    // Close old band
    const prev = rows.current[active];
    if (prev && clientX !== null) {
      prev.style.setProperty('--x', `${pct(active, cx)}%`);
    }

    // Open new band from entry X
    const next = rows.current[i];
    if (next) {
      next.style.setProperty('--x', clientX !== null ? `${pct(i, cx)}%` : '0%');
      void next.offsetWidth; // commit the closed state before opening
    }

    setActive(i);
  };

  return (
    <div className="work-grid">
      <ul className="work-list" data-instant={instant ? '' : undefined}>
        {projects.map((p, i) => (
          <li
            key={p.id}
            ref={(el) => {
              rows.current[i] = el;
            }}
            className="work-row"
            data-active={active === i}
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
          </li>
        ))}
      </ul>
      <div className="work-preview">
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
