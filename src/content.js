/* ==========================================================================
   ArtSwapy — editable home page content
   --------------------------------------------------------------------------
   Edit copy here rather than inside components.
   Anything with `placeholder: true` renders with a visible "Placeholder"
   label on the site. Replace it with confirmed content, then set the flag
   to false (or remove it) before launch.
   ========================================================================== */

export const site = {
  name: 'ArtSwapy',
  founder: 'Swapnil Gathibandhe',
  email: {
    address: 'hello@artswapy.com',
    placeholder: true // Confirm the real contact address before launch.
  }
};

export const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' }
];

export const hero = {
  eyebrow: 'Brand design & consulting practice',
  // Each entry is one line of the headline. `accent` lines render in orange.
  headline: [
    { text: 'Brands with' },
    { text: 'meaning.', accent: true },
    { text: 'Made to be' },
    { text: 'remembered.' }
  ],
  supporting:
    'Strategy, identity, and brand experiences for businesses that want to be understood — not just seen. An independent practice led by Swapnil Gathibandhe.',
  portrait: {
    // Drop the supplied portrait at public/images/swapy-portrait.png
    src: '/images/swapy-portrait.png',
    alt: 'Portrait of Swapnil Gathibandhe, founder of ArtSwapy',
    caption: 'Swapnil Gathibandhe — Founder'
  },
  meta: [
    { label: 'Based in', value: 'City, Country', placeholder: true },
    { label: 'Availability', value: 'Add current availability', placeholder: true }
  ],
  scrollCue: { href: '#work', label: 'See selected work' }
};

export const intro = {
  eyebrow: 'The studio',
  lead:
    'ArtSwapy helps businesses find what makes them distinct — then shapes it into a brand people can recognise, trust, and remember.',
  body:
    'Work starts with strategy and carries through to identity, packaging, communications, and the everyday places a brand shows up.'
};

/*
  Selected work — CONCEPT PLACEHOLDERS ONLY.
  These are not client projects. Replace with approved work (name, summary,
  deliverables, imagery) before launch.
*/
export const projects = [
  {
    no: '01',
    name: 'Aaranya',
    year: '2025',
    category: 'Identity · Packaging',
    industry: 'Botanical & Lifestyle',
    summary: 'A botanical identity and packaging concept.',
    className: 'aaranya',
    mark: 'A',
    line: 'Rooted in\nsomething real'
  },
  {
    no: '02',
    name: 'Common Ground',
    year: '2025',
    category: 'Strategy · Identity',
    industry: 'Culture & Commerce',
    summary: 'A positioning and visual identity concept.',
    className: 'common',
    mark: 'CG',
    line: 'A little more\nhuman'
  },
  {
    no: '03',
    name: 'Good Habit',
    year: '2024',
    category: 'Identity · Campaign',
    industry: 'Consumer Wellness',
    summary: 'A consumer brand and campaign concept.',
    className: 'habit',
    mark: 'GH',
    line: 'Make room\nfor better'
  }
];

export const services = [
  {
    num: '01',
    title: 'Brand Strategy',
    description: 'Positioning, voice, and the story that holds a brand together.'
  },
  {
    num: '02',
    title: 'Visual Identity',
    description: 'Logo, typography, colour, and a system that scales.'
  },
  {
    num: '03',
    title: 'Packaging & Communications',
    description: 'Packaging, print, and campaign work built from the identity.'
  },
  {
    num: '04',
    title: 'Brand Experiences',
    description: 'Digital and physical touchpoints that feel like one brand.'
  }
];

export const about = {
  eyebrow: 'Founder',
  heading: 'Meet Swapnil.',
  lead: 'ArtSwapy is a brand design and consulting practice founded by Swapnil Gathibandhe.',
  bio: {
    text: 'Add a short founder bio here — background, approach, and what it is like to work together.',
    placeholder: true
  },
  processLabel: 'How a project moves',
  process: ['Strategy', 'Identity', 'Packaging', 'Communications', 'Applications']
};

export const contact = {
  eyebrow: 'Start a project',
  heading: ['Let’s make it', 'meaningful.'],
  text: 'Tell us about your business, where it is today, and where you want it to go.',
  cta: 'Start a project'
};

export const brandQuotes = [
  {
    id: 'rand',
    quote: 'Design is the silent ambassador of your brand.',
    author: 'Paul Rand',
    role: 'Modern Corporate Identity Pioneer',
    topic: 'Visual Ambassador'
  },
  {
    id: 'zeldman',
    quote: 'Content precedes design. Design in the absence of content is not design, it’s decoration.',
    author: 'Jeffrey Zeldman',
    role: 'Web Standards Pioneer',
    topic: 'Content Strategy'
  },
  {
    id: 'gansky',
    quote: 'A brand is a voice and a product is a souvenir.',
    author: 'Lisa Gansky',
    role: 'Author & Entrepreneur',
    topic: 'Brand Longevity'
  },
  {
    id: 'artswapy',
    quote: 'Identity is not a superficial veneer. It is what you stand for when the noise fades and the room goes quiet.',
    author: 'ArtSwapy Studio',
    role: 'Studio Axiom',
    topic: 'Radical Authenticity'
  },
  {
    id: 'maeda',
    quote: 'Simplicity is about subtracting the obvious and adding the meaningful.',
    author: 'John Maeda',
    role: 'The Laws of Simplicity',
    topic: 'Craft Reduction'
  }
];
