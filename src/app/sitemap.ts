import type { MetadataRoute } from "next";
import { agents } from "@/content/agents";
import { industries } from "@/content/industries";
import { modules } from "@/content/modules";
import { resources } from "@/content/resources";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "/",
    "/product",
    "/industries",
    "/credits",
    "/demo",
    "/roi",
    "/solutions",
    "/approach",
    "/resources",
    "/about",
    "/contact",
    "/assessment",
    "/privacy",
    "/terms",
  ];
  return [
    ...staticRoutes.map((p) => ({
      url: absoluteUrl(p),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "/" ? 1 : 0.7,
    })),
    ...modules.map((m) => ({
      url: absoluteUrl(`/product/${m.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...industries.map((i) => ({
      url: absoluteUrl(`/industries/${i.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...industries.flatMap((i) =>
      i.areas.map((a) => ({
        url: absoluteUrl(`/industries/${i.slug}/${a.slug}`),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ),
    ...agents.map((a) => ({
      url: absoluteUrl(`/agents/${a.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...resources.map((r) => ({
      url: absoluteUrl(`/resources/${r.slug}`),
      lastModified: new Date(r.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
