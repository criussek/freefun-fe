import { Heart, Target, Users, Award } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Adventure',
      description: 'We live and breathe the outdoor lifestyle, and we want to share that passion with you.',
    },
    {
      icon: Target,
      title: 'Quality First',
      description: 'Every vehicle and piece of equipment is meticulously maintained to ensure your safety and comfort.',
    },
    {
      icon: Users,
      title: 'Customer Commitment',
      description: 'Your satisfaction is our top priority. We go above and beyond to make your experience unforgettable.',
    },
    {
      icon: Award,
      title: 'Industry Excellence',
      description: 'Years of experience and countless happy customers make us the trusted choice for adventure rentals.',
    },
  ]

  const team = [
    {
      name: 'Alex Thompson',
      role: 'Founder & CEO',
      bio: '15 years of experience in outdoor recreation and hospitality',
    },
    {
      name: 'Sarah Martinez',
      role: 'Operations Manager',
      bio: 'Passionate about customer service and adventure travel',
    },
    {
      name: 'Mike Chen',
      role: 'Fleet Manager',
      bio: 'Expert mechanic ensuring all vehicles are in top condition',
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-forest text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              About 3FUN
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              We&apos;re more than just a rental company - we&apos;re your partners in creating
              unforgettable outdoor adventures.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-serif text-forest mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Founded in 2019, 3FUN started with a simple dream: to make outdoor
                  adventures accessible to everyone. We believe that exploring nature
                  shouldn&apos;t be complicated or expensive.
                </p>
                <p>
                  What began as a small fleet of three campervans has grown into a
                  comprehensive rental service offering premium vehicles and adventure
                  equipment throughout the Pacific Northwest.
                </p>
                <p>
                  Today, we&apos;re proud to have helped thousands of families, couples,
                  and solo adventurers experience the freedom and joy of the open road.
                </p>
              </div>
            </div>
            <div className="bg-cream rounded-lg p-8">
              <h3 className="text-2xl font-bold text-forest mb-4">Our Mission</h3>
              <p className="text-gray-700 mb-6">
                To provide exceptional rental experiences that inspire people to explore,
                connect with nature, and create lasting memories.
              </p>
              <h3 className="text-2xl font-bold text-forest mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To be the most trusted and beloved adventure rental company, known for
                quality, service, and sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-forest mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-forest/10 p-4 rounded-full">
                      <Icon className="text-forest" size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-forest mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-forest mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Passionate adventurers dedicated to your experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-cream rounded-lg p-8 text-center">
                <div className="w-24 h-24 bg-forest/20 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-forest mb-1">{member.name}</h3>
                <p className="text-gold font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-forest text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of happy adventurers and discover the freedom of the open road.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/fleet" className="btn-primary bg-gold hover:bg-yellow-600 text-forest">
              View Our Fleet
            </a>
            <a href="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-forest">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
