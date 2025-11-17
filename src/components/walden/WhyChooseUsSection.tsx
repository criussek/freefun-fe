import Image from 'next/image'
import Link from 'next/link'

interface WhyChooseUsItem {
  title: string;
  content: string; // HTML content
  image: string | null;
  imagePosition: 'left' | 'right';
  buttonText?: string;
  buttonUrl?: string;
}

interface WhyChooseUsSectionProps {
  item: WhyChooseUsItem;
}

export default function WhyChooseUsSection({ item }: WhyChooseUsSectionProps) {
  const { title, content, image, imagePosition, buttonText, buttonUrl } = item;

  // Image on RIGHT (like ElevateSection)
  if (imagePosition === 'right') {
    return (
      <section className="max-w-[1400px] mx-auto px-[3vw] py-10">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_7fr] gap-8 md:gap-12 items-start relative">
          {/* Heading that spans across both columns */}
          <h2 className="md:absolute md:left-0 md:top-4 md:z-10 text-4xl md:text-5xl lg:text-6xl font-light bg-white md:pl-0 md:pr-2 md:py-2 md:w-auto py-0 px-0">
            {title}
          </h2>

          {/* Text Content */}
          <div className="md:pr-8 pt-0 md:pt-24 pb-5">
            <div
              className="prose prose-lg max-w-none tracking-wide text-base/7"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {buttonText && buttonUrl && (
              <Link href={buttonUrl} className="btn-secondary mt-5">
                {buttonText}
              </Link>
            )}
          </div>

          {/* Image */}
          <div className="relative">
            {image ? (
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  width={1200}
                  height={1000}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  {title}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Image on LEFT (like OutfittedSection)
  return (
    <section className="max-w-[1400px] mx-auto px-[3vw] py-20">
      <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8 md:gap-12 items-start relative">
        {/* Heading that spans across both columns */}
        <h2 className="md:absolute md:right-0 md:top-4 md:z-10 text-4xl md:text-5xl lg:text-6xl font-light md:text-right bg-white md:pl-2 md:pr-0 md:py-2 md:w-auto order-1 pl-0">
          {title}
        </h2>

        {/* Image */}
        <div className="order-2 md:order-1 relative">
          {image ? (
            <div className="aspect-[4/3] overflow-hidden">
              <Image
                src={image}
                alt={title}
                width={1200}
                height={1000}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-white text-sm">
                {title}
              </div>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="order-1 md:order-2 md:pl-8 pt-0 md:pt-24">
          <div
            className="prose prose-lg max-w-none tracking-wide text-base/7"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {buttonText && buttonUrl && (
            <Link href={buttonUrl} className="btn-secondary mt-5">
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
