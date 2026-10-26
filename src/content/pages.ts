/** Page-level copy for routes that are not driven by a dedicated data file. */

export const productPage = {
  eyebrow: "Platform",
  heading: "One platform for fewer breakdowns and lower energy cost.",
  body: "Vigil Reliability layers trusted data, early warnings and operating discipline on top of the control systems you already run.",
  architectureHeading: "How it fits your plant",
  architectureBody: "Four layers, each one earning the next. Data flows up from the plant floor, and decisions flow back down to it.",
  modulesHeading: "Modules for each plant priority",
  modulesBody: "Modules share one data foundation. Start with the ones that fit your priorities and add more as the plant is ready.",
  coverageHeading: "The same platform in every area of the plant",
  coverageBody: "The same modules apply from the crusher to the packer. See what we cover in each process area.",
  coverageCta: "Explore equipment coverage",
  supportingHeading: "Supporting capabilities",
  seo: {
    title: "Platform Overview",
    description:
      "Vigil Reliability platform architecture and modules: plant data historian, predictive failure AI, engineer app, maintenance, reliability, energy and governance.",
  },
};

export const modulePageLabels = {
  breadcrumb: "Product",
  problemEyebrow: "The problem",
  featuresEyebrow: "What it does",
  agentsEyebrow: "Agents that use it",
  otherModules: "Explore other modules",
  focusEquipment: "Focus equipment",
  categoryNote: {
    Foundation: "Foundation module: the data and routines everything else builds on.",
    Predict: "Predict module: early warnings and root cause across plant equipment.",
    Operate: "Operate module: the maintenance and management discipline that sustains results.",
    Optimize: "Optimize module: energy and process performance.",
  },
  areasHeading: "Where it applies",
};

export const agentPageLabels = {
  breadcrumb: "AI agents",
  signalsHeading: "Signals it watches",
  howHeading: "How it works",
  outputsHeading: "What it produces",
  modulesHeading: "Built on",
  otherAgents: "Meet the other agents",
  humanNote: "Agents recommend and draft. Your engineers decide.",
};

export const approachPage = {
  eyebrow: "How we deploy",
  heading: "Prove results on your biggest problem first, then scale.",
  body: "Every plant starts from a different place. Our deployment method fits your priorities, your equipment and your pace, from a single area to the whole plant and across plants.",
  stepsHeading: "Six steps from first look to plant-wide results",
  stepsBody: "Scope and pace are agreed with each plant. Select a step to see what happens and what you get.",
  startHeading: "Where most plants start",
  startBody: "Any process area can come first. These are the ones plants pick most often.",
  ladderHeading: "How far you can take it",
  ladderBody: "From trusted data to closed-loop operations. Plants climb at their own pace.",
  principlesHeading: "How we work with your team",
  principles: [
    { title: "Data before models", body: "A tag and instrument audit comes first. We don't train AI on signals we can't trust." },
    { title: "Focused first, then plant-wide", body: "Prove it where it matters most, then scale with evidence." },
    { title: "Co-designed with users", body: "Dashboards and apps are shaped with the operators and engineers who use them every day." },
    {
      title: "Measured against your baseline",
      body: "Targets are validated against your plant's own measured baseline, not industry averages.",
    },
  ],
  seo: {
    title: "How We Deploy",
    description:
      "How Vigil.AI deploys predictive reliability in manufacturing plants: assess, connect, baseline, predict, optimize and scale, starting from any plant area.",
  },
};

export const aboutPage = {
  eyebrow: "About Vigil.AI",
  heading: "Software that keeps manufacturing plants running.",
  body: "Vigil.AI builds asset reliability and operational excellence software for cement, pharmaceutical, oil and gas, steel and automotive manufacturing. Our name means watchfulness: the steady, attentive care that keeps critical equipment running.",
  storyHeading: "Why heavy and process industry",
  story: [
    "Manufacturing plants run some of the most demanding equipment in industry: kilns and furnaces that never cool, reactors that must hold a profile, compressors that run for years, and lines that move at takt time. When one link fails, the whole chain feels it.",
    "Most plants already collect the data that could warn them. What's missing is a trusted foundation, models that understand industrial equipment and the operating habits to act on what the data shows. That is what we build.",
  ],
  locationHeading: "Where we are",
  locationBody:
    "Headquartered in St. Louis, Missouri, USA, with delivery ties to India, serving manufacturers in India, the Middle East, Southeast Asia and the United States.",
  markets: ["India", "Middle East", "Southeast Asia", "United States"],
  valuesHeading: "What we believe",
  values: [
    { title: "Honest numbers", body: "We publish targets, not promises, and validate them against your baseline." },
    { title: "Plant-grounded", body: "Every model and recommendation must make sense to the engineer on the floor." },
    { title: "Built to last", body: "Software is half the job. Habits, governance and capability are the other half." },
  ],
  photoAlt: "Manufacturing plant at dusk",
  photoNote: "Plant photography coming soon",
  seo: {
    title: "About",
    description:
      "Vigil.AI builds predictive reliability software for manufacturing plants. Headquartered in St. Louis, Missouri, with delivery ties to India.",
  },
};

export const contactPage = {
  eyebrow: "Request a demo",
  heading: "See Vigil working on data from your industry.",
  body: "Tell us about your plant and we'll walk you through the platform with sample data from your industry, and talk through where your plant could start.",
  expectHeading: "What to expect",
  expect: [
    "A reply within two business days",
    "A 45-minute walkthrough tailored to your equipment",
    "A suggested starting scope for your plant",
  ],
  directHeading: "Prefer email?",
  seo: {
    title: "Request a Demo",
    description: "Request a demo of Vigil Reliability, the predictive reliability platform for manufacturing plants.",
  },
};

export const assessmentPage = {
  eyebrow: "Free plant assessment",
  heading: "Find your plant's biggest reliability and energy gaps, free.",
  body: "A structured, no-cost assessment of your data readiness, reliability maturity and energy baseline, with a clear view of where Vigil would start.",
  coversHeading: "What the assessment covers",
  covers: [
    { title: "Data readiness", body: "Control systems, historian status, tag coverage and instrument health on critical assets." },
    { title: "Reliability maturity", body: "Where maintenance sits on the Reactive → Proactive path, and the top bad actors." },
    { title: "Energy baseline", body: "How specific energy is tracked today, and the likely loss areas." },
    { title: "Starting scope", body: "Recommended starting areas, critical assets and success criteria." },
  ],
  seo: {
    title: "Free Plant Assessment",
    description: "Request a free assessment of your plant's data readiness, reliability maturity and energy baseline.",
  },
};

export const resourcesPage = {
  eyebrow: "Resources",
  heading: "Practical guides for a more reliable, efficient plant.",
  body: "Practical writing for plant teams on historians, predictive maintenance, energy losses and operating rhythm.",
  filterLabel: "Filter by type",
  allLabel: "All",
  empty: "Nothing here yet. Check back soon.",
  minRead: "min read",
  related: "More resources",
  seo: {
    title: "Resources",
    description:
      "Articles, case studies, whitepapers, webinars and videos on manufacturing reliability, energy optimization and plant data.",
  },
};

export const notFoundPage = {
  code: "404",
  heading: "This signal dropped out.",
  body: "The page you were looking for doesn't exist or has moved. Let's get you back to something that's running.",
  home: "Back to home",
  product: "Explore the platform",
};

export const deploymentLabels = {
  stepsLabel: "Deployment steps",
  activities: "What happens",
  outputs: "What you get",
};
