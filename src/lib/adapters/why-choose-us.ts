import { StrapiEntity } from '@/types/strapi';
import { WhyChooseUs } from '@/types/domain';
import { mediaURL } from '@/lib/images';

export function fromStrapiWhyChooseUs(e: StrapiEntity<any>): WhyChooseUs {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});
  return {
    title: a.title ?? '',
    content: a.content ?? '',
    image: mediaURL(a.image) ?? null,
    imagePosition: (a.imagePosition === 'left' || a.imagePosition === 'right') ? a.imagePosition : 'left',
    buttonText: a.buttonText ?? undefined,
    buttonUrl: a.buttonUrl ?? undefined,
  };
}
