import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiList, StrapiSingle } from '@/types/strapi'
import { fromStrapiMachine } from '@/lib/adapters/machine'
import { fromStrapiCalendarPage } from '@/lib/adapters/calendar-page'
import { POP_MACHINES, POP_CALENDAR_PAGE } from '@/lib/populate'
import PageHero from '@/components/walden/PageHero'
import CalendarPageComponent from '@/components/CalendarPageComponent'

export default async function CalendarPage() {
  // Fetch calendar page metadata from Strapi
  const calendarPageRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/calendar', {
    params: POP_CALENDAR_PAGE,
    revalidate: 3600,
  })

  const calendarPage = calendarPageRes?.data ? fromStrapiCalendarPage(calendarPageRes.data) : undefined

  // Fetch all machines, sorted alphabetically
  const machinesRes = await fetchStrapiOrNull<StrapiList<any>>('/api/machines', {
    params: {
      ...POP_MACHINES,
      sort: 'name:asc',
    },
    revalidate: 60,
  })

  const allMachines = Array.isArray(machinesRes?.data)
    ? machinesRes.data.map(fromStrapiMachine).filter(Boolean)
    : []

  const activeMachines = allMachines.filter((m) => m.isActive !== false)

  // FREE = campers, FUN = everything else
  const freeMachines = activeMachines.filter((m) => m.type === 'camper')
  const funMachines = activeMachines.filter((m) => m.type !== 'camper')

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title={calendarPage?.pageTitle || 'Dostępność maszyn'}
        description={calendarPage?.pageDescription || 'Sprawdź dostępność naszych maszyn i wybierz idealny termin'}
        backgroundImage={calendarPage?.pageImage || null}
      />

      <CalendarPageComponent
        freeMachines={freeMachines}
        funMachines={funMachines}
      />
    </main>
  )
}
