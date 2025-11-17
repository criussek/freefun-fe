import bgHero from '@/media/bg-hero.png'

interface PageHeroProps {
  title: string
  description?: string
  backgroundImage: string | null
}

export default function PageHero({ title, description, backgroundImage }: PageHeroProps) {
  const bgImage = backgroundImage || bgHero.src

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600">
        <img src={bgImage} alt="Hero background" className="w-full h-full object-cover" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white max-w-[1200px] mx-auto px-[3vw]">
        <div className="max-w-4xl text-center">
          <h1 className="text-white mb-4 font-bold tracking-wide text-6xl block">
            {title}
          </h1>
          {description && (
            <p className="text-xl md:text-xl font-semibold opacity-85">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
