import { getIndustryArea, industries } from "@/content/industries";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Vigil.AI process area";

export function generateStaticParams() {
  return industries.flatMap((i) => i.areas.map((a) => ({ slug: i.slug, area: a.slug })));
}

export default async function Image({ params }: { params: Promise<{ slug: string; area: string }> }) {
  const p = await params;
  const f = getIndustryArea(p.slug, p.area);
  return renderOg({ eyebrow: f ? `${f.industry.name} · ${f.area.name}` : "Process area", title: f?.area.tagline ?? "" });
}
