import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, Image, Wand2, ChevronRight, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO, generateAppStructuredData, generateBreadcrumbData, generateFAQData } from '../components/SEO';

const features = [
  {
    icon: Sparkles,
    title: 'AI Vision Boards',
    description: 'Create stunning vision boards powered by DALL-E AI. Simply describe your dreams and watch them come to life.',
  },
  {
    icon: Image,
    title: 'Gallery & Collections',
    description: 'Organize your creations in beautiful collections. Track your manifestation journey with visual history.',
  },
  {
    icon: Wand2,
    title: 'Manifestation Tools',
    description: 'Set intentions, add affirmations, and create a powerful visual focus for your goals and dreams.',
  },
];

const screenshots = [
  { src: '/apps/visai_home.png', alt: 'VisAI Home' },
  { src: '/apps/visai_create.png', alt: 'Create Vision Board' },
  { src: '/apps/visai_generated.png', alt: 'Generated Vision Board' },
  { src: '/apps/visai_manual.png', alt: 'Manual Creation' },
];

const appStructuredData = generateAppStructuredData(
  "VisAI",
  "AI-powered vision board app for manifestation and goal visualization. Describe your dreams and AI generates stunning visual representations. The best digital vision board for the law of attraction.",
  "https://www.awen28.com/apps/visAI_homescreen.png",
  "https://apps.apple.com/at/app/visai/id6502626367",
  "LifestyleApplication",
  "4.6",
  "1800",
  ["AI Vision Board", "Goal Visualization", "Dream Board Creator", "Manifestation Tools", "AI Image Generation", "Goal Tracking", "Daily Inspiration"],
  ["/apps/visAI_homescreen.png", "/apps/visai_board.png", "/apps/visai_create.png"],
  "2025-04-01",
  "60MB",
  "4+"
);

const breadcrumbData = generateBreadcrumbData([
  { name: "Home", url: "https://www.awen28.com/" },
  { name: "VisAI", url: "https://www.awen28.com/visai" }
]);

const faqData = generateFAQData([
  { question: "Was ist VisAI?", answer: "VisAI ist eine AI Vision Board App die deine Ziele und Träume in atemberaubende visuelle Darstellungen verwandelt. Perfekt für Manifestation und Zielvisualisierung." },
  { question: "Wie funktioniert ein AI Vision Board?", answer: "Beschreibe einfach dein Ziel oder deinen Traum. VisAI generiert mit KI ein passendes Bild das du als Vision Board speichern und täglich betrachten kannst." },
  { question: "Ist VisAI kostenlos?", answer: "VisAI ist kostenlos im App Store mit optionalen Premium-Funktionen für unbegrenzte Vision Boards und hochauflösende Bilder." },
  { question: "Was ist ein Vision Board?", answer: "Ein Vision Board ist eine visuelle Sammlung deiner Ziele. VisAI macht das digital und nutzt KI um personalisierte Bilder zu erstellen die deine Träume repräsentieren." },
]);

const VisAI = () => {
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

  // Scroll to top on mount - force immediate scroll
  useEffect(() => {
    if (location.pathname === '/visai') {
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
        title="VisAI | #1 Beste AI Vision Board App 2026 - Manifestation & Ziele"
        description="VisAI - Die beste AI Vision Board App für Manifestation und Zielvisualisierung. Beschreibe deine Träume und KI erstellt atemberaubende Vision Boards. Kostenlos im App Store!"
        keywords="AI Vision Board, Vision Board App, Manifestation visualisieren, Ziel Board App, Traumboard digital, AI Bild Generator, Manifestation App Österreich, Ziele erreichen App, Dream Board Creator, Vision Board Online, best vision board app 2026, goal visualization app, law of attraction vision board, digital vision board iOS"
        ogImage="https://www.awen28.com/apps/visAI_homescreen.png"
        ogType="product"
        canonical="https://www.awen28.com/visai"
        structuredData={[appStructuredData, breadcrumbData, faqData]}
        appName="VisAI"
        appCategory="LifestyleApplication"
        rating="4.6"
        reviewCount="1800"
        language="de-AT"
      />
      <div ref={containerRef} className="relative min-h-screen" style={{ background: '#F1EDE6' }}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link 
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ 
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                color: '#525240',
                boxShadow: '0 4px 12px rgba(82, 82, 64, 0.08)',
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Elior
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
          {/* Background gradient */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{ y: bgY }}
          >
            <div 
              className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(233, 207, 185, 0.4) 0%, transparent 70%)',
              }}
            />
            <div 
              className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-25"
              style={{
                background: 'radial-gradient(circle, rgba(178, 159, 134, 0.35) 0%, transparent 70%)',
              }}
            />
          </motion.div>

          <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Logo */}
              <motion.div 
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #BBB1A4 0%, #E3DED5 100%)',
                    boxShadow: '0 8px 24px rgba(178, 159, 134, 0.35)',
                  }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl" style={{ color: '#BBB1A4' }}>VisAI</h1>
                  <p className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.6)' }}>AI Vision Boards</p>
                </div>
              </motion.div>

              <motion.h2 
                className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
                style={{ color: '#525240' }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Dream it.
                <br />
                <span style={{ color: '#BBB1A4' }}>See it.</span>
                <br />
                Achieve it.
              </motion.h2>

              <motion.p 
                className="text-lg mb-8 max-w-md"
                style={{ color: 'rgba(82, 82, 64, 0.7)' }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Transform your goals into stunning AI-generated vision boards. 
                Visualize your dreams, manifest your future, and achieve anything you set your mind to.
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <a
                  href="https://apps.apple.com/at/app/visai/id6744864095"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: '#BBB1A4',
                    color: 'white',
                    boxShadow: '0 8px 24px rgba(178, 159, 134, 0.35)',
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download App
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Phone Mockup */}
            <motion.div
              className="flex justify-center md:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            >
              <motion.div
                className="relative p-4 md:p-6 rounded-[40px]"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                  transition: 'transform 0.3s ease-out',
                  background: '#F7F3ED',
                  boxShadow: `
                    inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                    inset -3px -3px 6px rgba(82, 82, 64, 0.05),
                    20px 20px 40px rgba(178, 159, 134, 0.2),
                    -20px -20px 40px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <div
                  className="p-3 rounded-[28px]"
                  style={{
                    background: '#F1EDE6',
                    boxShadow: `
                      inset 2px 2px 4px rgba(82, 82, 64, 0.04),
                      inset -2px -2px 4px rgba(255, 255, 255, 0.8)
                    `,
                  }}
                >
                  <img
                    src="/apps/visai_home.png"
                    alt="VisAI App"
                    className="w-[260px] md:w-[300px] h-auto rounded-[24px]"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: '#F7F3ED' }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span 
                className="font-serif italic text-sm tracking-[0.3em] block mb-6"
                style={{ color: '#BBB1A4' }}
              >
                Features
              </span>
              <h2 
                className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
                style={{ color: '#525240' }}
              >
                Manifest your dreams
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-8 rounded-[32px]"
                  style={{
                    background: '#F1EDE6',
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(82, 82, 64, 0.04),
                      8px 8px 16px rgba(82, 82, 64, 0.06),
                      -8px -8px 16px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: 'rgba(178, 159, 134, 0.12)',
                    }}
                  >
                    <feature.icon className="w-7 h-7" style={{ color: '#BBB1A4' }} />
                  </div>
                  <h3 
                    className="font-serif text-2xl mb-4"
                    style={{ color: '#525240' }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: 'rgba(82, 82, 64, 0.6)' }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* App Showcase - Screenshots */}
        <section className="py-32 px-6 md:px-8" style={{ background: '#F1EDE6' }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span 
                className="font-serif italic text-sm tracking-[0.3em] block mb-6"
                style={{ color: '#BBB1A4' }}
              >
                App Screenshots
              </span>
              <h2 
                className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
                style={{ color: '#525240' }}
              >
                Visualize. Create. Achieve.
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {screenshots.map((screenshot, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="p-3 rounded-[24px] cursor-pointer"
                  style={{
                    background: '#F7F3ED',
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(82, 82, 64, 0.04),
                      6px 6px 12px rgba(82, 82, 64, 0.06),
                      -6px -6px 12px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className="w-full h-auto rounded-[16px]"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits List */}
        <section className="py-32 px-6 md:px-8" style={{ background: '#F7F3ED' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 
                  className="font-serif text-4xl md:text-5xl mb-8"
                  style={{ color: '#525240' }}
                >
                  Why VisAI?
                </h2>
                <div className="space-y-6">
                  {[
                    'AI-powered image generation',
                    'Create unlimited vision boards',
                    'Organize dreams into collections',
                    'Add affirmations & intentions',
                    'Daily manifestation reminders',
                    'Share your vision with friends',
                    'Beautiful, intuitive interface',
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: 'rgba(178, 159, 134, 0.15)',
                        }}
                      >
                        <Check className="w-4 h-4" style={{ color: '#BBB1A4' }} />
                      </div>
                      <span style={{ color: 'rgba(82, 82, 64, 0.8)' }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex justify-center"
              >
                <div
                  className="p-4 rounded-[40px]"
                  style={{
                    background: '#F1EDE6',
                    boxShadow: `
                      inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                      inset -3px -3px 6px rgba(82, 82, 64, 0.04),
                      16px 16px 32px rgba(178, 159, 134, 0.12),
                      -16px -16px 32px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <img
                    src="/apps/visai_generated.png"
                    alt="Generated Vision Board"
                    className="w-[280px] h-auto rounded-[24px]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: '#F1EDE6' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div
              className="p-12 md:p-16 rounded-[40px]"
              style={{
                background: 'linear-gradient(135deg, #BBB1A4 0%, #E3DED5 100%)',
                boxShadow: '0 32px 64px rgba(178, 159, 134, 0.35)',
              }}
            >
              <h2 
                className="font-serif text-4xl md:text-5xl text-white mb-6"
              >
                Start manifesting today
              </h2>
              <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
                Download VisAI and transform your dreams into beautiful AI-generated vision boards. 
                Your future starts with a vision.
              </p>
              <a
                href="https://apps.apple.com/at/app/visai/id6744864095"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'white',
                  color: '#BBB1A4',
                }}
              >
                <Download className="w-5 h-5" />
                Get VisAI on the App Store
              </a>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 md:px-8" style={{ background: '#E8E5E0' }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #BBB1A4 0%, #E3DED5 100%)' }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl" style={{ color: '#525240' }}>VisAI</span>
            </div>
            <p className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.5)' }}>
              © 2024 VisAI. A product by Elior.
            </p>
            <Link 
              to="/"
              className="flex items-center gap-2 text-sm"
              style={{ color: '#BBB1A4' }}
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

export default VisAI;
