import { AlertTriangle, Check, CircleCheck, Flag, Plus, Wrench } from "lucide-react";
import {
  alertsMock,
  checklistMock,
  gaugeMock,
  historianMock,
  kpiMock,
  maturityMock,
  rootCauseMock,
  workOrderMock,
  fleetMock,
  millMock,
  conveyorMock,
  dispatchMock,
  tileMocks,
  assetsMockLabels,
} from "@/content/mocks";
import type { PlantArea } from "@/content/types";
import { cn } from "@/lib/utils";
import { MockFrame } from "./mock-frame";

/* Lightweight SVG/HTML mocks. Chart-heavy mocks live in chart-mocks.tsx and load lazily. */

export function HealthGaugeMock({ className }: { className?: string }) {
  const { score } = gaugeMock;
  const r = 52;
  const c = Math.PI * r; // half circle
  const filled = (score / 100) * c;
  return (
    <MockFrame title={gaugeMock.title} className={className}>
      <div className="grid items-center gap-4 @sm:grid-cols-[150px_1fr]">
        <div className="relative mx-auto w-[150px]">
          <svg viewBox="0 0 130 74" className="w-full" role="img" aria-label={`${gaugeMock.title}: ${score} of 100`}>
            <defs>
              <linearGradient id="gauge-grad" x1="0" x2="1">
                <stop offset="0%" stopColor="#f05252" />
                <stop offset="45%" stopColor="#f28c28" />
                <stop offset="100%" stopColor="#34d3bd" />
              </linearGradient>
            </defs>
            <path d="M13 66a52 52 0 0 1 104 0" fill="none" stroke="rgb(16 21 28 / 0.08)" strokeWidth="10" strokeLinecap="round" />
            <path
              d="M13 66a52 52 0 0 1 104 0"
              fill="none"
              stroke="url(#gauge-grad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${filled} ${c}`}
            />
          </svg>
          <div className="absolute inset-x-0 bottom-0 text-center">
            <p className="font-display text-3xl leading-none font-semibold text-ink-950">{score}</p>
            <p className="mt-1 font-mono text-[0.65rem] tracking-widest text-kiln-700 uppercase">{gaugeMock.status}</p>
          </div>
        </div>
        <div>
          <p className="font-mono text-xs text-alarm-700">{gaugeMock.delta}</p>
          <ul className="mt-2 space-y-1.5">
            {gaugeMock.factors.map((f) => (
              <li key={f.label} className="flex items-center justify-between gap-3 rounded-lg bg-ink-950/[0.03] px-3 py-2 text-sm">
                <span className="text-ink-700">{f.label}</span>
                <span className={cn("font-mono text-xs", f.tone === "warn" ? "text-kiln-700" : "text-signal-700")}>{f.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MockFrame>
  );
}

const sevStyles = {
  high: "bg-alarm-500/15 text-alarm-700 border-alarm-500/30",
  medium: "bg-kiln-500/15 text-kiln-700 border-kiln-500/30",
  low: "bg-ink-950/[0.04] text-ink-700 border-ink-950/10",
};

export function AlertListMock({ className }: { className?: string }) {
  return (
    <MockFrame title={alertsMock.title} className={className}>
      <ul className="space-y-2">
        {alertsMock.items.map((a) => (
          <li key={a.asset} className="flex items-start gap-3 rounded-xl border border-ink-950/[0.08] bg-ink-950/[0.025] p-3">
            <AlertTriangle
              aria-hidden="true"
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                a.severity === "high" ? "text-alarm-700" : a.severity === "medium" ? "text-kiln-700" : "text-ink-600",
              )}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink-950">{a.message}</p>
              <p className="truncate font-mono text-[0.7rem] text-ink-600">{a.asset}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[0.6rem] uppercase", sevStyles[a.severity])}>
                {alertsMock.severityLabels[a.severity]}
              </span>
              <span className="font-mono text-[0.65rem] text-ink-600">{a.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </MockFrame>
  );
}

export function WorkOrderMock({ className }: { className?: string }) {
  const w = workOrderMock;
  return (
    <MockFrame title={w.title} className={className}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs text-ink-600">{w.id}</span>
        <span className="rounded-full border border-alarm-500/30 bg-alarm-500/10 px-2 py-0.5 font-mono text-[0.65rem] text-alarm-700">
          {w.criticality}
        </span>
      </div>
      <p className="mt-2 font-display text-lg font-semibold text-ink-950">{w.asset}</p>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-kiln-700">
        <Wrench aria-hidden="true" className="h-3.5 w-3.5" />
        {w.source}
      </p>
      <p className="mt-4 font-mono text-[0.65rem] tracking-widest text-ink-600 uppercase">{w.labels.tasks}</p>
      <ol className="mt-2 space-y-1.5">
        {w.tasks.map((t, i) => (
          <li key={t} className="flex gap-2.5 text-sm text-ink-800">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-ink-950/[0.04] font-mono text-[0.65rem] text-ink-600">
              {i + 1}
            </span>
            {t}
          </li>
        ))}
      </ol>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {(
          [
            [w.labels.parts, w.parts],
            [w.labels.duration, w.duration],
            [w.labels.window, w.window],
          ] as const
        ).map(([k, v]) => (
          <div key={k} className="rounded-lg bg-ink-950/[0.03] p-2.5 last:col-span-2">
            <dt className="font-mono text-[0.6rem] tracking-widest text-ink-600 uppercase">{k}</dt>
            <dd className="mt-0.5 text-ink-800">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex justify-end">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-kiln-500 px-3.5 py-1.5 text-xs font-medium text-ink-950">
          <Check aria-hidden="true" className="h-3.5 w-3.5" />
          {w.approve}
        </span>
      </div>
    </MockFrame>
  );
}

export function ChecklistMock({ className }: { className?: string }) {
  const m = checklistMock;
  return (
    <div className={cn("relative mx-auto w-full max-w-[290px]", className)}>
      <MockFrame title={m.title} className="rounded-[2rem] border-[6px] border-ink-200" live={false}>
        <p className="font-mono text-[0.7rem] text-ink-600">{m.subtitle}</p>
        <ul className="mt-3 space-y-2">
          {m.items.map((it) => (
            <li
              key={it.label}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3",
                it.flagged ? "border-kiln-500/40 bg-kiln-500/10" : "border-ink-950/[0.08] bg-ink-950/[0.025]",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
                  it.done ? "border-signal-400 bg-signal-400/15 text-signal-700" : "border-ink-950/20 text-transparent",
                )}
              >
                <Check aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block text-sm", it.done ? "text-ink-600 line-through" : "text-ink-950")}>{it.label}</span>
                <span className="block truncate font-mono text-[0.65rem] text-ink-600">{it.detail}</span>
                {it.flagged && (
                  <span className="mt-1 inline-flex items-center gap-1 font-mono text-[0.6rem] text-kiln-700">
                    <Flag aria-hidden="true" className="h-3 w-3" />
                    {m.linked}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-alarm-500/40 py-2.5 text-sm text-alarm-700">
          <Plus aria-hidden="true" className="h-4 w-4" />
          {m.breakdown}
        </div>
      </MockFrame>
    </div>
  );
}

function Sparkline({ values, className }: { values: number[]; className?: string }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${28 - ((v - min) / (max - min || 1)) * 24}`).join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className={cn("h-8 w-full", className)} aria-hidden="true">
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}

export function KpiTilesMock({ className }: { className?: string }) {
  return (
    <MockFrame title={kpiMock.title} className={className}>
      <div className="grid grid-cols-2 gap-2.5">
        {kpiMock.tiles.map((t) => (
          <div key={t.label} className="rounded-xl border border-ink-950/[0.08] bg-ink-950/[0.025] p-3">
            <p className="font-mono text-[0.65rem] tracking-wider text-ink-600 uppercase">{t.label}</p>
            <p className="mt-1 font-display text-2xl font-semibold text-ink-950">{t.value}</p>
            <Sparkline values={t.trend} className="mt-1 text-signal-700" />
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

export function HistorianMock({ className }: { className?: string }) {
  const m = historianMock;
  return (
    <MockFrame title={m.title} className={className}>
      <div className="grid grid-cols-3 gap-2">
        {m.stats.map((s) => (
          <div key={s.label} className="rounded-lg bg-ink-950/[0.03] p-2.5">
            <p className="font-display text-lg font-semibold text-ink-950">{s.value}</p>
            <p className="font-mono text-[0.6rem] tracking-wider text-ink-600 uppercase">{s.label}</p>
          </div>
        ))}
      </div>
      <ul className="mt-3 space-y-0.5 font-mono text-[0.78rem]">
        {m.tree.map((n) => (
          <li
            key={n.label}
            className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-ink-950/[0.03]"
            style={{ paddingLeft: `${0.5 + n.depth * 1.1}rem` }}
          >
            <span className={cn(n.depth === 0 ? "text-ink-950" : n.depth === 1 ? "text-ink-800" : "text-ink-700")}>
              <span aria-hidden="true" className="mr-1.5 text-ink-600">
                {n.depth > 0 ? "└" : "▾"}
              </span>
              {n.label}
            </span>
            {"tags" in n && n.tags && (
              <span className="flex items-center gap-2 text-[0.68rem]">
                <span className="text-ink-600">{n.tags} tags</span>
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5",
                    n.status === "ok" ? "bg-signal-400/10 text-signal-700" : "bg-kiln-500/15 text-kiln-700",
                  )}
                >
                  {m.statusLabels[n.status!]}
                </span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </MockFrame>
  );
}

const kindStyles = {
  signal: "bg-ink-200 text-ink-800",
  alert: "bg-kiln-500 text-ink-950",
  log: "bg-signal-500 text-ink-950",
  breakdown: "bg-alarm-500 text-ink-950",
};

export function RootCauseMock({ className }: { className?: string }) {
  const m = rootCauseMock;
  return (
    <MockFrame title={m.title} className={className}>
      <ol className="relative space-y-3 pl-5">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-ink-600 via-kiln-500 to-alarm-500"
        />
        {m.events.map((e) => (
          <li key={e.label} className="relative">
            <span
              aria-hidden="true"
              className={cn("absolute top-1 -left-5 h-3.5 w-3.5 rounded-full border-2 border-white", kindStyles[e.kind].split(" ")[0])}
            />
            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.68rem] text-ink-600">{e.time}</span>
              <span className={cn("rounded px-1.5 py-0.5 font-mono text-[0.58rem] uppercase", kindStyles[e.kind])}>
                {m.kindLabels[e.kind]}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-ink-900">{e.label}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 flex items-start gap-2 rounded-lg border border-signal-400/20 bg-signal-400/5 p-2.5 text-xs text-signal-700">
        <CircleCheck aria-hidden="true" className="mt-px h-4 w-4 shrink-0" />
        {m.summary}
      </p>
    </MockFrame>
  );
}

export function MaturityMock({ className }: { className?: string }) {
  const m = maturityMock;
  return (
    <MockFrame title={m.title} className={className} live={false}>
      <ol className="flex items-end gap-1.5" aria-label={m.title}>
        {m.steps.map((s, i) => (
          <li key={s} className="flex flex-1 flex-col items-center gap-2">
            <span className="h-4 font-mono text-[0.58rem] text-kiln-700 uppercase">
              {i === m.current ? m.youAreHere : i === m.targetIndex ? m.target : ""}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "w-full rounded-md",
                i <= m.current
                  ? "bg-kiln-500"
                  : i <= m.targetIndex
                    ? "bg-kiln-500/30 outline outline-1 outline-kiln-500/60 outline-dashed"
                    : "bg-ink-950/[0.05]",
              )}
              style={{ height: `${28 + i * 18}px` }}
            />
            <span className="text-center text-[0.68rem] leading-tight text-ink-700">{s}</span>
          </li>
        ))}
      </ol>
    </MockFrame>
  );
}

const healthDot = { ok: "bg-signal-400", watch: "bg-kiln-400", act: "bg-alarm-500" } as const;
const healthText = { ok: "text-signal-700", watch: "text-kiln-700", act: "text-alarm-700" } as const;

export function FleetHealthMock({ className }: { className?: string }) {
  const m = fleetMock;
  return (
    <MockFrame title={m.title} className={className}>
      <div className="mb-3 flex flex-wrap gap-3 font-mono text-[0.65rem] text-ink-600">
        {(Object.keys(m.legend) as (keyof typeof m.legend)[]).map((k) => (
          <span key={k} className="flex items-center gap-1.5">
            <span aria-hidden="true" className={cn("h-2.5 w-2.5 rounded-sm", healthDot[k])} />
            {m.legend[k]}
          </span>
        ))}
      </div>
      <ul className="space-y-1.5">
        {m.areas.map((a) => (
          <li key={a.area} className="flex items-center gap-3">
            <span className="w-24 shrink-0 truncate font-mono text-[0.7rem] text-ink-700">{a.area}</span>
            <span className="flex flex-1 gap-1">
              {a.assets.map((h, i) => (
                <span key={i} title={m.legend[h]} className={cn("h-5 max-w-[34px] min-w-[10px] flex-1 rounded-[4px]", healthDot[h])} />
              ))}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 font-mono text-[0.7rem] text-ink-700">{m.summary}</p>
    </MockFrame>
  );
}

export function MillMock({ className }: { className?: string }) {
  const m = millMock;
  return (
    <MockFrame title={m.title} className={className}>
      <p className="inline-flex items-center gap-1.5 rounded-full border border-signal-400/30 bg-signal-400/10 px-2.5 py-1 font-mono text-[0.65rem] text-signal-700">
        <CircleCheck aria-hidden="true" className="h-3.5 w-3.5" />
        {m.status}
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {m.tiles.map((t) => (
          <div key={t.label} className="rounded-xl border border-ink-950/[0.08] bg-ink-950/[0.025] p-2.5">
            <p className="truncate font-mono text-[0.6rem] tracking-wider text-ink-600 uppercase">{t.label}</p>
            <p className="mt-0.5 font-display text-xl font-semibold text-ink-950">{t.value}</p>
            <p className="truncate font-mono text-[0.6rem] text-ink-600">{t.target}</p>
            <Sparkline values={t.trend} className="mt-1 h-6 text-kiln-700" />
          </div>
        ))}
      </div>
      <p className="mt-3 rounded-lg border border-kiln-500/25 bg-kiln-500/[0.07] p-2.5 text-xs text-kiln-800">{m.recommendation}</p>
    </MockFrame>
  );
}

export function ConveyorMock({ className, variant = "conveyor" }: { className?: string; variant?: "conveyor" | "dispatch" }) {
  const m = variant === "dispatch" ? dispatchMock : conveyorMock;
  return (
    <MockFrame title={m.title} className={className}>
      <ol className="space-y-2">
        {m.items.map((it) => (
          <li key={it.id} className="rounded-xl border border-ink-950/[0.08] bg-ink-950/[0.025] p-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-2">
                <span aria-hidden="true" className={cn("h-2 w-2 shrink-0 rounded-full", healthDot[it.status])} />
                <span className="font-mono text-[0.68rem] text-ink-600">{it.id}</span>
                <span className="truncate text-sm text-ink-900">{it.name}</span>
              </span>
              <span className={cn("shrink-0 font-mono text-[0.62rem] uppercase", healthText[it.status])}>{m.statusLabels[it.status]}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="sr-only">
                {m.loadLabel} {it.load}%
              </span>
              <span aria-hidden="true" className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-950/[0.05]">
                <span className={cn("block h-full rounded-full", healthDot[it.status])} style={{ width: `${it.load}%` }} />
              </span>
              <span className="w-32 shrink-0 truncate text-right font-mono text-[0.62rem] text-ink-700">{it.note}</span>
            </div>
          </li>
        ))}
      </ol>
    </MockFrame>
  );
}

/** KPI tiles for industry-specific agents (data in content/mocks.ts tileMocks). */
export function TilesMock({ kind, className }: { kind: keyof typeof tileMocks; className?: string }) {
  const m = tileMocks[kind];
  return (
    <MockFrame title={m.title} className={className}>
      <div className="grid grid-cols-2 gap-2.5">
        {m.tiles.map((t) => (
          <div key={t.label} className="rounded-[4px] border border-ink-950/[0.08] bg-white p-3">
            <p className="truncate text-[0.65rem] font-semibold tracking-wider text-ink-600 uppercase">{t.label}</p>
            <p className="mt-1 font-display text-2xl text-ink-950">{t.value}</p>
            <Sparkline values={t.trend} className={cn("mt-1", t.good ? "text-signal-700" : "text-kiln-600")} />
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

/** Deterministic status per asset so the mock is stable between renders. */
function statusFor(name: string): "ok" | "watch" | "act" {
  let h = 0;
  for (const ch of name) h = (h * 33 + ch.charCodeAt(0)) >>> 0;
  return h % 7 === 0 ? "act" : h % 3 === 0 ? "watch" : "ok";
}

/** Asset health list generated from an area's own equipment. */
export function AssetsMock({ area, className }: { area: PlantArea; className?: string }) {
  const L = assetsMockLabels;
  return (
    <MockFrame title={L.title(area.name)} className={className}>
      <div className="mb-3 flex flex-wrap gap-3 text-[0.65rem] text-ink-600">
        {(Object.keys(L.legend) as (keyof typeof L.legend)[]).map((k) => (
          <span key={k} className="flex items-center gap-1.5">
            <span aria-hidden="true" className={cn("h-2.5 w-2.5 rounded-sm", healthDot[k])} />
            {L.legend[k]}
          </span>
        ))}
      </div>
      <ul className="space-y-2">
        {area.assets.map((as) => {
          const st = statusFor(as.name);
          return (
            <li key={as.name} className="rounded-[4px] border border-ink-950/[0.08] bg-white p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2">
                  <span aria-hidden="true" className={cn("h-2 w-2 shrink-0 rounded-full", healthDot[st])} />
                  <span className="truncate text-sm text-ink-950">{as.name}</span>
                </span>
                <span className={cn("shrink-0 text-[0.62rem] font-semibold uppercase", healthText[st])}>{L.legend[st]}</span>
              </div>
              <p className="mt-1 truncate pl-4 font-mono text-[0.65rem] text-ink-600">
                {as.watch.length} {L.signals} · {as.watch.join(" · ")}
              </p>
            </li>
          );
        })}
      </ul>
    </MockFrame>
  );
}
