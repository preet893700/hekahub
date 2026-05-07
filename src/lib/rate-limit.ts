// In-memory rate limiter
const tracker = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(ip: string): { success: boolean; resetAt?: number } {
  const now = Date.now();
  const windowMs = 3_600_000; // 1 hour
  const limit = 5;

  // Evict old entries
  for (const [key, entry] of tracker.entries()) {
    if (now >= entry.resetAt) {
      tracker.delete(key);
    }
  }

  const current = tracker.get(ip);

  if (!current) {
    const resetAt = now + windowMs;
    tracker.set(ip, { count: 1, resetAt });
    return { success: true };
  }

  if (now >= current.resetAt) {
    const resetAt = now + windowMs;
    tracker.set(ip, { count: 1, resetAt });
    return { success: true };
  }

  if (current.count >= limit) {
    return { success: false, resetAt: current.resetAt };
  }

  current.count += 1;
  return { success: true };
}
