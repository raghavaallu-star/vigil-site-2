import { getModule, modules } from "@/content/modules";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Vigil Reliability module";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const m = getModule((await params).slug);
  return renderOg({ eyebrow: m?.name ?? "Vigil Reliability", title: m?.tagline ?? "" });
}
