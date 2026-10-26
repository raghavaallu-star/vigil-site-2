import type { ResourceMeta, ResourceType } from "../types";
import { metadata as breakdownLogs } from "./breakdown-logs-to-root-cause.mdx";
import { metadata as historianBeforeAi } from "./historian-before-ai.mdx";
import { metadata as kilnFalseAir } from "./kiln-false-air.mdx";
import { metadata as kpiRhythm } from "./kpi-rhythm.mdx";
import { metadata as nagarjunaPilot } from "./nagarjuna-pilot.mdx";

/**
 * Resource registry. To add a resource: create `<slug>.mdx` in this folder
 * with an exported `metadata` object, then import it and add it below.
 */
const all: ResourceMeta[] = [historianBeforeAi, kilnFalseAir, breakdownLogs, kpiRhythm, nagarjunaPilot];

/** Drafts (e.g. case studies awaiting customer approval) only appear when NEXT_PUBLIC_SHOW_DRAFTS=true. */
const showDrafts = process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true";

export const resources: ResourceMeta[] = all.filter((r) => showDrafts || !r.draft).sort((a, b) => b.date.localeCompare(a.date));

export const resourceTypes: ResourceType[] = ["Blog", "Case Study", "Whitepaper", "Webinar", "Video"];

export function getResource(slug: string) {
  return resources.find((r) => r.slug === slug);
}
