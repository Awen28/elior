import { useRef, Fragment } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Shield, MapPin, Cloud, ChevronRight, MapPinIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { useEffect } from 'react';

const TERRACOTTA = '#C49070';
const CREAM = '#F1EDE6';
const CREAM_SOFT = '#F5F1EC';
const CREAM_DEEP = '#EDE6DF';
const INK = '#4A4038';
const INK_SOFT = 'rgba(74, 64, 56, 0.65)';

const StradaHubPrivacy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/stradahub/privacy') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location]);

  return (
    <Fragment>
      <SEO
        title="Datenschutzerklärung | StradaHub - Community-Verkehrs-App"
        description="Datenschutzerklärung für StradaHub iOS App von Elior. Transparente Informationen über Datenverarbeitung, Standortnutzung und Ihre Rechte nach DSGVO."
        canonical="https://www.awen28.com/stradahub/privacy"
      />
      <div className="min-h-screen" style={{ background: CREAM }}>
        {/* Header */}
        <header
          className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-8"
          style={{
            background: 'rgba(250, 249, 247, 0.85)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(74, 64, 56, 0.06)',
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              to="/stradahub"
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: INK_SOFT }}
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zu StradaHub
            </Link>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C49070, #E8D3C4)' }}
              >
                <MapPinIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-2xl" style={{ color: INK }}>StradaHub</span>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative pt-32 pb-12 px-6 md:px-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at bottom, ${CREAM_SOFT} 0%, ${CREAM} 50%, ${CREAM_DEEP} 100%)`,
              }}
            />
            <motion.div
              animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(196, 144, 112, 0.12) 0%, transparent 60%)' }}
            />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C49070, #E8D3C4)' }}
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-4xl md:text-6xl mb-4"
                style={{ color: INK }}
              >
                Datenschutzerklärung
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg"
                style={{ color: INK_SOFT }}
              >
                Für StradaHub - Community-Verkehrs-App
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <main className="px-6 md:px-8 py-12 relative" style={{ background: CREAM }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(196, 144, 112, 0.04) 0%, transparent 60%)' }} />

          <div className="max-w-3xl mx-auto relative z-10">
            <motion.div
              ref={sectionRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="p-8 md:p-12 rounded-[30px]"
              style={{
                background: CREAM_SOFT,
                boxShadow: `
                  inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                  inset -3px -3px 6px rgba(74, 64, 56, 0.05),
                  20px 20px 40px rgba(196, 144, 112, 0.08),
                  -20px -20px 40px rgba(255, 255, 255, 0.9)
                `,
              }}
            >
              <div className="space-y-10">

                {/* Einleitung */}
                <section>
                  <p className="text-sm leading-relaxed" style={{ color: INK_SOFT }}>
                    Diese Datenschutzerklärung erläutert, wie Elior ("wir", "uns") Ihre personenbezogenen Daten
                    verarbeitet, wenn Sie die StradaHub Mobile-Anwendung (die "App") nutzen. Die App wird von
                    Thomas Mayrl, Johannesfeldstrasse 44, 6111 Volders, Österreich betrieben. Wir nehmen den
                    Schutz Ihrer Daten ernst und halten uns an die DSGVO (EU-Verordnung 2016/679) sowie das
                    österreichische Datenschutzgesetz (DSG).
                  </p>
                </section>

                {/* Verantwortlicher */}
                <section>
                  <h2 className="font-serif text-2xl mb-4" style={{ color: INK }}>
                    Verantwortlicher
                  </h2>
                  <div
                    className="p-6 rounded-2xl"
                    style={{ background: `${TERRACOTTA}10`, border: `1px solid ${TERRACOTTA}22` }}
                  >
                    <p className="font-medium" style={{ color: INK }}>Thomas Mayrl</p>
                    <p style={{ color: INK_SOFT }}>Johannesfeldstrasse 44, 6111 Volders, Austria</p>
                    <p style={{ color: INK_SOFT }}>info@awen28.com</p>
                  </div>
                </section>

                {/* Grundsätze */}
                <section>
                  <h2 className="font-serif text-2xl mb-4" style={{ color: INK }}>
                    Grundsätze der Datenverarbeitung
                  </h2>
                  <div
                    className="p-6 rounded-2xl mb-4"
                    style={{ background: `${TERRACOTTA}10`, border: `1px solid ${TERRACOTTA}22` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="w-5 h-5" style={{ color: TERRACOTTA }} />
                      <p className="font-medium" style={{ color: INK }}>Datensparsamkeit nach Art. 5 DSGVO</p>
                    </div>
                    <p className="text-sm" style={{ color: INK_SOFT }}>
                      StradaHub wurde von Grund auf datensparsam entwickelt. Es werden <strong style={{ color: INK }}>keine
                      personenbezogenen Daten erhoben, gespeichert oder weitergegeben</strong>. Die App benötigt
                      keine Registrierung, keinen Account und erfasst keine Nutzerprofile.
                    </p>
                  </div>
                </section>

                {/* Welche Daten */}
                <section>
                  <h2 className="font-serif text-2xl mb-4" style={{ color: INK }}>
                    Welche Daten werden verarbeitet?
                  </h2>

                  <div className="space-y-4">
                    {/* Standort */}
                    <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255, 0.5)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-5 h-5" style={{ color: TERRACOTTA }} />
                        <p className="font-medium" style={{ color: INK }}>Standortdaten (anonym)</p>
                      </div>
                      <p className="text-sm" style={{ color: INK_SOFT }}>
                        Die App ermittelt Ihren <strong style={{ color: INK }}>ungefähren Standort</strong> (nicht exakte GPS-Koordinaten),
                        um:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm" style={{ color: INK_SOFT }}>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: TERRACOTTA }} />
                          Verkehrsmeldungen in Ihrer Nähe auf der Karte anzuzeigen
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: TERRACOTTA }} />
                          Proximity-Benachrichtigungen für Meldungen in Ihrem eingestellten Radius zu senden
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: TERRACOTTA }} />
                          Meldungen Ihrer Community auf der Karte zu verorten
                        </li>
                      </ul>
                      <p className="text-sm mt-3" style={{ color: INK_SOFT }}>
                        <strong style={{ color: INK }}>Wichtig:</strong> Der Standort wird <strong style={{ color: INK }}>nur im aktiven
                        Betrieb</strong> ermittelt und <strong style={{ color: INK }}>nicht dauerhaft gespeichert</strong>.
                        Es werden keine Standortverlaufsprofile erstellt. Der Zugriff auf den Standort erfolgt
                        ausschließlich mit Ihrer <strong style={{ color: INK }}>ausdrücklichen Einwilligung</strong> (iOS-Berechtigung).
                      </p>
                    </div>

                    {/* Gemeldete Verkehrsereignisse */}
                    <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255, 0.5)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-5 h-5" style={{ color: TERRACOTTA }} />
                        <p className="font-medium" style={{ color: INK }}>Community-Meldungen</p>
                      </div>
                      <p className="text-sm" style={{ color: INK_SOFT }}>
                        Verkehrsereignisse (Unfälle, Baustellen, Sperrungen, Stau, Gefahren, Kontrollen), die Sie
                        oder andere Nutzer melden, werden <strong style={{ color: INK }}>anonym in Firebase Firestore</strong> gespeichert.
                        Es werden <strong style={{ color: INK }}>keine personenbezogenen Daten</strong> mit diesen Meldungen
                        verknüpft. Meldungen laufen automatisch nach einer festgelegten Zeit ab und werden
                        gelöscht.
                      </p>
                    </div>

                    {/* Keine Daten */}
                    <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255, 0.5)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-5 h-5" style={{ color: '#6B8F71' }} />
                        <p className="font-medium" style={{ color: INK }}>Was wir definitiv nicht erheben</p>
                      </div>
                      <ul className="space-y-2 text-sm" style={{ color: INK_SOFT }}>
                        {[
                          'Kein Name, keine E-Mail-Adresse, kein Account',
                          'Kein Contact-Listing, keine Nachrichten, keine Fotos',
                          'Keine Nutzerprofile, kein Verhaltens-Tracking',
                          'Keine Werbung, kein Ad-Tracking, kein Marketing',
                          'Kein `Device ID`-Tracking für Werbezwecke',
                          'Kein Telemetriedaten-Verkauf',
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: '#6B8F71' }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Firebase */}
                <section>
                  <h2 className="font-serif text-2xl mb-4" style={{ color: INK }}>
                    Firebase (Google Ireland Limited)
                  </h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: INK_SOFT }}>
                    StradaHub nutzt Firebase, einen Dienst der Google Ireland Limited (Gordon House, Barrow Street,
                    Dublin 4, Irland), für die Speicherung der anonymisierten Community-Meldungen (Firestore),
                    die Übermittlung von Proximity-Push-Benachrichtigungen (Firebase Cloud Messaging) sowie
                    anonymisierte Crash-Reporting und Nutzungsstatistiken (Firebase Crashlytics / Analytics).
                  </p>

                  <div className="space-y-3">
                    {[
                      {
                        name: 'Firebase Cloud Firestore',
                        purpose: 'Speicherung und Abfrage der anonymisierten Verkehrsmeldungen',
                        data: 'Anonymisierte Meldungsdaten (Kategorie, ungefähre Position, Zeitstempel). Keine Personendaten.',
                      },
                      {
                        name: 'Firebase Cloud Messaging',
                        purpose: 'Zustellung von Proximity-Push-Benachrichtigungen bei neuen Meldungen in Ihrer Nähe',
                        data: 'Anonymisierte Geräte-Token (werden nicht mit Nutzerprofilen verknüpft).',
                      },
                      {
                        name: 'Firebase Crashlytics',
                        purpose: 'Anonymisierte Crash-Analyse zur Verbesserung der App-Stabilität',
                        data: 'Anonymisierte Technische Daten (OS-Version, Gerätemodell, Crash-Logs). Keine personenbezogenen Daten.',
                      },
                      {
                        name: 'Firebase Analytics',
                        purpose: 'Anonymisierte Nutzungsstatistiken (deaktivierbar)',
                        data: 'Anonymisierte Ereignisdaten (Nutzungshäufigkeit, Feature-Inanspruchnahme). Keine Nutzerprofile.',
                      },
                    ].map((service, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl"
                        style={{ background: 'rgba(255,255,255, 0.5)' }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Cloud className="w-5 h-5" style={{ color: TERRACOTTA }} />
                          <p className="font-medium" style={{ color: INK }}>{service.name}</p>
                        </div>
                        <p className="text-sm mb-1" style={{ color: INK_SOFT }}>
                          <strong style={{ color: INK }}>Zweck:</strong> {service.purpose}
                        </p>
                        <p className="text-xs" style={{ color: 'rgba(74, 64, 56, 0.5)' }}>
                          <strong style={{ color: INK_SOFT }}>Daten:</strong> {service.data}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm mt-4" style={{ color: INK_SOFT }}>
                    Die Verarbeitung durch Firebase erfolgt auf Grundlage von <strong style={{ color: INK }}>Art. 6 Abs. 1 lit. f DSGVO</strong>
                    (berechtigtes Interesse an einer stabilen, funktionsfähigen App). Google Ireland Limited ist
                    unter dem EU-US Data Privacy Framework zertifiziert. Weitere Informationen finden Sie in der{' '}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline"
                      style={{ color: TERRACOTTA }}
                    >
                      Google-Datenschutzerklärung
                    </a>.
                  </p>
                </section>

                {/* Rechtsgrundlagen */}
                <section>
                  <h2 className="font-serif text-2xl mb-4" style={{ color: INK }}>
                    Rechtsgrundlagen der Verarbeitung
                  </h2>
                  <div className="space-y-3">
                    {[
                      {
                        law: 'Art. 6 Abs. 1 lit. a DSGVO',
                        desc: 'Einwilligung: Für den Zugriff auf Ihren Standort und den Versand von Push-Benachrichtigungen erteilen Sie eine freiwillige, widerrufbare Einwilligung über die iOS-Berechtigungen.',
                      },
                      {
                        law: 'Art. 6 Abs. 1 lit. f DSGVO',
                        desc: 'Berechtigtes Interesse: Die Verarbeitung anonymisierter technischer Daten (Crash-Reports, Firestore) erfolgt zur Gewährleistung eines stabilen, sicheren App-Betriebs.',
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl"
                        style={{ background: 'rgba(255,255,255, 0.5)' }}
                      >
                        <p className="font-medium mb-1" style={{ color: INK }}>{item.law}</p>
                        <p className="text-sm" style={{ color: INK_SOFT }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Speicherdauer */}
                <section>
                  <h2 className="font-serif text-2xl mb-4" style={{ color: INK }}>
                    Speicherdauer
                  </h2>
                  <div className="space-y-3 text-sm" style={{ color: INK_SOFT }}>
                    <p>
                      <strong style={{ color: INK }}>Community-Meldungen:</strong> Werden nach Ablauf der
                      festgelegten Meldungsdauer (je nach Kategorie) automatisch und unwiderruflich aus
                      Firebase Firestore gelöscht.
                    </p>
                    <p>
                      <strong style={{ color: INK }}>Standortdaten:</strong> Werden nur im aktiven Betrieb
                      verarbeitet und nicht dauerhaft gespeichert. Es werden keine Standortverlaufsprofile erstellt.
                    </p>
                    <p>
                      <strong style={{ color: INK }}>Push-Benachrichtigungs-Token:</strong> Werden nur so
                      lange gespeichert, wie Push-Benachrichtigungen aktiviert sind. Ein Widerruf der
                      Berechtigung führt zur sofortigen Löschung.
                    </p>
                    <p>
                      <strong style={{ color: INK }}>Crash- und Analyse-Daten:</strong> Werden von Firebase
                      anonymisiert gespeichert und nach 90 Tagen automatisch gelöscht.
                    </p>
                  </div>
                </section>

                {/* Betroffenenrechte */}
                <section>
                  <h2 className="font-serif text-2xl mb-4" style={{ color: INK }}>
                    Ihre Rechte nach DSGVO
                  </h2>
                  <div
                    className="p-6 rounded-2xl"
                    style={{ background: `${TERRACOTTA}10`, border: `1px solid ${TERRACOTTA}22` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="w-5 h-5" style={{ color: TERRACOTTA }} />
                      <p className="font-medium" style={{ color: INK }}>Ihre Datenrechte</p>
                    </div>
                    <ul className="space-y-2 text-sm" style={{ color: INK_SOFT }}>
                      {[
                        'Recht auf Auskunft (Art. 15 DSGVO) - Sie können anfragen, welche Daten wir über Sie verarbeiten',
                        'Recht auf Berichtigung (Art. 16 DSGVO)',
                        'Recht auf Löschung (Art. 17 DSGVO) - "Recht auf Vergessenwerden"',
                        'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)',
                        'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)',
                        'Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)',
                        'Recht auf Beschwerde bei der Datenschutzbehörde (Österreich: dsb.gv.at)',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: TERRACOTTA }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm mt-4" style={{ color: INK_SOFT }}>
                      Da StradaHub <strong style={{ color: INK }}>keine personenbezogenen Daten</strong> erhebt oder
                      speichert, können diese Rechte in der Praxis nur in begrenztem Umfang Anwendung finden.
                      Wir helfen Ihnen dennoch gerne bei Ihren Anfragen.
                    </p>
                  </div>
                </section>

                {/* Kinder */}
                <section>
                  <h2 className="font-serif text-2xl mb-4" style={{ color: INK }}>
                    Kinder und Jugendliche
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: INK_SOFT }}>
                    StradaHub richtet sich an alle Verkehrsteilnehmerinnen und Verkehrsteilnehmer.
                    Die App erhebt keine personenbezogenen Daten und ist daher auch für Minderjährige
                    unbedenklich. Eltern und Erziehungsberechtigte können sicher sein, dass keine
                    Daten ihres Kindes verarbeitet werden.
                  </p>
                </section>

                {/* Änderungen */}
                <section>
                  <h2 className="font-serif text-2xl mb-4" style={{ color: INK }}>
                    Änderungen dieser Datenschutzerklärung
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: INK_SOFT }}>
                    Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren.
                    Änderungen werden auf dieser Seite veröffentlicht. Wir empfehlen, die Erklärung
                    regelmäßig zu überprüfen. Das Datum der letzten Aktivierung finden Sie unten.
                  </p>
                </section>

                {/* Kontakt */}
                <section>
                  <h2 className="font-serif text-2xl mb-4" style={{ color: INK }}>
                    Kontakt
                  </h2>
                  <p className="text-sm" style={{ color: INK_SOFT }}>
                    Bei Fragen zum Datenschutz wenden Sie sich bitte an:<br />
                    <a
                      href="mailto:info@awen28.com"
                      className="underline hover:no-underline font-medium"
                      style={{ color: TERRACOTTA }}
                    >
                      info@awen28.com
                    </a>
                  </p>
                </section>

                {/* Last updated */}
                <section>
                  <p
                    className="text-xs text-center pt-8 border-t"
                    style={{
                      color: 'rgba(74, 64, 56, 0.35)',
                      borderColor: 'rgba(74, 64, 56, 0.08)',
                    }}
                  >
                    Stand: September 2026
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
              style={{ color: 'rgba(74, 64, 56, 0.35)' }}
            >
              <Link to="/stradahub" className="hover:opacity-70 transition-opacity">Zurück zu StradaHub</Link>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="py-12 px-6 md:px-8"
          style={{
            background: CREAM_DEEP,
            borderTop: '1px solid rgba(74, 64, 56, 0.06)',
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C49070, #E8D3C4)' }}
              >
                <MapPinIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-2xl" style={{ color: INK }}>StradaHub</span>
            </div>
            <p className="text-sm" style={{ color: INK_SOFT }}>
              © 2026 StradaHub. A product by Elior.
            </p>
            <Link
              to="/"
              className="flex items-center gap-2 text-sm"
              style={{ color: TERRACOTTA }}
            >
              Visit Elior
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default StradaHubPrivacy;
