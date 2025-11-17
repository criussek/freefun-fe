import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiSingle } from '@/types/strapi'
import { fromStrapiHome } from '@/lib/adapters/home'
import { POP_HOME } from '@/lib/populate'
import HeroSection from '@/components/walden/HeroSection'
import RangeSection from '@/components/walden/RangeSection'
import WhyChooseUsSection from '@/components/walden/WhyChooseUsSection'
import FeaturedCampersSection from '@/components/walden/FeaturedCampersSection'
import TestimonialsSection from '@/components/walden/TestimonialsSection'
import FAQSection from '@/components/walden/FAQSection'

export default async function Home() {
  // Fetch home page from Strapi
  const homeRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/home-page', {
    params: POP_HOME,
    revalidate: 60,
  })

  const home = homeRes?.data ? fromStrapiHome(homeRes.data) : { sections: [] }

  // Find hero section from Strapi or use default
  const heroSection = home.sections.find(s => s.__component === 'home.hero')
  const hero = heroSection && heroSection.__component === 'home.hero' ? heroSection.hero : undefined

  // Check if there's a featured-campers section
  const hasFeaturedCampers = home.sections.some(s => s.__component === 'home.featured-campers')

  // Check if there's an FAQ section in Strapi
  const hasFAQSection = home.sections.some(s => s.__component === 'home.faq-list')

  // Check if there's a Testimonials section in Strapi
  const hasTestimonialsSection = home.sections.some(s => s.__component === 'home.testimonials')

  return (
    <main className="min-h-screen">
      <HeroSection hero={hero} />

      {/* Dynamic sections from Strapi */}
      {home.sections.map((section, index) => {
        if (section.__component === 'home.why-choose-us') {
          return (
            <div key={index}>
              {section.sectionTitle && (
                <div className="max-w-[1200px] mx-auto px-[4vw] pt-20 text-center">
                  <h2 className="mb-12 font-medium">{section.sectionTitle}</h2>
                  {section.sectionDescription && (
                    <>
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-wide text-base/7 mb-8">
                        {section.sectionDescription}
                      </p>
                      <hr className="max-w-md mx-auto border-0 h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50" />
                    </>
                  )}
                </div>
              )}
              {section.items.map((item, itemIndex) => (
                <WhyChooseUsSection key={itemIndex} item={item} />
              ))}
            </div>
          )
        }

        if (section.__component === 'home.featured-campers') {
          return <FeaturedCampersSection key={index} featuredCampers={section.featuredCampers} />
        }

        if (section.__component === 'home.testimonials') {
          return (
            <TestimonialsSection
              key={index}
              testimonials={section.testimonials}
              sectionTitle={section.sectionTitle}
              sectionDescription={section.sectionDescription}
            />
          )
        }

        if (section.__component === 'home.faq-list') {
          return (
            <FAQSection
              key={index}
              faqs={section.faqs}
              sectionTitle={section.sectionTitle}
              sectionDescription={section.sectionDescription}
              seeFAQsLabel={section.seeFAQsLabel}
              seeFAQsUrl={section.seeFAQsUrl}
            />
          )
        }

        return null
      })}

      {/* Show RangeSection only if no featured-campers from Strapi */}
      {!hasFeaturedCampers && <RangeSection />}

      {/* Show Testimonials section if no Testimonials section from Strapi */}
      {!hasTestimonialsSection && <TestimonialsSection />}

      {/* Show FAQ section if no FAQ section from Strapi */}
      {!hasFAQSection && <FAQSection />}
    </main>
  )
}
