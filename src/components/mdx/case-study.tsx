import { Quote } from "lucide-react";
import { caseStudyLabels } from "@/content/case-study";
import { cn } from "@/lib/utils";

/* Case-study building blocks for MDX. Every block renders a clear "pending" state when data is missing,
   so a draft can never be mistaken for real results. */

export function Metrics({ items }: { items: { label: string; value?: string | null; note?: string }[] }) {
  return (
    <ul className="not-prose my-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((m) => (
        <li key={m.label} className="card rounded-[var(--radius-card)] p-5">
          <p className={cn("font-display text-3xl", m.value ? "text-ink-950" : "text-ink-400")}>{m.value || "—"}</p>
          <p className="mt-1 text-sm font-medium text-ink-900">{m.label}</p>
          <p className="mt-1 text-xs text-ink-600">{m.value ? m.note : caseStudyLabels.pending}</p>
        </li>
      ))}
    </ul>
  );
}

export function PullQuote({
  quote,
  name,
  title,
  company,
}: {
  quote?: string | null;
  name?: string | null;
  title?: string | null;
  company?: string | null;
}) {
  const ready = Boolean(quote && name);
  return (
    <figure
      className={cn(
        "not-prose my-10 rounded-[var(--radius-card)] border p-7",
        ready ? "border-kiln-600/30 bg-kiln-200/25" : "border-dashed border-ink-950/25 bg-white",
      )}
    >
      <Quote aria-hidden="true" className="h-6 w-6 text-kiln-700" />
      <blockquote className={cn("mt-3 font-display text-xl leading-snug font-medium sm:text-2xl", ready ? "text-ink-950" : "text-ink-600")}>
        {ready ? `“${quote}”` : caseStudyLabels.pendingQuote}
      </blockquote>
      {ready && (
        <figcaption className="mt-4 text-sm text-ink-700">
          <span className="font-semibold text-ink-950">{name}</span>
          {title && `, ${title}`}
          {company && `, ${company}`}
        </figcaption>
      )}
    </figure>
  );
}

type Point = { label: string; before?: number | null; after?: number | null };

/** Grouped before/after bars. Renders a placeholder until every value is filled in. */
export function BeforeAfterChart({
  title,
  unit,
  data,
  lowerIsBetter = true,
}: {
  title: string;
  unit: string;
  data: Point[];
  lowerIsBetter?: boolean;
}) {
  const ready = data.length > 0 && data.every((d) => typeof d.before === "number" && typeof d.after === "number");
  const max = ready ? Math.max(...data.flatMap((d) => [d.before as number, d.after as number]), 1) : 1;
  return (
    <figure className="not-prose card my-8 rounded-[var(--radius-card)] p-5 sm:p-6">
      <figcaption className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-semibold text-ink-950">{title}</span>
        <span className="flex items-center gap-3 font-mono text-[0.68rem] text-ink-600">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-ink-300" />
            {caseStudyLabels.before}
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-kiln-500" />
            {caseStudyLabels.after}
          </span>
          <span>{unit}</span>
        </span>
      </figcaption>
      {ready ? (
        <div
          className="mt-5 flex h-48 items-end gap-4"
          role="img"
          aria-label={`${title}: ${data.map((d) => `${d.label} ${caseStudyLabels.before.toLowerCase()} ${d.before}, ${caseStudyLabels.after.toLowerCase()} ${d.after} ${unit}`).join("; ")}`}
        >
          {data.map((d) => (
            <div key={d.label} className="flex h-full flex-1 flex-col justify-end">
              <div className="flex flex-1 items-end justify-center gap-1.5">
                <div className="w-1/3 max-w-8 rounded-t-md bg-ink-300" style={{ height: `${((d.before as number) / max) * 100}%` }} />
                <div className="w-1/3 max-w-8 rounded-t-md bg-kiln-500" style={{ height: `${((d.after as number) / max) * 100}%` }} />
              </div>
              <p className="mt-2 text-center font-mono text-[0.68rem] text-ink-600">{d.label}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 flex h-48 items-center justify-center rounded-[4px] border border-dashed border-ink-950/20 bg-ink-950/[0.02] px-6 text-center text-sm text-ink-600">
          {caseStudyLabels.pendingChart}
        </div>
      )}
      {ready && (
        <p className="mt-3 text-xs text-ink-600">{lowerIsBetter ? caseStudyLabels.lowerIsBetter : caseStudyLabels.higherIsBetter}</p>
      )}
    </figure>
  );
}

export function CaseFacts({ items }: { items: { label: string; value?: string | null }[] }) {
  return (
    <aside className="not-prose card my-8 rounded-[var(--radius-card)] p-6">
      <p className="text-xs font-semibold tracking-[0.14em] text-ink-600 uppercase">{caseStudyLabels.factsHeading}</p>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((f) => (
          <div key={f.label}>
            <dt className="text-xs font-medium text-ink-600">{f.label}</dt>
            <dd className={cn("text-sm", f.value ? "text-ink-950" : "text-ink-600 italic")}>{f.value || caseStudyLabels.pending}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
