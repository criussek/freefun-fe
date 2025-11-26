import { fetchStrapiOrNull } from '@/lib/strapi';
import { notFound, redirect } from 'next/navigation';
import CheckoutPageComponent from '@/components/CheckoutPageComponent';
import { StrapiSingle } from '@/types/strapi';
import { fromStrapiSiteSettings } from '@/lib/adapters/site-setting';
import { POP_SITE_SETTINGS } from '@/lib/populate';

// This page cannot be statically generated (bookings are created at runtime)
export const dynamic = 'force-dynamic';

interface CheckoutPageProps {
  params: Promise<{ id: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { id } = await params;

  // Fetch site settings for pickup address
  const siteSettingsRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/site-setting', {
    params: POP_SITE_SETTINGS,
    revalidate: 3600,
  });
  const siteSettings = siteSettingsRes?.data ? fromStrapiSiteSettings(siteSettingsRes.data) : undefined;

  // Fetch booking with machines populated
  const bookingRes = await fetchStrapiOrNull<StrapiSingle<any>>(`/api/bookings/${id}`, {
    params: {
      populate: ['machines.cardPhoto', 'machines.gallery']
    }
  });

  if (!bookingRes?.data) {
    notFound();
  }

  const booking = bookingRes.data;

  // Debug: Log the booking structure
  console.log('Booking structure:', JSON.stringify(booking, null, 2));

  // Handle both possible response structures (v4 vs v5)
  const attributes = booking.attributes || booking;

  // Check status - only pending bookings can be edited
  if (attributes.bookingStatus !== 'pending') {
    // Redirect to summary if not pending
    redirect(`/booking/${id}/summary`);
  }

  // Fetch available additional machines (same dates as primary)
  const machines = attributes.machines?.data || attributes.machines || [];
  const primaryMachine = machines[0];

  // Build filters for additional machines
  const primaryMachineAttrs = primaryMachine?.attributes || primaryMachine;
  const filters: any = {
    isActive: true,
    documentId: { $ne: primaryMachine?.documentId || primaryMachine?.id }
  };

  // If primary is camper, exclude all campers
  if (primaryMachineAttrs?.type === 'camper') {
    filters.type = { $ne: 'camper' };
  }

  const machinesRes = await fetchStrapiOrNull('/api/machines', {
    params: {
      filters,
      populate: ['cardPhoto']
    }
  });

  const availableMachines = machinesRes?.data || [];

  // Check availability for these machines
  const availabilityRes = await fetchStrapiOrNull('/api/bookings/check-availability', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      machineIds: availableMachines.map((m: any) => m.documentId),
      startDate: attributes.startDate,
      endDate: attributes.endDate
    })
  });

  // Filter out unavailable machines
  const availableMachinesFiltered = availableMachines.filter((m: any) => {
    const hasConflict = availabilityRes?.conflicts?.some((c: any) => c.machineId === m.documentId);
    return !hasConflict;
  });

  // Fetch additional services from rate
  const rateRes = await fetchStrapiOrNull('/api/rate', {
    params: {
      populate: ['extraPaidItemsDetails.paidItems']
    }
  });

  const rateData = rateRes?.data?.attributes || rateRes?.data || {};
  const additionalServices = rateData.extraPaidItemsDetails?.paidItems || [];

  // Normalize booking structure for component
  const normalizedBooking = {
    documentId: booking.documentId || booking.id,
    attributes: attributes
  };

  return (
    <main className="bg-gray-50">
      <CheckoutPageComponent
        booking={normalizedBooking}
        availableMachines={availableMachinesFiltered}
        additionalServices={additionalServices}
        pickupAddress={siteSettings?.contactAddress || 'Adres odbioru zostanie podany w wiadomości email'}
      />
    </main>
  );
}
