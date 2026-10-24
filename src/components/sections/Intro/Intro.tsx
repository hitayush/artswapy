import RevealRoot from '@/components/primitives/RevealRoot';
import { intro } from '@/content/site';

const idx = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function Intro() {
  return (
    <RevealRoot as="section" id="studio" className="intro" aria-labelledby="intro-title">
      <div className="section-kicker-row intro-kicker-row">
        <span className="eyebrow" data-r="rise" style={idx(0)}>
          [ MANIFESTO &amp; PRACTICE ]
        </span>
        <span className="small muted mono" data-r="rise" style={idx(0)}>
          Strategy · Identity · Packaging
        </span>
      </div>
      <h2 id="intro-title" className="poster intro-heading">
        <span className="mask" data-r="lines" style={idx(0)}>
          <span>{intro.heading[0]}</span>
        </span>{' '}
        <span className="mask" data-r="lines" style={idx(1)}>
          <span>{intro.heading[1]}</span>
        </span>
      </h2>
      <div className="intro-captions grid12">
        <p className="cap-a" data-r="rise" style={idx(2)}>
          {intro.lead}
        </p>
        <p className="cap-b muted" data-r="rise" style={idx(3)}>
          {intro.body}
        </p>
      </div>
    </RevealRoot>
  );
}
