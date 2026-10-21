import type { MarkId } from '@/types/content';

/** Flat, drawn concept marks for the placeholder projects. Decorative; alt text lives on the frame. */
export default function Mark({ id }: { id: MarkId }) {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {id === 'aaranya' && (
        <>
          <rect width="400" height="500" fill="#7f9170" />
          <g fill="#f6f4ef">
            <ellipse cx="200" cy="170" rx="34" ry="86" />
            <ellipse cx="140" cy="215" rx="30" ry="76" transform="rotate(-38 140 215)" />
            <ellipse cx="260" cy="215" rx="30" ry="76" transform="rotate(38 260 215)" />
            <ellipse cx="108" cy="290" rx="26" ry="62" transform="rotate(-62 108 290)" />
            <ellipse cx="292" cy="290" rx="26" ry="62" transform="rotate(62 292 290)" />
          </g>
          <rect x="196" y="250" width="8" height="150" fill="#f6f4ef" />
          <rect x="80" y="430" width="240" height="6" fill="#161614" />
        </>
      )}
      {id === 'common' && (
        <>
          <rect width="400" height="500" fill="#c2674a" />
          <circle cx="160" cy="230" r="104" fill="#f6f4ef" />
          <circle cx="250" cy="270" r="104" fill="#161614" style={{ mixBlendMode: 'normal' }} />
          <path d="M205 168a104 104 0 0 1 0 124a104 104 0 0 1 0-124z" fill="#c2674a" />
          <rect x="80" y="430" width="240" height="6" fill="#f6f4ef" />
        </>
      )}
      {id === 'habit' && (
        <>
          <rect width="400" height="500" fill="#e3b95a" />
          <path d="M110 380V230a90 90 0 0 1 180 0v150z" fill="#161614" />
          <circle cx="200" cy="205" r="34" fill="#e3b95a" />
          <rect x="110" y="380" width="180" height="14" fill="#f6f4ef" />
          <rect x="80" y="430" width="240" height="6" fill="#161614" />
        </>
      )}
      {id === 'kavita' && (
        <>
          <rect width="400" height="500" fill="#1e293b" />
          <g fill="#f6f4ef">
            <rect x="90" y="160" width="95" height="160" rx="4" />
            <rect x="215" y="160" width="95" height="160" rx="4" />
            <circle cx="200" cy="130" r="18" fill="#ff551f" />
          </g>
          <line x1="200" y1="160" x2="200" y2="340" stroke="#ff551f" strokeWidth="4" />
          <rect x="80" y="430" width="240" height="6" fill="#f6f4ef" />
        </>
      )}
      {id === 'dhara' && (
        <>
          <rect width="400" height="500" fill="#a8583c" />
          <path d="M130 360V210a70 70 0 0 1 140 0v150z" fill="#e5ddd0" />
          <path d="M165 360V245a35 35 0 0 1 70 0v115z" fill="#161614" />
          <circle cx="200" cy="130" r="24" fill="#e5ddd0" />
          <rect x="80" y="430" width="240" height="6" fill="#161614" />
        </>
      )}
    </svg>
  );
}
