/**
 * Script for the /demo click-through. A simulated scenario with invented data:
 * a kiln support-roller bearing drifts, an alert fires, the engineer logs the
 * finding, and the root-cause view links it all together.
 */

export const demoPage = {
  eyebrow: "Interactive demo",
  heading: "Follow one warning from first signal to root cause.",
  body: "Click through a simulated day on a cement line: a bearing starts to drift, Vigil raises an alert, the field engineer logs what they find, and the root-cause view ties it together.",
  simulated: "Simulated scenario with invented data. Not a real plant.",
  stepsLabel: "Demo steps",
  back: "Back",
  next: "Next",
  restart: "Start again",
  stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
  endCta: { heading: "Want to see this on your own plant's data?", label: "Request a demo", href: "/contact" },
  seo: {
    title: "Interactive Demo",
    description:
      "A click-through simulation of Vigil Reliability: kiln health trend, an AI alert, breakdown logging in the engineer app and the root-cause view.",
  },
};

export const demoSteps = [
  {
    id: "trend",
    label: "Kiln health",
    title: "Kiln 1 health is slipping",
    caption: "Support roller 2 bearing temperature has drifted above its own baseline for three days. Nothing has tripped yet.",
  },
  {
    id: "alert",
    label: "AI alert",
    title: "Vigil raises an explainable alert",
    caption: "The Kiln Health Agent explains which signals moved, compares with past events and suggests a check.",
  },
  {
    id: "log",
    label: "Engineer logs",
    title: "The field engineer logs what they find",
    caption: "On the round, the engineer records the inspection in the app. The entry is linked to the alert automatically.",
  },
  {
    id: "rootcause",
    label: "Root cause",
    title: "One timeline from signal to cause",
    caption: "The Root Cause Agent lines up signals, the alert and the field log, and drafts a starting point for the RCA.",
  },
] as const;

export type DemoStepId = (typeof demoSteps)[number]["id"];

export const demoTrend = {
  title: "Kiln 1 · Support roller 2 · bearing temperature",
  unit: "°C",
  healthLabel: "Kiln 1 health",
  healthBefore: 86,
  healthNow: 71,
  bandLabel: "Expected band",
  actualLabel: "Actual",
  driftLabel: "Drift starts",
  kpis: [
    { label: "Shell temperature", value: "Normal", tone: "ok" as const },
    { label: "Drive current", value: "+1.8%", tone: "ok" as const },
    { label: "Roller 2 bearing", value: "+11 °C vs baseline", tone: "warn" as const },
  ],
  action: "Open the alert",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

export const demoAlert = {
  severity: "High",
  title: "Support roller 2 bearing running hot",
  asset: "Kiln 1 · Tyre 2 · Support roller 2 (outboard)",
  raised: "Raised 06:40 by Kiln Health Agent",
  whyHeading: "Why Vigil flagged it",
  why: [
    { signal: "Bearing temperature", detail: "+11 °C above its own baseline, rising 3 days" },
    { signal: "Roller shaft vibration", detail: "Slightly up, within limits" },
    { signal: "Kiln drive current", detail: "Unchanged, so load is not the cause" },
  ],
  similarHeading: "Similar past events",
  similar: "2 similar events on this kiln, both linked to lubrication",
  suggestion: "Suggested check: inspect lubrication and bearing condition on next round.",
  assign: "Assign check to field engineer",
  assigned: "Assigned to field engineer",
};

export const demoLog = {
  appTitle: "Engineer app · Log finding",
  assetLabel: "Asset",
  asset: "Kiln 1 · Support roller 2",
  linkedLabel: "Linked alert",
  linked: "Support roller 2 bearing running hot",
  modeLabel: "What did you find?",
  modes: ["Lubrication issue", "Bearing damage", "Misalignment", "No fault found"],
  noteLabel: "Note",
  notePlaceholder: "What you saw, heard and did",
  noteExample: "Grease line partly blocked. Bearing housing hot to touch. Line cleared, re-greased.",
  submit: "Save log",
  saved: "Logged and linked to the alert",
  next: "View root cause",
};

export const demoRootCause = {
  title: "Event timeline · Kiln 1 support roller 2",
  events: [
    { time: "Day −3", kind: "signal" as const, label: "Bearing temperature starts rising above baseline" },
    { time: "Day 0, 06:40", kind: "alert" as const, label: "Kiln Health Agent raises alert" },
    { time: "Day 0, 10:15", kind: "log" as const, label: "Field log: grease line partly blocked, re-greased" },
    { time: "Day +1", kind: "signal" as const, label: "Bearing temperature back within band" },
  ],
  kindLabels: { signal: "Signal", alert: "Alert", log: "Field log" },
  draftHeading: "Draft RCA starting point",
  draft: [
    { label: "Likely cause", value: "Lubrication starvation from blocked grease line" },
    { label: "Evidence", value: "Temperature rise without load change; matches 2 past events" },
    { label: "Suggested action", value: "Add grease-line check to the weekly PM for all kiln rollers" },
  ],
  outcome: "Caught before a stop. Breakdown avoided.",
  outcomeNote: "In this simulated scenario.",
};
