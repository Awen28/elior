import LegalLayout from '../components/LegalLayout';
import { LegalSection, AddressBlock } from '../components/LegalSections';

const thirdParties = [
  {
    name: 'Google AdMob',
    purpose: 'Werbeanzeigen in den Apps',
    data: 'Geräte-ID, Nutzungsdaten, Werbe-Interaktionen',
  },
  {
    name: 'Google Analytics',
    purpose: 'Nutzungsanalyse und App-Verbesserung',
    data: 'App-Nutzung, Sitzungsdauer, Abstürze',
  },
  {
    name: 'Firebase',
    purpose: 'Backend-Dienste, Datenspeicherung, Authentifizierung',
    data: 'Nutzerdaten, App-Daten, Cloud-Speicher',
  },
  {
    name: 'OpenAI',
    purpose: 'KI-Funktionen in ausgewählten Apps',
    data: 'Eingegebene Prompts',
  },
  {
    name: 'xAI (Grok)',
    purpose: 'KI-Funktionen in ausgewählten Apps',
    data: 'Eingegebene Prompts',
  },
  {
    name: 'Suno AI',
    purpose: 'Musikgenerierung in Elow',
    data: 'Prompts für Musikerstellung',
  },
  {
    name: 'Apple Game Center',
    purpose: 'Highscores und Multiplayer-Funktionen',
    data: 'Spielerprofil, Punktestände',
  },
];

const PrivacyApps = () => {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="Datenschutzerklärung für die iOS Apps von Elior (kiBook, Suremate, Suremate Pro, 369, NumiStellar, Elow)."
      eyebrow="Legal — App Privacy"
      canonical="https://elior.studio/privacy-apps"
      lastUpdated="October 2026"
    >
      <LegalSection title="Geltungsbereich">
        <p>
          Diese Datenschutzerklärung gilt für alle iOS-Anwendungen von Elior (Thomas Mayrl).
          Dazu zählen unter anderem kiBook, Suremate, Suremate Pro, 369 Manifestation,
          NumiStellar, Elow und ABWUN.
        </p>
      </LegalSection>

      <LegalSection title="Verantwortlicher">
        <AddressBlock>
          <div className="font-medium" style={{ color: '#4E4F41' }}>Thomas Mayrl</div>
          <div>Johannesfeldstrasse 44</div>
          <div>6111 Volders</div>
          <div>Österreich</div>
          <div className="pt-1">E-Mail: <a href="mailto:info@elior.studio" className="underline hover:no-underline" style={{ color: '#9A7A50' }}>info@elior.studio</a></div>
        </AddressBlock>
      </LegalSection>

      <LegalSection title="Erhobene Daten">
        <p>Je nach App und genutzten Funktionen werden folgende Daten verarbeitet:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Kontodaten (E-Mail-Adresse, Name bei App-Registrierung)</li>
          <li>Geräteinformationen (Gerätemodell, iOS-Version, Geräte-ID)</li>
          <li>Nutzungsdaten (App-Interaktionen, Sitzungsdauer)</li>
          <li>Eingaben für KI-Funktionen (Prompts)</li>
          <li>Werbe-Interaktionen (über AdMob)</li>
        </ul>
      </LegalSection>

      <LegalSection title="Drittanbieter und KI-Dienste">
        <p>Unsere Apps nutzen folgende Drittanbieter-Dienste:</p>
        <div className="space-y-3 mt-4">
          {thirdParties.map((party, idx) => (
            <div
              key={idx}
              className="px-5 py-4 rounded-2xl"
              style={{ background: 'rgba(186, 154, 106, 0.06)' }}
            >
              <p className="font-medium mb-1" style={{ color: '#4E4F41' }}>
                {party.name}
              </p>
              <p className="text-sm mb-0.5" style={{ color: 'rgba(82, 83, 66, 0.65)' }}>
                <strong>Zweck:</strong> {party.purpose}
              </p>
              <p className="text-xs" style={{ color: 'rgba(82, 83, 66, 0.5)' }}>
                <strong>Daten:</strong> {party.data}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4" style={{ color: 'rgba(82, 83, 66, 0.6)' }}>
          Anbieter wie Google, OpenAI und xAI können Daten in die USA übermitteln. Soweit
          verfügbar, sind diese Anbieter nach dem EU-U.S. Data Privacy Framework (DPF)
          zertifiziert oder stützen die Übermittlung auf Standardvertragsklauseln.
        </p>
      </LegalSection>

      <LegalSection title="Hinweis zu KI-Funktionen">
        <p>
          Bei Nutzung von KI-Funktionen werden Ihre Eingaben an externe KI-Anbieter (OpenAI,
          xAI, Suno AI) übermittelt. Bitte geben Sie keine sensiblen persönlichen Daten in
          KI-Prompts ein.
        </p>
      </LegalSection>

      <LegalSection title="Datenspeicherung">
        <p>
          Nutzerkonten und App-Daten können in Firebase (Google Cloud) gespeichert werden.
          Daten werden so lange aufbewahrt, wie das Benutzerkonto aktiv ist oder gesetzliche
          Aufbewahrungspflichten bestehen.
        </p>
      </LegalSection>

      <LegalSection title="Ihre Rechte">
        <p>Sie haben hinsichtlich Ihrer Daten insbesondere folgende Rechte:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
          <li>Widerrufsrecht bei Einwilligungsbasis (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
      </LegalSection>

      <LegalSection title="Beschwerderecht bei der Datenschutzbehörde">
        <AddressBlock>
          <p>
            Sie haben das Recht, sich bei der österreichischen Datenschutzbehörde zu beschweren
            (Art. 77 DSGVO):
          </p>
          <div className="pt-1">
            Österreichische Datenschutzbehörde<br />
            Barichgasse 40–42<br />
            1030 Wien<br />
            E-Mail: <a href="mailto:dsb@dsb.gv.at" className="underline hover:no-underline" style={{ color: '#9A7A50' }}>dsb@dsb.gv.at</a><br />
            Website: <a href="https://www.dsb.gv.at" className="underline hover:no-underline" style={{ color: '#9A7A50' }}>www.dsb.gv.at</a>
          </div>
        </AddressBlock>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          Bei Fragen zum Datenschutz in unseren Apps kontaktieren Sie uns unter{' '}
          <a href="mailto:info@elior.studio" className="underline hover:no-underline" style={{ color: '#9A7A50' }}>
            info@elior.studio
          </a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
};

export default PrivacyApps;