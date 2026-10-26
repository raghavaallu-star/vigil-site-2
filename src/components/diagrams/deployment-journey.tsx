"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, m } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { deploymentSteps } from "@/content/deployment";
import { deploymentLabels } from "@/content/pages";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Interactive stepper for the generic deployment method. Any area can be the starting point. */
export function DeploymentJourney({ light = false }: { light?: boolean }) {
  const [active, setActive] = useState(deploymentSteps[0].id);
  const reduce = useReducedMotionSafe();
  const index = deploymentSteps.findIndex((s) => s.id === active);

  return (
    <Tabs.Root value={active} onValueChange={setActive} className={cn("mt-12", light ? "text-ink-900" : "text-ink-900")}>
      <div className="relative">
        <div
          aria-hidden="true"
          className={cn("absolute top-5 right-[8%] left-[8%] hidden h-0.5 rounded-full sm:block", light ? "bg-white/10" : "bg-ink-950/10")}
        >
          <m.div
            className="h-full rounded-full bg-gradient-to-r from-signal-400 via-kiln-500 to-kiln-400"
            animate={{ width: `${(index / (deploymentSteps.length - 1)) * 100}%` }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 0.8, 0.3, 1] }}
          />
        </div>
        <Tabs.List aria-label={deploymentLabels.stepsLabel} className="relative grid grid-cols-3 gap-y-4 sm:grid-cols-6">
          {deploymentSteps.map((s, i) => (
            <Tabs.Trigger key={s.id} value={s.id} className="group flex flex-col items-center gap-2 rounded-[4px] px-1 py-1 text-center">
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-sm font-semibold transition-colors",
                  i <= index
                    ? "border-kiln-500 bg-kiln-500 text-ink-950"
                    : light
                      ? "border-ink-950/20 bg-paper text-ink-700"
                      : "border-ink-950/20 bg-white text-ink-700",
                )}
              >
                {i + 1}
              </span>
              <span className={cn("text-sm font-semibold", light ? "text-ink-900" : "text-ink-900")}>{s.label}</span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>

      {deploymentSteps.map((s) => (
        <Tabs.Content key={s.id} value={s.id} className="mt-8">
          <AnimatePresence mode="wait">
            <m.div
              key={s.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "grid gap-8 rounded-[var(--radius-card)] border p-6 sm:p-8 lg:grid-cols-[1fr_1fr_0.8fr]",
                light ? "border-ink-950/10 bg-white" : "border-ink-950/10 bg-white",
              )}
            >
              <div>
                <p className={cn("text-xs font-semibold tracking-[0.14em] uppercase", light ? "text-kiln-700" : "text-kiln-700")}>
                  {s.label}
                </p>
                <p className="mt-2 font-display text-2xl">{s.heading}</p>
                <p className={cn("mt-3 leading-relaxed", light ? "text-ink-700" : "text-ink-700")}>{s.body}</p>
              </div>
              <div>
                <p className={cn("text-[0.68rem] font-semibold tracking-[0.14em] uppercase", light ? "text-ink-600" : "text-ink-600")}>
                  {deploymentLabels.activities}
                </p>
                <ul className="mt-3 space-y-2">
                  {s.activities.map((a) => (
                    <li key={a} className={cn("flex gap-2.5 rounded-[4px] px-3 py-2 text-sm", light ? "bg-paper" : "bg-ink-950/[0.03]")}>
                      <Check aria-hidden="true" className={cn("mt-0.5 h-4 w-4 shrink-0", light ? "text-signal-700" : "text-signal-700")} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={cn("text-[0.68rem] font-semibold tracking-[0.14em] uppercase", light ? "text-ink-600" : "text-ink-600")}>
                  {deploymentLabels.outputs}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.outputs.map((o) => (
                    <li
                      key={o}
                      className={cn(
                        "rounded-[3px] border px-3 py-1.5 text-sm",
                        light ? "border-kiln-700/30 bg-kiln-200/30 text-kiln-800" : "border-kiln-500/30 bg-kiln-500/10 text-kiln-800",
                      )}
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </m.div>
          </AnimatePresence>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
