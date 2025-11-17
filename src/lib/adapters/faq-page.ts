import { FAQPage } from '@/types/domain';
import { mediaURL } from '@/lib/images';

export function fromStrapiFAQPage(e: any): FAQPage {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});

  return {
    pageTitle: a.pageTitle ?? undefined,
    pageDescription: a.pageDescription ?? undefined,
    pageImage: mediaURL(a.pageImage) ?? null,
    contactTitle: a.contactTitle ?? undefined,
    contactDescription: a.contactDescription ?? undefined,
  };
}
