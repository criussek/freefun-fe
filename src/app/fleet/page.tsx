import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiList, StrapiSingle } from '@/types/strapi'
import { fromStrapiMachine } from '@/lib/adapters/machine'
import { fromStrapiFleetPage } from '@/lib/adapters/fleet-page'
import { POP_MACHINES, POP_FLEET_PAGE } from '@/lib/populate'
import PageHero from '@/components/walden/PageHero'
import MachineCard from '@/components/MachineCard'

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
  const machines = allMachines.filter(machine => machine.isActive !== false)

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

      {/* Machines List Section */}
      <section className="py-24">
        <div className="max-w-[1600px] mx-auto px-[3vw]">
          {machines.length > 0 ? (
            <div className="flex flex-col gap-[114px]">
              {machines.map((machine, index) => (
                <MachineCard key={machine.slug || index} machine={machine} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Brak maszyn do wyświetlenia</p>
          )}
        </div>
      </section>
    </main>
  )
}
