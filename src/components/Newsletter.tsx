'use client'
import { useState } from 'react'
import { Mail } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submission
    if (email) {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('error')
    }
  }

  return (
    <section className="py-16 bg-forest text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-gold/20 p-4 rounded-full">
            <Mail className="text-gold" size={32} />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
          Stay Updated
        </h2>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for exclusive deals, travel tips, and adventure inspiration!
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
            <button
              type="submit"
              className="bg-gold text-forest px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Subscribe
            </button>
          </div>
          {status === 'success' && (
            <p className="mt-3 text-gold">Thanks for subscribing!</p>
          )}
          {status === 'error' && (
            <p className="mt-3 text-red-300">Please enter a valid email.</p>
          )}
        </form>
      </div>
    </section>
  )
}
