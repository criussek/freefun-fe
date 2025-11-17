'use client'
import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setStatus('success')
    setTimeout(() => {
      setStatus('idle')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-forest text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Have questions or ready to book? We&apos;d love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold font-serif text-forest mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-forest/10 p-3 rounded-lg mr-4">
                    <MapPin className="text-forest" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">Address</h3>
                    <p className="text-gray-700">
                      123 Adventure Lane<br />
                      Portland, OR 97201
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-forest/10 p-3 rounded-lg mr-4">
                    <Phone className="text-forest" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">Phone</h3>
                    <p className="text-gray-700">
                      <a href="tel:+1234567890" className="hover:text-forest">
                        (123) 456-7890
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-forest/10 p-3 rounded-lg mr-4">
                    <Mail className="text-forest" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">Email</h3>
                    <p className="text-gray-700">
                      <a href="mailto:info@3fun.com" className="hover:text-forest">
                        info@3fun.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-forest/10 p-3 rounded-lg mr-4">
                    <Clock className="text-forest" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">Business Hours</h3>
                    <p className="text-gray-700">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 bg-gradient-to-br from-forest/20 to-gold/20 flex items-center justify-center">
                  <p className="text-gray-600">Map placeholder</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold font-serif text-forest mb-6">
                  Send us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest"
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="general">General Question</option>
                      <option value="support">Customer Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Message
                  </button>

                  {status === 'success' && (
                    <p className="text-green-600 text-center font-semibold">
                      Thank you! We&apos;ll get back to you soon.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-red-600 text-center font-semibold">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-forest text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
            Ready to Book Your Adventure?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Browse our fleet and start planning your next outdoor adventure today!
          </p>
          <a href="/fleet" className="btn-primary bg-gold hover:bg-yellow-600 text-forest">
            View Our Fleet
          </a>
        </div>
      </section>
    </main>
  )
}
