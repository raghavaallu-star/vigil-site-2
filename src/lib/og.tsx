import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
import { siteConfig } from "@/config/site";

const markDataUri = `data:image/svg+xml;base64,${readFileSync(path.join(process.cwd(), "public/brand/vigil-mark.svg")).toString("base64")}`;

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Shared Open Graph card: graphite base, kiln glow, lens mark and wordmark. */
export function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "radial-gradient(circle at 90% 115%, rgba(242,140,40,0.35) 0%, rgba(242,140,40,0.1) 35%, rgba(246,244,240,0) 65%)",
        backgroundColor: "#f6f4f0",
        color: "#10151c",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain img */}
        <img src={markDataUri} width={64} height={64} alt="" />
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
          Vigil
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              background: "#14b8a6",
              margin: "0 3px",
              alignSelf: "flex-end",
              marginBottom: 10,
            }}
          />
          <span style={{ color: "#a34a08" }}>AI</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", fontSize: 24, color: "#a34a08", textTransform: "uppercase", letterSpacing: 4 }}>{eyebrow}</div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 48 ? 60 : 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#3a4656" }}>
        <span>{siteConfig.positioning}</span>
        <span>{siteConfig.tagline}</span>
      </div>
    </div>,
    ogSize,
  );
}
