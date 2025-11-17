'use client'
import { useState } from 'react'
import { FAQ } from '@/types/domain'

interface FAQAccordionPageProps {
  faqs: FAQ[]
}

export default function FAQAccordionPage({ faqs }: FAQAccordionPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState<number | null>(null)

  if (!faqs || faqs.length === 0) {
    return null
  }

  const toggleItem = (index: number) => {
    if (transitioning === index) return

    setTransitioning(index)

    if (openIndex === index) {
      // Start close animation
      setTimeout(() => {
        setOpenIndex(null)
        setTimeout(() => setTransitioning(null), 50)
      }, 150)
    } else {
      // Start open animation
      setOpenIndex(index)
      setTimeout(() => setTransitioning(null), 200)
    }
  }

  return (
    <div>
      {/* First divider */}
      <div className="h-[1px] bg-black opacity-100"></div>

      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        const isTransitioning = transitioning === index

        return (
          <div key={index}>
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex justify-between items-center text-left py-[15px] hover:opacity-70 transition-opacity duration-200"
            >
              <span className="font-bold text-lg pr-[14px]">{faq.question}</span>
              <div className="relative flex-shrink-0 w-[14px] h-[14px]">
                {/* Plus icon */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black transform -translate-y-1/2"></div>
                <div
                  className={`absolute left-1/2 top-0 w-[1px] h-full bg-black transform -translate-x-1/2 transition-all duration-300 ${
                    isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`}
                ></div>
              </div>
            </button>

            {/* Animated content wrapper */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen && !isTransitioning ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div
                className={`pb-[30px] transition-all duration-200 ${
                  isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                }`}
                style={{ transitionDelay: isOpen && !isTransitioning ? '100ms' : '0ms' }}
              >
                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">{faq.answer}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-black opacity-100"></div>
          </div>
        )
      })}
    </div>
  )
}
