import Link from 'next/link'
import Image from 'next/image'
import { Machine } from '@/types/domain'
import { Season, getLowestPricePerDay } from '@/lib/seasons'

interface MachineCardProps {
  machine: Machine
  seasons?: Season[]
}

export default function MachineCard({ machine, seasons = [] }: MachineCardProps) {
  const specifications = machine.specification?.slice(0, 5) || []

  // Calculate the lowest possible price considering all seasons applicable to this machine type
  const lowestPrice = machine.basepriceperday
    ? getLowestPricePerDay(machine.basepriceperday, seasons, machine.type)
    : null

  const price = lowestPrice
    ? `Od ${lowestPrice} zł dziennie`
    : ''

  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch pr-50">
        {/* Left Side - Content */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <div className="space-y-6">
            {/* Name */}
            <h2 className="text-[44px] leading-[58px] font-medium text-black">
              Poznaj &ldquo;{machine.name}&rdquo;
            </h2>

            {/* Overview */}
            {machine.fleetOverview && (
              <div className="text-[18px] font-light leading-[28.8px] text-gray-700" style={{ fontFamily: 'Poppins' }}>
                <p>{machine.fleetOverview}</p>
              </div>
            )}

            {/* Specifications */}
            {specifications.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-[#253551] mb-3">
                  Specyfikacja:
                </h3>
                <ul className="space-y-2">
                  {specifications.map((spec, index) => (
                    <li
                      key={index}
                      className="flex items-start text-gray-700"
                    >
                      <span className="mr-3 text-[#253551] mt-1">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price */}
            {price && (
              <div className="text-xl md:text-xl font-medium text-[#253551]">
                {price}
              </div>
            )}

            {/* Button */}
            <div className="pt-4">
              <Link
                href={`/fleet/${machine.slug}`}
                className="btn-secondary inline-block"
              >
                Zobacz więcej
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="lg:w-[65%]">
          <div className="relative w-full h-[520px] lg:h-[780px] overflow-hidden">
            {machine.cardPhoto ? (
              <Image
                src={machine.cardPhoto}
                alt={machine.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <p className="text-gray-500 text-lg">Brak zdjęcia</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
