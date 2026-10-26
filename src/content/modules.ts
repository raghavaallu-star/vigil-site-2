import type { Module, SupportingCapability } from "./types";

export const modules: Module[] = [
  {
    slug: "historian",
    name: "Plant Data Historian",
    short: "Historian",
    icon: "historian",
    tagline: "One set of plant numbers everyone trusts.",
    summary:
      "Collects time-series data from PLC, DCS and SCADA systems, contextualizes it by asset and line, and serves it to every dashboard, model and app that Vigil runs.",
    pullQuote: "Without a historian, improvement relies on assumptions.",
    problem: {
      heading: "Most plants have data. Few have trusted data.",
      body: "Readings live in control-room screens, shift logbooks and spreadsheets that rarely agree. Tags are unnamed or mislabelled, instruments drift out of calibration, and history is overwritten after weeks. Every AI or optimization effort built on that foundation inherits its gaps.",
    },
    features: [
      {
        title: "Connect to what you already run",
        body: "Standard industrial connectors for PLC, DCS and SCADA systems and field sensors. Read-only by default, so the control layer stays untouched.",
      },
      {
        title: "Capture and store at full resolution",
        body: "High-frequency time series stored for years, not weeks, with compression that keeps the shape of every excursion.",
      },
      {
        title: "Contextualize by asset",
        body: "Tags are mapped to an asset hierarchy (plant, line, kiln, mill, fan) so engineers search for equipment, not cryptic tag names.",
      },
      {
        title: "Serve a single source of truth",
        body: "Dashboards, predictive models, the engineer app and governance reviews all read from the same numbers.",
      },
      {
        title: "Data quality first",
        body: "A tag and instrument audit, with calibration checks, runs before any model is trained. Bad signals are flagged, not silently used.",
      },
      {
        title: "Feeds the models, stores their results",
        body: "Predictive scores and anomaly flags are written back as historian tags, so insight sits right next to the raw signal.",
      },
    ],
    kpis: {
      heading: "What it makes measurable",
      items: [
        "Tag coverage of critical assets",
        "Instrument health and calibration status",
        "Data availability by line",
        "Time from event to visible trend",
      ],
    },
    mocks: ["historian", "trend"],
    relatedAgents: ["root-cause", "kiln-health"],
    category: "Foundation",
    seo: {
      title: "Plant Data Historian for Manufacturing Plants",
      description:
        "Collect and contextualize PLC, DCS and SCADA data into a single trusted source that feeds dashboards, predictive AI and engineer apps.",
    },
  },
  {
    slug: "predictive-failure-ai",
    name: "Predictive Failure AI",
    short: "Predictive AI",
    icon: "eye",
    tagline: "Warning before equipment fails, based on your own failure history.",
    summary:
      "Models trained on the sensor history leading up to past failures learn what trouble looks like on every kind of plant equipment, from crushers and conveyors to kilns, mills, fans and compressors, then score live data around the clock.",
    pullQuote: "Start where it hurts. Prove it. Then scale.",
    problem: {
      heading: "Breakdowns rarely come without warning. The warning is just unread.",
      body: "Bearing temperatures creep, vibration spectra shift and drive currents wander for days before a trip. With hundreds of signals per line, those patterns are invisible to people watching screens shift by shift.",
    },
    features: [
      {
        title: "Trained on your failure history",
        body: "We line up historian data with past breakdowns to learn the signatures that preceded them on your specific assets.",
      },
      {
        title: "Per-asset baselines",
        body: "Every motor, gearbox, fan, mill, kiln drive and conveyor gets its own normal. Drift stands out against that asset's own behaviour, not a generic threshold.",
      },
      {
        title: "Live scoring, written back",
        body: "Health scores and anomaly flags are computed continuously and written back to the historian, alongside the raw signals.",
      },
      {
        title: "Explainable alerts",
        body: "Each alert shows which signals moved, by how much and against which baseline, so engineers can judge it in seconds.",
      },
      {
        title: "Start focused, then scale",
        body: "Begin with the most critical assets in one area, prove the warnings are useful, then scale models across the plant.",
      },
      {
        title: "Feedback that improves models",
        body: "Engineers confirm or dismiss alerts in the app. That feedback is used to retrain and tune each model.",
      },
    ],
    path: {
      heading: "From proof of concept to plant-wide",
      steps: [
        { label: "Select", body: "Choose a starting area and its most critical assets with the plant team." },
        { label: "Learn", body: "Train on historian data around past failures and normal running." },
        { label: "Score", body: "Run live scoring and tune alert thresholds with engineers." },
        { label: "Scale", body: "Extend to further areas, asset classes and plants once the results are accepted." },
      ],
    },
    kpis: {
      heading: "What it moves",
      items: ["Warning lead time before failure", "Unplanned stops", "MTBF on covered assets", "Alert precision (confirmed vs dismissed)"],
    },
    mocks: ["gauge", "trend", "alerts"],
    relatedAgents: ["kiln-health", "root-cause"],
    category: "Predict",
    seo: {
      title: "Predictive Failure AI for Kilns, Mills and Fans",
      description:
        "Early-warning models trained on your own failure history, with per-asset baselines and explainable alerts for plant equipment in every industry.",
    },
  },
  {
    slug: "engineer-app",
    name: "Engineer Mobile App",
    short: "Engineer App",
    icon: "phone",
    tagline: "Faster checks, and breakdown logs that lead to root cause.",
    summary:
      "A simple app for daily, monthly and annual checks and breakdown logging. Every entry is linked to historian signals and AI predictions to close the loop on root cause.",
    problem: {
      heading: "Field knowledge lives in notebooks and memory.",
      body: "Inspection results and breakdown notes are written on paper or typed into spreadsheets days later. They can't be searched, can't be trended and never meet the sensor data that would explain them.",
    },
    features: [
      {
        title: "Scheduled checks",
        body: "Daily, monthly and annual rounds for every area: crusher liner checks, conveyor belt walks, mill lube checks, fan vibration readings, kiln shell scans, cooler inspections, packer spout checks and compressor rounds.",
      },
      {
        title: "Breakdown logging in under a minute",
        body: "Pick the asset, choose a failure mode, add a photo and a note. Start and end time are captured automatically.",
      },
      {
        title: "Correlated with predictions",
        body: "Logged issues are matched against AI alerts and historian trends, showing whether the failure was predicted and how early.",
      },
      {
        title: "Works where engineers work",
        body: "Large touch targets, glove-friendly controls and offline capture that syncs once the device is back in coverage.",
      },
      {
        title: "No device rollout needed",
        body: "Runs in any phone or tablet browser, so crews can start without device rollouts, with native packaging available.",
      },
      {
        title: "Root cause, closed",
        body: "Every breakdown can be traced from the field note to the signals and the corrective action, building a living failure library.",
      },
    ],
    kpis: {
      heading: "What it makes visible",
      items: ["Check completion rate", "Breakdowns logged vs predicted", "Time to log", "Repeat failures by asset"],
    },
    mocks: ["checklist", "rootcause"],
    relatedAgents: ["root-cause", "maintenance-planner"],
    category: "Foundation",
    seo: {
      title: "Engineer Mobile App for Plant Checks and Breakdown Logging",
      description:
        "Daily, monthly and annual equipment checks and breakdown logs, linked to historian data and AI predictions to close the loop on root cause.",
    },
  },
  {
    slug: "maintenance-management",
    name: "Maintenance Management",
    short: "Maintenance",
    icon: "wrench",
    tagline: "From firefighting to planned, preventive and predictive work.",
    summary:
      "CMMS discipline, asset criticality and work-order rigour that move the maintenance function up the maturity path, measured with the KPIs that matter.",
    problem: {
      heading: "When every day is an emergency, nothing gets planned.",
      body: "Reactive plants spend most maintenance hours on breakdowns. Preventive tasks slip, backlog grows and the same assets fail again. Better software alone doesn't fix that. It takes a clear maturity path and the habits to climb it.",
    },
    features: [
      {
        title: "CMMS that people actually use",
        body: "Work requests, planning, scheduling and close-out in one flow, tied to the asset hierarchy from the historian.",
      },
      {
        title: "Asset criticality",
        body: "Rank every asset by safety, production and cost impact so effort follows risk.",
      },
      {
        title: "Work-order discipline",
        body: "Standard failure codes, required close-out fields and planner review give you data you can learn from.",
      },
      {
        title: "PM optimization",
        body: "Remove low-value PM tasks, add missing ones and shift intervals based on condition data and failure history.",
      },
    ],
    path: {
      heading: "The maintenance maturity path",
      steps: [
        { label: "Reactive", body: "Fix it when it breaks. Work is unplanned and costs are high." },
        { label: "Planned", body: "Jobs are planned and scheduled, with parts and people ready." },
        { label: "Preventive", body: "Time-based tasks catch known wear before it fails." },
        { label: "Predictive", body: "Condition and AI signals trigger work only when needed." },
        { label: "Proactive", body: "Root causes are eliminated so failures don't come back." },
      ],
    },
    kpis: {
      heading: "KPIs we track",
      items: ["Planned work %", "PM compliance", "Schedule compliance", "Backlog (weeks)"],
    },
    mocks: ["workorder", "maturity"],
    relatedAgents: ["maintenance-planner"],
    category: "Operate",
    seo: {
      title: "Maintenance Management for Manufacturing Plants",
      description: "CMMS, asset criticality, work-order discipline and PM optimization that move maintenance from reactive to proactive.",
    },
  },
  {
    slug: "reliability-excellence",
    name: "Reliability Excellence",
    short: "Reliability",
    icon: "shield",
    tagline: "Eliminate repeat failures, then keep them gone.",
    summary:
      "A structured reliability program: criticality ranking, asset hierarchy, RCA and RCFA, a bad-actor program and FMEA-based PM tasks for the equipment that stops plants.",
    problem: {
      heading: "The same failures, on the same assets, again and again.",
      body: "A handful of bad actors usually drive most unplanned downtime. Without disciplined root cause analysis, fixes treat symptoms and the failures return.",
    },
    features: [
      { title: "Criticality ranking", body: "A shared, defensible ranking of every asset by consequence of failure." },
      { title: "Asset hierarchy", body: "One structure from plant to component, shared with the historian and CMMS." },
      { title: "RCA and RCFA", body: "Structured root cause analysis for significant failures, with tracked corrective actions." },
      { title: "Bad-actor program", body: "Identify the top repeat offenders each month and work them off the list." },
      { title: "FMEA-based PM tasks", body: "Maintenance tasks derived from how each asset actually fails." },
      { title: "Precision maintenance", body: "Lubrication, alignment and balancing standards that remove common failure causes." },
    ],
    path: {
      heading: "The MTBF path",
      steps: [
        { label: "Baseline", body: "Measure MTBF and failure modes on critical assets from historian and work-order data." },
        { label: "Eliminate repeats", body: "Run RCA on bad actors and fix root causes, not symptoms." },
        { label: "Sustain", body: "Lock in gains with FMEA-based PMs, precision standards and governance reviews." },
      ],
    },
    focusEquipment: [
      "Kilns and furnaces",
      "Mills and rolling stands",
      "Compressors and turbines",
      "Pumps and fans",
      "Reactors and dryers",
      "Robots and presses",
      "Conveyors and cranes",
      "Utilities",
    ],
    kpis: {
      heading: "KPIs we track",
      items: ["MTBF by asset class", "Repeat failures", "Unplanned downtime hours", "RCA actions closed on time"],
    },
    mocks: ["rootcause", "alerts"],
    relatedAgents: ["root-cause", "kiln-health"],
    category: "Predict",
    seo: {
      title: "Reliability Excellence Program for Plant Equipment",
      description:
        "Criticality ranking, RCA/RCFA, bad-actor programs and FMEA-based PM tasks for kilns, mills, ID fans, coolers and crushers.",
    },
  },
  {
    slug: "energy-optimization",
    name: "Energy & Process Optimization",
    short: "Energy",
    icon: "flame",
    tagline: "Find the heat and power your plant is losing.",
    summary:
      "Kiln and fuel optimization, false-air reduction, grinding optimization and utility efficiency (fans, compressed air, WHR), with specific heat and power tracked by area, laying the groundwork for advanced process control.",
    problem: {
      heading: "Energy is one of the largest controllable costs in manufacturing.",
      body: "Thermal and electrical energy losses hide in false air, unstable kiln operation and inefficient grinding. Without consistent tracking by kiln and mill, it's hard to see where the losses are, let alone fix them.",
    },
    features: [
      {
        title: "Kiln energy optimization",
        body: "Identify the operating windows where your kilns ran at their best specific heat consumption, and steer toward them.",
      },
      {
        title: "False-air reduction",
        body: "Use O₂, pressure and temperature profiles to locate and size false-air ingress across the preheater and kiln system.",
      },
      {
        title: "Grinding optimization",
        body: "Track mill loading, separator settings and specific power to find stable, efficient running points.",
      },
      {
        title: "Specific energy tracking",
        body: "Energy per unit of output by unit and line, every shift: kcal/kg clinker, kWh per tonne of steel, energy per batch or per vehicle.",
      },
      { title: "Heat balance", body: "Periodic heat-balance studies validated against historian data to quantify losses." },
      {
        title: "Utilities and auxiliaries",
        body: "Fan energy per unit flow, compressed-air specific power and leaks, and waste heat recovery output, tracked alongside the process.",
      },
      {
        title: "APC readiness",
        body: "Clean data, stable loops and validated models prepare kilns and mills for advanced process control.",
      },
    ],
    kpis: {
      heading: "KPIs we track",
      items: ["Specific energy by unit and line", "Utility energy share", "Loss items found and closed", "Process stability"],
    },
    mocks: ["energy", "trend"],
    relatedAgents: ["energy-optimization"],
    category: "Optimize",
    seo: {
      title: "Kiln Energy, False-Air and Grinding Optimization",
      description:
        "Track specific energy by unit and line, find heat, power and utility losses, and prepare for advanced process control in manufacturing plants.",
    },
  },
  {
    slug: "governance",
    name: "Plant Performance Governance",
    short: "Governance",
    icon: "users",
    tagline: "Daily, weekly and monthly reviews that keep improvements in place.",
    summary: "A daily, weekly and monthly review cadence built on shared KPIs, so improvements are owned, tracked and sustained.",
    problem: {
      heading: "Dashboards don't change plants. Habits do.",
      body: "Even good data changes nothing if no one reviews it, owns the actions and follows up. Governance is how a plant sustains the gains from every other module.",
    },
    features: [
      { title: "Daily stand-up", body: "Fifteen minutes on yesterday's production, stops, alerts and today's priorities." },
      {
        title: "Weekly cross-functional review",
        body: "Production, maintenance, process and quality review trends, bad actors and open actions together.",
      },
      { title: "Monthly leadership review", body: "Plant leadership reviews KPI trends, benefit realization and the improvement roadmap." },
      { title: "Action tracking", body: "Every review produces owned, dated actions, visible until closed." },
    ],
    kpis: {
      heading: "KPI families",
      items: [
        "Production: output, run factor, OEE and yield",
        "Reliability: MTBF, unplanned downtime, repeat failures",
        "Energy: specific energy per unit of output",
        "Maintenance: planned work %, PM compliance, backlog",
      ],
    },
    mocks: ["kpis"],
    relatedAgents: ["maintenance-planner", "energy-optimization"],
    category: "Operate",
    seo: {
      title: "Plant Performance Governance and KPI Reviews",
      description:
        "A daily, weekly and monthly KPI review rhythm for manufacturing plants covering production, reliability, energy and maintenance.",
    },
  },
];

export const supportingCapabilities: SupportingCapability[] = [
  {
    name: "Spare Parts Optimization",
    icon: "boxes",
    body: "Right-size critical spares using criticality, lead times and failure history, so the part is there when it's needed and capital isn't tied up when it isn't.",
  },
  {
    name: "Workforce Capability",
    icon: "target",
    body: "Role-based training in reliability, data-driven maintenance and the Vigil tools, so new habits outlast the rollout.",
  },
];

export function getModule(slug: string) {
  return modules.find((m) => m.slug === slug);
}
