import { ArrowRight, Check, Quote } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { agents } from "@/content/agents";
import { industries } from "@/content/industries";
import { getModule, modules } from "@/content/modules";
import { modulePageLabels } from "@/content/pages";
import { MockRenderer } from "@/components/mocks/mock-renderer";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/home-sections";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }) {
  const m = getModule((await params).slug);
  if (!m) return {};
  return pageMetadata({ ...m.seo, path: `/product/${m.slug}` });
}

export default async function ModulePage({ params }: { params: Params }) {
  const m = getModule((await params).slug);
  if (!m) notFound();
  const related = agents.filter((a) => m.relatedAgents.includes(a.slug));
  const others = modules.filter((x) => x.slug !== m.slug);
  const areas = industries.flatMap((ind) =>
    ind.areas
      .filter((a) => a.modules.includes(m.slug))
      .map((a) => ({ ...a, href: `/industries/${ind.slug}/${a.slug}`, industry: ind.short })),
  );

  return (
    <>
      <PageHero
        eyebrow={m.short}
        heading={m.tagline}
        body={m.summary}
        crumbs={[
          { label: modulePageLabels.breadcrumb, href: "/product" },
          { label: m.name, href: `/product/${m.slug}` },
        ]}
        aside={<MockRenderer kind={m.mocks[0]} />}
      >
        <p className="mt-6 inline-flex items-center gap-2 rounded-[3px] border border-ink-950/10 bg-ink-950/[0.04] px-3 py-1 font-mono text-xs text-ink-700">
          <Icon name={m.icon} className="h-4 w-4 text-kiln-700" />
          {modulePageLabels.categoryNote[m.category]}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={siteConfig.ctas.primary.href} size="lg">
            {siteConfig.ctas.primary.label}
          </ButtonLink>
          <ButtonLink href={siteConfig.ctas.assessment.href} variant="secondary" size="lg">
            {siteConfig.ctas.assessment.label}
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="light" labelledBy="problem-heading">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow light>{modulePageLabels.problemEyebrow}</Eyebrow>
            <h2 id="problem-heading" className="mt-4 text-3xl font-semibold text-ink-950 sm:text-4xl">
              {m.problem.heading}
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-ink-700">{m.problem.body}</p>
            {m.pullQuote && (
              <blockquote className="mt-8 flex gap-3 border-l-2 border-kiln-700 pl-5 font-display text-2xl font-medium text-ink-950">
                <Quote aria-hidden="true" className="h-5 w-5 shrink-0 text-kiln-700" />
                {m.pullQuote}
              </blockquote>
            )}
          </div>
        </Container>
      </Section>

      <Section tone="dark" labelledBy="features-heading">
        <Container>
          <Eyebrow>{modulePageLabels.featuresEyebrow}</Eyebrow>
          <h2 id="features-heading" className="mt-4 max-w-3xl text-3xl font-semibold text-ink-950 sm:text-4xl">
            {m.name}
          </h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <ul className="grid gap-4 sm:grid-cols-2">
              {m.features.map((f, i) => (
                <Reveal as="li" key={f.title} delay={(i % 2) * 0.05} className="card rounded-[var(--radius-card)] p-5">
                  <p className="font-semibold text-ink-950">{f.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">{f.body}</p>
                </Reveal>
              ))}
            </ul>
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              {m.mocks.slice(1).map((k) => (
                <MockRenderer key={k} kind={k} />
              ))}
              {m.kpis && (
                <div className="card rounded-[var(--radius-card)] p-5">
                  <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-kiln-700 uppercase">{m.kpis.heading}</p>
                  <ul className="mt-3 space-y-2">
                    {m.kpis.items.map((k) => (
                      <li key={k} className="flex gap-2.5 text-ink-800">
                        <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-signal-700" />
                        {k}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {m.focusEquipment && (
                <div className="card rounded-[var(--radius-card)] p-5">
                  <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-kiln-700 uppercase">
                    {modulePageLabels.focusEquipment}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {m.focusEquipment.map((e) => (
                      <li key={e} className="rounded-[3px] border border-ink-950/10 px-3 py-1 text-sm text-ink-800">
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {m.path && (
        <Section tone="darker" labelledBy="path-heading">
          <Container>
            <h2 id="path-heading" className="text-3xl font-semibold text-ink-950 sm:text-4xl">
              {m.path.heading}
            </h2>
            <ol className="mt-12 grid gap-3" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))` }}>
              {m.path.steps.map((s, i) => (
                <Reveal as="li" key={s.label} delay={i * 0.07} className="card relative rounded-[var(--radius-card)] p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kiln-500 font-mono text-sm font-semibold text-ink-950">
                      {i + 1}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-kiln-500/60 to-transparent" aria-hidden="true" />
                  </div>
                  <p className="mt-4 font-display text-lg text-ink-950">{s.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </Container>
        </Section>
      )}

      {areas.length > 0 && (
        <Section tone={m.path ? "dark" : "darker"} labelledBy="areas-heading" className="py-16 sm:py-16 lg:py-20">
          <Container>
            <h2 id="areas-heading" className="text-2xl font-semibold text-ink-950">
              {modulePageLabels.areasHeading}
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {areas.map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    className="card card-hover inline-flex items-center gap-2 rounded-[3px] px-4 py-2 text-sm text-ink-900 hover:border-kiln-500/50"
                  >
                    <Icon name={a.icon} className="h-4 w-4 text-kiln-700" />
                    <span className="text-ink-600">{a.industry}</span>
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section tone="light" labelledBy="agents-heading">
          <Container>
            <h2 id="agents-heading">
              <Eyebrow light as="span">
                {modulePageLabels.agentsEyebrow}
              </Eyebrow>
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {related.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/agents/${a.slug}`}
                    className="group card card-hover flex h-full gap-4 rounded-[var(--radius-card)] p-6 hover:border-kiln-700/40"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-start text-kiln-700">
                      <Icon name={a.icon} className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-display text-xl text-ink-950">{a.name}</span>
                      <span className="mt-1 block text-ink-700">{a.promise}</span>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-kiln-700">
                        {siteConfig.ui.readMore}
                        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section tone="dark" labelledBy="others-heading" className="py-16 sm:py-16 lg:py-20">
        <Container>
          <h2 id="others-heading" className="text-2xl font-semibold text-ink-950">
            {modulePageLabels.otherModules}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/product/${o.slug}`}
                  className="group card card-hover flex items-center gap-3 rounded-[4px] px-4 py-3.5 hover:border-kiln-500/40"
                >
                  <Icon name={o.icon} className="h-5 w-5 text-kiln-700" />
                  <span className="flex-1 text-ink-900">{o.name}</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 text-ink-600 group-hover:text-kiln-700" />
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
