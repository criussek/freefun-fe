import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 })
    }

    // Set cookie server-side
    const cookieStore = await cookies()
    cookieStore.set('jwtToken', token, {
      maxAge: 604800, // 7 days
      path: '/',
      sameSite: 'lax',
      httpOnly: false, // Need to be readable by client
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Set auth cookie error:', error)
    return NextResponse.json({
      error: 'Failed to set cookie',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
