import Link from 'next/link'

export default function FeaturedMachines() {
  const machines = [
    {
      id: 1,
      name: 'Mountain Bike',
      category: 'Bikes',
      price: 25,
      description: 'High-quality mountain bikes for trail adventures',
    },
    {
      id: 2,
      name: 'Kayak',
      category: 'Water Sports',
      price: 40,
      description: 'Single and double kayaks for lake and river exploration',
    },
    {
      id: 3,
      name: 'Camping Gear Set',
      category: 'Camping',
      price: 50,
      description: 'Complete camping setup including tent, sleeping bags, and cookware',
    },
    {
      id: 4,
      name: 'E-Bike',
      category: 'Bikes',
      price: 45,
      description: 'Electric bikes for effortless countryside touring',
    },
  ]

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-forest mb-4">
            Adventure Equipment
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Enhance your trip with our selection of outdoor equipment and adventure gear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {machines.map((machine) => (
            <div
              key={machine.id}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <span className="inline-block bg-forest/10 text-forest text-xs px-3 py-1 rounded-full">
                  {machine.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-forest mb-2">{machine.name}</h3>
              <p className="text-gray-600 mb-4 text-sm">{machine.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gold">${machine.price}/day</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/machines" className="btn-secondary">
            View All Equipment
          </Link>
        </div>
      </div>
    </section>
  )
}
