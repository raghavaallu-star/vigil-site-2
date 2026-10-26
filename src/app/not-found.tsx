import { notFoundPage } from "@/content/pages";
import { EditorialArt } from "@/components/diagrams/editorial-art";
import { LogoMark } from "@/components/layout/logo";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export const metadata = { title: notFoundPage.heading, robots: { index: false } };

export default function NotFound() {
  return (
    <section aria-labelledby="nf-heading" className="grid bg-white lg:grid-cols-2">
      <Container className="flex min-h-[60vh] flex-col justify-center py-20 lg:max-w-none lg:px-16">
        <LogoMark className="h-12 w-12" animated />
        <p className="mt-10 text-[0.75rem] font-semibold tracking-[0.16em] text-kiln-700 uppercase">{notFoundPage.code}</p>
        <h1 id="nf-heading" className="mt-4 font-display text-5xl leading-[1.05] text-ink-950 sm:text-6xl">
          {notFoundPage.heading}
        </h1>
        <p className="mt-6 max-w-lg text-lg text-ink-700">{notFoundPage.body}</p>
        <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <ButtonLink href="/">{notFoundPage.home}</ButtonLink>
          <ArrowLink href="/product">{notFoundPage.product}</ArrowLink>
        </div>
      </Container>
      <div className="relative hidden min-h-[60vh] lg:block">
        <EditorialArt variant="field" seed={9} className="absolute inset-0" />
      </div>
    </section>
  );
}
