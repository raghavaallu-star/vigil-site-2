import { roiBands, roiLevers } from "@/content/roi";

export interface RoiInputs {
  clinkerTonnes: number;
  kcalPerKg: number;
  fuelCostPerGcal: number;
  kwhPerTonne: number;
  powerCostPerKwh: number;
  /** When set, power is applied to cement tonnes instead of clinker tonnes. */
  cementTonnes?: number;
}

export interface RoiResult {
  heatGcal: number;
  fuelCost: number;
  powerMwh: number;
  powerCost: number;
  thermal: { low: number; high: number; gcalLow: number; gcalHigh: number };
  power: { low: number; high: number; mwhLow: number; mwhHigh: number };
  total: { low: number; high: number };
  levers: { thermal: { name: string; value: number }[]; power: { name: string; value: number }[] };
}

/** Pure estimate: applies the published target bands to the plant's current annual energy cost. */
export function estimateRoi(i: RoiInputs): RoiResult {
  const heatGcal = (i.clinkerTonnes * i.kcalPerKg) / 1000;
  const fuelCost = heatGcal * i.fuelCostPerGcal;
  const powerTonnes = i.cementTonnes && i.cementTonnes > 0 ? i.cementTonnes : i.clinkerTonnes;
  const powerKwh = powerTonnes * i.kwhPerTonne;
  const powerCost = powerKwh * i.powerCostPerKwh;

  const thermal = {
    low: fuelCost * roiBands.thermal.low,
    high: fuelCost * roiBands.thermal.high,
    gcalLow: heatGcal * roiBands.thermal.low,
    gcalHigh: heatGcal * roiBands.thermal.high,
  };
  const power = {
    low: powerCost * roiBands.power.low,
    high: powerCost * roiBands.power.high,
    mwhLow: (powerKwh / 1000) * roiBands.power.low,
    mwhHigh: (powerKwh / 1000) * roiBands.power.high,
  };

  return {
    heatGcal,
    fuelCost,
    powerMwh: powerKwh / 1000,
    powerCost,
    thermal,
    power,
    total: { low: thermal.low + power.low, high: thermal.high + power.high },
    levers: {
      thermal: roiLevers.thermal.map((l) => ({ name: l.name, value: fuelCost * l.share })),
      power: roiLevers.power.map((l) => ({ name: l.name, value: powerCost * l.share })),
    },
  };
}
