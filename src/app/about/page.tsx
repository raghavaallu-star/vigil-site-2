import { aboutPage } from "@/content/pages";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta, VisionShift } from "@/components/sections/home-sections";
import { EditorialArt } from "@/components/diagrams/editorial-art";
import { ArtPhoto } from "@/components/ui/art-photo";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...aboutPage.seo, path: "/about" });

/** Designed placeholder shown until the "about-plant" photo is generated (see photos/README.md). */
function PhotoPlaceholder() {
  return (
    <figure className="relative aspect-[4/3] overflow-hidden">
      <EditorialArt variant="rings" seed={21} label={aboutPage.photoAlt} className="absolute inset-0" />
      <figcaption className="absolute bottom-4 left-4 bg-white/90 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-ink-700 uppercase">
        {aboutPage.photoNote}
      </figcaption>
    </figure>
  );
}

function PhotoSlot() {
  return (
    <ArtPhoto
      id="about-plant"
      priority
      sizes="(min-width: 1024px) 45vw, 100vw"
      className="aspect-[4/5] sm:aspect-[4/3]"
      fallback={<PhotoPlaceholder />}
    />
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={aboutPage.eyebrow} heading={aboutPage.heading} body={aboutPage.body} aside={<PhotoSlot />} />

      <Section tone="dark" labelledBy="story-heading">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="story-heading" heading={aboutPage.storyHeading} light />
          <div className="space-y-5 text-lg leading-relaxed text-ink-700">
            {aboutPage.story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      <VisionShift />

      <Section tone="dark" labelledBy="values-heading">
        <Container>
          <SectionHeading id="values-heading" heading={aboutPage.valuesHeading} />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {aboutPage.values.map((v, i) => (
              <li key={v.title} className="card rounded-[var(--radius-card)] p-7">
                <span className="font-mono text-xs text-kiln-700">0{i + 1}</span>
                <p className="mt-4 font-display text-xl text-ink-950">{v.title}</p>
                <p className="mt-2 text-ink-700">{v.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="light" labelledBy="where-heading">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading id="where-heading" heading={aboutPage.locationHeading} body={aboutPage.locationBody} light />
          <ul className="grid grid-cols-2 gap-3">
            {aboutPage.markets.map((m) => (
              <li key={m} className="card rounded-[var(--radius-card)] p-5 font-display text-lg text-ink-950">
                {m}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
