'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import logo from '@/media/3fun_logo.svg'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: 'The fleet', href: '/fleet' },
    { name: 'Rates', href: '/rates' },
    { name: 'Our story', href: '/about' },
    { name: 'Trip Planning', href: '/trip-planning' },
    { name: 'FAQs', href: '/faq' },
  ]

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      {/* Transparent padding on top */}
      <div className="h-[100px]"></div>

      {/* Black semi-transparent background wrapper */}
      <div className="absolute top-[100px] left-0 right-0 bg-black bg-opacity-50">
        <div className="max-w-[1200px] mx-auto px-[3vw]">
          <div className="flex justify-between items-center py-6">
            {/* Logo */}
            <Link href="/" className="flex items-center z-50">
              <img src={logo.src} alt="3FUN Logo" className="h-40 w-40" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-bold tracking-wider text-white hover:opacity-70 transition-opacity"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="bg-white text-black tracking-wider px-10 py-5 font-bold hover:bg-opacity-80 transition-all"
              >
                Book now
              </Link>
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
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-95 z-40">
          <div className="px-[3vw] pt-32 pb-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-4 text-base font-bold text-white hover:opacity-70 border-b border-white/20"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block mt-8 bg-white text-black px-8 py-4 text-center font-bold hover:bg-opacity-90 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Book now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
