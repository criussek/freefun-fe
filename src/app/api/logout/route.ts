import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    // Clear the jwtToken cookie
    const cookieStore = await cookies()
    cookieStore.delete('jwtToken')

    // Redirect to login page using request URL origin
    const url = new URL('/kalendarz/login', request.url)
    return NextResponse.redirect(url)
  } catch (error) {
    console.error('Logout error:', error)
    // Even if there's an error, redirect to login
    const url = new URL('/kalendarz/login', request.url)
    return NextResponse.redirect(url)
  }
}
