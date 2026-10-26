import { expect, test } from "@playwright/test";
import { estimateRoi } from "../src/lib/roi";

test("roi estimate applies the published target bands", () => {
  const r = estimateRoi({ clinkerTonnes: 1_500_000, kcalPerKg: 740, fuelCostPerGcal: 22, kwhPerTonne: 80, powerCostPerKwh: 0.09 });
  expect(r.heatGcal).toBe(1_110_000);
  expect(r.fuelCost).toBeCloseTo(24_420_000);
  expect(r.thermal.low).toBeCloseTo(1_221_000);
  expect(r.thermal.high).toBeCloseTo(1_953_600);
  expect(r.powerCost).toBeCloseTo(10_800_000);
  expect(r.power.low).toBeCloseTo(540_000);
  expect(r.power.high).toBeCloseTo(1_080_000);
  expect(r.total.low).toBeCloseTo(1_761_000);
  expect(r.total.high).toBeCloseTo(3_033_600);
});

test("roi applies power to cement tonnes when given", () => {
  const r = estimateRoi({
    clinkerTonnes: 1_000_000,
    kcalPerKg: 700,
    fuelCostPerGcal: 20,
    kwhPerTonne: 75,
    powerCostPerKwh: 0.1,
    cementTonnes: 1_300_000,
  });
  expect(r.powerMwh).toBeCloseTo(97_500);
});
