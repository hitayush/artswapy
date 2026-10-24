'use client';

import { about, site } from '@/content/site';
import { scrollToHash } from '@/lib/motion/lenis';
import LoadThread from './LoadThread.client';
import HeroPreloader from './HeroPreloader.client';
import HeroTitle from './HeroTitle.client';

export default function Hero() {
  const handleScrollDown = () => {
    scrollToHash('#showreel');
  };

  return (
    <>
      {/* High-contrast, short editorial loading screen & curtain */}
      <HeroPreloader />

      <section className="hero" id="top" aria-label={site.name}>
        {/* Quiet, fine-line architectural background grid */}
        <div className="hero-bg-grid" aria-hidden="true">
          <div className="hero-bg-grid-lines" />
          <div className="hero-bg-columns">
            <span className="hero-col-guide" />
            <span className="hero-col-guide" />
            <span className="hero-col-guide hide-mobile" />
            <span className="hero-col-guide hide-mobile" />
          </div>
        </div>

        {/* Top editorial specimen bar aligned to the 12-column grid */}
        <div className="hero-top-bar">
          <div className="hero-top-cell hero-top-left hero-rise-item" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="hero-index-dot" aria-hidden="true" />
            <span className="mono">01 // BRAND SYSTEMS &amp; DIRECTION</span>
          </div>
          <div className="hero-top-cell hero-top-mid mono hide-mobile hero-rise-item" style={{ '--i': 1 } as React.CSSProperties}>
            <span>STRATEGY · VISUAL IDENTITY · PACKAGING</span>
          </div>
          <div className="hero-top-cell hero-top-right mono hero-rise-item" style={{ '--i': 2 } as React.CSSProperties}>
            <span>{about.location}</span>
          </div>
        </div>

        {/* Centered monumental ART SWAPY wordmark with architectural specimen grid */}
        <div className="hero-center">
          <HeroTitle />
        </div>

        {/* Bottom metadata bar aligned to the 12-column layout grid */}
        <div className="hero-bottom-bar">
          <div className="hero-stat-block hero-col-discipline hide-mobile hero-rise-item" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="hero-stat-kicker">Discipline</span>
            <p className="hero-stat-text">
              Strategy, Identity,<br />Packaging &amp; Digital
            </p>
          </div>

          <div className="hero-stat-block hero-col-practice hero-rise-item" style={{ '--i': 1 } as React.CSSProperties}>
            <span className="hero-stat-kicker">Studio Practice</span>
            <p className="hero-stat-text">
              Independent branding studio led by<br />{about.name}, working with founders.
            </p>
          </div>

          <div className="hero-stat-block hero-col-focus hide-mobile hero-rise-item" style={{ '--i': 2 } as React.CSSProperties}>
            <span className="hero-stat-kicker">Deliverables</span>
            <p className="hero-stat-text">
              Complete brand worlds<br />built to endure.
            </p>
          </div>

          <div className="hero-actions-wrap hero-col-action hero-rise-item" style={{ '--i': 3 } as React.CSSProperties}>
            <span className="hero-scroll-label mono hide-mobile">Scroll</span>
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
    </>
  );
}
