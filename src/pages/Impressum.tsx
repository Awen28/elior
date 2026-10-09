import LegalLayout from '../components/LegalLayout';
import { LegalSection, AddressBlock } from '../components/LegalSections';

const Impressum = () => {
  return (
    <LegalLayout
      title="Impressum"
      description="Impressum und rechtliche Informationen für Elior, Thomas Mayrl, Johannesfeldstrasse 44, 6111 Volders, Österreich."
      eyebrow="Legal — Impressum"
      canonical="https://elior.studio/impressum"
      lastUpdated="October 2026"
    >
      {/* Angaben gemäß § 5 ECG und § 25 MedienG */}
      <LegalSection title="Angaben gemäß § 5 ECG">
        <div className="font-medium" style={{ color: '#4E4F41' }}>
          Thomas Mayrl
        </div>
        <div>
          Johannesfeldstrasse 44<br />
          6111 Volders<br />
          Österreich
        </div>
        <p style={{ color: 'rgba(82, 83, 66, 0.55)' }}>Inhaber (Firmeninhaber)</p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <AddressBlock>
          <div>E-Mail: <a href="mailto:info@elior.studio" className="underline hover:no-underline" style={{ color: '#9A7A50' }}>info@elior.studio</a></div>
          <div>Telefon: <a href="tel:+4367764059711" className="underline hover:no-underline" style={{ color: '#9A7A50' }}>+43 677 6405 9711</a></div>
        </AddressBlock>
        <p style={{ color: 'rgba(82, 83, 66, 0.55)' }}>
          Website: <a href="https://elior.studio" className="underline hover:no-underline" style={{ color: '#9A7A50' }}>elior.studio</a>
        </p>
      </LegalSection>

      <LegalSection title="Unternehmensdaten">
        <AddressBlock>
          <div><strong>Rechtsform:</strong> Einzelunternehmen</div>
          <div><strong>Unternehmensgegenstand:</strong> Softwareentwicklung, Webdesign, App-Entwicklung (iOS &amp; Android) und digitale Dienstleistungen</div>
          <div><strong>Gewerbebehörde:</strong> Bezirkshauptmannschaft Innsbruck-Land</div>
          <div><strong>Mitgliedschaften:</strong> Wirtschaftskammer Österreich (WKO)</div>
          <div><strong>Zuständige Kammer:</strong> Wirtschaftskammer Tirol</div>
        </AddressBlock>
        <p style={{ color: 'rgba(82, 83, 66, 0.55)' }}>
          Anwendbare gewerbe- und berufsrechtliche Vorschriften: Gewerbeordnung (GewO),<br />
          einsehbar unter <a href="https://www.ris.bka.gv.at" className="underline hover:no-underline" style={{ color: '#9A7A50' }}>www.ris.bka.gv.at</a>
        </p>
        <p style={{ color: 'rgba(82, 83, 66, 0.55)' }}>
          Eine Umsatzsteuer-Identifikationsnummer ist derzeit nicht vorhanden.
        </p>
      </LegalSection>

      <LegalSection title="Haftungsausschluss">
        <p>
          Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr
          übernommen werden.
        </p>
        <p>
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die
          Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich
          deren Betreiber verantwortlich.
        </p>
      </LegalSection>

      <LegalSection title="Urheberrecht">
        <p>
          Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem
          österreichischen Urheberrecht. Jede Vervielfältigung, Bearbeitung, Verbreitung und
          jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
          schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </LegalSection>
    </LegalLayout>
  );
};

export default Impressum;