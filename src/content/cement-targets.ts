/** Cement target ranges (validated per plant in the baseline phase). Shown on the cement industry page. */
export const cementTargets = {
  eyebrow: "Cement target outcomes",
  heading: "Lower fuel and power bills, measured against your own baseline.",
  body: "We agree target ranges with each cement plant up front, then measure its own baseline before anything is claimed. Every number below is a target to validate, not a promise.",
  stats: [
    {
      value: "5–8%",
      label: "Thermal energy savings",
      unit: "kcal/kg clinker",
      levers: [
        { name: "Heat balance", value: "~1.5%" },
        { name: "Kiln optimization", value: "~3.0%" },
        { name: "False-air reduction", value: "~2.0%" },
      ],
    },
    {
      value: "5–10%",
      label: "Power savings",
      unit: "kWh/t cement",
      levers: [
        { name: "False-air reduction", value: "~1.5%" },
        { name: "Grinding optimization", value: "~4.0%" },
        { name: "Load & demand management", value: "~2.0%" },
      ],
    },
  ],
  leversLabel: "Illustrative levers",
  reliability: {
    label: "Reliability",
    items: ["Higher MTBF across rotating equipment", "Fewer unplanned stops in every area", "Higher kiln run factor and mill availability"],
  },
};
