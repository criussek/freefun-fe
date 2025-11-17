import { BookNow } from '@/types/domain';
import { mediaURL } from '@/lib/images';

export function fromStrapiBookNow(s: any): BookNow {
  const a = (s && (s as any).attributes) ? (s as any).attributes : (s ?? {});

  return {
    sectionTitle: a.sectionTitle ?? undefined,
    sectionDescription: a.sectionDescription ?? undefined,
    sectionImage: mediaURL(a.sectionImage) ?? null,
    buttonLabel: a.buttonLabel ?? undefined,
    buttonUrl: a.buttonUrl ?? undefined,
  };
}
