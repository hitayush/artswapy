import { about, contact } from '@/content/site';
import { mailto } from '@/lib/mailto';
import AboutPin from './AboutPin.client';

export default function About() {
  return <AboutPin {...about} mailtoHref={mailto(contact.mailto)} />;
}
