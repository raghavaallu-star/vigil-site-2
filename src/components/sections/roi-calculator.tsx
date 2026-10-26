"use client";

import { useId, useMemo, useState } from "react";
import { currencies, roiBands, roiDefaults, roiPage, type CurrencyCode } from "@/content/roi";
import { estimateRoi } from "@/lib/roi";
import { cn } from "@/lib/utils";

type NumField = "clinkerTonnes" | "kcalPerKg" | "fuelCostPerGcal" | "kwhPerTonne" | "powerCostPerKwh" | "cementTonnes";

const fieldOrder: NumField[] = ["clinkerTonnes", "kcalPerKg", "fuelCostPerGcal", "kwhPerTonne", "powerCostPerKwh", "cementTonnes"];

function parse(v: string) {
  if (v.trim() === "") return NaN;
  return Number(v.replace(/,/g, ""));
}

function money(n: number, currency: CurrencyCode) {
  const abs = Math.abs(n);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: abs >= 1e7 ? "compact" : "standard",
    maximumFractionDigits: abs >= 1e7 ? 2 : 0,
  }).format(n);
}

const num = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

export function RoiCalculator() {
  const uid = useId();
  const [currency, setCurrency] = useState<CurrencyCode>(roiDefaults.currency);
  const [values, setValues] = useState<Record<NumField, string>>({
    clinkerTonnes: String(roiDefaults.clinkerTonnes),
    kcalPerKg: String(roiDefaults.kcalPerKg),
    fuelCostPerGcal: String(roiDefaults.fuelCostPerGcal),
    kwhPerTonne: String(roiDefaults.kwhPerTonne),
    powerCostPerKwh: String(roiDefaults.powerCostPerKwh),
    cementTonnes: roiDefaults.cementTonnes,
  });

  const parsed = useMemo(() => Object.fromEntries(fieldOrder.map((k) => [k, parse(values[k])])) as Record<NumField, number>, [values]);
  const invalid = (k: NumField) => (k === "cementTonnes" ? values[k].trim() !== "" && !(parsed[k] >= 0) : !(parsed[k] >= 0));
  const anyInvalid = fieldOrder.some(invalid);

  const r = useMemo(
    () =>
      anyInvalid
        ? null
        : estimateRoi({
            clinkerTonnes: parsed.clinkerTonnes,
            kcalPerKg: parsed.kcalPerKg,
            fuelCostPerGcal: parsed.fuelCostPerGcal,
            kwhPerTonne: parsed.kwhPerTonne,
            powerCostPerKwh: parsed.powerCostPerKwh,
            cementTonnes: Number.isFinite(parsed.cementTonnes) ? parsed.cementTonnes : undefined,
          }),
    [parsed, anyInvalid],
  );

  const pct = (x: number) => Math.round(x * 100);
  const f = roiPage.fields;

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form className="card rounded-[var(--radius-card)] p-6 sm:p-8" onSubmit={(e) => e.preventDefault()} aria-labelledby={`${uid}-inputs`}>
        <h2 id={`${uid}-inputs`} className="font-display text-xl text-ink-950">
          {roiPage.inputsHeading}
        </h2>
        <p className="mt-1 text-sm text-ink-600">{roiPage.examplesNote}</p>

        <div className="mt-6">
          <label htmlFor={`${uid}-currency`} className="text-sm font-medium text-ink-900">
            {f.currency}
          </label>
          <select
            id={`${uid}-currency`}
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="mt-1.5 block w-full rounded-[4px] border border-ink-950/15 bg-white px-3.5 py-2.5 text-ink-950"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {fieldOrder.map((k) => {
            const meta = f[k];
            const id = `${uid}-${k}`;
            const bad = invalid(k);
            const wide = k === "cementTonnes";
            return (
              <div key={k} className={wide ? "sm:col-span-2" : undefined}>
                <label htmlFor={id} className="text-sm font-medium text-ink-900">
                  {meta.label}
                </label>
                <div
                  className={cn(
                    "mt-1.5 flex items-center rounded-[4px] border bg-white focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-kiln-700",
                    bad ? "border-alarm-500" : "border-ink-950/15",
                  )}
                >
                  <input
                    id={id}
                    inputMode="decimal"
                    value={values[k]}
                    onChange={(e) => setValues((v) => ({ ...v, [k]: e.target.value }))}
                    aria-invalid={bad}
                    aria-describedby={[bad ? `${id}-err` : "", "hint" in meta ? `${id}-hint` : "", `${id}-unit`].filter(Boolean).join(" ")}
                    className="w-full min-w-0 rounded-[4px] bg-transparent px-3.5 py-2.5 text-ink-950 focus:outline-none"
                  />
                  <span id={`${id}-unit`} className="shrink-0 pr-3.5 font-mono text-[0.7rem] text-ink-600">
                    {meta.unit}
                  </span>
                </div>
                {"hint" in meta && (
                  <p id={`${id}-hint`} className="mt-1 text-xs text-ink-600">
                    {meta.hint}
                  </p>
                )}
                {bad && (
                  <p id={`${id}-err`} className="mt-1 text-sm text-alarm-700">
                    {roiPage.invalid}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </form>

      <section
        aria-labelledby={`${uid}-results`}
        className="rounded-[var(--radius-card)] border border-kiln-600/25 bg-gradient-to-b from-kiln-200/40 to-white p-6 sm:p-8"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 id={`${uid}-results`} className="font-display text-xl text-ink-950">
            {roiPage.resultsHeading}
          </h2>
          <span className="rounded-[3px] border border-kiln-700/40 bg-white px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.14em] text-kiln-700 uppercase">
            {roiPage.estimateTag}
          </span>
        </div>

        <div aria-live="polite">
          {r ? (
            <>
              <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-ink-600 uppercase">{roiPage.totalLabel}</p>
              <p className="mt-1 font-display text-4xl text-ink-950 sm:text-5xl">
                {roiPage.rangeLabel(money(r.total.low, currency), money(r.total.high, currency))}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    label: roiPage.thermalLabel,
                    band: roiPage.bandLabel(pct(roiBands.thermal.low), pct(roiBands.thermal.high)),
                    low: r.thermal.low,
                    high: r.thermal.high,
                    base: r.fuelCost,
                    energy: `${num(r.thermal.gcalLow)} – ${num(r.thermal.gcalHigh)} ${roiPage.gcalUnit}`,
                  },
                  {
                    label: roiPage.powerLabel,
                    band: roiPage.bandLabel(pct(roiBands.power.low), pct(roiBands.power.high)),
                    low: r.power.low,
                    high: r.power.high,
                    base: r.powerCost,
                    energy: `${num(r.power.mwhLow)} – ${num(r.power.mwhHigh)} ${roiPage.mwhUnit}`,
                  },
                ].map((c) => (
                  <div key={c.label} className="card rounded-[var(--radius-card)] p-5">
                    <p className="font-semibold text-ink-950">{c.label}</p>
                    <p className="font-mono text-xs text-kiln-700">{c.band}</p>
                    <p className="mt-3 font-display text-2xl text-ink-950">
                      {roiPage.rangeLabel(money(c.low, currency), money(c.high, currency))}
                    </p>
                    <dl className="mt-3 space-y-1 text-sm">
                      <div className="flex justify-between gap-3">
                        <dt className="text-ink-600">{roiPage.baselineLabel}</dt>
                        <dd className="font-mono text-ink-900">{money(c.base, currency)}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-ink-600">{roiPage.energyLabel}</dt>
                        <dd className="text-right font-mono text-ink-900">{c.energy}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>

              <h3 className="mt-8 text-xs font-semibold tracking-[0.14em] text-ink-600 uppercase">{roiPage.leversHeading}</h3>
              <p className="mt-1 text-sm text-ink-600">{roiPage.leversNote}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { label: roiPage.thermalLabel, items: r.levers.thermal },
                  { label: roiPage.powerLabel, items: r.levers.power },
                ].map((g) => {
                  const max = Math.max(...g.items.map((i) => i.value), 1);
                  return (
                    <ul key={g.label} aria-label={g.label} className="space-y-2">
                      {g.items.map((l) => (
                        <li key={l.name}>
                          <div className="flex justify-between gap-2 text-sm">
                            <span className="text-ink-800">{l.name}</span>
                            <span className="font-mono text-ink-900">{money(l.value, currency)}</span>
                          </div>
                          <div aria-hidden="true" className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink-950/[0.06]">
                            <div className="h-full rounded-full bg-kiln-500" style={{ width: `${(l.value / max) * 100}%` }} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="mt-6 text-ink-700">{roiPage.invalid}</p>
          )}
        </div>

        <p className="card mt-8 rounded-[4px] p-4 text-sm text-ink-700">
          <span aria-hidden="true" className="text-kiln-700">
            †{" "}
          </span>
          {roiPage.disclaimer}
        </p>
      </section>
    </div>
  );
}
