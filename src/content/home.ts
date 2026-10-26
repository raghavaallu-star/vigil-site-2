import type { GapTab, IconName } from "./types";

export const hero = {
  eyebrow: "AI for manufacturing reliability",
  headlineLead: "Stop Reacting.",
  headlineAccent: "Start Predicting.",
  subhead:
    "Vigil turns the data your plant already produces into early warnings, clear priorities and lower energy use, for cement, pharmaceutical, oil and gas, steel and automotive manufacturers.",
  positioning: "From reactive plant to predictive plant.",
  statusLabel: "Live watch",
  secondaryCta: "Explore the platform",
  artCaption: "Five industries, one platform.",
  photoCredit: "Photos: Wikimedia Commons (CC BY / BY-SA)",
  cardTitle: "Kiln 1 · shell zone 4",
  cardStatus: "Drift detected",
  cardDetail: "Flagged before any alarm limit was reached.",
  chips: [
    { label: "Early warning", detail: "Kiln 1 · roller bearing", tone: "warn" as const },
    { label: "Work order drafted", detail: "Raw mill gearbox", tone: "info" as const },
    { label: "Root cause linked", detail: "Lubrication, 2 past events", tone: "ok" as const },
  ],
  proof: { areas: "industries served", agents: "AI agents", readOnly: "Read-only", readOnlyLabel: "connection to your control systems" },
  statusItems: ["Crusher 1 rotor", "Kiln 1 shell", "Cement mill 2", "Packer 3 spouts"],
};

export const builtFor = {
  label: "Built for heavy and process industries",
};

export const vision = {
  eyebrow: "The shift",
  heading: "From firefighting to planned, predictable running.",
  pairs: [
    { from: "Reactive plant", to: "Predictive plant" },
    { from: "Manual reporting", to: "Automatic daily KPI reports" },
    { from: "Operator experience alone", to: "Data-driven decisions" },
    { from: "Breakdown maintenance", to: "Predictive maintenance" },
  ],
};

export const gapSection = {
  eyebrow: "The gap",
  heading: "Your plant already records the warning signs. Vigil makes sure someone acts on them.",
  body: "In every industry, the signals that predict a stop, an energy loss or a quality deviation are already in your control systems. The gap is between that data and the decisions made on the floor.",
  gapLabel: "The gap",
  closesLabel: "How Vigil closes it",
  agentsLabel: "Agents on the job",
  modulesLabel: "Built on",
};

export const gapTabs: GapTab[] = [
  {
    id: "performance",
    label: "Performance",
    heading: "Run every shift like your best shift.",
    gap: "Output, run factor and line OEE swing with conditions, but best-run settings live in people's heads and shift reports arrive the next day.",
    closesWith: "Shared KPIs from one historian, best-run windows mined from your own history, and a daily rhythm to act on them.",
    agents: ["line-throughput", "energy-optimization", "batch-quality"],
    modules: ["historian", "governance"],
    mock: "kpis",
  },
  {
    id: "maintenance",
    label: "Maintenance",
    heading: "Spend the week on planned work, not breakdowns.",
    gap: "Hundreds of motors, gearboxes, conveyors and pumps compete for attention. Breakdowns crowd out planned work, PM tasks slip, and work orders close with too little data to learn from.",
    closesWith: "Criticality-ranked work queues, AI-drafted work orders and a measured path from reactive to proactive maintenance.",
    agents: ["maintenance-planner", "rotating-equipment"],
    modules: ["maintenance-management", "engineer-app"],
    mock: "workorder",
  },
  {
    id: "reliability",
    label: "Reliability",
    heading: "Stop the same failures coming back.",
    gap: "From compressor bearings to robot reducers and kiln rollers, field notes and sensor data never meet, so root cause analysis is slow and the same bad actors keep failing.",
    closesWith: "Early-warning models with per-asset baselines, and breakdown logs linked to the signals that preceded them.",
    agents: ["rotating-equipment", "root-cause", "asset-integrity"],
    modules: ["predictive-failure-ai", "reliability-excellence"],
    mock: "trend",
  },
  {
    id: "safety-energy",
    label: "Safety & Energy",
    heading: "Cut heat and power losses, and catch hazards early.",
    gap: "Fouled exchangers, unstable furnaces and kilns, inefficient grinding and utility leaks quietly raise energy use, while thermal hot spots and abnormal conditions create safety exposure.",
    closesWith:
      "Specific energy by unit and line, loss alerts for heat, power and utilities, plus early warnings for furnace, kiln and caster thermal patterns.",
    agents: ["energy-optimization", "furnace-health", "kiln-health"],
    modules: ["energy-optimization"],
    mock: "energy",
  },
];

export const notAutomation = {
  eyebrow: "Not automation",
  heading: "Works with your control system, not instead of it.",
  body: "Vigil doesn't replace your control system or your people. It sits on top of what you already run, builds one trusted record, and puts clear, explainable warnings in front of the engineers who make the call.",
  points: [
    { title: "Read-only by default", body: "Vigil reads from PLC, DCS and SCADA. It doesn't take control of your plant." },
    { title: "Humans decide", body: "Agents recommend and draft. Engineers confirm, adjust or dismiss." },
    { title: "Every layer earns the next", body: "Trusted data first, then predictions, then optimization." },
  ],
};

export const whyUs = {
  eyebrow: "Why Vigil.AI",
  heading: "Why plant heads choose Vigil.",
  items: [
    {
      icon: "kiln" as IconName,
      title: "Built for heavy and process industries",
      body: "Kilns, furnaces, reactors, compressors and assembly lines are modelled as what they are, with the KPIs each industry actually runs on: specific energy, run factor, OEE, batch yield and MTBF.",
    },
    {
      icon: "eye" as IconName,
      title: "Explainable, plant-grounded decisions",
      body: "Every alert shows which signals moved, against which baseline, and what happened last time. Engineers can trust a recommendation because they can check it.",
    },
    {
      icon: "clock" as IconName,
      title: "Start anywhere, scale everywhere",
      body: "Begin with the area that hurts most, whether that's a critical furnace or kiln, the rotating fleet, a packaging line or a utility system, then extend the same platform across your plants.",
    },
  ],
};

export const outcomes = {
  eyebrow: "Outcomes",
  heading: "What we aim to move, measured against your own baseline.",
  body: "Targets are agreed with each plant up front and validated against its own measured baseline before anything is claimed.",
  families: [
    { label: "Reliability", items: ["Higher MTBF on critical assets", "Fewer unplanned stops and trips"] },
    { label: "Energy", items: ["Lower specific energy per unit of output", "Fewer utility and process losses"] },
    { label: "Throughput & quality", items: ["Higher run factor and line OEE", "More batches and units right first time"] },
    { label: "Maintenance", items: ["More planned, less reactive work", "Faster, evidence-based root cause"] },
  ],
  cementNote: "Cement plants: see our published 5–8% thermal and 5–10% power target ranges.",
  cementLink: { label: "Cement targets and savings estimate", href: "/industries/cement" },
};

export const agentsSection = {
  eyebrow: "AI agents",
  heading: "AI agents watching your equipment around the clock.",
  body: "Cross-industry agents for rotating equipment, root cause, maintenance and energy, plus agents built for kilns, furnaces, batches, process units and assembly lines.",
  selectLabel: "Choose an agent",
  watchesLabel: "Watches",
  cta: "Meet the agent",
};

export const deploymentSection = {
  eyebrow: "How we deploy",
  heading: "Start with your biggest problem. Expand when the results are proven.",
  body: "A deployment method that fits your plant: begin with any area or asset class, prove value against a measured baseline, then extend across the plant.",
  cta: { label: "See how we deploy", href: "/approach" },
};

export const insightsSection = {
  eyebrow: "Insights",
  heading: "Perspectives on reliability, energy and plant data.",
  cta: { label: "All insights", href: "/resources" },
  readLabel: "Read",
};

export const domainsSection = {
  eyebrow: "Key domains",
  heading: "Built for five of the world's most demanding industries.",
  body: "Each industry gets its own process map, agents and KPIs, on one shared data foundation.",
  cta: { label: "All industries", href: "/industries" },
  areasLabel: "Process areas",
  classesLabel: "Plus the asset classes every plant shares",
  photoNote: "Industry photographs: Wikimedia Commons contributors, CC BY and CC BY-SA, cropped.",
  photoLink: { label: "Image credits", href: "/credits" },
};

export const closingCta = {
  heading: "Find out what stops and energy losses are costing your plant.",
  body: "See Vigil on sample plant data from your industry, or request a free assessment of your data readiness and reliability maturity.",
};
