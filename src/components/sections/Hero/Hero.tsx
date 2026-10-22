'use client';

import { site } from '@/content/site';
import { scrollToHash } from '@/lib/motion/lenis';
import LoadThread from './LoadThread.client';

export default function Hero() {
  const handleScrollDown = () => {
    scrollToHash('#showreel');
  };

  return (
    <section className="hero" id="top" aria-label={site.name}>
      {/* Centered monumental brand title matching DZ!NR reference */}
      <div className="hero-center hero-rise" style={{ '--i': 0 } as React.CSSProperties}>
        <div className="hero-name-wrap">
          <h1 className="hero-name">{site.name}</h1>
          <span className="load-thread" aria-hidden="true" />
        </div>
      </div>

      {/* Bottom meta bar with discipline, practice statement & interactive scroll cue */}
      <div className="hero-bottom-bar hero-rise" style={{ '--i': 1 } as React.CSSProperties}>
        <div className="hero-statements">
          <div className="hero-stat-block">
            <span className="hero-stat-kicker">Discipline</span>
            <p className="hero-stat-text">
              Strategy, Design,<br />Performance
            </p>
          </div>
          <div className="hero-stat-block">
            <span className="hero-stat-kicker">Studio Practice</span>
            <p className="hero-stat-text">
              Independent branding studio<br />working with founders.
            </p>
          </div>
        </div>

        <div className="hero-actions-wrap">
          <button
            type="button"
            className="hero-scroll-cue"
            onClick={handleScrollDown}
            aria-label="Scroll to showreel and manifesto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="scroll-arrow"
              aria-hidden="true"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <LoadThread />
    </section>
  );
}
