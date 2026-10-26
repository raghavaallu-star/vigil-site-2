import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import type { LeadInput } from "./validators";

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function leadRows(lead: LeadInput): [string, string][] {
  return [
    ["Request", lead.kind === "assessment" ? "Plant Assessment" : "Demo"],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Role", lead.role],
    ["Industry", lead.industry],
    ["Region", lead.region],
    ["Plants / lines", lead.plants || "-"],
    ["Interests", lead.interests?.join(", ") || "-"],
    ["Message", lead.message || "-"],
  ];
}

export type DeliveryResult = { channel: "email" | "console"; ok: boolean; error?: string };

/**
 * Sends the lead notification through Resend when configured.
 * Without RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL it logs to the
 * server console instead, so forms work in local development.
 */
export async function sendLeadEmail(lead: LeadInput): Promise<DeliveryResult> {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  const rows = leadRows(lead);
  const subject = `[${siteConfig.name}] ${lead.kind === "assessment" ? "Plant Assessment" : "Demo"} request: ${lead.company}`;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.info(
      `\n[lead] Email not configured; logging lead instead.\n${subject}\n${rows.map(([k, val]) => `  ${k}: ${val}`).join("\n")}\n`,
    );
    return { channel: "console", ok: true };
  }

  const html = `<h2 style="font-family:sans-serif">${escape(subject)}</h2><table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(
      ([k, val]) =>
        `<tr><td style="padding:6px 12px;color:#555;vertical-align:top">${escape(k)}</td><td style="padding:6px 12px;white-space:pre-wrap">${escape(val)}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
      replyTo: lead.email,
      subject,
      html,
      text: rows.map(([k, val]) => `${k}: ${val}`).join("\n"),
    });
    if (error) return { channel: "email", ok: false, error: error.message };
    return { channel: "email", ok: true };
  } catch (e) {
    return { channel: "email", ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}

/** Optional CRM hand-off: POSTs the lead as JSON when LEAD_WEBHOOK_URL is set. */
export async function postLeadWebhook(lead: LeadInput): Promise<{ attempted: boolean; ok: boolean }> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return { attempted: false, ok: true };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        website: undefined,
        elapsedMs: undefined,
        source: siteConfig.url,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    });
    return { attempted: true, ok: res.ok };
  } catch {
    return { attempted: true, ok: false };
  }
}
