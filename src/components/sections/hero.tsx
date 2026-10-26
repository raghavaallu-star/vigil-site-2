import { siteConfig } from "@/config/site";
import { agents } from "@/content/agents";
import Link from "next/link";
import { industries } from "@/content/industries";
import { hero } from "@/content/home";
import { ArtPhoto } from "@/components/ui/art-photo";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";

/** Photo mosaic layout: automotive tall on the left, the rest stacked. */
const mosaic = [
  { slug: "automotive", span: "row-span-2" },
  { slug: "steel", span: "" },
  { slug: "oil-gas", span: "" },
  { slug: "pharma", span: "" },
  { slug: "cement", span: "" },
];

export function Hero() {
  const proof = [
    { value: String(industries.length), label: hero.proof.areas },
    { value: String(agents.length), label: hero.proof.agents },
    { value: hero.proof.readOnly, label: hero.proof.readOnlyLabel },
  ];
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-ink-950/[0.07] bg-white">
      <div className="grid w-full lg:grid-cols-[1.05fr_0.95fr]">
        <Container className="flex flex-col justify-center py-16 sm:py-20 lg:max-w-none lg:py-28 lg:pr-12 lg:pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))]">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 id="hero-heading" className="mt-7 font-display text-[3rem] leading-[1.02] text-ink-950 sm:text-7xl lg:text-[5.25rem]">
            <span className="block">{hero.headlineLead}</span>
            <span className="block text-kiln-700 italic">{hero.headlineAccent}</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-700 sm:text-xl">{hero.subhead}</p>
          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <ButtonLink href={siteConfig.ctas.primary.href} size="lg">
              {siteConfig.ctas.primary.label}
            </ButtonLink>
            <ArrowLink href={siteConfig.ctas.secondary.href}>{hero.secondaryCta}</ArrowLink>
          </div>
          <dl className="mt-14 grid max-w-xl grid-cols-3 border-t border-ink-950/15">
            {proof.map((p, i) => (
              <div key={p.label} className={i === 0 ? "pt-5 pr-4" : "border-l border-ink-950/10 px-4 pt-5"}>
                <dt className="sr-only">{p.label}</dt>
                <dd className="numeral text-[1.6rem] leading-tight text-ink-950 sm:text-4xl sm:whitespace-nowrap">{p.value}</dd>
                <dd className="mt-1.5 text-xs leading-snug text-ink-600 sm:text-sm">{p.label}</dd>
              </div>
            ))}
          </dl>
        </Container>

        <figure className="relative grid min-h-[480px] grid-cols-2 grid-rows-3 gap-1 bg-white lg:min-h-full">
          {mosaic.map((m) => {
            const ind = industries.find((x) => x.slug === m.slug)!;
            return (
              <Link key={m.slug} href={`/industries/${ind.slug}`} className={`group relative overflow-hidden ${m.span}`}>
                <ArtPhoto
                  id={ind.photo}
                  crop="mobile"
                  priority={m.slug === "steel"}
                  sizes="(min-width: 1024px) 24vw, 50vw"
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-0 left-0 bg-white px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.12em] text-ink-950 uppercase">
                  {ind.short}
                </span>
              </Link>
            );
          })}
          <figcaption className="absolute top-2 right-2 bg-white/90 px-2 py-1 text-[0.65rem] text-ink-700">
            <Link href="/credits" className="underline underline-offset-2 hover:text-ink-950">
              {hero.photoCredit}
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
