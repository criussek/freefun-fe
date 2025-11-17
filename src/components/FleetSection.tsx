import Link from 'next/link'
import { Users, Bed, Fuel } from 'lucide-react'

export default function FleetSection() {
  const campervans = [
    {
      id: 1,
      name: 'The Explorer',
      type: 'Class B Campervan',
      sleeps: 2,
      beds: 1,
      fuel: 'Diesel',
      price: 150,
      features: ['Solar panels', 'Kitchen', 'Shower', 'Heating'],
      image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800',
    },
    {
      id: 2,
      name: 'The Adventurer',
      type: 'Class C Motorhome',
      sleeps: 4,
      beds: 2,
      fuel: 'Gas',
      price: 200,
      features: ['Full kitchen', 'Bathroom', 'AC', 'TV'],
      image: 'https://images.unsplash.com/photo-1464347744102-11db6282f854?w=800',
    },
    {
      id: 3,
      name: 'The Wanderer',
      type: 'Sprinter Van',
      sleeps: 2,
      beds: 1,
      fuel: 'Diesel',
      price: 120,
      features: ['Compact', 'Kitchenette', 'Storage', 'Easy to drive'],
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-forest mb-4">
            Our Fleet
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Choose from our selection of well-maintained campervans,
            perfect for your next adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campervans.map((van) => (
            <div
              key={van.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-forest/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-gold text-forest px-3 py-1 rounded-full font-semibold">
                  ${van.price}/day
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-forest mb-2">{van.name}</h3>
                <p className="text-gray-600 mb-4">{van.type}</p>

                <div className="flex gap-4 mb-4 text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{van.sleeps} people</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed size={16} />
                    <span>{van.beds} bed{van.beds > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel size={16} />
                    <span>{van.fuel}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {van.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-forest/10 text-forest text-xs px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href={`/fleet#${van.id}`} className="btn-primary w-full text-center block">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/fleet" className="btn-secondary">
            View Full Fleet
          </Link>
        </div>
      </div>
    </section>
  )
}
