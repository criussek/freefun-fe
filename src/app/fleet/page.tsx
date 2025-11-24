import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiList, StrapiSingle } from '@/types/strapi'
import { fromStrapiMachine } from '@/lib/adapters/machine'
import { fromStrapiFleetPage } from '@/lib/adapters/fleet-page'
import { POP_MACHINES, POP_FLEET_PAGE } from '@/lib/populate'
import PageHero from '@/components/walden/PageHero'
import FleetSelector from '@/components/FleetSelector'

export default async function FleetPage() {
  // Fetch machines from Strapi
  const machinesRes = await fetchStrapiOrNull<StrapiList<any>>('/api/machines', {
    params: { populate: '*' },
    revalidate: 60,
  })

  const allMachines = Array.isArray(machinesRes?.data)
    ? machinesRes.data.map(fromStrapiMachine).filter(Boolean)
    : []

  // Filter only active machines
  const activeMachines = allMachines.filter(machine => machine.isActive !== false)

  // Split machines: FREE (camper) vs FUN (jet_ski, quad, motocross, other)
  const freeMachines = activeMachines.filter(machine => machine.type === 'camper')
  const funMachines = activeMachines.filter(machine => machine.type !== 'camper')

  // Fetch fleet page data
  const fleetPageRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/fleet', {
    params: POP_FLEET_PAGE,
    revalidate: 3600,
  })

  const fleetPage = fleetPageRes?.data ? fromStrapiFleetPage(fleetPageRes.data) : undefined

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHero
        title={fleetPage?.pageTitle || 'Nasza Flota'}
        description={fleetPage?.pageDescription || ''}
        backgroundImage={fleetPage?.pageImage || null}
      />

      {/* Fleet Selection Section */}
      <section className="py-24">
        <div className="max-w-[1600px] mx-auto px-[3vw]">
          {/* Header and Description */}
          {(fleetPage?.header || fleetPage?.description) && (
            <div className="text-center mb-12">
              {fleetPage?.header && (
                <h2 className="text-3xl md:text-4xl font-bold text-[#253551] mb-4">
                  {fleetPage.header}
                </h2>
              )}
              {fleetPage?.description && (
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  {fleetPage.description}
                </p>
              )}
            </div>
          )}

          {/* Fleet Selector */}
          <FleetSelector
            freeImage={fleetPage?.freeImage || null}
            freeHeader={fleetPage?.freeHeader}
            freeDescription={fleetPage?.freeDescription}
            funImage={fleetPage?.funImage || null}
            funHeader={fleetPage?.funHeader}
            funDescription={fleetPage?.funDescription}
            freeMachines={freeMachines}
            funMachines={funMachines}
          />
        </div>
      </section>
    </main>
  )
}
