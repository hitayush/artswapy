import CTAButton from '@/components/primitives/CTAButton';
import RevealRoot from '@/components/primitives/RevealRoot';
import TextLink from '@/components/primitives/TextLink';
import { contact, navLinks, site } from '@/content/site';
import { mailto } from '@/lib/mailto';

const CONTACT_ICONS = [
  {
    id: 'email',
    title: `Email: ${site.email.address}`,
    href: mailto(contact.mailto),
    external: false,
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: 'phone',
    title: `Call: ${site.phone.display}`,
    href: `tel:${site.phone.value}`,
    external: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    title: `WhatsApp: ${site.phone.display}`,
    href: site.phone.whatsapp,
    external: true,
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    title: 'Instagram: @artswapy',
    href: 'https://instagram.com/artswapy',
    external: true,
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    title: 'YouTube: @artswapy',
    href: 'https://youtube.com/@artswapy',
    external: true,
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    title: 'LinkedIn: Swapnil Gathibandhe',
    href: 'https://linkedin.com/in/swapnil-gathibandhe',
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function FooterClose() {
  const ctaDestination = contact.bookingUrl ?? mailto(contact.mailto);

  return (
    <RevealRoot
      as="footer"
      id="contact"
      className="footer"
      aria-label="Site footer and contact details"
      data-inverse-section=""
      rootMargin="0px 0px -5% 0px"
    >
      <div className="footer-top grid12">
        {/* Top Left: Closing CTA */}
        <div className="footer-closing-cta">
          <div className="footer-tag-wrap" data-r="rise">
            <span className="ph-tag orange-tag mono">{contact.tag}</span>
          </div>

          <h2 className="footer-invite poster">
            <span className="footer-invite-line mask" data-r="lines">
              <span className="footer-invite-text">{contact.heading[0]}</span>
            </span>
            <span className="footer-invite-line mask" data-r="lines" style={{ '--i': 1 } as React.CSSProperties}>
              <span className="footer-invite-text">{contact.heading[1]}</span>
            </span>
          </h2>

          <p className="footer-body body muted" data-r="rise">
            {contact.body}
          </p>

          <div className="footer-cta-action" data-r="rise">
            <CTAButton
              href={ctaDestination}
              label={contact.cta}
              primaryAction
            />
          </div>
        </div>

        {/* Top Right: Navigation Index & Minimal Social / Contact Icons */}
        <div className="footer-links-col">
          <span className="eyebrow footer-col-label mono">[ INDEX ]</span>
          <ul className="footer-links">
            {navLinks.map((n) => (
              <li key={n.href}>
                <TextLink href={n.href}>{n.label}</TextLink>
              </li>
            ))}
          </ul>

          <div className="footer-icons-dock" role="list" aria-label="Direct contact and social profiles">
            {CONTACT_ICONS.map((item) => (
              <a
                key={item.id}
                role="listitem"
                href={item.href}
                className="footer-icon-link"
                title={item.title}
                aria-label={item.title}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-credits small">
          <span>{site.credits.left} · {site.credits.right}</span>
          <span className="footer-dev-credit">
            Developed with ❤️ &amp; ☕ by{' '}
            <a
              href="https://www.hitayush.space/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hitayush Dange portfolio (opens in a new tab)"
            >
              Hitayush Dange
            </a>
          </span>
        </div>
        <div className="wordmark-big" aria-hidden="true">
          <span>{site.name}</span>
        </div>
      </div>
    </RevealRoot>
  );
}
