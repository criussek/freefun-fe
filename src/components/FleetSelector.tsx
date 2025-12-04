'use client'

import { useState } from 'react'
import { Machine } from '@/types/domain'
import { Season } from '@/lib/seasons'
import MachineCard from './MachineCard'

interface FleetSelectorProps {
  freeImage: string | null
  freeHeader?: string
  freeDescription?: string
  funImage: string | null
  funHeader?: string
  funDescription?: string
  freeMachines: Machine[]
  funMachines: Machine[]
  seasons: Season[]
}

type Selection = 'free' | 'fun' | null

export default function FleetSelector({
  freeImage,
  freeHeader,
  freeDescription,
  funImage,
  funHeader,
  funDescription,
  freeMachines,
  funMachines,
  seasons
}: FleetSelectorProps) {
  const [selected, setSelected] = useState<Selection>(null)

  const handleSelect = (selection: Selection) => {
    setSelected(selection)
  }

  if (!selected) {
    // Initial state: Two big images side by side
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FREE Option */}
        <div
          onClick={() => handleSelect('free')}
          className="relative h-[700px] md:h-[800px] cursor-pointer overflow-hidden group"
        >
          {freeImage && (
            <img
              src={freeImage}
              alt={freeHeader || 'FREE'}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{freeHeader || 'FREE'}</h2>
            {freeDescription && (
              <p className="text-lg md:text-xl max-w-md">{freeDescription}</p>
            )}
          </div>
        </div>

        {/* FUN Option */}
        <div
          onClick={() => handleSelect('fun')}
          className="relative h-[700px] md:h-[800px] cursor-pointer overflow-hidden group"
        >
          {funImage && (
            <img
              src={funImage}
              alt={funHeader || 'FUN'}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{funHeader || 'FUN'}</h2>
            {funDescription && (
              <p className="text-lg md:text-xl max-w-md">{funDescription}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Selected state: Minimized options at top + fleet below
  const machines = selected === 'free' ? freeMachines : funMachines

  return (
    <div>
      {/* Minimized Selection Tabs */}
      <div className="grid grid-cols-2 gap-4 mb-24">
        {/* FREE Tab */}
        <div
          onClick={() => handleSelect('free')}
          className={`relative py-8 px-6 cursor-pointer transition-all duration-300 ${
            selected === 'free'
              ? 'bg-[#253551] text-white'
              : 'bg-gray-100 text-[#253551] hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center justify-center">
            <h3 className="text-2xl md:text-3xl font-bold">{freeHeader || 'FREE'}</h3>
          </div>
        </div>

        {/* FUN Tab */}
        <div
          onClick={() => handleSelect('fun')}
          className={`relative py-8 px-6 cursor-pointer transition-all duration-300 ${
            selected === 'fun'
              ? 'bg-[#253551] text-white'
              : 'bg-gray-100 text-[#253551] hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center justify-center">
            <h3 className="text-2xl md:text-3xl font-bold">{funHeader || 'FUN'}</h3>
          </div>
        </div>
      </div>

      {/* Fleet Display */}
      {machines.length > 0 ? (
        <div className="flex flex-col gap-[114px]">
          {machines.map((machine, index) => (
            <MachineCard key={machine.slug || index} machine={machine} seasons={seasons} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Brak maszyn do wyświetlenia</p>
      )}
    </div>
  )
}
