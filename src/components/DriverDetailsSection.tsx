'use client';

interface Guest {
  fullName: string;
  age: number;
  isDriver: boolean;
}

interface DriverDetailsSectionProps {
  guests: Guest[];
  primaryDriverName: string;
  onDriverChange: (name: string) => void;
}

export default function DriverDetailsSection({
  guests,
  primaryDriverName,
  onDriverChange,
}: DriverDetailsSectionProps) {
  // Filter for eligible drivers (18+ and marked as driver)
  const eligibleDrivers = guests.filter(g => g.age >= 18 && g.isDriver);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-[#253551] mb-4">
        Dane głównego kierowcy
      </h2>

      <div className="space-y-4">
        {/* Driver Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wybierz głównego kierowcę *
          </label>
          <select
            value={primaryDriverName}
            onChange={(e) => onDriverChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253551] focus:border-transparent"
          >
            <option value="">Wybierz kierowcę...</option>
            {eligibleDrivers.map((guest, index) => (
              <option key={index} value={guest.fullName}>
                {guest.fullName} (wiek: {guest.age})
              </option>
            ))}
          </select>
          {eligibleDrivers.length === 0 && (
            <p className="mt-1 text-sm text-red-600">
              Najpierw oznacz gościa jako kierowcę w sekcji powyżej
            </p>
          )}
        </div>


      </div>
    </div>
  );
}
