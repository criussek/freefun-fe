'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const faqCategories = [
    {
      category: 'Rental Process',
      questions: [
        {
          question: 'How do I make a reservation?',
          answer: 'You can book online through our website, call us directly at (123) 456-7890, or visit our location. We recommend booking at least 2 weeks in advance during peak season.',
        },
        {
          question: 'What documents do I need to rent?',
          answer: 'You\'ll need a valid driver\'s license, proof of insurance, and a credit card for the security deposit. International renters may need additional documentation.',
        },
        {
          question: 'What is the minimum rental period?',
          answer: 'Our minimum rental period is 2 nights for campervans and 1 day for equipment. Weekly and monthly rates are available at discounted prices.',
        },
      ],
    },
    {
      category: 'Pricing & Payment',
      questions: [
        {
          question: 'What is included in the rental price?',
          answer: 'Base rental includes unlimited mileage, basic insurance, kitchen equipment, bedding, and 24/7 roadside assistance. Additional options like bikes, kayaks, and premium insurance are available.',
        },
        {
          question: 'What is your cancellation policy?',
          answer: 'Free cancellation up to 14 days before rental. 50% refund for cancellations 7-14 days before. Cancellations within 7 days are non-refundable. Trip insurance is available.',
        },
        {
          question: 'Do you require a security deposit?',
          answer: 'Yes, a refundable security deposit of $500-$1000 (depending on vehicle) is required. It\'s held on your credit card and released 7-10 days after return if no damage.',
        },
      ],
    },
    {
      category: 'Vehicle & Equipment',
      questions: [
        {
          question: 'Are the vehicles pet-friendly?',
          answer: 'Yes! Select vehicles allow pets for a small additional fee ($50-$75 per rental). Please inform us when booking and review our pet policy.',
        },
        {
          question: 'Can I smoke in the vehicle?',
          answer: 'All our vehicles are non-smoking. A $250 cleaning fee applies if evidence of smoking is found.',
        },
        {
          question: 'What happens if I have mechanical issues?',
          answer: 'All rentals include 24/7 roadside assistance. Contact us immediately and we\'ll arrange repairs or a replacement vehicle if needed.',
        },
        {
          question: 'How often are vehicles serviced?',
          answer: 'All vehicles undergo comprehensive maintenance every 3,000 miles and full inspections before each rental. Safety is our top priority.',
        },
      ],
    },
    {
      category: 'Travel & Usage',
      questions: [
        {
          question: 'Can I travel out of state?',
          answer: 'Yes! Our vehicles can travel anywhere in the continental United States. Just inform us of your planned route when booking.',
        },
        {
          question: 'Are there mileage restrictions?',
          answer: 'No! All our rentals include unlimited mileage. Drive as far as your adventure takes you.',
        },
        {
          question: 'Can multiple people drive the vehicle?',
          answer: 'Yes, but all drivers must be listed on the rental agreement, be at least 25 years old, and have a valid license. Additional driver fees may apply.',
        },
      ],
    },
    {
      category: 'Pickup & Return',
      questions: [
        {
          question: 'What time can I pick up the vehicle?',
          answer: 'Standard pickup time is 3 PM on your start date. Early pickup (from 10 AM) is available for an additional $50, subject to availability.',
        },
        {
          question: 'What is the return process?',
          answer: 'Vehicles must be returned by 11 AM on your end date. Please return with a full tank of gas and in the same condition as pickup. Late returns incur additional charges.',
        },
        {
          question: 'Do you offer delivery?',
          answer: 'Yes! We offer delivery and pickup within 50 miles of our location for a fee. Contact us for a quote.',
        },
      ],
    },
  ]

  const allQuestions = faqCategories.flatMap((cat, catIndex) =>
    cat.questions.map((q, qIndex) => ({
      ...q,
      category: cat.category,
      index: catIndex * 100 + qIndex,
    }))
  )

  const filteredQuestions = searchTerm
    ? allQuestions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allQuestions

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-forest text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Find answers to common questions about our rentals and services
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-forest"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchTerm ? (
            <div>
              <p className="text-gray-600 mb-6">
                Found {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''}
              </p>
              <div className="space-y-4">
                {filteredQuestions.map((faq) => (
                  <div
                    key={faq.index}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === faq.index ? null : faq.index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <span className="text-xs text-gold font-semibold">{faq.category}</span>
                        <p className="font-semibold text-forest mt-1">{faq.question}</p>
                      </div>
                      {openIndex === faq.index ? (
                        <ChevronUp className="text-forest flex-shrink-0 ml-4" size={20} />
                      ) : (
                        <ChevronDown className="text-forest flex-shrink-0 ml-4" size={20} />
                      )}
                    </button>
                    {openIndex === faq.index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {faqCategories.map((category, catIndex) => (
                <div key={catIndex}>
                  <h2 className="text-2xl font-bold text-forest mb-6 font-serif">
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, qIndex) => {
                      const index = catIndex * 100 + qIndex
                      return (
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
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-serif text-forest mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Our team is here to help! Contact us and we&apos;ll get back to you promptly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
            <a href="tel:+1234567890" className="btn-secondary">
              Call (123) 456-7890
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
