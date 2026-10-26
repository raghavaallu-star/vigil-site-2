import type { Role } from "./types";

export const solutionsPage = {
  eyebrow: "Who we're for",
  heading: "What each leader in your plant gets from Vigil.",
  body: "Plant heads, reliability, maintenance, process, energy and E&I teams each need something different from the same data. Vigil gives every role its own view, built on one trusted source.",
  painsLabel: "What gets in the way",
  getsLabel: "What you get with Vigil",
  kpisLabel: "KPIs you'll own",
  modulesLabel: "Modules to start with",
  seo: {
    title: "Solutions by Role",
    description:
      "How Vigil Reliability helps plant heads, reliability managers, maintenance heads and energy managers in manufacturing plants.",
  },
};

export const roles: Role[] = [
  {
    slug: "plant-head",
    role: "Plant Head",
    icon: "gauge",
    pains: [
      "Unplanned stops on critical equipment derail monthly production plans",
      "Reports arrive late, are compiled by hand and rarely agree",
      "Improvement projects start strong but don't stick",
    ],
    gets: [
      "One trusted view of output, run factor, reliability and energy",
      "Early warning on critical assets before they stop production",
      "A governance rhythm that turns KPIs into owned actions",
    ],
    kpis: ["Run factor or OEE", "Output", "Unplanned downtime", "Cost per unit"],
    modules: ["governance", "historian", "predictive-failure-ai"],
  },
  {
    slug: "reliability-manager",
    role: "Reliability Manager",
    icon: "shield",
    pains: [
      "The same bad actors fail again and again",
      "RCA is slow because field notes and sensor data live apart",
      "Criticality and failure modes aren't documented consistently",
    ],
    gets: [
      "Breakdown logs linked to historian signals and predictions",
      "A bad-actor program and structured RCA/RCFA workflow",
      "FMEA-based PM tasks and a clear MTBF path",
    ],
    kpis: ["MTBF by asset class", "Repeat failures", "RCA actions closed", "Warning lead time"],
    modules: ["reliability-excellence", "predictive-failure-ai", "engineer-app"],
  },
  {
    slug: "maintenance-head",
    role: "Maintenance Head",
    icon: "wrench",
    pains: [
      "Most of the week goes to firefighting breakdowns",
      "PM tasks slip and backlog keeps growing",
      "Work orders are closed with little useful data",
    ],
    gets: [
      "Asset criticality that focuses effort where risk is highest",
      "Prioritized work queues and draft work orders from AI alerts",
      "A maturity path from reactive to proactive, measured monthly",
    ],
    kpis: ["Planned work %", "PM compliance", "Schedule compliance", "Backlog (weeks)"],
    modules: ["maintenance-management", "engineer-app", "predictive-failure-ai"],
  },
  {
    slug: "energy-manager",
    role: "Energy Manager",
    icon: "flame",
    pains: [
      "Specific heat and power are tracked monthly, too late to act",
      "False-air ingress and grinding losses are hard to locate",
      "Best-run conditions depend on who is on shift",
    ],
    gets: [
      "Specific energy by unit and line, every shift",
      "False-air and grinding loss alerts with likely locations",
      "Best-run operating windows mined from your own history",
    ],
    kpis: ["Specific energy per unit", "Utility energy share", "Losses found and closed", "Energy cost per unit"],
    modules: ["energy-optimization", "historian", "governance"],
  },
  {
    slug: "process-engineer",
    role: "Process Engineer",
    icon: "chart",
    pains: [
      "Process stability depends on who is on shift",
      "Blockages, upsets and trips are diagnosed after the fact",
      "Process data is scattered across DCS screens and spreadsheets",
    ],
    gets: [
      "Best-run operating windows for each unit and line from your own history",
      "Early warnings for blockages, fouling, thermal hot spots and unstable operation",
      "One historian for every process signal across the plant",
    ],
    kpis: ["Process stability", "Specific energy", "Yield or right-first-time", "Trip and upset events"],
    modules: ["energy-optimization", "historian", "predictive-failure-ai"],
  },
  {
    slug: "electrical-instrumentation",
    role: "Electrical & Instrumentation",
    icon: "power",
    pains: [
      "Hundreds of motors, drives and transformers with little condition data",
      "Analyzer and instrument drift undermines process control",
      "Electrical failures surface only when a drive trips",
    ],
    gets: [
      "Health scores for motors, VFDs and transformers across the plant",
      "Instrument and analyzer drift and flat-line detection",
      "Load, temperature and fault-history trends in one place",
    ],
    kpis: ["Motor and drive MTBF", "Instrument availability", "Analyzer uptime", "Electrical trips"],
    modules: ["predictive-failure-ai", "historian", "maintenance-management"],
  },
];
