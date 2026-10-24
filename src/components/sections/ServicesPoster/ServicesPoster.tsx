import RevealRoot from '@/components/primitives/RevealRoot';
import { services } from '@/content/site';
import ServicesAccordion from './ServicesAccordion.client';

const idx = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function ServicesPoster() {
  return (
    <RevealRoot as="section" id="services" className="services" aria-labelledby="services-title">
      <div className="section-header services-header">
        <div className="section-kicker-row">
          <span className="eyebrow" data-r="rise" style={idx(0)}>
            [ CAPABILITIES &amp; SCOPE ]
          </span>
          <span className="small muted mono" data-r="rise" style={idx(0)}>
            01 — 05 Pillars
          </span>
        </div>
        <div className="section-title-row">
          <h2 id="services-title" className="heading" data-r="rise" style={idx(1)}>
            {services.heading}
          </h2>
          <p className="small muted section-subtitle" data-r="rise" style={idx(2)}>
            Complete brand systems built from strategic positioning through tactile packaging and digital applications.
          </p>
        </div>
      </div>
      <ServicesAccordion services={services.items} />
    </RevealRoot>
  );
}
