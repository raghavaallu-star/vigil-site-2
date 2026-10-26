import { Check, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { contactPage } from "@/content/pages";
import { LeadForm } from "@/components/forms/lead-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...contactPage.seo, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={contactPage.eyebrow} heading={contactPage.heading} body={contactPage.body} />
      <Section tone="light" className="pt-12 sm:pt-16 lg:pt-16">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <LeadForm kind="demo" />
          <aside className="space-y-6">
            <div className="rounded-[var(--radius-card)] border border-kiln-600/30 bg-kiln-200/30 p-6 text-ink-900">
              <h2 className="font-display text-lg text-ink-950">{contactPage.expectHeading}</h2>
              <ul className="mt-4 space-y-3">
                {contactPage.expect.map((e) => (
                  <li key={e} className="flex gap-2.5 text-sm">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-signal-700" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card rounded-[var(--radius-card)] p-6">
              <h2 className="font-display text-lg text-ink-950">{contactPage.directHeading}</h2>
              <p className="mt-3 flex items-center gap-2 text-sm">
                <Mail aria-hidden="true" className="h-4 w-4 text-kiln-700" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-ink-900 underline underline-offset-2">
                  {siteConfig.contact.email}
                </a>
              </p>
              {siteConfig.contact.phone && <p className="mt-2 text-sm text-ink-700">{siteConfig.contact.phone}</p>}
              <p className="mt-2 flex items-start gap-2 text-sm text-ink-700">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-kiln-700" />
                {siteConfig.location.note}
              </p>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
