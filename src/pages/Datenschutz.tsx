import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Server, Mail, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const Datenschutz = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <div className="min-h-screen" style={{ background: '#FAF9F7' }}>
      <SEO 
        title="Datenschutz | Elior"
        description="Datenschutzerklärung für die Elior Website."
      />

      {/* Header */}
      <header className="py-6 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-sm"
            style={{ color: 'rgba(82, 80, 72, 0.6)' }}
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
              border: '1px solid rgba(82, 80, 72, 0.08)',
              boxShadow: '0 20px 40px rgba(82, 80, 72, 0.05)',
            }}
          >
            <h1 
              className="font-serif text-4xl md:text-5xl mb-10"
              style={{ color: '#525048' }}
            >
              Datenschutz
            </h1>

            <div className="space-y-8">
              {/* Einleitung */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  Datenschutz auf einen Blick
                </h2>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(82, 80, 72, 0.7)' }}
                >
                  Diese Datenschutzerklärung informiert Sie über die Verarbeitung personenbezogener Daten 
                  auf unserer Website gemäß der Datenschutz-Grundverordnung (DSGVO) und dem österreichischen Datenschutzgesetz.
                </p>
              </section>

              {/* Verantwortlicher */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  Verantwortlicher
                </h2>
                <div 
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(233, 207, 185, 0.2)' }}
                >
                  <p className="font-medium mb-2" style={{ color: '#525048' }}>
                    Thomas Mayrl
                  </p>
                  <p style={{ color: 'rgba(82, 80, 72, 0.8)' }}>
                    Johannesfeldstrasse 44<br />
                    6111 Volders<br />
                    Österreich
                  </p>
                  <p className="mt-3" style={{ color: 'rgba(82, 80, 72, 0.8)' }}>
                    E-Mail: info@awen28.com
                  </p>
                </div>
              </section>

              {/* Hosting */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  Hosting
                </h2>
                <div 
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(82, 80, 72, 0.03)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Server className="w-5 h-5" style={{ color: '#B29F86' }} />
                    <p className="font-medium" style={{ color: '#525048' }}>Vercel Inc.</p>
                  </div>
                  <p 
                    className="text-sm"
                    style={{ color: 'rgba(82, 80, 72, 0.7)' }}
                  >
                    Unsere Website wird bei Vercel Inc. gehostet. Beim Besuch der Website werden 
                    technische Daten (IP-Adresse, Zeitpunkt des Zugriffs, Browsertyp) auf Servern 
                    von Vercel verarbeitet. Dies ist technisch notwendig, um die Website auszuliefern.
                  </p>
                </div>
              </section>

              {/* Kontaktformular */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  Kontaktformular
                </h2>
                <div 
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(82, 80, 72, 0.03)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5" style={{ color: '#B29F86' }} />
                    <p className="font-medium" style={{ color: '#525048' }}>Web3Forms</p>
                  </div>
                  <p 
                    className="text-sm mb-3"
                    style={{ color: 'rgba(82, 80, 72, 0.7)' }}
                  >
                    Für unser Kontaktformular nutzen wir Web3Forms. Wenn Sie das Formular ausfüllen, 
                    werden Ihre Angaben (Name, E-Mail, Nachricht) an Web3Forms übermittelt und 
                    anschließend an uns weitergeleitet.
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: 'rgba(82, 80, 72, 0.5)' }}
                  >
                    Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung/Vorvertragliche Maßnahmen)
                  </p>
                </div>
              </section>

              {/* Welche Daten erheben wir */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  Erhebung personenbezogener Daten
                </h2>
                <ul 
                  className="space-y-2 text-sm list-disc list-inside"
                  style={{ color: 'rgba(82, 80, 72, 0.7)' }}
                >
                  <li><strong>Kontaktformular:</strong> Name, E-Mail-Adresse, Projektbeschreibung</li>
                  <li><strong>Server-Logs:</strong> IP-Adresse (anonymisiert), Zeitstempel, Browser-Information</li>
                  <li><strong>Essenzielle Cookies:</strong> Session-Informationen</li>
                </ul>
              </section>

              {/* Cookies */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  Cookies
                </h2>
                <p 
                  className="text-sm mb-3"
                  style={{ color: 'rgba(82, 80, 72, 0.7)' }}
                >
                  Wir verwenden ausschließlich essenzielle Cookies, die technisch notwendig sind, 
                  um die Website funktionsfähig zu machen:
                </p>
                <div 
                  className="p-4 rounded-xl text-sm"
                  style={{ background: 'rgba(82, 80, 72, 0.03)' }}
                >
                  <table className="w-full">
                    <thead>
                      <tr style={{ color: '#525048' }}>
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Zweck</th>
                        <th className="text-left py-2">Dauer</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: 'rgba(82, 80, 72, 0.7)' }}>
                      <tr>
                        <td className="py-1">session</td>
                        <td>Session-Verwaltung</td>
                        <td>Sitzung</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Ihre Rechte */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  Ihre Rechte
                </h2>
                <div 
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(233, 207, 185, 0.2)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5" style={{ color: '#B29F86' }} />
                    <p className="font-medium" style={{ color: '#525048' }}>DSGVO-Rechte</p>
                  </div>
                  <ul 
                    className="space-y-1 text-sm list-disc list-inside"
                    style={{ color: 'rgba(82, 80, 72, 0.7)' }}
                  >
                    <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                    <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                    <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                    <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                    <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                    <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
                  </ul>
                </div>
              </section>

              {/* Kontakt für Datenschutz */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  Kontakt zum Datenschutz
                </h2>
                <p 
                  className="text-sm"
                  style={{ color: 'rgba(82, 80, 72, 0.7)' }}
                >
                  Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:<br />
                  <a 
                    href="mailto:info@awen28.com" 
                    className="underline hover:no-underline"
                    style={{ color: '#B29F86' }}
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
                    color: 'rgba(82, 80, 72, 0.4)',
                    borderColor: 'rgba(82, 80, 72, 0.1)'
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
            style={{ color: 'rgba(82, 80, 72, 0.4)' }}
          >
            <Link to="/impressum" className="hover:underline">Impressum</Link>
            <Link to="/privacy-apps" className="hover:underline">App Privacy</Link>
            <Link to="/cookies" className="hover:underline">Cookies</Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Datenschutz;
