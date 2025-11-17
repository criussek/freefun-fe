export default function OutfittedSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-[3vw] py-20">
      {/* Grid with image left, text right (reversed) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start relative">
        {/* Heading that spans across both columns */}
        <h2 className="md:absolute md:right-[20%] md:top-4 md:z-10 text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:text-right bg-white md:px-4 md:py-2 md:w-auto order-1">
          Outfitted for adventure
        </h2>

        {/* Image */}
        <div className="order-2 md:order-1 relative">
          <div className="aspect-[4/3] bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-white text-sm">
              Van features image
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="order-1 md:order-2 md:pl-8 pt-0 md:pt-40">
          <p className="text-lg leading-relaxed mb-6">
            Each van comes fully equipped with everything you need for your journey.
            Solar power, heating, cooking equipment, and more. Just bring your sense
            of adventure.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-[#2d5016] mr-2">✓</span>
              <span>Solar power system for off-grid camping</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#2d5016] mr-2">✓</span>
              <span>Full kitchen with refrigerator and stove</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#2d5016] mr-2">✓</span>
              <span>Comfortable sleeping arrangements</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#2d5016] mr-2">✓</span>
              <span>Indoor and outdoor shower options</span>
            </li>
          </ul>
          <a href="/fleet" className="btn-secondary">
            Explore the fleet
          </a>
        </div>
      </div>
    </section>
  )
}
