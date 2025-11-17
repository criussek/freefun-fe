'use client'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section className="max-w-[1200px] mx-auto px-[3vw] py-20 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="mb-6">Stay connected</h2>
        <p className="text-lg mb-8">
          Join our mailing list for travel tips, adventure inspiration, and exclusive offers.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-walden-green"
            required
          />
          <button
            type="submit"
            className="btn-primary whitespace-nowrap"
          >
            SUBSCRIBE
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-[#2d5016]">Thanks for subscribing!</p>
        )}
      </div>
    </section>
  )
}
