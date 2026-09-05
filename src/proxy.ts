
import { NextResponse, type NextRequest } from 'next/server';
import { rateLimit } from './lib/rate-limit';

export function proxy(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';
  
  // Apply rate limiting to all requests
  // Limit: 50 requests per 10 seconds (adjust as needed)
  const rl = rateLimit(ip, 50, 10000);

  if (!rl.success) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please slow down and try again.',
        limit: rl.limit,
        remaining: rl.remaining,
        reset: rl.reset,
        retryAfter: Math.ceil((rl.reset - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': rl.limit.toString(),
          'X-RateLimit-Remaining': rl.remaining.toString(),
          'X-RateLimit-Reset': rl.reset.toString(),
          'Retry-After': Math.ceil((rl.reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  // NOTE: No auth check here on purpose.
  // The app logs in with the Appwrite *browser* SDK, which keeps the session
  // in localStorage — it never sets an `a_session_*` cookie. So a middleware
  // cookie check always looks "logged out" and bounces freshly logged-in
  // users straight back to /login (login -> /application -> /login loop).
  // Route protection lives in `src/app/(app)/layout.tsx`, which guards with
  // `useAuth()` (i.e. a real `account.get()` session check) instead.

  const response = NextResponse.next();
  
  // Add rate limit headers to all responses
  response.headers.set('X-RateLimit-Limit', rl.limit.toString());
  response.headers.set('X-RateLimit-Remaining', rl.remaining.toString());
  response.headers.set('X-RateLimit-Reset', rl.reset.toString());

  return response;
}

// Config to match API routes and the application area
export const config = {
  matcher: [
    '/application/:path*',
  ],
};
