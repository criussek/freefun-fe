import { StrapiEntity } from '@/types/strapi';
import { Hero } from '@/types/domain';
import { mediaURL } from '@/lib/images';

export function fromStrapiHero(e: StrapiEntity<any>): Hero {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});
  return {
    freeImage: mediaURL(a.freeImage) ?? null,
    freeHeader: a.freeHeader ?? undefined,
    freeDescription: a.freeDescription ?? undefined,
    funImage: mediaURL(a.funImage) ?? null,
    funHeader: a.funHeader ?? undefined,
    funDescription: a.funDescription ?? undefined,
  };
}
