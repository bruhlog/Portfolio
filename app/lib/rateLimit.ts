const rateLimitMap = new Map<string, { count: number; time: number }>();

export function rateLimit(ip: string, limit = 3, windowMs = 60_000) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, time: now });
    return true;
  }

  if (now - entry.time > windowMs) {
    rateLimitMap.set(ip, { count: 1, time: now });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  rateLimitMap.set(ip, entry);
  return true;
}
