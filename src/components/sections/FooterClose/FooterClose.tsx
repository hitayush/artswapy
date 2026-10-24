import CTAButton from '@/components/primitives/CTAButton';
import RevealRoot from '@/components/primitives/RevealRoot';
import TextLink from '@/components/primitives/TextLink';
import { contact, navLinks, site } from '@/content/site';
import { mailto } from '@/lib/mailto';
import SetYourName from './SetYourName.client';

export default function FooterClose() {
  return (
    <RevealRoot as="footer" id="contact" className="footer" aria-label="Site footer and contact" data-inverse-section="" rootMargin="0px 0px -5% 0px">
      <div className="footer-top grid12">
        <h2 className="footer-invite poster">
          <span className="mask" data-r="lines">
            <span>{contact.heading[0]}</span>
          </span>{' '}
          <span className="mask" data-r="lines" style={{ '--i': 1 } as React.CSSProperties}>
            <span>{contact.heading[1]}</span>
          </span>
        </h2>

        {/* Desktop interactive name-scrambler */}
        <div className="hide-mobile footer-name-wrap">
          <SetYourName
            to={contact.mailto.to}
            subject={contact.mailto.subject}
            body={contact.mailto.body}
            cta={contact.cta}
            {...contact.setName}
          />
        </div>

        {/* Smartphone direct action button */}
        <div className="show-mobile-block footer-mobile-cta">
          <CTAButton
            href={mailto(contact.mailto)}
            label="Start a project"
            block
          />
        </div>

        <ul className="footer-links">
          {navLinks.map((n) => (
            <li key={n.href}>
              <TextLink href={n.href}>{n.label}</TextLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-bottom">
        <div className="footer-credits small">
          <span>{site.credits.left}</span>
          <span>{site.credits.right}</span>
        </div>
        <div className="wordmark-big" aria-hidden="true">
          <span>{site.name}</span>
        </div>
      </div>
    </RevealRoot>
  );
}
