'use client'

import { useState } from 'react'
import { Hero, WhyChooseUs, FeaturedCampers } from '@/types/domain'
import WhyChooseUsSection from '@/components/walden/WhyChooseUsSection'
import FeaturedCampersSection from '@/components/walden/FeaturedCampersSection'

interface HeroSectionProps {
  hero?: Hero;
  whyChooseUsItems?: WhyChooseUs[];
  sectionTitleFree?: string;
  sectionDescriptionFree?: string;
  sectionTitleFun?: string;
  sectionDescriptionFun?: string;
  featuredCampers?: FeaturedCampers;
  featuredMachines?: FeaturedCampers;
}

type Selection = 'free' | 'fun' | null

export default function HeroSection({
  hero,
  whyChooseUsItems = [],
  sectionTitleFree,
  sectionDescriptionFree,
  sectionTitleFun,
  sectionDescriptionFun,
  featuredCampers,
  featuredMachines
}: HeroSectionProps) {
  const [selected, setSelected] = useState<Selection>(null)

  // Check if this is split-screen mode (has freeImage and funImage)
  const isSplitScreen = hero?.freeImage && hero?.funImage

  const handleSelect = (selection: Selection) => {
    setSelected(selection)
    // Smooth scroll to content section
    setTimeout(() => {
      const contentSection = document.getElementById('hero-content-section')
      if (contentSection) {
        contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  // Split-screen mode
  if (isSplitScreen) {
    const filteredWhyChooseUs = selected
      ? whyChooseUsItems.filter(item => !item.displayFor || item.displayFor === selected)
      : []
    const featuredSection = selected === 'free' ? featuredCampers : featuredMachines

    return (
      <>
        {/* Split-screen Hero - Always Visible */}
        <section className="relative w-full h-screen overflow-hidden">
          {/* Full-Width Full-Height Split Screen Images */}
          <div className="relative flex flex-col md:flex-row w-full h-full">
            {/* FREE Option - Left Half */}
            <div
              onClick={() => handleSelect('free')}
              className="relative w-full md:w-1/2 h-full cursor-pointer overflow-hidden group"
            >
              {hero?.freeImage && (
                <img
                  src={hero.freeImage}
                  alt={hero?.freeHeader || 'FREE'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{hero?.freeHeader || 'FREE'}</h2>
                {hero?.freeDescription && (
                  <p className="text-lg md:text-xl lg:text-2xl max-w-md">{hero.freeDescription}</p>
                )}
              </div>
            </div>

            {/* Vertical White Divider */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[4px] bg-white transform -translate-x-1/2 z-30" />

            {/* FUN Option - Right Half */}
            <div
              onClick={() => handleSelect('fun')}
              className="relative w-full md:w-1/2 h-full cursor-pointer overflow-hidden group"
            >
              {hero?.funImage && (
                <img
                  src={hero.funImage}
                  alt={hero?.funHeader || 'FUN'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{hero?.funHeader || 'FUN'}</h2>
                {hero?.funDescription && (
                  <p className="text-lg md:text-xl lg:text-2xl max-w-md">{hero.funDescription}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section - Only shows after selection */}
        {selected && (
          <div id="hero-content-section">
            {/* Why Choose Us Sections (filtered) */}
            {filteredWhyChooseUs.length > 0 && (
              <div>
                {/* Section Title and Description based on selection */}
                {selected === 'free' && (sectionTitleFree || sectionDescriptionFree) && (
                  <div className="max-w-[1200px] mx-auto px-[4vw] pt-20 text-center">
                    {sectionTitleFree && <h2 className="mb-12 font-medium">{sectionTitleFree}</h2>}
                    {sectionDescriptionFree && (
                      <>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-wide text-base/7 mb-8">
                          {sectionDescriptionFree}
                        </p>
                        <hr className="max-w-md mx-auto border-0 h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50" />
                      </>
                    )}
                  </div>
                )}
                {selected === 'fun' && (sectionTitleFun || sectionDescriptionFun) && (
                  <div className="max-w-[1200px] mx-auto px-[4vw] pt-20 text-center">
                    {sectionTitleFun && <h2 className="mb-12 font-medium">{sectionTitleFun}</h2>}
                    {sectionDescriptionFun && (
                      <>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-wide text-base/7 mb-8">
                          {sectionDescriptionFun}
                        </p>
                        <hr className="max-w-md mx-auto border-0 h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50" />
                      </>
                    )}
                  </div>
                )}

                {filteredWhyChooseUs.map((item, index) => (
                  <WhyChooseUsSection key={index} item={item} />
                ))}
              </div>
            )}

            {/* Featured Campers/Machines Section */}
            {featuredSection && (
              <FeaturedCampersSection featuredCampers={featuredSection} />
            )}
          </div>
        )}
      </>
    )
  }

  // No hero data - return null
  return null
}
