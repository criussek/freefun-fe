'use client';

import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

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
  remaining
}: BookingSummaryCardProps) {
  // Handle both possible response structures (v4 vs v5)
  const attributes = booking.attributes || booking;
  const machines = attributes.machines?.data || attributes.machines || [];
  const primaryMachine = machines[0];

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'd MMMM yyyy', { locale: pl });
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
          const cardPhoto = machineAttrs.cardPhoto?.data?.attributes || machineAttrs.cardPhoto;
          return cardPhoto?.url && (
            <img
              src={cardPhoto.url}
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
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Zwrot:</span>
          <span className="font-medium text-gray-900">
            {formatDate(attributes.endDate)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Czas trwania:</span>
          <span className="font-medium text-gray-900">
            {daysCount} {daysCount === 1 ? 'dzień' : daysCount < 5 ? 'dni' : 'dni'}
          </span>
        </div>
      </div>

      {/* Additional Machines */}
      {additionalMachines.length > 0 && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-700 mb-2 text-sm">Dodatkowe maszyny:</h4>
          {additionalMachines.map((item) => {
            const machineAttrs = item.machine.attributes || item.machine;
            return (
              <div key={item.machine.documentId} className="text-sm mb-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {machineAttrs.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-gray-900">
                    {(machineAttrs.basePricePerDay * daysCount * item.quantity).toFixed(2)} zł
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Additional Services */}
      {additionalServices.length > 0 && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-700 mb-2 text-sm">Dodatkowe usługi:</h4>
          {additionalServices.map((service, index) => {
            const serviceTotal = service.priceInterval === 'za dzień'
              ? service.itemPrice * daysCount
              : service.itemPrice;

            return (
              <div key={index} className="text-sm mb-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{service.itemHeader}</span>
                  <span className="font-medium text-gray-900">
                    {serviceTotal.toFixed(2)} zł
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pricing */}
      <div className="space-y-3">
        {/* Service Fees */}
        {serviceFees > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Opłata serwisowa:</span>
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
        <div className="flex justify-between items-center py-3 px-4 bg-green-50 rounded-lg">
          <div>
            <span className="font-semibold text-gray-900 block">
              Zaliczka (50%)
            </span>
            <span className="text-xs text-gray-600">
              Do zapłaty w ciągu 7 dni
            </span>
          </div>
          <span className="font-bold text-green-700 text-lg">
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
          <div className="flex justify-between items-center py-3 px-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <span className="font-semibold text-gray-900 block">
                Kaucja zwrotna
              </span>
              <span className="text-xs text-gray-600">
                Do zapłaty przy odbiorze
              </span>
            </div>
            <span className="font-bold text-blue-700 text-lg">
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
