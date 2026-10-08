import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Sparkles, MapPin, MessageCircle, Sun, Star, ChevronRight, Download, Calendar, Eye, Compass } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO, generateAppStructuredData, generateBreadcrumbData, generateFAQData } from '../components/SEO';

// New warm color palette matching the app redesign
const colors = {
  bg: '#F5F0E8',
  bgDark: '#EDE6D8',
  accent: '#C4785A',
  accentLight: '#D4917A',
  accentDark: '#B86B4D',
  text: '#3D3229',
  textLight: '#6B5D4F',
  textMuted: '#9B8E7E',
  card: '#FFFFFF',
  cream: '#FAF7F2',
};

const features = [
  {
    icon: MessageCircle,
    title: 'Energy Chat',
    description: 'Ask your higher self anything. AI combines astrology, numerology, and cosmic energy for personalized guidance with best-case, worst-case, and DOs/DONTs.',
  },
  {
    icon: Sparkles,
    title: 'Angel Numbers',
    description: 'Interpret angel numbers and their spiritual meanings. Discover what the universe is trying to tell you through recurring number patterns.',
  },
  {
    icon: Sun,
    title: 'Daily Energy',
    description: 'Personalized daily cosmic insights based on your birth chart. Know how to align yourself today with planetary transits and energy readings.',
  },
  {
    icon: Calendar,
    title: 'Weekly & Monthly Outlook',
    description: 'Plan ahead with weekly themes and monthly cosmic forecasts. Understand what to pay attention to in the coming days and weeks.',
  },
  {
    icon: Eye,
    title: '90 Day Preview',
    description: 'Look into your cosmic future with a 90-day preview. Discover what awaits you and prepare for upcoming astrological events.',
  },
  {
    icon: Compass,
    title: 'Daily Transits & Calendar',
    description: 'All cosmic influences at a glance. Track planetary movements, retrogrades, and important transits with your personal transit calendar.',
  },
  {
    icon: Star,
    title: 'Birth Chart Analysis',
    description: 'Complete natal chart with Big Three (Sun, Ascendant, Moon), personal planets, houses, and detailed interpretations of your cosmic blueprint.',
  },
  {
    icon: MapPin,
    title: 'Astrocartography',
    description: 'Discover where your energies work best on Earth. Find your power spots for love, career, and personal growth with interactive world maps.',
  },
];

const screenshots = [
  { src: '/apps/numistellar_home1.png', alt: 'Home Screen' },
  { src: '/apps/numistellar_chat.png', alt: 'Energy Chat' },
  { src: '/apps/numistellar_dailyenergy.png', alt: 'Daily Energy' },
  { src: '/apps/numistellar_birthchart1.png', alt: 'Birth Chart' },
  { src: '/apps/numistellar_astrocartography.png', alt: 'Astrocartography' },
  { src: '/apps/numistellar_schumann.png', alt: 'Cosmic Weather' },
  { src: '/apps/numistellar_birthchart2.png', alt: 'Houses & Aspects' },
  { src: '/apps/numistellar_currenttransit.png', alt: 'Current Transits' },
  { src: '/apps/numistellar_chakraanalysis.png', alt: 'Chakra Analysis' },
  { src: '/apps/numistellar_realtime1.png', alt: 'Real-time Planets' },
  { src: '/apps/numistellar_realtime2.png', alt: 'Numerology' },
  { src: '/apps/numistellar_widgets.png', alt: 'Home Screen Widgets' },
];

// Warm floating particles (replacing cosmic stars)
const WarmParticle = ({ delay: _delay }: { delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: 2 + Math.random() * 3,
      height: 2 + Math.random() * 3,
      background: colors.accent,
    }}
    animate={{
      opacity: [0.1, 0.4, 0.1],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: 3 + Math.random() * 3,
      repeat: Infinity,
      delay: Math.random() * 5,
    }}
  />
);

// Floating zodiac symbols in warm tones
const zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

const ZodiacFloat = ({ symbol, delay, x, y }: { symbol: string; delay: number; x: string; y: string }) => (
  <motion.div
    className="absolute text-2xl opacity-15 select-none pointer-events-none"
    style={{ left: x, top: y, color: colors.accent }}
    animate={{
      y: [-15, 15, -15],
      rotate: [0, 10, -10, 0],
      opacity: [0.08, 0.2, 0.08],
    }}
    transition={{
      duration: 6 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  >
    {symbol}
  </motion.div>
);

// Warm orb decoration
const WarmOrb = ({ size, delay, x, y }: { size: number; delay: number; x: string; y: string }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: `radial-gradient(circle at 30% 30%, ${colors.accentLight}30, ${colors.accent}15)`,
      filter: 'blur(40px)',
    }}
    animate={{
      y: [-20, 20, -20],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  />
);

const appStructuredData = generateAppStructuredData(
  "NumiStellar",
  "Best astrology and numerology app in Austria. Energy Chat with AI, Angel Numbers, Daily Energy insights, Birth Chart analysis, Astrocartography maps, Schumann Resonance, and Cosmic Weather. Discover your cosmic energy with personalized spiritual guidance.",
  "https://www.awen28.com/apps/numistellar_home1.png",
  "https://apps.apple.com/at/app/numistellar/id6478859654",
  "LifestyleApplication",
  "4.9",
  "5200",
  ["Energy Chat AI", "Angel Numbers", "Daily Energy", "Weekly Outlook", "Monthly Outlook", "90 Day Preview", "Daily Transits", "Transit Calendar", "Birth Chart Analysis", "Astrocartography", "Schumann Resonance", "Cosmic Weather", "Solar Activity", "Home Screen Widgets"],
  ["/apps/numistellar_home1.png", "/apps/numistellar_chat.png", "/apps/numistellar_dailyenergy.png", "/apps/numistellar_birthchart1.png", "/apps/numistellar_astrocartography.png", "/apps/numistellar_schumann.png"],
  "2025-01-15",
  "65MB",
  "4+"
);

const breadcrumbData = generateBreadcrumbData([
  { name: "Home", url: "https://www.awen28.com/" },
  { name: "NumiStellar", url: "https://www.awen28.com/numistellar" }
]);

const faqData = generateFAQData([
  { question: "Was ist die beste Astrologie App in Österreich?", answer: "NumiStellar von Elior ist die beste Astrologie und Numerologie App in Österreich mit Energy Chat AI, Angel Numbers, Daily Energy, Birth Charts und Astrocartography." },
  { question: "Was ist der Energy Chat in NumiStellar?", answer: "Der Energy Chat ist eine AI-gestützte spirituelle Beratung. Du kannst dein höheres Selbst fragen und bekommst personalisierte Antworten mit Best-Case, Worst-Case und DOs/DONTs basierend auf Astrologie und Numerologie." },
  { question: "Was ist Numerologie und wie funktioniert sie?", answer: "Numerologie ist die Lehre von der Bedeutung von Zahlen in deinem Leben. NumiStellar berechnet deine Lebenszahl, Schicksalszahl und Tageszahl für persönliche Einblicke." },
  { question: "Was ist Schumann Resonanz?", answer: "Die Schumann Resonanz ist die natürliche Frequenz der Erde (7.83 Hz). NumiStellar zeigt aktuelle Resonanzwerte und deren Einfluss auf dein Wohlbefinden." },
  { question: "Was ist Astrocartography?", answer: "Astrocartography zeigt auf einer Weltkarte wo deine Planeten-Energien am stärksten wirken. Finde deine Power-Spots für Liebe, Karriere und persönliches Wachstum." },
  { question: "Ist NumiStellar kostenlos?", answer: "NumiStellar ist kostenlos im App Store erhältlich mit optionalen Premium-Funktionen für erweiterte Astrologie und Numerologie-Analysen." },
]);

const NumiStellar = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    if (location.pathname === '/numistellar') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePos({ x, y });
  };

  return (
    <>
      <SEO 
        title="NumiStellar | Beste Astrologie & Numerologie App Österreich 2026"
        description="NumiStellar - Die beste Astrologie und Numerologie App in Österreich. Energy Chat AI, Angel Numbers, Daily Energy, Geburtshoroskop, Astrocartography und Cosmic Weather. Kostenlos im App Store!"
        keywords="beste Astrologie App Österreich, Numerologie App, Geburtshoroskop iOS, Schumann Resonanz App, Energy Chat AI, Angel Numbers, Planetenpositionen Echtzeit, Zodiac Kompatibilität, Lebenszahl berechnen, Astrologie Deutschland, Horoskop App Österreich, Numerologie Rechner, Sternzeichen App, Astrocartography, kosmische Energie, tägliches Horoskop, Spiritualität App, best astrology app Austria, birth chart app, life path calculator"
        ogImage="https://www.awen28.com/apps/numistellar_home1.png"
        ogType="product"
        canonical="https://www.awen28.com/numistellar"
        structuredData={[appStructuredData, breadcrumbData, faqData]}
        appName="NumiStellar"
        appCategory="LifestyleApplication"
        rating="4.9"
        reviewCount="5200"
        language="de-AT"
      />
    <div ref={containerRef} className="relative min-h-screen" style={{ background: colors.bg }}>
      {/* Warm Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Warm particles */}
        {[...Array(30)].map((_, i) => (
          <WarmParticle key={`particle-${i}`} delay={i * 0.2} />
        ))}

        {/* Warm orbs */}
        <WarmOrb size={300} delay={0} x="5%" y="10%" />
        <WarmOrb size={250} delay={2} x="80%" y="20%" />
        <WarmOrb size={200} delay={1} x="70%" y="70%" />
        <WarmOrb size={180} delay={3} x="10%" y="60%" />

        {/* Zodiac Symbols in warm tones */}
        {zodiacSymbols.slice(0, 8).map((symbol, i) => (
          <ZodiacFloat
            key={`zodiac-${i}`}
            symbol={symbol}
            delay={i * 0.5}
            x={`${10 + i * 10}%`}
            y={`${15 + (i % 3) * 25}%`}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all hover:scale-105"
            style={{ 
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              color: colors.text,
              border: `1px solid ${colors.accent}30`,
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Elior
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y: bgY }}
        >
          <div 
            className="absolute top-[15%] left-[5%] w-[500px] h-[500px] rounded-full opacity-30"
            style={{
              background: `radial-gradient(circle, ${colors.accent}25 0%, transparent 70%)`,
              filter: 'blur(60px)',
            }}
          />
          <div 
            className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, ${colors.accentLight}20 0%, transparent 70%)`,
              filter: 'blur(60px)',
            }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
                  boxShadow: `0 8px 32px ${colors.accent}40`,
                }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="font-serif text-3xl" style={{ color: colors.text }}>NumiStellar</h1>
                <p className="text-sm" style={{ color: colors.textMuted }}>Cosmic Energy Guide</p>
              </div>
            </motion.div>

            <motion.h2 
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
              style={{ color: colors.text }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Discover your
              <br />
              <span style={{ color: colors.accent }}>
                cosmic energy
              </span>
            </motion.h2>

            <motion.p 
              className="text-lg mb-8 max-w-md"
              style={{ color: colors.textLight }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              NumiStellar unites astrology, numerology, and cosmic energy data to help you 
              understand your unique energetic imprint. With AI-powered Energy Chat, Angel Numbers, 
              and personalized daily insights.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.a
                href="https://apps.apple.com/at/app/numistellar/id6478859654"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all"
                style={{
                  background: colors.accent,
                  color: 'white',
                  boxShadow: `0 8px 32px ${colors.accent}40`,
                }}
                whileHover={{ scale: 1.05, boxShadow: `0 12px 40px ${colors.accent}60` }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                Download App
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center md:justify-end relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          >
            {/* Moon decoration */}
            <motion.div
              className="absolute -top-10 -right-10 text-5xl opacity-20"
              animate={{ rotate: [0, 10, -10, 0], y: [-5, 5, -5] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              🌙
            </motion.div>
            
            {/* Sun decoration */}
            <motion.div
              className="absolute -bottom-5 -left-5 opacity-15"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <Sun className="w-10 h-10" style={{ color: colors.accent }} />
            </motion.div>

            <motion.div
              className="relative p-4 md:p-6 rounded-[40px]"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                transition: 'transform 0.3s ease-out',
                background: colors.card,
                border: `1px solid ${colors.accent}15`,
                boxShadow: `0 32px 64px rgba(61, 50, 41, 0.1), 0 0 0 1px ${colors.accent}10`,
              }}
            >
              <div
                className="p-3 rounded-[28px]"
                style={{
                  background: colors.cream,
                }}
              >
                <img
                  src="/apps/numistellar_home1.png"
                  alt="NumiStellar App Home"
                  className="w-[260px] md:w-[300px] h-auto rounded-[24px]"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 md:px-8" style={{ background: colors.bgDark }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span 
              className="font-serif italic text-sm tracking-[0.3em] block mb-6"
              style={{ color: colors.accent }}
            >
              ✨ Cosmic Features ✨
            </motion.span>
            <h2 className="font-serif text-4xl md:text-5xl" style={{ color: colors.text }}>
              Your manifestation toolkit
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-6 rounded-[24px] relative overflow-hidden"
                style={{
                  background: colors.card,
                  border: `1px solid ${colors.accent}10`,
                  boxShadow: '0 8px 32px rgba(61, 50, 41, 0.06)',
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0"
                  whileHover={{ opacity: 1 }}
                  style={{
                    background: `radial-gradient(circle at center, ${colors.accent}08, transparent)`,
                  }}
                />
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
                  style={{
                    background: `${colors.accent}15`,
                  }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: colors.accent }} />
                </div>
                <h3 className="font-serif text-xl mb-2 relative z-10" style={{ color: colors.text }}>
                  {feature.title}
                </h3>
                <p className="text-sm relative z-10" style={{ color: colors.textMuted }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase - Screenshots */}
      <section className="py-32 px-6 md:px-8" style={{ background: colors.bg }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span 
              className="font-serif italic text-sm tracking-[0.3em] block mb-6"
              style={{ color: colors.accent }}
            >
              🌌 Explore the Cosmos 🌌
            </motion.span>
            <h2 className="font-serif text-4xl md:text-5xl" style={{ color: colors.text }}>
              Ancient wisdom meets AI
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {screenshots.map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.04 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="p-2 rounded-[20px] cursor-pointer"
                style={{
                  background: colors.card,
                  border: `1px solid ${colors.accent}10`,
                  boxShadow: '0 4px 16px rgba(61, 50, 41, 0.06)',
                }}
              >
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className="w-full h-auto rounded-[14px]"
                />
                <p className="text-center mt-2 text-xs" style={{ color: colors.textMuted }}>{screenshot.alt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits List */}
      <section className="py-32 px-6 md:px-8" style={{ background: colors.bgDark }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl mb-8" style={{ color: colors.text }}>
                Why NumiStellar?
              </h2>
              <div className="space-y-5">
                {[
                  'AI-powered Energy Chat with personalized guidance',
                  'Complete birth chart with Big Three analysis',
                  'Real-time planetary positions and transits',
                  'Schumann resonance & solar activity monitoring',
                  'Astrocartography world maps',
                  'Angel numbers interpretation',
                  'Daily, weekly & monthly cosmic outlook',
                  '90-day future preview',
                  'Home screen widgets',
                  'Chakra energy analysis',
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${colors.accent}15`,
                      }}
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Star className="w-4 h-4" style={{ color: colors.accent }} />
                    </motion.div>
                    <span style={{ color: colors.textLight }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center relative"
            >
              {/* Orbiting decoration */}
              <motion.div
                className="absolute w-64 h-64 rounded-full"
                style={{ border: `1px solid ${colors.accent}20` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div 
                  className="absolute -top-2 left-1/2 w-4 h-4 rounded-full shadow-lg" 
                  style={{ background: colors.accent, boxShadow: `0 0 10px ${colors.accent}50` }} 
                />
              </motion.div>

              <div
                className="p-4 rounded-[40px] relative z-10"
                style={{
                  background: colors.card,
                  border: `1px solid ${colors.accent}10`,
                  boxShadow: '0 32px 64px rgba(61, 50, 41, 0.1)',
                }}
              >
                <img
                  src="/apps/numistellar_chat.png"
                  alt="Energy Chat Feature"
                  className="w-[280px] h-auto rounded-[24px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-8" style={{ background: colors.bg }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative"
        >
          {/* Floating zodiac around CTA */}
          <motion.div
            className="absolute -top-10 left-10 text-3xl opacity-15"
            animate={{ y: [-10, 10, -10], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ color: colors.accent }}
          >
            ♈
          </motion.div>
          <motion.div
            className="absolute -bottom-5 right-10 text-3xl opacity-15"
            animate={{ y: [10, -10, 10], rotate: [0, -15, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{ color: colors.accent }}
          >
            ♎
          </motion.div>

          <div
            className="p-12 md:p-16 rounded-[40px] relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
              boxShadow: `0 32px 64px ${colors.accent}30`,
            }}
          >
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 opacity-10"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-full h-full text-white" />
            </motion.div>

            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 relative z-10">
              Start your cosmic journey
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto relative z-10">
              Join thousands who have transformed their lives with cosmic wisdom. 
              Your stars are waiting to guide you.
            </p>
            <motion.a
              href="https://apps.apple.com/at/app/numistellar/id6478859654"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium relative z-10"
              style={{
                background: 'white',
                color: colors.accent,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              Get NumiStellar on the App Store
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8" style={{ background: colors.text }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: colors.accent }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <span className="font-serif text-xl text-white">NumiStellar</span>
          </div>
          <p className="text-sm text-white/40">
            © 2026 NumiStellar. A product by Elior.
          </p>
          <Link 
            to="/"
            className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            style={{ color: colors.accentLight }}
          >
            Visit Elior
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
    </>
  );
};

export default NumiStellar;
