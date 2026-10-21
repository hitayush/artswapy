export default function PlaceholderTag({ children = 'Placeholder' }: { children?: string }) {
  return <span className="ph-tag">{children}</span>;
}
