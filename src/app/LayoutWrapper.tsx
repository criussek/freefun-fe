'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface LayoutWrapperProps {
  children: React.ReactNode
  siteSettings?: any
}

export default function LayoutWrapper({ children, siteSettings }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isKalendarzRoute = pathname?.startsWith('/kalendarz')

  // Policy pages should have black navbar with opacity
  const isPolicyPage = pathname === '/privacy-policy' ||
                        pathname === '/cookies-policy' ||
                        pathname === '/terms-and-conditions' ||
                        pathname === '/polityka-prywatnosci' ||
                        pathname === '/polityka-cookies' ||
                        pathname === '/regulamin-rezerwacji'

  const navbarVariant = isPolicyPage ? 'black' : 'transparent'

  return (
    <>
      {!isKalendarzRoute && <Navbar siteSettings={siteSettings} variant={navbarVariant} />}
      {children}
      {!isKalendarzRoute && <Footer siteSettings={siteSettings} />}
    </>
  )
}
