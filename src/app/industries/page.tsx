import Link from "next/link";
import { assetClasses } from "@/content/equipment";
import { industries, industriesPage } from "@/content/industries";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/home-sections";
import { ArtPhoto, PhotoCredit } from "@/components/ui/art-photo";
import { Icon } from "@/components/ui/icon";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...industriesPage.seo, path: "/industries" });

export default function IndustriesPage() {
  return (
    <>
      <PageHero eyebrow={industriesPage.eyebrow} heading={industriesPage.heading} body={industriesPage.body} />

      <Section tone="dark">
        <Container>
          <ul className="grid gap-x-10 gap-y-16 md:grid-cols-2">
            {industries.map((ind, i) => (
              <li key={ind.slug} className={i === 0 ? "md:col-span-2" : undefined}>
                <article className="group relative">
                  <div className={i === 0 ? "aspect-[4/3] overflow-hidden md:aspect-[21/9]" : "aspect-[4/3] overflow-hidden"}>
                    <ArtPhoto
                      id={i === 0 ? ind.photoSecondary : ind.photo}
                      crop={i === 0 ? "auto" : "mobile"}
                      sizes={i === 0 ? "(min-width: 1240px) 1160px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                      className="h-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <Icon name={ind.icon} className="h-5 w-5 text-kiln-700" />
                    <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-kiln-700 uppercase">{ind.name}</p>
                  </div>
                  <h2 className="mt-3 text-3xl leading-tight text-ink-950 sm:text-4xl">
                    <Link
                      href={`/industries/${ind.slug}`}
                      className="group-hover:underline group-hover:decoration-kiln-600 group-hover:decoration-1 group-hover:underline-offset-4 after:absolute after:inset-0"
                    >
                      {ind.tagline}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink-700">{ind.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-600">
                    {ind.areas.slice(0, 6).map((a) => (
                      <li key={a.slug}>{a.name}</li>
                    ))}
                  </ul>
                  <PhotoCredit id={i === 0 ? ind.photoSecondary : ind.photo} className="relative z-10 mt-4" />
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="light" labelledBy="cross-heading">
        <Container>
          <SectionHeading id="cross-heading" heading={industriesPage.crossHeading} body={industriesPage.crossBody} />
          <ul className="mt-12 grid grid-cols-2 border-t border-l border-ink-950/10 sm:grid-cols-3 lg:grid-cols-9">
            {assetClasses.map((c) => (
              <li key={c.slug} className="flex flex-col items-start gap-3 border-r border-b border-ink-950/10 bg-white p-4">
                <Icon name={c.icon} className="h-5 w-5 text-kiln-700" />
                <span className="text-sm leading-snug font-medium text-ink-950">{c.name}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
