import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Only protect /kalendarz routes
  if (!request.nextUrl.pathname.startsWith('/kalendarz')) {
    return NextResponse.next()
  }

  // Allow access to login page
  if (request.nextUrl.pathname === '/kalendarz/login') {
    return NextResponse.next()
  }

  // Get JWT token from Users & Permissions
  const jwt = request.cookies.get('jwt')?.value

  if (!jwt) {
    // No token - redirect to login page
    return NextResponse.redirect(new URL('/kalendarz/login', request.url))
  }

  // Token exists - allow access
  // The token was verified during login via /api/auth/local
  return NextResponse.next()
}

export const config = {
  matcher: '/kalendarz/:path*',
}
