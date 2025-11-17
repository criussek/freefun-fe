import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiList, StrapiSingle } from '@/types/strapi'
import { fromStrapiFAQ } from '@/lib/adapters/faq'
import { fromStrapiSiteSettings } from '@/lib/adapters/site-setting'
import { POP_FAQ, POP_SITE_SETTINGS } from '@/lib/populate'
import FAQAccordionPage from '@/components/walden/FAQAccordionPage'
import ContactInfoSidebar from '@/components/walden/ContactInfoSidebar'

export default async function FAQPage() {
  // Fetch FAQs from Strapi
  const faqsRes = await fetchStrapiOrNull<StrapiList<any>>('/api/faqs', {
    params: POP_FAQ,
    revalidate: 60,
  })

  const faqs = Array.isArray(faqsRes?.data)
    ? faqsRes.data.map(fromStrapiFAQ).filter(Boolean)
    : []

  // Fetch site settings for contact info
  const siteSettingsRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/site-setting', {
    params: POP_SITE_SETTINGS,
    revalidate: 3600,
  })

  const siteSettings = siteSettingsRes?.data ? fromStrapiSiteSettings(siteSettingsRes.data) : undefined

  return (
    <main className="min-h-screen bg-white pt-[280px]">
      {/* Two Column Layout: Title + Contact Info + FAQs */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-[3vw]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column - Title, Description & Contact Info */}
            <div className="lg:col-span-4">
              {/* Title and Description */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Wszystko co musisz wiedzieć o 3FUN
                </h1>
                <p className="text-base text-gray-700">
                  Jeśli nie możesz znaleźć odpowiedzi, której szukasz, skontaktuj się z nami pod adresem{' '}
                  <a
                    href={`mailto:${siteSettings?.contactEmail || 'info@3fun.com'}`}
                    className="text-[#253551] hover:opacity-70 underline"
                  >
                    {siteSettings?.contactEmail || 'info@3fun.com'}
                  </a>
                </p>
              </div>

              {/* Contact Info Cards */}
              <ContactInfoSidebar siteSettings={siteSettings} />
            </div>

            {/* Right Column - FAQs */}
            <div className="lg:col-span-8">
              {faqs.length > 0 ? (
                <FAQAccordionPage faqs={faqs} />
              ) : (
                <p className="text-center text-gray-600">Brak FAQ do wyświetlenia</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
