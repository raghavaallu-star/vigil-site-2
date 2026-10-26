"use client";

import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { energyMock, trendMock } from "@/content/mocks";
import { MockFrame } from "./mock-frame";

/** Deterministic pseudo-random series so server and client render the same data. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const trendData = (() => {
  const rnd = seeded(42);
  return Array.from({ length: 48 }, (_, i) => {
    const base = 61 + Math.sin(i / 5) * 1.6;
    const drift = i > 30 ? (i - 30) * 0.55 : 0;
    const actual = +(base + drift + (rnd() - 0.5) * 1.6).toFixed(1);
    return { t: i, actual, band: [+(base - 3).toFixed(1), +(base + 3).toFixed(1)] as [number, number] };
  });
})();

const axis = { fill: "#5b6879", fontSize: 10, fontFamily: "var(--font-mono)" };

export function TrendChartMock({ className }: { className?: string }) {
  return (
    <MockFrame title={trendMock.title} className={className}>
      <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.65rem] text-ink-600">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-0.5 w-4 bg-kiln-400" />
          {trendMock.actualLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-4 rounded-sm bg-signal-400/25" />
          {trendMock.bandLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-4 rounded-sm bg-alarm-500/25" />
          {trendMock.anomalyLabel}
        </span>
      </div>
      <div className="h-48 w-full" role="img" aria-label={`${trendMock.title}. ${trendMock.footer}`}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={trendData} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
            <CartesianGrid stroke="rgb(16 21 28 / 0.07)" vertical={false} />
            <XAxis dataKey="t" tick={false} axisLine={false} tickLine={false} />
            <YAxis domain={[54, 76]} tick={axis} axisLine={false} tickLine={false} unit={trendMock.unit} width={50} />
            <ReferenceArea x1={31} x2={47} fill="#f05252" fillOpacity={0.1} stroke="#f05252" strokeOpacity={0.3} strokeDasharray="3 3" />
            <Area dataKey="band" stroke="none" fill="#34d3bd" fillOpacity={0.16} isAnimationActive={false} />
            <Line dataKey="actual" stroke="#d9711a" strokeWidth={2} dot={false} isAnimationActive={false} />
            <Tooltip
              cursor={{ stroke: "rgb(16 21 28 / 0.2)" }}
              contentStyle={{
                background: "#ffffff",
                border: "1px solid rgb(16 21 28 / 0.12)",
                borderRadius: 8,
                fontSize: 12,
                color: "#10151c",
              }}
              labelFormatter={() => ""}
              formatter={(v, name) =>
                name === "actual" ? [`${v} ${trendMock.unit}`, trendMock.actualLabel] : [String(v).replace(",", " – "), trendMock.bandLabel]
              }
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 font-mono text-[0.7rem] text-alarm-700">{trendMock.footer}</p>
    </MockFrame>
  );
}

export function EnergyBarsMock({ className }: { className?: string }) {
  return (
    <MockFrame title={energyMock.title} className={className}>
      <div className="mb-2 flex items-center gap-4 font-mono text-[0.65rem] text-ink-600">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-kiln-500" />
          {energyMock.actualLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-signal-400" />
          {energyMock.bestLabel}
        </span>
        <span className="ml-auto">{energyMock.unit}</span>
      </div>
      <div
        className="h-40 w-full"
        role="img"
        aria-label={`${energyMock.title}: ${energyMock.bars.map((b) => `${b.name} ${b.actual} vs best ${b.best}`).join(", ")}`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={energyMock.bars} margin={{ top: 6, right: 6, bottom: 0, left: -18 }} barGap={4}>
            <CartesianGrid stroke="rgb(16 21 28 / 0.07)" vertical={false} />
            <XAxis dataKey="name" tick={axis} axisLine={false} tickLine={false} />
            <YAxis domain={[680, 790]} tick={axis} axisLine={false} tickLine={false} width={50} />
            <Bar dataKey="actual" fill="#f28c28" radius={[4, 4, 0, 0]} isAnimationActive={false} />
            <Bar dataKey="best" fill="#34d3bd" radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 font-mono text-[0.62rem] tracking-widest text-ink-600 uppercase">{energyMock.lossesLabel}</p>
      <ul className="mt-1.5 space-y-1.5">
        {energyMock.losses.map((l) => (
          <li key={l.label} className="flex items-center justify-between rounded-lg bg-ink-950/[0.03] px-3 py-2 text-sm">
            <span className="text-ink-800">{l.label}</span>
            <span className="font-mono text-xs text-kiln-700">{l.value}</span>
          </li>
        ))}
      </ul>
    </MockFrame>
  );
}
