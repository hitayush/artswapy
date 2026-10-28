import Link from 'next/link';
import type { Project } from '@/types/content';
import { site } from '@/content/site';
import CTAButton from '@/components/primitives/CTAButton';
import RevealRoot from '@/components/primitives/RevealRoot';
import ThemeToggle from '@/components/primitives/ThemeToggle.client';

interface SofttouchCaseStudyProps {
  project: Project;
  prevProject: Project;
  nextProject: Project;
  enquiryHref: string;
}

export default function SofttouchCaseStudy({
  project,
  prevProject,
  nextProject,
  enquiryHref
}: SofttouchCaseStudyProps) {
  const cs = project.caseStudy;

  return (
    <div className="cs-softtouch-flow">
      {/* Studio Top Navigation Bar */}
      <header className="cs-topbar">
        <div className="cs-topbar-inner">
          <Link href="/" className="cs-back-link" aria-label="Back to Studio">
            <span className="arrow-back" aria-hidden="true">←</span>
            <span>Back to Studio</span>
          </Link>
          <div className="cs-brand-mark">
            <Link href="/" className="wordmark">
              {site.name}
            </Link>
          </div>
          <div className="cs-topbar-action">
            <ThemeToggle />
            <CTAButton href={enquiryHref} label="Enquire like this" size="sm" />
          </div>
        </div>
      </header>

      {/* =========================================================================
          1. Full-width orange product hero featuring the Softtouch paint buckets
          Dominates the opening viewport.
          Authoritative Asset: /images/projects/softtouch/cover.jpg.png (1725 x 888)
          ========================================================================= */}
      <section className="cs-fullbleed-hero" aria-label="Softtouch Master Product Lineup">
        <div className="cs-fullbleed-hero-media" data-cursor="explore">
          <img
            src="/images/projects/softtouch/cover.jpg.png"
            alt="Softtouch 4-bucket product family featuring Atmoshield, Evershield, Storm Shield, and Aura Interior Emulsions against a vibrant orange backdrop"
            width={1725}
            height={888}
            className="cs-fullbleed-hero-img"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* =========================================================================
          2. Warm-white inset project overview panel with “Softtouch” as the title
          Generous margins, small metadata row, large title, concise approved description.
          ========================================================================= */}
      <RevealRoot as="section" className="cs-overview-section">
        <div className="cs-container">
          <div className="cs-overview-card" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <div className="cs-kicker-row">
              <span className="cs-kicker-tag mono">[ CASE STUDY · {project.year} ]</span>
              <span className="cs-kicker-cat mono">{project.category}</span>
              <span className="cs-kicker-pill mono">Brand Identity &amp; Packaging Architecture</span>
            </div>

            <h1 className="cs-overview-title">
              {project.name}
            </h1>

            <p className="cs-overview-desc">
              {project.summary}
            </p>

            {/* Quick Specs Grid */}
            <div className="cs-specs-grid">
              <div className="cs-spec-item">
                <span className="spec-label mono">Discipline</span>
                <strong className="spec-value">{project.discipline ?? 'Packaging Architecture & Brand Identity'}</strong>
              </div>
              <div className="cs-spec-item">
                <span className="spec-label mono">Sector</span>
                <strong className="spec-value">Architectural Coatings &amp; Chemicals</strong>
              </div>
              <div className="cs-spec-item">
                <span className="spec-label mono">Manufacturing Base</span>
                <strong className="spec-value">MIDC Industrial Area, Butibori, Nagpur</strong>
              </div>
              <div className="cs-spec-item">
                <span className="spec-label mono">Creative Direction</span>
                <strong className="spec-value">{site.founder} · ArtSwapy</strong>
              </div>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          3. A bold orange brand panel with the supplied Softtouch white logo centered
          Authoritative Asset: /images/projects/softtouch/logo-white.svg.png (1426 x 730)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-orange-brand-panel" aria-label="Softtouch Brand Signature">
        <div className="cs-orange-panel-inner" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
          <img
            src="/images/projects/softtouch/Logo.svg.png"
            alt="Softtouch brand mark centered on signature brand orange ground"
            width={1724}
            height={795}
            className="cs-orange-panel-logo"
            loading="lazy"
          />
        </div>
      </RevealRoot>

      {/* =========================================================================
          4. A two-column brand/story section with approved copy
          ========================================================================= */}
      <RevealRoot as="section" className="cs-content-section cs-story-section">
        <div className="cs-container">
          <div className="cs-two-col-story">
            <div className="cs-story-col-left" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
              <span className="ph-tag orange-tag">[ BRAND STORY &amp; STRATEGY ]</span>
              <h2 className="heading cs-story-title">Packaging Architecture &amp; Identity</h2>
            </div>
            <div className="cs-story-col-right" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
              <p className="body cs-story-p">
                {cs?.challenge ?? 'The decorative paints and wallcare category is intensely crowded, dominated by legacy conglomerates with high distributor recall. Softtouch needed a distinctive, premium brand identity and packaging architecture that conveyed structural reliability, superior coating chemistry, and immediate shelf standout across tier-1 and tier-2 dealer distribution networks.'}
              </p>
              <p className="body muted cs-story-p">
                {cs?.solution ?? 'ArtSwapy engineered an ergonomic container system across 20L, 10L, 4L, and 1L capacity pails paired with a fluid, high-coverage visual identity system, dynamic logomark, regional trade campaign motto, and standardized retail dealership environments.'}
              </p>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          5. A split typography and colour-palette presentation
          Rendered cleanly via responsive HTML/CSS without screenshot images.
          ========================================================================= */}
      <RevealRoot as="section" className="cs-content-section cs-split-system-section">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag">[ 01 · DESIGN SYSTEM FOUNDATIONS ]</span>
            <h2 className="heading cs-section-title">Typography &amp; Colour Palette System</h2>
            <p className="body muted cs-section-lead">
              A high-contrast typographic hierarchy paired with an industrial color system engineered for shelf standout and technical clarity on metallic packaging substrates.
            </p>
          </div>

          <div className="cs-split-system-grid" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
            {/* Montserrat Typographic Hierarchy Specimen (HTML/CSS) */}
            <div className="cs-system-card cs-system-type-card">
              <span className="cs-system-card-tag mono">[ PRIMARY BRAND TYPEFACE · MONTSERRAT ]</span>
              <div className="cs-type-specimen-stage">
                <div className="cs-type-display-title">Montserrat</div>
                <div className="cs-type-alphabet">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                </div>
                <div className="cs-type-numerals">0123456789</div>
                <div className="cs-type-weights-list">
                  <span className="cs-type-w-item" style={{ fontWeight: 300 }}>Light 300</span>
                  <span className="cs-type-w-item" style={{ fontWeight: 400 }}>Regular 400</span>
                  <span className="cs-type-w-item" style={{ fontWeight: 500 }}>Medium 500</span>
                  <span className="cs-type-w-item" style={{ fontWeight: 600 }}>Semibold 600</span>
                  <span className="cs-type-w-item" style={{ fontWeight: 700 }}>Bold 700</span>
                  <span className="cs-type-w-item" style={{ fontWeight: 800 }}>Extrabold 800</span>
                </div>
              </div>
            </div>

            {/* Official Colour Chips Specimen (HTML/CSS) */}
            <div className="cs-system-card cs-system-palette-card">
              <span className="cs-system-card-tag mono">[ OFFICIAL COLOUR CHIPS &amp; TONAL SCALE ]</span>
              <div className="cs-palette-chips-stage">
                <div className="cs-chip-block" style={{ backgroundColor: '#E87124', color: '#ffffff' }}>
                  <div className="cs-chip-header">
                    <span className="cs-chip-hex mono">#E87124</span>
                    <span className="cs-chip-title">Softtouch Orange</span>
                  </div>
                  <div className="cs-chip-codes mono">
                    <span>R: 232  G: 113  B: 36</span>
                    <span>C: 0%  M: 64%  Y: 95%  K: 0%</span>
                  </div>
                </div>

                <div className="cs-chip-block" style={{ backgroundColor: '#231F20', color: '#ffffff' }}>
                  <div className="cs-chip-header">
                    <span className="cs-chip-hex mono">#231F20</span>
                    <span className="cs-chip-title">Industrial Deep Ink</span>
                  </div>
                  <div className="cs-chip-codes mono">
                    <span>R: 35  G: 31  B: 32</span>
                    <span>C: 70%  M: 67%  Y: 64%  K: 74%</span>
                  </div>
                </div>

                <div className="cs-chip-block cs-chip-white" style={{ backgroundColor: '#FFFFFF', color: '#161614' }}>
                  <div className="cs-chip-header">
                    <span className="cs-chip-hex mono">#FFFFFF</span>
                    <span className="cs-chip-title">Substrate White</span>
                  </div>
                  <div className="cs-chip-codes mono">
                    <span>R: 255  G: 255  B: 255</span>
                    <span>C: 0%  M: 0%  Y: 0%  K: 0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verified Color Swatches Grid */}
          <div className="cs-swatches-grid" data-r="rise" style={{ '--i': 2 } as React.CSSProperties}>
            <div className="cs-swatch-card">
              <div className="cs-swatch-color" style={{ backgroundColor: '#E87124' }} />
              <div className="cs-swatch-meta">
                <strong className="cs-swatch-name">Softtouch Orange</strong>
                <span className="cs-swatch-hex mono">#E87124</span>
                <span className="cs-swatch-cmyk mono">C:0 M:64 Y:95 K:0</span>
                <span className="cs-swatch-rgb mono">RGB: 232, 113, 36</span>
                <span className="cs-swatch-role">Primary Signature &amp; Exterior Canopy</span>
              </div>
            </div>

            <div className="cs-swatch-card">
              <div className="cs-swatch-color" style={{ backgroundColor: '#231F20' }} />
              <div className="cs-swatch-meta">
                <strong className="cs-swatch-name">Industrial Deep Ink</strong>
                <span className="cs-swatch-hex mono">#231F20</span>
                <span className="cs-swatch-cmyk mono">C:70 M:67 Y:64 K:74</span>
                <span className="cs-swatch-rgb mono">RGB: 35, 31, 32</span>
                <span className="cs-swatch-role">Body Typography &amp; Regulatory Markings</span>
              </div>
            </div>

            <div className="cs-swatch-card">
              <div className="cs-swatch-color" style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--hairline)' }} />
              <div className="cs-swatch-meta">
                <strong className="cs-swatch-name">Clean Substrate White</strong>
                <span className="cs-swatch-hex mono">#FFFFFF</span>
                <span className="cs-swatch-cmyk mono">C:0 M:0 Y:0 K:0</span>
                <span className="cs-swatch-rgb mono">RGB: 255, 255, 255</span>
                <span className="cs-swatch-role">Polypropylene Base &amp; Optical Balance</span>
              </div>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          6. A clean logo presentation on a light background
          Authoritative Asset: /images/projects/softtouch/Logo.svg.png (1724 x 795)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-content-section cs-light-logo-section">
        <div className="cs-container">
          <div className="cs-light-logo-showcase" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="cs-panel-badge mono">[ PRIMARY WORDMARK · INK &amp; ORANGE ON WARM PAPER ]</span>
            <div className="cs-light-logo-display">
              <img
                src="/images/projects/softtouch/logo-white.svg.png"
                alt="Softtouch primary brand logo on warm paper ground showing fluid brush stroke detail"
                width={1426}
                height={730}
                className="cs-logo-img"
                loading="lazy"
              />
            </div>
            <p className="cs-panel-footnote mono">
              Dynamic asterisk swoosh mark pairing structural chemistry with smooth surface spread
            </p>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          7. A compact horizontal strip of branded-object applications
          Authoritative Asset: /images/projects/softtouch/merch-objects-strip.png (1572 x 380)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-content-section cs-objects-section">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag">[ 02 · BRAND TOUCHPOINTS ]</span>
            <h2 className="heading cs-section-title">Branded Collateral &amp; Utility Objects</h2>
            <p className="body muted cs-section-lead">
              Dealer-counter stoneware, double-wall contractor hydration flasks, and technical specification drives.
            </p>
          </div>

          <div className="cs-objects-strip-frame" data-r="shutter">
            <img
              src="/images/projects/softtouch/merch-objects-strip.png"
              alt="Softtouch branded promotional objects: ceramic coffee mug, stainless steel hydration bottle, and USB flash drive"
              width={1572}
              height={380}
              className="cs-img-contain"
              loading="lazy"
            />
          </div>
          <p className="cs-media-caption mono">
            [ Fig 2.1 · Branded utility items: Ceramic stoneware mug, double-wall stainless hydration bottle, and technical spec USB drive ]
          </p>
        </div>
      </RevealRoot>

      {/* =========================================================================
          8. A larger apparel/merchandise image section
          Authoritative Asset: /images/projects/softtouch/merch-tshirt.png (1572 x 641)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-apparel-section">
        <div className="cs-apparel-banner" data-r="shutter">
          <img
            src="/images/projects/softtouch/merch-tshirt.png"
            alt="Softtouch branded contractor crew polo apparel on signature orange ground"
            width={1572}
            height={641}
            className="cs-apparel-img"
            loading="lazy"
          />
        </div>
        <div className="cs-container">
          <p className="cs-media-caption mono">
            [ Fig 2.2 · Contractor field apparel: High-visibility saffron cotton crew polo with vertical chest branding ]
          </p>
        </div>
      </RevealRoot>

      {/* =========================================================================
          9. An orange campaign section featuring the Hindi campaign artwork and phone mockup
          Authoritative Asset: /images/projects/softtouch/campaign-tagline.png (1730 x 374)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-campaign-section">
        <div className="cs-campaign-banner-wrap" data-r="shutter">
          <img
            src="/images/projects/softtouch/campaign-tagline.png"
            alt="Regional brand campaign banner: Khushiyo Ke Rang Softtouch Ke Sang with mobile contractor application"
            width={1730}
            height={374}
            className="cs-campaign-img"
            loading="lazy"
          />
        </div>
        <div className="cs-container">
          <div className="cs-campaign-details-grid" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <div className="cs-tagline-box">
              <span className="mono cs-tagline-kicker">[ OFFICIAL CAMPAIGN MOTTO ]</span>
              <p className="cs-hindi-tagline">“खुशियों के रंग सॉफ्टटच के संग”</p>
              <p className="cs-romanized-tagline mono">Khushiyo Ke Rang Softtouch Ke Sang</p>
              <p className="body cs-tagline-explanation">
                Emotional domestic resonance celebrating home transformations, family prosperity, and enduring wall protection.
              </p>
            </div>

            <div className="cs-app-box">
              <span className="mono cs-app-kicker">[ CONTRACTOR DIGITAL UTILITY ]</span>
              <h3 className="cs-app-title">Contractor Mobile Companion</h3>
              <p className="body muted">
                Batch QR verification for authentic coating validation, painter loyalty reward points, surface area formulation calculator, and authorized stockist ordering.
              </p>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          10. A light editorial section with strategy or brand-positioning copy
          ========================================================================= */}
      {cs && (
        <RevealRoot as="section" className="cs-content-section cs-narrative-section">
          <div className="cs-container">
            <div className="cs-narrative-grid">
              <div className="cs-narrative-block" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
                <span className="eyebrow cs-section-tag">[ 03 · THE CHALLENGE ]</span>
                <h2 className="heading cs-narrative-heading">Breaking through category inertia.</h2>
                <p className="body cs-narrative-body">{cs.challenge}</p>
              </div>
              <div className="cs-narrative-block" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
                <span className="eyebrow cs-section-tag">[ 03 · STRATEGIC SOLUTION ]</span>
                <h2 className="heading cs-narrative-heading">Form follows performance &amp; ergonomics.</h2>
                <p className="body cs-narrative-body">{cs.solution}</p>
              </div>
            </div>

            {/* Deliverables Checklist */}
            {cs.deliverables.length > 0 && (
              <div className="cs-deliverables-box" data-r="rise" style={{ '--i': 2 } as React.CSSProperties}>
                <span className="eyebrow">[ CORE DELIVERABLES ARCHITECTURE ]</span>
                <ul className="cs-deliverables-list">
                  {cs.deliverables.map((item, idx) => (
                    <li key={idx} className="cs-deliverable-item">
                      <span className="bullet-thread" aria-hidden="true">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </RevealRoot>
      )}

      {/* =========================================================================
          11. Process section: Structural container engineering and mechanics
          ========================================================================= */}
      <RevealRoot as="section" className="cs-content-section cs-process-section">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag">[ 04 · PROCESS &amp; STRUCTURAL ERGONOMICS ]</span>
            <h2 className="heading cs-section-title">Concept Exploration &amp; Container Mechanics</h2>
            <p className="body muted cs-section-lead">
              Structural ideation exploring industrial pail profiles, double-rib lid sealing geometry, molded load-dispersion handle ergonomics, and label surface proportions.
            </p>
          </div>

          <div className="cs-engineering-grid" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="cs-eng-card">
              <span className="cs-eng-number mono">01</span>
              <h3 className="cs-eng-title">Wire-Bail Handle &amp; Molded Grip</h3>
              <p className="cs-eng-desc">
                High-tensile galvanized steel bail combined with an ergonomic rubberized load-dispersion grip for safe single-handed carry of 20kg wet payload.
              </p>
            </div>
            <div className="cs-eng-card">
              <span className="cs-eng-number mono">02</span>
              <h3 className="cs-eng-title">Airtight Double-Rib Seal</h3>
              <p className="cs-eng-desc">
                Precision interlocking rim seal preventing solvent VOC evaporation, skin formation, and perimeter leakage during multi-tier transport.
              </p>
            </div>
            <div className="cs-eng-card">
              <span className="cs-eng-number mono">03</span>
              <h3 className="cs-eng-title">Pallet Stacking Footprint</h3>
              <p className="cs-eng-desc">
                Recessed bottom collar mates securely with lid rim indents to ensure stable 4-high palletization in wholesale distributor warehouses.
              </p>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          12. Packaging design section pairing container substrates with label die-lines
          Authoritative Assets:
          - /images/projects/softtouch/bucket-blank.png (2750 x 3660)
          - /images/projects/softtouch/enamel-can.png (298 x 384)
          - /images/projects/softtouch/label-aura.png (4220 x 1300)
          - /images/projects/softtouch/label-dampfixx.png (4220 x 1300)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-content-section cs-packaging-section">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag">[ 05 · PACKAGING ARCHITECTURE &amp; DIE-LINES ]</span>
            <h2 className="heading cs-section-title">Container Substrates &amp; Production Die-Lines</h2>
            <p className="body muted cs-section-lead">
              Pairing industrial container forms with high-durability metallic label die-lines engineered for warehouse shelf standout and painter usability.
            </p>
          </div>

          {/* Substrate Containers Pair */}
          <div className="cs-containers-pair" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="cs-container-card cs-card-blank">
              <img
                src="/images/projects/softtouch/bucket-blank.png"
                alt="Industrial 20-litre unprinted white polypropylene container with galvanized wire handle"
                width={2750}
                height={3660}
                className="cs-img-contain"
                loading="lazy"
              />
              <div className="cs-card-caption">
                <strong className="cs-caption-title">Unprinted Virgin Polypropylene Pail</strong>
                <p className="cs-caption-desc mono">20-litre injection-molded industrial substrate</p>
              </div>
            </div>

            <div className="cs-container-card cs-card-enamel">
              <img
                src="/images/projects/softtouch/enamel-can.png"
                alt="Oleo Premium Enamel high-gloss paint container with emerald green fluid flow design"
                width={298}
                height={384}
                className="cs-img-contain"
                loading="lazy"
              />
              <div className="cs-card-caption">
                <strong className="cs-caption-title">Oleo Premium Enamel Tin</strong>
                <p className="cs-caption-desc mono">High-gloss tinplate cylinder for metal and architectural wood finishes</p>
              </div>
            </div>
          </div>

          {/* Technical Production Label Die-Lines */}
          <div className="cs-dielines-block" data-r="rise" style={{ '--i': 2 } as React.CSSProperties}>
            <div className="cs-dieline-item">
              <div className="cs-dieline-frame">
                <img
                  src="/images/projects/softtouch/label-aura.png"
                  alt="Production packaging label die-line for Softtouch Aura Interior Emulsion"
                  width={4220}
                  height={1300}
                  className="cs-img-cover"
                  loading="lazy"
                />
              </div>
              <div className="cs-dieline-meta">
                <div className="cs-dieline-info">
                  <strong className="cs-dieline-name">Aura Interior Emulsion · Production Wrap Die-Line</strong>
                  <p className="cs-dieline-spec mono">Substrate: Metallic synthetic film with high-scuff matte varnish</p>
                </div>
                <span className="cs-dieline-badge mono">Washable Velvet Luxury Finish</span>
              </div>
            </div>

            <div className="cs-dieline-item">
              <div className="cs-dieline-frame">
                <img
                  src="/images/projects/softtouch/label-dampfixx.png"
                  alt="Production packaging label die-line for Softtouch Dampfixx Ultra 2-in-1 Waterproofing compound"
                  width={4220}
                  height={1300}
                  className="cs-img-cover"
                  loading="lazy"
                />
              </div>
              <div className="cs-dieline-meta">
                <div className="cs-dieline-info">
                  <strong className="cs-dieline-name">Dampfixx Ultra Waterproofing · Production Wrap Die-Line</strong>
                  <p className="cs-dieline-spec mono">Verified Manufacturing: Unit at MIDC Industrial Area, Butibori, Nagpur</p>
                </div>
                <span className="cs-dieline-badge mono">2-in-1 Polymer Barrier Shield</span>
              </div>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          13. Product-range photography showing the different Softtouch product lines
          Authoritative Assets:
          - /images/projects/softtouch/product-photos-pair.png (1732 x 520)
          - /images/projects/softtouch/product-range-full.png (8000 x 2230)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-content-section cs-range-section">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag">[ 06 · PRODUCT RANGE &amp; PHOTOGRAPHY ]</span>
            <h2 className="heading cs-section-title">Architectural Coatings Lineup &amp; Taxonomy</h2>
            <p className="body muted cs-section-lead">
              A cohesive packaging language spanning emulsions, all-weather coatings, primers, waterproofers, and industrial putties.
            </p>
          </div>

          {/* Range Studio Photography (3-bucket pedestal & lineup) */}
          <div className="cs-product-photos-frame" data-r="shutter">
            <img
              src="/images/projects/softtouch/product-photos-pair.png"
              alt="Softtouch product range studio photography: 3-pail composition and multi-container lineup on plinth"
              width={1732}
              height={520}
              className="cs-img-contain"
              loading="lazy"
            />
          </div>
          <p className="cs-media-caption mono">
            [ Fig 6.1 · Studio product photography: Aura, Evershield, Storm Shield, Oleo Enamel, and Primer Lite ]
          </p>

          {/* Full Lineup 3D Render Banner */}
          <div className="cs-range-banner-frame" data-r="shutter" style={{ marginTop: '40px' }}>
            <img
              src="/images/projects/softtouch/product-range-full.png"
              alt="Comprehensive Softtouch product range 3D render lineup on exhibition plinth"
              width={8000}
              height={2230}
              className="cs-img-contain"
              loading="lazy"
            />
          </div>

          {/* 8 Product Classification Grid */}
          <div className="cs-taxonomy-grid" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="cs-product-card">
              <span className="cs-prod-cat mono">Exterior Ultra-Luxury</span>
              <h3 className="cs-prod-name">Atmoshield</h3>
              <p className="cs-prod-desc">
                High-performance exterior silicone coating designed with anti-fungal barrier chemistry to withstand severe monsoonal weathering.
              </p>
              <span className="cs-prod-pack mono">Available: 20L · 10L · 4L · 1L</span>
            </div>

            <div className="cs-product-card">
              <span className="cs-prod-cat mono">Interior Premium Velvet</span>
              <h3 className="cs-prod-name">Aura</h3>
              <p className="cs-prod-desc">
                Rich smooth interior emulsion with exceptional stain resistance, low VOC formulation, and high scrub durability for residential interiors.
              </p>
              <span className="cs-prod-pack mono">Available: 20L · 10L · 4L · 1L</span>
            </div>

            <div className="cs-product-card">
              <span className="cs-prod-cat mono">Exterior All-Weather</span>
              <h3 className="cs-prod-name">Evershield</h3>
              <p className="cs-prod-desc">
                Elastomeric weatherproof exterior paint providing crack-bridging flexibility and UV-reflective thermal insulation properties.
              </p>
              <span className="cs-prod-pack mono">Available: 20L · 10L · 4L</span>
            </div>

            <div className="cs-product-card">
              <span className="cs-prod-cat mono">Exterior Heavy Duty</span>
              <h3 className="cs-prod-name">Storm Shield</h3>
              <p className="cs-prod-desc">
                Industrial exterior emulsion engineered for masonry durability against heavy dust, rain, and intense summer temperature fluctuations.
              </p>
              <span className="cs-prod-pack mono">Available: 20L · 10L · 4L</span>
            </div>

            <div className="cs-product-card">
              <span className="cs-prod-cat mono">Wood &amp; Metal Enamel</span>
              <h3 className="cs-prod-name">Oleo Enamel</h3>
              <p className="cs-prod-desc">
                Mirror-like synthetic resin enamel engineered for iron railings, gates, structural trims, and architectural timber with anti-rust inhibitors.
              </p>
              <span className="cs-prod-pack mono">Available: 4L · 1L · 500ml</span>
            </div>

            <div className="cs-product-card">
              <span className="cs-prod-cat mono">Advanced Waterproofing</span>
              <h3 className="cs-prod-name">Dampfixx Ultra</h3>
              <p className="cs-prod-desc">
                2-in-1 co-polymer waterproofing primer and barrier compound preventing rising capillary dampness and efflorescence damage.
              </p>
              <span className="cs-prod-pack mono">Available: 20L · 10L · 4L · 1L</span>
            </div>

            <div className="cs-product-card">
              <span className="cs-prod-cat mono">Masonry Substrate Primer</span>
              <h3 className="cs-prod-name">Primer Lite</h3>
              <p className="cs-prod-desc">
                Deep penetrating water-thinnable alkali-resistant primer that anchors topcoats to fresh plaster and porous concrete substrates.
              </p>
              <span className="cs-prod-pack mono">Available: 20L · 10L · 4L</span>
            </div>

            <div className="cs-product-card">
              <span className="cs-prod-cat mono">Polymer Base Putty</span>
              <h3 className="cs-prod-name">Wall Care Putty</h3>
              <p className="cs-prod-desc">
                Polymer-fortified white cement skim coat providing a micro-porous, perfectly level satin surface for optimum paint adhesion.
              </p>
              <span className="cs-prod-pack mono">Available: 40kg · 20kg · 5kg Bags</span>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          14. Print, brochure, or collateral mockups
          Authoritative Asset: /images/projects/softtouch/collateral-brochure.png (1821 x 515)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-content-section cs-collateral-section">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag">[ 07 · PRINT &amp; DEALER COLLATERAL ]</span>
            <h2 className="heading cs-section-title">Contractor Shade Guide &amp; Showroom Standees</h2>
            <p className="body muted cs-section-lead">
              Tangible sales enablement tools for distributor counters, dealer showrooms, and on-site painter consultations.
            </p>
          </div>

          <div className="cs-collateral-frame" data-r="shutter">
            <img
              src="/images/projects/softtouch/collateral-brochure.png"
              alt="Softtouch folded contractor shade brochure on orange ground and showroom rollup standee"
              width={1821}
              height={515}
              className="cs-img-contain"
              loading="lazy"
            />
          </div>
          <p className="cs-media-caption mono">
            [ Fig 7.1 · Print collateral: Trifold contractor product guide on orange ground and vertical showroom rollup banner ]
          </p>
        </div>
      </RevealRoot>

      {/* =========================================================================
          15. Environmental branding or signage section, using supplied storefront assets
          Authoritative Asset: /images/projects/softtouch/signage-storefront.png (1821 x 567)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-content-section cs-retail-section" data-inverse-section="">
        <div className="cs-container">
          <div className="cs-section-header" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="ph-tag orange-tag">[ 08 · ENVIRONMENTAL BRANDING &amp; SIGNAGE ]</span>
            <h2 className="heading cs-section-title cs-title-inverted">Authorized Dealership Storefront Fascia</h2>
            <p className="body cs-lead-inverted">
              Standardized regional retail canopy system deploying high-visibility saffron orange to command street presence across hardware corridors.
            </p>
          </div>

          <div className="cs-signage-frame" data-r="shutter">
            <img
              src="/images/projects/softtouch/signage-storefront.png"
              alt="Softtouch authorized dealership storefront fascia: Rajeshree and Swastik Traders Umred with spotlights"
              width={1821}
              height={567}
              className="cs-img-contain"
              loading="lazy"
            />
          </div>
          <p className="cs-media-caption mono" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            [ Fig 8.1 · Retail dealership deployment: Authorized dealer storefront fascia for Rajeshree &amp; Swastik Traders, Umred ]
          </p>

          <div className="cs-retail-grid" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="cs-retail-card">
              <span className="cs-retail-badge mono">Storefront Architecture</span>
              <h3 className="cs-retail-title">Rajeshree &amp; Swastik Traders · Umred</h3>
              <p className="cs-retail-desc">
                Modular dealer fascia integrating the signature saffron canopy with personalized dealer attribution and spotlight fixture channels.
              </p>
            </div>

            <div className="cs-retail-card">
              <span className="cs-retail-badge mono">Point-of-Sale Presence</span>
              <h3 className="cs-retail-title">Hardware Corridor Legibility</h3>
              <p className="cs-retail-desc">
                Engineered for high contrast against congested regional market corridors, visible at distance from both pedestrian and vehicular traffic.
              </p>
            </div>

            <div className="cs-retail-card">
              <span className="cs-retail-badge mono">Substrate &amp; Construction</span>
              <h3 className="cs-retail-title">Weatherproof ACP &amp; Acrylic</h3>
              <p className="cs-retail-desc">
                Fabricated from UV-stabilized aluminium composite panels with laser-cut acrylic logo relief and waterproof LED downlighting.
              </p>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* =========================================================================
          16. A product-detail composition with verified caption
          Authoritative Asset: /images/projects/softtouch/product-detail-composition.png (1732 x 490)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-content-section cs-detail-section">
        <div className="cs-container">
          <div className="cs-detail-composition-frame" data-r="shutter">
            <img
              src="/images/projects/softtouch/product-detail-composition.png"
              alt="Softtouch product detail composition featuring 20L paint pail with technical specification caption"
              width={1732}
              height={490}
              className="cs-img-contain"
              loading="lazy"
            />
          </div>
          <p className="cs-media-caption mono">
            [ Fig 9.1 · Industrial pail detail: 20-litre container with tamper-evident rim seal and molded grip ]
          </p>
        </div>
      </RevealRoot>

      {/* =========================================================================
          17. A bold Softtouch wordmark or identity closing image
          Authoritative Asset: /images/projects/softtouch/brand-wordmark-closing.png (1732 x 258)
          ========================================================================= */}
      <RevealRoot as="section" className="cs-wordmark-closing-section">
        <div className="cs-wordmark-closing-wrap" data-r="shutter">
          <img
            src="/images/projects/softtouch/brand-wordmark-closing.png"
            alt="Monumental Softtouch brand wordmark closing presentation"
            width={1732}
            height={258}
            className="cs-wordmark-img"
            loading="lazy"
          />
        </div>
      </RevealRoot>

      {/* =========================================================================
          18. Project Pagination & Enquiry Footer
          ========================================================================= */}
      <RevealRoot as="footer" className="cs-footer">
        <div className="cs-container">
          <div className="cs-pagination-grid" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <Link href={prevProject.href ?? `/work/${prevProject.id}/`} className="cs-page-nav cs-nav-prev">
              <span className="small mono muted">← Previous Study</span>
              <strong className="nav-project-name">{prevProject.name}</strong>
              <span className="small muted">{prevProject.category}</span>
            </Link>

            <Link href={nextProject.href ?? `/work/${nextProject.id}/`} className="cs-page-nav cs-nav-next">
              <span className="small mono muted">Next Study →</span>
              <strong className="nav-project-name">{nextProject.name}</strong>
              <span className="small muted">{nextProject.category}</span>
            </Link>
          </div>

          <div className="cs-enquiry-banner" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="cs-enquiry-content">
              <span className="eyebrow">[ START A COLLABORATION ]</span>
              <h2 className="heading cs-enquiry-title">Ready for an enduring brand system?</h2>
              <p className="body muted">
                Direct founder-to-founder collaboration from initial positioning through production-ready packaging and digital applications.
              </p>
            </div>
            <CTAButton href={enquiryHref} label="Start your project" />
          </div>
        </div>
      </RevealRoot>
    </div>
  );
}
