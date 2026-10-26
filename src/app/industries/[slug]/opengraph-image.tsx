import { getIndustry, industries } from "@/content/industries";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Vigil.AI industry";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const ind = getIndustry((await params).slug);
  return renderOg({ eyebrow: ind?.name ?? "Industries", title: ind?.tagline ?? "" });
}
