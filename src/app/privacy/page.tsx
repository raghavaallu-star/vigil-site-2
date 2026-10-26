import { privacyPage } from "@/content/legal";
import { LegalPageView } from "@/components/sections/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: privacyPage.title, description: privacyPage.seoDescription, path: "/privacy" });

export default function PrivacyPage() {
  return <LegalPageView page={privacyPage} />;
}
