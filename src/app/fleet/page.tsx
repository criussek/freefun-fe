'use client'
import { useState } from 'react'
import { Users, Bed, Fuel, Check, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function FleetPage() {
  const [filter, setFilter] = useState('all')

  const vehicles = [
    {
      id: 1,
      name: 'The Explorer',
      type: 'Class B Campervan',
      category: 'class-b',
      sleeps: 2,
      beds: 1,
      fuel: 'Diesel',
      price: 150,
      features: [
        'Solar panels for off-grid camping',
        'Full kitchen with refrigerator',
        'Indoor shower and toilet',
        'Heating system',
        'Backup camera',
        'Bluetooth stereo',
      ],
      specs: {
        length: '19 feet',
        mpg: '18-22',
        transmission: 'Automatic',
      },
    },
    {
      id: 2,
      name: 'The Adventurer',
      type: 'Class C Motorhome',
      category: 'class-c',
      sleeps: 4,
      beds: 2,
      fuel: 'Gas',
      price: 200,
      features: [
        'Spacious interior',
        'Full kitchen with oven',
        'Bathroom with shower',
        'Air conditioning',
        'Entertainment system with TV',
        'Large storage capacity',
      ],
      specs: {
        length: '25 feet',
        mpg: '10-14',
        transmission: 'Automatic',
      },
    },
    {
      id: 3,
      name: 'The Wanderer',
      type: 'Sprinter Van',
      category: 'sprinter',
      sleeps: 2,
      beds: 1,
      fuel: 'Diesel',
      price: 120,
      features: [
        'Compact and easy to drive',
        'Kitchenette with sink and stove',
        'Ample storage space',
        'Great fuel efficiency',
        'Standing room',
        'USB charging ports',
      ],
      specs: {
        length: '19 feet',
        mpg: '20-24',
        transmission: 'Automatic',
      },
    },
    {
      id: 4,
      name: 'The Voyager',
      type: 'Class B+ Campervan',
      category: 'class-b',
      sleeps: 3,
      beds: 2,
      fuel: 'Diesel',
      price: 175,
      features: [
        'Extra space and comfort',
        'Wet bath',
        'Full kitchen',
        'Solar power',
        'Heating and AC',
        'Outdoor shower',
      ],
      specs: {
        length: '21 feet',
        mpg: '16-20',
        transmission: 'Automatic',
      },
    },
    {
      id: 5,
      name: 'The Nomad',
      type: 'Custom Converted Van',
      category: 'custom',
      sleeps: 2,
      beds: 1,
      fuel: 'Gas',
      price: 130,
      features: [
        'Unique custom interior',
        'Portable camping toilet',
        'Cooler and camp stove',
        'Rooftop tent option',
        'Bike rack',
        'Outdoor cooking setup',
      ],
      specs: {
        length: '17 feet',
        mpg: '14-18',
        transmission: 'Automatic',
      },
    },
    {
      id: 6,
      name: 'The Family Cruiser',
      type: 'Class C Motorhome',
      category: 'class-c',
      sleeps: 6,
      beds: 3,
      fuel: 'Gas',
      price: 250,
      features: [
        'Perfect for families',
        'Multiple sleeping areas',
        'Full bathroom',
        'Large kitchen',
        'Dining area',
        'Generator included',
      ],
      specs: {
        length: '28 feet',
        mpg: '8-12',
        transmission: 'Automatic',
      },
    },
  ]

  const filteredVehicles = filter === 'all'
    ? vehicles
    : vehicles.filter(v => v.category === filter)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-forest text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              Our Fleet
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Choose from our selection of premium campervans and motorhomes,
              all meticulously maintained and ready for adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-forest text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Vehicles
            </button>
            <button
              onClick={() => setFilter('class-b')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'class-b'
                  ? 'bg-forest text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Class B
            </button>
            <button
              onClick={() => setFilter('class-c')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'class-c'
                  ? 'bg-forest text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Class C
            </button>
            <button
              onClick={() => setFilter('sprinter')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'sprinter'
                  ? 'bg-forest text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sprinter
            </button>
            <button
              onClick={() => setFilter('custom')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'custom'
                  ? 'bg-forest text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Custom
            </button>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                id={vehicle.id.toString()}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image Section */}
                  <div className="h-64 md:h-auto bg-gradient-to-br from-forest/30 to-gold/20 relative">
                    <div className="absolute top-4 right-4 bg-gold text-forest px-4 py-2 rounded-full font-bold text-lg">
                      ${vehicle.price}/day
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-forest mb-2">{vehicle.name}</h3>
                    <p className="text-gray-600 mb-4">{vehicle.type}</p>

                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-forest" />
                        <span>{vehicle.sleeps} people</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bed size={16} className="text-forest" />
                        <span>{vehicle.beds} bed{vehicle.beds > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel size={16} className="text-forest" />
                        <span>{vehicle.fuel}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-forest mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {vehicle.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <Check size={16} className="text-forest mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href="/contact"
                      className="btn-primary w-full text-center block flex items-center justify-center gap-2"
                    >
                      <Calendar size={20} />
                      Book Now
                    </Link>
                  </div>
                </div>

                {/* Expanded Details */}
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600">Length</p>
                      <p className="font-semibold text-forest">{vehicle.specs.length}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Fuel Economy</p>
                      <p className="font-semibold text-forest">{vehicle.specs.mpg} MPG</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Transmission</p>
                      <p className="font-semibold text-forest">{vehicle.specs.transmission}</p>
                    </div>
                  </div>

                  <details className="cursor-pointer">
                    <summary className="text-forest font-semibold hover:text-primary">
                      View all features
                    </summary>
                    <ul className="mt-4 space-y-2">
                      {vehicle.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <Check size={16} className="text-forest mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-forest mb-6">
            Questions About Our Fleet?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Contact us to learn more about our vehicles or to make a reservation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
            <Link href="/faq" className="btn-secondary">
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
