import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 })
    }

    // Create response with cookie
    const response = NextResponse.json({ success: true })

    // Set cookie in response headers
    response.cookies.set({
      name: 'jwtToken',
      value: token,
      maxAge: 604800, // 7 days
      path: '/',
      sameSite: 'lax',
      httpOnly: false, // Need to be readable by client
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    })

    return response
  } catch (error) {
    console.error('Set auth cookie error:', error)
    return NextResponse.json({
      error: 'Failed to set cookie',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
