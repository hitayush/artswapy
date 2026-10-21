const Arrow = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
    <path d="M2 9h13M10 3.5 15.5 9 10 14.5" />
  </svg>
);

/** Square, decorative icon block. Put it inside an element with class `pull` so hover plays the pull-through. */
export default function IconButton({ tone = 'surface' }: { tone?: 'surface' | 'ink' }) {
  return (
    <span className={`icon-btn ${tone === 'ink' ? 'ink' : ''}`.trim()} aria-hidden="true">
      <span className="glyph">
        <Arrow />
        <Arrow />
      </span>
    </span>
  );
}
