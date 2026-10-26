import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { customers, customersSection } from "@/content/customers";
import { assetClasses } from "@/content/equipment";
import { cementTargets } from "@/content/cement-targets";
import { agentsSection, builtFor, closingCta, domainsSection, insightsSection, outcomes, vision, whyUs } from "@/content/home";
import { industries } from "@/content/industries";
import { resourcesPage } from "@/content/pages";
import { resources } from "@/content/resources";
import { testimonials, testimonialsSection } from "@/content/testimonials";
import { EditorialArt, type ArtVariant } from "@/components/diagrams/editorial-art";
import { ArtPhoto, hasPhoto } from "@/components/ui/art-photo";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { formatDate } from "@/lib/utils";
import { AgentExplorer } from "./agent-explorer";

/** Equipment line shown in place of a logo bar. Swaps to logos once approved customers exist. */
export function TrustStrip() {
  if (customers.length > 0) return <CustomerLogos />;
  return (
    <section aria-label={builtFor.label} className="border-b border-ink-950/[0.07] bg-white">
      <Container className="flex flex-col gap-4 py-7 lg:flex-row lg:items-center lg:gap-10">
        <p className="shrink-0 text-[0.72rem] font-semibold tracking-[0.16em] text-ink-600 uppercase">{builtFor.label}</p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.95rem]">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <Link href={`/industries/${ind.slug}`} className="inline-flex items-center gap-2.5 text-ink-900 hover:text-kiln-700">
                <Icon name={ind.icon} className="h-5 w-5 text-kiln-700" />
                {ind.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function CustomerLogos() {
  return (
    <section aria-label={customersSection.heading} className="border-b border-ink-950/[0.07] bg-white">
      <Container className="py-8">
        <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-ink-600 uppercase">{customersSection.heading}</p>
        <ul className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-6">
          {customers.map((c) => (
            <li key={c.name}>
              <Image src={c.logoSrc} alt={c.name} width={c.logoWidth} height={c.logoHeight} className="h-8 w-auto opacity-70 grayscale" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <Section tone="light" labelledBy="testimonials-heading">
      <Container>
        <SectionHeading id="testimonials-heading" eyebrow={testimonialsSection.eyebrow} heading={testimonialsSection.heading} />
        <ul className="mt-14 grid gap-10 md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="border-l-2 border-kiln-600 pl-6">
                <blockquote className="font-display text-2xl leading-snug text-ink-950">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 text-sm text-ink-600">
                  <span className="font-semibold text-ink-950">{t.name}</span>, {t.title}, {t.company}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function VisionShift() {
  return (
    <Section tone="light" labelledBy="vision-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading id="vision-heading" eyebrow={vision.eyebrow} heading={vision.heading} />
          <ul className="border-t border-ink-950/15">
            {vision.pairs.map((p) => (
              <li key={p.from} className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-4 border-b border-ink-950/10 py-5">
                <span className="text-ink-600 line-through decoration-ink-300">{p.from}</span>
                <span aria-hidden="true" className="text-kiln-700">
                  →
                </span>
                <span className="font-display text-xl text-ink-950">{p.to}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

export function WhyUs() {
  return (
    <Section tone="darker" labelledBy="why-heading">
      <Container>
        <SectionHeading id="why-heading" eyebrow={whyUs.eyebrow} heading={whyUs.heading} />
        <ol className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-10">
          {whyUs.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.08} className="border-t-2 border-ink-950 pt-6">
              <span className="numeral text-5xl text-kiln-700">0{i + 1}</span>
              <h3 className="mt-6 text-2xl leading-snug text-ink-950">{item.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-700">{item.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export function TargetFootnote({ id = "target-footnote" }: { light?: boolean; id?: string }) {
  return (
    <p id={id} className="mt-8 max-w-3xl text-sm text-ink-600">
      <span aria-hidden="true" className="text-kiln-700">
        {siteConfig.ui.targetFootnoteMark}{" "}
      </span>
      {siteConfig.ui.targetFootnote}
    </p>
  );
}

export function Outcomes() {
  return (
    <Section tone="dark" labelledBy="outcomes-heading" id="outcomes">
      <Container>
        <SectionHeading id="outcomes-heading" eyebrow={outcomes.eyebrow} heading={outcomes.heading} body={outcomes.body} />
        <div className="mt-16 grid border-t-2 border-ink-950 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.families.map((f, i) => (
            <Reveal
              key={f.label}
              delay={i * 0.06}
              className="border-b border-ink-950/10 py-8 sm:pr-8 lg:border-r lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:border-r-0"
            >
              <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-kiln-700 uppercase">{f.label}</p>
              <ul className="mt-5 space-y-4">
                {f.items.map((it) => (
                  <li key={it} className="font-display text-2xl leading-snug text-ink-950">
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 flex flex-col gap-3 text-ink-700 sm:flex-row sm:items-center sm:gap-6">
          <span>{outcomes.cementNote}</span>
          <ArrowLink href={outcomes.cementLink.href} className="text-sm">
            {outcomes.cementLink.label}
          </ArrowLink>
        </p>
      </Container>
    </Section>
  );
}

export function CementTargets() {
  return (
    <Section tone="dark" labelledBy="cement-targets-heading" id="cement-targets">
      <Container>
        <SectionHeading
          id="cement-targets-heading"
          eyebrow={cementTargets.eyebrow}
          heading={cementTargets.heading}
          body={cementTargets.body}
        />
        <div className="mt-16 grid border-t-2 border-ink-950 lg:grid-cols-3">
          {cementTargets.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="border-b border-ink-950/10 py-8 lg:border-r lg:border-b-0 lg:px-8 lg:first:pl-0"
            >
              <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-ink-600 uppercase">{s.label}</p>
              <p className="mt-4 text-ink-950">
                <span className="numeral text-7xl sm:text-8xl">{s.value}</span>
                <sup className="ml-1 align-super text-2xl text-kiln-700">
                  <a href="#target-footnote" aria-label={siteConfig.ui.targetFootnoteLink}>
                    {siteConfig.ui.targetFootnoteMark}
                  </a>
                </sup>
              </p>
              <p className="mt-2 text-sm text-ink-600">{s.unit}</p>
              <p className="mt-8 text-[0.72rem] font-semibold tracking-[0.14em] text-ink-600 uppercase">{cementTargets.leversLabel}</p>
              <ul className="mt-3">
                {s.levers.map((l) => (
                  <li key={l.name} className="flex items-center justify-between border-b border-ink-950/[0.08] py-2.5 text-sm">
                    <span className="text-ink-700">{l.name}</span>
                    <span className="font-medium text-ink-950 tabular-nums">{l.value}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
          <Reveal delay={0.16} className="py-8 lg:pl-8">
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-ink-600 uppercase">{cementTargets.reliability.label}</p>
            <ul className="mt-6 space-y-6">
              {cementTargets.reliability.items.map((r) => (
                <li key={r} className="border-l-2 border-kiln-600 pl-4 font-display text-2xl leading-snug text-ink-950">
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <TargetFootnote />
      </Container>
    </Section>
  );
}

export function AgentsGrid({ tone = "dark" }: { tone?: "dark" | "darker" | "light" }) {
  return (
    <Section tone={tone} labelledBy="agents-heading" id="agents">
      <Container>
        <SectionHeading id="agents-heading" eyebrow={agentsSection.eyebrow} heading={agentsSection.heading} body={agentsSection.body} />
        <AgentExplorer />
      </Container>
    </Section>
  );
}

/** Full-bleed plant photo band. Renders nothing until the "home-band" photo is generated. */
export function PhotoBand() {
  if (!hasPhoto("home-band")) return null;
  return (
    <section className="bg-paper">
      <ArtPhoto id="home-band" sizes="100vw" className="aspect-[4/5] w-full sm:aspect-[21/8]" />
    </section>
  );
}

/** Key domains: the five industries Vigil serves, with photographs and their process areas. */
export function KeyDomains() {
  const [lead, ...rest] = industries;
  return (
    <Section tone="dark" labelledBy="domains-heading" id="industries">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="domains-heading"
            eyebrow={domainsSection.eyebrow}
            heading={domainsSection.heading}
            body={domainsSection.body}
          />
          <ArrowLink href={domainsSection.cta.href} className="shrink-0 lg:mb-2">
            {domainsSection.cta.label}
          </ArrowLink>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <DomainCard ind={lead} large />
          <div className="grid gap-10 sm:grid-cols-2">
            {rest.map((ind) => (
              <DomainCard key={ind.slug} ind={ind} />
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-ink-600">
          {domainsSection.photoNote}{" "}
          <Link href={domainsSection.photoLink.href} className="underline underline-offset-2 hover:text-ink-950">
            {domainsSection.photoLink.label}
          </Link>
        </p>

        <p className="mt-16 text-[0.72rem] font-semibold tracking-[0.16em] text-ink-600 uppercase">{domainsSection.classesLabel}</p>
        <ul className="mt-5 grid grid-cols-2 border-t border-l border-ink-950/10 sm:grid-cols-3 lg:grid-cols-9">
          {assetClasses.map((c) => (
            <li key={c.slug} className="flex flex-col items-start gap-3 border-r border-b border-ink-950/10 bg-white p-4">
              <Icon name={c.icon} className="h-5 w-5 text-kiln-700" />
              <span className="text-sm leading-snug font-medium text-ink-950">{c.name}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function DomainCard({ ind, large = false }: { ind: (typeof industries)[number]; large?: boolean }) {
  return (
    <article className="group relative">
      <div className={large ? "aspect-[4/3] overflow-hidden lg:aspect-[4/4.2]" : "aspect-[4/3] overflow-hidden"}>
        <ArtPhoto
          id={ind.photo}
          crop={large ? "auto" : "mobile"}
          sizes={large ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw"}
          className="h-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-5 flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.14em] text-kiln-700 uppercase">
        <Icon name={ind.icon} className="h-4 w-4" />
        {ind.name}
      </p>
      <h3 className={large ? "mt-3 text-3xl leading-tight text-ink-950 sm:text-4xl" : "mt-2 text-xl leading-snug text-ink-950"}>
        <Link
          href={`/industries/${ind.slug}`}
          className="group-hover:underline group-hover:decoration-kiln-600 group-hover:decoration-1 group-hover:underline-offset-4 after:absolute after:inset-0"
        >
          {ind.tagline}
        </Link>
      </h3>
      {large && <p className="mt-4 max-w-xl leading-relaxed text-ink-700">{ind.summary}</p>}
      <p className="mt-3 text-sm text-ink-600">
        {ind.areas.length} {domainsSection.areasLabel.toLowerCase()}
      </p>
    </article>
  );
}

const artCycle: ArtVariant[] = ["contours", "streams", "field", "rings"];

/** Latest resources as editorial cards with generative artwork. */
export function Insights() {
  const items = resources.slice(0, 3);
  if (items.length === 0) return null;
  return (
    <Section tone="light" labelledBy="insights-heading">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="insights-heading" eyebrow={insightsSection.eyebrow} heading={insightsSection.heading} />
          <ArrowLink href={insightsSection.cta.href} className="shrink-0 lg:mb-2">
            {insightsSection.cta.label}
          </ArrowLink>
        </div>
        <ul className="mt-14 grid gap-10 md:grid-cols-3">
          {items.map((r, i) => (
            <li key={r.slug}>
              <article className="group relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <EditorialArt
                    variant={artCycle[i % artCycle.length]}
                    seed={i + 4}
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-5 text-[0.72rem] font-semibold tracking-[0.14em] text-kiln-700 uppercase">{r.type}</p>
                <h3 className="mt-2 text-2xl leading-snug text-ink-950">
                  <Link
                    href={`/resources/${r.slug}`}
                    className="group-hover:underline group-hover:decoration-kiln-600 group-hover:decoration-1 group-hover:underline-offset-4 after:absolute after:inset-0"
                  >
                    {r.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm text-ink-600">
                  <time dateTime={r.date}>{formatDate(r.date)}</time> · {r.readingMinutes} {resourcesPage.minRead}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** Closing band: editorial split with artwork. */
export function ClosingCta({ heading = closingCta.heading, body = closingCta.body }: { heading?: string; body?: string }) {
  return (
    <section aria-labelledby="cta-heading" className="border-t border-ink-950/[0.07] bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[280px] lg:min-h-[480px]">
          <EditorialArt variant="streams" tone="kiln" seed={5} className="absolute inset-0" />
        </div>
        <Container className="flex flex-col justify-center py-16 sm:py-20 lg:max-w-none lg:px-16 lg:py-24">
          <Eyebrow>{siteConfig.tagline}</Eyebrow>
          <h2 id="cta-heading" className="mt-6 max-w-xl font-display text-4xl leading-[1.08] text-ink-950 sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-700">{body}</p>
          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <ButtonLink href={siteConfig.ctas.primary.href} size="lg">
              {siteConfig.ctas.primary.label}
            </ButtonLink>
            <ArrowLink href={siteConfig.ctas.assessment.href}>{siteConfig.ctas.assessment.label}</ArrowLink>
          </div>
        </Container>
      </div>
    </section>
  );
}
