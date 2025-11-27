'use client'

import { useState } from 'react'
import { WhyChooseUs, Machine, FeaturedCampers } from '@/types/domain'
import WhyChooseUsSection from '@/components/walden/WhyChooseUsSection'
import FeaturedCampersSection from '@/components/walden/FeaturedCampersSection'

interface RideSelectorProps {
  header?: string
  description?: string
  freeImage: string | null
  freeHeader?: string
  freeDescription?: string
  funImage: string | null
  funHeader?: string
  funDescription?: string
  whyChooseUsItems: WhyChooseUs[]
  sectionTitleFree?: string
  sectionDescriptionFree?: string
  sectionTitleFun?: string
  sectionDescriptionFun?: string
  featuredCampers?: FeaturedCampers
  featuredMachines?: FeaturedCampers
}

type Selection = 'free' | 'fun' | null

export default function RideSelector({
  header,
  description,
  freeImage,
  freeHeader,
  freeDescription,
  funImage,
  funHeader,
  funDescription,
  whyChooseUsItems,
  sectionTitleFree,
  sectionDescriptionFree,
  sectionTitleFun,
  sectionDescriptionFun,
  featuredCampers,
  featuredMachines
}: RideSelectorProps) {
  const [selected, setSelected] = useState<Selection>(null)

  const handleSelect = (selection: Selection) => {
    setSelected(selection)
  }

  if (!selected) {
    // Initial state: Header + Description + Two full-width images
    return (
      <section className="py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-[3vw]">
          {/* Header and Description */}
          {(header || description) && (
            <div className="text-center mb-12">
              {header && (
                <h2 className="text-3xl md:text-4xl font-bold text-[#253551] mb-4">
                  {header}
                </h2>
              )}
              {description && (
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Two Full-Width Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FREE Option */}
            <div
              onClick={() => handleSelect('free')}
              className="relative h-[600px] md:h-[700px] cursor-pointer overflow-hidden group"
            >
              {freeImage && (
                <img
                  src={freeImage}
                  alt={freeHeader || 'FREE'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{freeHeader || 'FREE'}</h2>
                {freeDescription && (
                  <p className="text-lg md:text-xl max-w-md">{freeDescription}</p>
                )}
              </div>
            </div>

            {/* FUN Option */}
            <div
              onClick={() => handleSelect('fun')}
              className="relative h-[600px] md:h-[700px] cursor-pointer overflow-hidden group"
            >
              {funImage && (
                <img
                  src={funImage}
                  alt={funHeader || 'FUN'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{funHeader || 'FUN'}</h2>
                {funDescription && (
                  <p className="text-lg md:text-xl max-w-md">{funDescription}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Selected state: Minimized tabs + filtered why-choose-us + featured campers/machines
  const filteredWhyChooseUs = whyChooseUsItems.filter(
    item => !item.displayFor || item.displayFor === selected
  )
  const featuredSection = selected === 'free' ? featuredCampers : featuredMachines

  return (
    <div>
      {/* Minimized Selection Tabs */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-[3vw]">
          <div className="grid grid-cols-2 gap-4">
            {/* FREE Tab */}
            <div
              onClick={() => handleSelect('free')}
              className={`relative py-8 px-6 cursor-pointer transition-all duration-300 ${
                selected === 'free'
                  ? 'bg-[#253551] text-white'
                  : 'bg-gray-100 text-[#253551] hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center">
                <h3 className="text-2xl md:text-3xl font-bold">{freeHeader || 'FREE'}</h3>
              </div>
            </div>

            {/* FUN Tab */}
            <div
              onClick={() => handleSelect('fun')}
              className={`relative py-8 px-6 cursor-pointer transition-all duration-300 ${
                selected === 'fun'
                  ? 'bg-[#253551] text-white'
                  : 'bg-gray-100 text-[#253551] hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center">
                <h3 className="text-2xl md:text-3xl font-bold">{funHeader || 'FUN'}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

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
  )
}
