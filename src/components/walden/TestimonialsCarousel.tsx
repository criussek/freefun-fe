'use client'
import { useState } from 'react'

interface Testimonial {
  quote: string;
  authorName: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const nextTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('right');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      setTimeout(() => {
        setIsTransitioning(false);
        setDirection(null);
      }, 50);
    }, 300);
  }

  const prevTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setTimeout(() => {
        setIsTransitioning(false);
        setDirection(null);
      }, 50);
    }, 300);
  }

  return (
    <section className="py-6 bg-[#e0e0db]" style={{ minHeight: '2vh' }}>
      <div className="w-full px-[3vw]">
        <div className="relative flex items-center" style={{ minHeight: '2vh' }}>
          {/* Left Arrow */}
          <button
            onClick={prevTestimonial}
            disabled={isTransitioning}
            className="hidden lg:block absolute left-[3vw] top-1/2 -translate-y-1/2 z-10 hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <svg className="w-11 h-[18px]" viewBox="0 0 44 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.90649 16.96L2.1221 9.17556L9.9065 1.39116" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M42.8633 9.18125L3.37868 9.18125" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </button>

          {/* Testimonial Content */}
          <div className="w-[90%] lg:w-[60%] mx-auto text-center px-[2%]">
            <div
              className={`transition-all duration-300 ease-in-out ${
                isTransitioning
                  ? direction === 'right'
                    ? 'opacity-0 translate-x-8'
                    : 'opacity-0 -translate-x-8'
                  : 'opacity-100 translate-x-0'
              }`}
            >
              <h2 className="font-bold mb-4" style={{ fontSize: '2.2rem', lineHeight: '1.2' }}>
                {testimonials[currentIndex].authorName}
              </h2>
              <div style={{ fontSize: '1.2rem', lineHeight: '1.6', marginTop: '1%' }}>
                <p>&quot;{testimonials[currentIndex].quote}&quot;</p>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextTestimonial}
            disabled={isTransitioning}
            className="hidden lg:block absolute right-[3vw] top-1/2 -translate-y-1/2 z-10 hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <svg className="w-11 h-[18px]" viewBox="0 0 44 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.1477 1.39111L41.9321 9.17551L34.1477 16.9599" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M1.19088 9.16982H40.6755" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </button>

          {/* Mobile Arrows */}
          <div className="lg:hidden flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              disabled={isTransitioning}
              className="hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <svg className="w-6 h-[14px]" viewBox="0 0 24 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.87012 13L2.00021 7L7.87012 1" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M22.9653 7L3.03948 7" stroke="currentColor" strokeWidth="2" strokeLinecap="square" fill="none"/>
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              disabled={isTransitioning}
              className="hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <svg className="w-6 h-[14px]" viewBox="0 0 24 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1299 1L21.9998 7L16.1299 13" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M1.03472 7H20.9605" stroke="currentColor" strokeWidth="2" strokeLinecap="square" fill="none"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
