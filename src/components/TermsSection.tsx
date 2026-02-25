'use client';

interface TermsSectionProps {
  agreedToTerms: boolean;
  onTermsChange: (agreed: boolean) => void;
}

export default function TermsSection({
  agreedToTerms,
  onTermsChange,
}: TermsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-[#253551] mb-4">
        Regulamin
      </h2>

      <div className="space-y-4">
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
              href="/regulamin-rezerwacji"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#253551] underline hover:text-[#1a2840]"
            >
              regulamin i politykę anulowania rezerwacji
            </a>{' '}
            i potwierdzam, że wszystkie podane informacje są prawidłowe *
          </label>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2 text-sm">
          📋 Najważniejsze informacje:
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Rezerwacja wymaga wpłaty zadatku w wysokości 50% wartości</li>
          <li>• Wpłatę zadatku 50% należy dokonać w ciągu 24 godzin</li>
          <li>• Kaucja zwrotna płatna jest przy odbiorze pojazdu</li>
          <li>• Pozostała część opłaty za najem podlega najpóźniej 14 dni przed planowanym okresem najmu</li>
        </ul>
      </div>

      {/* Validation Warning */}
      {!agreedToTerms && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          ⚠️ Musisz zaakceptować regulamin, aby kontynuować
        </div>
      )}
    </div>
  );
}
