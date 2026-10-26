import { draftNotice, lastUpdatedLabel, type LegalPage } from "@/content/legal";
import { Container } from "@/components/ui/section";
import { formatDate } from "@/lib/utils";
import { PageHero } from "./page-hero";

export function LegalPageView({ page }: { page: LegalPage }) {
  return (
    <>
      <PageHero heading={page.title} body={page.intro}>
        <p className="mt-6 font-mono text-xs text-ink-600">
          {lastUpdatedLabel} <time dateTime={page.updated}>{formatDate(page.updated)}</time>
        </p>
      </PageHero>
      <div className="on-light bg-paper py-14 sm:py-20">
        <Container className="max-w-3xl">
          <p className="rounded-[4px] border border-kiln-700/30 bg-kiln-200/40 px-4 py-3 text-sm text-kiln-800">{draftNotice}</p>
          <div className="prose-vigil mt-10">
            {page.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </section>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
