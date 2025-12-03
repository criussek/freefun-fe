import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Redirect to login page
    const url = new URL('/kalendarz/login', request.url)
    const response = NextResponse.redirect(url)

    // Clear the jwtToken cookie
    response.cookies.delete('jwtToken')

    return response
  } catch (error) {
    console.error('Logout error:', error)
    // Even if there's an error, redirect to login
    const url = new URL('/kalendarz/login', request.url)
    return NextResponse.redirect(url)
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
