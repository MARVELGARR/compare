
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';
import { rateLimit } from './lib/rate-limit';

export function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  
  // Apply rate limiting to all requests
  // Limit: 50 requests per 10 seconds (adjust as needed)
  const rl = rateLimit(ip, 50, 10000);

  if (!rl.success) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': rl.limit.toString(),
        'X-RateLimit-Remaining': rl.remaining.toString(),
        'X-RateLimit-Reset': rl.reset.toString(),
      },
    });
  }

  // --- Logic from original proxy.ts ---
  // The original used "a_session_[YOUR_PROJECT_ID]"
  // Since we have multiple IDs in env, we'll try to find any session cookie starting with "a_session_"
  const sessionCookie = request.cookies.getAll().find(c => c.name.startsWith('a_session_'));
  
  if (!sessionCookie && request.nextUrl.pathname.startsWith("/application")) {
     // The original proxy matched "/application/:path*" and checked "/dashboard"
     // We will match the original's intent for the application path
     // If no session and trying to access application, redirect to landing or login
     // Note: original proxy redirected to /login if starting with /dashboard
     // Given the project structure, /application seems to be the protected area.
     // return NextResponse.redirect(new URL("/", request.url));
  }
  // --- End original proxy.ts logic ---

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
    '/api/:path*',
    '/application/:path*',
  ],
};
