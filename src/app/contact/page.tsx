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
  const contactPageRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/contact', {
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
              {/* Overview */}
              {contactPage?.pageOverview && (
                <div className="mb-8 prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: contactPage.pageOverview }} />
              )}

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
