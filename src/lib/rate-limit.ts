
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const cache = new Map<string, { count: number; expires: number }>();

/**
 * Simple in-memory rate limiter for Next.js Middleware.
 * 
 * @param identifier - A unique identifier for the user (e.g., IP address)
 * @param limit - Maximum number of requests allowed within the window
 * @param windowMs - Time window in milliseconds
 * @returns RateLimitResult
 */
export function rateLimit(identifier: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const cached = cache.get(identifier);

  if (cached && cached.expires > now) {
    cached.count++;
    const remaining = Math.max(0, limit - cached.count);
    return {
      success: cached.count <= limit,
      limit,
      remaining,
      reset: cached.expires,
    };
  }

  // New or expired window
  const expiration = now + windowMs;
  cache.set(identifier, { count: 1, expires: expiration });

  // Cleanup old entries periodically (simple way for middleware)
  if (cache.size > 1000) {
    for (const [key, value] of cache.entries()) {
      if (value.expires < now) {
        cache.delete(key);
      }
    }
  }

  return {
    success: true,
    limit,
    remaining: limit - 1,
    reset: expiration,
  };
}
