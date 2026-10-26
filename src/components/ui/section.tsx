import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

type Tone = "dark" | "darker" | "light";

/** Section surfaces: white, warm paper and a deeper paper. Names kept for markup compatibility. */
const toneClasses: Record<Tone, string> = {
  dark: "bg-white text-ink-900",
  darker: "bg-paper-2 text-ink-900",
  light: "on-light bg-paper text-ink-900",
};

export function Section({
  id,
  tone = "dark",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("hairline-top relative scroll-mt-24 py-20 sm:py-24 lg:py-32", toneClasses[tone], className)}
    >
      {children}
    </section>
  );
}

/** Small uppercase section label in the accent colour. */
export function Eyebrow({
  children,
  className,
  as: As = "p",
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
  as?: "p" | "span";
}) {
  return (
    <As className={cn("inline-flex items-center gap-3 text-[0.75rem] font-semibold tracking-[0.16em] text-kiln-700 uppercase", className)}>
      <span aria-hidden="true" className="h-px w-8 bg-kiln-600" />
      {children}
    </As>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  heading,
  body,
  align = "left",
  className,
  as: As = "h2",
}: {
  id?: string;
  eyebrow?: string;
  heading: string;
  body?: string;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className={align === "center" ? "justify-center" : undefined}>{eyebrow}</Eyebrow>}
      <As
        id={id}
        className={cn(
          "mt-6 font-display text-ink-950",
          As === "h1"
            ? "text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl"
            : "text-[2.15rem] leading-[1.1] sm:text-[2.75rem] lg:text-[3.4rem] lg:leading-[1.06]",
        )}
      >
        {heading}
      </As>
      {body && (
        <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed text-ink-700 sm:text-xl", align === "center" && "mx-auto")}>{body}</p>
      )}
    </div>
  );
}
