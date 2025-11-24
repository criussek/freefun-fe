import { StrapiEntity } from '@/types/strapi';
import { Machine } from '@/types/domain';
import { mediaURL } from '@/lib/images';

export function fromStrapiMachine(e: StrapiEntity<any>): Machine {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});

  // Parse specifications - extract label-value pairs into strings
  let specification: string[] | undefined;
  if (a.specifications && Array.isArray(a.specifications)) {
    specification = a.specifications
      .map((spec: any) => {
        if (spec.label && spec.value) {
          return `${spec.label}: ${spec.value}`;
        }
        return null;
      })
      .filter(Boolean);
  }

  return {
    name: a.name ?? '',
    slug: a.slug ?? '',
    type: a.type ?? 'other',
    overview: a.overview ?? '',
    fleetOverview: a.fleetOverview ?? undefined,
    cardPhoto: mediaURL(a.cardPhoto) ?? null,
    specification,
    basepriceperday: a.basePricePerDay ? Number(a.basePricePerDay) : undefined,
    isActive: a.isActive ?? true,
  };
}
