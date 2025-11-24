import { ContactPage } from '@/types/domain';
import { mediaURL } from '@/lib/images';

export function fromStrapiContactPage(e: any): ContactPage {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});

  return {
    pageTitle: a.pageTitle ?? undefined,
    pageDescription: a.pageDescription ?? undefined,
    pageImage: mediaURL(a.pageImage) ?? null,
    pageOverview: a.pageOverview ?? undefined,
  };
}
