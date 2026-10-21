import CopyEmail from '@/components/primitives/CopyEmail';
import PlaceholderTag from '@/components/primitives/PlaceholderTag';
import RevealRoot from '@/components/primitives/RevealRoot';
import TextLink from '@/components/primitives/TextLink';
import { contact, navLinks, site } from '@/content/site';
import SetYourName from './SetYourName.client';

export default function FooterClose() {
  const whatsapp = contact.routes[1];
  return (
    <RevealRoot as="footer" className="footer" aria-label="Start a project" data-inverse-section="" rootMargin="0px 0px -5% 0px">
      <div className="footer-top grid12">
        <h2 className="footer-invite poster">
          <span className="mask" data-r="lines">
            <span>{contact.heading[0]}</span>
          </span>{' '}
          <span className="mask" data-r="lines" style={{ '--i': 1 } as React.CSSProperties}>
            <span>{contact.heading[1]}</span>
          </span>
        </h2>

        <SetYourName
          to={contact.mailto.to}
          subject={contact.mailto.subject}
          body={contact.mailto.body}
          cta={contact.cta}
          {...contact.setName}
        />

        <ul className="footer-links">
          <li>
            <CopyEmail address={site.email.address} variant="button" template={contact.mailto} />
          </li>
          <li>
            <span style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {whatsapp.value}
              {whatsapp.placeholder && <PlaceholderTag />}
            </span>
          </li>
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
