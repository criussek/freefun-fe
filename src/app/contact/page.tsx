import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiSingle } from '@/types/strapi'
import { fromStrapiSiteSettings } from '@/lib/adapters/site-setting'
import { fromStrapiContactPage } from '@/lib/adapters/contact-page'
import { POP_SITE_SETTINGS, POP_CONTACT_PAGE } from '@/lib/populate'
import ContactInfoSidebar from '@/components/walden/ContactInfoSidebar'
import ContactForm from '@/components/ContactForm'
import PageHero from '@/components/walden/PageHero'

export default async function ContactPage() {
  // Fetch site settings for contact info
  const siteSettingsRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/site-setting', {
    params: POP_SITE_SETTINGS,
    revalidate: 3600,
  })

  const siteSettings = siteSettingsRes?.data ? fromStrapiSiteSettings(siteSettingsRes.data) : undefined

  // Fetch contact page data
  const contactPageRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/contact-page', {
    params: POP_CONTACT_PAGE,
    revalidate: 3600,
  })

  const contactPage = contactPageRes?.data ? fromStrapiContactPage(contactPageRes.data) : undefined

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHero
        title={contactPage?.pageTitle || 'Kontakt'}
        description={contactPage?.pageDescription || ''}
        backgroundImage={contactPage?.pageImage || null}
      />

      {/* Two Column Layout: Title + Contact Info + Form */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-[3vw]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column - Title, Description & Contact Info */}
            <div className="lg:col-span-4">
              {/* Title and Description */}
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {contactPage?.contactTitle || 'Skontaktuj się z nami'}
                </h2>
                <p className="text-base text-gray-700">
                  {contactPage?.contactDescription || (
                    <>
                      Masz pytania? Chętnie na nie odpowiemy. Wypełnij formularz lub skontaktuj się z nami bezpośrednio.
                    </>
                  )}
                </p>
              </div>

              {/* Contact Info Cards */}
              <ContactInfoSidebar siteSettings={siteSettings} />
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
