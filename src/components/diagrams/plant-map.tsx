"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { agents } from "@/content/agents";
import { areaPageLabels, equipmentPage, plantAreas } from "@/content/equipment";
import type { PlantArea } from "@/content/types";
import { Icon } from "@/components/ui/icon";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Interactive process map of the whole plant, quarry to dispatch.
 * Each area is a tab; the panel below shows its equipment, failures and agents.
 */
export function PlantMap({
  light = false,
  areas = plantAreas,
  basePath = "/industries/cement",
  initial,
}: {
  light?: boolean;
  areas?: PlantArea[];
  basePath?: string;
  initial?: string;
}) {
  const [active, setActive] = useState(initial ?? areas[areas.length > 6 ? 5 : 0].slug);
  const reduce = useReducedMotionSafe();

  return (
    <Tabs.Root value={active} onValueChange={setActive} className="mt-12">
      <div className="relative">
        {/* Flow line behind the nodes */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute top-[38px] right-6 left-6 hidden h-px lg:block",
            light
              ? "bg-gradient-to-r from-ink-950/10 via-kiln-700/50 to-ink-950/10"
              : "bg-gradient-to-r from-ink-950/5 via-kiln-500/60 to-ink-950/5",
          )}
        />
        <Tabs.List
          aria-label={equipmentPage.mapHeading}
          className={cn(
            "relative grid grid-cols-3 gap-2",
            areas.length > 6 ? "sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12" : "sm:grid-cols-5",
          )}
        >
          {areas.map((a) => (
            <Tabs.Trigger
              key={a.slug}
              value={a.slug}
              className={cn(
                "group flex flex-col items-center gap-2 rounded-[var(--radius-card)] border px-1.5 py-3 text-center transition-colors",
                light
                  ? "border-ink-950/10 bg-white hover:border-ink-950/30 data-[state=active]:border-kiln-600 data-[state=active]:bg-kiln-200/40"
                  : "border-ink-950/10 bg-white hover:border-ink-950/25 data-[state=active]:border-kiln-500/70 data-[state=active]:bg-ink-50",
              )}
            >
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-[4px] transition-colors",
                  light
                    ? "bg-paper text-ink-700 group-data-[state=active]:bg-kiln-500 group-data-[state=active]:text-ink-950"
                    : "bg-ink-950/[0.04] text-ink-700 group-data-[state=active]:bg-kiln-500 group-data-[state=active]:text-ink-950",
                )}
              >
                <Icon name={a.icon} className="h-6 w-6" />
              </span>
              <span
                className={cn("font-mono text-[0.6rem]", light ? "text-ink-600 group-data-[state=active]:text-kiln-700" : "text-ink-600")}
              >
                {String(a.step).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "text-[0.72rem] leading-tight font-medium",
                  light ? "text-ink-900 group-data-[state=active]:text-ink-950" : "text-ink-800 group-data-[state=active]:text-ink-950",
                )}
              >
                {a.short}
              </span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>

      {areas.map((a) => (
        <Tabs.Content key={a.slug} value={a.slug} className="mt-6">
          <AnimatePresence mode="wait">
            <m.div
              key={a.slug}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "grid gap-8 rounded-[var(--radius-card)] border p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr]",
                light ? "border-ink-950/10 bg-white" : "border-ink-950/10 bg-white",
              )}
            >
              <div>
                <p className={cn("text-xs font-semibold tracking-[0.14em] uppercase", light ? "text-kiln-700" : "text-kiln-700")}>
                  {areaPageLabels.step} {String(a.step).padStart(2, "0")}
                </p>
                <h3 className={cn("mt-2 text-2xl font-semibold sm:text-3xl", light ? "text-ink-950" : "text-ink-950")}>{a.name}</h3>
                <p className={cn("mt-3 leading-relaxed", light ? "text-ink-700" : "text-ink-700")}>{a.summary}</p>
                <p className={cn("mt-6 text-[0.68rem] font-semibold tracking-[0.14em] uppercase", light ? "text-ink-600" : "text-ink-600")}>
                  {areaPageLabels.agentsHeading}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {a.agents.map((slug) => {
                    const ag = agents.find((x) => x.slug === slug);
                    if (!ag) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/agents/${ag.slug}`}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-[3px] border px-3 py-1 text-sm",
                            light
                              ? "border-ink-950/15 text-ink-800 hover:border-kiln-700"
                              : "border-kiln-500/30 text-kiln-800 hover:border-kiln-400",
                          )}
                        >
                          <Icon name={ag.icon} className={cn("h-4 w-4", light ? "text-kiln-700" : "text-kiln-700")} />
                          {ag.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href={`${basePath}/${a.slug}`}
                  className={cn(
                    "mt-7 inline-flex items-center gap-1.5 font-medium",
                    light ? "text-kiln-700 hover:text-kiln-800" : "text-kiln-700 hover:text-kiln-700",
                  )}
                >
                  {areaPageLabels.explore} {a.name}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className={cn("text-[0.68rem] font-semibold tracking-[0.14em] uppercase", light ? "text-ink-600" : "text-ink-600")}>
                    {areaPageLabels.assetsHeading}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {a.assets.map((as) => (
                      <li
                        key={as.name}
                        className={cn(
                          "rounded-[4px] px-3 py-2 text-sm",
                          light ? "bg-paper text-ink-900" : "bg-ink-950/[0.03] text-ink-900",
                        )}
                      >
                        {as.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p
                    className={cn("text-[0.68rem] font-semibold tracking-[0.14em] uppercase", light ? "text-alarm-700" : "text-alarm-700")}
                  >
                    {areaPageLabels.failuresHeading}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {a.failureModes.map((f) => (
                      <li
                        key={f}
                        className={cn(
                          "rounded-[3px] border px-2.5 py-1 text-xs",
                          light ? "border-ink-950/15 text-ink-800" : "border-ink-950/10 text-ink-800",
                        )}
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
