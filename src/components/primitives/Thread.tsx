/** The one solid 3px thread. Drawn and undrawn with clip-path. */
export default function Thread({
  drawn = false,
  className = '',
  absolute = false
}: {
  drawn?: boolean;
  className?: string;
  absolute?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`thread ${absolute ? 'thread-abs' : ''} ${className}`.trim()}
      data-drawn={drawn}
    />
  );
}
