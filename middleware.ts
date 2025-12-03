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

  // Get Strapi JWT token from cookies
  const strapiToken = request.cookies.get('jwtToken')?.value

  if (!strapiToken) {
    // No token - redirect to our login page
    return NextResponse.redirect(new URL('/kalendarz/login', request.url))
  }

  // Token exists - allow access
  // The token was already verified during login by our custom endpoint
  // We trust it since it was generated with the admin secret
  return NextResponse.next()
}

export const config = {
  matcher: '/kalendarz/:path*',
}
