import type { Metadata } from "next";
import { deploymentSection, gapSection, notAutomation } from "@/content/home";
import { siteConfig } from "@/config/site";
import { ArchitectureDiagram } from "@/components/diagrams/architecture-diagram";
import { DeploymentJourney } from "@/components/diagrams/deployment-journey";
import { GapExplorer } from "@/components/sections/gap-explorer";
import { Hero } from "@/components/sections/hero";
import {
  AgentsGrid,
  ClosingCta,
  Insights,
  Outcomes,
  PhotoBand,
  KeyDomains,
  Testimonials,
  TrustStrip,
  WhyUs,
} from "@/components/sections/home-sections";
import { ArrowLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { JsonLd, softwareApplicationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name}: Predictive Reliability for Cement Plants` },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: `${siteConfig.name}: Stop Reacting. Start Predicting.`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <KeyDomains />

      <Section id="gap" tone="light" labelledBy="gap-heading" className="overflow-hidden">
        <Container>
          <SectionHeading id="gap-heading" eyebrow={gapSection.eyebrow} heading={gapSection.heading} body={gapSection.body} />
          <GapExplorer />
        </Container>
      </Section>

      <Section id="platform" tone="dark" labelledBy="platform-heading">
        <Container className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading
              id="platform-heading"
              eyebrow={notAutomation.eyebrow}
              heading={notAutomation.heading}
              body={notAutomation.body}
            />
            <ol className="mt-12 border-t border-ink-950/15">
              {notAutomation.points.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[3rem_1fr] gap-2 border-b border-ink-950/10 py-5">
                  <span className="numeral text-2xl text-kiln-700">0{i + 1}</span>
                  <div>
                    <p className="font-semibold text-ink-950">{p.title}</p>
                    <p className="mt-1 text-ink-700">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <ArchitectureDiagram />
        </Container>
      </Section>

      <PhotoBand />
      <WhyUs />
      <Outcomes />
      <AgentsGrid tone="light" />

      <Section id="journey" tone="dark" labelledBy="journey-heading">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="journey-heading"
              eyebrow={deploymentSection.eyebrow}
              heading={deploymentSection.heading}
              body={deploymentSection.body}
            />
            <ArrowLink href={deploymentSection.cta.href} className="shrink-0 lg:mb-2">
              {deploymentSection.cta.label}
            </ArrowLink>
          </div>
          <DeploymentJourney light />
        </Container>
      </Section>

      <Testimonials />
      <Insights />
      <ClosingCta />
      <JsonLd data={softwareApplicationJsonLd()} />
    </>
  );
}
