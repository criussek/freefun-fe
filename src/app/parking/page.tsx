import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiSingle } from '@/types/strapi'
import { fromStrapiParkingPage } from '@/lib/adapters/parking-page'
import { POP_PARKING_PAGE } from '@/lib/populate'
import PageHero from '@/components/walden/PageHero'

export default async function ParkingPage() {
  // Fetch parking page data
  const parkingPageRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/parking', {
    params: POP_PARKING_PAGE,
    revalidate: 3600,
  })

  const parkingPage = parkingPageRes?.data ? fromStrapiParkingPage(parkingPageRes.data) : undefined

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHero
        title={parkingPage?.pageTitle || 'Parking'}
        description={parkingPage?.pageDescription || ''}
        backgroundImage={parkingPage?.pageImage || null}
      />

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview */}
          {parkingPage?.pageOverview && (
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: parkingPage.pageOverview }} />
          )}
        </div>
      </section>
    </main>
  )
}
