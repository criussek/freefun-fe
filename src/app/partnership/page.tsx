import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiSingle } from '@/types/strapi'
import { fromStrapiPartnershipPage } from '@/lib/adapters/partnership-page'
import { POP_PARTNERSHIP_PAGE } from '@/lib/populate'
import PageHero from '@/components/walden/PageHero'

export default async function PartnershipPage() {
  // Fetch partnership page data
  const partnershipPageRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/partnership', {
    params: POP_PARTNERSHIP_PAGE,
    revalidate: 3600,
  })

  const partnershipPage = partnershipPageRes?.data ? fromStrapiPartnershipPage(partnershipPageRes.data) : undefined

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHero
        title={partnershipPage?.pageTitle || 'Współpraca'}
        description={partnershipPage?.pageDescription || ''}
        backgroundImage={partnershipPage?.pageImage || null}
      />

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview */}
          {partnershipPage?.pageOverview && (
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: partnershipPage.pageOverview }} />
          )}
        </div>
      </section>
    </main>
  )
}
