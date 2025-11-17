import { StrapiEntity } from '@/types/strapi';
import { Machine } from '@/types/domain';
import { mediaURL } from '@/lib/images';

export function fromStrapiMachine(e: StrapiEntity<any>): Machine {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});
  return {
    name: a.name ?? '',
    slug: a.slug ?? '',
    type: a.type ?? 'other',
    overview: a.overview ?? '',
    cardPhoto: mediaURL(a.cardPhoto) ?? null,
  };
}
