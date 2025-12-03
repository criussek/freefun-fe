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

  return (
    <>
      {!isKalendarzRoute && <Navbar siteSettings={siteSettings} />}
      {children}
      {!isKalendarzRoute && <Footer siteSettings={siteSettings} />}
    </>
  )
}
