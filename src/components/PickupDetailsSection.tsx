'use client';

interface PickupDetailsSectionProps {
  pickupAddress: string;
  pickupTime: string;
  returnTime: string;
  onPickupTimeChange: (time: string) => void;
  onReturnTimeChange: (time: string) => void;
  specialInstructions: string;
  onInstructionsChange: (instructions: string) => void;
}

export default function PickupDetailsSection({
  pickupAddress,
  pickupTime,
  returnTime,
  onPickupTimeChange,
  onReturnTimeChange,
  specialInstructions,
  onInstructionsChange
}: PickupDetailsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-[#253551] mb-4">
        Szczegóły odbioru
      </h2>

      <div className="space-y-4">
        {/* Pickup Location - Static Display */}
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

        {/* Pickup Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferowana godzina odbioru
          </label>
          <input
            type="time"
            value={pickupTime ? pickupTime.slice(0, 5) : ''}
            onChange={(e) => onPickupTimeChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-500">
            Skontaktujemy się z Tobą, aby potwierdzić dokładną godzinę
          </p>
        </div>

        {/* Return Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferowana godzina zwrotu
          </label>
          <input
            type="time"
            value={returnTime ? returnTime.slice(0, 5) : ''}
            onChange={(e) => onReturnTimeChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-500">
            Skontaktujemy się z Tobą, aby potwierdzić dokładną godzinę
          </p>
        </div>

        {/* Special Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specjalne instrukcje (opcjonalnie)
          </label>
          <textarea
            value={specialInstructions}
            onChange={(e) => onInstructionsChange(e.target.value)}
            placeholder="np. Potrzebuję foteliki dziecięce, mam pytania o trasę, itp."
            rows={4}
            maxLength={500}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent resize-none"
          />
          <p className="mt-1 text-xs text-gray-500 text-right">
            {specialInstructions.length}/500 znaków
          </p>
        </div>
      </div>
    </div>
  );
}
