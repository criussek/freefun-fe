import { Heart, Shield, Leaf } from 'lucide-react'

export default function AboutSection() {
  const features = [
    {
      icon: Heart,
      title: 'Customer Focused',
      description: 'We prioritize your experience and satisfaction above all else.',
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'All our vehicles and equipment are regularly maintained and inspected.',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'We are committed to sustainable practices and environmental responsibility.',
    },
  ]

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-forest mb-4">
            Why Choose 3FUN?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We combine quality vehicles, exceptional service, and competitive prices
            to make your adventure dreams come true.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-forest/10 p-4 rounded-full">
                    <Icon className="text-forest" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-forest mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
