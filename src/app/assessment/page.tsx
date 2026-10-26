import { assessmentPage } from "@/content/pages";
import { LeadForm } from "@/components/forms/lead-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...assessmentPage.seo, path: "/assessment" });

export default function AssessmentPage() {
  return (
    <>
      <PageHero eyebrow={assessmentPage.eyebrow} heading={assessmentPage.heading} body={assessmentPage.body} />
      <Section tone="light" className="pt-12 sm:pt-16 lg:pt-16">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <aside>
            <h2 className="font-display text-2xl text-ink-950">{assessmentPage.coversHeading}</h2>
            <ol className="mt-6 space-y-4">
              {assessmentPage.covers.map((c, i) => (
                <li key={c.title} className="card flex gap-4 rounded-[var(--radius-card)] p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kiln-200/50 font-mono text-sm text-kiln-700">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink-950">{c.title}</p>
                    <p className="mt-1 text-sm text-ink-700">{c.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
          <LeadForm kind="assessment" />
        </Container>
      </Section>
    </>
  );
}
