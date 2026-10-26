import { hero, site } from '@/content/site';
import LoadThread from './LoadThread.client';
import HeroPreloader from './HeroPreloader.client';
import HeroTitle from './HeroTitle.client';
import ThemeToggle from '@/components/primitives/ThemeToggle.client';

const STAT_CLASSES = [
  'hero-col-discipline hide-mobile',
  'hero-col-practice',
  'hero-col-focus hide-mobile'
];

export default function Hero() {
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

        {/* Centered monumental ART SWAPY wordmark with architectural specimen grid */}
        <div className="hero-center">
          <HeroTitle />
        </div>

        {/* Bottom metadata bar aligned to the 12-column layout grid */}
        <div className="hero-bottom-bar">
          {hero.stats.map((stat, idx) => {
            const lines = stat.text.split(' / ');
            return (
              <div
                key={stat.kicker}
                className={`hero-stat-block ${STAT_CLASSES[idx] ?? ''} hero-rise-item`.trim()}
                style={{ '--i': idx } as React.CSSProperties}
              >
                <span className="hero-stat-kicker">{stat.kicker}</span>
                <p className="hero-stat-text">
                  {lines.map((line, lIdx) => (
                    <span key={lIdx}>
                      {line}
                      {lIdx < lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            );
          })}

          <div className="hero-actions-wrap hero-col-action hero-rise-item" style={{ '--i': 3 } as React.CSSProperties}>
            <ThemeToggle variant="circle" showLabel labelPosition="left" />
          </div>
        </div>

        <LoadThread />
      </section>
    </>
  );
}
