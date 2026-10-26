/**
 * Copy and assumptions for the /roi estimate calculator.
 * The savings bands MUST match the target ranges in src/content/home.ts (outcomes).
 */

export const roiBands = {
  thermal: { low: 0.05, high: 0.08 },
  power: { low: 0.05, high: 0.1 },
};

/** Illustrative lever split, matching the levers shown on the home page outcomes band. */
export const roiLevers = {
  thermal: [
    { name: "Heat balance", share: 0.015 },
    { name: "Kiln optimization", share: 0.03 },
    { name: "False-air reduction", share: 0.02 },
  ],
  power: [
    { name: "False-air reduction", share: 0.015 },
    { name: "Grinding optimization", share: 0.04 },
    { name: "Load & demand management", share: 0.02 },
  ],
};

export const currencies = [
  { code: "USD", label: "US dollar (USD)" },
  { code: "INR", label: "Indian rupee (INR)" },
  { code: "AED", label: "UAE dirham (AED)" },
  { code: "SAR", label: "Saudi riyal (SAR)" },
  { code: "IDR", label: "Indonesian rupiah (IDR)" },
  { code: "VND", label: "Vietnamese dong (VND)" },
  { code: "THB", label: "Thai baht (THB)" },
  { code: "EUR", label: "Euro (EUR)" },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

/** Example inputs only. Visitors are told to replace them with their own plant's numbers. */
export const roiDefaults = {
  currency: "USD" as CurrencyCode,
  clinkerTonnes: 1_500_000,
  kcalPerKg: 740,
  fuelCostPerGcal: 22,
  kwhPerTonne: 80,
  powerCostPerKwh: 0.09,
  cementTonnes: "",
};

export const roiPage = {
  eyebrow: "Savings estimate",
  heading: "Estimate what lower fuel and power use could be worth to your plant.",
  body: "Enter your plant's numbers to see an estimate across our target ranges: 5–8% thermal energy and 5–10% power. These are targets we validate against your own measured baseline, not guaranteed results.",
  inputsHeading: "Your plant",
  examplesNote: "Example values shown. Replace them with your plant's figures.",
  fields: {
    currency: "Currency",
    clinkerTonnes: { label: "Annual clinker production", unit: "t/yr" },
    kcalPerKg: { label: "Specific heat (kcal/kg clinker)", unit: "kcal/kg" },
    fuelCostPerGcal: { label: "Fuel cost per Gcal (million kcal)", unit: "/ Gcal" },
    kwhPerTonne: { label: "Specific power", unit: "kWh/t" },
    powerCostPerKwh: { label: "Power cost per kWh", unit: "/ kWh" },
    cementTonnes: {
      label: "Annual cement production (optional)",
      unit: "t/yr",
      hint: "If you track kWh per tonne of cement, enter cement tonnes and power is applied to them. Otherwise power is applied to clinker tonnes.",
    },
  },
  resultsHeading: "Estimated annual savings",
  estimateTag: "Estimate",
  totalLabel: "Total estimated savings per year",
  thermalLabel: "Thermal energy (fuel)",
  powerLabel: "Electrical power",
  rangeLabel: (low: string, high: string) => `${low} – ${high}`,
  bandLabel: (lowPct: number, highPct: number) => `${lowPct}–${highPct}% target range`,
  baselineLabel: "Current annual cost",
  energyLabel: "Energy saved",
  gcalUnit: "Gcal / year",
  mwhUnit: "MWh / year",
  leversHeading: "Illustrative lever split",
  leversNote: "How the midpoint might divide across levers. Actual split depends on your plant and is set during the baseline phase.",
  assumptionsHeading: "How this is calculated",
  assumptions: [
    "Annual heat = clinker tonnes × kcal/kg ÷ 1,000 (in Gcal). Fuel cost = annual heat × fuel cost per Gcal.",
    "Annual power = tonnes × kWh/t. Power cost = annual power × cost per kWh.",
    "Savings apply the 5–8% (thermal) and 5–10% (power) target ranges to those annual costs.",
    "Excludes implementation cost, maintenance savings, production gains and carbon pricing.",
  ],
  disclaimer:
    "Estimates only. Target ranges are validated in a baseline phase against each plant's own measured performance and are not guaranteed results.",
  cta: {
    heading: "Turn this estimate into a validated number.",
    body: "A plant assessment checks your baseline and the loss areas behind it.",
    label: "Request a plant assessment",
    href: "/assessment",
  },
  invalid: "Enter a number of zero or more.",
  seo: {
    title: "Savings Estimate Calculator",
    description:
      "Estimate annual fuel and power savings for a cement plant across Vigil.AI's 5–8% thermal and 5–10% power target ranges. Estimates only.",
  },
};
