import { Machine } from '@/types/domain'
import CalendarAvailabilityCard from '@/components/CalendarAvailabilityCard'

interface CalendarPageComponentProps {
  freeMachines: Machine[]
  funMachines: Machine[]
}

function MachineGrid({ machines }: { machines: Machine[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {machines.map((machine) => (
        <CalendarAvailabilityCard
          key={machine.slug}
          machineId={machine.documentId ?? machine.slug}
          machineName={machine.name}
          machineSlug={machine.slug}
          cardPhoto={machine.cardPhoto}
          machineType={machine.type}
        />
      ))}
    </div>
  )
}

export default function CalendarPageComponent({ freeMachines, funMachines }: CalendarPageComponentProps) {
  return (
    <section className="py-24">
      <div className="max-w-[1600px] mx-auto px-[3vw]">

        {/* FREE section */}
        {freeMachines.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gray-200"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2d5016] whitespace-nowrap">
                FREE — Kampery
              </h2>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>
            <MachineGrid machines={freeMachines} />
          </div>
        )}

        {/* FUN section */}
        {funMachines.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gray-200"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#253551] whitespace-nowrap">
                FUN — Maszyny
              </h2>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>
            <MachineGrid machines={funMachines} />
          </div>
        )}

        {freeMachines.length === 0 && funMachines.length === 0 && (
          <p className="text-center text-gray-500 py-12">Brak dostępnych maszyn.</p>
        )}
      </div>
    </section>
  )
}
