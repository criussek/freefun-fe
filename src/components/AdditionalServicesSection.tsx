'use client';

interface AdditionalService {
  id: number;
  itemHeader: string;
  itemDescription: string;
  priceInterval: 'za wynajem' | 'za dzień';
  itemPrice: number;
  selected: boolean;
}

interface AdditionalServicesSectionProps {
  services: AdditionalService[];
  daysCount: number;
  onToggle: (serviceId: number) => void;
}

export default function AdditionalServicesSection({
  services,
  daysCount,
  onToggle
}: AdditionalServicesSectionProps) {
  const calculateServicePrice = (service: AdditionalService) => {
    if (service.priceInterval === 'za dzień') {
      return service.itemPrice * daysCount;
    }
    return service.itemPrice;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-[#253551] mb-2">
        Dodatkowe usługi
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Wybierz dodatkowe usługi, które chcesz dołączyć do rezerwacji
      </p>

      <div className="space-y-3">
        {services.map((service) => {
          const totalPrice = calculateServicePrice(service);

          return (
            <div
              key={service.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                service.selected
                  ? 'border-[#253551] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onToggle(service.id)}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <div className="pt-1">
                  <input
                    type="checkbox"
                    checked={service.selected}
                    onChange={() => onToggle(service.id)}
                    className="w-5 h-5 text-[#253551] border-gray-300 rounded focus:ring-[#253551]"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {/* Service Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {service.itemHeader}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {service.itemDescription}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-[#253551] text-lg whitespace-nowrap">
                        {totalPrice.toFixed(2)} zł
                      </p>
                      <p className="text-xs text-gray-500">
                        {service.priceInterval === 'za dzień' ? (
                          <span>{service.itemPrice} zł/dzień × {daysCount}</span>
                        ) : (
                          <span>za wynajem</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {services.some(s => s.selected) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">
              Wybrane usługi ({services.filter(s => s.selected).length})
            </span>
            <span className="font-bold text-[#253551] text-lg">
              {services
                .filter(s => s.selected)
                .reduce((sum, s) => sum + calculateServicePrice(s), 0)
                .toFixed(2)} zł
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
