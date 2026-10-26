/**
 * Shared content types. Every piece of marketing copy on the site is typed
 * here and authored in the sibling data files, so copy can be edited without
 * touching components.
 */

export type IconName =
  | "kiln"
  | "mill"
  | "fan"
  | "cooler"
  | "crusher"
  | "historian"
  | "sensor"
  | "gauge"
  | "wrench"
  | "shield"
  | "bolt"
  | "flame"
  | "chart"
  | "phone"
  | "users"
  | "boxes"
  | "target"
  | "eye"
  | "layers"
  | "clock"
  | "quarry"
  | "conveyor"
  | "silo"
  | "cyclone"
  | "packer"
  | "compressor"
  | "motor"
  | "gearbox"
  | "pump"
  | "filter"
  | "power"
  | "truck"
  | "flask"
  | "pill"
  | "fuel"
  | "factory"
  | "car"
  | "bot"
  | "droplets"
  | "anvil"
  | "thermometer"
  | "syringe"
  | "package"
  | "wind"
  | "hammer"
  | "container"
  | "paint"
  | "battery"
  | "waves"
  | "warehouse"
  | "testtube";

/** Which product UI mock to render for a module / agent / tab. */
export type MockKind =
  | "trend"
  | "gauge"
  | "alerts"
  | "workorder"
  | "checklist"
  | "energy"
  | "kpis"
  | "historian"
  | "rootcause"
  | "maturity"
  | "fleet"
  | "mill"
  | "conveyor"
  | "dispatch"
  | "assets"
  | "batch"
  | "integrity"
  | "furnace"
  | "oee";

export interface Cta {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  body: string;
}

export type ModuleCategory = "Foundation" | "Predict" | "Operate" | "Optimize";

export interface Module {
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  tagline: string;
  summary: string;
  /** A short, quotable line that frames why the module matters. */
  pullQuote?: string;
  problem: { heading: string; body: string };
  features: Feature[];
  /** Items shown as a stepped path, e.g. a maturity ladder. */
  path?: { heading: string; steps: { label: string; body: string }[] };
  kpis?: { heading: string; items: string[] };
  focusEquipment?: string[];
  mocks: MockKind[];
  relatedAgents: string[];
  category: ModuleCategory;
  seo: { title: string; description: string };
}

export interface SupportingCapability {
  name: string;
  icon: IconName;
  body: string;
}

export interface Agent {
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  promise: string;
  bullets: [string, string, string];
  mock: MockKind;
  signals: string[];
  howItWorks: Feature[];
  outputs: string[];
  relatedModules: string[];
  /** Industry slugs this agent applies to; "all" for cross-industry agents. */
  industries: string[] | "all";
  seo: { title: string; description: string };
}

export interface GapTab {
  id: string;
  label: string;
  heading: string;
  gap: string;
  closesWith: string;
  agents: string[];
  modules: string[];
  mock: MockKind;
}

/** One step of the generic deployment method (not tied to any customer timeline). */
export interface DeploymentStep {
  id: string;
  label: string;
  heading: string;
  body: string;
  activities: string[];
  outputs: string[];
}

/** A common place for a plant to begin. */
export interface StartingPoint {
  title: string;
  body: string;
  icon: IconName;
  links: { label: string; href: string }[];
}

/** A stage on the capability ladder from foundation to autonomous operations. */
export interface CapabilityStage {
  stage: string;
  heading: string;
  body: string;
  items: string[];
}

/** A process area of the cement plant, quarry to dispatch. */
export interface PlantArea {
  slug: string;
  name: string;
  short: string;
  step: number;
  icon: IconName;
  tagline: string;
  summary: string;
  assets: { name: string; watch: string[] }[];
  failureModes: string[];
  signals: string[];
  kpis: string[];
  agents: string[];
  modules: string[];
  mock: MockKind;
  seo: { title: string; description: string };
}

/** Equipment types that appear across every area of the plant. */
export interface AssetClass {
  slug: string;
  name: string;
  icon: IconName;
  body: string;
  watch: string[];
  failureModes: string[];
  foundIn: string[];
}

export interface Risk {
  risk: string;
  why: string;
  mitigation: string;
  icon: IconName;
}

export interface Role {
  slug: string;
  role: string;
  icon: IconName;
  pains: string[];
  gets: string[];
  kpis: string[];
  modules: string[];
}

/** Approved customer logos only. Leave empty until a customer signs off. */
export interface Customer {
  name: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  href?: string;
}

/** Approved testimonials only. Leave empty until the quote is signed off. */
export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

export type ResourceType = "Blog" | "Case Study" | "Whitepaper" | "Webinar" | "Video";

export interface ResourceMeta {
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  date: string; // ISO yyyy-mm-dd
  readingMinutes: number;
  author: string;
  tags: string[];
  /** Drafts are excluded from listings, routes and the sitemap unless NEXT_PUBLIC_SHOW_DRAFTS=true. */
  draft?: boolean;
}

export interface PhotoCrop {
  /** Width:height of the crop, e.g. [21, 9]. */
  aspect: [number, number];
}

/** A real-photo slot with per-breakpoint crops around a focal point. */
export interface PhotoSlot {
  id: string;
  where: string;
  alt: string;
  /** Point to keep in frame, 0–1 from the left and top of the original. */
  focus: { x: number; y: number };
  crops: { desktop: PhotoCrop; mobile: PhotoCrop };
  /** Attribution for openly licensed photos (shown in captions and on /credits). */
  credit?: { title: string; author: string; license: string; licenseUrl: string; source: string };
}

/** A manufacturing vertical Vigil serves, with its own process areas. */
export interface Industry {
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  /** Photo slot ids (see photos.ts): hero and secondary band. */
  photo: string;
  photoSecondary: string;
  tagline: string;
  summary: string;
  intro: string;
  challenges: Feature[];
  areasHeading: string;
  areas: PlantArea[];
  useCases: { title: string; body: string; agent?: string }[];
  kpis: string[];
  considerations: Feature[];
  agents: string[];
  modules: string[];
  /** Optional link to industry-specific tools (e.g. the cement savings estimate). */
  extra?: { label: string; href: string; body: string };
  seo: { title: string; description: string };
}
