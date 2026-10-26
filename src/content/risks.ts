import type { Risk } from "./types";

export const risksIntro = {
  eyebrow: "Honest risk framing",
  riskLabel: "Risk",
  mitigationLabel: "Mitigation",
  heading: "Most of the risk is people and data, not technology.",
  body: "The algorithms are the easy part. Programs like this succeed or fail on whether people adopt new habits and whether the underlying data can be trusted. We plan for both from day one.",
};

export const risks: Risk[] = [
  {
    risk: "Change management",
    icon: "users",
    why: "New tools and meeting rhythms ask people to change how they work. Without ownership, old habits return.",
    mitigation: "Plant leadership sponsors each stage, named owners for every KPI, and a governance rhythm that makes progress visible.",
  },
  {
    risk: "Resource constraints",
    icon: "clock",
    why: "Plant teams are already stretched by daily operations, shutdowns and audits.",
    mitigation: "A focused starting scope that asks for limited plant time, with our team carrying the heavy lifting on data and models.",
  },
  {
    risk: "Data quality",
    icon: "sensor",
    why: "Mislabelled tags, drifting instruments and gaps in history undermine every model built on them.",
    mitigation: "A tag and instrument audit and calibration come first. Bad signals are flagged and fixed before training.",
  },
  {
    risk: "Technology adoption",
    icon: "phone",
    why: "Dashboards that operators don't trust or understand are ignored.",
    mitigation: "Operator-friendly dashboards and apps co-designed with the people who use them, plus explainable alerts.",
  },
];
