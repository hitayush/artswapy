import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects, site } from '@/content/site';
import { mailto } from '@/lib/mailto';
import { buildCaseStudyJsonLd, buildPageMetadata, SITE_KEYWORDS } from '@/lib/seo';
import Mark from '@/components/primitives/Mark';
import PlaceholderTag from '@/components/primitives/PlaceholderTag';
import CTAButton from '@/components/primitives/CTAButton';
import RevealRoot from '@/components/primitives/RevealRoot';
import ThemeToggle from '@/components/primitives/ThemeToggle.client';
import SofttouchCaseStudy from '@/components/case-studies/SofttouchCaseStudy';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};

  const title = `${project.name} — ${project.category} (${project.discipline ?? 'Brand Identity'}) Case Study`;
  const description = project.caseStudy
    ? `${project.summary} Explore strategy, visual identity, packaging, communications, and brand applications by ArtSwapy (${site.founder}).`
    : project.summary;

  return buildPageMetadata({
    path: `/work/${project.id}/`,
    title,
    description,
    image: project.image ?? '/opengraph-image',
    imageAlt: project.preview.alt,
    type: 'article',
    keywords: [
      project.name,
      `${project.name} brand identity`,
      project.category,
      project.discipline ?? 'Brand Strategy & Identity',
      ...(project.caseStudy?.deliverables ?? []),
      ...SITE_KEYWORDS
    ]
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.id === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  const enquirySubject = `Project enquiry — inspired by ${project.name}`;
  const enquiryBody = `Hi Swapnil,\n\nI was reviewing the ${project.name} case study and want to discuss a branding project.\n\nMy business is: …\nDeliverables needed: …\nTarget timeline: …\n\nThanks!`;
  const enquiryHref = mailto({
    to: site.email.address,
    subject: enquirySubject,
    body: enquiryBody
  });

  const cs = project.caseStudy;
  const caseStudyJsonLd = buildCaseStudyJsonLd(project);

  return (
    <article className="cs-page" style={{ '--project-accent': project.theme?.accent ?? '#ff551f' } as React.CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(caseStudyJsonLd).replace(/</g, '\\u003c')
        }}
      />
      {project.id === 'softtouch' && (
        <link
          rel="preload"
          as="image"
          href="/images/projects/softtouch/softtouch case study-02.jpg"
          fetchPriority="high"
        />
      )}
      {project.id === 'softtouch' ? (
        <SofttouchCaseStudy
          project={project}
          prevProject={prevProject}
          nextProject={nextProject}
          enquiryHref={enquiryHref}
        />
      ) : (
        <>
      {/* Top Navigation Bar */}
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

      {/* Monumental Hero */}
      <RevealRoot as="section" className="cs-hero">
        <div className="cs-hero-inner">
          <div className="cs-kicker-row" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="cs-kicker-tag mono">[ CASE STUDY · {project.year} ]</span>
            <span className="cs-kicker-cat mono">{project.category}</span>
            {project.placeholder && <PlaceholderTag>Concept Study</PlaceholderTag>}
          </div>

          <h1 className="cs-monument-title" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
            {project.name}
          </h1>
          <p className="cs-lead-summary" data-r="rise" style={{ '--i': 2 } as React.CSSProperties}>
            {project.summary}
          </p>

          {/* Quick Specs Grid */}
          <div className="cs-specs-grid" data-r="rise" style={{ '--i': 3 } as React.CSSProperties}>
            <div className="cs-spec-item">
              <span className="spec-label mono">Discipline</span>
              <strong className="spec-value">{project.discipline ?? 'Brand Strategy & Identity'}</strong>
            </div>
            {cs?.clientType && (
              <div className="cs-spec-item">
                <span className="spec-label mono">Client Type</span>
                <strong className="spec-value">{cs.clientType}</strong>
              </div>
            )}
            {cs?.timeline && (
              <div className="cs-spec-item">
                <span className="spec-label mono">Timeline</span>
                <strong className="spec-value">{cs.timeline}</strong>
              </div>
            )}
            <div className="cs-spec-item">
              <span className="spec-label mono">Creative Direction</span>
              <strong className="spec-value">{site.founder}</strong>
            </div>
          </div>
        </div>

        {/* Feature Hero Image */}
        <div className="cs-hero-media" data-r="shutter" data-cursor="explore">
          {project.image ? (
            <img
              src={project.image}
              alt={project.preview.alt}
              className="cs-hero-img"
              loading="eager"
            />
          ) : (
            <div className="cs-hero-mark" role="img" aria-label={project.preview.alt}>
              <Mark id={project.preview.mark} />
            </div>
          )}
        </div>
      </RevealRoot>

      {/* Challenge & Strategic Solution */}
      {cs && (
        <RevealRoot as="section" className="cs-narrative-section">
          <div className="cs-container">
            <div className="cs-narrative-grid">
              <div className="cs-narrative-block" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
                <span className="eyebrow cs-section-tag">[ 01 · THE CHALLENGE ]</span>
                <h2 className="heading cs-narrative-heading">Breaking through category inertia.</h2>
                <p className="body cs-narrative-body">{cs.challenge}</p>
              </div>
              <div className="cs-narrative-block" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
                <span className="eyebrow cs-section-tag">[ 02 · STRATEGIC SOLUTION ]</span>
                <h2 className="heading cs-narrative-heading">Form follows uncompromising meaning.</h2>
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

      {/* The 5 Branding Pillars Breakdown */}
      {cs?.pillars && (
        <RevealRoot as="section" className="cs-pillars-section" data-inverse-section="">
          <div className="cs-container">
            <div className="cs-pillars-header">
              <span className="ph-tag orange-tag" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
                [ THE 5 BRANDING PILLARS ]
              </span>
              <h2 className="heading cs-pillars-title" data-r="rise" style={{ '--i': 1 } as React.CSSProperties}>
                The Complete Brand Architecture
              </h2>
              <p className="body muted cs-pillars-subtitle" data-r="rise" style={{ '--i': 2 } as React.CSSProperties}>
                A rigorous, full-stack brand identity system built to endure across physical and digital touchpoints.
              </p>
            </div>

            <div className="cs-pillars-grid">
              {Object.entries(cs.pillars).map(([key, pillar], pIdx) => {
                if (!pillar) return null;
                return (
                  <article key={key} className="cs-pillar-card" data-r="rise" style={{ '--i': pIdx } as React.CSSProperties}>
                    <span className="pillar-title-tag mono">{pillar.title}</span>
                    <h3 className="pillar-name">{pillar.summary}</h3>
                    <ul className="pillar-details-list">
                      {pillar.details.map((point, i) => (
                        <li key={i} className="pillar-detail-item">
                          <span className="pillar-bullet" aria-hidden="true">✦</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </RevealRoot>
      )}

      {/* Visual Identity Mark Section */}
      <RevealRoot as="section" className="cs-mark-section">
        <div className="cs-container">
          <div className="cs-mark-card" data-r="rise" style={{ '--i': 0 } as React.CSSProperties}>
            <div className="cs-mark-preview">
              <Mark id={project.preview.mark} />
            </div>
            <div className="cs-mark-content">
              <span className="eyebrow">[ ICONIC VECTOR SIGNATURE ]</span>
              <h3 className="heading cs-mark-title">Geometry, proportion & resonance</h3>
              <p className="body muted">
                Designed to retain instant legibility at 16px favicon scale and monumental impact on architectural signage and tactile packaging finishes.
              </p>
            </div>
          </div>
        </div>
      </RevealRoot>

      {/* Project Pagination & Enquiry Footer */}
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
      </>
      )}
    </article>
  );
}
