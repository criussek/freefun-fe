import Link from 'next/link'
import Image from 'next/image'
import { BookNow } from '@/types/domain'

interface BookNowSectionProps {
  bookNow: BookNow
}

export default function BookNowSection({ bookNow }: BookNowSectionProps) {
  const { sectionTitle, sectionDescription, sectionImage, buttonLabel, buttonUrl } = bookNow

  return (
    <section className="relative w-full text-white min-h-[600px] md:min-h-[700px] py-32 md:py-40">
      {/* Background Image */}
      {sectionImage && (
        <div className="absolute inset-0">
          <Image
            src={sectionImage}
            alt={sectionTitle || 'Book Now'}
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative">
        {/* Section Header */}
        {sectionTitle && (
          <div className="max-w-[1200px] mx-auto px-[4vw] pt-10 pb-16 text-center">
            <h2 className="mb-12 font-medium text-white">{sectionTitle}</h2>
            {sectionDescription && (
              <>
                <p className="text-xl text-white max-w-3xl mx-auto tracking-wide text-base/7 mb-8">
                  {sectionDescription}
                </p>
                <hr className="max-w-md mx-auto border-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
              </>
            )}
          </div>
        )}

        {/* Button */}
        {buttonLabel && buttonUrl && (
          <div className="text-center mt-16">
            <Link
              href={buttonUrl}
              className="border-2 tracking-wider border-white text-white px-8 py-4 font-bold hover:bg-white hover:text-black transition-all text-center inline-block"
            >
              {buttonLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
