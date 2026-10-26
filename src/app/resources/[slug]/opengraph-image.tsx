import { getResource, resources } from "@/content/resources";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Vigil.AI resource";

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const r = getResource((await params).slug);
  return renderOg({ eyebrow: r?.type ?? "Resource", title: r?.title ?? "" });
}
