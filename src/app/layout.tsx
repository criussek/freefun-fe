import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiSingle } from '@/types/strapi'
import { fromStrapiSiteSettings } from '@/lib/adapters/site-setting'
import { POP_SITE_SETTINGS } from '@/lib/populate'

export const metadata: Metadata = {
  title: '3FUN - Premium Campervan Rentals',
  description: 'Bringing people closer to the wonder of nature',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch site settings from Strapi
  const siteSettingsRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/site-setting', {
    params: POP_SITE_SETTINGS,
    revalidate: 3600, // Cache for 1 hour
  })

  const siteSettings = siteSettingsRes?.data ? fromStrapiSiteSettings(siteSettingsRes.data) : undefined

  return (
    <html lang="en">
      <body>
        <Navbar siteSettings={siteSettings} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
