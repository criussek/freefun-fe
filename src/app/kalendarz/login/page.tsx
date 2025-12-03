'use client'

import { useState } from 'react'

export default function KalendarzLoginPage() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Login using Strapi's Users & Permissions plugin
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password })
        }
      )

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error?.message || 'Nieprawidłowe dane logowania')
      }

      const data = await res.json()
      const token = data.jwt

      if (!token) {
        throw new Error('Nie otrzymano tokenu autoryzacji')
      }

      // Set cookie with JWT token
      const maxAge = 7 * 24 * 60 * 60 // 7 days in seconds
      const secure = window.location.protocol === 'https:' ? '; Secure' : ''
      document.cookie = `jwt=${token}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`

      // Redirect to calendar
      window.location.href = '/kalendarz'
    } catch (err) {
      console.error('Login error:', err)
      setError(err instanceof Error ? err.message : 'Błąd logowania')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-[#253551] mb-6 text-center">
          Kalendarz Rezerwacji
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Zaloguj się aby uzyskać dostęp
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hasło
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-[#253551] text-white rounded-lg hover:bg-[#1a2a3f] transition-colors font-medium disabled:opacity-50"
          >
            {loading ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Użyj tych samych danych co do panelu admin Strapi</p>
        </div>
      </div>
    </div>
  )
}
