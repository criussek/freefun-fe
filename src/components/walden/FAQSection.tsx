import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiList } from '@/types/strapi'
import { fromStrapiFAQ } from '@/lib/adapters/faq'
import { POP_FAQ } from '@/lib/populate'
import FAQAccordion from './FAQAccordion'

export default async function FAQSection() {
  // Fetch FAQs from Strapi
  const faqsRes = await fetchStrapiOrNull<StrapiList<any>>('/api/faqs', {
    params: POP_FAQ,
    revalidate: 60, // Revalidate every 60 seconds
  })

  const faqs = Array.isArray(faqsRes?.data)
    ? faqsRes.data.map(fromStrapiFAQ).filter(Boolean)
    : []

  // Don't render if no FAQs
  if (faqs.length === 0) {
    return null
  }

  return <FAQAccordion faqs={faqs} />
}
