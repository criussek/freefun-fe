import { StrapiEntity } from '@/types/strapi';
import { Machine, MachineFeature } from '@/types/domain';
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

  // Parse gallery - extract image URLs
  let gallery: string[] | undefined;
  if (a.gallery && a.gallery.data && Array.isArray(a.gallery.data)) {
    gallery = a.gallery.data
      .map((img: any) => mediaURL(img))
      .filter(Boolean);
  } else if (a.gallery && Array.isArray(a.gallery)) {
    // Fallback: maybe gallery is directly an array
    gallery = a.gallery
      .map((img: any) => mediaURL(img))
      .filter(Boolean);
  }

  // Parse features - extract title, content, image, imagePosition
  let features: MachineFeature[] | undefined;
  if (a.features && Array.isArray(a.features)) {
    features = a.features
      .map((feature: any) => ({
        title: feature.title ?? '',
        content: feature.content ?? '',
        image: mediaURL(feature.image) ?? null,
        imagePosition: feature.imagePosition ?? 'left',
      }))
      .filter((f: MachineFeature) => f.title && f.content);
  }

  return {
    name: a.name ?? '',
    heroName: a.heroName ?? undefined,
    heroDescription: a.heroDescription ?? undefined,
    slug: a.slug ?? '',
    type: a.type ?? 'other',
    overview: a.overview ?? '',
    fleetOverview: a.fleetOverview ?? undefined,
    cardPhoto: mediaURL(a.cardPhoto) ?? null,
    specification,
    basepriceperday: a.basePricePerDay ? Number(a.basePricePerDay) : undefined,
    serviceFee: a.serviceFee ? Number(a.serviceFee) : undefined,
    depositFee: a.depositFee ? Number(a.depositFee) : undefined,
    isActive: a.isActive ?? true,
    gallery,
    features,
  };
}
