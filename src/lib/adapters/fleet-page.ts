import { FleetPage } from '@/types/domain';
import { mediaURL } from '@/lib/images';

export function fromStrapiFleetPage(e: any): FleetPage {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});

  return {
    pageTitle: a.pageTitle ?? undefined,
    pageDescription: a.pageDescription ?? undefined,
    pageImage: mediaURL(a.pageImage) ?? null,
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
