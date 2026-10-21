const Arrow = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
    <path d="M2 9h13M10 3.5 15.5 9 10 14.5" />
  </svg>
);

/** Primary action: Needle pass. Pure CSS, so it works as a server component. */
export default function CTAButton({
  href,
  label,
  size = 'md',
  noArrow = false,
  block = false,
  primaryAction = false,
  ariaLabel
}: {
  href: string;
  label: string;
  size?: 'sm' | 'md';
  noArrow?: boolean;
  block?: boolean;
  primaryAction?: boolean;
  ariaLabel?: string;
}) {
  const chars = Array.from(label);
  return (
    <a
      href={href}
      className={`cta ${size === 'sm' ? 'sm' : ''} ${noArrow ? 'no-arrow' : ''} ${block ? 'block' : ''}`.trim()}
      data-primary-action={primaryAction ? '' : undefined}
      aria-label={ariaLabel ?? label}
    >
      <span className="label" aria-hidden="true">
        {chars.map((c, i) => {
          const ch = c === ' ' ? '\u00a0' : c;
          return (
            <span className="ch" style={{ '--i': i } as React.CSSProperties} key={i}>
              <span>{ch}</span>
              <span>{ch}</span>
            </span>
          );
        })}
        <span className="needle" />
      </span>
      <span className="arrow" aria-hidden="true">
        <Arrow />
        <Arrow />
      </span>
    </a>
  );
}
