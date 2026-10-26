import { demoPage } from "@/content/demo";
import { DemoDashboard } from "@/components/sections/demo-dashboard";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...demoPage.seo, path: "/demo" });

export default function DemoPage() {
  return (
    <>
      <PageHero eyebrow={demoPage.eyebrow} heading={demoPage.heading} body={demoPage.body} />
      <Section tone="light" className="pt-10 sm:pt-12 lg:pt-14">
        <Container>
          <DemoDashboard />
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-[var(--radius-card)] border border-kiln-600/30 bg-kiln-200/30 p-6 sm:flex-row sm:items-center sm:p-8">
            <p className="font-display text-xl text-ink-950">{demoPage.endCta.heading}</p>
            <ButtonLink href={demoPage.endCta.href}>{demoPage.endCta.label}</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
