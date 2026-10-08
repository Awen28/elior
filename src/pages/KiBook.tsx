import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Palette, BookOpen, Wand2, ChevronRight, Download, Star, Heart, FileText, Eye } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO, generateAppStructuredData, generateBreadcrumbData, generateFAQData } from '../components/SEO';

const features = [
  {
    icon: Wand2,
    title: 'Magical Stories',
    description: 'Transform any idea into a beautifully illustrated tale. Just type your story concept and watch it come alive!',
  },
  {
    icon: Palette,
    title: 'Beautiful Art Styles',
    description: 'Choose from watercolor, pencil sketch, flat design, or 3D cartoon styles. Each book is uniquely yours!',
  },
  {
    icon: BookOpen,
    title: 'Your Personal Library',
    description: 'Collect all your stories in one place. Read, share, and relive your magical adventures anytime!',
  },
];

// Using exact filenames as provided
const screenshots = [
  { src: '/apps/kibook_home.png', alt: 'Home' },
  { src: '/apps/kibook_features.png', alt: 'Features' },
  { src: '/apps/kibook_keywords.png', alt: 'Keywords' },
  { src: '/apps/kibook_style.png', alt: 'Style Selection' },
  { src: '/apps/kibook_book.png', alt: 'Your Book' },
  { src: '/apps/kibook_paintimage.png', alt: 'Paint Image' },
  { src: '/apps/kibook_booklibrary.png', alt: 'Book Library' },
];

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

const starVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    rotate: [0, 15, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

// Book page component for the flip effect
const BookPage = ({ pageNum, isFlipped, onClick }: { pageNum: number; isFlipped: boolean; onClick: () => void }) => {
  const pageContent = [
    { color: '#E3DED5', text: 'Once upon a time...', emoji: '🏖️' },
    { color: '#BBB1A4', text: 'A magical adventure', emoji: '🌊' },
    { color: '#D4A574', text: 'Beautiful dreams', emoji: '✨' },
    { color: '#E8D5C4', text: 'The end', emoji: '📖' },
  ];
  
  const content = pageContent[pageNum % pageContent.length];
  
  return (
    <motion.div
      className="absolute inset-0 w-full h-full cursor-pointer"
      style={{ 
        transformOrigin: 'left center',
        backfaceVisibility: 'hidden',
      }}
      animate={{ 
        rotateY: isFlipped ? -180 : 0,
        zIndex: isFlipped ? 0 : 10 - pageNum 
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onClick={onClick}
    >
      <div 
        className="w-full h-full rounded-r-2xl p-6 flex flex-col items-center justify-center"
        style={{ 
          background: `linear-gradient(135deg, ${content.color}20 0%, ${content.color}40 100%)`,
          border: `2px solid ${content.color}60`,
          boxShadow: isFlipped ? 'none' : 'inset -10px 0 20px rgba(0,0,0,0.1)',
        }}
      >
        <motion.span 
          className="text-5xl mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {content.emoji}
        </motion.span>
        <p className="text-sm text-center font-serif" style={{ color: '#525240' }}>
          {content.text}
        </p>
        <div className="absolute bottom-4 right-4 text-xs opacity-50">
          Page {pageNum + 1}
        </div>
      </div>
    </motion.div>
  );
};

const appStructuredData = generateAppStructuredData(
  "kiBook",
  "AI-powered children's book creator. Transform your child's imagination into beautifully illustrated stories. Customize characters, themes, and art styles. The best AI story generator for kids.",
  "https://www.awen28.com/apps/kiBook_homescreen.png",
  "https://apps.apple.com/at/app/kibook/id6502518789",
  "EducationApplication",
  "4.9",
  "15000",
  ["AI Story Generation", "Personalized Characters", "Custom Themes", "Multiple Art Styles", "Digital Library", "Child-Friendly Interface", "Share Stories"],
  ["/apps/kiBook_homescreen.png", "/apps/kibook_story.png", "/apps/kibook_library.png"],
  "2025-03-01",
  "70MB",
  "4+"
);

const breadcrumbData = generateBreadcrumbData([
  { name: "Home", url: "https://www.awen28.com/" },
  { name: "kiBook", url: "https://www.awen28.com/kibook" }
]);

const faqData = generateFAQData([
  { question: "Was ist kiBook?", answer: "kiBook ist eine innovative iOS App die mit Hilfe von KI personalisierte Kinderbücher erstellt. Eltern können Charaktere, Themen und Kunststile anpassen." },
  { question: "Ist kiBook sicher für Kinder?", answer: "Ja, kiBook ist komplett kindersicher. Alle Geschichten werden von der KI auf Altersgerechtheit geprüft und enthalten keine unangemessenen Inhalte." },
  { question: "Wie funktioniert die AI Geschichtenerstellung?", answer: "Eltern beschreiben einfach eine Geschichte oder einen Charakter. kiBook generiert automatisch eine vollständig illustrierte Geschichte mit passenden Bildern." },
  { question: "Ist kiBook kostenlos?", answer: "kiBook ist kostenlos im App Store mit optionalen Premium-Funktionen für unbegrenzte Geschichtenerstellung." },
]);

const KiBook = () => {
  const location = useLocation();

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoFlipping, setIsAutoFlipping] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Scroll to top on mount - force immediate scroll
  useEffect(() => {
    if (location.pathname === '/kibook') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location]);

  // Auto-flip book animation
  useEffect(() => {
    if (isAutoFlipping) {
      const interval = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % 5);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isAutoFlipping]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePos({ x, y });
  };

  const flipPage = () => {
    setCurrentPage((prev) => (prev + 1) % 5);
  };

  return (
    <>
      <SEO
        title="kiBook | #1 Beste AI Kinderbuch App 2026 - Geschichten mit KI erstellen"
        description="kiBook - Die beste AI Kinderbuch App. Verwandle die Fantasie deines Kindes in wunderschön illustrierte Geschichten. Personalisierte Charaktere, Themen und Kunststile. Kostenlos!"
        keywords="AI Kinderbuch App, personalisierte Kinderbücher, KI Geschichten für Kinder, Kinderbuch erstellen App, illustrierte Geschichten App, AI Story Generator Kinder, Lern App Kinder, Bilderbuch App, Kinderbuch digital, Fantasie Geschichten App, best AI children's book app 2026, personalized kids stories, AI story app for children"
        ogImage="https://www.awen28.com/apps/kiBook_homescreen.png"
        ogType="product"
        canonical="https://www.awen28.com/kibook"
        structuredData={[appStructuredData, breadcrumbData, faqData]}
        appName="kiBook"
        appCategory="EducationApplication"
        rating="4.9"
        reviewCount="15000"
        language="de-AT"
      />
    <div ref={containerRef} className="relative min-h-screen" style={{ background: '#F1EDE6' }}>
      {/* Decorative floating stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          className="absolute top-20 left-10"
          variants={starVariants}
          animate="animate"
        >
          <Star className="w-6 h-6" style={{ color: '#E3DED5', fill: '#E3DED5' }} />
        </motion.div>
        <motion.div 
          className="absolute top-40 right-20"
          variants={starVariants}
          animate="animate"
          style={{ animationDelay: '0.5s' }}
        >
          <Star className="w-4 h-4" style={{ color: '#BBB1A4', fill: '#BBB1A4' }} />
        </motion.div>
        <motion.div 
          className="absolute bottom-40 left-20"
          variants={starVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
        >
          <Star className="w-5 h-5" style={{ color: '#E8E5E0', fill: '#E8E5E0' }} />
        </motion.div>
        <motion.div 
          className="absolute top-1/3 right-10"
          variants={starVariants}
          animate="animate"
          style={{ animationDelay: '1.5s' }}
        >
          <Heart className="w-4 h-4" style={{ color: '#E3DED5', fill: '#E3DED5' }} />
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{ 
              background: 'rgba(255, 255, 255, 0.9)',
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
        {/* Background gradient - warmer and softer */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y: bgY }}
        >
          <div 
            className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(233, 207, 185, 0.4) 0%, transparent 70%)',
            }}
          />
          <div 
            className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] rounded-full opacity-35"
            style={{
              background: 'radial-gradient(circle, rgba(178, 159, 134, 0.3) 0%, transparent 70%)',
            }}
          />
          <div 
            className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(232, 229, 224, 0.5) 0%, transparent 70%)',
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
            {/* Logo - more playful */}
            <motion.div 
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div 
                className="w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #E3DED5 0%, #BBB1A4 100%)',
                  boxShadow: '0 12px 32px rgba(233, 207, 185, 0.4), inset 0 2px 4px rgba(255,255,255,0.5)',
                }}
              >
                <BookOpen className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="font-serif text-4xl" style={{ color: '#525240' }}>kiBook</h1>
                <p className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.6)' }}>Magic Story Creator</p>
              </div>
            </motion.div>

            <motion.h2 
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
              style={{ color: '#525240' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Create magical
              <br />
              <span style={{ color: '#BBB1A4' }}>stories</span> together
            </motion.h2>

            <motion.p 
              className="text-lg mb-8 max-w-md"
              style={{ color: 'rgba(82, 82, 64, 0.7)' }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Turn your imagination into beautifully illustrated books! With kiBook, every child 
              (and child at heart) can become a storyteller. Just describe your idea and watch 
              the magic happen.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <a
                href="https://apps.apple.com/at/app/kibook-dein-abenteuer/id6744836466"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 rounded-full flex items-center gap-3 text-base font-medium transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #E3DED5 0%, #BBB1A4 100%)',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(233, 207, 185, 0.4)',
                }}
              >
                <Download className="w-5 h-5" />
                Download kiBook
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Phone Mockup - more playful */}
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative p-4 md:p-6 rounded-[48px]"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                transition: 'transform 0.3s ease-out',
                background: '#F7F3ED',
                boxShadow: `
                  inset 4px 4px 8px rgba(255, 255, 255, 0.9),
                  inset -4px -4px 8px rgba(82, 82, 64, 0.05),
                  24px 24px 48px rgba(233, 207, 185, 0.25),
                  -24px -24px 48px rgba(255, 255, 255, 0.9)
                `,
              }}
            >
              <div
                className="p-3 rounded-[36px]"
                style={{
                  background: '#F1EDE6',
                  boxShadow: `
                    inset 2px 2px 4px rgba(82, 82, 64, 0.04),
                    inset -2px -2px 4px rgba(255, 255, 255, 0.8)
                  `,
                }}
              >
                <img
                  src="/apps/kibook_home.png"
                  alt="kiBook App Home"
                  className="w-[260px] md:w-[300px] h-auto rounded-[28px]"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - more rounded and soft */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#F7F3ED' }}>
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
              style={{ color: '#BBB1A4' }}
            >
              ✨ Magic Features ✨
            </motion.span>
            <h2 
              className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ color: '#525240' }}
            >
              How it works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-8 rounded-[40px]"
                style={{
                  background: '#F1EDE6',
                  boxShadow: `
                    inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                    inset -3px -3px 6px rgba(82, 82, 64, 0.04),
                    12px 12px 24px rgba(82, 82, 64, 0.06),
                    -12px -12px 24px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(233, 207, 185, 0.2) 0%, rgba(178, 159, 134, 0.15) 100%)',
                  }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-8 h-8" style={{ color: '#BBB1A4' }} />
                </motion.div>
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

      {/* PDF Preview Section - 3D Flip Book */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#F1EDE6' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.span 
              className="font-serif italic text-sm tracking-[0.3em] block mb-6"
              style={{ color: '#BBB1A4' }}
            >
              📖 Example Story 📖
            </motion.span>
            <h2 
              className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ color: '#525240' }}
            >
              See what kiBook creates
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(82, 82, 64, 0.7)' }}>
              Flip through the pages of &quot;Ava&apos;s Magical Beach Adventure&quot; — 
              a complete story generated by kiBook&apos;s AI
            </p>
          </motion.div>

          {/* 3D Book Container */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
            {/* 3D Flip Book */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
              style={{ perspective: '1500px' }}
              onMouseEnter={() => setIsAutoFlipping(true)}
              onMouseLeave={() => setIsAutoFlipping(false)}
            >
              {/* Book shadow */}
              <div 
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-80 h-8 rounded-full blur-xl"
                style={{ background: 'rgba(0,0,0,0.15)' }}
              />
              
              {/* Book container */}
              <motion.div
                className="relative w-72 h-96 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ 
                  rotateY: isAutoFlipping ? [0, 5, 0, -5, 0] : 0,
                }}
                transition={{ duration: 4, repeat: Infinity }}
                onClick={flipPage}
              >
                {/* Book spine */}
                <div 
                  className="absolute left-0 top-0 w-4 h-full rounded-l-lg"
                  style={{
                    background: 'linear-gradient(90deg, #BBB1A4 0%, #E3DED5 100%)',
                    transform: 'translateX(-100%) rotateY(-90deg)',
                    transformOrigin: 'right center',
                  }}
                />
                
                {/* Back cover */}
                <div 
                  className="absolute inset-0 rounded-r-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #BBB1A4 0%, #E3DED5 100%)',
                    transform: 'translateZ(-20px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  }}
                />
                
                {/* Front cover */}
                <motion.div 
                  className="absolute inset-0 rounded-r-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #E3DED5 0%, #BBB1A4 100%)',
                    transformOrigin: 'left center',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  }}
                  animate={{ 
                    rotateY: currentPage > 0 ? -160 : 0,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {/* Cover design */}
                  <div className="absolute inset-4 rounded-xl border-2 border-white/30 flex flex-col items-center justify-center p-6">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      🏖️
                    </motion.div>
                    <h3 className="font-serif text-2xl text-white text-center mb-2">
                      Ava&apos;s Magical<br/>Beach Adventure
                    </h3>
                    <p className="text-white/70 text-sm text-center">
                      A kiBook Story
                    </p>
                    <div className="absolute bottom-4 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Pages */}
                <AnimatePresence>
                  {[0, 1, 2, 3].map((pageNum) => (
                    currentPage > pageNum && (
                      <BookPage
                        key={pageNum}
                        pageNum={pageNum}
                        isFlipped={currentPage > pageNum + 1}
                        onClick={flipPage}
                      />
                    )
                  ))}
                </AnimatePresence>

                {/* Page indicator */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: currentPage === i ? '#BBB1A4' : 'rgba(82, 82, 64, 0.2)',
                      }}
                      animate={{ scale: currentPage === i ? 1.3 : 1 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Click hint */}
              <motion.p 
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-sm text-center"
                style={{ color: 'rgba(82, 82, 64, 0.5)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Click to flip pages ✨
              </motion.p>
            </motion.div>

            {/* PDF Download Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-md"
            >
              <div 
                className="p-8 rounded-[32px]"
                style={{
                  background: '#F7F3ED',
                  boxShadow: `
                    inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                    inset -3px -3px 6px rgba(82, 82, 64, 0.04),
                    12px 12px 24px rgba(82, 82, 64, 0.06),
                    -12px -12px 24px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #E3DED5 0%, #BBB1A4 100%)' }}
                  >
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl" style={{ color: '#525240' }}>
                      Full PDF Version
                    </h3>
                    <p className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.5)' }}>
                      12 pages • 1.7 MB
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {['Beautiful illustrations', 'Kid-friendly story', 'Print-ready format', 'Share with family'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(178, 159, 134, 0.15)' }}
                      >
                        <Star className="w-3 h-3" style={{ color: '#BBB1A4' }} />
                      </div>
                      <span className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.7)' }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.a
                    href="/apps/kibook_example.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium"
                    style={{
                      background: 'linear-gradient(135deg, #E3DED5 0%, #BBB1A4 100%)',
                      color: 'white',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye className="w-4 h-4" />
                    View PDF
                  </motion.a>
                  <motion.a
                    href="/apps/kibook_example.pdf"
                    download
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium"
                    style={{
                      background: '#F1EDE6',
                      color: '#BBB1A4',
                      border: '2px solid rgba(178, 159, 134, 0.3)',
                    }}
                    whileHover={{ scale: 1.02, background: '#E3DED5', color: 'white' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Showcase - Screenshots */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#F7F3ED' }}>
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
              style={{ color: '#BBB1A4' }}
            >
              📚 Your Books 📚
            </motion.span>
            <h2 
              className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ color: '#525240' }}
            >
              Create & Collect
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {screenshots.map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, type: "spring", stiffness: 100 }}
                whileHover={{ y: -12, scale: 1.03, rotate: idx % 2 === 0 ? -2 : 2 }}
                className="p-3 rounded-[28px] cursor-pointer"
                style={{
                  background: '#F7F3ED',
                  boxShadow: `
                    inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                    inset -2px -2px 4px rgba(82, 82, 64, 0.04),
                    8px 8px 16px rgba(82, 82, 64, 0.06),
                    -8px -8px 16px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className="w-full h-auto rounded-[20px]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits List - playful version */}
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
                Perfect for little storytellers
              </h2>
              <div className="space-y-5">
                {[
                  'Easy to use - just type and create!',
                  'Beautiful AI-generated illustrations',
                  'Multiple art styles to choose from',
                  'Save stories to your library',
                  'Share books with family & friends',
                  'Safe and kid-friendly content',
                  'No reading skills required',
                  'Encourages creativity & imagination',
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
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(233, 207, 185, 0.3) 0%, rgba(178, 159, 134, 0.2) 100%)',
                      }}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <Sparkles className="w-5 h-5" style={{ color: '#BBB1A4' }} />
                    </motion.div>
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
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="p-5 rounded-[48px]"
                style={{
                  background: '#F1EDE6',
                  boxShadow: `
                    inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                    inset -3px -3px 6px rgba(82, 82, 64, 0.04),
                    20px 20px 40px rgba(233, 207, 185, 0.15),
                    -20px -20px 40px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <img
                  src="/apps/kibook_book.png"
                  alt="Your Magical Book"
                  className="w-[280px] h-auto rounded-[32px]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - playful */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#F1EDE6' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            className="p-12 md:p-16 rounded-[48px] relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #E3DED5 0%, #BBB1A4 50%, #E8E5E0 100%)',
              boxShadow: '0 32px 64px rgba(233, 207, 185, 0.35)',
            }}
          >
            {/* Decorative elements */}
            <motion.div 
              className="absolute top-6 left-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-white/30" />
            </motion.div>
            <motion.div 
              className="absolute bottom-6 right-6"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-10 h-10 text-white/20" />
            </motion.div>
            <motion.div 
              className="absolute top-1/2 right-10"
              variants={starVariants}
              animate="animate"
            >
              <Heart className="w-6 h-6 text-white/25" />
            </motion.div>

            <h2 
              className="font-serif text-4xl md:text-5xl text-white mb-6"
            >
              Start your story today!
            </h2>
            <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto">
              Download kiBook and turn your imagination into magical illustrated stories. 
              Perfect for kids, parents, and anyone who loves storytelling!
            </p>
            <motion.a
              href="https://apps.apple.com/at/app/kibook-dein-abenteuer/id6744836466"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-base font-medium transition-all hover:scale-105"
              style={{
                background: 'white',
                color: '#BBB1A4',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              Get kiBook on the App Store
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8" style={{ background: '#E8E5E0' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #E3DED5 0%, #BBB1A4 100%)' }}
            >
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-2xl" style={{ color: '#525240' }}>kiBook</span>
          </div>
          <p className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.5)' }}>
            © 2024 kiBook. A product by Elior. Made with ✨ for little storytellers.
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

export default KiBook;
