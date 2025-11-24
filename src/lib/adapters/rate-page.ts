import { RatePage, RateSection, RateItem } from '@/types/domain';
import { mediaURL } from '@/lib/images';

export function fromStrapiRatePage(e: any): RatePage {
  const a = (e && (e as any).attributes) ? (e as any).attributes : (e ?? {});

  // Parse includedDetails section
  const includedDetails: RateSection | null = a.includedDetails ? {
    header: a.includedDetails.header ?? '',
    description: a.includedDetails.description ?? '',
    items: Array.isArray(a.includedDetails.includedItems)
      ? a.includedDetails.includedItems.map((item: any) => ({
          title: item.itemHeader ?? '',
          description: item.itemDescription ?? '',
        }))
      : []
  } : null;

  // Parse extraPaidItemsDetails section
  const extraPaidItemsDetails: RateSection | null = a.extraPaidItemsDetails ? {
    header: a.extraPaidItemsDetails.header ?? '',
    description: a.extraPaidItemsDetails.description ?? '',
    items: Array.isArray(a.extraPaidItemsDetails.paidItems)
      ? a.extraPaidItemsDetails.paidItems.map((item: any) => ({
          title: item.itemHeader ?? '',
          description: item.itemDescription ?? '',
          itemPrice: item.itemPrice ? Number(item.itemPrice) : undefined,
          priceInterval: item.priceInterval ?? undefined,
        }))
      : []
  } : null;

  return {
    pageTitle: a.pageTitle ?? undefined,
    pageDescription: a.pageDescription ?? undefined,
    pageImage: mediaURL(a.pageImage) ?? null,
    includedDetails,
    bookingDetails: a.bookingDetails ?? null,
    extraPaidItemsDetails,
  };
}
