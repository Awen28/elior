import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Apple, Brain, Play, Rocket, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO, generateLocalBusinessData, generateWebSiteData, generateBreadcrumbData, generateFAQData } from '../components/SEO';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import { scrollToSection } from '../lib/scroll';

const PAPER = '#F5F1EA';
const PAPER_DEEP = '#EDE8DD';
const INK = '#525342';
const OCHRE = '#C9A97B';

const services = [
  {
    icon: Apple,
    title: 'iOS Apps',
    description: 'Native Apps mit Swift und SwiftUI – schnell, präzise und bis ins Detail gestaltet.',
  },
  {
    icon: Play,
    title: 'Android Apps',
    description: 'Android- und Cross-Platform-Lösungen, die auf jedem Gerät selbstverständlich funktionieren.',
  },
  {
    icon: Brain,
    title: 'KI & Automatisierung',
    description: 'KI-Funktionen und API-Anbindungen, die Abläufe vereinfachen – ohne technisches Brimborium.',
  },
  {
    icon: Rocket,
    title: 'Launch & ASO',
    description: 'App-Store-Veröffentlichung, klare Metadaten und eine Optimierung, die deine App auffindbar macht.',
  },
];

const apps = [
  { name: 'ABWUN', tag: 'Manifestation', image: '/apps/Abwun_home.webp', route: '/abwun' },
  { name: 'StradaHub', tag: 'Community', image: '/apps/stradaHub_show_control.webp', route: '/stradahub' },
  { name: '369', tag: 'Ritual', image: '/apps/369_Homescreen.webp', route: '/369' },
];

const steps = [
  { title: 'Idee', text: 'Wir schärfen, was die App wirklich lösen soll – und für wen.' },
  { title: 'Design & Bau', text: 'Elior gestaltet die Oberfläche und entwickelt die App Schritt für Schritt.' },
  { title: 'Launch', text: 'Veröffentlichung, Feinschliff und eine klare Strategie für die ersten Nutzer.' },
];

const faqData = generateFAQData([
  {
    question: 'Wie läuft die Entwicklung einer App bei Elior ab?',
    answer: 'Von der ersten Idee bis zum Launch begleitet Elior den gesamten Prozess: Konzept, Design, Entwicklung und Veröffentlichung im App Store oder Play Store.',
  },
  {
    question: 'Entwickelt Elior native Apps oder Cross-Platform?',
    answer: 'Beides. Elior entwickelt native iOS- und Android-Apps sowie Cross-Platform-Lösungen – abhängig davon, was für dein Produkt und deine Zielgruppe sinnvoll ist.',
  },
  {
    question: 'Kann Elior KI-Funktionen in eine App integrieren?',
    answer: 'Ja. Elior integriert KI-Funktionen, Automatisierungen und API-Schnittstellen, wenn sie einen echten Mehrwert für Nutzer schaffen.',
  },
  {
    question: 'Übernimmt Elior auch die Veröffentlichung im App Store?',
    answer: 'Ja. Elior begleitet die Einreichung, bereitet die App-Store-Seite vor und optimiert Titel, Beschreibung und Bilder für die Auffindbarkeit.',
  },
]);

const AppEntwicklungTirol = () => {
  const breadcrumbData = generateBreadcrumbData([
    { name: 'Home', url: 'https://elior.studio/' },
    { name: 'App Entwicklung', url: 'https://elior.studio/app-entwicklung' },
  ]);

  return (
    <>
      <SEO
        title="App Entwicklung für iOS & Android | Elior"
        description="Elior entwickelt iOS- und Android-Apps – von der Idee über Design und Entwicklung bis zum App-Store-Launch. Mit KI-Integration und Automatisierung."
        keywords="App Entwicklung, iOS App, Android App, App erstellen lassen, Cross-Platform, App Store, KI-Integration, Automatisierung, Elior"
        ogImage="https://elior.studio/apps/Elior_logo.webp"
        ogImageWidth={1080}
        ogImageHeight={1080}
        ogImageAlt="App Entwicklung für iOS und Android — Elior"
        ogType="website"
        canonical="https://elior.studio/app-entwicklung"
        structuredData={[generateLocalBusinessData(), generateWebSiteData(), breadcrumbData, faqData]}
        language="de-AT"
        region="Österreich"
      />

      <main style={{ background: PAPER }}>
        {/* HERO */}
        <section className="relative overflow-hidden pt-32 md:pt-40 pb-24 px-8">
          <div className="grain absolute inset-0 pointer-events-none" aria-hidden />
          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-16 lg:gap-20 items-center">
            <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <span className="eyebrow block mb-7" style={{ color: INK }}>App Entwicklung</span>
              <h1 className="font-serif leading-[0.98] mb-8" style={{ color: INK, fontSize: 'clamp(3.2rem, 7vw, 6.4rem)' }}>
                Apps,
                <br />
                die man <span className="italic" style={{ color: '#9A7A50' }}>behält.</span>
              </h1>
              <p className="font-sans font-light text-lg md:text-xl leading-relaxed max-w-xl mb-10" style={{ color: 'rgba(82,83,66,0.88)' }}>
                Elior entwickelt iOS- und Android-Apps, die sich selbstverständlich anfühlen – von der ersten Idee bis zum Launch. Mit KI-Integration und Automatisierung, wo sie wirklich nützt.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-sans text-sm tracking-wide"
                  style={{ background: INK, color: PAPER, boxShadow: '0 18px 36px -20px rgba(60,50,38,0.7)' }}
                >
                  App anfragen <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('#work')}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-sans text-sm tracking-wide"
                  style={{ color: INK, boxShadow: 'inset 0 0 0 1px rgba(82,83,66,0.25)' }}
                >
                  Apps ansehen
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-14 max-w-md">
                {[
                  { value: '11+', label: 'Apps im Store' },
                  { value: '50k+', label: 'Downloads' },
                  { value: '5★', label: 'Bewertungen' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-serif text-3xl" style={{ color: INK }}>{stat.value}</div>
                    <div className="font-sans text-[0.62rem] tracking-[0.16em] uppercase mt-1" style={{ color: 'rgba(82,83,66,0.8)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[380px] md:h-[500px]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/apps/Abwun_home-hero.webp"
                  alt="ABWUN App von Elior"
                  className="absolute w-[30%] max-w-[180px] rounded-[1.6rem] object-contain aspect-[9/16]"
                  style={{ transform: 'translateX(-118%) translateY(26px) rotate(-4deg)', filter: 'drop-shadow(0 22px 24px rgba(60,50,38,0.22))' }}
                />
                <img
                  src="/apps/369_Homescreen-hero.webp"
                  alt="369 App von Elior"
                  className="absolute w-[36%] max-w-[215px] rounded-[1.8rem] object-contain aspect-[9/16] z-10"
                  style={{ filter: 'drop-shadow(0 28px 30px rgba(60,50,38,0.26))' }}
                />
                <img
                  src="/apps/stradaHub_show_control-hero.webp"
                  alt="StradaHub App von Elior"
                  className="absolute w-[30%] max-w-[180px] rounded-[1.6rem] object-contain aspect-[9/16]"
                  style={{ transform: 'translateX(118%) translateY(26px) rotate(4deg)', filter: 'drop-shadow(0 22px 24px rgba(60,50,38,0.22))' }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-24 px-8" style={{ background: PAPER_DEEP }}>
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-14">
              <span className="eyebrow block mb-5" style={{ color: INK }}>Leistungen</span>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: INK }}>
                Was Elior für dich entwickelt.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-7 rounded-3xl"
                  style={{ background: PAPER, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 18px 40px -30px rgba(60,50,38,0.4)' }}
                >
                  <service.icon className="w-5 h-5 mb-6" style={{ color: OCHRE }} />
                  <h3 className="font-serif text-xl mb-3" style={{ color: INK }}>{service.title}</h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(82,83,66,0.82)' }}>{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="py-24 px-8" style={{ background: PAPER }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
              <div>
                <span className="eyebrow block mb-5" style={{ color: INK }}>Aus dem Studio</span>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: INK }}>
                  Apps, die geblieben sind.
                </h2>
              </div>
              <p className="font-sans text-sm max-w-sm" style={{ color: 'rgba(82,83,66,0.8)' }}>
                Einige der Produkte, die Elior von der Idee bis in den App Store begleitet hat.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {apps.map((app, index) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: index * 0.07 }}
                >
                  <Link to={app.route} className="group block">
                    <div
                      className="relative overflow-hidden rounded-[24px] mb-4"
                      style={{ background: '#E3DCCF', boxShadow: '0 22px 50px -32px rgba(60,50,38,0.5)' }}
                    >
                      <img
                        src={app.image}
                        alt={`${app.name} — App von Elior`}
                        className="w-full aspect-[4/5] object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full font-sans text-[0.6rem] tracking-[0.16em] uppercase" style={{ background: 'rgba(245,241,234,0.88)', color: INK }}>
                        {app.tag}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl" style={{ color: INK }}>{app.name}</h3>
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: OCHRE }} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-24 px-8" style={{ background: '#525342' }}>
          <div className="max-w-6xl mx-auto">
            <span className="eyebrow block mb-5" style={{ color: '#EDE8DD' }}>So arbeiten wir</span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-14" style={{ color: '#EDE8DD' }}>
              Drei Schritte. Kein Umweg.
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {steps.map((step, index) => (
                <div key={step.title} className="border-t pt-6" style={{ borderColor: 'rgba(237,232,221,0.22)' }}>
                  <div className="font-serif text-2xl mb-4" style={{ color: OCHRE }}>0{index + 1}</div>
                  <h3 className="font-serif text-2xl mb-3" style={{ color: '#EDE8DD' }}>{step.title}</h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(237,232,221,0.82)' }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATEMENT */}
        <section className="py-28 px-8" style={{ background: PAPER }}>
          <div className="max-w-4xl mx-auto text-center">
            <span className="eyebrow block mb-7" style={{ color: INK }}>Haltung</span>
            <p className="font-serif italic leading-[1.15]" style={{ color: INK, fontSize: 'clamp(2rem, 4.2vw, 3.6rem)' }}>
              „Technik soll verschwinden. Was bleibt, ist das Gefühl.“
            </p>
            <div className="flex items-center justify-center gap-3 mt-10">
              <ShieldCheck className="w-4 h-4" style={{ color: OCHRE }} />
              <span className="font-sans text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(82,83,66,0.8)' }}>
                Gebaut in Österreich. Gedacht für alle.
              </span>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default AppEntwicklungTirol;
