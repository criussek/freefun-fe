'use client'
import { useState } from 'react'
import Link from 'next/link'
import { SiteSettings } from '@/types/domain'

interface FooterProps {
  siteSettings?: SiteSettings
}

export default function Footer({ siteSettings }: FooterProps) {
  const [email, setEmail] = useState('')
  const currentYear = new Date().getFullYear()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Email submitted:', email)
    setEmail('')
  }

  const footerLinks = siteSettings?.footerLinks && siteSettings.footerLinks.length > 0
    ? siteSettings.footerLinks
    : [
        { label: 'Partnerships', url: '/partnerships' },
        { label: 'Purchase a van', url: '/buy-a-van' },
        { label: 'Terms & Conditions', url: '/terms' },
        { label: 'COVID-19', url: '/covid19' },
        { label: 'Contact', url: '/contact' },
        { label: 'Gift Cards', url: '/gift-cards' },
        { label: 'Special Events', url: '/special-events' },
        { label: 'Work at 3FUN', url: '/work-at-3fun' },
      ]

  const socialLinks = siteSettings?.socialLinks || []

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
          {/* Site Title and Tagline - Full Width */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold">
              {siteSettings?.siteTitle || '3FUN'}
              {siteSettings?.tagline && (
                <span className="text-lg opacity-80 ml-3 font-normal">{siteSettings.tagline}</span>
              )}
            </h2>
          </div>

          {/* Horizontal Rule - Full Width */}
          <hr className="border-white opacity-30 mb-8" />

          {/* Two Column Layout */}
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - 7 span */}
            <div className="col-span-12 lg:col-span-7">
              {/* Newsletter Section */}
              <div>
                <h3 className="text-2xl mb-6">Dołącz do przygody</h3>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="mb-8">
                  <div className="mb-4">
                    <label htmlFor="footer-email" className="block text-sm mb-2">
                      Zostaw swój email, aby otrzymywać inspiracje podróżnicze i aktualizacje 3FUN
                    </label>
                    <input
                      type="email"
                      id="footer-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border-b border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900"
                      placeholder=""
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-white text-black px-6 py-2 font-bold hover:bg-gray-100 transition-all text-sm"
                  >
                    Zapisz się
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column - 5 span */}
            <div className="col-span-12 lg:col-span-5">
            <div className="grid grid-cols-5 gap-4">
              {/* Links Column - 2 span */}
              <div className="col-span-3 lg:col-span-2">
                <p className="font-bold mb-3">Linki</p>
                <div className="space-y-2 text-sm">
                  {footerLinks.map((link, index) => (
                    <p key={index}>
                      <Link href={link.url} className="hover:opacity-70 transition-opacity">
                        {link.label}
                      </Link>
                    </p>
                  ))}
                </div>
              </div>

              {/* Social Media Column - 3 span */}
              <div className="col-span-2 lg:col-span-3">
                <p className="font-bold mb-3">Social Media</p>
                <div className="space-y-2 text-sm">
                  {socialLinks.map((link, index) => (
                    <p key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-70 transition-opacity"
                      >
                        {link.label}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            </div>

              {/* Copyright */}
              <div className="mt-8 text-sm space-y-1">
                <p>© {currentYear} 3FUN</p>
                <p>
                  Stworzone przez:{' '}
                  <a
                    href="https://digital.bydefault.ovh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity underline"
                  >
                    Digital by Default
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
