import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiList, StrapiSingle } from '@/types/strapi'
import { fromStrapiFAQ } from '@/lib/adapters/faq'
import { fromStrapiSiteSettings } from '@/lib/adapters/site-setting'
import { POP_FAQ, POP_SITE_SETTINGS } from '@/lib/populate'
import FAQAccordionClient from '@/components/walden/FAQAccordionClient'
import ContactInfo from '@/components/walden/ContactInfo'

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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#28332e] text-white py-20">
        <div className="max-w-[1200px] mx-auto px-[3vw]">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Wszystko co musisz wiedzieć o 3FUN
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Jeśli nie możesz znaleźć odpowiedzi, której szukasz, skontaktuj się z nami pod adresem{' '}
              <a
                href={`mailto:${siteSettings?.contactEmail || 'info@3fun.com'}`}
                className="text-white hover:opacity-70 underline"
              >
                {siteSettings?.contactEmail || 'info@3fun.com'}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-[3vw]">
          {faqs.length > 0 ? (
            <FAQAccordionClient faqs={faqs} />
          ) : (
            <p className="text-center text-gray-600">Brak FAQ do wyświetlenia</p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-[3vw]">
          <h2 className="text-3xl font-bold text-center mb-12">
            Skontaktuj się z nami
          </h2>
          <ContactInfo siteSettings={siteSettings} />
        </div>
      </section>
    </main>
  )
}
