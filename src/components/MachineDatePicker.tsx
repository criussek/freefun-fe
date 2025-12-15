'use client'

import { useState, useEffect } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { addMonths, subMonths, differenceInDays } from 'date-fns'
import { pl } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Season,
  Machine,
  getMinimumEndDate,
  getSeasonForDate,
  calculateTotalPrice,
  getMinimumDaysRequired
} from '@/lib/seasons'

// Register Polish locale
registerLocale('pl', pl)

interface MachineDatePickerProps {
  machineId: string
  machineName: string
  pricePerDay?: number
  serviceFee?: number
  depositFee?: number
  minRentalDays?: number
}

interface FormData {
  firstname: string
  lastname: string
  email: string
  phone: string
}

interface FormErrors {
  firstname?: string
  lastname?: string
  email?: string
  phone?: string
}

export default function MachineDatePicker({ machineId, machineName, pricePerDay, serviceFee, depositFee, minRentalDays }: MachineDatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [excludedDates, setExcludedDates] = useState<Date[]>([])
  const [isLoadingDates, setIsLoadingDates] = useState(true)
  const [seasons, setSeasons] = useState<Season[]>([])
  const [isLoadingSeasons, setIsLoadingSeasons] = useState(true)
  const [defaultPickupTime, setDefaultPickupTime] = useState('10:00')
  const [defaultReturnTime, setDefaultReturnTime] = useState('18:00')
  const [monthsShown, setMonthsShown] = useState(2)
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Update months shown based on screen size
  useEffect(() => {
    const updateMonthsShown = () => {
      setMonthsShown(window.innerWidth < 768 ? 1 : 2)
    }

    updateMonthsShown()
    window.addEventListener('resize', updateMonthsShown)
    return () => window.removeEventListener('resize', updateMonthsShown)
  }, [])

  // Fetch unavailable dates when component mounts
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        setIsLoadingDates(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bookings/unavailable-dates/${machineId}`
        )

        if (response.ok) {
          const data = await response.json()
          // Convert date strings to Date objects
          const dates = data.unavailableDates.map((dateStr: string) => new Date(dateStr))
          setExcludedDates(dates)
        }
      } catch (error) {
        console.error('Error fetching unavailable dates:', error)
      } finally {
        setIsLoadingDates(false)
      }
    }

    fetchUnavailableDates()
  }, [machineId])

  // Fetch seasons when component mounts
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        setIsLoadingSeasons(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/seasons`
        )

        if (response.ok) {
          const data = await response.json()
          setSeasons(data.data || [])
        }
      } catch (error) {
        console.error('Error fetching seasons:', error)
      } finally {
        setIsLoadingSeasons(false)
      }
    }

    fetchSeasons()
  }, [])

  // Fetch site settings for default times
  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/site-setting`
        )

        if (response.ok) {
          const data = await response.json()
          if (data.data) {
            setDefaultPickupTime(data.data.defaultPickupTime || '10:00')
            setDefaultReturnTime(data.data.defaultReturnTime || '18:00')
          }
        }
      } catch (error) {
        console.error('Error fetching site settings:', error)
      }
    }

    fetchSiteSettings()
  }, [])

  // Create machine object for season calculations
  const machine: Machine = {
    documentId: machineId,
    name: machineName,
    basePricePerDay: pricePerDay || 0,
    minRentalDays: minRentalDays
  }

  // Filter function to disable invalid end dates based on minimum days
  const filterDate = (date: Date): boolean => {
    // Allow all dates if no start date selected yet
    if (!startDate) return true

    // Allow all dates if range is already complete (both dates selected)
    // This allows user to select a new range
    if (endDate) return true

    // Normalize dates to midnight for comparison (ignore time)
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())

    // If date is before or equal to start date, allow it (user can change start date)
    if (dateOnly <= startDateOnly) return true

    // If date is after start date, enforce minimum days requirement for end date
    const minEndDate = getMinimumEndDate(startDate, seasons, [machine])
    const minEndDateOnly = new Date(minEndDate.getFullYear(), minEndDate.getMonth(), minEndDate.getDate())
    return dateOnly >= minEndDateOnly
  }

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Form validation
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'firstname':
        return value.trim() === '' ? 'Imię jest wymagane' : undefined
      case 'lastname':
        return value.trim() === '' ? 'Nazwisko jest wymagane' : undefined
      case 'phone':
        if (value.trim() === '') {
          return 'Telefon jest wymagany'
        }
        // Allow only digits, spaces, dashes, plus sign, and parentheses
        const phoneRegex = /^[\d\s\-+()]+$/
        if (!phoneRegex.test(value)) {
          return 'Numer telefonu może zawierać tylko cyfry, spacje, myślniki i znak +'
        }
        // Check if there are at least 9 digits
        const digitsOnly = value.replace(/[\s\-+()]/g, '')
        if (digitsOnly.length < 9) {
          return 'Numer telefonu musi zawierać minimum 9 cyfr'
        }
        return undefined
      case 'email':
        if (value.trim() === '') {
          return 'Email jest wymagany'
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? 'Nieprawidłowy format email' : undefined
      default:
        return undefined
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleFormBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const error = validateField(name as keyof FormData, value)
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.firstname.trim() !== '' &&
      formData.lastname.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      !errors.firstname &&
      !errors.lastname &&
      !errors.email &&
      !errors.phone
    )
  }

  // Calculate number of days (inclusive, matching backend logic)
  const calculateDays = () => {
    if (!startDate || !endDate) return 0
    // Add 1 to include both start and end dates (e.g., Thu to Sun = 4 days)
    return differenceInDays(endDate, startDate) + 1
  }

  // Calculate prices with season awareness
  const days = calculateDays()
  let rentalPrice = 0
  let activeSeason: Season | null = null

  if (startDate && endDate && pricePerDay) {
    const pricing = calculateTotalPrice([machine], startDate, endDate, seasons)
    rentalPrice = pricing.totalPrice
    // Check if start date is in a season for display
    activeSeason = getSeasonForDate(startDate, seasons)
  }

  const totalPrice = rentalPrice + (serviceFee || 0)
  const depositAmount = totalPrice * 0.5 // 50% deposit

  // Get minimum days required for validation message
  const minDaysRequired = startDate ? getMinimumDaysRequired(startDate, seasons, [machine]) : 1

  // Calculate payment due date (today + 24 hours)
  const paymentDueDate = new Date()
  paymentDueDate.setDate(paymentDueDate.getDate() + 1)

  // Handle booking submission
  const handleSubmit = async () => {
    if (!isFormValid() || !startDate || !endDate) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            machines: [machineId],
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            customerName: `${formData.firstname} ${formData.lastname}`,
            email: formData.email,
            phone: formData.phone,
            pickupTime: defaultPickupTime,
            returnTime: defaultReturnTime,
            createdFrom: 'web'
          }
        })
      })

      const data = await response.json()

      if (response.ok && data.data) {
        // Redirect to checkout page
        window.location.href = `/booking/${data.data.documentId}`
      } else {
        throw new Error(data.error?.message || 'Nie udało się utworzyć rezerwacji')
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Wystąpił błąd')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-[#253551] mb-4 md:mb-6">Wybierz daty rezerwacji:</h2>

      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
        {/* Custom Header with Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Poprzedni miesiąc"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="text-lg font-semibold text-[#253551]">
            Wybierz daty
          </div>

          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Następny miesiąc"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* DatePicker with two months */}
        <div className="date-picker-wrapper">
          {isLoadingDates ? (
            <div className="text-center py-8 text-gray-500">
              Ładowanie dostępnych dat...
            </div>
          ) : (
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              monthsShown={monthsShown}
              minDate={new Date()}
              excludeDates={excludedDates}
              filterDate={filterDate}
              openToDate={currentMonth}
              calendarClassName="custom-calendar"
              locale="pl"
              key={`${currentMonth.toISOString()}-${monthsShown}`}
              dayClassName={(date) => {
                // Check if this date is in the excluded dates
                const isExcluded = excludedDates.some(
                  (excludedDate) =>
                    excludedDate.getFullYear() === date.getFullYear() &&
                    excludedDate.getMonth() === date.getMonth() &&
                    excludedDate.getDate() === date.getDate()
                )
                return isExcluded ? 'booked-date' : ''
              }}
            />
          )}
        </div>

        {/* Selected dates display */}
        {(startDate || endDate) && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data rozpoczęcia:
                </label>
                <div className="text-lg font-semibold text-[#253551]">
                  {startDate ? startDate.toLocaleDateString('pl-PL') : '-'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data zakończenia:
                </label>
                <div className="text-lg font-semibold text-[#253551]">
                  {endDate ? endDate.toLocaleDateString('pl-PL') : '-'}
                </div>
              </div>
            </div>

            {/* Price calculations */}
            {startDate && endDate && pricePerDay && days > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-[#253551] mb-4">
                  Podsumowanie kosztów:
                </h3>

                {/* Season information */}
                {activeSeason && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-800 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      <span className="font-medium">{activeSeason.name}</span>
                    </div>
                    {minDaysRequired > 1 && (
                      <div className="text-xs text-blue-700 mt-1">
                        Minimalny czas wynajmu: {minDaysRequired} {minDaysRequired === 1 ? 'dzień' : minDaysRequired < 5 ? 'dni' : 'dni'}
                      </div>
                    )}
                  </div>
                )}

                {/* Price breakdown */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Wynajem ({days} {days === 1 ? 'dzień' : days < 5 ? 'dni' : 'dni'})</span>
                    <span className="font-semibold">{rentalPrice.toFixed(2)} zł</span>
                  </div>
                  {serviceFee !== undefined && serviceFee > 0 && (
                    <div className="flex justify-between items-center text-gray-700">
                      <div className="flex items-center gap-2">
                        <span>Opłata serwisowa</span>
                        <div className="relative group">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-500 cursor-help"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                          <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            Ta opłata pokrywa przygotowanie i dezynfekcję jednostki przed każdym wynajmem.
                            <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      </div>
                      <span className="font-semibold">{serviceFee.toFixed(2)} zł</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-[#253551]">Razem:</span>
                    <span className="text-2xl font-bold text-[#253551]">{totalPrice.toFixed(2)} zł</span>
                  </div>
                </div>

                {/* Payment due */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">Do zapłaty do {paymentDueDate.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('.').join('.')} {paymentDueDate.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })} (zaliczka 50%)</span>
                      <div className="relative group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-500 cursor-help"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                          Ta kwota musi być wpłacona przed tą datą, aby potwierdzić rezerwację. Jeśli nie zostanie wpłacona, rezerwacja zostanie usunięta.
                          <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-[#253551] text-lg">{depositAmount.toFixed(2)} zł</span>
                  </div>

                  {/* Deposit Fee */}
                  {depositFee !== undefined && depositFee > 0 && (
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700">Kaucja</span>
                        <div className="relative group">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-500 cursor-help"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                          <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            Kaucja zabezpieczająca pobierana z góry w celu pokrycia ewentualnych szkód podczas wynajmu. Jest w pełni zwracana po bezpiecznym zwrocie sprzętu.
                            <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      </div>
                      <span className="font-semibold text-[#253551]">{depositFee.toFixed(2)} zł</span>
                    </div>
                  )}
                </div>

                {/* Booking Form */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-[#253551] mb-4">
                    Twoje dane
                  </h3>

                  <div className="space-y-4">
                    {/* First Row: First Name and Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* First Name */}
                      <div>
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">
                          Imię *
                        </label>
                        <input
                          type="text"
                          id="firstname"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleFormChange}
                          onBlur={handleFormBlur}
                          placeholder="Wpisz swoje imię"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent transition-colors ${
                            errors.firstname ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.firstname && (
                          <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div>
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">
                          Nazwisko *
                        </label>
                        <input
                          type="text"
                          id="lastname"
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleFormChange}
                          onBlur={handleFormBlur}
                          placeholder="Wpisz swoje nazwisko"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent transition-colors ${
                            errors.lastname ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.lastname && (
                          <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>
                        )}
                      </div>
                    </div>

                    {/* Second Row: Email and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          onBlur={handleFormBlur}
                          placeholder="Wpisz swój adres email"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent transition-colors ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          onBlur={handleFormBlur}
                          placeholder="np. +48 123 456 789"
                          inputMode="tel"
                          pattern="[\d\s\-+()]+"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent transition-colors ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {startDate && endDate && (
              <>
                {submitError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {submitError}
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  className="btn-secondary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isFormValid() || isSubmitting}
                >
                  {isSubmitting ? 'Tworzenie rezerwacji...' : 'Rezerwuj teraz'}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        .date-picker-wrapper {
          display: flex;
          justify-content: center;
        }

        .custom-calendar {
          border: none !important;
          font-family: inherit;
        }

        .react-datepicker {
          border: none !important;
          display: flex !important;
          gap: 0;
          justify-content: center;
          align-items: flex-start;
        }

        .react-datepicker__month-container {
          flex: 0 0 auto;
          padding: 0 2rem;
          border-right: 1px solid #e5e7eb;
        }

        .react-datepicker__month-container:first-child {
          padding-left: 0;
        }

        .react-datepicker__month-container:last-child {
          border-right: none;
          padding-right: 0;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .react-datepicker__month-container {
            padding: 0;
            border-right: none;
          }

          .react-datepicker__day-name,
          .react-datepicker__day {
            width: 2.25rem;
            line-height: 2.25rem;
          }
        }

        .react-datepicker__header {
          background-color: white !important;
          border-bottom: 1px solid #e5e7eb !important;
          padding-top: 1rem;
        }

        .react-datepicker__current-month {
          font-size: 1rem;
          font-weight: 600;
          color: #253551;
          margin-bottom: 0.5rem;
        }

        .react-datepicker__day-names {
          margin-top: 0.5rem;
        }

        .react-datepicker__day-name {
          color: #6b7280;
          font-weight: 500;
          font-size: 0.875rem;
          width: 2.5rem;
          line-height: 2.5rem;
        }

        .react-datepicker__day {
          width: 2.5rem;
          line-height: 2.5rem;
          margin: 0.125rem;
          border-radius: 0.375rem;
          color: #374151;
          font-weight: 500;
        }

        .react-datepicker__day:hover {
          background-color: #f3f4f6;
          border-radius: 0.375rem;
        }

        .react-datepicker__day--selected,
        .react-datepicker__day--in-range,
        .react-datepicker__day--in-selecting-range {
          background-color: #253551 !important;
          color: white !important;
          border-radius: 0.375rem;
        }

        .react-datepicker__day--range-start,
        .react-datepicker__day--range-end {
          background-color: #253551 !important;
          color: white !important;
          border-radius: 0.375rem;
        }

        .react-datepicker__day--keyboard-selected {
          background-color: #e5e7eb;
          color: #374151;
        }

        .react-datepicker__day--disabled {
          color: #d1d5db !important;
          cursor: not-allowed;
          position: relative;
        }

        .react-datepicker__day--disabled:hover {
          background-color: transparent !important;
        }

        .booked-date {
          background-color: #fee2e2 !important;
          color: #991b1b !important;
          text-decoration: line-through;
          cursor: not-allowed;
          position: relative;
        }

        .booked-date:hover::after {
          content: 'Ten termin jest już zarezerwowany';
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #1f2937;
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          white-space: nowrap;
          z-index: 1000;
          margin-bottom: 0.25rem;
          pointer-events: none;
        }

        .booked-date:hover::before {
          content: '';
          position: absolute;
          top: -0.25rem;
          left: 50%;
          transform: translateX(-50%);
          border-left: 0.25rem solid transparent;
          border-right: 0.25rem solid transparent;
          border-top: 0.25rem solid #1f2937;
          z-index: 1000;
          pointer-events: none;
        }

        .react-datepicker__day--today {
          font-weight: 700;
          color: #253551;
        }

        .react-datepicker__navigation {
          display: none;
        }
      `}</style>
    </div>
  )
}
