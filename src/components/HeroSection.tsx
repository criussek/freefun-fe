import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="relative bg-forest text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-forest to-primary opacity-90"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">
            Rent, Camp & Have Fun
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Experience the freedom of the open road with our premium campervans
            and adventure equipment rentals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fleet" className="btn-primary bg-gold hover:bg-yellow-600 text-forest">
              View Our Fleet
            </Link>
            <Link href="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-forest">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl font-bold text-gold mb-2">500+</div>
            <div className="text-gray-200">Happy Customers</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl font-bold text-gold mb-2">20+</div>
            <div className="text-gray-200">Vehicles & Machines</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl font-bold text-gold mb-2">5 Years</div>
            <div className="text-gray-200">In Business</div>
          </div>
        </div>
      </div>
    </div>
  )
}
