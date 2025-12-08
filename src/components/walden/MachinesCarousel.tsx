'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Machine } from '@/types/domain'

interface MachinesCarouselProps {
  machines: Machine[]
}

export default function MachinesCarousel({ machines }: MachinesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 1024 ? 1 : 3)
      setCurrentIndex(0) // Reset to first slide on resize
    }

    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

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

  // Calculate gap in pixels (20px on desktop, 0px on mobile for 1 item)
  const gapPx = itemsPerPage === 1 ? 0 : 20
  const totalGaps = itemsPerPage - 1
  const totalGapWidth = totalGaps * gapPx

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative px-4 lg:px-20">
        {/* Slides Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              gap: `${gapPx}px`,
              transform: `translateX(calc(${-currentIndex} * ((100% + ${gapPx}px) / ${itemsPerPage})))`,
            }}
          >
            {machines.map((machine, index) => (
              <div
                key={machine.slug}
                className="bg-white p-[2%] flex-none"
                style={{ width: `calc((100% - ${totalGapWidth}px) / ${itemsPerPage})` }}
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
                <div className="text-center text-black">
                  <h2 className="text-2xl font-semibold mb-[4%] max-w-[%] mx-auto">
                    {machine.name}
                  </h2>
                  <div className="text-base mb-[8%] max-w-[100%] mx-auto">
                    <p>{machine.overview}</p>
                  </div>
                  <div className="max-w-[100%] mx-auto mb-4 lg:mb-0">
                    <Link
                      href={`/fleet/${machine.slug}`}
                      className="btn-secondary inline-block text-sm lg:text-base px-4 py-2 lg:px-8 lg:py-4"
                    >
                      Zobacz więcej
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Navigation Arrows - On sides */}
        {machines.length > itemsPerPage && (
          <>
            {/* Left Arrow - Desktop */}
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0 || isTransitioning}
              className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 z-50 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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

            {/* Right Arrow - Desktop */}
            <button
              onClick={goToNext}
              disabled={currentIndex >= maxIndex || isTransitioning}
              className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 z-50 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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

      {/* Mobile Navigation Arrows - Below carousel */}
      {machines.length > itemsPerPage && (
        <div className="lg:hidden flex justify-center gap-6 mt-6 pb-4">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0 || isTransitioning}
            className="hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            aria-label="Previous"
          >
            <svg className="w-8 h-[14px] text-white" viewBox="0 0 44 18" xmlns="http://www.w3.org/2000/svg">
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

          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex || isTransitioning}
            className="hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            aria-label="Next"
          >
            <svg className="w-8 h-[14px] text-white" viewBox="0 0 44 18" xmlns="http://www.w3.org/2000/svg">
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
        </div>
      )}
    </div>
  )
}
