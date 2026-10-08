import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const Impressum = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <div className="min-h-screen" style={{ background: '#F1EDE6' }}>
      <SEO 
        title="Impressum | Elior"
        description="Impressum und rechtliche Informationen für Elior."
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
            <h1 
              className="font-serif text-4xl md:text-5xl mb-10"
              style={{ color: '#525240' }}
            >
              Impressum
            </h1>

            <div className="space-y-8">
              {/* Angaben gemäß § 5 ECG, § 25 Mediengesetz */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525240' }}
                >
                  Unternehmensdaten
                </h2>
                <div 
                  className="p-6 rounded-2xl space-y-3"
                  style={{ background: 'rgba(233, 207, 185, 0.2)' }}
                >
                  <p className="font-medium" style={{ color: '#525240' }}>
                    Elior
                  </p>
                  <p style={{ color: 'rgba(82, 82, 64, 0.8)' }}>
                    Inhaber: Thomas Mayrl
                  </p>
                  <p style={{ color: 'rgba(82, 82, 64, 0.8)' }}>
                    Johannesfeldstrasse 44<br />
                    6111 Volders<br />
                    Österreich
                  </p>
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
                <div className="space-y-3">
                  <a 
                    href="mailto:info@awen28.com"
                    className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.02]"
                    style={{ 
                      background: 'rgba(82, 82, 64, 0.03)',
                      color: '#525240',
                    }}
                  >
                    <Mail className="w-5 h-5" style={{ color: '#BBB1A4' }} />
                    info@awen28.com
                  </a>
                  <a 
                    href="tel:+4367764059711"
                    className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.02]"
                    style={{ 
                      background: 'rgba(82, 82, 64, 0.03)',
                      color: '#525240',
                    }}
                  >
                    <Phone className="w-5 h-5" style={{ color: '#BBB1A4' }} />
                    +43 677 / 640 59 711
                  </a>
                </div>
              </section>

              {/* Rechtliche Hinweise */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525240' }}
                >
                  Rechtliche Hinweise
                </h2>
                <div 
                  className="p-6 rounded-2xl space-y-4 text-sm"
                  style={{ 
                    background: 'rgba(82, 82, 64, 0.03)',
                    color: 'rgba(82, 82, 64, 0.8)',
                  }}
                >
                  <p>
                    <strong>Rechtsform:</strong> Einzelunternehmen
                  </p>
                  <p>
                    <strong>Gewerbebehörde:</strong> Bezirkshauptmannschaft Innsbruck-Land
                  </p>
                  <p>
                    <strong>Unternehmensgegenstand:</strong> Softwareentwicklung, Webdesign und digitale Dienstleistungen
                  </p>
                  <p>
                    <strong>Umsatzsteuer-Identifikationsnummer:</strong> wird nachgereicht
                  </p>
                </div>
              </section>

              {/* Haftungsausschluss */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525240' }}
                >
                  Haftungsausschluss
                </h2>
                <div 
                  className="space-y-4 text-sm"
                  style={{ color: 'rgba(82, 82, 64, 0.7)' }}
                >
                  <p>
                    Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. 
                    Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                  </p>
                  <p>
                    Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. 
                    Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                  </p>
                </div>
              </section>

              {/* Urheberrecht */}
              <section>
                <h2 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525240' }}
                >
                  Urheberrecht
                </h2>
                <p 
                  className="text-sm"
                  style={{ color: 'rgba(82, 82, 64, 0.7)' }}
                >
                  Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem österreichischen Urheberrecht. 
                  Jede Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
                  bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
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
            <Link to="/datenschutz" className="hover:underline">Datenschutz</Link>
            <Link to="/privacy-apps" className="hover:underline">App Privacy</Link>
            <Link to="/cookies" className="hover:underline">Cookies</Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Impressum;
