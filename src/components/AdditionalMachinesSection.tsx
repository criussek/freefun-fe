'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Eye } from 'lucide-react';
import MachineDetailsModal from './MachineDetailsModal';
import { mediaURL } from '@/lib/images';

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
}

export default function AdditionalMachinesSection({
  availableMachines,
  selectedMachines,
  daysCount,
  startDate,
  endDate,
  onAdd,
  onRemove
}: AdditionalMachinesSectionProps) {
  const [selectedMachineForModal, setSelectedMachineForModal] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'd MMMM yyyy', { locale: pl });
  };

  const handleShowDetails = (machine: any) => {
    setSelectedMachineForModal(machine);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMachineForModal(null);
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
              const cardPhotoUrl = mediaURL(cardPhoto);

              return (
                <div key={item.machine.documentId} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  {/* Machine Image - Clickable */}
                  {cardPhotoUrl && (
                    <img
                      src={cardPhotoUrl}
                      alt={machineAttrs.name}
                      className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleShowDetails(item.machine)}
                    />
                  )}

                  {/* Machine Info */}
                  <div className="flex-1">
                    <h4
                      className="font-semibold text-gray-900 cursor-pointer hover:text-[#253551] transition-colors"
                      onClick={() => handleShowDetails(item.machine)}
                    >
                      {machineAttrs.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {machineAttrs.basePricePerDay} zł/dzień × {daysCount} dni
                    </p>
                    <p className="text-sm font-semibold text-[#253551]">
                      Suma: {(machineAttrs.basePricePerDay * daysCount).toFixed(2)} zł
                    </p>
                  </div>

                {/* View Details Button */}
                <button
                  onClick={() => handleShowDetails(item.machine)}
                  className="text-[#253551] hover:text-[#1a2840] px-3 py-1 text-sm font-medium flex items-center gap-1"
                  title="Zobacz szczegóły"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Szczegóły</span>
                </button>

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
                const cardPhotoUrl = mediaURL(cardPhoto);

                return (
                  <div key={machine.documentId} className="border border-gray-200 rounded-lg p-4 hover:border-[#253551] transition-colors">
                    {/* Machine Image - Clickable */}
                    {cardPhotoUrl && (
                      <img
                        src={cardPhotoUrl}
                        alt={machineAttrs.name}
                        className="w-full h-32 object-cover rounded mb-3 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleShowDetails(machine)}
                      />
                    )}

                    {/* Machine Info */}
                    <h4
                      className="font-semibold text-gray-900 mb-1 cursor-pointer hover:text-[#253551] transition-colors"
                      onClick={() => handleShowDetails(machine)}
                    >
                      {machineAttrs.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      {machineAttrs.type}
                    </p>
                    <p className="text-sm font-semibold text-[#253551] mb-3">
                      {machineAttrs.basePricePerDay} zł/dzień
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleShowDetails(machine)}
                        className="flex-1 bg-gray-100 text-[#253551] py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Szczegóły</span>
                      </button>
                      <button
                        onClick={() => onAdd(machine)}
                        className="flex-1 bg-[#253551] text-white py-2 rounded-lg hover:bg-[#1a2840] transition-colors text-sm font-medium"
                      >
                        Dodaj
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Machine Details Modal */}
      <MachineDetailsModal
        machine={selectedMachineForModal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
