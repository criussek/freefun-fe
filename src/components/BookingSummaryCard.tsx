'use client';

import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { mediaURL } from '@/lib/images';
import { Season, Machine, calculateTotalPrice } from '@/lib/seasons';

interface AdditionalMachine {
  machine: any;
  quantity: number;
}

interface AdditionalService {
  itemHeader: string;
  itemPrice: number;
  priceInterval: string;
}

interface BookingSummaryCardProps {
  booking: any;
  additionalMachines: AdditionalMachine[];
  additionalServices: AdditionalService[];
  daysCount: number;
  serviceFees: number;
  refundableDeposit: number;
  subtotal: number;
  deposit: number;
  remaining: number;
  pickupTime: string;
  returnTime: string;
  seasons: Season[];
}

export default function BookingSummaryCard({
  booking,
  additionalMachines,
  additionalServices,
  daysCount,
  serviceFees,
  refundableDeposit,
  subtotal,
  deposit,
  remaining,
  pickupTime,
  returnTime,
  seasons
}: BookingSummaryCardProps) {
  // Handle both possible response structures (v4 vs v5)
  const attributes = booking.attributes || booking;
  const machines = attributes.machines?.data || attributes.machines || [];
  const primaryMachine = machines[0];

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'd MMMM yyyy', { locale: pl });
  };

  // Helper to calculate season-aware price for a machine
  const calculateMachinePrice = (machine: any): number => {
    const machineAttrs = machine.attributes || machine;
    const machineObj: Machine = {
      documentId: machine.documentId,
      name: machineAttrs.name,
      basePricePerDay: machineAttrs.basePricePerDay,
      minRentalDays: machineAttrs.minRentalDays
    };

    const pricing = calculateTotalPrice(
      [machineObj],
      new Date(attributes.startDate),
      new Date(attributes.endDate),
      seasons
    );

    return pricing.totalPrice;
  };

  if (!primaryMachine) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
        <p className="text-red-600">Błąd: Brak maszyny w rezerwacji</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-[#253551] mb-4">
        Podsumowanie rezerwacji
      </h2>

      {/* Primary Machine */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        {(() => {
          const machineAttrs = primaryMachine.attributes || primaryMachine;
          const cardPhotoUrl = mediaURL(machineAttrs.cardPhoto);
          return cardPhotoUrl && (
            <img
              src={cardPhotoUrl}
              alt={machineAttrs.name}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
          );
        })()}
        <h3 className="font-semibold text-gray-900">
          {(primaryMachine.attributes || primaryMachine).name}
        </h3>
        <p className="text-sm text-gray-600">
          {(primaryMachine.attributes || primaryMachine).type}
        </p>
      </div>

      {/* Dates */}
      <div className="mb-4 pb-4 border-b border-gray-200 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Odbiór:</span>
          <span className="font-medium text-gray-900">
            {formatDate(attributes.startDate)}
            {pickupTime && ` o ${pickupTime.slice(0, 5)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Zwrot:</span>
          <span className="font-medium text-gray-900">
            {formatDate(attributes.endDate)}
            {returnTime && ` o ${returnTime.slice(0, 5)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Czas trwania:</span>
          <span className="font-medium text-gray-900">
            {daysCount} {daysCount === 1 ? 'dzień' : daysCount < 5 ? 'dni' : 'dni'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Cena wynajmu:</span>
          <span className="font-medium text-gray-900">
            {calculateMachinePrice(primaryMachine).toFixed(2)} zł
          </span>
        </div>
      </div>

      {/* Additional Machines */}
      {additionalMachines.length > 0 && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Dodatkowe maszyny:</h4>
          {additionalMachines.map((item) => {
            const machineAttrs = item.machine.attributes || item.machine;
            const machinePrice = calculateMachinePrice(item.machine);
            return (
              <div key={item.machine.documentId} className="text-sm mb-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {machineAttrs.name}:
                  </span>
                  <span className="font-medium text-gray-900">
                    {machinePrice.toFixed(2)} zł
                  </span>
                </div>
              </div>
            );
          })}
          {/* Additional Machines Total */}
          {additionalMachines.length > 1 && (
            <div className="text-sm mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Razem dodatkowe maszyny:</span>
                <span className="font-medium text-gray-900">
                  {additionalMachines.reduce((sum, item) => {
                    return sum + calculateMachinePrice(item.machine);
                  }, 0).toFixed(2)} zł
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Additional Services */}
      {additionalServices.length > 0 && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Dodatkowe usługi:</h4>
          {additionalServices.map((service, index) => {
            const serviceTotal = service.priceInterval === 'za dzień'
              ? service.itemPrice * daysCount
              : service.itemPrice;

            return (
              <div key={index} className="text-sm mb-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{service.itemHeader}:</span>
                  <span className="font-medium text-gray-900">
                    {serviceTotal.toFixed(2)} zł
                  </span>
                </div>
              </div>
            );
          })}
          {/* Additional Services Total */}
          {additionalServices.length > 1 && (
            <div className="text-sm mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Razem dodatkowe usługi:</span>
                <span className="font-medium text-gray-900">
                  {additionalServices.reduce((sum, service) => {
                    const serviceTotal = service.priceInterval === 'za dzień'
                      ? service.itemPrice * daysCount
                      : service.itemPrice;
                    return sum + serviceTotal;
                  }, 0).toFixed(2)} zł
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pricing */}
      <div className="space-y-3">
        {/* Service Fees */}
        {serviceFees > 0 && (
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Opłata serwisowa:</span>
              <div className="relative group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 cursor-help">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <div className="absolute right-0 bottom-full mb-2 w-48 sm:w-64 p-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  Ta opłata pokrywa przygotowanie i dezynfekcję jednostki przed każdym wynajmem.
                  <div className="absolute right-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
            <span className="font-medium text-gray-900">
              {serviceFees.toFixed(2)} zł
            </span>
          </div>
        )}

        {/* Subtotal */}
        <div className="flex justify-between text-base pt-2 border-t border-gray-200">
          <span className="font-medium text-gray-700">Suma:</span>
          <span className="font-semibold text-gray-900">
            {subtotal.toFixed(2)} zł
          </span>
        </div>

        {/* Deposit (50% payment) */}
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-2 sm:items-start">
          <div className="flex items-start gap-2 flex-1">
            <span className="text-gray-600 break-words">
              Do zapłaty do {formatDate(attributes.paymentDeadline)} (zaliczka 50%):
            </span>
            <div className="relative group flex-shrink-0 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 cursor-help">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <div className="absolute right-0 bottom-full mb-2 w-48 sm:w-64 p-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                Ta kwota musi być wpłacona w ciągu 7 dni od złożenia rezerwacji, aby ją potwierdzić. Jeśli nie zostanie wpłacona, rezerwacja zostanie usunięta.
                <div className="absolute right-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
          <span className="font-semibold text-gray-900">
            {deposit.toFixed(2)} zł
          </span>
        </div>

        {/* Remaining */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Pozostała kwota (przy odbiorze):</span>
          <span className="font-medium text-gray-900">
            {remaining.toFixed(2)} zł
          </span>
        </div>

        {/* Refundable Deposit */}
        {refundableDeposit > 0 && (
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Kaucja zwrotna (przy odbiorze):</span>
              <div className="relative group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 cursor-help">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <div className="absolute right-0 bottom-full mb-2 w-48 sm:w-64 p-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  Kaucja zabezpieczająca pobierana z góry w celu pokrycia ewentualnych szkód podczas wynajmu. Jest w pełni zwracana po bezpiecznym zwrocie sprzętu.
                  <div className="absolute right-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
            <span className="font-semibold text-gray-900">
              {refundableDeposit.toFixed(2)} zł
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
        <p>
          💳 Po złożeniu rezerwacji otrzymasz email z instrukcjami płatności.
        </p>
      </div>
    </div>
  );
}
