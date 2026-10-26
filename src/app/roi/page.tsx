import { roiPage } from "@/content/roi";
import { PageHero } from "@/components/sections/page-hero";
import { RoiCalculator } from "@/components/sections/roi-calculator";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...roiPage.seo, path: "/roi" });

export default function RoiPage() {
  return (
    <>
      <PageHero eyebrow={roiPage.eyebrow} heading={roiPage.heading} body={roiPage.body} />
      <Section tone="light" className="pt-10 sm:pt-12 lg:pt-14">
        <Container>
          <RoiCalculator />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card rounded-[var(--radius-card)] p-6 sm:p-8">
              <h2 className="font-display text-xl text-ink-950">{roiPage.assumptionsHeading}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-700">
                {roiPage.assumptions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center rounded-[var(--radius-card)] border border-kiln-600/30 bg-kiln-200/30 p-6 sm:p-8">
              <h2 className="font-display text-xl text-ink-950">{roiPage.cta.heading}</h2>
              <p className="mt-2 text-ink-700">{roiPage.cta.body}</p>
              <ButtonLink href={roiPage.cta.href} className="mt-5 self-start">
                {roiPage.cta.label}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
