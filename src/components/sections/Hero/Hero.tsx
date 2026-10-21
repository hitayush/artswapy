import CTAButton from '@/components/primitives/CTAButton';
import { contact, hero, site } from '@/content/site';
import { mailto } from '@/lib/mailto';
import HeroPortrait from './HeroPortrait.client';
import LoadThread from './LoadThread.client';

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label={site.name}>
      <div className="hero-name-wrap">
        <h1 className="hero-name">{site.name}</h1>
        <span className="load-thread" aria-hidden="true" />
      </div>
      <div className="hero-body">
        <div className="hero-portrait-slot">
          <HeroPortrait {...hero.portrait} />
        </div>
        <p className="hero-line hero-rise" style={{ '--i': 0 } as React.CSSProperties}>
          {hero.line}
        </p>
        <div className="hero-action hero-rise" style={{ '--i': 1 } as React.CSSProperties}>
          <CTAButton href={mailto(contact.mailto)} label={contact.cta} primaryAction />
        </div>
      </div>
      <LoadThread />
    </section>
  );
}
