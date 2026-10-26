"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { agents } from "@/content/agents";
import { agentsSection } from "@/content/home";
import { Icon } from "@/components/ui/icon";
import { MockRenderer } from "@/components/mocks/mock-renderer";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/** Agent selector: a vertical list of agents with the selected agent's promise, bullets and UI mock. */
export function AgentExplorer() {
  const [active, setActive] = useState(agents[0].slug);
  const reduce = useReducedMotionSafe();

  return (
    <Tabs.Root value={active} onValueChange={setActive} orientation="vertical" className="mt-12 grid gap-6 lg:grid-cols-[300px_1fr]">
      <Tabs.List
        aria-label={agentsSection.selectLabel}
        className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {agents.map((a) => (
          <Tabs.Trigger
            key={a.slug}
            value={a.slug}
            className="group card card-hover flex shrink-0 items-center gap-3 rounded-[var(--radius-card)] px-4 py-3 text-left transition-colors hover:border-ink-950/25 data-[state=active]:border-kiln-500/70 data-[state=active]:bg-ink-50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-950/[0.04] text-ink-700 group-data-[state=active]:bg-kiln-500 group-data-[state=active]:text-ink-950">
              <Icon name={a.icon} className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium whitespace-nowrap text-ink-800 group-data-[state=active]:text-ink-950">{a.name}</span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {agents.map((a) => (
        <Tabs.Content key={a.slug} value={a.slug}>
          <AnimatePresence mode="wait">
            <m.article
              key={a.slug}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="glass ring-gradient grid gap-8 rounded-[var(--radius-card)] p-6 sm:p-8 xl:grid-cols-[1fr_1.05fr]"
            >
              <div>
                <h3 className="text-2xl font-semibold text-ink-950">{a.name}</h3>
                <p className="mt-2 text-lg text-kiln-700">{a.promise}</p>
                <ul className="mt-5 space-y-2.5">
                  {a.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-ink-700">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-signal-700" />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[0.68rem] font-semibold tracking-[0.14em] text-ink-600 uppercase">{agentsSection.watchesLabel}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {a.signals.slice(0, 4).map((s) => (
                    <li key={s} className="rounded-[3px] border border-ink-950/10 px-2.5 py-1 font-mono text-[0.68rem] text-ink-700">
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/agents/${a.slug}`}
                  className="mt-7 inline-flex items-center gap-1.5 font-medium text-kiln-700 hover:text-kiln-700"
                >
                  {agentsSection.cta}
                  <span className="sr-only">: {a.name}</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
              <MockRenderer kind={a.mock} className="bg-white/60" />
            </m.article>
          </AnimatePresence>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
