import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { industries } from "@/content/industries";
import { ArtPhoto } from "@/components/ui/art-photo";
import { modules, supportingCapabilities } from "@/content/modules";
import { productPage } from "@/content/pages";
import { ArchitectureDiagram } from "@/components/diagrams/architecture-diagram";
import { PageHero } from "@/components/sections/page-hero";
import { AgentsGrid, ClosingCta } from "@/components/sections/home-sections";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { JsonLd, pageMetadata, softwareApplicationJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({ ...productPage.seo, path: "/product" });

export default function ProductPage() {
  return (
    <>
      <PageHero eyebrow={productPage.eyebrow} heading={productPage.heading} body={productPage.body}>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={siteConfig.ctas.primary.href} size="lg">
            {siteConfig.ctas.primary.label}
          </ButtonLink>
          <ButtonLink href={siteConfig.ctas.assessment.href} variant="secondary" size="lg">
            {siteConfig.ctas.assessment.label}
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="darker" labelledBy="arch-heading">
        <Container className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <SectionHeading id="arch-heading" heading={productPage.architectureHeading} body={productPage.architectureBody} />
          <ArchitectureDiagram />
        </Container>
      </Section>

      <Section tone="light" labelledBy="modules-heading">
        <Container>
          <SectionHeading id="modules-heading" heading={productPage.modulesHeading} body={productPage.modulesBody} light />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, i) => (
              <Reveal as="li" key={m.slug} delay={(i % 3) * 0.06}>
                <article className="group card card-hover relative flex h-full flex-col rounded-[var(--radius-card)] p-6 transition-shadow hover:shadow-[0_20px_50px_-25px_rgb(16_21_28/0.35)]">
                  <div className="flex items-start justify-between">
                    <span className="flex h-8 w-8 items-center justify-start text-kiln-700">
                      <Icon name={m.icon} className="h-6 w-6" />
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider uppercase ${m.category === "Foundation" ? "bg-kiln-500 text-ink-950" : "bg-white/5 text-ink-700"}`}
                    >
                      {m.category}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-ink-950">
                    <Link href={`/product/${m.slug}`} className="after:absolute after:inset-0">
                      {m.name}
                    </Link>
                  </h3>
                  <p className="mt-1 font-medium text-kiln-700">{m.tagline}</p>
                  <p className="mt-3 flex-1 text-ink-700">{m.summary}</p>
                  <ArrowUpRight aria-hidden="true" className="mt-5 h-5 w-5 text-ink-600 transition-colors group-hover:text-kiln-700" />
                </article>
              </Reveal>
            ))}
          </ul>

          <h3 className="mt-16 text-xs font-semibold tracking-[0.14em] text-ink-600 uppercase">{productPage.supportingHeading}</h3>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {supportingCapabilities.map((c) => (
              <li key={c.name} className="flex gap-4 rounded-[var(--radius-card)] border border-ink-950/10 bg-paper-2/60 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] bg-white text-kiln-700">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg text-ink-950">{c.name}</p>
                  <p className="mt-1 text-ink-700">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="dark" labelledBy="coverage-heading">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading id="coverage-heading" heading={productPage.coverageHeading} body={productPage.coverageBody} />
            <ButtonLink href="/industries" variant="secondary" className="self-start lg:self-auto">
              {productPage.coverageCta}
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {industries.map((ind) => (
              <li key={ind.slug}>
                <Link href={`/industries/${ind.slug}`} className="group block">
                  <ArtPhoto id={ind.photo} crop="mobile" sizes="(min-width: 1024px) 20vw, 50vw" className="aspect-[4/3]" />
                  <span className="mt-3 flex items-center gap-2 font-display text-xl text-ink-950 group-hover:text-kiln-700">
                    <Icon name={ind.icon} className="h-4 w-4 text-kiln-700" />
                    {ind.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <AgentsGrid tone="darker" />
      <ClosingCta />
      <JsonLd data={softwareApplicationJsonLd()} />
    </>
  );
}
