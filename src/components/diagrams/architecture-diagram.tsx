"use client";

import { m, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { RotateCcw } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { architectureCopy, architectureLayers, type ArchitectureLayer } from "@/content/architecture";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const toneStyles: Record<ArchitectureLayer["tone"], { ring: string; icon: string; chip: string; glow: string }> = {
  base: {
    ring: "border-ink-950/25",
    icon: "bg-paper text-ink-900",
    chip: "border-ink-300/30 text-ink-800",
    glow: "",
  },
  data: {
    ring: "border-ink-950/25",
    icon: "bg-paper text-signal-700",
    chip: "border-signal-400/40 text-signal-700",
    glow: "",
  },
  intel: {
    ring: "border-ink-950/25",
    icon: "bg-paper text-kiln-700",
    chip: "border-kiln-400/40 text-kiln-800",
    glow: "",
  },
  result: {
    ring: "border-kiln-600 border-l-4",
    icon: "bg-kiln-700 text-white",
    chip: "border-kiln-300/50 bg-kiln-500/10 text-kiln-800",
    glow: "",
  },
};

/** Flowing data particles between two layers. */
function Connector({ active, reduce }: { active: boolean; reduce: boolean }) {
  return (
    <div aria-hidden="true" className="relative mx-auto h-10 w-full max-w-[640px]">
      {[0.2, 0.5, 0.8].map((x) => (
        <div key={x} className="absolute inset-y-0" style={{ left: `${x * 100}%` }}>
          <div className={cn("h-full w-px transition-colors duration-500", active ? "bg-kiln-500/50" : "bg-ink-950/10")} />
          {active && !reduce && (
            <m.span
              className="absolute -left-[3px] h-1.5 w-1.5 rounded-full bg-kiln-600"
              initial={{ top: "100%", opacity: 0 }}
              animate={{ top: ["100%", "0%"], opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: x, ease: "easeInOut" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Signature diagram: the platform layers light up from the plant floor to
 * business results. Replayable; static and fully lit for reduced motion.
 */
export function ArchitectureDiagram({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotionSafe();
  const [lit, setLit] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) {
      setLit(architectureLayers.length);
      return;
    }
    if (!inView) return;
    setLit(0);
    const timers = architectureLayers.map((_, i) => setTimeout(() => setLit(i + 1), 150 + i * 380));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce, run]);

  const topDown = [...architectureLayers].reverse();

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="relative" role="list" aria-label={architectureCopy.label}>
        {topDown.map((layer, i) => {
          const on = lit >= layer.index;
          const s = toneStyles[layer.tone];
          const below = topDown[i + 1];
          return (
            <Fragment key={layer.id}>
              <m.div
                role="listitem"
                animate={{ opacity: on ? 1 : 0.35, scale: on ? 1 : 0.985 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
                className={cn(
                  "relative rounded-[var(--radius-card)] border bg-white p-4 transition-[border-color,box-shadow] duration-500 sm:p-5",
                  on ? cn(s.ring, s.glow) : "border-ink-950/10",
                )}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3 sm:w-[44%]">
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] transition-colors",
                        on ? s.icon : "bg-ink-950/[0.04] text-ink-600",
                      )}
                    >
                      <Icon name={layer.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-ink-600 uppercase">L{layer.index}</p>
                      <p className="font-display text-lg leading-tight text-ink-950">{layer.name}</p>
                      <p className="mt-0.5 text-sm text-ink-600">{layer.body}</p>
                    </div>
                  </div>
                  <ul className="flex flex-1 flex-wrap gap-2 sm:justify-end">
                    {layer.items.map((it) => (
                      <li
                        key={it}
                        className={cn(
                          "rounded-[3px] border px-3 py-1 font-mono text-[0.72rem] transition-colors",
                          on ? s.chip : "border-ink-950/10 text-ink-600",
                        )}
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </m.div>
              {below && <Connector active={lit >= layer.index} reduce={reduce} />}
            </Fragment>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs text-ink-600">{architectureCopy.flowNote}</p>
        {!reduce && (
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="inline-flex items-center gap-1.5 rounded-[3px] border border-ink-950/10 px-3 py-1.5 text-xs text-ink-700 hover:border-ink-950/25 hover:text-ink-950"
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            {architectureCopy.replay}
          </button>
        )}
      </div>
    </div>
  );
}
