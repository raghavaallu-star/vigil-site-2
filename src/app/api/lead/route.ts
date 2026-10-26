import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { postLeadWebhook, sendLeadEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { leadSchema } from "@/lib/validators";

export const runtime = "nodejs";

const MIN_FILL_MS = 2500;
const MAX_BODY_BYTES = 16 * 1024;

function json(body: object, status = 200, headers?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

/** Rejects posts from other sites. Requests without an Origin header (curl, server-to-server) are allowed. */
function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return json({ ok: false, error: "forbidden" }, 403);
  if (!req.headers.get("content-type")?.includes("application/json")) return json({ ok: false, error: "unsupported_media_type" }, 415);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const limit = rateLimit(`lead:ip:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.ok) return json({ ok: false, error: "rate_limited" }, 429, { "Retry-After": String(limit.retryAfter ?? 600) });

  // Cap the body before parsing so oversized payloads never reach the JSON parser or the validator.
  const declared = Number(req.headers.get("content-length") || 0);
  if (declared > MAX_BODY_BYTES) return json({ ok: false, error: "payload_too_large" }, 413);
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "payload_too_large" }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot or impossibly fast submissions: pretend success so bots learn nothing.
  const b = body as { website?: unknown; elapsedMs?: unknown };
  if ((typeof b?.website === "string" && b.website.length > 0) || (typeof b?.elapsedMs === "number" && b.elapsedMs < MIN_FILL_MS)) {
    return json({ ok: true });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, error: "validation", fields: z.flattenError(parsed.error).fieldErrors }, 422);
  }

  // A second limit per email address stops one sender cycling through IPs.
  const perEmail = rateLimit(`lead:email:${parsed.data.email.toLowerCase()}`, 3, 60 * 60 * 1000);
  if (!perEmail.ok) return json({ ok: false, error: "rate_limited" }, 429, { "Retry-After": String(perEmail.retryAfter ?? 3600) });

  const [email, webhook] = await Promise.all([sendLeadEmail(parsed.data), postLeadWebhook(parsed.data)]);

  // Succeed if at least one delivery channel worked.
  const delivered = email.ok || (webhook.attempted && webhook.ok);
  if (!delivered) {
    console.error("[lead] delivery failed", { email: email.error, webhook });
    return json({ ok: false, error: "delivery_failed" }, 502);
  }
  if (!email.ok) console.error("[lead] email failed but webhook succeeded", email.error);
  if (webhook.attempted && !webhook.ok) console.error("[lead] webhook failed but email succeeded");

  return json({ ok: true });
}

export function GET() {
  return json({ ok: false, error: "method_not_allowed" }, 405, { Allow: "POST" });
}
