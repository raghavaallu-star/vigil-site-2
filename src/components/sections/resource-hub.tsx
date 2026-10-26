"use client";

import { AnimatePresence, m } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { resourcesPage } from "@/content/pages";
import type { ResourceMeta, ResourceType } from "@/content/types";
import { cn, formatDate } from "@/lib/utils";

export function ResourceCard({ r }: { r: ResourceMeta }) {
  return (
    <article className="group card card-hover relative flex h-full flex-col rounded-[var(--radius-card)] p-6 transition-shadow hover:shadow-[0_20px_50px_-25px_rgb(16_21_28/0.35)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-kiln-200/50 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider text-kiln-700 uppercase">
          {r.type}
        </span>
        <ArrowUpRight aria-hidden="true" className="h-5 w-5 text-ink-600 transition-colors group-hover:text-kiln-700" />
      </div>
      <h3 className="mt-5 text-xl leading-snug font-semibold text-ink-950">
        <Link href={`/resources/${r.slug}`} className="after:absolute after:inset-0">
          {r.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-ink-700">{r.description}</p>
      <p className="mt-5 font-mono text-xs text-ink-600">
        <time dateTime={r.date}>{formatDate(r.date)}</time> · {r.readingMinutes} {resourcesPage.minRead}
      </p>
    </article>
  );
}

/** Filterable resource list. The active filter lives in the URL (?type=…) so it can be linked from the menu. */
export function ResourceHub({ resources, types }: { resources: ResourceMeta[]; types: ResourceType[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotionSafe();
  const raw = params.get("type");
  const active = types.find((t) => t === raw) ?? null;
  const shown = active ? resources.filter((r) => r.type === active) : resources;

  const setType = (t: ResourceType | null) => {
    const q = t ? `?type=${encodeURIComponent(t)}` : "";
    router.replace(`${pathname}${q}`, { scroll: false });
  };

  const options: { label: string; value: ResourceType | null; count: number }[] = [
    { label: resourcesPage.allLabel, value: null, count: resources.length },
    ...types.map((t) => ({ label: t, value: t, count: resources.filter((r) => r.type === t).length })),
  ];

  return (
    <div>
      <div role="group" aria-label={resourcesPage.filterLabel} className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = active === o.value;
          return (
            <button
              key={o.label}
              type="button"
              aria-pressed={on}
              onClick={() => setType(o.value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-[3px] border px-4 py-2 text-sm font-medium transition-colors",
                on ? "border-kiln-600 bg-kiln-500 text-ink-950" : "border-ink-950/15 bg-white text-ink-800 hover:border-ink-950/40",
              )}
            >
              {o.label}
              <span className={cn("font-mono text-[0.7rem]", on ? "text-kiln-700" : "text-ink-600")}>{o.count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} {active ?? resourcesPage.allLabel}
      </p>

      {shown.length === 0 ? (
        <p className="mt-10 rounded-[var(--radius-card)] border border-dashed border-ink-950/20 p-10 text-center text-ink-600">
          {resourcesPage.empty}
        </p>
      ) : (
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((r) => (
              <m.li
                key={r.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <ResourceCard r={r} />
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
