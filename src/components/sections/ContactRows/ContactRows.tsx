import CopyEmail from '@/components/primitives/CopyEmail';
import IconButton from '@/components/primitives/IconButton';
import PlaceholderTag from '@/components/primitives/PlaceholderTag';
import RevealRoot from '@/components/primitives/RevealRoot';
import { contact } from '@/content/site';
import { mailto } from '@/lib/mailto';

const idx = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function ContactRows() {
  const [email, whatsapp, location, availability] = contact.routes;
  return (
    <RevealRoot as="section" id="contact-channels" className="contact" aria-labelledby="contact-title" rootMargin="0px 0px -8% 0px">
      <div className="section-header contact-header">
        <div className="section-kicker-row">
          <span className="eyebrow" data-r="rise">[ DIRECT ENQUIRIES ]</span>
          <span className="small muted mono" data-r="rise">Response within 24–48h</span>
        </div>
        <div className="section-title-row">
          <h2 id="contact-title" className="heading" data-r="rise">
            Contact &amp; Availability
          </h2>
          <p className="small muted section-subtitle" data-r="rise">
            Reach out directly via email or WhatsApp to discuss a new brand, packaging system, or identity refresh.
          </p>
        </div>
      </div>

      <div className="contact-row" data-r="band" style={idx(0)}>
        <CopyEmail address={email.value} template={contact.mailto} />
        {email.placeholder && <PlaceholderTag />}
      </div>

      <div className="contact-row" data-r="band" style={idx(1)}>
        {/* Render as link if not a placeholder */}
        {whatsapp.placeholder ? (
          <span className="poster">{whatsapp.value}</span>
        ) : (
          <a href={whatsapp.value} target="_blank" rel="noopener noreferrer" className="poster" aria-label="Chat on WhatsApp (opens in new tab)">
            {whatsapp.label}
          </a>
        )}
        {whatsapp.placeholder && <PlaceholderTag />}
      </div>

      <div className="contact-row" data-r="band" style={idx(2)}>
        <span className="poster">{location.value}</span>
        {location.placeholder && <PlaceholderTag />}
      </div>

      <div className="contact-row" data-r="band" style={idx(3)}>
        <span className="poster poster-long">{availability.value}</span>
        {availability.placeholder && <PlaceholderTag />}
      </div>

      <div className="contact-row hello-row" data-r="band" style={idx(4)}>
        <a
          href={mailto(contact.mailto)}
          className="pull"
          aria-label={`Email Swapnil to start a project`}
          data-primary-action=""
        >
          <span className="poster cell-text">
            <TextLinkFace>{contact.hello}</TextLinkFace>
          </span>
          <IconButton tone="ink" />
        </a>
      </div>
    </RevealRoot>
  );
}

/* The whole row is the link, so the thread under the word is drawn by CSS on row hover/focus. */
function TextLinkFace({ children }: { children: string }) {
  return (
    <span className="hello-word">
      {children}
      <span className="thread thread-abs" aria-hidden="true" />
    </span>
  );
}
