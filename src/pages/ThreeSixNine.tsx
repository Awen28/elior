import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Download, Sparkles, Brain, Moon, ChevronRight, Sun, Star, Flower2, Sparkle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO, generateAppStructuredData, generateBreadcrumbData, generateFAQData } from '../components/SEO';

const featureIcons = [Sparkles, Brain, Moon];

// 369 Magic Numbers Animation
const MagicNumber = ({ number, delay, x, y }: { number: string; delay: number; x: string; y: string }) => (
  <motion.div
    className="absolute text-6xl md:text-8xl font-serif font-bold select-none pointer-events-none"
    style={{ 
      left: x, 
      top: y, 
      background: 'linear-gradient(135deg, #20B2AA, #9370DB)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      opacity: 0.1,
    }}
    animate={{
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  >
    {number}
  </motion.div>
);

// Floating Lotus/Flower component
const FloatingFlower = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    animate={{
      y: [-15, 15, -15],
      rotate: [0, 10, -10, 0],
      scale: [0.9, 1.1, 0.9],
    }}
    transition={{
      duration: 6 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  >
    <Flower2 
      className="text-teal-400/20" 
      size={size} 
      strokeWidth={1}
    />
  </motion.div>
);

// Manifestation Particle
const ManifestationParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-purple-400"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -100, 0],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay: delay * 2,
      ease: "easeOut",
    }}
  />
);

// Mandala Ring
const MandalaRing = ({ size, duration, reverse = false }: { size: number; duration: number; reverse?: boolean }) => (
  <motion.div
    className="absolute rounded-full border-2 border-dashed"
    style={{
      width: size,
      height: size,
      left: '50%',
      top: '50%',
      marginLeft: -size / 2,
      marginTop: -size / 2,
      borderColor: 'rgba(32, 178, 170, 0.15)',
    }}
    animate={{ rotate: reverse ? -360 : 360 }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: i % 2 === 0 ? '#20B2AA' : '#9370DB',
          top: -4,
          left: '50%',
          marginLeft: -4,
          transform: `rotate(${i * 45}deg)`,
          transformOrigin: `4px ${size / 2 + 4}px`,
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
      />
    ))}
  </motion.div>
);

// Breathing Circle
const BreathingCircle = () => (
  <motion.div
    className="absolute rounded-full border-2 border-teal-400/20"
    style={{
      width: 200,
      height: 200,
      left: '50%',
      top: '50%',
      marginLeft: -100,
      marginTop: -100,
    }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.1, 0.3],
      borderWidth: ['2px', '4px', '2px'],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const screenshotSrcs = [
  { src: '/apps/369_Homescreen.webp', key: 'home' },
  { src: '/apps/369_Inspire.webp', key: 'inspire' },
  { src: '/apps/369_VisionBoard_generated.webp', key: 'visionBoard' },
  { src: '/apps/369_createVision.webp', key: 'createVision' },
  { src: '/apps/369_meditation.webp', key: 'meditation' },
  { src: '/apps/369_more.webp', key: 'more' },
  { src: '/apps/369_meditationCategories.webp', key: 'meditationCategories' },
  { src: '/apps/369_timer.webp', key: 'timer' },
];

const ThreeSixNine = () => {
  const { t, i18n } = useTranslation('threeSixNine');
  const { t: tc } = useTranslation();
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

  const appStructuredData = useMemo(
    () =>
      generateAppStructuredData(
        "369 Manifestation",
        t('structured.description'),
        "https://elior.studio/apps/369_Homescreen.webp",
        "https://apps.apple.com/at/app/369-manifest/id6738690566",
        "LifestyleApplication",
        "4.8",
        "12000",
        t('structured.featureList', { returnObjects: true }) as string[],
        ["/apps/369_Homescreen.webp", "/apps/369_VisionBoard_generated.webp", "/apps/369_meditation.webp"],
        "2024-06-01",
        "55MB",
        "4+"
      ),
    [t],
  );

  const breadcrumbData = useMemo(
    () =>
      generateBreadcrumbData([
        { name: t('breadcrumb.home'), url: "https://elior.studio/" },
        { name: "369 Manifestation", url: "https://elior.studio/369" },
      ]),
    [t],
  );

  const faqData = useMemo(
    () =>
      generateFAQData(
        (t('faq', { returnObjects: true }) as { q: string; a: string }[]).map((f) => ({
          question: f.q,
          answer: f.a,
        })),
      ),
    [t],
  );

  const features = (
    t('features.items', { returnObjects: true }) as { title: string; description: string }[]
  ).map((f, i) => ({ ...f, icon: featureIcons[i] }));

  const screenshots = screenshotSrcs.map((s) => ({
    src: s.src,
    alt: t(`screenshots.alts.${s.key}`),
  }));

  useEffect(() => {
    if (location.pathname === '/369') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setMousePos({ x, y });
  };

  return (
    <>
      <SEO 
        title={t('seo.title')} tabTitle="369"
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        ogImage="https://elior.studio/apps/369_Homescreen.webp"
        ogType="product"
        canonical="https://elior.studio/369"
        structuredData={[appStructuredData, breadcrumbData, faqData]}
        appName="369 Manifestation"
        appCategory="LifestyleApplication"
        rating="4.8"
        reviewCount="12000"
        language={i18n.resolvedLanguage?.startsWith('de') ? 'de-AT' : 'en'}
      />
      <div ref={containerRef} className="relative min-h-screen" style={{ background: '#F1EDE6' }}>
      {/* Magical Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* 369 Numbers floating */}
        <MagicNumber number="3" delay={0} x="5%" y="10%" />
        <MagicNumber number="6" delay={2} x="80%" y="20%" />
        <MagicNumber number="9" delay={4} x="15%" y="60%" />
        <MagicNumber number="3" delay={1} x="75%" y="70%" />
        <MagicNumber number="6" delay={3} x="40%" y="85%" />
        
        {/* Floating Flowers/Lotus */}
        <FloatingFlower delay={0} x="10%" y="30%" size={80} />
        <FloatingFlower delay={1.5} x="85%" y="40%" size={60} />
        <FloatingFlower delay={3} x="20%" y="75%" size={100} />
        <FloatingFlower delay={2} x="70%" y="15%" size={50} />
        
        {/* Sparkle particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Sparkle 
              className="text-teal-400/30" 
              size={Math.random() * 20 + 10}
            />
          </motion.div>
        ))}
        
        {/* Manifestation particles rising */}
        {[...Array(8)].map((_, i) => (
          <ManifestationParticle key={`particle-${i}`} delay={i} />
        ))}
        
        {/* Soft glow orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(32, 178, 170, 0.1) 0%, transparent 70%)',
            left: '10%',
            top: '20%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [-20, 20, -20],
            y: [-20, 20, -20],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147, 112, 219, 0.08) 0%, transparent 70%)',
            right: '10%',
            bottom: '20%',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [20, -20, 20],
            y: [20, -20, 20],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

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
            {tc('appCommon.backToElior')}
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
              background: 'radial-gradient(circle, rgba(100, 200, 200, 0.25) 0%, transparent 70%)',
            }}
          />
          <div 
            className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(180, 140, 200, 0.2) 0%, transparent 70%)',
            }}
          />
        </motion.div>

        {/* Mandala decoration in hero */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <MandalaRing size={400} duration={60} />
          <MandalaRing size={500} duration={80} reverse />
          <BreathingCircle />
        </div>

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
              <motion.div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #20B2AA 0%, #9370DB 100%)',
                  boxShadow: '0 8px 24px rgba(32, 178, 170, 0.3)',
                }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <span className="text-white font-serif text-2xl font-bold">369</span>
              </motion.div>
              <div>
                <h1 className="font-serif text-3xl" style={{ color: '#20B2AA' }}>369</h1>
                <p className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.6)' }}>{t('hero.tagline')}</p>
              </div>
            </motion.div>

            <motion.h2 
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
              style={{ color: '#525240' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t('hero.title1')}
              <br />
              <span style={{ color: '#20B2AA' }}>{t('hero.title2')}</span>
            </motion.h2>

            <motion.p 
              className="text-lg mb-8 max-w-md"
              style={{ color: 'rgba(82, 82, 64, 0.7)' }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.a
                href="https://apps.apple.com/at/app/369-manifestation-meditation/id1663677921"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all"
                style={{
                  background: '#20B2AA',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(32, 178, 170, 0.3)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(32, 178, 170, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                {t('hero.download')}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            className="flex justify-center md:justify-end relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          >
            {/* Sun/Moon decorations */}
            <motion.div
              className="absolute -top-8 -left-8 text-5xl"
              animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              <Sun className="w-12 h-12 text-amber-400/30" />
            </motion.div>
            <motion.div
              className="absolute -bottom-5 -right-5 text-4xl"
              animate={{ rotate: [0, -15, 15, 0], y: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Moon className="w-10 h-10 text-purple-400/30" />
            </motion.div>

            <motion.div
              className="relative p-4 md:p-6 rounded-[40px]"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                transition: 'transform 0.3s ease-out',
                background: '#F7F3ED',
                boxShadow: `
                  inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                  inset -3px -3px 6px rgba(82, 82, 64, 0.05),
                  20px 20px 40px rgba(32, 178, 170, 0.15),
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
                  src="/apps/369_Homescreen.webp"
                  alt={t('hero.imageAlt')}
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
            <motion.span 
              className="font-serif italic text-sm tracking-[0.3em] block mb-6"
              style={{ color: '#20B2AA' }}
            >
              {t('features.eyebrow')}
            </motion.span>
            <h2 
              className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ color: '#525240' }}
            >
              {t('features.title')}
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
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-8 rounded-[32px] relative overflow-hidden"
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
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0"
                  whileHover={{ opacity: 1 }}
                  style={{
                    background: `radial-gradient(circle at center, ${idx === 0 ? 'rgba(32, 178, 170, 0.1)' : idx === 1 ? 'rgba(147, 112, 219, 0.1)' : 'rgba(100, 200, 200, 0.1)'}, transparent)`,
                  }}
                />
                <motion.div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10"
                  style={{
                    background: 'rgba(32, 178, 170, 0.1)',
                  }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: '#20B2AA' }} />
                </motion.div>
                <h3 
                  className="font-serif text-2xl mb-4 relative z-10"
                  style={{ color: '#525240' }}
                >
                  {feature.title}
                </h3>
                <p className="relative z-10" style={{ color: 'rgba(82, 82, 64, 0.6)' }}>
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
            <motion.span 
              className="font-serif italic text-sm tracking-[0.3em] block mb-6"
              style={{ color: '#20B2AA' }}
            >
              {t('screenshots.eyebrow')}
            </motion.span>
            <h2 
              className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ color: '#525240' }}
            >
              {t('screenshots.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {screenshots.map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                whileHover={{ y: -10, scale: 1.02, rotate: idx % 2 === 0 ? -2 : 2 }}
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
                {t('benefits.title')}
              </h2>
              <div className="space-y-6">
                {(t('benefits.items', { returnObjects: true }) as string[]).map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(32, 178, 170, 0.12)',
                      }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Star className="w-4 h-4" style={{ color: '#20B2AA' }} />
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
              className="flex justify-center relative"
            >
              {/* Rotating mandala decoration */}
              <motion.div
                className="absolute w-64 h-64 rounded-full border-2 border-dashed border-teal-400/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-80 h-80 rounded-full border border-purple-400/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              />

              <div
                className="p-4 rounded-[40px] relative z-10"
                style={{
                  background: '#F1EDE6',
                  boxShadow: `
                    inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                    inset -3px -3px 6px rgba(82, 82, 64, 0.04),
                    16px 16px 32px rgba(32, 178, 170, 0.1),
                    -16px -16px 32px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <img
                  src="/apps/369_VisionBoard_generated.webp"
                  alt={t('benefits.imageAlt')}
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
          className="max-w-4xl mx-auto text-center relative"
        >
          {/* Floating decorations */}
          <motion.div
            className="absolute -top-10 left-10 text-4xl"
            animate={{ y: [-10, 10, -10], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute -bottom-5 right-10 text-3xl"
            animate={{ y: [10, -10, 10], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🌙
          </motion.div>
          <motion.div
            className="absolute top-1/2 -left-5 text-2xl"
            animate={{ rotate: [0, 360], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            ☀️
          </motion.div>

          <div
            className="p-12 md:p-16 rounded-[40px] relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #20B2AA 0%, #9370DB 100%)',
              boxShadow: '0 32px 64px rgba(32, 178, 170, 0.3)',
            }}
          >
            {/* Animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, white 2px, transparent 2px)',
                backgroundSize: '40px 40px',
              }}
              animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <h2 
              className="font-serif text-4xl md:text-5xl text-white mb-6 relative z-10"
            >
              {t('cta.title')}
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto relative z-10">
              {t('cta.description')}
            </p>
            <motion.a
              href="https://apps.apple.com/at/app/369-manifestation-meditation/id1663677921"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium relative z-10"
              style={{
                background: 'white',
                color: '#20B2AA',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              {t('cta.button')}
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8" style={{ background: '#E8E5E0' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #20B2AA 0%, #9370DB 100%)' }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-white font-serif text-xs font-bold">369</span>
            </motion.div>
            <span className="font-serif text-xl" style={{ color: '#525240' }}>369</span>
          </div>
          <p className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.5)' }}>
            © 2024 369 Manifestation App. {t('footer.productBy')}
          </p>
          <Link 
            to="/"
            className="flex items-center gap-2 text-sm"
            style={{ color: '#20B2AA' }}
          >
            {tc('appCommon.visitElior')}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
    </>
  );
};

export default ThreeSixNine;
