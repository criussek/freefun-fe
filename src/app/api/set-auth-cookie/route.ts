import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

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
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set cookie' }, { status: 500 })
  }
}
