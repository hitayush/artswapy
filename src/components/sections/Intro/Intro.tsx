import RevealRoot from '@/components/primitives/RevealRoot';
import { intro } from '@/content/site';

const idx = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function Intro() {
  return (
    <RevealRoot as="section" id="expertise" className="intro expertise-section" aria-labelledby="intro-title">
      <div className="intro-inner wrap">
        {/* Section Kicker Row */}
        <div className="section-kicker-row intro-kicker-row" data-r="rise" style={idx(0)}>
          <span className="eyebrow">[ {intro.label} ]</span>
          {intro.sublabel && (
            <span className="small muted mono hide-mobile">
              {intro.sublabel}
            </span>
          )}
        </div>

        {/* Primary Poster Heading */}
        <div className="intro-heading-block">
          <h2 id="intro-title" className="poster intro-heading">
            <span className="mask" data-r="lines" style={idx(1)}>
              <span>{intro.heading}</span>
            </span>
          </h2>
        </div>

        {/* Two-Column Value Propositions Grid */}
        <div className="intro-pillars-grid grid12">
          {intro.points.map((point, i) => (
            <article
              key={point.kicker}
              className={`intro-pillar-card pillar-${i === 0 ? 'work' : 'get'}`}
              data-r="rise"
              style={idx(2 + i)}
            >
              <div className="pillar-header">
                <span className="pillar-index mono" aria-hidden="true">0{i + 1}</span>
                <span className="pillar-kicker mono">[ {point.kicker} ]</span>
              </div>
              <p className="pillar-statement">
                {point.statement}
              </p>
              <div className="pillar-accent-line" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </RevealRoot>
  );
}
