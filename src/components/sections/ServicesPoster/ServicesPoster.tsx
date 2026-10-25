import RevealRoot from '@/components/primitives/RevealRoot';
import { services } from '@/content/site';
import ServicesAccordion from './ServicesAccordion.client';

const idx = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function ServicesPoster() {
  return (
    <RevealRoot as="section" id="services" className="services" aria-labelledby="services-title">
      <div className="services-exit-veil" aria-hidden="true" />
      <div className="services-inner">
        <div className="section-header services-header">
          <div className="section-kicker-row">
            <span className="eyebrow" data-r="rise" style={idx(0)}>
              [ CAPABILITIES &amp; SCOPE ]
            </span>
          </div>
          <div className="section-title-row">
            <h2 id="services-title" className="heading" data-r="rise" style={idx(1)}>
              {services.heading}
            </h2>
            <p className="small muted section-subtitle" data-r="rise" style={idx(2)}>
              {services.subtitle}
            </p>
          </div>
        </div>
        <ServicesAccordion services={services.items} />
      </div>
    </RevealRoot>
  );
}
