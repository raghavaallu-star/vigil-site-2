import { siteConfig } from "@/config/site";
import { hero } from "@/content/home";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${siteConfig.name}: ${hero.headlineLead} ${hero.headlineAccent}`;

export default function Image() {
  return renderOg({ eyebrow: siteConfig.productName, title: `${hero.headlineLead} ${hero.headlineAccent}` });
}
