import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  // Clear the jwtToken cookie
  const cookieStore = await cookies()
  cookieStore.delete('jwtToken')

  // Redirect to login page
  return NextResponse.redirect(new URL('/kalendarz/login', process.env.STRAPI_URL || 'http://localhost:3000'))
}
