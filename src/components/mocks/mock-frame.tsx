import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function IllustrativeTag({ className }: { className?: string }) {
  return (
    <span
      title={siteConfig.ui.illustrativeTitle}
      className={cn(
        "inline-flex items-center rounded-[2px] border border-ink-950/15 bg-white px-1.5 py-0.5 text-[0.6rem] font-semibold tracking-[0.12em] text-ink-700 uppercase",
        className,
      )}
    >
      {siteConfig.ui.illustrative}
    </span>
  );
}

/** Window chrome shared by every product UI mock. Always carries the Illustrative tag. */
export function MockFrame({
  title,
  children,
  className,
  live = true,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  live?: boolean;
}) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-card)] border border-ink-950/12 bg-white text-ink-900 shadow-[0_18px_40px_-30px_rgb(16_21_28/0.35)]",
        className,
      )}
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-ink-950/[0.08] bg-paper px-4 py-3">
        <span className="flex min-w-0 items-center gap-2">
          {live && <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500" />}
          <span className="truncate font-mono text-[0.72rem] text-ink-700">{title}</span>
        </span>
        <IllustrativeTag />
      </figcaption>
      <div className="@container p-4">{children}</div>
    </figure>
  );
}
