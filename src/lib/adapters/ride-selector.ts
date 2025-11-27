import { RideSelector } from '@/types/domain';
import { mediaURL } from '@/lib/images';

export function fromStrapiRideSelector(e: any): RideSelector {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});
  return {
    header: a.header ?? undefined,
    description: a.description ?? undefined,
    freeImage: mediaURL(a.freeImage) ?? null,
    freeHeader: a.freeHeader ?? undefined,
    freeDescription: a.freeDescription ?? undefined,
    funImage: mediaURL(a.funImage) ?? null,
    funHeader: a.funHeader ?? undefined,
    funDescription: a.funDescription ?? undefined,
  };
}
