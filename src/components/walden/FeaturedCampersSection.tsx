import Link from 'next/link'
import { FeaturedCampers } from '@/types/domain'
import MachinesCarousel from './MachinesCarousel'

interface FeaturedCampersSectionProps {
  featuredCampers: FeaturedCampers
}

export default function FeaturedCampersSection({ featuredCampers }: FeaturedCampersSectionProps) {
  const { sectionTitle, sectionDescription, machines, seeCampersLabel, seeCampersUrl } = featuredCampers

  return (
    <>
      {/* Section Header - Same style as Why Choose Us */}
      {sectionTitle && (
        <div className="max-w-[1200px] mx-auto px-[4vw] pt-20 text-center">
          <h2 className="mb-12 font-medium">{sectionTitle}</h2>
          {sectionDescription && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-wide text-base/7">
              {sectionDescription}
            </p>
          )}
        </div>
      )}

      {/* Carousel Section */}
      <section className="w-full bg-[#28332e] text-white py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-[3vw]">
          {/* Carousel */}
          {machines.length > 0 && (
            <MachinesCarousel machines={machines} />
          )}

          {/* See All Button */}
          <div className="text-center mt-12">
            <Link href={seeCampersUrl} className="btn-primary inline-block">
              {seeCampersLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
