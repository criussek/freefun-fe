import bgHero from '@/media/bg-hero.png';
import { Hero } from '@/types/domain';

interface HeroSectionProps {
  hero?: Hero;
}

export default function HeroSection({ hero }: HeroSectionProps) {
  // Use Strapi data if available, otherwise use defaults
  const backgroundImage = hero?.backgroundImage || bgHero.src;
  const title = hero?.title || '';
  const subtitle = hero?.subtitle || '';
  const subSubtitle = hero?.subSubtitle || '';
  const description = hero?.description || '';
  const primaryButtonLabel = hero?.primaryButtonLabel || '';
  const primaryButtonUrl = hero?.primaryButtonUrl || '';
  const secondaryButtonLabel = hero?.secondaryButtonLabel || '';
  const secondaryButtonUrl = hero?.secondaryButtonUrl || '';

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600">
        <img src={backgroundImage} alt="Hero background" className="w-full h-full object-cover"/>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center text-white max-w-[1200px] mx-auto px-[3vw]">
        <div className="max-w-4xl">
          <h2 className="text-white mb-8 font-bold tracking-wide">
            {title}{subtitle && <span style={{ color: '#253551' }}> {subtitle}</span>}{subSubtitle && <span> {subSubtitle}</span>}
          </h2>
          <p className="text-xl md:text-xl mb-16 font-semibold opacity-85">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={primaryButtonUrl} className="border-2 bg-white tracking-wider text-black px-8 py-4 font-bold hover:bg-opacity-80 transition-all text-center">
              {primaryButtonLabel}
            </a>
            <a href={secondaryButtonUrl} className="border-2 tracking-wider border-white text-white px-8 py-4 font-bold hover:bg-white hover:text-black transition-all text-center">
              {secondaryButtonLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
