import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { capabilityStages, startingPoints } from "@/content/deployment";
import { approachPage } from "@/content/pages";
import { risks, risksIntro } from "@/content/risks";
import { DeploymentJourney } from "@/components/diagrams/deployment-journey";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/home-sections";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...approachPage.seo, path: "/approach" });

export default function ApproachPage() {
  return (
    <>
      <PageHero eyebrow={approachPage.eyebrow} heading={approachPage.heading} body={approachPage.body} />

      <Section tone="dark" labelledBy="steps-heading">
        <Container>
          <SectionHeading id="steps-heading" heading={approachPage.stepsHeading} body={approachPage.stepsBody} />
          <DeploymentJourney />
        </Container>
      </Section>

      <Section tone="light" labelledBy="start-heading">
        <Container>
          <SectionHeading id="start-heading" heading={approachPage.startHeading} body={approachPage.startBody} light />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {startingPoints.map((sp, i) => (
              <Reveal as="li" key={sp.title} delay={i * 0.05} className="card flex flex-col rounded-[var(--radius-card)] p-6">
                <span className="flex h-8 w-8 items-center justify-start text-kiln-700">
                  <Icon name={sp.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink-950">{sp.title}</h3>
                <p className="mt-2 flex-1 text-ink-700">{sp.body}</p>
                <ul className="mt-5 space-y-1.5">
                  {sp.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-900 hover:text-kiln-700"
                      >
                        {l.label}
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="darker" labelledBy="ladder-heading">
        <Container>
          <SectionHeading id="ladder-heading" heading={approachPage.ladderHeading} body={approachPage.ladderBody} />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
            {capabilityStages.map((c, i) => (
              <Reveal as="li" key={c.stage} delay={i * 0.07} className="card relative rounded-[var(--radius-card)] p-6">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-kiln-500"
                  style={{ opacity: 0.4 + i * 0.2 }}
                />
                <span className="font-mono text-xs text-kiln-700">
                  0{i + 1} · {c.stage}
                </span>
                <p className="mt-3 font-display text-lg text-ink-950">{c.heading}</p>
                <p className="mt-2 text-sm text-ink-700">{c.body}</p>
                <ul className="mt-4 space-y-1.5" style={{ minHeight: `${4 + i * 1.5}rem` }}>
                  {c.items.map((it) => (
                    <li key={it} className="rounded-lg bg-ink-950/[0.03] px-3 py-2 text-sm text-ink-800">
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="light" labelledBy="risks-heading" id="risks">
        <Container>
          <SectionHeading id="risks-heading" eyebrow={risksIntro.eyebrow} heading={risksIntro.heading} body={risksIntro.body} light />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {risks.map((r, i) => (
              <Reveal as="li" key={r.risk} delay={(i % 2) * 0.06} className="card overflow-hidden rounded-[var(--radius-card)]">
                <div className="flex items-center gap-3 border-b border-ink-950/10 px-6 py-4">
                  <span className="flex h-8 w-8 items-center justify-start text-kiln-700">
                    <Icon name={r.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-semibold text-ink-950">{r.risk}</h3>
                </div>
                <dl className="grid gap-0 sm:grid-cols-2">
                  <div className="px-6 py-5">
                    <dt className="text-[0.68rem] font-semibold tracking-[0.14em] text-alarm-700 uppercase">{risksIntro.riskLabel}</dt>
                    <dd className="mt-2 text-ink-700">{r.why}</dd>
                  </div>
                  <div className="bg-paper px-6 py-5">
                    <dt className="text-[0.68rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">
                      {risksIntro.mitigationLabel}
                    </dt>
                    <dd className="mt-2 text-ink-800">{r.mitigation}</dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="darker" labelledBy="principles-heading">
        <Container>
          <SectionHeading id="principles-heading" heading={approachPage.principlesHeading} />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-ink-950/10 bg-ink-950/10 sm:grid-cols-2 lg:grid-cols-4">
            {approachPage.principles.map((p, i) => (
              <li key={p.title} className="bg-white p-7">
                <span className="font-mono text-xs text-kiln-700">0{i + 1}</span>
                <p className="mt-4 font-display text-lg text-ink-950">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
