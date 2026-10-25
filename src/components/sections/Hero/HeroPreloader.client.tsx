import PlaceholderTag from '@/components/primitives/PlaceholderTag';
import { about, preloader, site } from '@/content/site';

export default function HeroPreloader() {
  const firstQuote = preloader.quotes[0];
  const totalQuotes = String(preloader.quotes.length).padStart(2, '0');

  return (
    <div
      id="preloader"
      className="as-preloader"
      role="region"
      aria-label="ArtSwapy editorial opening"
    >
      {/* Dual Architectural Split Shutters */}
      <div className="as-preloader-shutter shutter-top" aria-hidden="true" />
      <div className="as-preloader-shutter shutter-bottom" aria-hidden="true" />

      {/* Horizon Seam Thread (draws across center before shutters part) */}
      <div className="as-seam-thread" aria-hidden="true" />

      {/* Subtle Atmospheric Warmth */}
      <div className="as-preloader-glow" aria-hidden="true" />

      {/* Corner Registration Marks */}
      <span className="as-corner-cross cross-tl mono" aria-hidden="true">+</span>
      <span className="as-corner-cross cross-tr mono" aria-hidden="true">+</span>
      <span className="as-corner-cross cross-bl mono" aria-hidden="true">+</span>
      <span className="as-corner-cross cross-br mono" aria-hidden="true">+</span>

      <div className="as-preloader-inner">
        {/* Top Editorial Bar */}
        <header className="as-preloader-topbar">
          <div className="as-preloader-brand-tag">
            <span className="as-status-pulse" aria-hidden="true" />
            <span className="as-preloader-wordmark">{site.name}</span>
            <span className="as-preloader-founder mono hide-mobile">
              · {about.name}
            </span>
          </div>

          <div className="as-preloader-center-tag">
            <span className="mono hide-mobile">[ {preloader.kicker} ]</span>
            {preloader.placeholder && (
              <PlaceholderTag>{preloader.placeholderLabel}</PlaceholderTag>
            )}
          </div>

          <button
            id="preloader-skip"
            type="button"
            className="as-preloader-skip mono"
            aria-label="Skip loading intro and enter website"
          >
            <span>{preloader.skipLabel}</span>
            <span className="as-skip-key hide-mobile" aria-hidden="true">ESC</span>
          </button>
        </header>

        {/* Center Editorial Quote Stage */}
        <div className="as-preloader-center">
          <div className="as-quote-frame">
            {/* Step & Pillar Kicker Row */}
            <div className="as-quote-meta-row mono">
              <div className="as-quote-step-group">
                <span className="as-quote-step-badge">
                  <span className="as-quote-idx">{firstQuote.index}</span>
                  <span className="as-quote-total">/{totalQuotes}</span>
                </span>
                <span className="as-quote-divider" aria-hidden="true">—</span>
                <span className="as-quote-pillar">{firstQuote.pillar}</span>
                <span className="as-quote-dot" aria-hidden="true">·</span>
                <span className="as-quote-note">{firstQuote.note}</span>
              </div>
            </div>

            {/* Stacked Quote Deck (grid overlap prevents any layout shift) */}
            <div className="as-quote-deck" aria-live="polite" aria-atomic="true">
              {preloader.quotes.map((item, idx) => (
                <figure
                  key={item.id}
                  className="as-quote-slide"
                  data-quote-index={idx}
                  data-active={idx === 0 ? 'true' : 'false'}
                  aria-hidden={idx === 0 ? undefined : 'true'}
                >
                  <div className="as-quote-mask">
                    <blockquote className="as-quote-text">
                      <span className="as-quote-mark" aria-hidden="true">“</span>
                      {item.quote}
                      <span className="as-quote-mark" aria-hidden="true">”</span>
                    </blockquote>
                  </div>
                </figure>
              ))}
            </div>

            {/* Tactile Sequence Thread Pips */}
            <div className="as-quote-pips" aria-hidden="true">
              {preloader.quotes.map((item, idx) => (
                <span
                  key={item.id}
                  className="as-quote-pip"
                  data-pip-index={idx}
                  data-state={idx === 0 ? 'active' : 'upcoming'}
                >
                  <span className="as-quote-pip-fill" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Progress & Handoff Telemetry */}
        <footer className="as-preloader-bottom">
          <div className="as-preloader-telemetry">
            <div className="as-preloader-status mono" role="status" aria-live="polite">
              <span className="as-status-label">[ THOUGHT {firstQuote.index}/{totalQuotes} ]</span>
              <span className="as-preloader-status-text">
                {firstQuote.pillar.toUpperCase()} — {firstQuote.note.toUpperCase()}
              </span>
            </div>

            <div className="as-counter-readout" aria-hidden="true">
              <span className="as-counter-val">00</span>
              <span className="as-counter-pct">%</span>
            </div>
          </div>

          {/* Horizon Progress Thread (accessible progressbar) */}
          <div
            id="preloader-progressbar"
            className="as-preloader-track"
            role="progressbar"
            aria-label="Portfolio loading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
          >
            <div className="as-preloader-progress" />
          </div>

          {/* Bottom Studio Footnote */}
          <div className="as-preloader-sub-row mono">
            <span>{preloader.footerLeft ?? 'STRATEGY  CONSULTING  DESIGN'}</span>
            <span>{preloader.footerRight ?? 'NAGPUR, IN  WORKING WORLDWIDE'}</span>
            <span className="as-ready-indicator">PREPARING PORTFOLIO</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
