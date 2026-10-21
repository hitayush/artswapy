import RevealRoot from '@/components/primitives/RevealRoot';
import { services } from '@/content/site';
import ServicesAccordion from './ServicesAccordion.client';

export default function ServicesPoster() {
  return (
    <RevealRoot as="section" id="services" className="services" aria-labelledby="services-title">
      <h2 id="services-title" className="sr-only">
        {services.heading}
      </h2>
      <ServicesAccordion services={services.items} />
    </RevealRoot>
  );
}
