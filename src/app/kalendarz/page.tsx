import { cookies } from 'next/headers'
import CalendarClient from './CalendarClient'

export default async function KalendarzPage() {
  // Get token from cookies (middleware already verified it)
  const cookieStore = await cookies()
  const token = cookieStore.get('jwtToken')?.value

  // Fetch machines list server-side using API token (not admin JWT)
  const machinesRes = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/machines?filters[isActive]=true&fields[0]=name&fields[1]=documentId`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
      },
      cache: 'no-store'
    }
  )

  const machinesData = await machinesRes.json()
  const machines = machinesData.data || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Calendar Header */}
      <header className="bg-[#253551] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Kalendarz Rezerwacji</h1>
            <a
              href={`${process.env.NEXT_PUBLIC_STRAPI_URL}/admin`}
              className="text-sm hover:underline opacity-90 hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              Panel admin →
            </a>
          </div>
          <form action="/api/logout" method="POST">
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
            >
              Wyloguj
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <CalendarClient machines={machines} token={token} />
      </main>
    </div>
  )
}
