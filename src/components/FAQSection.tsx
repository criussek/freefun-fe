'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What is included in the rental?',
      answer: 'All rentals include basic insurance, unlimited mileage, kitchen equipment, bedding, and 24/7 roadside assistance. Specific items vary by vehicle - check the vehicle details for a complete list.',
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Free cancellation up to 14 days before your rental date. Cancellations made 7-14 days before receive a 50% refund. Cancellations within 7 days are non-refundable.',
    },
    {
      question: 'Do I need a special license?',
      answer: 'A standard driver\'s license is sufficient for our Class B and Sprinter vans. Class C motorhomes may require a special endorsement in some states - contact us to verify your requirements.',
    },
    {
      question: 'Can I take the campervan out of state?',
      answer: 'Yes! Our vehicles can travel anywhere in the continental United States. Just let us know your planned route when booking.',
    },
    {
      question: 'What if I have mechanical issues?',
      answer: 'All rentals include 24/7 roadside assistance. We also provide a support phone line where you can reach our team anytime during your trip.',
    },
  ]

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-forest mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-700">
            Got questions? We've got answers!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-forest">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-forest flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-forest flex-shrink-0" size={20} />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
