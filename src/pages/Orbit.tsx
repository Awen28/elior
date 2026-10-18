import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Rocket, Star, Zap, Target, ChevronRight, Download, Sparkles, Circle, Trophy, Infinity as InfinityIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO, generateAppStructuredData, generateBreadcrumbData, generateFAQData } from '../components/SEO';

const featureIcons = [Rocket, Target, Zap, Trophy, InfinityIcon, Sparkles];

const galleryItems = [
  { key: 'home', src: '/apps/orbit_home.webp' },
  { key: 'gameplay1', src: '/apps/orbit_gameplay1.webp' },
  { key: 'gameplay2', src: '/apps/orbit_gameplay2.pn.webp' },
  { key: 'gameplay3', src: '/apps/orbit_gameplay3.pn.webp' },
];

// Easter egg components
const FloatingStar = ({ delay, size = 'small' }: { delay: number; size?: 'small' | 'medium' | 'large' }) => {
  const sizeClass = size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-3 h-3' : 'w-4 h-4';
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: [0, 1, 0],
        y: [0, -150],
        x: [0, Math.random() * 60 - 30],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{ 
        duration: 4 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
      className="absolute pointer-events-none z-20"
      style={{ left: `${Math.random() * 100}%`, top: '90%' }}
    >
      <Star className={sizeClass} style={{ color: '#BBB1A4', fill: '#BBB1A4' }} />
    </motion.div>
  );
};

const OrbitingPlanet = ({ size, color, duration, orbitRadius, offset = 0 }: { size: number; color: string; duration: number; orbitRadius: number; offset?: number }) => (
  <motion.div
    initial={{ rotate: offset }}
    animate={{ rotate: offset + 360 }}
    transition={{ duration, repeat: Infinity, ease: "linear" }}
    className="absolute pointer-events-none z-10"
    style={{ 
      left: `calc(50% + ${Math.cos(offset * Math.PI / 180) * orbitRadius}px)`, 
      top: `calc(50% + ${Math.sin(offset * Math.PI / 180) * orbitRadius}px)`,
    }}
  >
    <motion.div 
      animate={{ 
        boxShadow: [
          `0 0 ${size/2}px ${color}`,
          `0 0 ${size}px ${color}`,
          `0 0 ${size/2}px ${color}`,
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
      className="rounded-full"
      style={{ 
        width: size, 
        height: size, 
        background: color,
      }}
    />
  </motion.div>
);

const ShootingStar = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: 0, y: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      x: [0, 400],
      y: [0, 200],
    }}
    transition={{ 
      duration: 1.5,
      delay,
      repeat: Infinity,
      repeatDelay: 6,
    }}
    className="absolute pointer-events-none z-20"
    style={{ left: `${10 + (delay * 10) % 70}%`, top: '10%' }}
  >
    <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
  </motion.div>
);

const Asteroid = ({ delay, size }: { delay: number; size: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -100, y: -50, rotate: 0 }}
    animate={{ 
      opacity: [0, 0.6, 0],
      x: [-100, 500],
      y: [-50, 300],
      rotate: 360,
    }}
    transition={{ 
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute pointer-events-none z-10"
    style={{ left: '10%', top: '20%' }}
  >
    <div 
      className="rounded-full"
      style={{ 
        width: size, 
        height: size, 
        background: 'radial-gradient(circle at 30% 30%, #4a4a5a, #2a2a3a)',
        boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.1)',
      }}
    />
  </motion.div>
);

const Orbit = () => {
  const { t, i18n } = useTranslation('orbit');
  const { t: tc } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const appStructuredData = useMemo(
    () =>
      generateAppStructuredData(
        'Orbit',
        t('structured.description'),
        'https://elior.studio/apps/orbit_gameplay1.webp',
        'https://apps.apple.com/us/app/orbit-the-game/id6763136527',
        'GameApplication',
        '5.0',
        '100',
        t('structured.featureList', { returnObjects: true }) as string[],
        ['/apps/orbit_home.webp', '/apps/orbit_gameplay1.webp', '/apps/orbit_gameplay2.pn.webp', '/apps/orbit_gameplay3.pn.webp'],
        '2026-01-15',
        '80MB',
        '4+',
      ),
    [t],
  );

  const breadcrumbData = useMemo(
    () =>
      generateBreadcrumbData([
        { name: 'Home', url: 'https://elior.studio/' },
        { name: 'Orbit', url: 'https://elior.studio/orbit' },
      ]),
    [],
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

  const screenshots = galleryItems.map(({ key, src }) => ({ src, alt: t(`gallery.alts.${key}`) }));
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBackClick = () => {
    sessionStorage.setItem('orbitScrollPosition', window.scrollY.toString());
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0a12' }}>
      <SEO 
        title={t('seo.title')} tabTitle="Orbit"
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        ogImage="https://elior.studio/apps/Elior_logo.webp"
        ogImageWidth={1080}
        ogImageHeight={1080}
        ogImageAlt="Orbit — Weltraum-Arcade-Spiel von Elior"
        ogType="product"
        canonical="https://elior.studio/orbit"
        structuredData={[appStructuredData, breadcrumbData, faqData]}
        appName="Orbit"
        appCategory="GameApplication"
        rating="5.0"
        reviewCount="100"
        language={i18n.resolvedLanguage?.startsWith('de') ? 'de-AT' : 'en'}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-8" style={{ background: 'rgba(10, 10, 18, 0.8)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" onClick={handleBackClick} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {tc('appCommon.backToElior')}
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #BBB1A4, #E3DED5)' }}>
              <Circle className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif text-2xl text-white">Orbit</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden min-h-screen flex items-center"
      >
        {/* Deep space background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a12 50%, #050508 100%)' }} />
          
          {/* Nebula effects */}
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(178, 159, 134, 0.15) 0%, transparent 60%)' }}
          />
          <motion.div
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.3, 1] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(233, 207, 185, 0.1) 0%, transparent 60%)' }}
          />
        </div>

        {/* Easter Eggs */}
        {[...Array(20)].map((_, i) => (
          <FloatingStar key={i} delay={i * 0.2} size={i % 4 === 0 ? 'large' : i % 2 === 0 ? 'medium' : 'small'} />
        ))}
        
        <OrbitingPlanet size={80} color="rgba(178, 159, 134, 0.2)" duration={30} orbitRadius={300} offset={0} />
        <OrbitingPlanet size={50} color="rgba(233, 207, 185, 0.15)" duration={25} orbitRadius={200} offset={120} />
        <OrbitingPlanet size={30} color="rgba(82, 82, 64, 0.2)" duration={20} orbitRadius={400} offset={240} />
        
        <ShootingStar delay={0} />
        <ShootingStar delay={4} />
        <ShootingStar delay={8} />

        {[...Array(3)].map((_, i) => (
          <Asteroid key={i} delay={i * 3} size={20 + i * 15} />
        ))}

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-serif italic text-sm tracking-[0.3em] block mb-4" 
                style={{ color: '#BBB1A4' }}
              >
                {t('hero.eyebrow')}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-5xl md:text-7xl leading-tight mb-6 text-white"
              >
                {t('hero.title1')}
                <br />
                <motion.span 
                  className="italic"
                  style={{ color: '#BBB1A4' }}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {t('hero.title2')}
                </motion.span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl mb-8 max-w-lg text-white/70"
              >
                {t('hero.description')}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="https://apps.apple.com/us/app/orbit-the-game/id6763136527"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #BBB1A4, #E3DED5)', color: '#0a0a12' }}
                >
                  <Download className="w-5 h-5" />
                  {t('hero.download')}
                </a>
                <Link
                  to="/#work"
                  onClick={handleBackClick}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105 border border-white/20 text-white hover:bg-white/5"
                >
                  {t('hero.viewMore')}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              {/* Claymorphism container */}
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 80px rgba(178, 159, 134, 0.3), inset 0 0 60px rgba(255,255,255,0.05)',
                    '0 0 100px rgba(178, 159, 134, 0.5), inset 0 0 80px rgba(255,255,255,0.1)',
                    '0 0 80px rgba(178, 159, 134, 0.3), inset 0 0 60px rgba(255,255,255,0.05)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative p-6 rounded-[50px]"
                style={{ 
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {/* Inner glow ring */}
                <div className="absolute -inset-2 rounded-[54px] -z-10" style={{ background: 'linear-gradient(135deg, rgba(178, 159, 134, 0.3), transparent 50%, rgba(233, 207, 185, 0.2))' }} />
                
                <div className="relative rounded-[40px] overflow-hidden" style={{ aspectRatio: '9/19.5', maxWidth: '280px' }}>
                  <img 
                    src="/apps/orbit_home.webp" 
                    alt={t('hero.imageAlt')}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <section ref={sectionRef} className="py-24 px-6 md:px-8 relative" style={{ background: '#0a0a12' }}>
        {/* Background gradient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center top, rgba(26, 26, 46, 0.5) 0%, transparent 50%)' }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="font-serif italic text-sm tracking-[0.3em] block mb-4"
              style={{ color: '#BBB1A4' }}
            >
              {t('features.eyebrow')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="font-serif text-4xl md:text-5xl text-white"
            >
              {t('features.title')}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="relative group"
              >
                {/* Claymorphism card */}
                <div 
                  className="relative p-8 rounded-3xl h-full"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Outer glow on hover */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute -inset-1 rounded-3xl -z-10 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(178, 159, 134, 0.3), transparent 60%)' }}
                  />
                  
                  {/* Inner highlight */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    }}
                  />

                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(178, 159, 134, 0.3), rgba(233, 207, 185, 0.2))',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 10px 40px rgba(178, 159, 134, 0.2)',
                    }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-serif text-xl mb-3 text-white relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50 relative z-10">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative py-24 px-6 md:px-8 overflow-hidden" style={{ background: '#0a0a12' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(26, 26, 46, 0.3) 0%, transparent 60%)' }} />
        
        {/* Floating stars background */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i * 0.2, delay: i * 0.1, repeat: Infinity }}
            className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{ 
              background: '#BBB1A4',
              left: `${5 + i * 10}%`,
              top: `${10 + (i % 5) * 15}%`,
              boxShadow: '0 0 10px rgba(178, 159, 134, 0.8)',
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.span className="font-serif italic text-sm tracking-[0.3em] block mb-4" style={{ color: '#BBB1A4' }}>
              {t('gallery.eyebrow')}
            </motion.span>
            <motion.h2 className="font-serif text-4xl md:text-5xl text-white">
              {t('gallery.title')}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {screenshots.map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -15, transition: { duration: 0.3 } }}
                className="relative group"
              >
                {/* Claymorphism frame */}
                <div 
                  className="relative p-4 rounded-3xl"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(178, 159, 134, 0.1)',
                  }}
                >
                  {/* Glow effect */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute -inset-2 rounded-3xl -z-10 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(178, 159, 134, 0.4), transparent 50%)' }}
                  />
                  
                  <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '9/16' }}>
                    <img 
                      src={screenshot.src} 
                      alt={screenshot.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <span className="text-white font-medium text-lg">{screenshot.alt}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-8 relative" style={{ background: '#0a0a12' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(178, 159, 134, 0.1) 0%, transparent 60%)' }} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-16 rounded-[40px] overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Animated border */}
            <motion.div
              animate={{ 
                boxShadow: [
                  'inset 0 0 40px rgba(178, 159, 134, 0.1)',
                  'inset 0 0 80px rgba(178, 159, 134, 0.2)',
                  'inset 0 0 40px rgba(178, 159, 134, 0.1)',
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-[40px]"
            />

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(135deg, #BBB1A4, #E3DED5)',
                  boxShadow: '0 0 60px rgba(178, 159, 134, 0.5)',
                }}
              >
                <Rocket className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
                {t('cta.description')}
              </p>
              <motion.a
                href="https://apps.apple.com/us/app/orbit-the-game/id6763136527"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-sm font-medium transition-all"
                style={{ background: 'linear-gradient(135deg, #BBB1A4, #E3DED5)', color: '#0a0a12' }}
              >
                <Download className="w-5 h-5" />
                {t('cta.button')}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8" style={{ background: '#050508', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #BBB1A4, #E3DED5)' }}>
              <Circle className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif text-2xl text-white">Orbit</span>
          </div>
          <p className="text-sm text-white/40">
            © 2026 Orbit. {t('footer.productBy')}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/orbit/privacy" className="text-sm text-white/40 hover:text-white/60 transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="/" onClick={handleBackClick} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
              {tc('appCommon.visitElior')}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Orbit;
