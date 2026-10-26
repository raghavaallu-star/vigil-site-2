import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { agents } from "@/content/agents";
import { getIndustry, industries, industryPageLabels as L } from "@/content/industries";
import { modules } from "@/content/modules";
import { PlantMap } from "@/components/diagrams/plant-map";
import { CementTargets, ClosingCta } from "@/components/sections/home-sections";
import { ArtPhoto, PhotoCredit } from "@/components/ui/art-photo";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }) {
  const ind = getIndustry((await params).slug);
  if (!ind) return {};
  return pageMetadata({ ...ind.seo, path: `/industries/${ind.slug}` });
}

export default async function IndustryPage({ params }: { params: Params }) {
  const ind = getIndustry((await params).slug);
  if (!ind) notFound();
  const indAgents = agents.filter((a) => ind.agents.includes(a.slug));
  const indModules = modules.filter((m) => ind.modules.includes(m.slug));
  const others = industries.filter((i) => i.slug !== ind.slug);

  return (
    <>
      {/* Hero: copy left, photograph right */}
      <section aria-labelledby="page-heading" className="border-b border-ink-950/[0.07] bg-white">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <Container className="py-12 sm:py-16 lg:max-w-none lg:py-24 lg:pr-12 lg:pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))]">
            <nav aria-label={siteConfig.ui.breadcrumb} className="mb-10 border-b border-ink-950/10 pb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-600">
                <li>
                  <Link href="/industries" className="hover:text-kiln-700">
                    {L.breadcrumb}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-ink-300">
                  /
                </li>
                <li>
                  <Link href={`/industries/${ind.slug}`} className="hover:text-kiln-700">
                    {ind.name}
                  </Link>
                </li>
              </ol>
            </nav>
            <Eyebrow>{ind.name}</Eyebrow>
            <h1 id="page-heading" className="mt-6 font-display text-[2.6rem] leading-[1.05] text-ink-950 sm:text-6xl lg:text-[4rem]">
              {ind.tagline}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-700 sm:text-xl">{ind.summary}</p>
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <ButtonLink href={siteConfig.ctas.primary.href} size="lg">
                {siteConfig.ctas.primary.label}
              </ButtonLink>
              <ArrowLink href={siteConfig.ctas.assessment.href}>{siteConfig.ctas.assessment.label}</ArrowLink>
            </div>
          </Container>
          <figure className="relative">
            <ArtPhoto
              id={ind.photo}
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[640px]"
            />
            <figcaption className="bg-white px-5 py-2 lg:absolute lg:right-0 lg:bottom-0 lg:max-w-md lg:bg-white/90">
              <PhotoCredit id={ind.photo} />
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Intro and challenges */}
      <Section tone="dark" labelledBy="challenges-heading">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>{L.challengesEyebrow}</Eyebrow>
            <h2 id="challenges-heading" className="mt-6 text-[2.15rem] leading-[1.1] text-ink-950 sm:text-[2.75rem]">
              {L.challengesHeading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-700">{ind.intro}</p>
          </div>
          <ol className="border-t-2 border-ink-950">
            {ind.challenges.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.06} className="grid grid-cols-[3.5rem_1fr] gap-2 border-b border-ink-950/10 py-6">
                <span className="numeral text-3xl text-kiln-700">0{i + 1}</span>
                <div>
                  <h3 className="text-xl text-ink-950">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-700">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Process map */}
      <Section tone="light" labelledBy="areas-heading">
        <Container>
          <SectionHeading id="areas-heading" eyebrow={L.areasEyebrow} heading={ind.areasHeading} />
          <PlantMap light areas={ind.areas} basePath={`/industries/${ind.slug}`} />
        </Container>
      </Section>

      {/* Use cases */}
      <Section tone="dark" labelledBy="usecases-heading">
        <Container>
          <SectionHeading id="usecases-heading" eyebrow={L.useCasesEyebrow} heading={L.useCasesHeading} />
          <ul className="mt-14 grid gap-10 md:grid-cols-2">
            {ind.useCases.map((u, i) => {
              const ag = agents.find((a) => a.slug === u.agent);
              return (
                <Reveal as="li" key={u.title} delay={(i % 2) * 0.06} className="border-t-2 border-ink-950 pt-6">
                  <h3 className="text-2xl text-ink-950">{u.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-700">{u.body}</p>
                  {ag && (
                    <ArrowLink href={`/agents/${ag.slug}`} className="mt-5 text-sm">
                      {ag.name}
                    </ArrowLink>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      {ind.slug === "cement" && <CementTargets />}

      {/* Secondary photo band */}
      <figure className="relative">
        <ArtPhoto id={ind.photoSecondary} sizes="100vw" className="aspect-[4/3] w-full sm:aspect-[21/8]" />
        <figcaption className="bg-white">
          <Container className="py-2">
            <PhotoCredit id={ind.photoSecondary} />
          </Container>
        </figcaption>
      </figure>

      {/* KPIs, considerations, agents, modules */}
      <Section tone="light" labelledBy="kpis-heading">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 id="kpis-heading" className="text-3xl text-ink-950">
              {L.kpisHeading}
            </h2>
            <ul className="mt-6 grid border-t border-ink-950/15 sm:grid-cols-2">
              {ind.kpis.map((k) => (
                <li key={k} className="border-b border-ink-950/10 py-3.5 pr-4 text-ink-900">
                  {k}
                </li>
              ))}
            </ul>
            <h2 className="mt-14 text-3xl text-ink-950">{L.considerationsHeading}</h2>
            <ul className="mt-6 space-y-6">
              {ind.considerations.map((c) => (
                <li key={c.title} className="border-l-2 border-kiln-600 pl-5">
                  <p className="font-semibold text-ink-950">{c.title}</p>
                  <p className="mt-1 text-ink-700">{c.body}</p>
                </li>
              ))}
            </ul>
            {ind.extra && (
              <div className="mt-10 border border-ink-950/10 bg-white p-6">
                <p className="font-display text-xl text-ink-950">{ind.extra.label}</p>
                <p className="mt-2 text-ink-700">{ind.extra.body}</p>
                <ArrowLink href={ind.extra.href} className="mt-4 text-sm">
                  {ind.extra.label}
                </ArrowLink>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-3xl text-ink-950">{L.agentsHeading}</h2>
            <ul className="mt-6 border-t border-ink-950/15">
              {indAgents.map((a) => (
                <li key={a.slug} className="border-b border-ink-950/10">
                  <Link href={`/agents/${a.slug}`} className="group flex items-start gap-4 py-4">
                    <Icon name={a.icon} className="mt-1 h-5 w-5 shrink-0 text-kiln-700" />
                    <span className="flex-1">
                      <span className="block font-medium text-ink-950 group-hover:text-kiln-700">{a.name}</span>
                      <span className="mt-0.5 block text-sm text-ink-600">{a.promise}</span>
                    </span>
                    <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 text-ink-400 group-hover:text-kiln-700" />
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-14 text-3xl text-ink-950">{L.modulesHeading}</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {indModules.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/product/${m.slug}`}
                    className="inline-flex rounded-[3px] border border-ink-950/15 bg-white px-3 py-1.5 text-sm text-ink-900 hover:border-ink-950"
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Other industries */}
      <Section tone="dark" labelledBy="others-heading" className="py-16 sm:py-16 lg:py-20">
        <Container>
          <h2 id="others-heading" className="text-3xl text-ink-950">
            {L.otherIndustries}
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/industries/${o.slug}`} className="group block">
                  <ArtPhoto id={o.photo} crop="mobile" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/3]" />
                  <span className="mt-3 flex items-center justify-between font-display text-xl text-ink-950 group-hover:text-kiln-700">
                    {o.name}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 text-kiln-700 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
