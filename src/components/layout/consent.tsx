"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { consentCopy } from "@/content/legal";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "vigil-consent";
const EVENT = "vigil-consent-change";

type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function writeConsent(v: Consent) {
  try {
    if (v) window.localStorage.setItem(STORAGE_KEY, v);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable: choice lasts for this page view only */
  }
  window.dispatchEvent(new CustomEvent<Consent>(EVENT, { detail: v }));
}

function useConsent() {
  const [consent, setConsent] = useState<Consent | "unknown">("unknown");
  useEffect(() => {
    setConsent(readConsent());
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  return consent;
}

/** Only rendered when an analytics provider is configured. */
export function ConsentBanner() {
  const consent = useConsent();
  if (consent !== null) return null;
  return (
    <div
      role="region"
      aria-label={consentCopy.heading}
      className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-xl rounded-[var(--radius-card)] border border-ink-950/10 bg-white/95 p-4 shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-5"
    >
      <p className="font-display text-base text-ink-950">{consentCopy.heading}</p>
      <p className="mt-1 text-sm text-ink-700">
        {consentCopy.body}{" "}
        <Link href="/privacy" className="text-kiln-700 underline underline-offset-2 hover:text-kiln-700">
          {consentCopy.policyLink}
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => writeConsent("granted")}>
          {consentCopy.accept}
        </Button>
        <Button size="sm" variant="secondary" onClick={() => writeConsent("denied")}>
          {consentCopy.decline}
        </Button>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" className="hover:text-ink-950" onClick={() => writeConsent(null)}>
      {label}
    </button>
  );
}

/** Loads Plausible or GA4 only after consent is granted. */
export function Analytics({ plausibleDomain, gaId }: { plausibleDomain?: string; gaId?: string }) {
  const consent = useConsent();
  if (consent !== "granted") return null;
  if (plausibleDomain) {
    return <Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />;
  }
  if (gaId) {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
        </Script>
      </>
    );
  }
  return null;
}
