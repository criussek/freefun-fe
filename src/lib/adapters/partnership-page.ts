import { PartnershipPage } from '@/types/domain';
import { mediaURL } from '@/lib/images';

export function fromStrapiPartnershipPage(e: any): PartnershipPage {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});

  return {
    pageTitle: a.pageTitle ?? undefined,
    pageDescription: a.pageDescription ?? undefined,
    pageImage: mediaURL(a.pageImage) ?? null,
    pageOverview: a.pageOverview ?? undefined,
  };
}
