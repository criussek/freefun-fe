'use client'

import { useState } from 'react'
import Image from 'next/image'

interface MachineGalleryProps {
  images: string[]
  machineName: string
}

export default function MachineGallery({ images, machineName }: MachineGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!images || images.length === 0) return null

  const displayImages = images.slice(0, 4)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = 'unset'
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') goToNext()
    if (e.key === 'ArrowLeft') goToPrev()
  }

  return (
    <>
      {/* Gallery Grid */}
      <div
        className="grid gap-1 w-full"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, 300px)',
          height: '600px'
        }}
      >
        {/* First image - spans 2 columns and 2 rows (left side, large) */}
        <div
          className="overflow-hidden bg-gray-200 cursor-pointer"
          style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }}
          onClick={() => openLightbox(0)}
        >
          <img
            src={displayImages[0]}
            alt={`${machineName} - zdjęcie 1`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            className="transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>

        {/* Second image - top right, spans 2 columns */}
        {displayImages[1] && (
          <div
            className="overflow-hidden bg-gray-200 cursor-pointer"
            style={{ gridColumn: '3 / 5', gridRow: '1' }}
            onClick={() => openLightbox(1)}
          >
            <img
              src={displayImages[1]}
              alt={`${machineName} - zdjęcie 2`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className="transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        )}

        {/* Third image - bottom right left, 1 column */}
        {displayImages[2] && (
          <div
            className="overflow-hidden bg-gray-200 cursor-pointer"
            style={{ gridColumn: '3', gridRow: '2' }}
            onClick={() => openLightbox(2)}
          >
            <img
              src={displayImages[2]}
              alt={`${machineName} - zdjęcie 3`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className="transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        )}

        {/* Fourth image - bottom right right, 1 column */}
        {displayImages[3] && (
          <div
            className="overflow-hidden bg-gray-200 cursor-pointer"
            style={{ gridColumn: '4', gridRow: '2' }}
            onClick={() => openLightbox(3)}
          >
            <img
              src={displayImages[3]}
              alt={`${machineName} - zdjęcie 4`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className="transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors"
            aria-label="Zamknij"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm z-50">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrev()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-gray-300 transition-colors"
              aria-label="Poprzednie zdjęcie"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-gray-300 transition-colors"
              aria-label="Następne zdjęcie"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Current Image */}
          <div
            className="relative w-full h-full flex items-center justify-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentImageIndex]}
              alt={`${machineName} - zdjęcie ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
