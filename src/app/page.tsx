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
import BookNowSection from '@/components/walden/BookNowSection'
import RideSelector from '@/components/RideSelector'

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

  // Check if there's a ride-selector section
  const hasRideSelector = home.sections.some(s => s.__component === 'home.ride-selector')

  // Check if there's a featured-campers section
  const hasFeaturedCampers = home.sections.some(s => s.__component === 'home.featured-campers')

  // Check if there's a featured-machines section
  const hasFeaturedMachines = home.sections.some(s => s.__component === 'home.featured-machines')

  // Check if there's an FAQ section in Strapi
  const hasFAQSection = home.sections.some(s => s.__component === 'home.faq-list')

  // Check if there's a Testimonials section in Strapi
  const hasTestimonialsSection = home.sections.some(s => s.__component === 'home.testimonials')

  // Collect all why-choose-us items and section titles/descriptions for RideSelector
  const whyChooseUsSections = home.sections.filter(s => s.__component === 'home.why-choose-us')
  const allWhyChooseUsItems = whyChooseUsSections.flatMap(s =>
    s.__component === 'home.why-choose-us' ? s.items : []
  )

  // Get the first why-choose-us section's titles/descriptions (or combine from multiple if needed)
  const firstWhyChooseUsSection = whyChooseUsSections[0]
  const sectionTitleFree = firstWhyChooseUsSection && firstWhyChooseUsSection.__component === 'home.why-choose-us'
    ? firstWhyChooseUsSection.sectionTitleFree
    : undefined
  const sectionDescriptionFree = firstWhyChooseUsSection && firstWhyChooseUsSection.__component === 'home.why-choose-us'
    ? firstWhyChooseUsSection.sectionDescriptionFree
    : undefined
  const sectionTitleFun = firstWhyChooseUsSection && firstWhyChooseUsSection.__component === 'home.why-choose-us'
    ? firstWhyChooseUsSection.sectionTitleFun
    : undefined
  const sectionDescriptionFun = firstWhyChooseUsSection && firstWhyChooseUsSection.__component === 'home.why-choose-us'
    ? firstWhyChooseUsSection.sectionDescriptionFun
    : undefined

  // Find featured-campers section (for FREE)
  const featuredCampersSection = home.sections.find(s => s.__component === 'home.featured-campers')
  const featuredCampersForSelector = featuredCampersSection && featuredCampersSection.__component === 'home.featured-campers'
    ? featuredCampersSection.featuredCampers
    : undefined

  // Find featured-machines section (for FUN)
  const featuredMachinesSection = home.sections.find(s => s.__component === 'home.featured-machines')
  const featuredMachinesForSelector = featuredMachinesSection && featuredMachinesSection.__component === 'home.featured-machines'
    ? {
        sectionTitle: featuredMachinesSection.featuredMachines.sectionTitle,
        sectionDescription: featuredMachinesSection.featuredMachines.sectionDescription,
        machines: featuredMachinesSection.featuredMachines.machines,
        seeCampersLabel: featuredMachinesSection.featuredMachines.seeMachinesLabel,
        seeCampersUrl: featuredMachinesSection.featuredMachines.seeMachinesUrl,
      }
    : undefined

  return (
    <main className="min-h-screen">
      <HeroSection hero={hero} />

      {/* Dynamic sections from Strapi */}
      {home.sections.map((section, index) => {
        // If ride-selector section, render it with featured machines and why-choose-us items
        if (section.__component === 'home.ride-selector') {
          return (
            <RideSelector
              key={index}
              header={section.rideSelector.header}
              description={section.rideSelector.description}
              freeImage={section.rideSelector.freeImage}
              freeHeader={section.rideSelector.freeHeader}
              freeDescription={section.rideSelector.freeDescription}
              funImage={section.rideSelector.funImage}
              funHeader={section.rideSelector.funHeader}
              funDescription={section.rideSelector.funDescription}
              whyChooseUsItems={allWhyChooseUsItems}
              sectionTitleFree={sectionTitleFree}
              sectionDescriptionFree={sectionDescriptionFree}
              sectionTitleFun={sectionTitleFun}
              sectionDescriptionFun={sectionDescriptionFun}
              featuredCampers={featuredCampersForSelector}
              featuredMachines={featuredMachinesForSelector}
            />
          )
        }

        // Skip why-choose-us, featured-campers, and featured-machines if ride-selector is present
        if (hasRideSelector && (
          section.__component === 'home.why-choose-us' ||
          section.__component === 'home.featured-campers' ||
          section.__component === 'home.featured-machines'
        )) {
          return null
        }

        if (section.__component === 'home.why-choose-us') {
          // This section is handled by RideSelector when ride-selector is present
          // If no ride-selector, show all items
          return (
            <div key={index}>
              {section.items.map((item, itemIndex) => (
                <WhyChooseUsSection key={itemIndex} item={item} />
              ))}
            </div>
          )
        }

        if (section.__component === 'home.featured-campers') {
          return <FeaturedCampersSection key={index} featuredCampers={section.featuredCampers} />
        }

        if (section.__component === 'home.featured-machines') {
          // Reuse FeaturedCampersSection for machines too (same component structure)
          const featuredCampers = {
            sectionTitle: section.featuredMachines.sectionTitle,
            sectionDescription: section.featuredMachines.sectionDescription,
            machines: section.featuredMachines.machines,
            seeCampersLabel: section.featuredMachines.seeMachinesLabel,
            seeCampersUrl: section.featuredMachines.seeMachinesUrl,
          }
          return <FeaturedCampersSection key={index} featuredCampers={featuredCampers} />
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

        if (section.__component === 'home.book-now') {
          return <BookNowSection key={index} bookNow={section.bookNow} />
        }

        return null
      })}

      {/* Show RangeSection only if no featured-campers, no featured-machines, and no ride-selector from Strapi */}
      {!hasFeaturedCampers && !hasFeaturedMachines && !hasRideSelector && <RangeSection />}

      {/* Show Testimonials section if no Testimonials section from Strapi */}
      {!hasTestimonialsSection && <TestimonialsSection />}

      {/* Show FAQ section if no FAQ section from Strapi */}
      {!hasFAQSection && <FAQSection />}
    </main>
  )
}
