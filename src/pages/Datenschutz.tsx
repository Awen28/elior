import LegalLayout from '../components/LegalLayout';
import { LegalSection, AddressBlock } from '../components/LegalSections';

const Datenschutz = () => {
  return (
    <LegalLayout
      title="Datenschutz"
      description="Datenschutzerklärung für die Website Elior (elior.studio) gemäß DSGVO und österreichischem Datenschutzgesetz (DSG)."
      eyebrow="Legal — Datenschutz"
      canonical="https://elior.studio/datenschutz"
      lastUpdated="October 2026"
    >
      <LegalSection title="Datenschutz auf einen Blick">
        <p>
          Diese Datenschutzerklärung informiert darüber, wie personenbezogene Daten auf
          dieser Website verarbeitet werden — gemäß der Datenschutz-Grundverordnung (DSGVO),
          dem österreichischen Datenschutzgesetz (DSG) und dem Telekommunikationsgesetz (TKG 2021).
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
        <p style={{ color: 'rgba(82, 83, 66, 0.55)' }}>
          Es ist kein Datenschutzbeauftragter bestellt, da hierfür keine gesetzliche
          Verpflichtung besteht (Art. 37 DSGVO).
        </p>
      </LegalSection>

      <LegalSection title="Hosting (Vercel)">
        <AddressBlock>
          <p>Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, gehostet.</p>
          <p>
            Beim Aufruf der Website verarbeitet Vercel technisch notwendige Daten wie
            IP-Adresse, Zeitpunkt des Zugriffs, Browsertyp und angeforderte Ressourcen
            (Server-Logfiles). Dies ist erforderlich, um die Website auszuliefern.
          </p>
          <p style={{ color: 'rgba(82, 83, 66, 0.6)' }}>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b und lit. f DSGVO (Bereitstellung der Website,
            berechtigtes Interesse an einem sicheren und funktionsfähigen Betrieb).
          </p>
          <p style={{ color: 'rgba(82, 83, 66, 0.6)' }}>
            Vercel verarbeitet Daten in den USA. Vercel ist nach dem EU-U.S. Data Privacy
            Framework (DPF) zertifiziert.
          </p>
        </AddressBlock>
      </LegalSection>

      <LegalSection title="Google Fonts">
        <p>
          Diese Website lädt die Schriftarten „Playfair Display" und „Montserrat" von Google
          Fonts (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Beim
          Laden der Schriftdateien wird Ihre IP-Adresse an Google übermittelt.
        </p>
        <p style={{ color: 'rgba(82, 83, 66, 0.6)' }}>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
          einheitlichen und ansprechenden Darstellung der Website).
        </p>
        <p style={{ color: 'rgba(82, 83, 66, 0.6)' }}>
          Google verarbeitet Daten in den USA. Google Ireland Limited ist nach dem EU-U.S.
          Data Privacy Framework (DPF) zertifiziert.
        </p>
      </LegalSection>

      <LegalSection title="Kontaktformular (Web3Forms)">
        <AddressBlock>
          <p>
            Zur Kontaktaufnahme steht ein Formular zur Verfügung. Die übermittelten Angaben
            (Name, E-Mail-Adresse, Nachricht) werden ausschließlich zur Bearbeitung der Anfrage
            verwendet.
          </p>
          <p>
            Das Formular wird über den Dienst Web3Forms übermittelt. Die Daten werden
            anschließend an unsere E-Mail-Adresse weitergeleitet.
          </p>
          <p style={{ color: 'rgba(82, 83, 66, 0.6)' }}>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen /
            Vertragserfüllung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
            Bearbeitung von Anfragen).
          </p>
          <p style={{ color: 'rgba(82, 83, 66, 0.6)' }}>
            Die Daten werden gelöscht, sobald sie für die Bearbeitung der Anfrage nicht mehr
            erforderlich sind und keine gesetzlichen Aufbewahrungspflichten bestehen.
          </p>
        </AddressBlock>
      </LegalSection>

      <LegalSection title="Cookies & lokale Speicherung">
        <p>
          Diese Website verwendet <strong>keine Tracking-, Analyse- oder Marketing-Cookies</strong>.
          Es findet keine Auswertung des Nutzungsverhaltens zu Werbezwecken statt.
        </p>
        <p>
          Zur Erinnerung der Zustimmung zur Cookie-Hinweis-Einblendung wird ein Wert in der
          lokalen Speicherung (localStorage) Ihres Browsers abgelegt („cookieConsent").
          Diese lokale Speicherung erfolgt ausschließlich auf Ihrem Gerät und wird nicht an uns
          übermittelt.
        </p>
        <p style={{ color: 'rgba(82, 83, 66, 0.55)' }}>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO sowie § 165 Abs. 3 TKG 2021 (technisch
          erforderliche Speicherung).
        </p>
      </LegalSection>

      <LegalSection title="Ihre Rechte">
        <p>Ihnen stehen als betroffene Person folgende Rechte zu (Art. 15 bis 21 DSGVO):</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
          <li>
            Widerrufsrecht: Sofern die Verarbeitung auf einer Einwilligung beruht, können Sie
            diese jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Beschwerderecht bei der Datenschutzbehörde">
        <AddressBlock>
          <p>
            Sie haben das Recht, sich bei der österreichischen Datenschutzbehörde zu
            beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die
            DSGVO oder das DSG verstößt (Art. 77 DSGVO):
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

      <LegalSection title="Kontakt bei Fragen zum Datenschutz">
        <p>
          Bei Fragen zur Datenverarbeitung auf dieser Website wenden Sie sich bitte direkt an
          uns: <a href="mailto:info@elior.studio" className="underline hover:no-underline" style={{ color: '#9A7A50' }}>info@elior.studio</a>
        </p>
      </LegalSection>
    </LegalLayout>
  );
};

export default Datenschutz;