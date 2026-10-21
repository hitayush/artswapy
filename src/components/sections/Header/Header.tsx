import { contact, navLinks, site } from '@/content/site';
import { mailto } from '@/lib/mailto';
import HeaderClient from './HeaderClient';

export default function Header() {
  return (
    <HeaderClient
      name={site.name}
      nav={navLinks}
      cta={contact.cta}
      mailto={mailto(contact.mailto)}
      address={site.email.address}
      template={contact.mailto}
    />
  );
}
