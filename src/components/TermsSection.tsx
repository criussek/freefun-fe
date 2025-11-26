'use client';

interface TermsSectionProps {
  agreedToTerms: boolean;
  onTermsChange: (agreed: boolean) => void;
  agreedToCancellation: boolean;
  onCancellationChange: (agreed: boolean) => void;
}

export default function TermsSection({
  agreedToTerms,
  onTermsChange,
  agreedToCancellation,
  onCancellationChange
}: TermsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-[#253551] mb-4">
        Regulamin i polityki
      </h2>

      <div className="space-y-4">
        {/* Terms and Conditions */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => onTermsChange(e.target.checked)}
            className="w-5 h-5 text-[#253551] border-gray-300 rounded focus:ring-[#253551] mt-1"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            Akceptuję{' '}
            <a
              href="/regulamin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#253551] underline hover:text-[#1a2840]"
            >
              Regulamin świadczenia usług
            </a>{' '}
            i potwierdzam, że wszystkie podane informacje są prawidłowe *
          </label>
        </div>

        {/* Cancellation Policy */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="cancellation"
            checked={agreedToCancellation}
            onChange={(e) => onCancellationChange(e.target.checked)}
            className="w-5 h-5 text-[#253551] border-gray-300 rounded focus:ring-[#253551] mt-1"
          />
          <label htmlFor="cancellation" className="text-sm text-gray-700">
            Akceptuję{' '}
            <a
              href="/polityka-anulowania"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#253551] underline hover:text-[#1a2840]"
            >
              Politykę anulowania rezerwacji
            </a>{' '}
            *
          </label>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2 text-sm">
          📋 Najważniejsze informacje:
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Rezerwacja wymaga wpłaty zaliczki w wysokości 50% wartości</li>
          <li>• Wpłatę należy dokonać w ciągu 7 dni</li>
          <li>• Możesz anulować rezerwację bez opłat do 14 dni przed odbiorem</li>
          <li>• Pozostała kwota płatna jest przy odbiorze pojazdu</li>
        </ul>
      </div>

      {/* Validation Warning */}
      {(!agreedToTerms || !agreedToCancellation) && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          ⚠️ Musisz zaakceptować regulamin i politykę anulowania, aby kontynuować
        </div>
      )}
    </div>
  );
}
