"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CircleCheck, RotateCcw, TriangleAlert, UserCheck } from "lucide-react";
import { useId, useRef, useState } from "react";
import { demoAlert, demoLog, demoPage, demoRootCause, demoSteps, demoTrend, type DemoStepId } from "@/content/demo";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { IllustrativeTag } from "@/components/mocks/mock-frame";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/* ---------- Simulated trend data (deterministic so server and client match) ---------- */

const W = 640;
const H = 220;
const PAD = { l: 40, r: 12, t: 12, b: 26 };
const POINTS = 7 * 12;

const series = Array.from({ length: POINTS }, (_, i) => {
  const base = 58 + Math.sin(i / 6) * 1.4;
  const drift = i > 48 ? (i - 48) * 0.32 : 0;
  const noise = Math.sin(i * 1.7) * 0.6 + Math.cos(i * 0.9) * 0.4;
  return { base, actual: base + drift + noise };
});

const yMin = 50;
const yMax = 76;
const x = (i: number) => PAD.l + (i / (POINTS - 1)) * (W - PAD.l - PAD.r);
const y = (v: number) => PAD.t + (1 - (v - yMin) / (yMax - yMin)) * (H - PAD.t - PAD.b);
const line = series.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(p.actual).toFixed(1)}`).join(" ");
const band =
  series.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(p.base + 3).toFixed(1)}`).join(" ") +
  " " +
  [...series]
    .reverse()
    .map((p, j) => `L${x(POINTS - 1 - j).toFixed(1)} ${y(p.base - 3).toFixed(1)}`)
    .join(" ") +
  " Z";

function TrendChart() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`${demoTrend.title}: ${demoTrend.kpis[2].value}`}>
      {[55, 60, 65, 70, 75].map((v) => (
        <g key={v}>
          <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="rgb(16 21 28 / 0.07)" />
          <text x={PAD.l - 8} y={y(v) + 3} textAnchor="end" className="fill-ink-600 font-mono text-[10px]">
            {v}
          </text>
        </g>
      ))}
      <rect
        x={x(48)}
        y={PAD.t}
        width={x(POINTS - 1) - x(48)}
        height={H - PAD.t - PAD.b}
        fill="#f05252"
        fillOpacity="0.08"
        stroke="#f05252"
        strokeOpacity="0.35"
        strokeDasharray="3 3"
      />
      <text x={x(48) + 6} y={PAD.t + 14} className="fill-alarm-700 font-mono text-[10px]">
        {demoTrend.driftLabel}
      </text>
      <path d={band} fill="#14b8a6" fillOpacity="0.14" />
      <path d={line} fill="none" stroke="#d9711a" strokeWidth="2" strokeLinejoin="round" />
      <circle cx={x(POINTS - 1)} cy={y(series[POINTS - 1].actual)} r="4" fill="#d9711a" />
      {demoTrend.days.map((d, i) => (
        <text key={d} x={x(i * 12 + 6)} y={H - 8} textAnchor="middle" className="fill-ink-600 font-mono text-[10px]">
          {d}
        </text>
      ))}
    </svg>
  );
}

/* ---------- Steps ---------- */

function StepTrend({ onNext }: { onNext: () => void }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
      <div className="card rounded-2xl p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-xs text-ink-700">{demoTrend.title}</p>
          <span className="flex items-center gap-3 font-mono text-[0.65rem] text-ink-600">
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="h-0.5 w-4 bg-kiln-600" />
              {demoTrend.actualLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="h-2.5 w-4 rounded-sm bg-signal-500/25" />
              {demoTrend.bandLabel}
            </span>
          </span>
        </div>
        <TrendChart />
      </div>
      <div className="flex flex-col gap-3">
        <div className="card rounded-2xl p-4">
          <p className="font-mono text-[0.65rem] tracking-wider text-ink-600 uppercase">{demoTrend.healthLabel}</p>
          <p className="mt-1 font-display text-4xl font-semibold text-ink-950">
            {demoTrend.healthNow}
            <span className="ml-2 align-middle font-mono text-sm text-alarm-700">−{demoTrend.healthBefore - demoTrend.healthNow}</span>
          </p>
        </div>
        <ul className="space-y-2">
          {demoTrend.kpis.map((k) => (
            <li
              key={k.label}
              className={cn(
                "flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm",
                k.tone === "warn" ? "border-kiln-600/40 bg-kiln-200/40" : "border-ink-950/10 bg-white",
              )}
            >
              <span className="text-ink-800">{k.label}</span>
              <span className={cn("font-mono text-xs", k.tone === "warn" ? "text-kiln-700" : "text-signal-700")}>{k.value}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onNext}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-kiln-500 px-4 py-2.5 text-sm font-medium text-ink-950 hover:bg-kiln-400"
        >
          <TriangleAlert aria-hidden="true" className="h-4 w-4" />
          {demoTrend.action}
        </button>
      </div>
    </div>
  );
}

function StepAlert({ assigned, onAssign }: { assigned: boolean; onAssign: () => void }) {
  return (
    <div className="rounded-2xl border border-alarm-500/30 bg-white">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink-950/10 p-5">
        <div className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-alarm-500/10 text-alarm-700">
            <TriangleAlert aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-ink-950">{demoAlert.title}</p>
            <p className="font-mono text-xs text-ink-600">{demoAlert.asset}</p>
            <p className="mt-0.5 font-mono text-xs text-ink-600">{demoAlert.raised}</p>
          </div>
        </div>
        <span className="rounded-full border border-alarm-500/40 bg-alarm-500/10 px-2.5 py-1 font-mono text-[0.65rem] text-alarm-700 uppercase">
          {demoAlert.severity}
        </span>
      </div>
      <div className="grid gap-6 p-5 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-mono text-[0.68rem] tracking-[0.16em] text-ink-600 uppercase">{demoAlert.whyHeading}</p>
          <ul className="mt-3 space-y-2">
            {demoAlert.why.map((w) => (
              <li key={w.signal} className="rounded-xl bg-ink-950/[0.03] px-3 py-2.5 text-sm">
                <span className="font-medium text-ink-950">{w.signal}</span>
                <span className="block text-ink-700">{w.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[0.68rem] tracking-[0.16em] text-ink-600 uppercase">{demoAlert.similarHeading}</p>
          <p className="text-sm text-ink-800">{demoAlert.similar}</p>
          <p className="rounded-xl border border-signal-700/25 bg-signal-700/[0.06] p-3 text-sm text-signal-700">{demoAlert.suggestion}</p>
          <button
            type="button"
            onClick={onAssign}
            disabled={assigned}
            className={cn(
              "mt-auto inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium",
              assigned ? "border border-signal-700/30 bg-signal-700/10 text-signal-700" : "bg-kiln-500 text-ink-950 hover:bg-kiln-400",
            )}
          >
            {assigned ? <Check aria-hidden="true" className="h-4 w-4" /> : <UserCheck aria-hidden="true" className="h-4 w-4" />}
            {assigned ? demoAlert.assigned : demoAlert.assign}
          </button>
        </div>
      </div>
    </div>
  );
}

function StepLog({ saved, onSave, onNext }: { saved: boolean; onSave: () => void; onNext: () => void }) {
  const uid = useId();
  const [mode, setMode] = useState(demoLog.modes[0]);
  const [note, setNote] = useState(demoLog.noteExample);
  return (
    <div className="mx-auto w-full max-w-sm rounded-[2rem] border-[6px] border-ink-200 bg-white p-5 shadow-[0_18px_44px_-24px_rgb(16_21_28/0.3)]">
      <p className="font-mono text-xs text-ink-600">{demoLog.appTitle}</p>
      <dl className="mt-3 space-y-2 text-sm">
        <div className="rounded-xl bg-ink-950/[0.03] px-3 py-2">
          <dt className="font-mono text-[0.62rem] text-ink-600 uppercase">{demoLog.assetLabel}</dt>
          <dd className="text-ink-950">{demoLog.asset}</dd>
        </div>
        <div className="rounded-xl border border-alarm-500/25 bg-alarm-500/[0.05] px-3 py-2">
          <dt className="font-mono text-[0.62rem] text-alarm-700 uppercase">{demoLog.linkedLabel}</dt>
          <dd className="text-ink-950">{demoLog.linked}</dd>
        </div>
      </dl>
      <fieldset className="mt-4" disabled={saved}>
        <legend className="text-sm font-medium text-ink-900">{demoLog.modeLabel}</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {demoLog.modes.map((md) => (
            <label
              key={md}
              className="cursor-pointer rounded-xl border border-ink-950/15 px-3 py-2 text-center text-sm text-ink-800 has-[:checked]:border-kiln-600 has-[:checked]:bg-kiln-500 has-[:checked]:text-ink-950 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-kiln-700"
            >
              <input type="radio" name={`${uid}-mode`} value={md} checked={mode === md} onChange={() => setMode(md)} className="sr-only" />
              {md}
            </label>
          ))}
        </div>
        <label htmlFor={`${uid}-note`} className="mt-4 block text-sm font-medium text-ink-900">
          {demoLog.noteLabel}
        </label>
        <textarea
          id={`${uid}-note`}
          rows={3}
          value={note}
          placeholder={demoLog.notePlaceholder}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1.5 block w-full rounded-xl border border-ink-950/15 bg-white px-3 py-2 text-sm text-ink-950"
        />
      </fieldset>
      {saved ? (
        <div className="mt-4 space-y-3">
          <p
            role="status"
            className="flex items-center gap-2 rounded-xl border border-signal-700/30 bg-signal-700/[0.07] px-3 py-2 text-sm text-signal-700"
          >
            <CircleCheck aria-hidden="true" className="h-4 w-4" />
            {demoLog.saved}
          </p>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-kiln-500 px-4 py-2.5 text-sm font-medium text-ink-950 hover:bg-kiln-400"
          >
            {demoLog.next}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onSave}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-kiln-500 px-4 py-2.5 text-sm font-medium text-ink-950 hover:bg-kiln-400"
        >
          {demoLog.submit}
        </button>
      )}
    </div>
  );
}

const kindStyle = {
  signal: "bg-ink-200 text-ink-800",
  alert: "bg-kiln-500 text-ink-950",
  log: "bg-signal-700 text-white",
};

function StepRootCause() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <div className="card rounded-2xl p-5">
        <p className="font-mono text-xs text-ink-700">{demoRootCause.title}</p>
        <ol className="relative mt-4 space-y-4 pl-6">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[9px] w-px bg-gradient-to-b from-ink-300 via-kiln-500 to-signal-500"
          />
          {demoRootCause.events.map((e) => (
            <li key={e.label} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1 -left-6 h-[18px] w-[18px] rounded-full border-4 border-white",
                  kindStyle[e.kind].split(" ")[0],
                )}
              />
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[0.7rem] text-ink-600">{e.time}</span>
                <span className={cn("rounded px-1.5 py-0.5 font-mono text-[0.6rem] uppercase", kindStyle[e.kind])}>
                  {demoRootCause.kindLabels[e.kind]}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-ink-900">{e.label}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex flex-col gap-4">
        <div className="card rounded-2xl p-5">
          <p className="font-mono text-[0.68rem] tracking-[0.16em] text-ink-600 uppercase">{demoRootCause.draftHeading}</p>
          <dl className="mt-3 space-y-3">
            {demoRootCause.draft.map((d) => (
              <div key={d.label}>
                <dt className="text-xs font-medium text-ink-600">{d.label}</dt>
                <dd className="text-sm text-ink-950">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-2xl border border-signal-700/30 bg-signal-700/[0.06] p-5">
          <p className="flex items-center gap-2 font-display text-lg font-semibold text-signal-700">
            <CircleCheck aria-hidden="true" className="h-5 w-5" />
            {demoRootCause.outcome}
          </p>
          <p className="mt-1 text-xs text-ink-600">{demoRootCause.outcomeNote}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Shell ---------- */

export function DemoDashboard() {
  const [index, setIndex] = useState(0);
  const [assigned, setAssigned] = useState(false);
  const [saved, setSaved] = useState(false);
  const reduce = useReducedMotionSafe();
  const panelRef = useRef<HTMLDivElement>(null);
  const step = demoSteps[index];
  const total = demoSteps.length;

  const go = (i: number) => {
    setIndex(Math.max(0, Math.min(total - 1, i)));
    requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
  };
  const restart = () => {
    setAssigned(false);
    setSaved(false);
    go(0);
  };
  const canAdvance: Record<DemoStepId, boolean> = { trend: true, alert: assigned, log: saved, rootcause: false };

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-ink-950/10 bg-ink-50 shadow-[0_24px_60px_-30px_rgb(16_21_28/0.3)]">
      {/* App chrome */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-950/10 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          </span>
          <span className="ml-2 font-mono text-xs text-ink-700">{siteConfig.productName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[0.65rem] text-ink-600 sm:inline">{demoPage.simulated}</span>
          <IllustrativeTag className="bg-white text-ink-700" />
        </div>
      </div>

      {/* Stepper */}
      <nav aria-label={demoPage.stepsLabel} className="border-b border-ink-950/10 bg-white px-4 py-3">
        <ol className="grid grid-cols-4 gap-2">
          {demoSteps.map((s, i) => {
            const reachable = i <= index;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => reachable && go(i)}
                  disabled={!reachable}
                  aria-current={i === index ? "step" : undefined}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs font-medium sm:text-sm",
                    i === index ? "bg-kiln-200/50 text-ink-950" : reachable ? "text-ink-800 hover:bg-ink-950/[0.04]" : "text-ink-600",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.7rem]",
                      i < index ? "bg-signal-700 text-white" : i === index ? "bg-kiln-500 text-ink-950" : "bg-ink-950/[0.06] text-ink-700",
                    )}
                  >
                    {i < index ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span className="hidden truncate sm:inline">{s.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Panel */}
      <div ref={panelRef} tabIndex={-1} aria-live="polite" className="p-4 outline-none sm:p-6">
        <p className="font-mono text-[0.68rem] tracking-[0.16em] text-kiln-700 uppercase">{demoPage.stepOf(index + 1, total)}</p>
        <h2 className="mt-1 font-display text-2xl font-semibold text-ink-950">{step.title}</h2>
        <p className="mt-1 max-w-2xl text-ink-700">{step.caption}</p>
        <AnimatePresence mode="wait">
          <m.div
            key={step.id}
            initial={reduce ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: 0.22 }}
            className="mt-5"
          >
            {step.id === "trend" && <StepTrend onNext={() => go(1)} />}
            {step.id === "alert" && <StepAlert assigned={assigned} onAssign={() => setAssigned(true)} />}
            {step.id === "log" && <StepLog saved={saved} onSave={() => setSaved(true)} onNext={() => go(3)} />}
            {step.id === "rootcause" && <StepRootCause />}
          </m.div>
        </AnimatePresence>
      </div>

      {/* Footer controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-950/10 bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-800 hover:bg-ink-950/[0.04] disabled:opacity-40"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {demoPage.back}
        </button>
        {index < total - 1 ? (
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={!canAdvance[step.id]}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink-950/15 px-4 py-2 text-sm font-medium text-ink-900 hover:border-ink-950/35 disabled:opacity-40"
          >
            {demoPage.next}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-800 hover:bg-ink-950/[0.04]"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              {demoPage.restart}
            </button>
            <ButtonLink href={demoPage.endCta.href} size="sm">
              {demoPage.endCta.label}
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}
