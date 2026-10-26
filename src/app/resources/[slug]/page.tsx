import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { caseStudyLabels } from "@/content/case-study";
import { resourcesPage } from "@/content/pages";
import { getResource, resources } from "@/content/resources";
import { ClosingCta } from "@/components/sections/home-sections";
import { ResourceCard } from "@/components/sections/resource-hub";
import { Container, Section } from "@/components/ui/section";
import { articleJsonLd, JsonLd, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }) {
  const r = getResource((await params).slug);
  if (!r) return {};
  return {
    ...pageMetadata({ title: r.title, description: r.description, path: `/resources/${r.slug}`, type: "article" }),
    ...(r.draft ? { robots: { index: false } } : {}),
  };
}

export default async function ResourcePage({ params }: { params: Params }) {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) notFound();
  const { default: Body } = await import(`@/content/resources/${slug}.mdx`);
  const more = resources.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden border-b border-ink-950/[0.08] bg-paper">
          <div
            aria-hidden="true"
            className="bg-grid-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]"
          />
          <Container className="max-w-3xl pt-12 pb-14 sm:pt-16">
            <Link href="/resources" className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-600 hover:text-ink-950">
              <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
              {siteConfig.ui.allResources}
            </Link>
            <p className="mt-8 text-xs font-semibold tracking-[0.14em] text-kiln-700 uppercase">{r.type}</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-ink-950 sm:text-5xl">{r.title}</h1>
            <p className="mt-5 text-lg text-ink-700">{r.description}</p>
            <p className="mt-6 font-mono text-xs text-ink-600">
              {r.author} · <time dateTime={r.date}>{formatDate(r.date)}</time> · {r.readingMinutes} {resourcesPage.minRead}
            </p>
          </Container>
        </header>
        <div className="on-light bg-paper py-14 sm:py-20">
          <Container className="max-w-3xl">
            {r.draft && (
              <p className="mb-8 rounded-[4px] border border-kiln-700/30 bg-kiln-200/40 px-4 py-3 text-sm text-kiln-800">
                {caseStudyLabels.draftBanner}
              </p>
            )}
            <div className="prose-vigil">
              <Body />
            </div>
            <ul className="mt-12 flex flex-wrap gap-2">
              {r.tags.map((t) => (
                <li key={t} className="rounded-[3px] border border-ink-950/15 px-3 py-1 font-mono text-xs text-ink-700">
                  {t}
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </article>

      {more.length > 0 && (
        <Section tone="light" labelledBy="more-heading" className="border-t border-ink-950/10 pt-14 sm:pt-16 lg:pt-16">
          <Container>
            <h2 id="more-heading" className="text-2xl font-semibold text-ink-950">
              {resourcesPage.related}
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {more.map((m) => (
                <li key={m.slug}>
                  <ResourceCard r={m} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <ClosingCta />
      <JsonLd
        data={articleJsonLd({ title: r.title, description: r.description, date: r.date, author: r.author, path: `/resources/${r.slug}` })}
      />
    </>
  );
}
