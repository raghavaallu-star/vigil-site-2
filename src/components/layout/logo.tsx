import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The Vigil mark: a faceted "V" in navy and slate with an orange sensor node in
 * its notch, the sentinel that is always watching. Flat by design so it holds
 * up at any size and in print. `variant="tile"` places it on a navy square for
 * app icons; `animated` gives the node a slow pulse (off for reduced motion).
 */
export function LogoMark({
  className,
  animated = false,
  variant = "plain",
}: {
  className?: string;
  animated?: boolean;
  variant?: "plain" | "tile" | "inverted";
}) {
  const tile = variant === "tile";
  const inverted = variant === "inverted";
  return (
    <svg viewBox="0 0 48 48" className={cn("h-8 w-8", className)} aria-hidden="true">
      {tile && <rect width="48" height="48" rx="6" fill="#0f1a26" />}
      {tile ? (
        <>
          <path d="M9 12h7.5L24 27v11Z" fill="#fff" />
          <path d="M39 12h-7.5L24 27v11Z" fill="#c9d1db" />
        </>
      ) : (
        <>
          <path d="M6 9h9l9 18v13Z" fill={inverted ? "#ffffff" : "#0f1a26"} />
          <path d="M42 9h-9l-9 18v13Z" fill={inverted ? "#c9d1db" : "#3b4a5c"} />
        </>
      )}
      <circle
        cx="24"
        cy={tile ? 15 : 12.5}
        r={tile ? 3.4 : 4}
        fill="#e8641c"
        className={animated ? "animate-node-pulse" : undefined}
        style={{ transformOrigin: tile ? "24px 15px" : "24px 12.5px" }}
      />
    </svg>
  );
}

/** Wordmark: "Vigil" with an orange node standing in for the dot, then "AI". */
export function Wordmark({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-sans text-[1.3rem] font-semibold tracking-[-0.03em]",
        inverted ? "text-white" : "text-ink-950",
        className,
      )}
    >
      Vigil
      <span aria-hidden="true" className="mx-[0.08em] inline-block h-[0.22em] w-[0.22em] rounded-full bg-[#e8641c]" />
      <span className="sr-only">.</span>
      AI
    </span>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2", className)}>
      <LogoMark variant={inverted ? "inverted" : "plain"} />
      <Wordmark inverted={inverted} />
      <span className="sr-only">{siteConfig.ui.homeSuffix}</span>
    </Link>
  );
}
