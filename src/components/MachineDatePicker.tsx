'use client'

import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { addMonths, subMonths } from 'date-fns'
import { pl } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

// Register Polish locale
registerLocale('pl', pl)

interface MachineDatePickerProps {
  machineName: string
  pricePerDay?: number
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

export default function MachineDatePicker({ machineName, pricePerDay }: MachineDatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

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
        return value.trim() === '' ? 'Telefon jest wymagany' : undefined
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

  // Calculate number of days
  const calculateDays = () => {
    if (!startDate || !endDate) return 0
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Calculate prices
  const days = calculateDays()
  const totalPrice = pricePerDay ? pricePerDay * days : 0
  const depositAmount = totalPrice * 0.5 // 50% deposit

  // Calculate payment due date (today + 7 days)
  const paymentDueDate = new Date()
  paymentDueDate.setDate(paymentDueDate.getDate() + 7)

  return (
    <div className="bg-gray-50 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-[#253551] mb-6">Wybierz daty rezerwacji:</h2>

      <div className="bg-white rounded-lg p-6 shadow-sm">
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
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            monthsShown={2}
            minDate={new Date()}
            openToDate={currentMonth}
            calendarClassName="custom-calendar"
            locale="pl"
            key={currentMonth.toISOString()}
          />
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

                {/* Price breakdown */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center text-gray-700">
                    <span>{pricePerDay.toFixed(2)} zł × {days} {days === 1 ? 'dzień' : days < 5 ? 'dni' : 'dni'}</span>
                    <span className="font-semibold">{totalPrice.toFixed(2)} zł</span>
                  </div>
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
                      <span className="text-gray-700">Do zapłaty do {paymentDueDate.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' })}</span>
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
                          placeholder="Wpisz swój numer telefonu"
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
              <button
                className="btn-secondary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isFormValid()}
              >
                Rezerwuj teraz
              </button>
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
        }

        .react-datepicker__day--disabled:hover {
          background-color: transparent !important;
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
