'use client'

import { useState, useRef } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

interface FormData {
  firstname: string
  lastname: string
  phone: string
  email: string
  description: string
}

interface FormErrors {
  firstname?: string
  lastname?: string
  phone?: string
  email?: string
  description?: string
}

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    description: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const turnstileRef = useRef<any>(null)

  // Real-time validation
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
      case 'description':
        return value.trim() === '' ? 'Opis jest wymagany' : undefined
      default:
        return undefined
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    // Clear status messages when user modifies form
    if (status === 'sent' || status === 'error') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name as keyof FormData, value)
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    Object.keys(formData).forEach((key) => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData])
      if (error) {
        newErrors[key as keyof FormErrors] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    if (!validateForm()) {
      return
    }

    // Check Turnstile token
    if (!turnstileToken) {
      setStatus('error')
      setErrorMessage('Proszę zweryfikować, że nie jesteś robotem')
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('sent')
        // Reset form
        setFormData({
          firstname: '',
          lastname: '',
          phone: '',
          email: '',
          description: '',
        })
        setErrors({})
        setTurnstileToken('')
        // Reset Turnstile widget
        if (turnstileRef.current) {
          turnstileRef.current.reset()
        }
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Nie udało się wysłać wiadomości')
        // Reset Turnstile on error
        setTurnstileToken('')
        if (turnstileRef.current) {
          turnstileRef.current.reset()
        }
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Wystąpił błąd podczas wysyłania wiadomości')
      // Reset Turnstile on error
      setTurnstileToken('')
      if (turnstileRef.current) {
        turnstileRef.current.reset()
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Wpisz swoje imię"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent transition-colors ${
            errors.firstname ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={status === 'sending'}
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
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Wpisz swoje nazwisko"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent transition-colors ${
            errors.lastname ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={status === 'sending'}
        />
        {errors.lastname && (
          <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>
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
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Wpisz swój numer telefonu"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent transition-colors ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={status === 'sending'}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

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
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Wpisz swój adres email"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent transition-colors ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={status === 'sending'}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Wiadomość *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Wpisz swoją wiadomość"
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent transition-colors resize-none ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={status === 'sending'}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      {/* Cloudflare Turnstile */}
      <div className="flex justify-center">
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
          onSuccess={(token) => setTurnstileToken(token)}
          onError={() => {
            setTurnstileToken('')
            setStatus('error')
            setErrorMessage('Weryfikacja nie powiodła się. Spróbuj ponownie.')
          }}
          onExpire={() => setTurnstileToken('')}
        />
      </div>

      {/* Status Messages */}
      {status === 'sending' && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-center">Wysyłanie wiadomości...</p>
        </div>
      )}

      {status === 'sent' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-center">Wiadomość została wysłana pomyślnie!</p>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-center">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#253551] text-white font-medium py-4 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Wysyłanie...' : 'Wyślij wiadomość'}
      </button>
    </form>
  )
}
