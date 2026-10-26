"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, m } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { agents } from "@/content/agents";
import { gapSection, gapTabs } from "@/content/home";
import { modules } from "@/content/modules";
import { Icon } from "@/components/ui/icon";
import { MockRenderer } from "@/components/mocks/mock-renderer";

export function GapExplorer() {
  const [active, setActive] = useState(gapTabs[0].id);
  const reduce = useReducedMotionSafe();

  return (
    <Tabs.Root value={active} onValueChange={setActive} className="mt-12">
      <Tabs.List aria-label={gapSection.heading} className="flex [scrollbar-width:none] gap-8 overflow-x-auto border-b border-ink-950/15">
        {gapTabs.map((tab, i) => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            className="relative shrink-0 pb-4 text-[0.95rem] font-medium text-ink-600 transition-colors hover:text-ink-950 data-[state=active]:text-ink-950"
          >
            {active === tab.id && (
              <m.span
                layoutId="gap-pill"
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-px h-[2px] bg-kiln-600"
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <span className="numeral text-base text-kiln-700">0{i + 1}</span>
              {tab.label}
            </span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {gapTabs.map((tab) => (
        <Tabs.Content key={tab.id} value={tab.id} className="mt-8 focus-visible:outline-offset-8">
          <AnimatePresence mode="wait">
            <m.div
              key={tab.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12"
            >
              <div>
                <h3 className="text-3xl leading-tight text-ink-950 sm:text-[2.25rem]">{tab.heading}</h3>
                <div className="mt-8 space-y-6">
                  <div className="border-l-2 border-ink-950 pl-5">
                    <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-ink-600 uppercase">{gapSection.gapLabel}</p>
                    <p className="mt-2 leading-relaxed text-ink-800">{tab.gap}</p>
                  </div>
                  <div className="border-l-2 border-kiln-600 pl-5">
                    <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-kiln-700 uppercase">{gapSection.closesLabel}</p>
                    <p className="mt-2 leading-relaxed text-ink-800">{tab.closesWith}</p>
                  </div>
                </div>
                <p className="mt-7 text-[0.68rem] font-semibold tracking-[0.14em] text-ink-600 uppercase">{gapSection.agentsLabel}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {tab.agents.map((slug) => {
                    const a = agents.find((x) => x.slug === slug);
                    if (!a) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/agents/${a.slug}`}
                          className="inline-flex items-center gap-2 rounded-[3px] border border-ink-950/15 bg-white px-3 py-1.5 text-sm text-ink-900 hover:border-ink-950"
                        >
                          <Icon name={a.icon} className="h-4 w-4 text-kiln-700" />
                          {a.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-6 text-[0.68rem] font-semibold tracking-[0.14em] text-ink-600 uppercase">{gapSection.modulesLabel}</p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {tab.modules.map((slug) => {
                    const mod = modules.find((x) => x.slug === slug);
                    if (!mod) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/product/${mod.slug}`}
                          className="group inline-flex items-center gap-1.5 text-sm text-ink-800 hover:text-ink-950"
                        >
                          {mod.name}
                          <ArrowRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-kiln-700 transition-transform group-hover:translate-x-0.5"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="relative">
                <MockRenderer kind={tab.mock} className="relative" />
              </div>
            </m.div>
          </AnimatePresence>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
