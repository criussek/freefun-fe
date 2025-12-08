'use client';

import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useState } from 'react';
import { mediaURL } from '@/lib/images';

interface BookingSummaryComponentProps {
  booking: any;
  pickupAddress?: string;
  bankName?: string;
  bankNumber?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export default function BookingSummaryComponent({
  booking,
  pickupAddress,
  bankName,
  bankNumber,
  contactEmail,
  contactPhone
}: BookingSummaryComponentProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Handle both possible response structures (v4 vs v5)
  const attributes = booking.attributes || booking;
  const machines = attributes.machines?.data || attributes.machines || [];
  const primaryMachine = machines[0];

  if (!primaryMachine) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <p className="text-red-800">Błąd: Nie znaleziono maszyny w rezerwacji.</p>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'd MMMM yyyy', { locale: pl });
  };

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), 'd MMMM yyyy, HH:mm', { locale: pl });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Calculate service fees (for display purposes)
  const serviceFees = machines.reduce((sum: number, machine: any) => {
    const machineAttrs = machine.attributes || machine;
    return sum + (machineAttrs.serviceFee || 0);
  }, 0);

  // Use totals from backend (already includes machines + services + fees)
  const subtotal = attributes.totalPrice || 0;
  const depositAmount = subtotal * 0.5; // 50% payment deposit
  const remainingAmount = subtotal - depositAmount;
  const refundableDeposit = attributes.depositAmount || 0; // Refundable security deposit

  // For breakdown display
  const additionalServicesTotal = attributes.additionalServicesTotal || 0;
  const baseTotal = subtotal - additionalServicesTotal - serviceFees;

  return (
    <>
      {/* Global styles for booking page and print */}
      <style jsx global>{`
        nav {
          background-color: rgba(0, 0, 0, 0.8) !important;
          position: relative !important;
        }

        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 pb-12" style={{ paddingTop: '40px' }}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Banner */}
        {attributes.bookingStatus === 'confirmed' ? (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="text-2xl font-bold text-green-900">
                Rezerwacja potwierdzona!
              </h1>
            </div>
            <p className="text-green-800">
              Twoja rezerwacja została potwierdzona. Sprawdź swój email z potwierdzeniem i szczegółami rezerwacji.
            </p>
          </div>
        ) : attributes.bookingStatus === 'cancelled' ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="text-2xl font-bold text-red-900">
                Rezerwacja anulowana
              </h1>
            </div>
            <p className="text-red-800">
              Ta rezerwacja została anulowana. Jeśli masz pytania, skontaktuj się z nami.
            </p>
          </div>
        ) : (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="text-2xl font-bold text-green-900">
                Rezerwacja złożona!
              </h1>
            </div>
            <p className="text-green-800">
              Dziękujemy za złożenie rezerwacji. Sprawdź swój email, aby uzyskać szczegóły płatności.
            </p>
          </div>
        )}

        {/* Booking Reference */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                Numer rezerwacji
              </h2>
              <p className="text-lg sm:text-2xl font-bold text-[#253551]">
                {attributes.bookingReference || booking.documentId}
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Status</h2>
              {attributes.bookingStatus === 'confirmed' && (
                <span className="inline-block px-2 py-1 sm:px-4 sm:py-2 bg-green-100 text-green-800 rounded-lg font-semibold text-xs sm:text-base">
                  ✅ Potwierdzona
                </span>
              )}
              {attributes.bookingStatus === 'cancelled' && (
                <span className="inline-block px-2 py-1 sm:px-4 sm:py-2 bg-red-100 text-red-800 rounded-lg font-semibold text-xs sm:text-base">
                  ❌ Anulowana
                </span>
              )}
              {(!attributes.bookingStatus || attributes.bookingStatus === 'pending') && (
                <span className="inline-block px-2 py-1 sm:px-4 sm:py-2 bg-yellow-100 text-yellow-800 rounded-lg font-semibold text-xs sm:text-base">
                  Oczekuje na wpłatę
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Payment Instructions - Only show for pending bookings */}
        {(!attributes.bookingStatus || attributes.bookingStatus === 'pending') && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            INSTRUKCJE PŁATNOŚCI
          </h2>

          <p className="mb-4 text-yellow-900">
            Aby potwierdzić rezerwację, wpłać zaliczkę w wysokości{' '}
            <strong className="text-lg">{depositAmount.toFixed(2)} zł</strong>{' '}
            w ciągu 7 dni (do {formatDate(attributes.paymentDeadline)}).
          </p>

          <div className="space-y-4">
            {/* Bank Transfer */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                💳 Metoda 1: Przelew bankowy
              </h3>
              <dl className="space-y-1 text-sm">
                {bankName && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                    <dt className="font-medium text-gray-600 sm:w-32">Nazwa banku:</dt>
                    <dd className="text-gray-900 flex-1 break-words">{bankName}</dd>
                    <button
                      onClick={() => handleCopy(bankName, 'bankName')}
                      className="self-start sm:ml-2 p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors print:hidden"
                      title="Kopiuj nazwę banku"
                    >
                      {copiedField === 'bankName' ? (
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <dt className="font-medium text-gray-600 sm:w-32">Numer konta:</dt>
                  <dd className="text-gray-900 flex-1 break-all">{bankNumber || '12 3456 7890 1234 5678 9012 3456'}</dd>
                  <button
                    onClick={() => handleCopy(bankNumber || '12 3456 7890 1234 5678 9012 3456', 'bankNumber')}
                    className="self-start sm:ml-2 p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors print:hidden"
                    title="Kopiuj numer konta"
                  >
                    {copiedField === 'bankNumber' ? (
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-0">
                  <dt className="font-medium text-gray-600 sm:w-32">Tytuł:</dt>
                  <dd className="text-gray-900 break-words">
                    Rezerwacja {attributes.bookingReference || booking.documentId}
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-0">
                  <dt className="font-medium text-gray-600 sm:w-32">Kwota:</dt>
                  <dd className="text-gray-900">
                    {depositAmount.toFixed(2)} zł
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-0">
                  <dt className="font-medium text-gray-600 sm:w-32">Odbiorca:</dt>
                  <dd className="text-gray-900">Free & Fun Sp. z o.o.</dd>
                </div>
              </dl>
            </div>

            {/* Cash */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                💵 Metoda 2: Gotówka
              </h3>
              <p className="text-sm text-gray-700">
                Odwiedź nasze biuro:<br />
                {pickupAddress || 'ul. Przykładowa 123, 80-000 Gdańsk'}<br />
                Pon-Pt: 9:00-17:00, Sob: 10:00-14:00
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
            <strong>⚠️ Ważne:</strong> Jeśli nie otrzymamy wpłaty do{' '}
            {formatDate(attributes.paymentDeadline)}, rezerwacja zostanie automatycznie anulowana.
          </div>

          {/* Refundable Deposit Info */}
          {refundableDeposit > 0 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
              <strong>ℹ️ Informacja o kaucji:</strong> Kaucja zwrotna w wysokości{' '}
              <strong>{refundableDeposit.toFixed(2)} zł</strong> zostanie pobrana przy odbiorze i zwrócona po zwrocie pojazdu bez uszkodzeń.
            </div>
          )}
        </div>
        )}

        {/* Booking Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#253551] mb-4">
            Szczegóły rezerwacji
          </h2>

          {/* Dates & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Odbiór</h3>
              <p className="font-semibold text-gray-900">
                {formatDate(attributes.startDate)}
                {attributes.pickupTime && ` o ${attributes.pickupTime.slice(0, 5)}`}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Zwrot</h3>
              <p className="font-semibold text-gray-900">
                {formatDate(attributes.endDate)}
                {attributes.returnTime && ` o ${attributes.returnTime.slice(0, 5)}`}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Czas trwania</h3>
              <p className="font-semibold text-gray-900">
                {attributes.daysCount}{' '}
                {attributes.daysCount === 1
                  ? 'dzień'
                  : attributes.daysCount < 5
                  ? 'dni'
                  : 'dni'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Miejsce odbioru
              </h3>
              <p className="font-semibold text-gray-900">
                {attributes.pickupLocation || 'Nie podano'}
              </p>
            </div>
          </div>

          {/* All Machines (Primary + Additional) */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {machines.length === 1 ? 'Kamper' : 'Wynajęte pojazdy i maszyny'}
            </h3>
            <div className="space-y-3">
              {machines.map((machine: any, idx: number) => {
                const machineAttrs = machine.attributes || machine;
                const cardPhotoUrl = mediaURL(machineAttrs.cardPhoto);
                const isPrimary = idx === 0;

                // Calculate total from priceSnapshot (prices are already locked with season multiplier)
                // Match by machine name since documentId might not be populated
                const machineName = machineAttrs.name;
                const machinePrices = attributes.priceSnapshot?.filter(
                  (snapshot: any) => snapshot.machineName === machineName
                ) || [];
                const machineTotal = machinePrices.reduce((sum: number, snapshot: any) => sum + snapshot.pricePerDay, 0);
                const avgPricePerDay = machinePrices.length > 0 ? machineTotal / machinePrices.length : 0;

                return (
                  <div key={machine.documentId || idx} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    {/* Machine Image */}
                    {cardPhotoUrl && (
                      <img
                        src={cardPhotoUrl}
                        alt={machineAttrs.name}
                        className="w-20 h-20 object-cover rounded flex-shrink-0"
                      />
                    )}

                    {/* Machine Info */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {machineAttrs.name}
                      </h4>
                      {machines.length > 1 && (
                        <p className="text-xs text-gray-500">
                          {isPrimary ? 'Kamper główny' : 'Dodatkowa maszyna'}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        {avgPricePerDay.toFixed(2)} zł/dzień × {attributes.daysCount} dni
                      </p>
                      <p className="text-sm font-semibold text-[#253551]">
                        Suma: {machineTotal.toFixed(2)} zł
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Services */}
          {attributes.additionalServices &&
            attributes.additionalServices.length > 0 && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Dodatkowe usługi
                </h3>
                {attributes.additionalServices.map((service: any, index: number) => (
                  <div key={index} className="text-sm mb-2">
                    <span className="font-medium text-gray-900">
                      {service.itemHeader}
                    </span>{' '}
                    -{' '}
                    <span className="text-gray-600">
                      {service.itemPrice?.toFixed(2)} zł ({service.priceInterval})
                    </span>
                  </div>
                ))}
              </div>
            )}

          {/* Driver Details */}
          {attributes.primaryDriverName && (
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Dane kierowcy
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex">
                  <dt className="font-medium text-gray-600 w-40">Imię i nazwisko:</dt>
                  <dd className="text-gray-900">{attributes.primaryDriverName}</dd>
                </div>
                {attributes.driverLicenseNumber && (
                  <div className="flex">
                    <dt className="font-medium text-gray-600 w-40">Prawo jazdy:</dt>
                    <dd className="text-gray-900">{attributes.driverLicenseNumber}</dd>
                  </div>
                )}
                {attributes.driverExperience > 0 && (
                  <div className="flex">
                    <dt className="font-medium text-gray-600 w-40">Doświadczenie:</dt>
                    <dd className="text-gray-900">{attributes.driverExperience} lat</dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {/* Guests */}
          {attributes.guests && attributes.guests.length > 0 && (
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Lista gości ({attributes.guests.length})
              </h3>
              <div className="space-y-2">
                {attributes.guests.map((guest: any, index: number) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-900">
                      {guest.fullName} ({guest.age} lat)
                    </span>
                    {guest.isDriver && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        Kierowca
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          {attributes.specialInstructions && (
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Specjalne instrukcje
              </h3>
              <p className="text-sm text-gray-700">{attributes.specialInstructions}</p>
            </div>
          )}

          {/* Price Summary */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Podsumowanie kosztów
            </h3>
            <dl className="space-y-2 text-sm">
              {/* Base Price */}
              <div className="flex justify-between">
                <dt className="text-gray-600">Cena podstawowa:</dt>
                <dd className="text-gray-900">
                  {baseTotal.toFixed(2)} zł
                </dd>
              </div>

              {/* Additional Services */}
              {additionalServicesTotal > 0 && (
                <div className="flex justify-between">
                  <dt className="text-gray-600">Dodatkowe usługi:</dt>
                  <dd className="text-gray-900">
                    {additionalServicesTotal.toFixed(2)} zł
                  </dd>
                </div>
              )}

              {/* Service Fee */}
              {serviceFees > 0 && (
                <div className="flex justify-between">
                  <dt className="flex items-center gap-2 text-gray-600">
                    <span>Opłata serwisowa:</span>
                    <div className="relative group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-500 cursor-help"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                      <div className="absolute right-0 bottom-full mb-2 w-48 sm:w-64 p-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        Ta opłata pokrywa przygotowanie i dezynfekcję jednostki przed każdym wynajmem.
                        <div className="absolute right-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </dt>
                  <dd className="text-gray-900">
                    {serviceFees.toFixed(2)} zł
                  </dd>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <dt className="text-gray-600">Suma:</dt>
                <dd className="font-semibold text-gray-900">
                  {subtotal.toFixed(2)} zł
                </dd>
              </div>

              {/* Deposit (50%) */}
              <div className="flex justify-between">
                <dt className="flex items-center gap-2 text-gray-600">
                  <span>Do zapłaty do {formatDate(attributes.paymentDeadline)} (zaliczka 50%):</span>
                  <div className="relative group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500 cursor-help"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <div className="absolute right-0 bottom-full mb-2 w-48 sm:w-64 p-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                      Ta kwota musi być wpłacona przed tą datą, aby potwierdzić rezerwację. Jeśli nie zostanie wpłacona, rezerwacja zostanie usunięta.
                      <div className="absolute right-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </dt>
                <dd className="font-semibold text-gray-900">
                  {depositAmount.toFixed(2)} zł
                </dd>
              </div>

              {/* Remaining Balance */}
              <div className="flex justify-between">
                <dt className="text-gray-600">Pozostała kwota (przy odbiorze):</dt>
                <dd className="font-semibold text-gray-900">
                  {remainingAmount.toFixed(2)} zł
                </dd>
              </div>

              {/* Refundable Deposit */}
              {refundableDeposit > 0 && (
                <div className="flex justify-between">
                  <dt className="flex items-center gap-2 text-gray-600">
                    <span>Kaucja zwrotna (przy odbiorze):</span>
                    <div className="relative group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-500 cursor-help"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                      <div className="absolute right-0 bottom-full mb-2 w-48 sm:w-64 p-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        Kaucja zabezpieczająca pobierana z góry w celu pokrycia ewentualnych szkód podczas wynajmu. Jest w pełni zwracana po bezpiecznym zwrocie sprzętu.
                        <div className="absolute right-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </dt>
                  <dd className="font-semibold text-gray-900">
                    {refundableDeposit.toFixed(2)} zł
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#253551] mb-3">
            Polityka anulowania
          </h2>
          <p className="text-sm text-gray-700">
            Możesz anulować rezerwację bez opłat do 14 dni przed datą odbioru. W
            przypadku anulowania w okresie krótszym niż 14 dni, wpłacona zaliczka nie
            podlega zwrotowi.
          </p>
          <p className="text-sm text-gray-700 mt-2">
            <a
              href="/polityka-anulowania"
              className="text-[#253551] underline hover:text-[#1a2840]"
            >
              Zobacz pełną politykę anulowania
            </a>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 bg-[#253551] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#1a2840] transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Drukuj rezerwację
          </button>
          <a
            href="/"
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-center"
          >
            Powrót do strony głównej
          </a>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Potrzebujesz pomocy?</p>
          <p className="mt-1">
            📧 Email:{' '}
            <a
              href={`mailto:${contactEmail || 'kontakt@freeandfun.pl'}`}
              className="text-[#253551] underline"
            >
              {contactEmail || 'kontakt@freeandfun.pl'}
            </a>
            {' | '}
            📞 Telefon: {contactPhone || '+48 123 456 789'}
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
