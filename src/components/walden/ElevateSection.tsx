export default function ElevateSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-[3vw] py-20">
      {/* Grid with text left, image right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start relative">
        {/* Heading that spans across both columns */}
        <h2 className="md:absolute md:left-[30%] md:top-4 md:z-10 text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-white md:px-4 md:py-2 md:w-auto">
          Elevate the experience
        </h2>

        {/* Text Content */}
        <div className="md:pr-8 pt-0 md:pt-40">
          <p className="text-lg leading-relaxed mb-6">
            Every detail matters. From premium bedding to fully equipped kitchens,
            our vans are designed with your comfort in mind. Wake up to stunning
            views and fall asleep under the stars.
          </p>
          <a href="/fleet" className="btn-secondary">
            See what's included
          </a>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="aspect-[4/3] bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-white text-sm">
              Campervan interior image
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
