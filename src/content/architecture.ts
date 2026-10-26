import type { IconName } from "./types";

export interface ArchitectureLayer {
  id: string;
  index: number;
  name: string;
  body: string;
  items: string[];
  icon: IconName;
  tone: "base" | "data" | "intel" | "result";
}

/** Platform layers, listed bottom to top. The diagram lights them up in this order. */
export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "plant",
    index: 1,
    name: "Plant & control systems",
    body: "The equipment and control layer you already run.",
    items: ["PLCs", "DCS", "SCADA", "Sensors"],
    icon: "sensor",
    tone: "base",
  },
  {
    id: "historian",
    index: 2,
    name: "Process Historian",
    body: "Capture, store, contextualize and serve trusted time-series data.",
    items: ["Capture", "Store", "Contextualize", "Serve"],
    icon: "historian",
    tone: "data",
  },
  {
    id: "analytics",
    index: 3,
    name: "Analytics & optimization",
    body: "Models and apps that turn data into early warnings and better decisions.",
    items: ["KPI dashboards", "Predictive maintenance", "Advanced process control", "AI optimization"],
    icon: "chart",
    tone: "intel",
  },
  {
    id: "results",
    index: 4,
    name: "Business results",
    body: "What the plant actually feels.",
    items: ["Reliability", "Energy", "Production", "Cost"],
    icon: "target",
    tone: "result",
  },
];

export const architectureCopy = {
  label: "Vigil Reliability platform architecture",
  replay: "Replay",
  flowNote: "Data flows up. Decisions flow back to the plant.",
};
