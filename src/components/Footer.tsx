'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/media/3fun_logo.svg'

export default function Footer() {
  const [email, setEmail] = useState('')
  const currentYear = new Date().getFullYear()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <footer className="relative min-h-[10vh] bg-[#28332e]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800"></div>
        <div className="absolute inset-0 bg-black opacity-15"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-[3vw] py-[calc(10vmax/10)]">
        <div className="text-white">
          {/* Logo - Full Width */}
          <div className="mb-6">
            <Image src={logo} alt="3FUN Logo" width={120} height={40} className="h-10 w-auto" priority />
          </div>

          {/* Horizontal Rule - Full Width */}
          <hr className="border-white opacity-30 mb-8" />

          {/* Two Column Layout */}
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - 7 span */}
            <div className="col-span-12 lg:col-span-7">
              {/* Newsletter Section */}
              <div>
                <h3 className="text-2xl mb-6">Join the adventure</h3>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="mb-8">
                  <div className="mb-4">
                    <label htmlFor="footer-email" className="block text-sm mb-2">
                      Leave your email to receive travel inspiration & 3FUN updates
                    </label>
                    <input
                      type="email"
                      id="footer-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border-b border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900"
                      placeholder=""
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-white text-black px-6 py-2 font-bold hover:bg-gray-100 transition-all text-sm"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column - 5 span */}
            <div className="col-span-12 lg:col-span-5">
            <div className="grid grid-cols-5 gap-4">
              {/* Company Column - 2 span */}
              <div className="col-span-3 lg:col-span-2">
                <p className="font-bold mb-3">Company</p>
                <div className="space-y-2 text-sm">
                  <p><Link href="/partnerships" className="hover:opacity-70 transition-opacity">Partnerships</Link></p>
                  <p><Link href="/buy-a-van" className="hover:opacity-70 transition-opacity">Purchase a van</Link></p>
                  <p><Link href="/terms" className="hover:opacity-70 transition-opacity">Terms & Conditions</Link></p>
                  <p><Link href="/covid19" className="hover:opacity-70 transition-opacity">COVID-19</Link></p>
                  <p><Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link></p>
                  <p><Link href="/gift-cards" className="hover:opacity-70 transition-opacity">Gift Cards</Link></p>
                  <p><Link href="/special-events" className="hover:opacity-70 transition-opacity">Special Events</Link></p>
                  <p><Link href="/work-at-3fun" className="hover:opacity-70 transition-opacity">Work at 3FUN</Link></p>
                </div>
              </div>

              {/* Follow Column - 3 span */}
              <div className="col-span-2 lg:col-span-3">
                <p className="font-bold mb-3">Follow</p>
                <div className="space-y-2 text-sm">
                  <p><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Instagram</a></p>
                </div>
              </div>
            </div>

              {/* Copyright */}
              <div className="mt-8 text-sm">
                <p>© {currentYear} 3FUN, LLC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
