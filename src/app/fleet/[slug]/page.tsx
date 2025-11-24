import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiList } from '@/types/strapi'
import { fromStrapiMachine } from '@/lib/adapters/machine'
import { POP_MACHINES } from '@/lib/populate'
import { notFound } from 'next/navigation'
import PageHero from '@/components/walden/PageHero'
import MachineGallery from '@/components/MachineGallery'
import MachineDatePicker from '@/components/MachineDatePicker'

interface MachinePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const machinesRes = await fetchStrapiOrNull<StrapiList<any>>('/api/machines', {
    params: {
      fields: ['slug'],
    },
    revalidate: 3600,
  })

  const machines = Array.isArray(machinesRes?.data) ? machinesRes.data : []

  return machines.map((machine: any) => ({
    slug: machine.attributes?.slug || machine.slug,
  }))
}

export default async function MachinePage({ params }: MachinePageProps) {
  const { slug } = await params

  // Fetch machine by slug
  const machinesRes = await fetchStrapiOrNull<StrapiList<any>>('/api/machines', {
    params: {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      ...POP_MACHINES,
    },
    revalidate: 3600,
  })

  const machines = Array.isArray(machinesRes?.data)
    ? machinesRes.data.map(fromStrapiMachine).filter(Boolean)
    : []

  const machine = machines[0]

  if (!machine) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHero
        title={machine.heroName || `Poznaj "${machine.name}"`}
        description={machine.heroDescription || machine.fleetOverview || machine.overview || ''}
        backgroundImage={machine.cardPhoto}
      />

      {/* Feature Sections - First in content area */}
      {machine.features && machine.features.length > 0 && (
        <div>
          {machine.features.map((feature, index) => {
            // Image on RIGHT
            if (feature.imagePosition === 'right') {
              return (
                <section key={index} className="max-w-[1400px] mx-auto px-[3vw] py-10">
                  <div className="grid grid-cols-1 md:grid-cols-[3fr_7fr] gap-8 md:gap-12 items-start relative">
                    {/* Heading that spans across both columns */}
                    <h2 className="md:absolute md:left-0 md:top-4 md:z-10 text-4xl md:text-5xl lg:text-6xl font-light bg-white md:pl-0 md:pr-2 md:py-2 md:w-auto py-0 px-0">
                      {feature.title}
                    </h2>

                    {/* Text Content */}
                    <div className="md:pr-8 pt-0 md:pt-24 pb-5">
                      <div
                        className="prose prose-lg max-w-none tracking-wide text-base/7"
                        dangerouslySetInnerHTML={{ __html: feature.content }}
                      />
                    </div>

                    {/* Image */}
                    <div className="relative">
                      {feature.image ? (
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/3] bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center text-white text-sm">
                            {feature.title}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )
            }

            // Image on LEFT
            return (
              <section key={index} className="max-w-[1400px] mx-auto px-[3vw] py-20">
                <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8 md:gap-12 items-start relative">
                  {/* Heading that spans across both columns */}
                  <h2 className="md:absolute md:right-0 md:top-4 md:z-10 text-4xl md:text-5xl lg:text-6xl font-light md:text-right bg-white md:pl-2 md:pr-0 md:py-2 md:w-auto order-1 pl-0">
                    {feature.title}
                  </h2>

                  {/* Image */}
                  <div className="order-2 md:order-1 relative">
                    {feature.image ? (
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-white text-sm">
                          {feature.title}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="order-1 md:order-2 md:pl-8 pt-0 md:pt-24">
                    <div
                      className="prose prose-lg max-w-none tracking-wide text-base/7"
                      dangerouslySetInnerHTML={{ __html: feature.content }}
                    />
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      )}

      {/* Content Area */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-[3vw]">

          {/* Machine Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#253551] mb-4">
              {machine.name}
            </h1>

            {/* Machine Info */}
            <div className="flex flex-wrap gap-4 text-gray-700">
              <div className="flex items-center gap-2">
                <span className="font-medium">Typ:</span>
                <span>{machine.type}</span>
              </div>
              {machine.basepriceperday && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Od</span>
                  <span className="font-bold text-[#253551]">{machine.basepriceperday} zł dziennie</span>
                </div>
              )}
            </div>
          </header>

          {/* Fleet Overview */}
          {machine.fleetOverview && (
            <div className="mb-12">
              <p className="text-lg text-gray-700" style={{
                fontFamily: 'Poppins',
                fontSize: '18px',
                fontWeight: 300,
                lineHeight: '28.8px'
              }}>
                {machine.fleetOverview}
              </p>
            </div>
          )}

          {/* Gallery */}
          {machine.gallery && machine.gallery.length > 0 && (
            <div className="mb-12">
              <MachineGallery images={machine.gallery} machineName={machine.name} />
            </div>
          )}

          {/* Specifications */}
          {machine.specification && machine.specification.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#253551] mb-6">Specyfikacja:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {machine.specification.map((spec, index) => (
                  <div key={index} className="text-gray-700">
                    {spec}
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* Date Picker Section */}
          <MachineDatePicker
            machineName={machine.name}
            pricePerDay={machine.basepriceperday}
            serviceFee={machine.serviceFee}
            depositFee={machine.depositFee}
          />

        </div>
      </section>
    </main>
  )
}
