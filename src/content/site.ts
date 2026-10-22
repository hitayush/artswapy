/* ==========================================================================
   ArtSwapy — typed site content (replaces the old src/content.js)
   Anything with `placeholder: true` renders with a visible "Placeholder" tag.
   Replace with confirmed content, then flip the flag before launch.
   ========================================================================== */
import type {
  ContactRoute,
  MailtoTemplate,
  NavLink,
  ProcessStage,
  Project,
  Service
} from '@/types/content';

export const site = {
  name: 'ArtSwapy',
  founder: 'Swapnil Gathibandhe',
  url: 'https://artswapy.com',
  email: {
    address: 'swapnilgathibandhe2494@gmail.com',
    placeholder: false
  },
  credits: { left: 'Brand design and consulting', right: 'Independent practice' }
};

export const navLinks: NavLink[] = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' }
];

export const hero = {
  line: 'An independent brand practice led by Swapnil Gathibandhe: strategy, identity and packaging.',
  portrait: {
    src: '/images/swapnil-portrait.png',
    alt: 'Portrait of Swapnil Gathibandhe, founder of ArtSwapy',
    placeholder: false
  }
};

export const showreel = {
  tag: 'Showreel',
  title: 'Logo Design Process — From Start to Finish',
  youtubeId: 'pTjizuQOoYo',
  caption: 'Craft, strategy and execution in motion.'
};

export const intro = {
  heading: ['Meaning first,', 'then the form.'] as [string, string],
  lead: 'ArtSwapy helps businesses find what makes them distinct, then shapes it into a brand people can recognise, trust and remember.',
  body: 'Work starts with strategy and carries through to identity, packaging, communications and the everyday places a brand shows up.',
  panorama: {
    alt: 'Drawn concept marks for three brand identities, set side by side in flat colour',
    credit: 'Concept marks drawn for this site',
    placeholder: true
  }
};

export const work = {
  heading: 'Selected work',
  enquiry: {
    subjectPrefix: 'Project enquiry — like ',
    body: 'Hi Swapnil,\n\nI saw the concept project and would like something like it.\nMy business is …\nWhat I need help with: …\n\nThanks,'
  }
};

/* Selected work — CONCEPT PLACEHOLDERS ONLY, not client projects. */
/* Selected work — Curated showcase matching Dzinr Studio scale */
export const projects: Project[] = [
  {
    id: 'aaranya',
    name: 'Aaranya',
    year: '2025',
    category: 'Botanical Skincare',
    discipline: 'Brand & Packaging',
    summary: 'A luxury botanical identity and packaging architecture built for ritual and calm.',
    placeholder: false,
    image: '/images/projects/aaranya.jpg',
    preview: { alt: 'Brand identity mockup for Aaranya skincare', mark: 'aaranya' },
    theme: {
      bg: '#141c15',
      text: '#f6f4ef',
      accent: '#ff551f'
    }
  },
  {
    id: 'common-ground',
    name: 'Common Ground',
    year: '2025',
    category: 'Civic Culture & Cafe',
    discipline: 'Strategy · Identity',
    summary: 'A positioning and visual identity system for everyday civic dialogue and community culture.',
    placeholder: false,
    image: '/images/projects/common-ground.jpg',
    preview: { alt: 'Brand identity mockup for Common Ground cafe and space', mark: 'common' },
    theme: {
      bg: '#1f1613',
      text: '#f6f4ef',
      accent: '#ff551f'
    }
  },
  {
    id: 'good-habit',
    name: 'Good Habit',
    year: '2024',
    category: 'Sparkling Energy',
    discipline: 'Packaging · Campaign',
    summary: 'A high-octane consumer wellness drink with electric typography, citrus accents, and bold shelf presence.',
    placeholder: false,
    image: '/images/projects/good-habit.jpg',
    preview: { alt: 'Product photography of Good Habit beverage cans', mark: 'habit' },
    theme: {
      bg: '#121110',
      text: '#f6f4ef',
      accent: '#ff551f'
    }
  },
  {
    id: 'kavita',
    name: 'Kavita',
    year: '2024',
    category: 'Independent Press',
    discipline: 'Editorial · Publishing',
    summary: 'A contemporary poetry press with bespoke linen bindings, blind debossing, and signature bookmark thread.',
    placeholder: false,
    image: '/images/projects/kavita.jpg',
    preview: { alt: 'Editorial book design mockup for Kavita press', mark: 'kavita' },
    theme: {
      bg: '#0f1722',
      text: '#f6f4ef',
      accent: '#ff551f'
    }
  },
  {
    id: 'dhara',
    name: 'Dhara',
    year: '2023',
    category: 'Architectural Studio',
    discipline: 'Spatial · Monograph',
    summary: 'An architectural studio monograph and material branding system anchored in raw earth and quiet light.',
    placeholder: false,
    image: '/images/projects/dhara.jpg',
    preview: { alt: 'Architectural monograph mockup for Dhara studio', mark: 'dhara' },
    theme: {
      bg: '#1e1613',
      text: '#f6f4ef',
      accent: '#ff551f'
    }
  }
];

export const services = {
  heading: 'Services',
  items: [
    {
      id: 'strategy',
      title: 'Strategy',
      fact: 'Positioning, voice, story',
      description: 'Positioning, voice and the story that holds a brand together.'
    },
    {
      id: 'identity',
      title: 'Identity',
      fact: 'Logo, type, colour, system',
      description: 'The name, mark, type and colour, built as a system that scales.'
    },
    {
      id: 'packaging',
      title: 'Packaging',
      fact: 'Packaging and print',
      description: 'Packaging and print built from the identity, ready for the shelf.'
    },
    {
      id: 'communications',
      title: 'Communications',
      fact: 'Campaign and voice',
      description: 'How the brand speaks in campaigns, print and everyday messages.'
    },
    {
      id: 'applications',
      title: 'Applications',
      fact: 'Digital and physical touchpoints',
      description: 'Digital and physical touchpoints that feel like one brand.'
    }
  ] satisfies Service[]
};

export const process = {
  heading: 'How a project moves',
  stages: [
    {
      id: 'strategy',
      index: '01',
      phase: 'Phase 01 · Discovery & Strategy',
      name: 'Strategy',
      line: 'Who you are, who it is for, and why anyone should care.',
      description: 'Uncovering the authentic core of your business. We analyze competitive whitespace, audience psychology, and brand positioning before sketching a single mark.',
      gives: 'Positioning and voice',
      deliverables: [
        'Brand Architecture & Positioning',
        'Target Audience Matrix & Personas',
        'Competitive Whitespace Audit',
        'Core Narrative & Brand Voice'
      ],
      duration: '1–2 Weeks',
      output: 'Strategic Deck & Creative Brief'
    },
    {
      id: 'identity',
      index: '02',
      phase: 'Phase 02 · System & Form',
      name: 'Identity',
      line: 'The name, mark, type and colour that carry it.',
      description: 'Translating strategy into an unmistakable visual signature. Bespoke typography, responsive logomarks, dynamic grids, and curated color palettes built to endure.',
      gives: 'Logo and identity system',
      deliverables: [
        'Primary & Responsive Logo Marks',
        'Bespoke Typographic System',
        'Color Harmony & Contrast Rules',
        'Comprehensive Brand Guidelines'
      ],
      duration: '2–3 Weeks',
      output: 'Complete Brand Identity System'
    },
    {
      id: 'packaging',
      index: '03',
      phase: 'Phase 03 · Tactile & Physical',
      name: 'Packaging',
      line: 'The identity made physical, shelf-ready.',
      description: 'Bringing the brand to life in the physical world. Precision die-lines, label typography, material selection, foil stamping, and tactile print finishes.',
      gives: 'Packaging design',
      deliverables: [
        'Custom Structural Box Die-Lines',
        'Label Hierarchy & Typography Specs',
        'Specialty Finishes (Foil, Emboss, UV)',
        'Production-Ready Print Files'
      ],
      duration: '2 Weeks',
      output: 'Print-Ready Production Files'
    },
    {
      id: 'communications',
      index: '04',
      phase: 'Phase 04 · Voice & Culture',
      name: 'Communications',
      line: 'How the brand speaks in print and campaign.',
      description: 'Creating high-impact advertising, editorial print, launch campaigns, and social design systems that command attention and ignite engagement.',
      gives: 'Campaign and print',
      deliverables: [
        'Campaign Art Direction & Concepts',
        'Editorial Print & Poster Series',
        'Social Grid & Motion Design Kit',
        'Headline & Storytelling Toolkit'
      ],
      duration: '1–2 Weeks',
      output: 'Launch Campaign Asset Library'
    },
    {
      id: 'applications',
      index: '05',
      phase: 'Phase 05 · Touchpoints & Scale',
      name: 'Applications',
      line: 'Every place it shows up, kept consistent.',
      description: 'Ensuring seamless consistency across digital products, web experiences, retail signage, merchandise, and scalable design token systems.',
      gives: 'Touchpoints and guidelines',
      deliverables: [
        'Responsive Web UI Design System',
        'Environmental & Retail Signage',
        'Stationery, Collateral & Merch',
        'Digital Design Tokens & Assets'
      ],
      duration: '2 Weeks',
      output: 'Design System & Master Asset Archive'
    }
  ] satisfies ProcessStage[]
};

export const about = {
  heading: 'Swapnil Gathibandhe',
  tag: 'ABOUT THE FOUNDER',
  name: 'Swapnil Gathibandhe',
  role: 'Founder & Creative Director',
  location: 'Nagpur, India · Working Worldwide',
  lead: 'ArtSwapy is an independent brand design and consulting practice founded by Swapnil Gathibandhe.',
  bio: {
    text: 'Independent brand designer and creative director focused on branding, identity systems, packaging, and digital experiences. Working closely with visionary founders to build distinct, enduring brands that turn everyday communication into memorable brand experiences.',
    placeholder: false
  },
  principles: [
    {
      num: '01',
      title: 'Meaning First',
      body: 'Strategy and positioning before decoration. Every visual decision is anchored in clear business rationale and cultural resonance.'
    },
    {
      num: '02',
      title: 'Systematic Craft',
      body: 'Identity systems built to scale with precision — from tactile packaging and print to digital products and motion.'
    },
    {
      num: '03',
      title: 'Independent Focus',
      body: 'Direct collaboration with the founder from day one. No agency bloat, no intermediate layers, pure creative velocity.'
    }
  ],
  disciplines: ['Brand Identity', 'Visual Strategy', 'Packaging Design', 'Digital Direction', 'Art Direction'],
  portrait: {
    src: '/images/swapnil-portrait.png',
    alt: 'Portrait of Swapnil Gathibandhe, founder of ArtSwapy',
    placeholder: false
  }
};

export const contact = {
  heading: ['Let’s make it', 'meaningful.'] as [string, string],
  cta: 'Start a project',
  hello: 'Hello',
  mailto: {
    to: site.email.address,
    subject: 'Project enquiry',
    body: 'Hi Swapnil,\n\nMy business is …\nWhat I need help with: …\nTimeline: …\n\nThanks,'
  } satisfies MailtoTemplate,
  setName: {
    label: 'Your business name',
    hint: 'Shown in our type, and added to your email subject.',
    placeholder: 'Your name',
    sample: 'Your name'
  },
  routes: [
    { id: 'email', label: 'Email', value: site.email.address, placeholder: site.email.placeholder },
    { id: 'whatsapp', label: 'WhatsApp', value: 'https://wa.me/919823034567', placeholder: false },
    { id: 'location', label: 'Location', value: 'Nagpur, India', placeholder: false },
    { id: 'availability', label: 'Availability', value: 'Available for new projects', placeholder: false }
  ] satisfies ContactRoute[]
};
