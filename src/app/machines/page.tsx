'use client'
import { useState } from 'react'
import { Check, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function MachinesPage() {
  const [filter, setFilter] = useState('all')

  const equipment = [
    {
      id: 1,
      name: 'Mountain Bike',
      category: 'bikes',
      price: 25,
      description: 'High-quality mountain bikes perfect for trail adventures',
      features: [
        '21-speed gearing',
        'Front suspension',
        'Helmet included',
        'Repair kit provided',
      ],
      specifications: {
        suitable: 'All skill levels',
        availability: 'Multiple units available',
      },
    },
    {
      id: 2,
      name: 'E-Bike',
      category: 'bikes',
      price: 45,
      description: 'Electric bikes for effortless countryside touring',
      features: [
        '50-mile range',
        'Pedal assist',
        'Helmet and lock included',
        'Charging cable provided',
      ],
      specifications: {
        suitable: 'Ages 16+',
        availability: '6 units available',
      },
    },
    {
      id: 3,
      name: 'Single Kayak',
      category: 'water',
      price: 35,
      description: 'Stable and maneuverable kayak for solo paddling',
      features: [
        'Includes paddle',
        'Life jacket provided',
        'Dry bag included',
        'Easy to transport',
      ],
      specifications: {
        suitable: 'Beginners to advanced',
        availability: '8 units available',
      },
    },
    {
      id: 4,
      name: 'Double Kayak',
      category: 'water',
      price: 50,
      description: 'Tandem kayak for couples or families',
      features: [
        '2 paddles included',
        '2 life jackets',
        'Storage compartments',
        'Stable design',
      ],
      specifications: {
        suitable: 'All skill levels',
        availability: '4 units available',
      },
    },
    {
      id: 5,
      name: 'Stand-Up Paddleboard',
      category: 'water',
      price: 30,
      description: 'Perfect for calm waters and fitness',
      features: [
        'Inflatable for easy transport',
        'Paddle included',
        'Pump provided',
        'Safety leash',
      ],
      specifications: {
        suitable: 'Intermediate to advanced',
        availability: '5 units available',
      },
    },
    {
      id: 6,
      name: 'Camping Gear Set',
      category: 'camping',
      price: 50,
      description: 'Complete camping setup for 2 people',
      features: [
        '4-season tent',
        '2 sleeping bags',
        'Sleeping pads',
        'Camp cookware set',
      ],
      specifications: {
        suitable: '2 people',
        availability: '10 sets available',
      },
    },
    {
      id: 7,
      name: 'Family Camping Set',
      category: 'camping',
      price: 85,
      description: 'Everything you need for family camping',
      features: [
        '6-person tent',
        '4 sleeping bags',
        'Camping chairs',
        'Cooler and cookware',
      ],
      specifications: {
        suitable: '4-6 people',
        availability: '4 sets available',
      },
    },
    {
      id: 8,
      name: 'Portable Grill',
      category: 'camping',
      price: 20,
      description: 'Compact propane grill for outdoor cooking',
      features: [
        'Propane powered',
        'Easy setup',
        'Grilling tools included',
        'Portable design',
      ],
      specifications: {
        suitable: 'All campers',
        availability: '8 units available',
      },
    },
    {
      id: 9,
      name: 'Ski Equipment Set',
      category: 'winter',
      price: 60,
      description: 'Complete ski setup for winter adventures',
      features: [
        'Skis and boots',
        'Poles included',
        'Size adjustable',
        'Helmet available',
      ],
      specifications: {
        suitable: 'All skill levels',
        availability: 'Seasonal - winter only',
      },
    },
    {
      id: 10,
      name: 'Snowboard Package',
      category: 'winter',
      price: 55,
      description: 'Snowboard, boots, and bindings',
      features: [
        'Board and boots',
        'Bindings adjusted to fit',
        'Helmet available',
        'Multiple sizes',
      ],
      specifications: {
        suitable: 'Intermediate to advanced',
        availability: 'Seasonal - winter only',
      },
    },
    {
      id: 11,
      name: 'Fishing Gear Set',
      category: 'outdoor',
      price: 35,
      description: 'Complete fishing setup for freshwater',
      features: [
        'Rod and reel',
        'Tackle box',
        'Basic lures',
        'Fishing license info provided',
      ],
      specifications: {
        suitable: 'All skill levels',
        availability: '6 sets available',
      },
    },
    {
      id: 12,
      name: 'Hiking Backpack',
      category: 'outdoor',
      price: 15,
      description: 'Premium hiking backpack with hydration system',
      features: [
        '40L capacity',
        'Hydration bladder included',
        'Rain cover',
        'Multiple compartments',
      ],
      specifications: {
        suitable: 'Day hikes and overnight trips',
        availability: '12 units available',
      },
    },
  ]

  const categories = [
    { id: 'all', name: 'All Equipment' },
    { id: 'bikes', name: 'Bikes' },
    { id: 'water', name: 'Water Sports' },
    { id: 'camping', name: 'Camping' },
    { id: 'winter', name: 'Winter Sports' },
    { id: 'outdoor', name: 'Outdoor Gear' },
  ]

  const filteredEquipment = filter === 'all'
    ? equipment
    : equipment.filter(e => e.category === filter)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-forest text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              Adventure Equipment
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Enhance your outdoor experience with our premium rental equipment.
              Everything you need for the perfect adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  filter === cat.id
                    ? 'bg-forest text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEquipment.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-forest/20 to-gold/20 relative flex items-center justify-center">
                  <div className="absolute top-4 right-4 bg-gold text-forest px-4 py-2 rounded-full font-bold">
                    ${item.price}/day
                  </div>
                  <div className="absolute top-4 left-4 bg-forest/80 text-white px-3 py-1 rounded-full text-sm capitalize">
                    {item.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-forest mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-forest mb-2 text-sm">Includes:</h4>
                    <ul className="space-y-1">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <Check size={14} className="text-forest mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <div className="text-sm text-gray-600">
                      <p><span className="font-semibold">Suitable for:</span> {item.specifications.suitable}</p>
                      <p className="mt-1"><span className="font-semibold">Availability:</span> {item.specifications.availability}</p>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="btn-primary w-full text-center block flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    Reserve Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-forest mb-4">
              Equipment Rental Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cream rounded-lg p-6">
              <h3 className="text-xl font-bold text-forest mb-3">Rental Terms</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <Check size={16} className="text-forest mr-2 mt-1 flex-shrink-0" />
                  <span>Daily, weekly, and monthly rates available</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-forest mr-2 mt-1 flex-shrink-0" />
                  <span>Add equipment to your campervan rental for discounts</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-forest mr-2 mt-1 flex-shrink-0" />
                  <span>Damage waiver options available</span>
                </li>
              </ul>
            </div>

            <div className="bg-cream rounded-lg p-6">
              <h3 className="text-xl font-bold text-forest mb-3">What&apos;s Included</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <Check size={16} className="text-forest mr-2 mt-1 flex-shrink-0" />
                  <span>All necessary accessories</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-forest mr-2 mt-1 flex-shrink-0" />
                  <span>Safety equipment where applicable</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-forest mr-2 mt-1 flex-shrink-0" />
                  <span>Basic instruction and tips</span>
                </li>
              </ul>
            </div>

            <div className="bg-cream rounded-lg p-6">
              <h3 className="text-xl font-bold text-forest mb-3">Your Responsibility</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <Check size={16} className="text-forest mr-2 mt-1 flex-shrink-0" />
                  <span>Return equipment clean and undamaged</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-forest mr-2 mt-1 flex-shrink-0" />
                  <span>Report any issues immediately</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-forest mr-2 mt-1 flex-shrink-0" />
                  <span>Follow safety guidelines</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-forest text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
            Ready to Gear Up for Adventure?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Contact us to reserve equipment or bundle with a campervan rental for the ultimate adventure package!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-gold hover:bg-yellow-600 text-forest">
              Contact Us
            </Link>
            <Link href="/fleet" className="btn-secondary border-white text-white hover:bg-white hover:text-forest">
              View Fleet
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
