import { Suspense } from "react";
import { resourcesPage } from "@/content/pages";
import { resources, resourceTypes } from "@/content/resources";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/home-sections";
import { ResourceCard, ResourceHub } from "@/components/sections/resource-hub";
import { Container, Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...resourcesPage.seo, path: "/resources" });

function StaticList() {
  return (
    <ul className="mt-[3.75rem] grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((r) => (
        <li key={r.slug}>
          <ResourceCard r={r} />
        </li>
      ))}
    </ul>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <PageHero eyebrow={resourcesPage.eyebrow} heading={resourcesPage.heading} body={resourcesPage.body} />
      <Section tone="light" className="pt-12 sm:pt-14 lg:pt-16">
        <Container>
          <Suspense fallback={<StaticList />}>
            <ResourceHub resources={resources} types={resourceTypes} />
          </Suspense>
        </Container>
      </Section>
      <ClosingCta />
    </>
  );
}
