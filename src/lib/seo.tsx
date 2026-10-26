import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "./utils";

/** Per-page metadata with canonical URL and Open Graph defaults. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      // Default card; routes with their own opengraph-image file override this.
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.name}`, description, images: ["/opengraph-image"] },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: "US",
    },
    sameAs: siteConfig.social.map((s) => s.href),
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.productName,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Asset reliability and operational excellence for cement manufacturing",
    operatingSystem: "Web",
    description: siteConfig.description,
    url: absoluteUrl("/product"),
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}

export function articleJsonLd(a: { title: string; description: string; date: string; author: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    author: { "@type": "Organization", name: a.author },
    publisher: { "@type": "Organization", name: siteConfig.name, logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") } },
    mainEntityOfPage: absoluteUrl(a.path),
    image: absoluteUrl(`${a.path}/opengraph-image`),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be inlined; content is generated from our own config.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
