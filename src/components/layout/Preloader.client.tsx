'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/motion/gsap';

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      // Smooth organic increment: 1 to 3% each tick
      progress += Math.floor(Math.random() * 3) + 1;
      if (progress >= 100) {
        progress = 100;
        setCount(100);
        clearInterval(interval);

        // Curtain lift animation after brief pause at 100%
        setTimeout(() => {
          if (!containerRef.current) return;
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.85,
            ease: 'power4.inOut',
            onComplete: () => {
              setIsDone(true);
              document.documentElement.dataset.loaded = 'true';
              document.documentElement.dataset.intro = 'play';
            }
          });
        }, 180);
      } else {
        setCount(progress);
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  if (isDone) return null;

  return (
    <aside
      ref={containerRef}
      className="preloader"
      aria-label="Loading ArtSwapy website"
      role="status"
    >
      <div className="preloader-inner">
        <div className="preloader-top">
          <span className="small muted mono">ArtSwapy — Studio Practice</span>
          <span className="small muted mono">[ 2026 ]</span>
        </div>

        <div className="preloader-center">
          <div className="preloader-mark">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="48" height="48" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="30" cy="30" r="13" stroke="var(--accent)" strokeWidth="2" />
              <line x1="6" y1="6" x2="54" y2="54" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
            </svg>
          </div>
          <div className="preloader-brand">ARTSWAPY</div>
          <p className="small muted preloader-tagline">Meaning first, then the form.</p>
        </div>

        <div className="preloader-bottom">
          <div className="preloader-counter">
            <span className="count-num">{String(count).padStart(2, '0')}</span>
            <span className="count-pct">%</span>
          </div>
          <div className="preloader-status small muted mono">
            {count < 100 ? 'Calibrating typography & identity…' : 'Complete'}
          </div>
        </div>
      </div>

      {/* Orange stitch progress thread */}
      <div
        ref={threadRef}
        className="preloader-thread"
        style={{ width: `${count}%` }}
        aria-hidden="true"
      />
    </aside>
  );
}
