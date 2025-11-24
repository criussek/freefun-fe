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
  const [isTransitioning, setIsTransitioning] = useState(false)
  const itemsPerPage = 3

  const maxIndex = Math.max(0, machines.length - itemsPerPage)

  const goToNext = () => {
    if (isTransitioning || currentIndex >= maxIndex) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToPrev = () => {
    if (isTransitioning || currentIndex === 0) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  // Calculate the translation offset
  const getTranslateX = () => {
    // Each card takes up 1/3 of the container width + gap
    const cardWidthPercent = 100 / itemsPerPage
    return -(currentIndex * cardWidthPercent)
  }

  return (
    <div className="relative w-full px-12 lg:px-20">
      {/* Slides Container */}
      <div className="overflow-hidden">
        <div
          className="flex gap-5 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(${-currentIndex} * ((100% + 20px) / 3)))`,
          }}
        >
          {machines.map((machine, index) => (
            <div
              key={machine.slug}
              className="bg-white p-[2%] flex-none"
              style={{ width: 'calc((100% - 40px) / 3)' }}
            >
              {/* Image */}
              <div className="w-full mb-[8%]">
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
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
              <div className="text-center text-black">
                <h2 className="text-2xl font-semibold mb-[4%] max-w-[%] mx-auto">
                  {machine.name}
                </h2>
                <div className="text-base mb-[8%] max-w-[100%] mx-auto">
                  <p>{machine.overview}</p>
                </div>
                <div className="max-w-[100%] mx-auto">
                  <Link
                    href={`/fleet/${machine.slug}`}
                    className="btn-secondary inline-block"
                  >
                    Zobacz więcej
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
            disabled={currentIndex === 0 || isTransitioning}
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-50 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous"
          >
            <svg className="w-11 h-[18px] text-white" viewBox="0 0 44 18" xmlns="http://www.w3.org/2000/svg">
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
            disabled={currentIndex >= maxIndex || isTransitioning}
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-50 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next"
          >
            <svg className="w-11 h-[18px] text-white" viewBox="0 0 44 18" xmlns="http://www.w3.org/2000/svg">
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
