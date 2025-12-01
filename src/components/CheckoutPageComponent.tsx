'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GuestDetailsSection from './GuestDetailsSection';
import DriverDetailsSection from './DriverDetailsSection';
import AdditionalMachinesSection from './AdditionalMachinesSection';
import AdditionalServicesSection from './AdditionalServicesSection';
import PickupDetailsSection from './PickupDetailsSection';
import TermsSection from './TermsSection';
import BookingSummaryCard from './BookingSummaryCard';

interface Guest {
  fullName: string;
  age: number;
  isDriver: boolean;
}

interface AdditionalMachine {
  machine: any;
  quantity: number;
}

interface AdditionalService {
  id: number;
  itemHeader: string;
  itemDescription: string;
  priceInterval: 'za wynajem' | 'za dzień';
  itemPrice: number;
  selected: boolean;
}

interface CheckoutPageComponentProps {
  booking: any;
  availableMachines: any[];
  additionalServices: any[];
  pickupAddress: string;
  defaultPickupTime: string;
  defaultReturnTime: string;
}

export default function CheckoutPageComponent({
  booking,
  availableMachines,
  additionalServices,
  pickupAddress,
  defaultPickupTime,
  defaultReturnTime
}: CheckoutPageComponentProps) {
  const router = useRouter();

  // Handle both possible response structures (v4 vs v5)
  const attributes = booking.attributes || booking;

  // Initialize state
  const [guests, setGuests] = useState<Guest[]>([
    { fullName: attributes.customerName, age: 18, isDriver: false }
  ]);
  const [primaryDriverName, setPrimaryDriverName] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const [driverExperience, setDriverExperience] = useState<number>(0);
  const [selectedAdditionalMachines, setSelectedAdditionalMachines] = useState<AdditionalMachine[]>([]);
  const [services, setServices] = useState<AdditionalService[]>(
    additionalServices.map((s, index) => ({ ...s, id: index, selected: false }))
  );
  const [pickupTime, setPickupTime] = useState(defaultPickupTime);
  const [returnTime, setReturnTime] = useState(defaultReturnTime);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToCancellation, setAgreedToCancellation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculations
  // bookingTotal already includes primary machines + their service fees
  const bookingTotal = attributes.totalPrice || 0;

  // Get primary machine(s) from booking
  const bookingMachines = attributes.machines?.data || attributes.machines || [];

  // Calculate service fees for display breakdown (already included in bookingTotal)
  const primaryServiceFees = bookingMachines.reduce((sum: number, machine: any) => {
    const machineAttrs = machine.attributes || machine;
    return sum + (machineAttrs.serviceFee || 0);
  }, 0);

  // Calculate refundable deposit for primary machines
  const primaryDepositFees = bookingMachines.reduce((sum: number, machine: any) => {
    const machineAttrs = machine.attributes || machine;
    return sum + (machineAttrs.depositFee || 0);
  }, 0);

  // Additional machines total + their fees
  const additionalMachinesTotal = selectedAdditionalMachines.reduce((sum, item) => {
    const machineAttrs = item.machine.attributes || item.machine;
    return sum + (machineAttrs.basePricePerDay * attributes.daysCount * item.quantity);
  }, 0);

  const additionalServiceFees = selectedAdditionalMachines.reduce((sum, item) => {
    const machineAttrs = item.machine.attributes || item.machine;
    return sum + ((machineAttrs.serviceFee || 0) * item.quantity);
  }, 0);

  const additionalDepositFees = selectedAdditionalMachines.reduce((sum, item) => {
    const machineAttrs = item.machine.attributes || item.machine;
    return sum + ((machineAttrs.depositFee || 0) * item.quantity);
  }, 0);

  // Additional services
  const additionalServicesTotal = services
    .filter(s => s.selected)
    .reduce((sum, service) => {
      const price = service.priceInterval === 'za dzień'
        ? service.itemPrice * attributes.daysCount
        : service.itemPrice;
      return sum + price;
    }, 0);

  // Totals (bookingTotal already has primary service fees, only add additional ones)
  const totalServiceFees = primaryServiceFees + additionalServiceFees;
  const totalDepositFees = primaryDepositFees + additionalDepositFees;
  const subtotal = bookingTotal + additionalMachinesTotal + additionalServicesTotal + additionalServiceFees;
  const deposit = subtotal * 0.5; // 50% payment deposit
  const remaining = subtotal - deposit;

  // Validation
  const isFormValid = () => {
    return (
      guests.length > 0 &&
      guests.every(g => g.fullName.trim() && g.age > 0) &&
      guests.some(g => g.age >= 18 && g.isDriver) &&
      primaryDriverName.trim() !== '' &&
      agreedToTerms &&
      agreedToCancellation
    );
  };

  // Submit
  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare additional machines data
      const additionalMachinesData = selectedAdditionalMachines.map(item => {
        const machineAttrs = item.machine.attributes || item.machine;
        return {
          machineId: item.machine.documentId,
          quantity: item.quantity,
          pricePerDay: machineAttrs.basePricePerDay,
          name: machineAttrs.name,
          total: machineAttrs.basePricePerDay * attributes.daysCount * item.quantity
        };
      });

      // Prepare selected services
      const selectedServicesData = services
        .filter(s => s.selected)
        .map(s => ({
          itemHeader: s.itemHeader,
          itemDescription: s.itemDescription,
          priceInterval: s.priceInterval,
          itemPrice: s.itemPrice
        }));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bookings/${booking.documentId}/checkout-details`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            guests,
            primaryDriverName,
            driverLicenseNumber: driverLicense,
            driverExperience,
            additionalMachines: additionalMachinesData,
            additionalServices: selectedServicesData,
            pickupLocation: pickupAddress,
            pickupTime,
            returnTime,
            specialInstructions,
            agreedToTerms,
            agreedToCancellation
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        router.push(`/booking/${booking.documentId}/summary`);
      } else {
        throw new Error(data.message || 'Nie udało się złożyć rezerwacji');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Override navbar styling for checkout page */}
      <style jsx global>{`
        nav {
          background-color: rgba(0, 0, 0, 0.8) !important;
          position: relative !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-12" style={{ paddingTop: '40px' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#253551] mb-2">Finalizuj rezerwację</h1>
        <p className="text-gray-600">
          Uzupełnij dane i potwierdź szczegóły rezerwacji
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-6">

          {/* Guest Details Section */}
          <GuestDetailsSection
            guests={guests}
            onAddGuest={() => setGuests([...guests, { fullName: '', age: 18, isDriver: false }])}
            onRemoveGuest={(index) => setGuests(guests.filter((_, i) => i !== index))}
            onUpdateGuest={(index, field, value) => {
              const updated = [...guests];
              updated[index] = { ...updated[index], [field]: value };
              setGuests(updated);
            }}
          />

          {/* Driver Details Section */}
          <DriverDetailsSection
            guests={guests}
            primaryDriverName={primaryDriverName}
            onDriverChange={setPrimaryDriverName}
            driverLicense={driverLicense}
            onLicenseChange={setDriverLicense}
            driverExperience={driverExperience}
            onExperienceChange={setDriverExperience}
          />

          {/* Additional Machines Section */}
          {availableMachines.length > 0 && (
            <AdditionalMachinesSection
              availableMachines={availableMachines}
              selectedMachines={selectedAdditionalMachines}
              daysCount={attributes.daysCount}
              startDate={attributes.startDate}
              endDate={attributes.endDate}
              onAdd={(machine) => {
                setSelectedAdditionalMachines([...selectedAdditionalMachines, { machine, quantity: 1 }]);
              }}
              onRemove={(machineId) => {
                setSelectedAdditionalMachines(
                  selectedAdditionalMachines.filter(m => m.machine.documentId !== machineId)
                );
              }}
            />
          )}

          {/* Additional Services Section */}
          {additionalServices.length > 0 && (
            <AdditionalServicesSection
              services={services}
              daysCount={attributes.daysCount}
              onToggle={(serviceId) => {
                setServices(
                  services.map(s =>
                    s.id === serviceId ? { ...s, selected: !s.selected } : s
                  )
                );
              }}
            />
          )}

          {/* Pickup Details Section */}
          <PickupDetailsSection
            pickupAddress={pickupAddress}
            pickupTime={pickupTime}
            returnTime={returnTime}
            onPickupTimeChange={setPickupTime}
            onReturnTimeChange={setReturnTime}
            specialInstructions={specialInstructions}
            onInstructionsChange={setSpecialInstructions}
          />

          {/* Terms Section */}
          <TermsSection
            agreedToTerms={agreedToTerms}
            onTermsChange={setAgreedToTerms}
            agreedToCancellation={agreedToCancellation}
            onCancellationChange={setAgreedToCancellation}
          />

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className="w-full bg-[#253551] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#1a2840] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Składanie rezerwacji...' : 'Złóż rezerwację'}
          </button>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-1">
          <BookingSummaryCard
            booking={booking}
            additionalMachines={selectedAdditionalMachines}
            additionalServices={services.filter(s => s.selected)}
            daysCount={attributes.daysCount}
            serviceFees={totalServiceFees}
            refundableDeposit={totalDepositFees}
            subtotal={subtotal}
            deposit={deposit}
            remaining={remaining}
            pickupTime={pickupTime}
            returnTime={returnTime}
          />
        </div>
      </div>
    </div>
    </>
  );
}
