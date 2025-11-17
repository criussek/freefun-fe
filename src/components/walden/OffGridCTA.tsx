export default function OffGridCTA() {
  return (
    <section className="relative h-[60vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-700">
        <div className="w-full h-full flex items-center justify-center text-white text-sm">
          Off-grid camping image
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-[3vw]">
        <h2 className="text-white mb-6 max-w-3xl">
          Get off the grid
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
          Disconnect from the everyday and reconnect with what matters.
          Our vans are equipped with everything you need to explore the remote
          and beautiful places.
        </p>
        <a href="/trip-planning" className="btn-primary bg-white text-[#1a1a1a] hover:bg-opacity-90">
          PLAN YOUR TRIP
        </a>
      </div>
    </section>
  )
}
