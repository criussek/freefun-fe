import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Only protect /kalendarz routes
  if (!request.nextUrl.pathname.startsWith('/kalendarz')) {
    return NextResponse.next()
  }

  // Get Strapi JWT token from cookies
  const strapiToken = request.cookies.get('jwtToken')?.value

  // Allow access to login page
  if (request.nextUrl.pathname === '/kalendarz/login') {
    return NextResponse.next()
  }

  if (!strapiToken) {
    // No token - redirect to our login page
    return NextResponse.redirect(new URL('/kalendarz/login', request.url))
  }

  try {
    // Verify token with Strapi admin endpoint
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, '') || ''
    const response = await fetch(
      `${strapiUrl}/admin/users/me`,
      {
        headers: {
          Authorization: `Bearer ${strapiToken}`,
        },
      }
    )

    if (!response.ok) {
      // Invalid token - redirect to our login page
      return NextResponse.redirect(new URL('/kalendarz/login', request.url))
    }

    // Valid admin - allow access
    return NextResponse.next()
  } catch (error) {
    console.error('Auth check failed:', error)
    return NextResponse.redirect(new URL('/kalendarz/login', request.url))
  }
}

export const config = {
  matcher: '/kalendarz/:path*',
}
