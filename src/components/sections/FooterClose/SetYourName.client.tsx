'use client';

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import CTAButton from '@/components/primitives/CTAButton';
import { mailto, sanitize } from '@/lib/mailto';

interface Props {
  to: string;
  subject: string;
  body: string;
  cta: string;
  label: string;
  hint: string;
  placeholder: string;
  sample: string;
}

const MAX = 24;

/** "Set your name": the visitor's business name, set in the monument type and fitted to the width. */
export default function SetYourName({ to, subject, body, cta, label, hint, placeholder, sample }: Props) {
  const inputId = useId();
  const hintId = useId();
  const [value, setValue] = useState('');
  const [drawn, setDrawn] = useState(false);
  const [fit, setFit] = useState<{ size: number; lines: string[] }>({ size: 40, lines: [sample.toUpperCase()] });
  const wrap = useRef<HTMLDivElement>(null);
  const measure = useRef<HTMLSpanElement>(null);
  const btn = useRef<HTMLSpanElement>(null);

  const clean = sanitize(value).slice(0, MAX);
  const text = (clean || sample).toUpperCase();
  const href = mailto({ to, subject: clean ? `${subject} — ${clean}` : subject, body });

  const measureFit = useCallback(() => {
    const box = wrap.current;
    const m = measure.current;
    if (!box || !m) return;
    const width = (s: string) => {
      m.textContent = s;
      return m.getBoundingClientRect().width || 1;
    };
    const w = box.clientWidth;
    const cap = Math.min(92, Math.max(36, window.innerWidth * 0.064));
    const one = Math.min(cap, (w / width(text)) * 100);
    if (one >= 28 || !text.includes(' ')) {
      setFit({ size: one, lines: [text] });
      return;
    }
    // Two lines at the space nearest the middle; never three.
    const spaces = [...text.matchAll(/ /g)].map((s) => s.index ?? 0);
    const mid = text.length / 2;
    const cut = spaces.reduce((a, b) => (Math.abs(b - mid) < Math.abs(a - mid) ? b : a), spaces[0]);
    const lines = [text.slice(0, cut), text.slice(cut + 1)];
    const longest = Math.max(width(lines[0]), width(lines[1]));
    setFit({ size: Math.min(cap, (w / longest) * 100), lines });
  }, [text]);

  useLayoutEffect(() => {
    measureFit();
  }, [measureFit]);

  useEffect(() => {
    const box = wrap.current;
    if (!box) return;
    const ro = new ResizeObserver(measureFit);
    ro.observe(box);
    document.fonts?.ready.then(measureFit);
    return () => ro.disconnect();
  }, [measureFit]);

  /* The stitch draws when the preview enters view, and again on blur or Enter. */
  useEffect(() => {
    const box = wrap.current;
    if (!box) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);

  return (
    <div className="footer-name needs-js">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        className="name-input"
        type="text"
        value={value}
        maxLength={MAX}
        autoComplete="organization"
        enterKeyHint="send"
        spellCheck={false}
        placeholder={placeholder}
        aria-describedby={hintId}
        onChange={(e) => {
          setValue(e.target.value);
          setDrawn(false);
        }}
        onBlur={() => setDrawn(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setDrawn(true);
            btn.current?.querySelector('a')?.click();
          }
        }}
      />
      <p id={hintId} className="name-hint small">
        {hint}
      </p>
      <span ref={btn} className="footer-cta">
        <CTAButton href={href} label={cta} primaryAction />
      </span>
      <div className="name-preview" ref={wrap} aria-hidden="true">
        <span className="stitch" data-drawn={drawn} />
        <span className="typed" style={{ fontSize: fit.size }}>
          {fit.lines.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </span>
        <span className="measure" ref={measure} />
      </div>
    </div>
  );
}
