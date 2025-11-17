'use client'
import { useState } from 'react'

export default function ImageGallery() {
  const images = [
    'Gallery image 1',
    'Gallery image 2',
    'Gallery image 3',
    'Gallery image 4',
    'Gallery image 5',
    'Gallery image 6',
  ]

  return (
    <section className="py-20">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-[3vw] max-w-[1200px] mx-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-full h-full flex items-center justify-center text-white text-sm">
              {image}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
