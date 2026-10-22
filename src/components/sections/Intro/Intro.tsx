import RevealRoot from '@/components/primitives/RevealRoot';
import PlaceholderTag from '@/components/primitives/PlaceholderTag';
import Mark from '@/components/primitives/Mark';
import { intro } from '@/content/site';

const idx = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function Intro() {
  return (
    <RevealRoot as="section" id="studio" className="intro" aria-labelledby="intro-title">
      <h2 id="intro-title" className="poster">
        <span className="mask" data-r="lines" style={idx(0)}>
          <span>{intro.heading[0]}</span>
        </span>{' '}
        <span className="mask" data-r="lines" style={idx(1)}>
          <span>{intro.heading[1]}</span>
        </span>
      </h2>
      <div className="intro-captions grid12">
        <p className="cap-a" data-r="rise" style={idx(2)}>{intro.lead}</p>
        <p className="cap-b muted" data-r="rise" style={idx(3)}>{intro.body}</p>
      </div>
      <div className="panorama">
        <div className="shutter" data-r="shutter" role="img" aria-label={intro.panorama.alt}>
          <svg viewBox="0 0 1260 540" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
            {(['aaranya', 'common', 'habit'] as const).map((id, i) => (
              <svg key={id} x={i * 420} y={0} width={420} height={540} viewBox="0 0 420 540" preserveAspectRatio="xMidYMid slice">
                <Mark id={id} />
              </svg>
            ))}
          </svg>
        </div>
        <p className="panorama-credit small muted" data-r="rise" style={idx(5)}>{intro.panorama.credit}</p>
      </div>
    </RevealRoot>
  );
}
