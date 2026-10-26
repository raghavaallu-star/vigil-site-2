import Link from "next/link";
import { siteConfig } from "@/config/site";
import { EditorialArt, type ArtVariant } from "@/components/diagrams/editorial-art";
import { Container, Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const variants: ArtVariant[] = ["contours", "streams", "field", "rings"];

/** Stable art choice per heading so each page gets its own composition. */
function artFor(heading: string) {
  let h = 0;
  for (const ch of heading) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return { variant: variants[h % variants.length], seed: (h % 50) + 1 };
}

export function PageHero({
  eyebrow,
  heading,
  body,
  crumbs,
  children,
  aside,
  className,
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  crumbs?: { label: string; href: string }[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  const art = artFor(heading);
  return (
    <section aria-labelledby="page-heading" className={cn("relative overflow-hidden border-b border-ink-950/[0.07] bg-white", className)}>
      <div className={cn("grid", aside ? "" : "lg:grid-cols-[1fr_minmax(0,30%)]")}>
        <Container
          className={cn(
            "pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pb-24",
            aside
              ? "grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
              : "lg:max-w-none lg:pr-12 lg:pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))]",
          )}
        >
          <div>
            {crumbs && crumbs.length > 0 && (
              <nav aria-label={siteConfig.ui.breadcrumb} className="mb-10 border-b border-ink-950/10 pb-4">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-600">
                  {crumbs.map((c, i) => (
                    <li key={c.href} className="flex items-center gap-2">
                      {i > 0 && (
                        <span aria-hidden="true" className="text-ink-300">
                          /
                        </span>
                      )}
                      <Link href={c.href} className="hover:text-kiln-700">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1
              id="page-heading"
              className="mt-6 max-w-4xl font-display text-[2.6rem] leading-[1.05] text-ink-950 sm:text-6xl lg:text-[4.25rem]"
            >
              {heading}
            </h1>
            {body && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-700 sm:text-xl">{body}</p>}
            {children}
          </div>
          {aside}
        </Container>
        {!aside && (
          <div className="relative hidden lg:block">
            <EditorialArt variant={art.variant} seed={art.seed} className="absolute inset-0" />
          </div>
        )}
      </div>
    </section>
  );
}
