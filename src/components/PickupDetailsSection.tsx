'use client';

interface PickupDetailsSectionProps {
  pickupAddress: string;
  pickupTime: string;
  returnTime: string;
}

export default function PickupDetailsSection({
  pickupAddress,
  pickupTime,
  returnTime,
}: PickupDetailsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-[#253551] mb-4">
        Szczegóły odbioru
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Miejsce odbioru
          </label>
          <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-900 font-medium">{pickupAddress || 'Nie podano adresu'}</p>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Wszystkie odbiory odbywają się pod tym adresem
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Godzina odbioru
          </label>
          <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-900 font-medium">{pickupTime ? pickupTime.slice(0, 5) : 'Nie podano godziny'}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Godzina zwrotu
          </label>
          <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-900 font-medium">{returnTime ? returnTime.slice(0, 5) : 'Nie podano godziny'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}