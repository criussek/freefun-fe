'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Machine } from '@/types/domain'

interface MachinesCarouselProps {
  machines: Machine[]
}

export default function MachinesCarousel({ machines }: MachinesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  const maxIndex = Math.max(0, machines.length - itemsPerPage)

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const visibleMachines = machines.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <div className="relative w-full">
      {/* Slides Container */}
      <div className="overflow-hidden">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-300"
          style={{
            transform: `translateX(0)`,
          }}
        >
          {visibleMachines.map((machine, index) => (
            <div
              key={machine.slug}
              className="bg-white p-[6%] rounded-lg"
            >
              {/* Image */}
              <div className="w-full mb-[8%]">
                <div className="relative aspect-[3/2] overflow-hidden">
                  {machine.cardPhoto ? (
                    <Image
                      src={machine.cardPhoto}
                      alt={machine.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white">
                      {machine.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-[4%] max-w-[75%] mx-auto">
                  {machine.name}
                </h2>
                <div className="text-base mb-[8%] max-w-[75%] mx-auto">
                  <p>{machine.overview}</p>
                </div>
                <div className="max-w-[75%] mx-auto">
                  <Link
                    href={`/${machine.slug}`}
                    className="btn-secondary inline-block"
                  >
                    Rezerwuj
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {machines.length > itemsPerPage && (
        <>
          {/* Left Arrow */}
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 disabled:opacity-30 disabled:cursor-not-allowed p-4 rounded-full shadow-lg transition-all"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" viewBox="0 0 44 18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.90649 16.96L2.1221 9.17556L9.9065 1.39116"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M42.8633 9.18125L3.37868 9.18125"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 disabled:opacity-30 disabled:cursor-not-allowed p-4 rounded-full shadow-lg transition-all"
            aria-label="Next"
          >
            <svg className="w-6 h-6" viewBox="0 0 44 18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M34.1477 1.39111L41.9321 9.17551L34.1477 16.9599"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M1.19088 9.16982H40.6755"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}
