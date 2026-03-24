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
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#253551]">
                Kampery
              </h2>
            </div>
            <MachineGrid machines={freeMachines} />
          </div>
        )}

        {/* FUN section */}
        {funMachines.length > 0 && (
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#253551]">
                Inne maszyny
              </h2>
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
