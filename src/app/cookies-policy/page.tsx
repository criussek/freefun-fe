export default function CookiesPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-[450px] pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2 text-forest">Polityka cookies</h1>
          <p className="text-sm text-gray-600 mb-8">Ostatnia aktualizacja: 15 grudnia 2025 r.</p>

          {/* Section 1 */}
          <h2 className="text-xl font-semibold mb-3 text-forest">1. Czym są cookies i podobne technologie</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Pliki cookies to małe pliki tekstowe zapisywane w Twoim urządzeniu. Wykorzystujemy także podobne technologie (np. LocalStorage/SessionStorage) do utrzymania sesji, bezpieczeństwa i zapamiętania ustawień. Cookies mogą być sesyjne (usuwane po zamknięciu przeglądarki) lub stałe (przechowywane przez wskazany czas albo do usunięcia przez Użytkownika).
          </p>

          {/* Section 2 */}
          <h2 className="text-xl font-semibold mb-3 text-forest">2. W jakich celach używamy cookies</h2>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2 mb-6">
            <li><span className="font-medium">Niezbędne</span> – zapewniają podstawowe funkcje serwisu: sesję, rezerwacje, zapamiętanie języka i wyborów zgód.</li>
            <li><span className="font-medium">Bezpieczeństwo</span> – wykrywanie nadużyć, ochrona przed atakami, integralność procesu płatności.</li>
            <li><span className="font-medium">Funkcjonalne</span> – zapamiętywanie ustawień i preferencji interfejsu.</li>
            <li><span className="font-medium">Analityczne</span> – anonimowe statystyki korzystania z serwisu, aby ulepszać działanie i treści.</li>
            <li><span className="font-medium">Marketingowe</span> – personalizacja treści reklamowych/remarketing (aktywowane wyłącznie za Twoją zgodą).</li>
          </ul>

          {/* Section 3 */}
          <h2 className="text-xl font-semibold mb-3 text-forest">3. Dostawcy i zakres</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Cookies mogą być zapisywane zarówno przez nasz serwis, jak i przez podmioty trzecie współpracujące przy świadczeniu usług:
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2 mb-4">
            <li><span className="font-medium">Serwis</span> – utrzymanie sesji, preferencji, podstawowe logi bezpieczeństwa.</li>
            <li><span className="font-medium">Operator płatności</span> – cookies i podobne technologie mogą być używane w procesie płatności w celach bezpieczeństwa, autoryzacji i rozliczeń.</li>
            <li><span className="font-medium">Analityka</span> – statystyki odwiedzin.</li>
            <li><span className="font-medium">CDN/ochrona anty-bot</span> – rozwiązania sieciowe/anty-DDoS mogą stosować techniki rozpoznawania ruchu.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            Nie publikujemy stałej listy nazw poszczególnych plików cookies – integracje mogą się zmieniać. Zawsze opisujemy kategorie, cele i dostawców. Szczegóły możesz sprawdzić w narzędziach deweloperskich przeglądarki (Zakładka "Application/Storage").
          </p>

          {/* Section 4 */}
          <h2 className="text-xl font-semibold mb-3 text-forest">4. Zgody i podstawy prawne</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Cookies niezbędne działają na podstawie naszego prawnie uzasadnionego interesu (zapewnienie funkcjonalności serwisu). Cookies analityczne/marketingowe uruchamiane są wyłącznie na podstawie Twojej zgody, którą możesz w każdej chwili wycofać w ustawieniach banera cookies (o ile ta kategoria jest włączona w serwisie).
          </p>

          {/* Section 5 */}
          <h2 className="text-xl font-semibold mb-3 text-forest">5. Jak zarządzać cookies</h2>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2 mb-6">
            <li>W każdej chwili możesz zablokować lub usunąć cookies w ustawieniach swojej przeglądarki (Chrome, Firefox, Safari, Edge itd.).</li>
            <li>Możesz też zmienić wybory w banerze cookies (jeśli dostępny), włączając/wyłączając poszczególne kategorie.</li>
            <li>Ograniczenie cookies niezbędnych może utrudnić lub uniemożliwić korzystanie z niektórych funkcji serwisu (np. rezerwacje, płatności).</li>
          </ul>

          {/* Section 6 */}
          <h2 className="text-xl font-semibold mb-3 text-forest">6. Zmiany polityki cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Polityka może być aktualizowana wraz ze zmianami technicznymi serwisu i integracji. O istotnych zmianach poinformujemy w serwisie.
          </p>

          {/* Contact */}
          <h2 className="text-xl font-semibold mb-3 text-forest">7. Kontakt</h2>
          <p className="text-gray-700 leading-relaxed">
            MCJ KAROLINA KAMIŃSKA, Al. Krakowska 17, 05-090 Janki<br />
            NIP: 5342428850, REGON: 369756858<br />
            E-mail: kontakt@3fun.pl, tel. +48 780 780 160
          </p>
        </div>
      </section>
    </main>
  )
}
