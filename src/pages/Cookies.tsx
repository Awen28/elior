import LegalLayout from '../components/LegalLayout';
import { LegalSection, AddressBlock } from '../components/LegalSections';

const Cookies = () => {
  return (
    <LegalLayout
      title="Cookie-Richtlinie"
      description="Informationen über Cookies und lokale Speicherung auf der Website Elior (elior.studio). Keine Tracking- oder Marketing-Cookies."
      eyebrow="Legal — Cookies"
      canonical="https://elior.studio/cookies"
      lastUpdated="October 2026"
    >
      <LegalSection title="Was sind Cookies?">
        <p>
          Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Gerät
          gespeichert werden. Sie dienen dazu, die Website funktionsfähig zu machen oder
          Informationen über das Nutzungsverhalten bereitzustellen.
        </p>
      </LegalSection>

      <LegalSection title="Verwendung auf dieser Website">
        <AddressBlock>
          <p className="font-medium" style={{ color: '#4E4F41' }}>
            Wir setzen keine Tracking-, Analyse- oder Marketing-Cookies ein.
          </p>
          <p>
            Diese Website verwendet ausschließlich eine lokale Speicherung im Browser
            (localStorage) zur Erinnerung Ihrer Zustimmung zur Cookie-Hinweis-Einblendung.
            Es werden dabei keine personenbezogenen Daten an uns oder Dritte übermittelt.
          </p>
        </AddressBlock>
      </LegalSection>

      <LegalSection title="Eingesetzte Speicherung">
        <AddressBlock>
          <p><strong>Name:</strong> cookieConsent</p>
          <p><strong>Art:</strong> localStorage (Browser-Speicher, kein Cookie)</p>
          <p><strong>Zweck:</strong> Speicherung Ihrer Zustimmung zur Hinweis-Einblendung</p>
          <p><strong>Dauer:</strong> Bis zur manuellen Löschung im Browser</p>
        </AddressBlock>
        <p style={{ color: 'rgba(82, 83, 66, 0.55)' }}>
          Rechtsgrundlage: § 165 Abs. 3 TKG 2021 (für die Bereitstellung technisch
          erforderlicher Speicherungen).
        </p>
      </LegalSection>

      <LegalSection title="Cookie-Verwaltung im Browser">
        <p>
          Sie können Ihre Cookie-Einstellungen und die lokale Speicherung in Ihrem Browser
          jederzeit verwalten:
        </p>
        <div className="space-y-2 mt-3">
          {[
            { browser: 'Chrome', path: 'Einstellungen → Datenschutz und Sicherheit → Cookies' },
            { browser: 'Firefox', path: 'Einstellungen → Privatsphäre & Sicherheit → Cookies' },
            { browser: 'Safari', path: 'Einstellungen → Datenschutz → Cookies' },
            { browser: 'Edge', path: 'Einstellungen → Cookies und Websiteberechtigungen' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(186, 154, 106, 0.07)' }}
            >
              <span className="font-medium text-sm w-20" style={{ color: '#4E4F41' }}>
                {item.browser}
              </span>
              <span className="text-sm" style={{ color: 'rgba(82, 83, 66, 0.6)' }}>
                {item.path}
              </span>
            </div>
          ))}
        </div>
      </LegalSection>

      <LegalSection title="Fragen?">
        <p>
          Bei Fragen zu Cookies oder dieser Richtlinie kontaktieren Sie uns jederzeit unter{' '}
          <a href="mailto:info@elior.studio" className="underline hover:no-underline" style={{ color: '#9A7A50' }}>
            info@elior.studio
          </a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
};

export default Cookies;