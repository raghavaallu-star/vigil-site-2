import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Analytics, ConsentBanner } from "@/components/layout/consent";
import { MotionProvider } from "@/components/ui/motion-provider";
import { siteConfig } from "@/config/site";
import { JsonLd, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const display = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap", axes: ["opsz"] });
const body = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Mono is only used for small labels, so it is not preloaded.
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}: ${siteConfig.productName} for Cement Plants`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f6f4f0",
  colorScheme: "light",
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const analyticsEnabled = Boolean(plausibleDomain || gaId);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-kiln-500 px-4 py-2 font-medium text-ink-950 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {siteConfig.ui.skipToContent}
        </a>
        <MotionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer analyticsEnabled={analyticsEnabled} />
        </MotionProvider>
        {analyticsEnabled && <ConsentBanner />}
        <Analytics plausibleDomain={plausibleDomain} gaId={gaId} />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
