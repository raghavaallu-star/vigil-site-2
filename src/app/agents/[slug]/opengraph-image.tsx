import { agents, getAgent } from "@/content/agents";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Vigil.AI agent";

export function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const a = getAgent((await params).slug);
  return renderOg({ eyebrow: a?.name ?? "AI agent", title: a?.promise ?? "" });
}
