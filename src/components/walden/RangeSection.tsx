export default function RangeSection() {
  const vehicles = [
    {
      name: 'The Classic',
      description: 'Perfect for couples and solo travelers',
      sleeps: '2 people',
    },
    {
      name: 'The Explorer',
      description: 'Ideal for small families and groups',
      sleeps: '3-4 people',
    },
    {
      name: 'The Adventurer',
      description: 'Maximum space and comfort',
      sleeps: '4-5 people',
    },
  ]

  return (
    <section className="max-w-[1200px] mx-auto px-[3vw] py-20">
      <div className="relative">
        <div className="relative">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            A range of adventure rigs
          </h2>

          <p className="text-lg max-w-3xl mb-12">
            Choose from our selection of premium campervans, each one uniquely
            outfitted for your journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <div key={index} className="group">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg overflow-hidden mb-4">
                  <div className="w-full h-full flex items-center justify-center text-white text-sm">
                    {vehicle.name} image
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                <p className="text-gray-600 mb-2">{vehicle.description}</p>
                <p className="text-sm text-[#2d5016] font-medium">Sleeps {vehicle.sleeps}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/fleet" className="btn-primary">
              VIEW THE FULL FLEET
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
