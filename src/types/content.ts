export interface NavLink {
  href: string;
  label: string;
}

export interface MailtoTemplate {
  to: string;
  subject: string;
  body: string;
}

export type MarkId = 'aaranya' | 'common' | 'habit' | 'kavita' | 'dhara';

export interface CaseStudyPillar {
  title: string;
  summary: string;
  details: string[];
}

export interface CaseStudyDetails {
  clientType: string;
  timeline: string;
  deliverables: string[];
  challenge: string;
  solution: string;
  pillars: {
    strategy?: CaseStudyPillar;
    identity?: CaseStudyPillar;
    packaging?: CaseStudyPillar;
    communications?: CaseStudyPillar;
    applications?: CaseStudyPillar;
  };
}

export interface Project {
  id: string;
  name: string;
  year: string;
  category: string;
  discipline?: string;
  summary: string;
  image?: string;
  placeholder: boolean;
  preview: { alt: string; mark: MarkId };
  href?: string;
  theme?: {
    bg: string;
    text: string;
    accent: string;
  };
  caseStudy?: CaseStudyDetails;
}

export interface Service {
  id: string;
  title: string;
  fact: string;
  description: string;
}

export interface ProcessStage {
  id: string;
  name: string;
  line: string;
  gives: string;
  index?: string;
  phase?: string;
  description?: string;
  deliverables?: string[];
  duration?: string;
  output?: string;
}

export interface ContactRoute {
  id: 'email' | 'whatsapp' | 'location' | 'availability';
  label: string;
  value: string;
  href?: string;
  placeholder?: boolean;
}

export interface PreloaderQuote {
  id: string;
  index: string;
  pillar: string;
  quote: string;
  note: string;
}

export interface PreloaderConfig {
  kicker: string;
  placeholder: boolean;
  placeholderLabel: string;
  skipLabel: string;
  quotes: PreloaderQuote[];
}
