import { termsPage } from "@/content/legal";
import { LegalPageView } from "@/components/sections/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: termsPage.title, description: termsPage.seoDescription, path: "/terms" });

export default function TermsPage() {
  return <LegalPageView page={termsPage} />;
}
