'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import plLocale from '@fullcalendar/core/locales/pl'
import './calendar.css'

interface Machine {
  documentId: string
  name: string
}

interface CalendarClientProps {
  machines: Machine[]
}

interface BookingEvent {
  id: string
  title: string
  start: string
  end: string
  backgroundColor: string
  borderColor: string
  allDay: boolean
  extendedProps: {
    bookingReference: string
    customerName: string
    phone: string
    email: string
    status: string
    machines: { name: string; documentId: string }[]
    pickupTime: string
    returnTime: string
    totalPrice: number
  }
}

export default function CalendarClient({ machines }: CalendarClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const machineId = searchParams.get('machine') || ''

  const [events, setEvents] = useState<BookingEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch bookings based on selected machine
  useEffect(() => {
    async function fetchBookings() {
      setLoading(true)
      setError(null)

      try {
        let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bookings?populate[machines][fields][0]=name&populate[machines][fields][1]=documentId`

        if (machineId) {
          url += `&filters[machines][documentId][$eq]=${machineId}`
        }

        // Use API token from environment, not admin JWT
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
          }
        })

        if (res.status === 401 || res.status === 403) {
          // Session expired - clear cookie and redirect to login
          document.cookie = 'jwt=; path=/; max-age=0'
          window.location.href = '/kalendarz/login'
          return
        }

        if (!res.ok) throw new Error('Failed to fetch bookings')

        const data = await res.json()
        const transformedEvents = data.data.map(transformBookingToEvent)
        setEvents(transformedEvents)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [machineId])

  // Transform Strapi booking to FullCalendar event
  function transformBookingToEvent(booking: any): BookingEvent {
    const machineNames = booking.machines?.map((m: any) => m.name).join(', ') || 'Brak pojazdu'
    const pickupTime = booking.pickupTime || '10:00'
    const returnTime = booking.returnTime || '18:00'

    return {
      id: booking.documentId,
      title: `${booking.bookingReference || '#' + booking.documentId.slice(0, 8)} - ${booking.customerName}`,
      start: booking.startDate,
      end: booking.endDate,
      backgroundColor: getColorByStatus(booking.bookingStatus),
      borderColor: getColorByStatus(booking.bookingStatus),
      allDay: false,
      extendedProps: {
        bookingReference: booking.bookingReference,
        customerName: booking.customerName,
        phone: booking.phone,
        email: booking.email,
        status: booking.bookingStatus,
        machines: booking.machines || [],
        pickupTime,
        returnTime,
        totalPrice: booking.totalPrice
      }
    }
  }

  function getColorByStatus(status: string) {
    switch(status) {
      case 'confirmed': return '#28a745'
      case 'pending': return '#ffc107'
      case 'cancelled': return '#dc3545'
      default: return '#6c757d'
    }
  }

  function handleMachineChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newMachineId = e.target.value
    const params = new URLSearchParams()
    if (newMachineId) {
      params.set('machine', newMachineId)
    }
    router.push(`/kalendarz?${params.toString()}`)
  }

  function handleEventClick(info: any) {
    const bookingId = info.event.id
    window.open(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/admin/content-manager/collection-types/api::booking.booking/${bookingId}`,
      '_blank'
    )
  }

  function handleAddBooking() {
    window.open(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/admin/content-manager/collection-types/api::booking.booking/create`,
      '_blank'
    )
  }

  function renderEventContent(eventInfo: any) {
    return (
      <div className="fc-event-main-frame">
        <div className="fc-event-time">{eventInfo.timeText}</div>
        <div className="fc-event-title-container">
          <div className="fc-event-title fc-sticky">
            <strong>{eventInfo.event.title}</strong>
            <br />
            <small>{eventInfo.event.extendedProps.machines?.map((m: any) => m.name).join(', ')}</small>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Błąd ładowania rezerwacji: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Spróbuj ponownie
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with filter and add button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-2">
          <label htmlFor="machine-filter" className="font-medium text-gray-700">
            Filtruj według pojazdu:
          </label>
          <select
            id="machine-filter"
            value={machineId}
            onChange={handleMachineChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent"
          >
            <option value="">Wszystkie pojazdy ({events.length})</option>
            {machines.map(machine => (
              <option key={machine.documentId} value={machine.documentId}>
                {machine.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddBooking}
          className="px-6 py-2 bg-[#253551] text-white rounded-lg hover:bg-[#1a2a3f] transition-colors font-medium"
        >
          + Dodaj rezerwację
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#253551]"></div>
          <p className="mt-4 text-gray-600">Ładowanie rezerwacji...</p>
        </div>
      )}

      {/* Calendar */}
      {!loading && (
        <div className="bg-white rounded-lg shadow p-4">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            buttonText={{
              today: 'Dziś',
              month: 'Miesiąc',
              week: 'Tydzień',
              day: 'Dzień'
            }}
            events={events}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            locale={plLocale}
            firstDay={1}
            height="auto"
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={false}
            nowIndicator={true}
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Saturday
              startTime: '08:00',
              endTime: '20:00'
            }}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
          />
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold text-gray-700 mb-3">Legenda statusów:</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500"></div>
            <span className="text-sm">Oczekuje na wpłatę</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-sm">Potwierdzona</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-sm">Anulowana</span>
          </div>
        </div>
      </div>
    </div>
  )
}
