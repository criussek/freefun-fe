import { StrapiEntity } from '@/types/strapi';
import { Hero } from '@/types/domain';
import { mediaURL } from '@/lib/images';

export function fromStrapiHero(e: StrapiEntity<any>): Hero {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});
  return {
    title: a.title ?? '',
    subtitle: a.subtitle ?? '',
    subSubtitle: a.sub_subtitle ?? '',
    description: a.description ?? '',
    backgroundImage: mediaURL(a.backgroundImage) ?? null,
    primaryButtonLabel: a.primaryButtonLabel ?? undefined,
    primaryButtonUrl: a.primaryButtonUrl ?? undefined,
    secondaryButtonLabel: a.secondaryButtonLabel ?? undefined,
    secondaryButtonUrl: a.secondaryButtonUrl ?? undefined,
  };
}
