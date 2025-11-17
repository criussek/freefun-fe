'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { FAQ } from '@/types/domain'

interface FAQAccordionClientProps {
  faqs: FAQ[]
}

export default function FAQAccordionClient({ faqs }: FAQAccordionClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:border-[#253551] transition-colors"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <span className="font-bold text-[#253551] text-lg">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="text-[#253551] flex-shrink-0 ml-4" size={24} />
            ) : (
              <ChevronDown className="text-[#253551] flex-shrink-0 ml-4" size={24} />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 border-t border-gray-200">
              <p className="text-gray-700 pt-4 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
