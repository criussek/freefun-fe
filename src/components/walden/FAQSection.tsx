import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiList } from '@/types/strapi'
import { fromStrapiFAQ } from '@/lib/adapters/faq'
import { POP_FAQ } from '@/lib/populate'
import { FAQ } from '@/types/domain'
import FAQAccordion from './FAQAccordion'

interface FAQSectionProps {
  faqs?: FAQ[]
  sectionTitle?: string
  sectionDescription?: string
  seeFAQsLabel?: string
  seeFAQsUrl?: string
}

export default async function FAQSection({
  faqs: propsFaqs,
  sectionTitle,
  sectionDescription,
  seeFAQsLabel,
  seeFAQsUrl
}: FAQSectionProps = {}) {
  // Use props FAQs if provided, otherwise fetch from Strapi
  let faqs = propsFaqs

  if (!faqs) {
    const faqsRes = await fetchStrapiOrNull<StrapiList<any>>('/api/faqs', {
      params: POP_FAQ,
      revalidate: 60,
    })

    faqs = Array.isArray(faqsRes?.data)
      ? faqsRes.data.map(fromStrapiFAQ).filter(Boolean)
      : []
  }

  // Don't render if no FAQs
  if (faqs.length === 0) {
    return null
  }

  return (
    <FAQAccordion
      faqs={faqs}
      sectionTitle={sectionTitle}
      sectionDescription={sectionDescription}
      seeFAQsLabel={seeFAQsLabel}
      seeFAQsUrl={seeFAQsUrl}
    />
  )
}
