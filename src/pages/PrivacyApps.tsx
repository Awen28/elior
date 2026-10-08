import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Smartphone, Shield, Database, Cloud, Brain, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const PrivacyApps = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const thirdParties = [
    {
      icon: Database,
      name: 'Google AdMob',
      purpose: 'Werbeanzeigen in den Apps',
      data: 'Geräte-ID, Nutzungsdaten, Werbe-Interaktionen',
    },
    {
      icon: Cloud,
      name: 'Google Analytics',
      purpose: 'Nutzungsanalyse und App-Verbesserung',
      data: 'App-Nutzung, Sitzungsdauer, Abstürze',
    },
    {
      icon: Database,
      name: 'Firebase',
      purpose: 'Backend-Dienste, Datenspeicherung, Authentifizierung',
      data: 'Nutzerdaten, App-Daten, Cloud-Speicher',
    },
    {
      icon: Brain,
      name: 'OpenAI',
      purpose: 'KI-Funktionen in ausgewählten Apps',
      data: 'Eingegebene Prompts (anonymisiert)',
    },
    {
      icon: Brain,
      name: 'xAI (Grok)',
      purpose: 'KI-Funktionen in ausgewählten Apps',
      data: 'Eingegebene Prompts (anonymisiert)',
    },
    {
      icon: Brain,
      name: 'Suno AI',
      purpose: 'Musikgenerierung in Elow',
      data: 'Prompts für Musikerstellung',
    },
    {
      icon: MessageSquare,
      name: 'Speechify AI',
      purpose: 'Text-to-Speech Funktionen',
      data: 'Texte für Sprachausgabe',
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F1EDE6' }}>
      <SEO 
        title="Privacy Policy | Elior Apps"
        description="Privacy Policy for Elior iOS Apps."
      />

      {/* Header */}
      <header className="py-6 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-sm"
            style={{ color: 'rgba(82, 82, 64, 0.6)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 md:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="p-8 md:p-12 rounded-[30px]"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(82, 82, 64, 0.08)',
              boxShadow: '0 20px 40px rgba(82, 82, 64, 0.05)',
            }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #BBB1A4, #E3DED5)' }}
              >
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 
                  className="font-serif text-4xl md:text-5xl"
                  style={{ color: '#525240' }}
                >
                  Privacy Policy
                </h1>
                <p style={{ color: 'rgba(82, 82, 64, 0.5)' }}>
                  Für alle Elior iOS Apps
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Geltungsbereich */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525240' }}
                >
                  Geltungsbereich
                </h2>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(82, 82, 64, 0.7)' }}
                >
                  Diese Datenschutzerklärung gilt für alle iOS-Anwendungen von Elior, 
                  einschließlich aber nicht beschränkt auf: kiBook, Suremate, Suremate Pro, 
                  VisAI, 369 Manifestation, NumiStellar und Elow.
                </p>
              </section>

              {/* Verantwortlicher */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525240' }}
                >
                  Verantwortlicher
                </h2>
                <div 
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(233, 207, 185, 0.2)' }}
                >
                  <p className="font-medium" style={{ color: '#525240' }}>
                    Thomas Mayrl
                  </p>
                  <p style={{ color: 'rgba(82, 82, 64, 0.8)' }}>
                    Johannesfeldstrasse 44, 6111 Volders, Österreich
                  </p>
                  <p style={{ color: 'rgba(82, 82, 64, 0.8)' }}>
                    info@awen28.com
                  </p>
                </div>
              </section>

              {/* Welche Daten werden erfasst */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525240' }}
                >
                  Erhobene Daten
                </h2>
                <div className="space-y-3">
                  {[
                    { label: 'Konto-Daten', desc: 'E-Mail-Adresse, Name (bei App-Registrierung)' },
                    { label: 'Geräteinformationen', desc: 'Gerätemodell, iOS-Version, Geräte-ID' },
                    { label: 'Nutzungsdaten', desc: 'App-Interaktionen, Sitzungsdauer, Funktionsnutzung' },
                    { label: 'KI-Eingaben', desc: 'Prompts und Eingaben für KI-Funktionen (anonymisiert)' },
                    { label: 'Werbe-Daten', desc: 'Werbe-Interaktionen, Präferenzen (über AdMob)' },
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex justify-between items-center p-4 rounded-xl"
                      style={{ background: 'rgba(82, 82, 64, 0.03)' }}
                    >
                      <span className="font-medium text-sm" style={{ color: '#525240' }}>
                        {item.label}
                      </span>
                      <span className="text-sm text-right" style={{ color: 'rgba(82, 82, 64, 0.6)' }}>
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Drittanbieter */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525240' }}
                >
                  Drittanbieter und KI-Dienste
                </h2>
                <p 
                  className="text-sm mb-4"
                  style={{ color: 'rgba(82, 82, 64, 0.7)' }}
                >
                  Unsere Apps nutzen folgende Drittanbieter-Dienste:
                </p>
                <div className="space-y-3">
                  {thirdParties.map((party, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl"
                      style={{ background: 'rgba(82, 82, 64, 0.03)' }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <party.icon className="w-5 h-5" style={{ color: '#BBB1A4' }} />
                        <p className="font-medium" style={{ color: '#525240' }}>
                          {party.name}
                        </p>
                      </div>
                      <p className="text-sm mb-1" style={{ color: 'rgba(82, 82, 64, 0.6)' }}>
                        <strong>Zweck:</strong> {party.purpose}
                      </p>
                      <p className="text-xs" style={{ color: 'rgba(82, 82, 64, 0.5)' }}>
                        <strong>Daten:</strong> {party.data}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* KI-Hinweis */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525240' }}
                >
                  Hinweis zu KI-Funktionen
                </h2>
                <div 
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(178, 159, 134, 0.1)', border: '1px solid rgba(178, 159, 134, 0.2)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="w-5 h-5" style={{ color: '#BBB1A4' }} />
                    <p className="font-medium" style={{ color: '#525240' }}>
                      Verarbeitung durch KI-Anbieter
                    </p>
                  </div>
                  <p 
                    className="text-sm"
                    style={{ color: 'rgba(82, 82, 64, 0.7)' }}
                  >
                    Bei Nutzung von KI-Funktionen werden Ihre Eingaben an externe KI-Anbieter 
                    (OpenAI, xAI, Suno AI, Speechify) übermittelt. Diese Daten werden anonymisiert 
                    verarbeitet und nicht mit Ihrem Benutzerkonto verknüpft. Bitte geben Sie keine 
                    sensiblen persönlichen Daten in KI-Prompts ein.
                  </p>
                </div>
              </section>

              {/* Speicherung */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525240' }}
                >
                  Datenspeicherung
                </h2>
                <p 
                  className="text-sm"
                  style={{ color: 'rgba(82, 82, 64, 0.7)' }}
                >
                  Nutzerkonten und App-Daten werden in Firebase (Google Cloud) gespeichert. 
                  Daten werden so lange aufbewahrt, wie das Benutzerkonto aktiv ist oder gesetzliche 
                  Aufbewahrungspflichten bestehen. Sie können Ihr Konto und alle damit verbundenen 
                  Daten jederzeit löschen lassen.
                </p>
              </section>

              {/* Rechte */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525240' }}
                >
                  Ihre Rechte
                </h2>
                <div 
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(233, 207, 185, 0.2)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5" style={{ color: '#BBB1A4' }} />
                    <p className="font-medium" style={{ color: '#525240' }}>
                      DSGVO-Rechte
                    </p>
                  </div>
                  <ul 
                    className="space-y-1 text-sm list-disc list-inside"
                    style={{ color: 'rgba(82, 82, 64, 0.7)' }}
                  >
                    <li>Auskunft über gespeicherte Daten</li>
                    <li>Berichtigung falscher Daten</li>
                    <li>Löschung Ihres Kontos und aller Daten</li>
                    <li>Einschränkung der Verarbeitung</li>
                    <li>Widerruf der Einwilligung</li>
                  </ul>
                </div>
              </section>

              {/* Kontakt */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525240' }}
                >
                  Kontakt
                </h2>
                <p 
                  className="text-sm"
                  style={{ color: 'rgba(82, 82, 64, 0.7)' }}
                >
                  Bei Fragen zum Datenschutz in unseren Apps kontaktieren Sie uns unter:<br />
                  <a 
                    href="mailto:info@awen28.com" 
                    className="underline hover:no-underline"
                    style={{ color: '#BBB1A4' }}
                  >
                    info@awen28.com
                  </a>
                </p>
              </section>

              {/* Stand */}
              <section>
                <p 
                  className="text-xs text-center pt-8 border-t"
                  style={{ 
                    color: 'rgba(82, 82, 64, 0.4)',
                    borderColor: 'rgba(82, 82, 64, 0.1)'
                  }}
                >
                  Stand: Februar 2025
                </p>
              </section>
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-8 flex justify-center gap-6 text-xs"
            style={{ color: 'rgba(82, 82, 64, 0.4)' }}
          >
            <Link to="/impressum" className="hover:underline">Impressum</Link>
            <Link to="/datenschutz" className="hover:underline">Datenschutz</Link>
            <Link to="/cookies" className="hover:underline">Cookies</Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyApps;
