import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { agents, getAgent } from "@/content/agents";
import { modules } from "@/content/modules";
import { agentPageLabels } from "@/content/pages";
import { MockRenderer } from "@/components/mocks/mock-renderer";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/home-sections";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }) {
  const a = getAgent((await params).slug);
  if (!a) return {};
  return pageMetadata({ ...a.seo, path: `/agents/${a.slug}` });
}

export default async function AgentPage({ params }: { params: Params }) {
  const a = getAgent((await params).slug);
  if (!a) notFound();
  const built = modules.filter((m) => a.relatedModules.includes(m.slug));
  const others = agents.filter((x) => x.slug !== a.slug);

  return (
    <>
      <PageHero
        eyebrow={a.name}
        heading={a.promise}
        crumbs={[
          { label: agentPageLabels.breadcrumb, href: "/#agents" },
          { label: a.name, href: `/agents/${a.slug}` },
        ]}
        aside={<MockRenderer kind={a.mock} />}
      >
        <ul className="mt-8 space-y-3">
          {a.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-lg text-ink-800">
              <Check aria-hidden="true" className="mt-1.5 h-5 w-5 shrink-0 text-signal-700" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={siteConfig.ctas.primary.href} size="lg">
            {siteConfig.ctas.primary.label}
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="light" labelledBy="how-heading">
        <Container>
          <h2 id="how-heading" className="text-3xl font-semibold text-ink-950 sm:text-4xl">
            {agentPageLabels.howHeading}
          </h2>
          <p className="mt-3 text-lg text-ink-700">{agentPageLabels.humanNote}</p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {a.howItWorks.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.07} className="card rounded-[var(--radius-card)] p-6">
                <span className="font-mono text-xs text-kiln-700">0{i + 1}</span>
                <p className="mt-3 font-display text-xl text-ink-950">{s.title}</p>
                <p className="mt-2 text-ink-700">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="dark" labelledBy="signals-heading">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="card rounded-[var(--radius-card)] p-7">
            <h2 id="signals-heading" className="text-2xl font-semibold text-ink-950">
              {agentPageLabels.signalsHeading}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {a.signals.map((s) => (
                <li key={s} className="flex items-center gap-3 rounded-lg bg-ink-950/[0.03] px-3 py-2.5 font-mono text-sm text-ink-800">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal-400" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="card rounded-[var(--radius-card)] p-7">
            <h2 className="text-2xl font-semibold text-ink-950">{agentPageLabels.outputsHeading}</h2>
            <ul className="mt-5 space-y-2.5">
              {a.outputs.map((o) => (
                <li key={o} className="flex items-center gap-3 rounded-lg bg-ink-950/[0.03] px-3 py-2.5 text-ink-800">
                  <Check aria-hidden="true" className="h-4 w-4 text-kiln-700" />
                  {o}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.68rem] font-semibold tracking-[0.14em] text-ink-600 uppercase">{agentPageLabels.modulesHeading}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {built.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/product/${m.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-[3px] border border-ink-950/10 px-3 py-1.5 text-sm text-ink-800 hover:border-kiln-500/50 hover:text-ink-950"
                  >
                    <Icon name={m.icon} className="h-4 w-4 text-kiln-700" />
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="darker" labelledBy="other-agents" className="py-16 sm:py-16 lg:py-20">
        <Container>
          <h2 id="other-agents" className="text-2xl font-semibold text-ink-950">
            {agentPageLabels.otherAgents}
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/agents/${o.slug}`}
                  className="group card card-hover flex h-full flex-col rounded-[var(--radius-card)] p-5 hover:border-kiln-500/40"
                >
                  <Icon name={o.icon} className="h-6 w-6 text-kiln-700" />
                  <span className="mt-3 font-display text-lg text-ink-950">{o.name}</span>
                  <span className="mt-1 flex-1 text-sm text-ink-700">{o.promise}</span>
                  <ArrowRight aria-hidden="true" className="mt-3 h-4 w-4 text-ink-600 group-hover:text-kiln-700" />
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
