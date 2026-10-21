import type { MailtoTemplate } from '@/types/content';

/** Strip control characters and trim user-provided text. */
export function sanitize(input: string): string {
  // eslint-disable-next-line no-control-regex
  return input.replace(/[\u0000-\u001f\u007f]/g, '').trim();
}

/** Build a mailto: URL with encoded subject and body (CRLF newlines). */
export function mailto({ to, subject, body }: MailtoTemplate): string {
  const crlf = body.replace(/\r?\n/g, '\r\n');
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(crlf)}`;
}
