export type Device = 'phone' | 'laptop';

export interface Project {
  id: string;
  num: string;
  name: string;
  short: string;
  eyebrow: string;
  tag: string;
  subtitle: string;
  desc: string;
  role: string;
  timeline: string;
  platform: string;
  device: Device;
  /** object-fit for phone screens: originals with white margins use contain */
  fit?: 'cover' | 'contain';
  gallery: string[];
  problem: string;
  approach: string[];
  outcome: string;
  learning: string;
  color: string;
}

const a = (f: string) => `/assets/${f}`;

export const projects: Project[] = [
  {
    id: 'mevia', num: '01', name: 'Mevia Studio', short: 'Mevia',
    eyebrow: 'Product design · SaaS · 2026—Present', tag: 'Complexity, made coherent',
    subtitle: 'A connected operating system for creator marketing.',
    desc: 'From fragmented creator-marketing workflows to one connected experience.',
    role: 'UI/UX Designer', timeline: 'June 2026 — Present', platform: 'Web SaaS + browser extension',
    device: 'laptop',
    gallery: ['mevia-scout-original.webp', 'design-system-full-board.webp', 'mevia-typography-original.webp', 'analytics-full-board.webp'].map(a),
    problem: 'Creator marketing spans discovery, coordination, approvals, communications and performance. When these activities live in disconnected workflows, teams lose context and the product becomes difficult to navigate.',
    approach: [
      'Mapped the information hierarchy and interaction patterns across a growing multi-module SaaS product.',
      'Designed Teams, Communication, Mev Scout and Creator Vault; contributed to onboarding, dashboards, analytics and reporting for a fifth module.',
      'Created a reusable design system of 50+ components, interaction guidance, brand book and website homepage.',
      'Prepared detailed handoff specifications and collaborated with developers to clarify behavior.',
    ],
    outcome: 'Four core modules designed, fifth in progress; 50+ reusable components, a brand system, homepage and developer-ready handoff.',
    learning: 'Designing for scale means creating consistency without sacrificing flexibility.',
    color: '#DCEFE0',
  },
  {
    id: 'shipthis', num: '02', name: 'Shipthis', short: 'Shipthis',
    eyebrow: 'Enterprise UX · Information architecture', tag: 'Make complexity understandable',
    subtitle: 'Helping enterprise buyers find clarity before they sign up.',
    desc: 'Rethinking the way a complex SaaS product communicates its value.',
    role: 'UI/UX & Frontend Design Intern', timeline: 'Nov 2025 — Apr 2026', platform: 'Responsive B2B SaaS website',
    device: 'laptop',
    gallery: ['shipthis-01-careers.webp', 'shipthis-02-contact-us.webp', 'shipthis-03-resources-blog.webp', 'shipthis-04-careers-listings.webp', 'shipthis-05-resources-alternate.webp', 'shipthis-06-careers-alternate.webp'].map(a),
    problem: 'Enterprise customers need to compare plans, understand the offering and make informed decisions. Dense pricing information and inconsistent marketing-page hierarchy can get in the way.',
    approach: [
      'Conducted UX audits and competitor analysis to identify content and usability gaps.',
      'Reorganized pricing information and visual hierarchy to make plan comparison easier to scan.',
      'Explored alternatives through wireframes and interactive prototypes.',
      'Designed high-fidelity Contact, Careers and Blog pages within an established design system and worked with developers on handoff.',
    ],
    outcome: 'Pricing-page redesign, three marketing pages, UX audits, competitor review, wireframes and prototypes.',
    learning: 'Information architecture is a business tool, not just a design exercise.',
    color: '#E6E4F7',
  },
  {
    id: 'freelance', num: '03', name: 'Freelancing Growth App', short: 'Freelance',
    eyebrow: 'Mobile UX · Research · Concept', tag: 'A calmer way to work',
    subtitle: 'Helping independent professionals manage work, money and growth.',
    desc: 'One mobile-first home for the many moving parts of freelance life.',
    role: 'Product Designer · Concept', timeline: 'Ongoing', platform: 'Mobile app · Figma',
    device: 'phone', fit: 'contain',
    gallery: ['freelance-jobs-original-1.jpeg', 'freelance-jobs-original-2.jpeg', 'freelance-jobs-original-3.jpeg'].map(a),
    problem: 'Freelancers juggle clients, projects, invoices, payments and job opportunities across separate tools. The concept explores whether a connected experience can make the essentials easier to see and act on.',
    approach: [
      'Interviewed 6+ freelancers and reviewed 10+ finance apps to explore user needs and feature gaps.',
      'Created 3+ personas, user journeys, information architecture and MVP flows.',
      'Designed dashboard, projects, financial visibility and job-discovery experiences.',
      'Explored AI job-matching indicators as a concept, not as a deployed recommendation system.',
    ],
    outcome: 'Research, competitor analysis, personas, journeys, IA, wireframes and high-fidelity prototype explorations; concept validation is still needed.',
    learning: 'The goal is not to put everything in one app; it is to make related tasks work better together.',
    color: '#EEF3C9',
  },
  {
    id: 'food', num: '04', name: 'Foodgo', short: 'Foodgo',
    eyebrow: 'Mobile UX · Interaction redesign', tag: 'From craving to checkout',
    subtitle: 'Making food ordering feel effortless.',
    desc: 'A more understandable journey from browsing to customization and checkout.',
    role: 'UI/UX Designer · Concept', timeline: 'Design exploration', platform: 'Mobile app · Figma',
    device: 'phone', fit: 'cover',
    gallery: ['foodgo-01-home.webp', 'foodgo-02-cheeseburger-details.webp', 'foodgo-03-customer-support.webp', 'foodgo-04-fried-chicken-details.webp', 'foodgo-05-chicken-burger-details.webp', 'foodgo-06-payment-checkout.webp'].map(a),
    problem: 'Food ordering involves discovery, selection, customization and checkout. Unclear navigation or selection states add unnecessary decisions.',
    approach: [
      'Revisited the end-to-end ordering journey and navigation structure.',
      'Clarified food customization interactions and selection states.',
      'Developed wireframes and high-fidelity screens for a more cohesive browsing-to-ordering flow.',
    ],
    outcome: 'Redesigned ordering flow, navigation, customization interactions and high-fidelity screens. Conversion improvements have not been measured.',
    learning: 'A good checkout helps people feel confident about what they selected and what happens next.',
    color: '#FBE3D6',
  },
];

export const MAIL = 'mailto:shariyahabiba125@gmail.com';
export const EMAIL = 'shariyahabiba125@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/shariya-habiba/';
