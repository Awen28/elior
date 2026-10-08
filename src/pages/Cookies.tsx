import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Cookie, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const Cookies = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <div className="min-h-screen" style={{ background: '#FAF9F7' }}>
      <SEO 
        title="Cookie-Einstellungen | Elior"
        description="Informationen über Cookies auf der Elior Website."
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
            <div className="flex items-center gap-4 mb-8">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #E9CFB9, #B29F86)' }}
              >
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <h1 
                className="font-serif text-4xl md:text-5xl"
                style={{ color: '#525048' }}
              >
                Cookie-Einstellungen
              </h1>
            </div>

            <div className="space-y-8">
              {/* Was sind Cookies */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  Was sind Cookies?
                </h2>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(82, 80, 72, 0.7)' }}
                >
                  Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Gerät gespeichert werden. 
                  Sie dienen dazu, die Website funktionsfähig zu machen, die Benutzererfahrung zu verbessern 
                  und bestimmte Informationen für den Betreiber bereitzustellen.
                </p>
              </section>

              {/* Unsere Verwendung */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  Verwendung auf dieser Website
                </h2>
                <div 
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(233, 207, 185, 0.2)', border: '1px solid rgba(178, 159, 134, 0.2)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Info className="w-5 h-5" style={{ color: '#B29F86' }} />
                    <p className="font-medium" style={{ color: '#525048' }}>
                      Nur essenzielle Cookies
                    </p>
                  </div>
                  <p 
                    className="text-sm"
                    style={{ color: 'rgba(82, 80, 72, 0.7)' }}
                  >
                    Wir verwenden auf unserer Website ausschließlich technisch notwendige Cookies. 
                    Diese sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden.
                  </p>
                </div>
              </section>

              {/* Cookie-Übersicht */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  Verwendete Cookies
                </h2>
                <div className="overflow-hidden rounded-xl">
                  <table className="w-full text-sm">
                    <thead style={{ background: 'rgba(82, 80, 72, 0.05)' }}>
                      <tr>
                        <th className="text-left p-4 font-medium" style={{ color: '#525048' }}>Name</th>
                        <th className="text-left p-4 font-medium" style={{ color: '#525048' }}>Zweck</th>
                        <th className="text-left p-4 font-medium" style={{ color: '#525048' }}>Dauer</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ background: 'rgba(82, 80, 72, 0.02)' }}>
                        <td className="p-4 font-mono text-xs" style={{ color: 'rgba(82, 80, 72, 0.8)' }}>
                          session
                        </td>
                        <td className="p-4" style={{ color: 'rgba(82, 80, 72, 0.7)' }}>
                          Speichert Session-Informationen für die Website-Funktionalität
                        </td>
                        <td className="p-4" style={{ color: 'rgba(82, 80, 72, 0.6)' }}>
                          Sitzung
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Keine Tracking Cookies */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  Keine Tracking- oder Marketing-Cookies
                </h2>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(82, 80, 72, 0.7)' }}
                >
                  Wir verzichten bewusst auf Tracking-Cookies, Analyse-Tools und Marketing-Cookies. 
                  Ihr Besuch auf unserer Website wird nicht zu Analysezwecken erfasst oder an Dritte 
                  zu Werbezwecken weitergegeben.
                </p>
              </section>

              {/* Browser-Einstellungen */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  Cookie-Verwaltung im Browser
                </h2>
                <p 
                  className="text-sm mb-4"
                  style={{ color: 'rgba(82, 80, 72, 0.7)' }}
                >
                  Sie können Ihre Cookie-Einstellungen in Ihrem Browser verwalten:
                </p>
                <div className="space-y-2 text-sm">
                  {[
                    { browser: 'Chrome', path: 'Einstellungen → Datenschutz und Sicherheit → Cookies' },
                    { browser: 'Firefox', path: 'Einstellungen → Privatsphäre & Sicherheit → Cookies' },
                    { browser: 'Safari', path: 'Einstellungen → Datenschutz → Cookies' },
                    { browser: 'Edge', path: 'Einstellungen → Cookies und Websiteberechtigungen' },
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-4 p-3 rounded-lg"
                      style={{ background: 'rgba(82, 80, 72, 0.03)' }}
                    >
                      <span className="font-medium w-20" style={{ color: '#525048' }}>
                        {item.browser}
                      </span>
                      <span style={{ color: 'rgba(82, 80, 72, 0.6)' }}>
                        {item.path}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Kontakt */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  Fragen?
                </h2>
                <p 
                  className="text-sm"
                  style={{ color: 'rgba(82, 80, 72, 0.7)' }}
                >
                  Bei Fragen zu Cookies oder dieser Richtlinie kontaktieren Sie uns unter{' '}
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
            <Link to="/datenschutz" className="hover:underline">Datenschutz</Link>
            <Link to="/privacy-apps" className="hover:underline">App Privacy</Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Cookies;
