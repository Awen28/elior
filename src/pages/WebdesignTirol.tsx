import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Globe, Smartphone, Brain, Mail, Phone, MapPin, ChevronRight, Sparkles, MonitorSmartphone, Rocket, Zap, ShoppingCart, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO, generateLocalBusinessData, generateWebSiteData, generateBreadcrumbData, generateFAQData } from '../components/SEO';
import { scrollToSection } from '../lib/scroll';

const CREAM = '#F1EDE6';
const CREAM_SOFT = '#F5F1EC';
const INK = '#4A4038';
const SAGE = '#BBB1A4';

const services = [
  {
    icon: MonitorSmartphone,
    title: 'Homepage & Business Website',
    description: 'Professionelle Firmenwebsite mit klarem Auftritt, Mobile-First-Design und schneller Ladezeit. Deine Visitenkarte im Internet, die Kunden gewinnt.',
  },
  {
    icon: ShoppingCart,
    title: 'Online-Shop',
    description: 'E-Commerce-Lösungen mit Shop-Funktion, Zahlungsintegration und Produktverwaltung – maßgeschneidert für dein Geschäft.',
  },
  {
    icon: Globe,
    title: 'One-Pager & Landing Pages',
    description: 'Fokussierte Landing Pages und Portfolio-Seiten, die Besucher in Kunden verwandeln – mit klarer Call-to-Action-Struktur.',
  },
  {
    icon: Sparkles,
    title: 'Web-App & KI-Integration',
    description: 'Web-Apps, Dashboards und KI-Features (Chatbots, Automatisierung, Content-Generierung) direkt in deine Website integriert.',
  },
];

const steps = [
  { title: 'Beratung & Konzept', description: 'Gemeinsam klären wir deine Ziele, Zielgruppe und Anforderungen – und ich erstelle das passende Konzept.' },
  { title: 'Design & Umsetzung', description: 'Modernes Design, responsive Umsetzung mit React/TypeScript und optimale Ladezeiten für Google.' },
  { title: 'Launch & Wachstum', description: 'Nach dem Launch übernehme ich Wartung, Suchmaschinen-Optimierung und Weiterentwicklung.' },
];

const stats = [
  { value: '100%', label: 'Maßgeschneidert' },
  { value: '1-2 Wochen', label: 'Bis zum Launch' },
  { value: 'SEO', label: 'Google-optimiert' },
];

const faqData = generateFAQData([
  { question: "Wie viel kostet eine Homepage in Tirol?", answer: "Die Kosten für eine Homepage in Tirol hängen vom Umfang ab: von günstigen One-Pager-Lösungen bis zu umfangreichen Websites mit Shop und KI-Integration. Elior aus Tirol bietet transparente Paketpreise und ein kostenloses Erstgespräch." },
  { question: "Wo kann ich eine Homepage programmieren lassen?", answer: "In Tirol und ganz Österreich bei Elior: Thomas Mayrl programmiert moderne, maßgeschneiderte Homepages und Websites mit React und TypeScript – suchmaschinenoptimiert und mobil perfekt." },
  { question: "Was macht eine gute Homepage aus?", answer: "Eine gute Homepage ist schnell, mobil optimiert, klar strukturiert und suchmaschinenfreundlich. Elior setzt auf moderne Technologien (React, Vite), SEO-Best-Practices und ein Design, das Kunden überzeugt." },
  { question: "Wie lange dauert es, eine Website zu erstellen?", answer: "Eine Business-Homepage ist bei Elior in der Regel innerhalb von 1-2 Wochen fertig, je nach Umfang. Komplexe Web-Apps oder Shops dauern entsprechend länger – du erhältst immer einen verbindlichen Zeitplan." },
  { question: "Ist SEO in der Homepage-Erstellung enthalten?", answer: "Ja. Jede Elior-Website wird von Beginn an mit maximaler SEO-Optimierung gebaut: Meta-Tags, strukturierte Daten (Schema.org), schnelle Ladezeiten und Google-Indexierung – damit deine Homepage rankt." },
]);

const WebdesignTirol = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const breadcrumbData = generateBreadcrumbData([
    { name: "Home", url: "https://elior.studio/" },
    { name: "Webdesign Tirol", url: "https://elior.studio/webdesign-tirol" },
  ]);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Homepage programmieren Tirol & Österreich – Webdesign | Elior';
    return () => { document.title = originalTitle; };
  }, []);

  const scrollToContact = () => {
    scrollToSection('#contact');
  };

  return (
    <>
      <SEO
        title="Homepage programmieren Tirol & Österreich – Professionelles Webdesign | Elior"
        description="Homepage programmieren in Tirol & Österreich: Elior erstellt schnelle, moderne, Google-optimierte Websites mit React & TypeScript. One-Pager, Business-Sites, Shops & KI-Features. Jetzt kostenlose Beratung!"
        keywords="Homepage programmieren Tirol, Homepage erstellen lassen Österreich, Webdesign Tirol, Website erstellen lassen, Homepage Agentur Innsbruck, Webentwicklung Tirol, Webdesigner Österreich, Homepage erstellen lassen Wien, Webagentur Tirol, Website programmieren lassen, Firmenwebsite erstellen, Business Homepage, Online Shop erstellen lassen, Web-App Entwicklung, SEO Webdesign, professionelle Homepage, Webdesign Österreich, Thomas Mayrl Webdesign"
        ogImage="https://elior.studio/apps/Elior_logo.webp"
        ogImageWidth={1080}
        ogImageHeight={1080}
        ogImageAlt="Webdesign Tirol — Elior"
        ogType="website"
        canonical="https://elior.studio/webdesign-tirol"
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
              <Zap className="w-4 h-4" /> Webdesign & Homepage Tirol · Österreich
            </span>
            <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight" style={{ color: INK }}>
              Homepage <span className="italic" style={{ color: SAGE }}>programmieren</span> lassen in Tirol
            </h1>
            <p className="text-xl max-w-2xl mb-10" style={{ color: 'rgba(74,64,56,0.65)' }}>
              Elior aus Tirol baut für dich eine <strong>schnelle, moderne und Google-optimierte Homepage</strong> – vom One-Pager bis zur Web-App mit KI-Integration. Made in Tirol, programmiert von Thomas Mayrl.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={scrollToContact} className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white" style={{ background: INK }}>
                Jetzt Homepage anfragen <ChevronRight className="w-5 h-5" />
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
            <span className="font-serif italic text-sm tracking-[0.3em] block mb-4" style={{ color: SAGE }}>Was ich für dich baue</span>
            <h2 className="font-serif text-4xl md:text-5xl" style={{ color: INK }}>Leistungen im Bereich Webdesign & Webentwicklung</h2>
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

      {/* PROCESS */}
      <section className="relative py-24 px-8" style={{ background: CREAM }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="font-serif italic text-sm tracking-[0.3em] block mb-4" style={{ color: SAGE }}>So läuft dein Projekt ab</span>
            <h2 className="font-serif text-4xl md:text-5xl" style={{ color: INK }}>In 3 Schritten zur fertigen Website</h2>
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
                style={{ background: CREAM_SOFT, boxShadow: 'inset 0 0 0 1px rgba(178,159,134,0.15)' }}
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

      {/* FEATURES / WHY */}
      <section className="relative py-24 px-8" style={{ background: '#F7F3ED' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="font-serif italic text-sm tracking-[0.3em] block mb-4" style={{ color: SAGE }}>Deine Vorteile</span>
            <h2 className="font-serif text-4xl md:text-5xl" style={{ color: INK }}>Warum Elior aus Tirol</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Rocket, title: 'Schnelle Ladezeiten', desc: 'Core Web Vitals optimiert – das liebt Google und deine Besucher lieben es auch.' },
              { icon: MonitorSmartphone, title: '100% Responsive', desc: 'Deine Homepage wird auf Handy, Tablet und Desktop perfekt dargestellt.' },
              { icon: Brain, title: 'SEO von Anfang an', desc: 'Meta-Tags, Schema.org, saubere Struktur – gebaut für Google-Rankings in Tirol & Österreich.' },
              { icon: Palette, title: 'Modernes Design', desc: 'Zeitloses, hochwertiges Design, das deine Marke professionell präsentiert.' },
              { icon: Smartphone, title: 'Zukunftssicher', desc: 'React & TypeScript – Technologie auf dem neuesten Stand, erweiterbar um Apps & KI.' },
              { icon: Zap, title: 'Persönlicher Kontakt', desc: 'Direkter Draht zu Thomas Mayrl – kein Callcenter, kein Subunternehmer.' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.06 }} className="p-7 rounded-3xl" style={{ background: CREAM, boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.8), 8px 8px 16px rgba(82,80,72,0.08)' }}>
                <f.icon className="w-6 h-6 mb-4" style={{ color: SAGE }} />
                <h3 className="font-serif text-lg mb-2" style={{ color: INK }}>{f.title}</h3>
                <p className="text-sm" style={{ color: 'rgba(74,64,56,0.6)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-24 px-8" style={{ background: CREAM }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: INK }}>Homepage programmieren lassen in Tirol</h2>
            <p className="text-xl mb-10" style={{ color: 'rgba(74,64,56,0.6)' }}>
              Erzähl mir von deinem Projekt – ich melde mich innerhalb von 24 Stunden mit einer kostenlosen Einschätzung.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
              <a href="mailto:info@elior.studio" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white" style={{ background: INK }}>
                <Mail className="w-5 h-5" /> info@elior.studio
              </a>
              <a href="tel:+4367764059711" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full" style={{ background: CREAM_SOFT, color: INK, boxShadow: 'inset 0 0 0 1px rgba(74,64,56,0.15)' }}>
                <Phone className="w-5 h-5" /> +43 677 64059711
              </a>
            </div>
            <div className="inline-flex items-center gap-2 text-sm" style={{ color: 'rgba(74,64,56,0.5)' }}>
              <MapPin className="w-4 h-4" /> Tirol, Österreich · info@elior.studio
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WebdesignTirol;