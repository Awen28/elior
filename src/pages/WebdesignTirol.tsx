import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Globe, LayoutTemplate, ShoppingBag, Sparkles } from 'lucide-react';
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
    icon: LayoutTemplate,
    title: 'Websites & Homepages',
    description: 'Ein klarer Auftritt, der deine Arbeit zeigt – ohne Umwege. Konzept, Design und Entwicklung aus einer Hand.',
  },
  {
    icon: ShoppingBag,
    title: 'Online-Shops',
    description: 'Produkte, die man gern ansieht und einfach kauft. Ruhig gestaltet, sauber angebunden, schnell geladen.',
  },
  {
    icon: Globe,
    title: 'Landing Pages',
    description: 'Eine Seite, ein Ziel. Fokussiert auf das, was Besucher überzeugen soll – messbar und angenehm schnell.',
  },
  {
    icon: Sparkles,
    title: 'KI & Automatisierung',
    description: 'Sinnvolle KI-Funktionen und API-Anbindungen, die Abläufe vereinfachen – dort, wo sie echten Nutzen bringen.',
  },
];

const works = [
  { name: 'ABWUN', tag: 'App & Web', image: '/apps/Abwun_home.webp', route: '/abwun' },
  { name: 'StradaHub', tag: 'App & Brand', image: '/apps/stradaHub_show_control.webp', route: '/stradahub' },
  { name: '369', tag: 'App & Web', image: '/apps/369_Homescreen.webp', route: '/369' },
];

const steps = [
  { title: 'Verstehen', text: 'Wir klären, was du zeigst, wem du hilfst und was deine Seite leisten soll.' },
  { title: 'Gestalten', text: 'Elior entwirft eine ruhige, eigenständige Form – und entwickelt sie direkt im Browser.' },
  { title: 'Veröffentlichen', text: 'Sauber gebaut, schnell geladen, für Google vorbereitet. Danach bleibt Elior an deiner Seite.' },
];

const faqData = generateFAQData([
  {
    question: 'Wie läuft ein Website-Projekt bei Elior ab?',
    answer: 'Nach einem kurzen Erstgespräch klären wir Umfang und Ziele. Elior übernimmt Konzept, Design und Entwicklung – du siehst den Fortschritt laufend und bekommst eine fertige, schnelle Website.',
  },
  {
    question: 'Was kostet eine neue Website?',
    answer: 'Der Preis hängt vom Umfang ab: Ein One-Pager ist schneller umgesetzt als eine umfangreiche Website mit Shop oder KI-Funktionen. Elior nennt dir vorab einen transparenten Rahmen.',
  },
  {
    question: 'Kann Elior auch Texte, Bilder und KI-Funktionen übernehmen?',
    answer: 'Ja. Elior entwickelt die Inhalte mit dir, wählt passende Bilder und integriert auf Wunsch KI-Funktionen, Automatisierungen oder API-Anbindungen.',
  },
  {
    question: 'Ist die Website für Google optimiert?',
    answer: 'Ja. Jede Seite wird mit sauberer Struktur, schnellen Ladezeiten, strukturierten Daten und klaren Meta-Angaben gebaut – die Grundlage für gute Rankings.',
  },
]);

const WebdesignTirol = () => {
  const breadcrumbData = generateBreadcrumbData([
    { name: 'Home', url: 'https://elior.studio/' },
    { name: 'Webdesign', url: 'https://elior.studio/webdesign' },
  ]);

  return (
    <>
      <SEO
        title="Webdesign & Homepage Entwicklung | Elior"
        description="Elior gestaltet und entwickelt Websites, die schnell, klar und suchmaschinenfreundlich sind – vom One-Pager bis zur Web-App mit KI-Integration."
        keywords="Webdesign, Homepage erstellen lassen, Website Entwicklung, Web-App, Online-Shop, Landing Page, KI-Integration, Elior"
        ogImage="https://elior.studio/apps/Elior_logo.webp"
        ogImageWidth={1080}
        ogImageHeight={1080}
        ogImageAlt="Webdesign und Homepage Entwicklung — Elior"
        ogType="website"
        canonical="https://elior.studio/webdesign"
        structuredData={[generateLocalBusinessData(), generateWebSiteData(), breadcrumbData, faqData]}
        language="de-AT"
        region="Österreich"
      />

      <main style={{ background: PAPER }}>
        {/* HERO */}
        <section className="relative overflow-hidden pt-32 md:pt-40 pb-24 px-8">
          <div className="grain absolute inset-0 pointer-events-none" aria-hidden />
          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-24 items-center">
            <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <span className="eyebrow block mb-7" style={{ color: INK }}>Webdesign & Entwicklung</span>
              <h1 className="font-serif leading-[0.98] mb-8" style={{ color: INK, fontSize: 'clamp(3.2rem, 7vw, 6.4rem)' }}>
                Websites,
                <br />
                die <span className="italic" style={{ color: '#9A7A50' }}>bleiben.</span>
              </h1>
              <p className="font-sans font-light text-lg md:text-xl leading-relaxed max-w-xl mb-10" style={{ color: 'rgba(82,83,66,0.88)' }}>
                Elior gestaltet digitale Auftritte, die klar, schnell und angenehm sind. Vom One-Pager bis zur Web-App – mit KI-Integration, wo sie wirklich hilft.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-sans text-sm tracking-wide"
                  style={{ background: INK, color: PAPER, boxShadow: '0 18px 36px -20px rgba(60,50,38,0.7)' }}
                >
                  Projekt starten <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('#work')}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-sans text-sm tracking-wide"
                  style={{ color: INK, boxShadow: 'inset 0 0 0 1px rgba(82,83,66,0.25)' }}
                >
                  Arbeiten ansehen
                </button>
              </div>
              <p className="font-sans text-xs tracking-[0.18em] uppercase mt-10" style={{ color: 'rgba(82,83,66,0.8)' }}>
                Aus Tirol. Für Marken, die nicht laut sein müssen.
              </p>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                className="relative rounded-[26px] overflow-hidden"
                style={{
                  border: '1px solid rgba(255,255,255,0.55)',
                  boxShadow: '0 45px 90px -45px rgba(60,50,38,0.55), 0 8px 24px -18px rgba(60,50,38,0.35)',
                }}
              >
                <div className="flex items-center gap-2 px-5 py-3" style={{ background: '#E6DFD2' }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#C7B9A4' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#D4C8B5' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#E0D5C3' }} />
                  <span className="ml-3 font-sans text-[0.6rem] tracking-[0.18em] uppercase" style={{ color: 'rgba(82,83,66,0.8)' }}>
                    elior.studio
                  </span>
                </div>
                <div className="relative aspect-[4/3]">
                  <img
                    src="/world/world-hero.webp"
                    alt="Elior — digitale Oberfläche mit ruhiger Textur"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={1400}
                    height={583}
                    decoding="async"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(37,36,31,0.08) 0%, rgba(37,36,31,0.55) 100%)' }} />
                  <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
                    <span className="font-sans text-[0.65rem] tracking-[0.32em] uppercase" style={{ color: 'rgba(245,241,234,0.7)' }}>
                      Digital Studio
                    </span>
                    <div>
                      <p className="font-serif text-3xl md:text-4xl leading-tight mb-3" style={{ color: PAPER }}>
                        Built with meaning.
                      </p>
                      <p className="font-sans text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(245,241,234,0.62)' }}>
                        Websites · Apps · KI
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-7 -left-4 md:-left-8 px-5 py-4 rounded-2xl"
                style={{ background: PAPER, boxShadow: '0 18px 40px -22px rgba(60,50,38,0.5)', border: '1px solid rgba(255,255,255,0.7)' }}
              >
                <div className="font-serif text-2xl" style={{ color: INK }}>100</div>
                <div className="font-sans text-[0.6rem] tracking-[0.18em] uppercase" style={{ color: 'rgba(82,83,66,0.8)' }}>SEO Score</div>
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
                Was Elior für dich baut.
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
                <span className="eyebrow block mb-5" style={{ color: INK }}>Ausgewählte Arbeiten</span>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: INK }}>
                  Für sich sprechen lassen.
                </h2>
              </div>
              <p className="font-sans text-sm max-w-sm" style={{ color: 'rgba(82,83,66,0.8)' }}>
                Digitale Produkte, die Elior von der ersten Idee bis zur Veröffentlichung begleitet hat.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {works.map((work, index) => (
                <motion.div
                  key={work.name}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: index * 0.07 }}
                >
                  <Link to={work.route} className="group block">
                    <div
                      className="relative overflow-hidden rounded-[24px] mb-4"
                      style={{ background: '#E3DCCF', boxShadow: '0 22px 50px -32px rgba(60,50,38,0.5)' }}
                    >
                      <img
                        src={work.image}
                        alt={`${work.name} — Projekt von Elior`}
                        className="w-full aspect-[4/5] object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full font-sans text-[0.6rem] tracking-[0.16em] uppercase" style={{ background: 'rgba(245,241,234,0.88)', color: INK }}>
                        {work.tag}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl" style={{ color: INK }}>{work.name}</h3>
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
              „Gute Websites erklären nicht alles. Sie lassen das Wesentliche erkennen.“
            </p>
            <div className="flex items-center justify-center gap-3 mt-10">
              <Check className="w-4 h-4" style={{ color: OCHRE }} />
              <span className="font-sans text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(82,83,66,0.8)' }}>
                Ruhig. Schnell. Für dich gebaut.
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

export default WebdesignTirol;
