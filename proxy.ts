
import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const token = request.cookies.get("a_session_[YOUR_PROJECT_ID]")?.value;
    if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
 
}
 
export const config = {
  matcher: '/application/:path*',
}


export const getCookies = async ()=>{

}