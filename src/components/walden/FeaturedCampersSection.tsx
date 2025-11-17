import Link from 'next/link'
import { FeaturedCampers } from '@/types/domain'
import MachinesCarousel from './MachinesCarousel'

interface FeaturedCampersSectionProps {
  featuredCampers: FeaturedCampers
}

export default function FeaturedCampersSection({ featuredCampers }: FeaturedCampersSectionProps) {
  const { sectionTitle, sectionDescription, machines, seeCampersLabel, seeCampersUrl } = featuredCampers

  return (
    <section className="relative w-full text-white py-16 md:py-20">
      {/* Background with gradient overlay - same as footer */}
      <div className="absolute inset-0 bg-[#28332e]">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800"></div>
        <div className="absolute inset-0 bg-black opacity-15"></div>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Section Header */}
        {sectionTitle && (
          <div className="max-w-[1200px] mx-auto px-[4vw] pt-10 pb-16 text-center">
            <h2 className="mb-12 font-medium text-white">{sectionTitle}</h2>
            {sectionDescription && (
              <>
                <p className="text-xl text-white max-w-3xl mx-auto tracking-wide text-base/7 mb-8">
                  {sectionDescription}
                </p>
                <hr className="max-w-md mx-auto border-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
              </>
            )}
          </div>
        )}

        {/* Carousel */}
        <div className="w-full">
          {machines.length > 0 && (
            <MachinesCarousel machines={machines} />
          )}
        </div>

        {/* See All Button */}
        <div className="text-center mt-16">
          <Link href={seeCampersUrl} className="border-2 tracking-wider border-white text-white px-8 py-4 font-bold hover:bg-white hover:text-black transition-all text-center">
            {seeCampersLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
