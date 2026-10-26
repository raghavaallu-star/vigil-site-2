import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy.
 *
 * The site is statically generated, so a per-request nonce is not available.
 * 'unsafe-inline' is therefore allowed for scripts (Next.js hydration data and
 * JSON-LD) and styles (next/font and Framer Motion). Everything else is locked
 * to this origin plus the two optional analytics providers.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://plausible.io https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws:" : ""} https://plausible.io https://*.google-analytics.com https://*.analytics.google.com`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      { source: "/equipment", destination: "/industries/cement", permanent: true },
      { source: "/equipment/:slug", destination: "/industries/cement/:slug", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

const withMDX = createMDX({ options: { remarkPlugins: [remarkGfm] } });

export default withMDX(nextConfig);
