'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Facebook, Instagram, Phone } from 'lucide-react'
import { SiteSettings } from '@/types/domain'
import logo from '@/media/3fun_logo.svg'
import bgLogo from '@/media/bg-logo.png'

interface NavbarProps {
  siteSettings?: SiteSettings
  variant?: 'transparent' | 'black'
}

export default function Navbar({ siteSettings, variant = 'transparent' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Use site settings data or fallback to defaults
  const logoUrl = siteSettings?.logo || logo.src
  const secondaryLogoUrl = siteSettings?.secondaryLogo || bgLogo.src
  const contactPhone = siteSettings?.contactPhone || '+48 123 456 789'

  const navigation = siteSettings?.navbarLinks && siteSettings.navbarLinks.length > 0
    ? siteSettings.navbarLinks
    : [
        { label: 'Home', url: '/' },
        { label: 'The fleet', url: '/fleet' },
        { label: 'Rates', url: '/rates' },
        { label: 'Our story', url: '/about' },
        { label: 'Trip Planning', url: '/trip-planning' },
        { label: 'FAQs', url: '/faq' },
      ]

  // Find Facebook and Instagram links from socialLinks
  const facebookLink = siteSettings?.socialLinks?.find(link =>
    link.label.toLowerCase().includes('facebook')
  )?.url || 'https://www.facebook.com/3FUN'

  const instagramLink = siteSettings?.socialLinks?.find(link =>
    link.label.toLowerCase().includes('instagram')
  )?.url || 'https://www.instagram.com/3FUN'

  const navClasses = variant === 'black'
    ? "fixed top-0 left-0 right-0 z-50 bg-black/80 shadow-md"
    : "absolute top-0 left-0 right-0 z-50"

  return (
    <nav className={navClasses}>
      <div className="w-full px-[2.6vw]">
        <div className="flex items-center justify-between">
          {/* Left Side - Social Icons and Phone */}
          <div className="hidden lg:flex items-center space-x-6 flex-1">
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a
                href={facebookLink}
                target="_blank"
                rel="nofollow"
                className="text-white hover:opacity-70 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href={instagramLink}
                target="_blank"
                rel="nofollow"
                className="text-white hover:opacity-70 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>

            {/* Phone Number */}
            <div className="flex items-center space-x-2 pl-6 border-l-2 border-white/30">
              <Phone size={24} className="text-white" />
              <a
                href={`tel:${contactPhone}`}
                className="text-white hover:opacity-70 transition-opacity text-base font-bold tracking-wider"
              >
                {contactPhone}
              </a>
            </div>
          </div>

          {/* Center - Logo */}
          <div
            className="flex-shrink-0 pb-8 flex flex-col items-center"
            style={{
              backgroundImage: `url(${secondaryLogoUrl})`,
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              minWidth: '550px',
              width: '550px',
            }}
          >
            <div style={{ height: '1rem' }}></div>
            <Link href="/" className="inline-block z-50">
              <img
                src={logoUrl}
                alt="3FUN Logo"
                style={{ width: '380px', height: '380px', marginTop: '-40px', marginLeft: '-6px' }}
              />
            </Link>
          </div>

          {/* Right Side - Navigation Menu */}
          <div className="hidden lg:flex items-center justify-end space-x-8 flex-1">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.url}
                className="text-base font-bold tracking-wider text-white hover:opacity-70 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:opacity-70"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-95 z-40">
          <div className="px-[3vw] pt-32 pb-8">
            {/* Social Icons Mobile */}
            <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-white/20">
              <a
                href={facebookLink}
                target="_blank"
                rel="nofollow"
                className="text-white hover:opacity-70 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href={instagramLink}
                target="_blank"
                rel="nofollow"
                className="text-white hover:opacity-70 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>

            {/* Phone Number Mobile */}
            <a
              href={`tel:${contactPhone}`}
              className="flex items-center space-x-2 mb-6 pb-6 border-b border-white/20 text-white hover:opacity-70"
            >
              <Phone size={20} />
              <span>{contactPhone}</span>
            </a>

            {/* Navigation Links */}
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.url}
                className="block py-4 text-base font-bold text-white hover:opacity-70 border-b border-white/20"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
