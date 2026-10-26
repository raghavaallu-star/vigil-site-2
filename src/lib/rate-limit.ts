/**
 * Fixed-window in-memory rate limiter.
 *
 * Good enough for a single server instance or a low-traffic serverless
 * deployment. For multi-region production traffic, swap this for a shared
 * store such as Upstash Redis or Vercel KV (see README).
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  entry.count += 1;
  if (hits.size > 5000) {
    for (const [k, e] of hits) if (e.resetAt < now) hits.delete(k);
  }
  return { ok: entry.count <= limit, remaining: Math.max(0, limit - entry.count), retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
}
