import { creditsPage } from "@/content/credits";
import { photoSlots } from "@/content/photos";
import { PageHero } from "@/components/sections/page-hero";
import { ArtPhoto } from "@/components/ui/art-photo";
import { Container, Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...creditsPage.seo, path: "/credits" });

export default function CreditsPage() {
  const credited = photoSlots.filter((p) => p.credit);
  return (
    <>
      <PageHero eyebrow={creditsPage.eyebrow} heading={creditsPage.heading} body={creditsPage.body} />
      <Section tone="light">
        <Container>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {credited.map((p) => (
              <li key={p.id} className="border border-ink-950/10 bg-white">
                <ArtPhoto id={p.id} crop="mobile" sizes="(min-width: 1024px) 33vw, 50vw" className="aspect-[4/3]" />
                <dl className="space-y-2 p-5 text-sm">
                  <div>
                    <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-ink-600 uppercase">{creditsPage.columns.image}</dt>
                    <dd>
                      <a href={p.credit!.source} className="link-editorial text-ink-950" rel="noopener noreferrer" target="_blank">
                        {p.credit!.title}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-ink-600 uppercase">{creditsPage.columns.author}</dt>
                    <dd className="text-ink-900">{p.credit!.author}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-ink-600 uppercase">{creditsPage.columns.license}</dt>
                    <dd>
                      <a
                        href={p.credit!.licenseUrl}
                        className="link-editorial text-ink-950"
                        rel="noopener noreferrer license"
                        target="_blank"
                      >
                        {p.credit!.license}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-ink-600 uppercase">{creditsPage.columns.used}</dt>
                    <dd className="text-ink-900">{p.where}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-sm text-ink-600">{creditsPage.artNote}</p>
        </Container>
      </Section>
    </>
  );
}
