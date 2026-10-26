import { agents } from "../src/content/agents";
import { industries } from "../src/content/industries";
import { modules } from "../src/content/modules";

export const routes = [
  "/",
  "/product",
  ...modules.map((m) => `/product/${m.slug}`),
  "/industries",
  ...industries.map((i) => `/industries/${i.slug}`),
  ...industries.flatMap((i) => i.areas.map((a) => `/industries/${i.slug}/${a.slug}`)),
  "/credits",
  "/demo",
  "/roi",
  ...agents.map((a) => `/agents/${a.slug}`),
  "/solutions",
  "/approach",
  "/resources",
  "/resources/historian-before-ai",
  "/resources/kiln-false-air",
  "/resources/breakdown-logs-to-root-cause",
  "/resources/kpi-rhythm",
  "/about",
  "/contact",
  "/assessment",
  "/privacy",
  "/terms",
];

export const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];
