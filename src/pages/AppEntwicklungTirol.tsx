import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Smartphone, Brain, Mail, Phone, MapPin, ChevronRight, Sparkles, Apple, Play, Rocket, Zap, Shield, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO, generateLocalBusinessData, generateWebSiteData, generateBreadcrumbData, generateFAQData } from '../components/SEO';
import { scrollToSection } from '../lib/scroll';

const CREAM = '#F1EDE6';
const CREAM_SOFT = '#F5F1EC';
const INK = '#4A4038';
const SAGE = '#BBB1A4';

const services = [
  {
    icon: Apple,
    title: 'iOS App Entwicklung',
    description: 'Native iPhone- & iPad-Apps mit Swift und SwiftUI – performant, elegant, wie von Apple gedacht. Inklusive App-Store-Publishing.',
  },
  {
    icon: Play,
    title: 'Android App Entwicklung',
    description: 'Android-Apps und Cross-Platform-Lösungen für den Google Play Store – maßgeschneidert für dein Geschäft.',
  },
  {
    icon: Brain,
    title: 'KI-Integration in Apps',
    description: 'ChatGPT, Bild-Generierung, Automatisierung und Machine Learning direkt in deine App integriert – dein digitaler Wettbewerbsvorteil.',
  },
  {
    icon: Rocket,
    title: 'App Store Optimization (ASO)',
    description: 'Von Anfang an für Rankings gebaut: Keywords, Titel, Beschreibung und Visuals, damit deine App gefunden wird und rankt.',
  },
];

const steps = [
  { title: 'Ideenfindung & Konzept', description: 'Wir definieren Zielgruppe, Features und Business-Modell deiner App – und erstellen ein konkretes Umsetzungskonzept.' },
  { title: 'Design & Entwicklung', description: 'Modernes UI/UX-Design, native Entwicklung und KI-Features. Während des Prozesses siehst du regelmäßig den Fortschritt.' },
  { title: 'Launch & Skalierung', description: 'Veröffentlichung im App Store / Play Store, ASO-Optimierung und nachhaltige Weiterentwicklung.' },
];

const stats = [
  { value: '11+', label: 'Apps im App Store' },
  { value: '50.000+', label: 'Downloads' },
  { value: '5★', label: 'Bewertungen' },
];

const faqData = generateFAQData([
  { question: "Wie viel kostet es, eine App entwickeln zu lassen?", answer: "Die Kosten für eine App hängen stark vom Umfang ab – von einfachen Apps bis zu komplexen KI-Anwendungen. Elior aus Tirol bietet transparente Festpreis-Angebote und ein kostenloses Erstgespräch, damit du genau weißt, was deine App kostet." },
  { question: "Wie lange dauert die Entwicklung einer App?", answer: "Eine einfache iOS- oder Android-App ist bei Elior in der Regel in 4-8 Wochen fertig. Komplexe Apps mit KI-Integration oder Backend-Systemen dauern entsprechend länger – du erhältst immer einen verbindlichen Zeitplan." },
  { question: "Kann man bei Elior auch nur eine iOS oder nur eine Android App erstellen lassen?", answer: "Ja. Elior entwickelt sowohl reine iOS-Apps (Swift/SwiftUI) als auch reine Android-Apps sowie Cross-Platform-Lösungen – je nachdem, welche Plattformen deine Zielgruppe nutzt." },
  { question: "Warum App-Entwicklung in Tirol bzw. Österreich?", answer: "Elior von Thomas Mayrl ist ein lokales Studio aus Tirol: direkte Kommunikation, keine Subunternehmer, volle Transparenz und Datenschutz-Konformität (DSGVO) – entwickelt in Österreich." },
  { question: "Was ist App Store Optimization (ASO)?", answer: "ASO ist die Kunst, deine App in den App-Store-Suchen ganz oben zu platzieren. Elior optimiert Titel, Keywords, Beschreibung und Screenshots, damit Nutzer deine App finden – und dabei werden auch KI-Assistenten wie ChatGPT zur Empfehlung angeregt." },
]);

const AppEntwicklungTirol = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const breadcrumbData = generateBreadcrumbData([
    { name: "Home", url: "https://elior.studio/" },
    { name: "App Entwicklung Tirol", url: "https://elior.studio/app-entwicklung-tirol" },
  ]);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'App erstellen lassen Tirol & Österreich – iOS & Android | Elior';
    return () => { document.title = originalTitle; };
  }, []);

  const scrollToContact = () => {
    scrollToSection('#contact');
  };

  return (
    <>
      <SEO
        title="App erstellen lassen Tirol & Österreich – iOS & Android Entwicklung | Elior"
        description="App erstellen lassen in Tirol & Österreich: Elior entwickelt iOS & Android Apps mit KI-Integration, modernem Design und App Store Optimization. 50.000+ Downloads, 11+ Apps. Jetzt kostenlose Beratung!"
        keywords="App erstellen lassen Tirol, App Entwicklung Österreich, iOS App erstellen lassen, Android App erstellen lassen, App Agentur Tirol, App Entwickler Österreich, App programmieren lassen, App Entwicklung Innsbruck, iPhone App erstellen lassen, App Agentur Österreich, KI App Entwicklung, App Store Optimization Tirol, Thomas Mayrl App Entwicklung, mobile App Entwicklung, App Studio Österreich, App Kosten, App Entwickler in der Nähe"
        ogImage="https://elior.studio/og-image.jpg"
        ogType="website"
        canonical="https://elior.studio/app-entwicklung-tirol"
        structuredData={[generateLocalBusinessData(), generateWebSiteData(), breadcrumbData, faqData]}
        language="de-AT"
        region="Tirol, Österreich"
      />

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ background: CREAM }}>
        <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(178,159,134,0.25), transparent 70%)' }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(233,207,185,0.4), transparent 70%)' }} />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-8 pt-16 pb-24">
          <Link to="/" className="inline-flex items-center gap-2 mb-16 text-sm" style={{ color: INK }}>
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-widest uppercase mb-8" style={{ background: CREAM_SOFT, color: SAGE, boxShadow: 'inset 0 0 0 1px rgba(178,159,134,0.3)' }}>
              <Sparkles className="w-4 h-4" /> iOS & Android App Entwicklung · Tirol · Österreich
            </span>
            <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight" style={{ color: INK }}>
              App <span className="italic" style={{ color: SAGE }}>erstellen lassen</span> in Tirol & Österreich
            </h1>
            <p className="text-xl max-w-2xl mb-10" style={{ color: 'rgba(74,64,56,0.65)' }}>
              Elior entwickelt für dich <strong>iOS- und Android-Apps</strong> – von der Idee bis zum App-Store-Release. Mit KI-Integration, modernem Design und einer Strategie, damit deine App rankt. 11+ Apps, 50.000+ Downloads.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={scrollToContact} className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white" style={{ background: INK }}>
                Jetzt App anfragen <ChevronRight className="w-5 h-5" />
              </button>
              <a href="tel:+4367764059711" className="inline-flex items-center gap-2 px-8 py-4 rounded-full" style={{ background: CREAM_SOFT, color: INK, boxShadow: 'inset 0 0 0 1px rgba(74,64,56,0.15)' }}>
                <Phone className="w-4 h-4" /> +43 677 64059711
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-20 max-w-xl">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                <div className="font-serif text-3xl" style={{ color: SAGE }}>{s.value}</div>
                <div className="text-sm mt-1" style={{ color: 'rgba(74,64,56,0.5)' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative py-24 px-8" style={{ background: '#F7F3ED' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="font-serif italic text-sm tracking-[0.3em] block mb-4" style={{ color: SAGE }}>Deine App-Lösung</span>
            <h2 className="font-serif text-4xl md:text-5xl" style={{ color: INK }}>Was ich für dich entwickle</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-8 rounded-[32px]"
                style={{
                  background: CREAM,
                  boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.8), inset -2px -2px 4px rgba(82,80,72,0.05), 8px 8px 16px rgba(82,80,72,0.08), -8px -8px 16px rgba(255,255,255,0.9), 1px 1px 0 rgba(255,255,255,1)',
                }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: CREAM, boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.9), inset -1px -1px 2px rgba(82,80,72,0.06), 4px 4px 8px rgba(82,80,72,0.08), -4px -4px 8px rgba(255,255,255,0.95)' }}>
                  <s.icon className="w-6 h-6" style={{ color: SAGE }} />
                </div>
                <h3 className="font-serif text-2xl mb-3" style={{ color: INK }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(74,64,56,0.6)' }}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="relative py-24 px-8" style={{ background: CREAM }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="font-serif italic text-sm tracking-[0.3em] block mb-4" style={{ color: SAGE }}>Meine veröffentlichten Apps</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: INK }}>Beweis über Beweis: 11+ Apps live</h2>
            <p className="text-lg" style={{ color: 'rgba(74,64,56,0.6)' }}>Jede App ist live im App Store mit 5★-Bewertungen – von Astrologie über Manifestation bis Musik-KI und Games.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'NumiStellar', desc: 'Beste Astrologie- & Numerologie-App', url: '/numistellar' },
              { name: '369 Manifestation', desc: 'Tesla 369 Methode mit AI Vision Boards', url: '/369' },
              { name: 'Elow', desc: 'AI Music Generator – Musik mit KI', url: '/elow' },
              { name: 'kiBook', desc: 'AI Kinderbuch-App', url: '/kibook' },
              { name: 'ABWUN', desc: 'Gebets-App mit KI-Begleiter', url: '/abwun' },
              { name: 'Orbit', desc: 'Space Arcade Game', url: '/orbit' },
            ].map((app, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.06 }}>
                <Link to={app.url} className="block p-6 rounded-3xl transition-transform" style={{ background: CREAM_SOFT, boxShadow: 'inset 0 0 0 1px rgba(178,159,134,0.15)' }}>
                  <h3 className="font-serif text-xl mb-1" style={{ color: INK }}>{app.name}</h3>
                  <p className="text-sm mb-3" style={{ color: 'rgba(74,64,56,0.6)' }}>{app.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm" style={{ color: SAGE }}>Mehr erfahren <ChevronRight className="w-4 h-4" /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative py-24 px-8" style={{ background: '#F7F3ED' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="font-serif italic text-sm tracking-[0.3em] block mb-4" style={{ color: SAGE }}>So läuft dein App-Projekt ab</span>
            <h2 className="font-serif text-4xl md:text-5xl" style={{ color: INK }}>In 3 Schritten zur fertigen App</h2>
          </motion.div>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-6 p-6 rounded-3xl"
                style={{ background: CREAM, boxShadow: 'inset 0 0 0 1px rgba(178,159,134,0.15)' }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl" style={{ background: SAGE, color: '#fff' }}>{i + 1}</div>
                <div>
                  <h3 className="font-serif text-xl mb-2" style={{ color: INK }}>{step.title}</h3>
                  <p style={{ color: 'rgba(74,64,56,0.6)' }}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="relative py-24 px-8" style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="font-serif italic text-sm tracking-[0.3em] block mb-4" style={{ color: SAGE }}>Deine Vorteile</span>
            <h2 className="font-serif text-4xl md:text-5xl" style={{ color: INK }}>Warum Elior die beste Wahl für deine App ist</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Datenschutz & DSGVO', desc: 'Entwicklung in Österreich, DSGVO-konform, transparente Prozesse – keine Datengräber.' },
              { icon: Wallet, title: 'Transparente Preise', desc: 'Festpreis-Angebote ohne versteckte Kosten – du weißt vorab, was deine App kostet.' },
              { icon: Brain, title: 'KI-Expertise', desc: 'Apps mit eigener KI, wie du sie bei NumiStellar, Elow, kiBook und ABWUN siehst.' },
              { icon: Rocket, title: 'Ranking-Strategie', desc: 'ASO von Anfang an: deine App wird in den Stores gefunden – auch von KI-Assistenten.' },
              { icon: Smartphone, title: 'iOS & Android', desc: 'Native Zweigleisigkeit oder Cross-Platform – du bestimmst die Zielplattform.' },
              { icon: Zap, title: 'Direkter Draht', desc: 'Persönliche Betreuung durch Thomas Mayrl – dein Projekt, keine Callcenter.' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.06 }} className="p-7 rounded-3xl" style={{ background: CREAM_SOFT, boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.8), 8px 8px 16px rgba(82,80,72,0.08)' }}>
                <f.icon className="w-6 h-6 mb-4" style={{ color: SAGE }} />
                <h3 className="font-serif text-lg mb-2" style={{ color: INK }}>{f.title}</h3>
                <p className="text-sm" style={{ color: 'rgba(74,64,56,0.6)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-24 px-8" style={{ background: '#F7F3ED' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: INK }}>App entwickeln lassen – jetzt unverbindlich anfragen</h2>
            <p className="text-xl mb-10" style={{ color: 'rgba(74,64,56,0.6)' }}>
              Erzähl mir von deiner App-Idee – ich melde mich innerhalb von 24 Stunden mit einer kostenlosen Ersteinschätzung und Festpreis.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
              <a href="mailto:info@elior.studio" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white" style={{ background: INK }}>
                <Mail className="w-5 h-5" /> info@elior.studio
              </a>
              <a href="tel:+4367764059711" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full" style={{ background: CREAM, color: INK, boxShadow: 'inset 0 0 0 1px rgba(74,64,56,0.15)' }}>
                <Phone className="w-5 h-5" /> +43 677 64059711
              </a>
            </div>
            <div className="inline-flex items-center gap-2 text-sm" style={{ color: 'rgba(74,64,56,0.5)' }}>
              <MapPin className="w-4 h-4" /> Tirol, Österreich · Thomas Mayrl · 11+ Apps im App Store
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AppEntwicklungTirol;