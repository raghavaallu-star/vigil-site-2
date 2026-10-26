import { ArrowLeft, ArrowRight, Check, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { agents } from "@/content/agents";
import { areaPageLabels } from "@/content/equipment";
import { getIndustryArea, industries } from "@/content/industries";
import { modules } from "@/content/modules";
import { MockRenderer } from "@/components/mocks/mock-renderer";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/home-sections";
import { ButtonLink } from "@/components/ui/button";
import { ArtPhoto, hasPhoto } from "@/components/ui/art-photo";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string; area: string }>;

export function generateStaticParams() {
  return industries.flatMap((i) => i.areas.map((a) => ({ slug: i.slug, area: a.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }) {
  const p = await params;
  const found = getIndustryArea(p.slug, p.area);
  if (!found) return {};
  return pageMetadata({ ...found.area.seo, path: `/industries/${found.industry.slug}/${found.area.slug}` });
}

export default async function AreaPage({ params }: { params: Params }) {
  const p = await params;
  const found = getIndustryArea(p.slug, p.area);
  if (!found) notFound();
  const { industry, area: a } = found;
  const base = `/industries/${industry.slug}`;
  const idx = industry.areas.findIndex((x) => x.slug === a.slug);
  const prev = industry.areas[idx - 1];
  const next = industry.areas[idx + 1];
  const areaAgents = agents.filter((x) => a.agents.includes(x.slug));
  const areaModules = modules.filter((x) => a.modules.includes(x.slug));

  return (
    <>
      <PageHero
        eyebrow={`${industry.name} · ${areaPageLabels.step} ${String(a.step).padStart(2, "0")}`}
        heading={a.tagline}
        body={a.summary}
        crumbs={[
          { label: areaPageLabels.breadcrumb, href: "/industries" },
          { label: industry.name, href: base },
          { label: a.name, href: `${base}/${a.slug}` },
        ]}
        aside={<MockRenderer kind={a.mock} area={a} />}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={siteConfig.ctas.primary.href} size="lg">
            {siteConfig.ctas.primary.label}
          </ButtonLink>
          <ButtonLink href={siteConfig.ctas.assessment.href} variant="secondary" size="lg">
            {siteConfig.ctas.assessment.label}
          </ButtonLink>
        </div>
      </PageHero>

      {hasPhoto(`area-${a.slug}`) && (
        <div className="bg-paper pt-10">
          <Container>
            <ArtPhoto
              id={`area-${a.slug}`}
              sizes="(min-width: 1240px) 1176px, 100vw"
              className="aspect-[4/3] rounded-[var(--radius-card)] border border-ink-950/10 sm:aspect-[21/9]"
            />
          </Container>
        </div>
      )}

      <Section tone="light" labelledBy="assets-heading">
        <Container>
          <h2 id="assets-heading" className="text-3xl font-semibold text-ink-950 sm:text-4xl">
            {areaPageLabels.assetsHeading}
          </h2>
          <p className="mt-3 text-lg text-ink-700">{areaPageLabels.assetsBody}</p>
          <div className="card mt-10 overflow-hidden rounded-[var(--radius-card)]">
            <table className="w-full text-left">
              <thead className="hidden bg-paper sm:table-header-group">
                <tr>
                  <th scope="col" className="px-6 py-3 text-[0.68rem] font-medium tracking-[0.14em] text-ink-600 uppercase">
                    {areaPageLabels.assetCol}
                  </th>
                  <th scope="col" className="px-6 py-3 text-[0.68rem] font-medium tracking-[0.14em] text-ink-600 uppercase">
                    {areaPageLabels.watchCol}
                  </th>
                </tr>
              </thead>
              <tbody>
                {a.assets.map((as) => (
                  <tr key={as.name} className="block border-t border-ink-950/10 first:border-t-0 sm:table-row">
                    <th scope="row" className="block px-6 pt-4 font-semibold text-ink-950 sm:table-cell sm:py-4 sm:align-top">
                      {as.name}
                    </th>
                    <td className="block px-6 pt-2 pb-4 sm:table-cell sm:py-4">
                      <ul className="flex flex-wrap gap-1.5">
                        {as.watch.map((w) => (
                          <li
                            key={w}
                            className="rounded-[3px] border border-ink-950/10 bg-paper px-2.5 py-1 font-mono text-[0.7rem] text-ink-800"
                          >
                            {w}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section tone="dark" labelledBy="failures-heading">
        <Container className="grid gap-6 lg:grid-cols-3">
          <Reveal className="card rounded-[var(--radius-card)] p-7">
            <h2 id="failures-heading" className="text-xl font-semibold text-ink-950">
              {areaPageLabels.failuresHeading}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {a.failureModes.map((f) => (
                <li key={f} className="flex gap-2.5 text-ink-800">
                  <TriangleAlert aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-alarm-700" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.06} className="card rounded-[var(--radius-card)] p-7">
            <h2 className="text-xl font-semibold text-ink-950">{areaPageLabels.signalsHeading}</h2>
            <ul className="mt-5 space-y-2.5">
              {a.signals.map((s) => (
                <li key={s} className="flex items-center gap-3 rounded-lg bg-ink-950/[0.03] px-3 py-2 font-mono text-sm text-ink-800">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal-400" />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12} className="rounded-[var(--radius-card)] border border-kiln-500/30 bg-ink-50 p-7">
            <h2 className="text-xl font-semibold text-ink-950">{areaPageLabels.kpisHeading}</h2>
            <ul className="mt-5 space-y-2.5">
              {a.kpis.map((k) => (
                <li key={k} className="flex gap-2.5 text-ink-900">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-kiln-700" />
                  {k}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section tone="light" labelledBy="agents-heading">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="agents-heading" className="text-2xl font-semibold text-ink-950">
              {areaPageLabels.agentsHeading}
            </h2>
            <ul className="mt-6 space-y-3">
              {areaAgents.map((ag) => (
                <li key={ag.slug}>
                  <Link
                    href={`/agents/${ag.slug}`}
                    className="group card card-hover flex gap-4 rounded-[var(--radius-card)] p-5 hover:border-kiln-700/40"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-start text-kiln-700">
                      <Icon name={ag.icon} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-display text-lg text-ink-950">{ag.name}</span>
                      <span className="mt-0.5 block text-sm text-ink-700">{ag.promise}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink-950">{areaPageLabels.modulesHeading}</h2>
            <ul className="mt-6 space-y-3">
              {areaModules.map((mod) => (
                <li key={mod.slug}>
                  <Link
                    href={`/product/${mod.slug}`}
                    className="group card card-hover flex gap-4 rounded-[var(--radius-card)] p-5 hover:border-kiln-700/40"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-start text-kiln-700">
                      <Icon name={mod.icon} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-display text-lg text-ink-950">{mod.name}</span>
                      <span className="mt-0.5 block text-sm text-ink-700">{mod.tagline}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="darker" labelledBy="flow-heading" className="py-14 sm:py-14 lg:py-16">
        <Container>
          <h2 id="flow-heading" className="sr-only">
            {areaPageLabels.allAreas}
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {prev ? (
              <Link
                href={`${base}/${prev.slug}`}
                className="group card card-hover rounded-[var(--radius-card)] p-5 hover:border-kiln-500/40"
              >
                <span className="flex items-center gap-1.5 font-mono text-xs text-ink-600">
                  <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
                  {areaPageLabels.prev}
                </span>
                <span className="mt-2 block font-display text-lg text-ink-950">{prev.name}</span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            <Link
              href={base}
              className="flex items-center justify-center rounded-[var(--radius-card)] border border-ink-950/10 p-5 text-sm font-medium text-ink-800 hover:border-kiln-500/40 hover:text-ink-950"
            >
              {areaPageLabels.allAreas}
            </Link>
            {next ? (
              <Link
                href={`${base}/${next.slug}`}
                className="group card card-hover rounded-[var(--radius-card)] p-5 text-right hover:border-kiln-500/40"
              >
                <span className="flex items-center justify-end gap-1.5 font-mono text-xs text-ink-600">
                  {areaPageLabels.next}
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
                <span className="mt-2 block font-display text-lg text-ink-950">{next.name}</span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </div>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
