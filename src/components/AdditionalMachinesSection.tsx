'use client';

import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface AdditionalMachine {
  machine: any;
  quantity: number;
}

interface AdditionalMachinesSectionProps {
  availableMachines: any[];
  selectedMachines: AdditionalMachine[];
  daysCount: number;
  startDate: string;
  endDate: string;
  onAdd: (machine: any) => void;
  onRemove: (machineId: string) => void;
  onQuantityChange: (machineId: string, quantity: number) => void;
}

export default function AdditionalMachinesSection({
  availableMachines,
  selectedMachines,
  daysCount,
  startDate,
  endDate,
  onAdd,
  onRemove,
  onQuantityChange
}: AdditionalMachinesSectionProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'd MMMM yyyy', { locale: pl });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-[#253551] mb-2">
        Dodatkowe maszyny
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Wszystkie maszyny będą wynajęte na te same daty: {formatDate(startDate)} - {formatDate(endDate)} ({daysCount} {daysCount === 1 ? 'dzień' : daysCount < 5 ? 'dni' : 'dni'})
      </p>

      {/* Selected Machines */}
      {selectedMachines.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Wybrane maszyny:</h3>
          <div className="space-y-3">
            {selectedMachines.map((item) => {
              const machineAttrs = item.machine.attributes || item.machine;
              const cardPhoto = machineAttrs.cardPhoto?.data?.attributes || machineAttrs.cardPhoto;

              return (
                <div key={item.machine.documentId} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  {/* Machine Image */}
                  {cardPhoto?.url && (
                    <img
                      src={cardPhoto.url}
                      alt={machineAttrs.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}

                  {/* Machine Info */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {machineAttrs.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {machineAttrs.basePricePerDay} zł/dzień × {daysCount} dni × {item.quantity} szt.
                    </p>
                    <p className="text-sm font-semibold text-[#253551]">
                      Suma: {(machineAttrs.basePricePerDay * daysCount * item.quantity).toFixed(2)} zł
                    </p>
                  </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onQuantityChange(item.machine.documentId, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onQuantityChange(item.machine.documentId, Math.min(5, item.quantity + 1))}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => onRemove(item.machine.documentId)}
                  className="text-red-600 hover:text-red-700 px-3 py-1 text-sm font-medium"
                >
                  Usuń
                </button>
              </div>
            );
            })}
          </div>
        </div>
      )}

      {/* Available Machines */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Dostępne maszyny:</h3>
        {availableMachines.length === 0 ? (
          <p className="text-gray-500 text-sm">Brak dostępnych maszyn na wybrane daty</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableMachines
              .filter(machine => !selectedMachines.find(s => s.machine.documentId === machine.documentId))
              .map((machine) => {
                const machineAttrs = machine.attributes || machine;
                const cardPhoto = machineAttrs.cardPhoto?.data?.attributes || machineAttrs.cardPhoto;

                return (
                  <div key={machine.documentId} className="border border-gray-200 rounded-lg p-4 hover:border-[#253551] transition-colors">
                    {/* Machine Image */}
                    {cardPhoto?.url && (
                      <img
                        src={cardPhoto.url}
                        alt={machineAttrs.name}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                    )}

                    {/* Machine Info */}
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {machineAttrs.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      {machineAttrs.type}
                    </p>
                    <p className="text-sm font-semibold text-[#253551] mb-3">
                      {machineAttrs.basePricePerDay} zł/dzień
                    </p>

                    {/* Add Button */}
                    <button
                      onClick={() => onAdd(machine)}
                      className="w-full bg-[#253551] text-white py-2 rounded-lg hover:bg-[#1a2840] transition-colors text-sm font-medium"
                    >
                      Dodaj do rezerwacji
                    </button>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
