import { NextRequest, NextResponse } from 'next/server';
// Read-only admin shell. Production access is denied until real authentication and RBAC are implemented.
export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    process.env.NODE_ENV === 'production' &&
    process.env.ENABLE_ADMIN_PREVIEW !== 'true'
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ['/admin/:path*'] };
