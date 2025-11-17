import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiList } from '@/types/strapi'
import { fromStrapiTestimonial } from '@/lib/adapters/testimonial'
import { POP_TESTIMONIALS } from '@/lib/populate'
import { Testimonial } from '@/types/domain'
import TestimonialsCarousel from './TestimonialsCarousel'

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
  sectionTitle?: string
  sectionDescription?: string
}

export default async function TestimonialsSection({
  testimonials: propsTestimonials,
  sectionTitle,
  sectionDescription
}: TestimonialsSectionProps = {}) {
  // Use props testimonials if provided, otherwise fetch from Strapi
  let testimonials = propsTestimonials

  if (!testimonials) {
    const testimonialsRes = await fetchStrapiOrNull<StrapiList<any>>('/api/testimonials', {
      params: POP_TESTIMONIALS,
      revalidate: 60,
    })

    testimonials = Array.isArray(testimonialsRes?.data)
      ? testimonialsRes.data.map(fromStrapiTestimonial).filter(Boolean)
      : []
  }

  // Don't render if no testimonials
  if (testimonials.length === 0) {
    return null
  }

  return (
    <>
      {/* Section Header - Same background as testimonials */}
      {sectionTitle && (
        <div className="bg-[#e0e0db] pt-20 pb-8">
          <div className="max-w-[1200px] mx-auto px-[4vw] text-center">
            <h2 className="mb-12 font-medium">{sectionTitle}</h2>
            {sectionDescription && (
              <>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-wide text-base/7 mb-8">
                  {sectionDescription}
                </p>
                <hr className="max-w-md mx-auto border-0 h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50" />
              </>
            )}
          </div>
        </div>
      )}
      <TestimonialsCarousel testimonials={testimonials} hasHeader={!!sectionTitle} />
    </>
  )
}
