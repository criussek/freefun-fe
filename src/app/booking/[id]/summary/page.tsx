import { fetchStrapiOrNull } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import BookingSummaryComponent from '@/components/BookingSummaryComponent';
import { StrapiSingle } from '@/types/strapi';
import { fromStrapiSiteSettings } from '@/lib/adapters/site-setting';
import { POP_SITE_SETTINGS } from '@/lib/populate';

// This page cannot be statically generated (bookings are created at runtime)
export const dynamic = 'force-dynamic';

interface BookingSummaryPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingSummaryPage({ params }: BookingSummaryPageProps) {
  const { id } = await params;

  // Fetch site settings for pickup address
  const siteSettingsRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/site-setting', {
    params: POP_SITE_SETTINGS,
    revalidate: 3600,
  });
  const siteSettings = siteSettingsRes?.data ? fromStrapiSiteSettings(siteSettingsRes.data) : undefined;

  // Fetch booking with all details
  const bookingRes = await fetchStrapiOrNull(`/api/bookings/${id}`, {
    params: {
      populate: {
        machines: {
          fields: ['name', 'type', 'overview', 'serviceFee', 'depositFee'],
          populate: {
            cardPhoto: {
              fields: ['url', 'alternativeText']
            },
            specifications: {
              fields: ['label', 'value']
            }
          }
        },
        guests: {
          fields: '*'
        }
      }
    }
  });

  if (!bookingRes?.data) {
    notFound();
  }

  return (
    <main className="bg-gray-50">
      <BookingSummaryComponent
        booking={bookingRes.data}
        pickupAddress={siteSettings?.contactAddress || 'Adres zostanie podany w wiadomości email'}
        bankName={siteSettings?.bankName}
        bankNumber={siteSettings?.bankNumber}
        contactEmail={siteSettings?.contactEmail}
        contactPhone={siteSettings?.contactPhone}
      />
    </main>
  );
}
