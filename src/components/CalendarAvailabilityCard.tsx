'use client'

import { useState, useEffect } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { addMonths, subMonths } from 'date-fns'
import { pl } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import Link from 'next/link'

registerLocale('pl', pl)

interface CalendarAvailabilityCardProps {
  machineId: string
  machineName: string
  machineSlug: string
  cardPhoto: string | null
  machineType: string
}

export default function CalendarAvailabilityCard({
  machineId,
  machineName,
  machineSlug,
  cardPhoto,
  machineType,
}: CalendarAvailabilityCardProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [excludedDates, setExcludedDates] = useState<Date[]>([])
  const [returnDates, setReturnDates] = useState<Record<string, string>>({})
  const [isLoadingDates, setIsLoadingDates] = useState(true)

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        setIsLoadingDates(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bookings/unavailable-dates/${machineId}`
        )
        if (response.ok) {
          const data = await response.json()
          setExcludedDates(data.unavailableDates.map((d: string) => new Date(d)))
          setReturnDates(data.returnDates || {})
        }
      } catch (error) {
        console.error('Error fetching unavailable dates:', error)
      } finally {
        setIsLoadingDates(false)
      }
    }

    fetchUnavailableDates()
  }, [machineId])

  const typeLabel = machineType === 'camper' ? 'FREE' : 'FUN'
  const typeColor = machineType === 'camper' ? 'bg-[#2d5016] text-white' : 'bg-[#253551] text-white'

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      {/* Photo */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {cardPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cardPhoto}
            alt={machineName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        )}
        <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full ${typeColor}`}>
          {typeLabel}
        </span>
      </div>

      {/* Name */}
      <div className="px-4 pt-4 pb-2">
        <h3 className="text-lg font-bold text-[#253551]">{machineName}</h3>
      </div>

      {/* Calendar */}
      <div className="px-4 pb-4 flex-1 flex flex-col">
        <div className="bg-gray-50 rounded-lg p-3">
          {/* Navigation header */}
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Poprzedni miesiąc"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <span className="text-sm font-semibold text-[#253551] capitalize">
              {currentMonth.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Następny miesiąc"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          {/* DatePicker inline — read-only, 1 month */}
          <div className="date-picker-wrapper availability-calendar">
            {isLoadingDates ? (
              <div className="text-center py-6 text-gray-400 text-sm">
                Ładowanie...
              </div>
            ) : (
              <DatePicker
                selected={null}
                onChange={() => {/* read-only */}}
                inline
                monthsShown={1}
                openToDate={currentMonth}
                excludeDates={excludedDates}
                locale="pl"
                calendarClassName="custom-calendar"
                key={currentMonth.toISOString()}
                dayClassName={(date) => {
                  const isExcluded = excludedDates.some(
                    (d) =>
                      d.getFullYear() === date.getFullYear() &&
                      d.getMonth() === date.getMonth() &&
                      d.getDate() === date.getDate()
                  )
                  if (isExcluded) return 'booked-date'

                  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                  if (returnDates[dateStr]) return 'return-date'

                  return ''
                }}
                renderDayContents={(day) => <span>{day}</span>}
              />
            )}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-2 text-xs text-gray-500 justify-center">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-red-100 inline-block border border-red-200"></span>
              Zajęty
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm inline-block border border-gray-200" style={{ background: 'linear-gradient(to bottom right, #fee2e2 50%, white 50%)' }}></span>
              Powrót
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-white inline-block border border-gray-200"></span>
              Wolny
            </span>
          </div>
        </div>

        {/* CTA button */}
        <Link
          href={`/fleet/${machineSlug}`}
          className="mt-4 block text-center bg-[#253551] text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-[#1a2740] transition-colors"
        >
          Zarezerwuj →
        </Link>
      </div>
    </div>
  )
}
