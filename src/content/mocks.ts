/**
 * Labels and sample values for the illustrative product UI mocks.
 * All values are invented sample data and do not describe any real plant.
 */

export const trendMock = {
  title: "ID Fan 2 · Bearing temperature (DE)",
  unit: "°C",
  actualLabel: "Actual",
  bandLabel: "Expected band",
  anomalyLabel: "Drift detected",
  footer: "Flagged 6 days before predicted limit",
};

export const gaugeMock = {
  title: "Kiln 1 · Health score",
  score: 72,
  status: "Watch",
  delta: "−9 in 7 days",
  factors: [
    { label: "Shell temp · zone 4", value: "+38 °C", tone: "warn" as const },
    { label: "Drive current", value: "+6.2%", tone: "warn" as const },
    { label: "Burning zone", value: "Normal", tone: "ok" as const },
  ],
};

export const alertsMock = {
  title: "Active alerts",
  items: [
    { asset: "Kiln 1 · shell zone 4", message: "Hot spot developing", severity: "high" as const, time: "12 min" },
    { asset: "Preheater · cyclone 4", message: "Cone draft pattern suggests blockage", severity: "high" as const, time: "40 min" },
    { asset: "Raw mill · main gearbox", message: "Vibration trending above baseline", severity: "medium" as const, time: "2 h" },
    { asset: "Conveyor BC-07", message: "Belt slip increasing under load", severity: "medium" as const, time: "5 h" },
    { asset: "Compressor 2", message: "Specific power up 9%, possible leak", severity: "low" as const, time: "1 d" },
  ],
  severityLabels: { high: "High", medium: "Medium", low: "Low" },
};

export const workOrderMock = {
  title: "Draft work order",
  id: "WO-DRAFT-0417",
  asset: "Raw mill · main drive gearbox",
  criticality: "A · critical",
  source: "From Kiln Health / vibration alert",
  tasks: ["Collect vibration spectrum at DE/NDE", "Check oil sample for wear metals", "Inspect coupling alignment"],
  parts: "Oil filter ×1 · Coupling insert ×1",
  duration: "3.5 h · 2 technicians",
  window: "Next planned stop",
  approve: "Send to planner",
  labels: { asset: "Asset", criticality: "Criticality", tasks: "Tasks", parts: "Parts", duration: "Estimate", window: "Window" },
};

export const checklistMock = {
  title: "Today's checks",
  subtitle: "Line 1 · Day shift",
  items: [
    { label: "Mill lube check", detail: "Raw mill · gearbox", done: true },
    { label: "Fan vibration reading", detail: "ID fan 2 · DE / NDE", done: true },
    { label: "Kiln shell temp scan", detail: "Kiln 1 · zones 1–8", done: false, flagged: true },
    { label: "Cooler inspection", detail: "Grate plates & air beams", done: false },
  ],
  breakdown: "Log breakdown",
  linked: "Linked to AI alert",
};

export const energyMock = {
  title: "Specific heat by kiln",
  unit: "kcal/kg clinker",
  bars: [
    { name: "Kiln 1", actual: 768, best: 731 },
    { name: "Kiln 2", actual: 742, best: 726 },
  ],
  actualLabel: "Today",
  bestLabel: "Best run",
  losses: [
    { label: "False air · preheater stage 4", value: "est. 1.8%" },
    { label: "Cement mill 1 · separator", value: "+3.1 kWh/t" },
  ],
  lossesLabel: "Flagged losses",
};

export const kpiMock = {
  title: "Plant KPIs · daily stand-up",
  tiles: [
    { label: "Run factor / OEE", value: "91.4%", trend: [86, 88, 87, 90, 89, 91, 91.4], good: true },
    { label: "MTBF · critical", value: "412 h", trend: [340, 352, 361, 380, 372, 398, 412], good: true },
    { label: "Energy per unit", value: "−3.1%", trend: [100, 99.4, 99, 98.6, 97.9, 97.4, 96.9], good: true },
    { label: "Planned work", value: "64%", trend: [48, 51, 55, 54, 58, 61, 64], good: true },
  ],
};

export const historianMock = {
  title: "Historian · asset tree",
  tree: [
    { label: "Plant A", depth: 0 },
    { label: "Crushing", depth: 1, tags: 46, status: "ok" as const },
    { label: "Raw grinding", depth: 1 },
    { label: "VRM gearbox", depth: 2, tags: 12, status: "check" as const },
    { label: "Pyro line", depth: 1 },
    { label: "Kiln 1 shell scanner", depth: 2, tags: 64, status: "ok" as const },
    { label: "Cement grinding", depth: 1, tags: 188, status: "ok" as const },
    { label: "Packing & dispatch", depth: 1, tags: 72, status: "ok" as const },
    { label: "Utilities", depth: 1, tags: 95, status: "ok" as const },
  ],
  stats: [
    { label: "Tags connected", value: "8,420" },
    { label: "Availability", value: "99.2%" },
    { label: "Need calibration", value: "14" },
  ],
  statusLabels: { ok: "Healthy", check: "Calibrate" },
};

export const rootCauseMock = {
  title: "Event timeline · Raw mill trip",
  events: [
    { time: "−5 d", label: "Vibration begins rising above baseline", kind: "signal" as const },
    { time: "−3 d", label: "AI alert: gearbox DE vibration", kind: "alert" as const },
    { time: "−1 d", label: "Field check: abnormal noise logged", kind: "log" as const },
    { time: "0", label: "Breakdown: mill trip, bearing damage", kind: "breakdown" as const },
  ],
  summary: "Similar to 2 past events · lubrication starvation likely",
  kindLabels: { signal: "Signal", alert: "AI alert", log: "Field log", breakdown: "Breakdown" },
};

export const maturityMock = {
  title: "Maintenance maturity",
  current: 1,
  steps: ["Reactive", "Planned", "Preventive", "Predictive", "Proactive"],
  youAreHere: "Today",
  target: "Year 1 target",
  targetIndex: 3,
};

export const fleetMock = {
  title: "Rotating equipment · fleet health",
  legend: { ok: "Healthy", watch: "Watch", act: "Act" },
  areas: [
    { area: "Crushing", assets: ["ok", "ok", "watch", "ok", "ok"] },
    { area: "Raw mill", assets: ["ok", "act", "ok", "ok", "watch", "ok"] },
    { area: "Pyro line", assets: ["ok", "ok", "ok", "watch", "ok", "ok"] },
    { area: "Coal mill", assets: ["ok", "ok", "ok", "ok"] },
    { area: "Cement mills", assets: ["ok", "watch", "ok", "ok", "ok", "ok"] },
    { area: "Packing", assets: ["ok", "ok", "ok", "act", "ok"] },
    { area: "Utilities", assets: ["ok", "watch", "ok", "ok"] },
  ] as { area: string; assets: ("ok" | "watch" | "act")[] }[],
  summary: "36 assets monitored · 2 need action · 5 on watch",
};

export const millMock = {
  title: "Cement mill 2 · performance",
  status: "Stable run window",
  tiles: [
    { label: "kWh/t", value: "31.8", target: "best 30.4", trend: [33.4, 33.1, 32.6, 32.9, 32.2, 31.9, 31.8] },
    { label: "Output t/h", value: "142", target: "best 148", trend: [131, 134, 138, 136, 140, 141, 142] },
    { label: "Vibration mm/s", value: "4.1", target: "trip 7.0", trend: [3.6, 3.8, 3.7, 3.9, 4.0, 4.2, 4.1] },
  ],
  recommendation: "Separator speed −3% to match best-run window",
};

export const conveyorMock = {
  title: "Material flow · crusher to raw mill",
  items: [
    { id: "CR-01", name: "Primary crusher", load: 82, status: "ok" as const, note: "620 t/h" },
    { id: "BC-03", name: "Overland conveyor", load: 76, status: "ok" as const, note: "slip 0.4%" },
    { id: "SR-01", name: "Stacker-reclaimer", load: 64, status: "watch" as const, note: "slew drive temp +8 °C" },
    { id: "BC-07", name: "Mill feed conveyor", load: 91, status: "act" as const, note: "slip 2.9%" },
    { id: "BE-02", name: "Bucket elevator", load: 70, status: "ok" as const, note: "chain +0.6%" },
  ],
  loadLabel: "Load",
  statusLabels: { ok: "Normal", watch: "Watch", act: "Act" },
};

export const dispatchMock: typeof conveyorMock = {
  title: "Packing & dispatch · live",
  items: [
    { id: "PK-01", name: "Rotary packer 1", load: 94, status: "ok" as const, note: "2,180 bags/h" },
    { id: "PK-02", name: "Rotary packer 2", load: 81, status: "watch" as const, note: "spout 5 weight drift" },
    { id: "PK-03", name: "Rotary packer 3", load: 58, status: "act" as const, note: "spout 3 down" },
    { id: "TL-01", name: "Bulk truck loader", load: 77, status: "ok" as const, note: "118 t/h" },
    { id: "WL-01", name: "Wagon loader", load: 69, status: "ok" as const, note: "filter ΔP normal" },
  ],
  loadLabel: "Load",
  statusLabels: { ok: "Normal", watch: "Watch", act: "Act" },
};

/** Generic KPI-tile mocks for industry-specific agents. All values are invented sample data. */
export const tileMocks = {
  batch: {
    title: "Batch 2417 · granulation phase vs golden batch",
    tiles: [
      { label: "Consistency score", value: "93", trend: [97, 96, 96, 95, 94, 94, 93], good: false },
      { label: "Impeller power", value: "+4.2%", trend: [0, 0.5, 1.2, 2, 2.8, 3.6, 4.2], good: false },
      { label: "Bed temperature", value: "In band", trend: [40, 41, 41, 40, 41, 41, 40], good: true },
      { label: "Phase time", value: "18 min", trend: [16, 16, 17, 17, 17, 18, 18], good: false },
    ],
  },
  integrity: {
    title: "Compressor station 3 · machine health",
    tiles: [
      { label: "K-301 health", value: "88", trend: [95, 94, 93, 92, 90, 89, 88], good: false },
      { label: "Exchanger fouling", value: "+12%", trend: [2, 4, 5, 7, 9, 10, 12], good: false },
      { label: "Fuel gas / MMSCF", value: "Normal", trend: [10, 10, 11, 10, 10, 11, 10], good: true },
      { label: "Pump P-12 vibration", value: "3.1 mm/s", trend: [2.6, 2.7, 2.7, 2.8, 2.9, 3, 3.1], good: false },
    ],
  },
  furnace: {
    title: "Caster 2 · mold thermal pattern",
    tiles: [
      { label: "Breakout risk", value: "Low", trend: [12, 10, 9, 11, 10, 8, 9], good: true },
      { label: "Mold friction", value: "+6%", trend: [0, 1, 2, 3, 4, 5, 6], good: false },
      { label: "Panel 7 cooling ΔT", value: "+3.4 °C", trend: [1, 1.5, 2, 2.4, 2.8, 3.1, 3.4], good: false },
      { label: "Casting speed", value: "1.2 m/min", trend: [1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2], good: true },
    ],
  },
  oee: {
    title: "Body shop line 2 · shift overview",
    tiles: [
      { label: "Line OEE", value: "84%", trend: [80, 81, 82, 81, 83, 84, 84], good: true },
      { label: "Jobs per hour", value: "57", trend: [54, 55, 55, 56, 56, 57, 57], good: true },
      { label: "Top loss · robot R14", value: "11 min", trend: [3, 4, 6, 7, 8, 10, 11], good: false },
      { label: "Micro-stops", value: "42", trend: [55, 52, 50, 48, 46, 44, 42], good: true },
    ],
  },
};

export const assetsMockLabels = {
  title: (area: string) => `${area} · asset health`,
  legend: { ok: "Healthy", watch: "Watch", act: "Act" },
  signals: "signals",
};
