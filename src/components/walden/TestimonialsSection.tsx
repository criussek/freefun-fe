import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiList } from '@/types/strapi'
import { fromStrapiTestimonial } from '@/lib/adapters/testimonial'
import { POP_TESTIMONIALS } from '@/lib/populate'
import TestimonialsCarousel from './TestimonialsCarousel'

export default async function TestimonialsSection() {
  // Fetch testimonials from Strapi
  const testimonialsRes = await fetchStrapiOrNull<StrapiList<any>>('/api/testimonials', {
    params: POP_TESTIMONIALS,
    revalidate: 60, // Revalidate every 60 seconds
  })

  const testimonials = Array.isArray(testimonialsRes?.data)
    ? testimonialsRes.data.map(fromStrapiTestimonial).filter(Boolean)
    : []

  // Don't render if no testimonials
  if (testimonials.length === 0) {
    return null
  }

  return <TestimonialsCarousel testimonials={testimonials} />
}
