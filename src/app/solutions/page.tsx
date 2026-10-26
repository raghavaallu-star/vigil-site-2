import { ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";
import { modules } from "@/content/modules";
import { roles, solutionsPage } from "@/content/solutions";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/home-sections";
import { Icon } from "@/components/ui/icon";
import { Container, Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...solutionsPage.seo, path: "/solutions" });

export default function SolutionsPage() {
  return (
    <>
      <PageHero eyebrow={solutionsPage.eyebrow} heading={solutionsPage.heading} body={solutionsPage.body}>
        <ul className="mt-9 flex flex-wrap gap-2">
          {roles.map((r) => (
            <li key={r.slug}>
              <a
                href={`#${r.slug}`}
                className="inline-flex items-center gap-2 rounded-[3px] border border-ink-950/10 bg-ink-950/[0.04] px-4 py-2 text-sm text-ink-900 hover:border-kiln-500/50"
              >
                <Icon name={r.icon} className="h-4 w-4 text-kiln-700" />
                {r.role}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {roles.map((r, i) => {
        const light = i % 2 === 0;
        return (
          <Section key={r.slug} id={r.slug} tone={light ? "light" : "dark"} labelledBy={`${r.slug}-heading`}>
            <Container>
              <div className="flex items-center gap-4">
                <span className={`flex h-8 w-8 items-center justify-start text-kiln-700`}>
                  <Icon name={r.icon} className="h-7 w-7" />
                </span>
                <h2 id={`${r.slug}-heading`} className={`text-3xl font-semibold sm:text-4xl ${light ? "text-ink-950" : "text-ink-950"}`}>
                  {r.role}
                </h2>
              </div>
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                <div
                  className={`rounded-[var(--radius-card)] border p-6 ${light ? "border-ink-950/10 bg-white" : "border-ink-950/10 bg-white"}`}
                >
                  <p className={`text-[0.68rem] font-semibold tracking-[0.14em] uppercase ${light ? "text-alarm-700" : "text-alarm-700"}`}>
                    {solutionsPage.painsLabel}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {r.pains.map((p) => (
                      <li key={p} className={`flex gap-2.5 ${light ? "text-ink-700" : "text-ink-700"}`}>
                        <X aria-hidden="true" className={`mt-1 h-4 w-4 shrink-0 ${light ? "text-alarm-700" : "text-alarm-700"}`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`rounded-[var(--radius-card)] border border-kiln-600/30 bg-kiln-200/25 p-6 text-ink-900`}>
                  <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">{solutionsPage.getsLabel}</p>
                  <ul className="mt-4 space-y-3">
                    {r.gets.map((g) => (
                      <li key={g} className="flex gap-2.5 text-ink-900">
                        <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-signal-700" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`rounded-[var(--radius-card)] border p-6 ${light ? "border-ink-950/10 bg-white" : "border-ink-950/10 bg-white"}`}
                >
                  <p className={`text-[0.68rem] font-semibold tracking-[0.14em] uppercase ${light ? "text-kiln-700" : "text-kiln-700"}`}>
                    {solutionsPage.kpisLabel}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {r.kpis.map((k) => (
                      <li
                        key={k}
                        className={`rounded-[3px] border px-3 py-1.5 font-mono text-xs ${light ? "border-ink-950/15 text-ink-800" : "border-ink-950/15 text-ink-800"}`}
                      >
                        {k}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-6 text-[0.68rem] font-semibold tracking-[0.14em] uppercase ${light ? "text-ink-600" : "text-ink-600"}`}>
                    {solutionsPage.modulesLabel}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {r.modules.map((slug) => {
                      const m = modules.find((x) => x.slug === slug);
                      if (!m) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/product/${m.slug}`}
                            className={`group inline-flex items-center gap-1.5 text-sm font-medium ${light ? "text-ink-900 hover:text-kiln-700" : "text-ink-900 hover:text-kiln-700"}`}
                          >
                            {m.name}
                            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      <ClosingCta />
    </>
  );
}
