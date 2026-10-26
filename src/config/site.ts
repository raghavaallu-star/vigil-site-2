/**
 * Single source of truth for brand, contact details and navigation.
 * Values marked PLACEHOLDER must be replaced before launch (see README).
 */

import { agents } from "@/content/agents";
import { industries } from "@/content/industries";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const siteConfig = {
  name: "Vigil.AI",
  productName: "Vigil Reliability",
  shortProduct: "Vigil",
  tagline: "Always watching your assets.",
  positioning: "From reactive plant to predictive plant.",
  description:
    "Vigil.AI brings predictive reliability, energy optimization and operational excellence to manufacturing plants in cement, pharmaceuticals, oil and gas, steel and automotive.",
  url: siteUrl,
  locale: "en_US",
  location: {
    city: "St. Louis",
    region: "Missouri",
    country: "USA",
    note: "Headquartered in St. Louis, Missouri, with delivery ties to India.",
  },
  contact: {
    email: "contact@example.com", // PLACEHOLDER: real inbox
    phone: "", // PLACEHOLDER: leave empty to hide
    address: "St. Louis, Missouri, USA", // PLACEHOLDER: full street address
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" }, // PLACEHOLDER: company page
  ],
  ctas: {
    primary: { label: "Request a Demo", href: "/contact" },
    secondary: { label: "See How It Works", href: "/#platform" },
    assessment: { label: "Get a Plant Assessment", href: "/assessment" },
    contact: { label: "Contact Us", href: "/contact" },
  },
  ui: {
    skipToContent: "Skip to content",
    homeSuffix: " home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main",
    footerNav: "Footer",
    illustrative: "Illustrative",
    illustrativeTitle: "Illustrative mock with sample data. Not a real plant.",
    targetFootnoteMark: "†",
    targetFootnoteLink: "See footnote: target range, validated in baseline phase",
    targetFootnote:
      "Target range, validated in baseline phase. Targets are confirmed against each plant's own measured baseline during deployment and are not guaranteed results.",
    readMore: "Learn more",
    breadcrumb: "Breadcrumb",
    backTo: "Back to",
    allResources: "All resources",
    loading: "Watching…",
    photo: "Photo",
    photoBy: "by",
    photoCropped: "cropped",
  },
} as const;

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { heading: string; links: NavLink[]; columns?: 1 | 2 };
export type NavItem = {
  label: string;
  href: string;
  groups: NavGroup[];
  feature?: { eyebrow: string; title: string; body: string; cta: NavLink };
};

const industryLinks: NavLink[] = industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}`, description: i.tagline }));
const agentLinks: NavLink[] = agents.map((a) => ({ label: a.name, href: `/agents/${a.slug}` }));

const roleLinks: NavLink[] = [
  { label: "Plant Head", href: "/solutions#plant-head" },
  { label: "Reliability Manager", href: "/solutions#reliability-manager" },
  { label: "Maintenance Head", href: "/solutions#maintenance-head" },
  { label: "Energy Manager", href: "/solutions#energy-manager" },
  { label: "Process Engineer", href: "/solutions#process-engineer" },
  { label: "Electrical & Instrumentation", href: "/solutions#electrical-instrumentation" },
];

const productLinks: NavLink[] = [
  { label: "Platform overview", href: "/product" },
  { label: "Interactive demo", href: "/demo" },
  { label: "Plant Data Historian", href: "/product/historian" },
  { label: "Predictive Failure AI", href: "/product/predictive-failure-ai" },
  { label: "Engineer Mobile App", href: "/product/engineer-app" },
  { label: "Maintenance Management", href: "/product/maintenance-management" },
  { label: "Reliability Excellence", href: "/product/reliability-excellence" },
  { label: "Energy & Process Optimization", href: "/product/energy-optimization" },
  { label: "Plant Performance Governance", href: "/product/governance" },
];

export const mainNav: NavItem[] = [
  {
    label: "Industries",
    href: "/industries",
    groups: [{ heading: "Key domains", links: [{ label: "All industries", href: "/industries" }, ...industryLinks] }],
    feature: {
      eyebrow: "Cement",
      title: "Savings estimate",
      body: "Estimate fuel and power savings for a cement plant across our target ranges.",
      cta: { label: "Open the calculator", href: "/roi" },
    },
  },
  {
    label: "Who We're For",
    href: "/solutions",
    groups: [{ heading: "By role", links: roleLinks }],
    feature: {
      eyebrow: "Free",
      title: "Plant Assessment",
      body: "A structured look at your data readiness, reliability maturity and energy baseline.",
      cta: { label: "Request an assessment", href: "/assessment" },
    },
  },
  {
    label: "Product",
    href: "/product",
    groups: [
      { heading: "Platform", links: productLinks },
      { heading: "AI agents", links: agentLinks },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    groups: [
      {
        heading: "Learn",
        links: [
          { label: "All resources", href: "/resources" },
          { label: "Blog", href: "/resources?type=Blog" },
          { label: "Case studies", href: "/resources?type=Case+Study" },
          { label: "Whitepapers", href: "/resources?type=Whitepaper" },
          { label: "Webinars", href: "/resources?type=Webinar" },
          { label: "Videos", href: "/resources?type=Video" },
        ],
      },
    ],
    feature: {
      eyebrow: "Featured",
      title: "Why a historian comes before AI",
      body: "The unglamorous first step that decides whether predictive maintenance works.",
      cta: { label: "Read the article", href: "/resources/historian-before-ai" },
    },
  },
  {
    label: "About",
    href: "/about",
    groups: [
      {
        heading: "Company",
        links: [
          { label: "About Vigil.AI", href: "/about", description: "Who we are and the plants we serve" },
          { label: "How we deploy", href: "/approach", description: "Method, starting points and honest risks" },
          { label: "Contact", href: "/contact", description: "Talk to the team" },
        ],
      },
    ],
  },
];

export const footerNav: NavGroup[] = [
  {
    heading: "Industries",
    links: [{ label: "All industries", href: "/industries" }, ...industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` }))],
  },
  { heading: "Product", links: [...productLinks, { label: "Cement savings estimate", href: "/roi" }] },
  { heading: "AI agents", links: agentLinks },
  { heading: "Who we're for", links: [{ label: "Solutions by role", href: "/solutions" }, ...roleLinks] },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How we deploy", href: "/approach" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
      { label: "Plant Assessment", href: "/assessment" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Image credits", href: "/credits" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export const footerCopy = {
  blurb: "Vigil.AI helps manufacturing plants move from breakdown maintenance to predictive operations, starting with trusted data.",
  copyright: `© ${new Date().getFullYear()} Vigil.AI. All rights reserved.`,
  cookieSettings: "Cookie settings",
};
