export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-[450px] pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2 text-forest">Polityka prywatności</h1>
          <p className="text-sm text-gray-600 mb-8">Ostatnia aktualizacja: 15 grudnia 2024 r.</p>

          {/* Administrator */}
          <h2 className="text-xl font-semibold mb-3 text-forest">1. Administrator danych</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Administratorem Twoich danych osobowych jest MCJ KAROLINA KAMIŃSKA, z siedzibą pod adresem Al. Krakowska 17, 05-090 Janki, NIP: 5342428850, REGON: 369756858.
            Kontakt: kontakt@3fun.pl, tel. +48 780 780 160.
          </p>

          {/* Scope */}
          <h2 className="text-xl font-semibold mb-3 text-forest">2. Zakres przetwarzanych danych</h2>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1 mb-6">
            <li>Dane rezerwacji: imię, nazwisko, e-mail, telefon, daty wynajmu.</li>
            <li>Dane rozliczeń: adres, NIP (dla firm), szczegóły płatności.</li>
            <li>Dane techniczne: logi serwera, adres IP, przeglądarka/urządzenie, cookies.</li>
          </ul>

          {/* Purposes */}
          <h2 className="text-xl font-semibold mb-3 text-forest">3. Cele i podstawy prawne</h2>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1 mb-6">
            <li>Realizacja rezerwacji i wynajmu – wykonanie umowy (art. 6 ust.1 lit. b RODO).</li>
            <li>Obsługa płatności, fakturowanie – umowa (lit. b) i obowiązek prawny (lit. c).</li>
            <li>Wsparcie klienta – nasz prawnie uzasadniony interes (lit. f).</li>
            <li>Marketing e-mail – zgoda (lit. a), możliwa do wycofania w każdym czasie.</li>
            <li>Bezpieczeństwo/dochodzenie roszczeń – prawnie uzasadniony interes (lit. f).</li>
          </ul>

          {/* Recipients */}
          <h2 className="text-xl font-semibold mb-3 text-forest">4. Odbiorcy danych</h2>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1 mb-4">
            <li>Hosting/CDN: ...</li>
            <li>Płatności: ...</li>
            <li>E-mail: ...</li>
            <li>Biuro rachunkowe, doradcy prawni, organy publiczne – gdy wymagają przepisy.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            W razie przekazania danych poza EOG stosujemy odpowiednie zabezpieczenia (standardowe klauzule umowne UE i środki uzupełniające).
          </p>

          {/* Retention */}
          <h2 className="text-xl font-semibold mb-3 text-forest">5. Okres przechowywania</h2>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1 mb-6">
            <li>Dane rezerwacji – przez czas trwania umowy i do 6 mies. po jej zakończeniu.</li>
            <li>Dokumentacja księgowa – 5 lat podatkowych.</li>
            <li>Newsletter – do wycofania zgody lub zakończenia wysyłki.</li>
            <li>Logi techniczne – do 90 dni.</li>
            <li>Dane dla roszczeń – do upływu terminów przedawnienia.</li>
          </ul>

          {/* Rights */}
          <h2 className="text-xl font-semibold mb-3 text-forest">6. Twoje prawa</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia, przenoszenia, sprzeciwu (gdy podstawą jest lit. f) oraz wycofania zgody. Przysługuje Ci skarga do Prezesa UODO.
          </p>

          {/* Automated */}
          <h2 className="text-xl font-semibold mb-3 text-forest">7. Zautomatyzowane decyzje</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Nie podejmujemy decyzji wywołujących skutki prawne wyłącznie w sposób zautomatyzowany.
          </p>

          {/* Requirement */}
          <h2 className="text-xl font-semibold mb-3 text-forest">8. Wymóg podania danych</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Podanie danych jest dobrowolne, ale niezbędne do dokonania rezerwacji i wynajmu.
          </p>

          {/* Security */}
          <h2 className="text-xl font-semibold mb-3 text-forest">9. Bezpieczeństwo</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Stosujemy szyfrowanie (TLS/HTTPS), kontrolę dostępu, aktualizacje, haszowanie haseł. Dostęp mają wyłącznie upoważnione osoby/podmioty.
          </p>

          {/* Contact */}
          <h2 className="text-xl font-semibold mb-3 text-forest">10. Kontakt w sprawach RODO</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            E-mail: kontakt@3fun.pl, tel. +48 780 780 160, adres korespondencyjny: Al. Krakowska 17, 05-090 Janki.
          </p>

          {/* Changes */}
          <h2 className="text-xl font-semibold mb-3 text-forest">11. Zmiany polityki</h2>
          <p className="text-gray-700 leading-relaxed">
            Polityka może się zmieniać. O istotnych zmianach poinformujemy w serwisie lub e-mailem.
          </p>
        </div>
      </section>
    </main>
  )
}
