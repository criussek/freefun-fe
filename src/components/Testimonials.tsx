import { Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'Seattle, WA',
      rating: 5,
      text: 'Had an amazing experience renting from 3FUN! The campervan was in perfect condition and the staff was incredibly helpful. Will definitely be back!',
      date: '2 weeks ago',
    },
    {
      id: 2,
      name: 'Mike Chen',
      location: 'Portland, OR',
      rating: 5,
      text: 'Great service, great prices, and an unforgettable adventure. The mountain bikes we rented were top quality. Highly recommend!',
      date: '1 month ago',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      location: 'San Francisco, CA',
      rating: 5,
      text: 'The perfect way to explore the Pacific Northwest. Everything was seamless from booking to return. The van had everything we needed!',
      date: '3 weeks ago',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-forest mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy adventurers!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-cream rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-gold fill-gold" size={20} />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div className="border-t border-gray-300 pt-4">
                <p className="font-semibold text-forest">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
                <p className="text-xs text-gray-500 mt-1">{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
