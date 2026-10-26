import type { CapabilityStage, DeploymentStep, StartingPoint } from "./types";

/** Generic deployment method. Scope and pace are agreed per plant; nothing here is a fixed timeline. */
export const deploymentSteps: DeploymentStep[] = [
  {
    id: "assess",
    label: "Assess",
    heading: "Understand the plant and pick where to start",
    body: "A structured look at your equipment, control systems, data readiness and reliability maturity, ending in a starting scope with clear success criteria.",
    activities: [
      "Plant walk-down and asset criticality review",
      "Control system and data readiness check",
      "Reliability and energy baseline review",
      "Agree starting areas and success criteria",
    ],
    outputs: ["Criticality-ranked asset list", "Starting scope", "Success criteria"],
  },
  {
    id: "connect",
    label: "Connect",
    heading: "Build one trusted data foundation",
    body: "The Plant Data Historian connects read-only to your DCS, PLCs, SCADA and sensors. A tag and instrument audit comes first, so models learn from signals you can trust.",
    activities: [
      "Read-only connectors to DCS / PLC / SCADA",
      "Tag mapping to an asset hierarchy",
      "Instrument audit and calibration list",
      "Engineer app for checks and breakdown logs",
    ],
    outputs: ["Historian live", "Asset hierarchy", "Data-quality report"],
  },
  {
    id: "baseline",
    label: "Baseline",
    heading: "Measure where you really are",
    body: "Per-asset behavioural baselines and plant KPI baselines for reliability, energy and production. Target ranges are validated against this baseline, not industry averages.",
    activities: [
      "Per-asset normal-behaviour baselines",
      "MTBF, downtime and repeat-failure baseline",
      "kcal/kg clinker and kWh/t baseline",
      "Validate target ranges",
    ],
    outputs: ["Measured baseline", "Validated targets", "Priority loss list"],
  },
  {
    id: "predict",
    label: "Predict",
    heading: "Get early warnings on critical assets",
    body: "Predictive models and AI agents go live on the starting scope. Engineers confirm or dismiss every alert, and that feedback tunes the models.",
    activities: [
      "Failure-signature models on critical assets",
      "Explainable alerts to engineers",
      "Breakdown logs linked to predictions",
      "Alert review in the daily stand-up",
    ],
    outputs: ["Live health scores", "Early warnings", "Confirmed-alert record"],
  },
  {
    id: "optimize",
    label: "Optimize",
    heading: "Lock in energy and reliability gains",
    body: "Energy and process optimization, maintenance and reliability programs, and a governance rhythm that makes improvements stick.",
    activities: [
      "Energy loss programs (false air, grinding, utilities)",
      "Maintenance maturity and PM optimization",
      "Bad-actor and RCA program",
      "Daily, weekly and monthly KPI reviews",
    ],
    outputs: ["Benefit tracking vs baseline", "Sustained KPIs", "Improvement backlog"],
  },
  {
    id: "scale",
    label: "Scale",
    heading: "Extend across areas and plants",
    body: "Roll proven models and practices to more areas, more asset classes and more plants, and move toward advanced process control and AI optimization.",
    activities: ["Extend to further plant areas", "Multi-plant benchmarking", "APC readiness and deployment", "Digital operations center"],
    outputs: ["Plant-wide coverage", "Fleet benchmarks", "Autonomy roadmap"],
  },
];

/** Typical places a plant starts. Any area can be the first one. */
export const startingPoints: StartingPoint[] = [
  {
    title: "Critical process equipment",
    body: "Kilns, furnaces, reactors, compressors and presses: protect the assets whose stops halt the plant.",
    icon: "flame",
    links: [
      { label: "Cement: rotary kiln", href: "/industries/cement/rotary-kiln" },
      { label: "Steel: ironmaking", href: "/industries/steel/ironmaking" },
      { label: "Oil & Gas: rotating equipment", href: "/industries/oil-gas/rotating-equipment" },
    ],
  },
  {
    title: "Energy intensity",
    body: "Mills, furnaces, heaters, paint shops and utilities are the largest energy users. Start where energy per unit is highest.",
    icon: "bolt",
    links: [
      { label: "Cement: cement grinding", href: "/industries/cement/cement-grinding" },
      { label: "Automotive: paint shop", href: "/industries/automotive/paint-shop" },
      { label: "Oil & Gas: refining units", href: "/industries/oil-gas/refining-units" },
    ],
  },
  {
    title: "Rotating equipment fleet",
    body: "Motors, gearboxes, fans, pumps and compressors across the site, monitored with one set of models.",
    icon: "motor",
    links: [
      { label: "Pharma: clean utilities", href: "/industries/pharma/clean-utilities" },
      { label: "Steel: rolling mills", href: "/industries/steel/rolling-mills" },
      { label: "Cement: fans & dedusting", href: "/industries/cement/process-fans-dedusting" },
    ],
  },
  {
    title: "Line throughput and quality",
    body: "Packaging, assembly and batch lines: turn stops, drift and deviations into ranked priorities.",
    icon: "car",
    links: [
      { label: "Automotive: body shop", href: "/industries/automotive/body-shop" },
      { label: "Pharma: oral solid dosage", href: "/industries/pharma/oral-solid-dosage" },
      { label: "Pharma: packaging", href: "/industries/pharma/pharma-packaging" },
    ],
  },
];

/** Capability ladder. Plants move up at their own pace. */
export const capabilityStages: CapabilityStage[] = [
  {
    stage: "Foundation",
    heading: "Trusted data and digital routines",
    body: "Historian, asset hierarchy, engineer app and shared KPIs.",
    items: ["Plant Data Historian", "Engineer Mobile App", "KPI dashboards"],
  },
  {
    stage: "Predictive",
    heading: "Early warnings on critical assets",
    body: "Failure-signature models, AI agents and linked root cause analysis.",
    items: ["Predictive Failure AI", "AI agents", "RCA and bad-actor program"],
  },
  {
    stage: "Optimized",
    heading: "Energy and process at their best",
    body: "Best-run operating windows, loss elimination and disciplined maintenance.",
    items: ["Energy & process optimization", "Maintenance management", "Performance governance"],
  },
  {
    stage: "Autonomous",
    heading: "Kilns and mills under automatic optimization",
    body: "Advanced process control, AI optimization and a digital operations center.",
    items: ["Advanced process control", "AI optimization", "Digital operations center"],
  },
];
