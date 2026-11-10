import 'server-only';

const globalForRateLimit = globalThis;

function getStore() {
  if (!globalForRateLimit.__rateLimitStore) {
    globalForRateLimit.__rateLimitStore = new Map();
  }
  return globalForRateLimit.__rateLimitStore;
}

/**
 * Best-effort in-memory rate limit.
 * Note: In serverless/edge environments, this may reset between invocations.
 */
export function rateLimit({ key, limit, windowMs }) {
  const now = Date.now();
  const store = getStore();
  const k = String(key ?? '');
  const max = Number(limit);
  const win = Number(windowMs);

  if (!k || !Number.isFinite(max) || max <= 0 || !Number.isFinite(win) || win <= 0) {
    return { ok: true, remaining: null, resetAt: null, retryAfterSeconds: null };
  }

  const entry = store.get(k);
  if (!entry || now >= entry.resetAt) {
    const resetAt = now + win;
    store.set(k, { count: 1, resetAt });
    return {
      ok: true,
      remaining: max - 1,
      resetAt,
      retryAfterSeconds: null,
    };
  }

  if (entry.count >= max) {
    const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return {
      ok: false,
      remaining: 0,
      resetAt: entry.resetAt,
      retryAfterSeconds,
    };
  }

  entry.count += 1;
  store.set(k, entry);

  return {
    ok: true,
    remaining: Math.max(0, max - entry.count),
    resetAt: entry.resetAt,
    retryAfterSeconds: null,
  };
}
