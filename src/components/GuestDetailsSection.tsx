'use client';

interface Guest {
  fullName: string;
  age: number;
  isDriver: boolean;
}

interface GuestDetailsSectionProps {
  guests: Guest[];
  onAddGuest: () => void;
  onRemoveGuest: (index: number) => void;
  onUpdateGuest: (index: number, field: string, value: any) => void;
}

export default function GuestDetailsSection({
  guests,
  onAddGuest,
  onRemoveGuest,
  onUpdateGuest
}: GuestDetailsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#253551]">Dane gości</h2>
        <span className="text-sm text-gray-500">
          Liczba gości: {guests.length}
        </span>
      </div>

      <div className="space-y-4">
        {guests.map((guest, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-700">
                Gość #{index + 1}
              </h3>
              {guests.length > 1 && (
                <button
                  onClick={() => onRemoveGuest(index)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Usuń
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imię i nazwisko *
                </label>
                <input
                  type="text"
                  value={guest.fullName}
                  onChange={(e) => onUpdateGuest(index, 'fullName', e.target.value)}
                  placeholder="Wpisz imię i nazwisko"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wiek *
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={guest.age}
                  onChange={(e) => onUpdateGuest(index, 'age', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent"
                />
              </div>

              {/* Is Driver */}
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={guest.isDriver}
                    onChange={(e) => onUpdateGuest(index, 'isDriver', e.target.checked)}
                    disabled={guest.age < 18}
                    className="w-5 h-5 text-[#253551] border-gray-300 rounded focus:ring-[#253551] disabled:opacity-50"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Kierowca {guest.age < 18 && '(wymagany wiek 18+)'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Guest Button */}
      <button
        onClick={onAddGuest}
        className="mt-4 w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-gray-600 hover:border-[#253551] hover:text-[#253551] transition-colors font-medium"
      >
        + Dodaj gościa
      </button>

      {/* Validation Message */}
      {!guests.some(g => g.age >= 18 && g.isDriver) && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          ⚠️ Przynajmniej jeden gość musi być pełnoletni (18+) i oznaczony jako kierowca
        </div>
      )}
    </div>
  );
}
