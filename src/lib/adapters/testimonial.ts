import { StrapiEntity } from '@/types/strapi';
import { Testimonial } from '@/types/domain';

export function fromStrapiTestimonial(e: StrapiEntity<any>): Testimonial {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});
  return {
    quote: a.quote ?? a.text ?? '',
    authorName: a.authorName ?? a.author ?? 'Anonymous',
  };
}
