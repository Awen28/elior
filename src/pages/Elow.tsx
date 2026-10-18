import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Music, Zap, Layers, ChevronRight, Download, Volume2, Radio, Headphones, Mic2, Play, Pause } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO, generateAppStructuredData, generateBreadcrumbData, generateFAQData } from '../components/SEO';

const featureIcons = [Zap, Headphones, Layers, Volume2, Radio, Mic2];
const useCaseIcons = [Headphones, Mic2, Zap, Radio, Music];
const genreColors = ['#BBB1A4', '#E3DED5', '#D4C4A8', '#C9B896', '#A89F91', '#8B7355'];
const screenshotKeys = ['homescreen', 'create', 'moodSong', 'genre', 'occasion', 'details', 'player', 'library'];

// Audio visualizer bars animation
const VisualizerBar = ({ delay, height }: { delay: number; height: number }) => (
  <motion.div
    className="w-1.5 rounded-full bg-gradient-to-t from-[#BBB1A4] to-[#E3DED5]"
    animate={{
      height: [height * 0.3, height, height * 0.3],
      opacity: [0.6, 1, 0.6],
    }}
    transition={{
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  />
);

const Elow = () => {
  const { t, i18n } = useTranslation('elow');
  const { t: tc } = useTranslation();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const appStructuredData = useMemo(
    () =>
      generateAppStructuredData(
        'Elow',
        t('structured.description'),
        'https://elior.studio/apps/elow_homescreen.webp',
        'https://apps.apple.com/at/app/elow/id6742148929',
        'MusicApplication',
        '4.8',
        '5200',
        t('structured.featureList', { returnObjects: true }) as string[],
        ['/apps/elow_homescreen.webp', '/apps/elow_create.webp', '/apps/elow_moodSong.webp', '/apps/elow_genre.webp', '/apps/elow_player.webp'],
        '2026-01-01',
        '90MB',
        '4+',
      ),
    [t],
  );

  const breadcrumbData = useMemo(
    () =>
      generateBreadcrumbData([
        { name: t('breadcrumb.home'), url: 'https://elior.studio/' },
        { name: 'Elow', url: 'https://elior.studio/elow' },
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

  const genres = (t('genres.items', { returnObjects: true }) as string[]).map((name, i) => ({
    name,
    color: genreColors[i],
  }));

  const screenshots = screenshotKeys.map((key) => ({
    src: `/apps/elow_${key}.webp`,
    alt: t(`screenshots.alts.${key}`),
  }));

  const useCases = (t('useCases.items', { returnObjects: true }) as string[]).map((text, i) => ({
    text,
    icon: useCaseIcons[i],
  }));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    if (location.pathname === '/elow') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location]);

  useEffect(() => {
    audioRef.current = new Audio('https://storage.googleapis.com/elow-f73f2.firebasestorage.app/songs/MjIz2wOyX4UNYEVumgmv/variant1.mp3');
    audioRef.current.addEventListener('timeupdate', () => {
      if (audioRef.current) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    });
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
    });
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePos({ x, y });
  };

  return (
    <>
      <SEO
        title={t('seo.title')} tabTitle="Elow"
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        ogImage="https://elior.studio/apps/Elow%20Logo.webp"
        ogImageWidth={1024}
        ogImageHeight={1024}
        ogImageAlt="Elow — App-Logo"
        ogType="product"
        canonical="https://elior.studio/elow"
        structuredData={[appStructuredData, breadcrumbData, faqData]}
        appName="Elow"
        appCategory="MusicApplication"
        rating="4.8"
        reviewCount="5200"
        language={i18n.resolvedLanguage?.startsWith('de') ? 'de-AT' : 'en'}
      />
    <div ref={containerRef} className="relative min-h-screen" style={{ background: '#0a0a0f' }}>
      {/* Animated background waves */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full opacity-10" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <motion.path
            d="M0,400 Q360,300 720,400 T1440,400"
            stroke="url(#grad1)"
            strokeWidth="2"
            fill="none"
            animate={{
              d: [
                "M0,400 Q360,300 720,400 T1440,400",
                "M0,400 Q360,500 720,400 T1440,400",
                "M0,400 Q360,300 720,400 T1440,400"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,450 Q360,350 720,450 T1440,450"
            stroke="url(#grad2)"
            strokeWidth="2"
            fill="none"
            animate={{
              d: [
                "M0,450 Q360,350 720,450 T1440,450",
                "M0,450 Q360,550 720,450 T1440,450",
                "M0,450 Q360,350 720,450 T1440,450"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BBB1A4" />
              <stop offset="100%" stopColor="#E3DED5" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E3DED5" />
              <stop offset="100%" stopColor="#BBB1A4" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Floating music notes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <Music className="w-6 h-6" style={{ color: i % 2 === 0 ? '#BBB1A4' : '#E3DED5' }} />
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            {tc('appCommon.backToElior')}
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
            className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            }}
          />
          <div 
            className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
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
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #BBB1A4 0%, #E3DED5 100%)',
                  boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)',
                }}
              >
                <Radio className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-serif text-3xl text-white">Elow</h1>
                <p className="text-sm text-white/50">{t('hero.tagline')}</p>
              </div>
            </motion.div>

            <motion.h2 
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t('hero.title1')}
              <br />
              <span className="bg-gradient-to-r from-[#BBB1A4] to-[#E3DED5] bg-clip-text text-transparent">
                {t('hero.title2')}
              </span>
            </motion.h2>

            <motion.p 
              className="text-lg mb-8 max-w-md text-white/60"
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
              <a
                href="https://apps.apple.com/at/app/elow-generate-music/id6759220861"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #BBB1A4 0%, #E3DED5 100%)',
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
                }}
              >
                <Download className="w-4 h-4" />
                {t('hero.download')}
              </a>
            </motion.div>
          </motion.div>

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
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
              }}
            >
              <div
                className="p-3 rounded-[28px]"
                style={{
                  background: 'rgba(0,0,0,0.2)',
                }}
              >
                <img
                  src="/apps/elow_homescreen.webp"
                  alt={t('hero.imageAlt')}
                  className="w-[260px] md:w-[300px] h-auto rounded-[24px]"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Demo Song Section */}
      <section className="py-20 px-6 md:px-8" style={{ background: 'rgba(10,10,15,0.8)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="font-serif italic text-sm tracking-[0.3em] block mb-4 text-[#BBB1A4]">
              {t('demo.eyebrow')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              {t('demo.title')}
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">
              {t('demo.description')}
            </p>
          </motion.div>

          {/* Creative Audio Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative p-8 rounded-[32px] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: isPlaying 
                  ? [
                      'radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 70% 50%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)',
                    ]
                  : 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)'
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Album Art / Play Button */}
              <motion.button
                onClick={togglePlay}
                className="w-24 h-24 rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #BBB1A4 0%, #E3DED5 100%)',
                  boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div
                      key="pause"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <Pause className="w-10 h-10 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="play"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <Play className="w-10 h-10 text-white ml-1" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Pulsing ring when playing */}
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-white/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>

              {/* Song Info & Visualizer */}
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium text-white">{t('demo.songTitle')}</h3>
                    <p className="text-sm text-white/50">{t('demo.generatedBy')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#BBB1A4] px-2 py-1 rounded-full bg-[#BBB1A4]/10">{t('demo.aiBadge')}</span>
                  </div>
                </div>

                {/* Visualizer */}
                <div className="flex items-center gap-1 h-12 mb-4">
                  {[...Array(20)].map((_, i) => (
                    <VisualizerBar 
                      key={i} 
                      delay={i * 0.05} 
                      height={isPlaying ? 40 : 8}
                    />
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #BBB1A4, #E3DED5)',
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-white/40">
                  <span>{Math.floor((progress / 100) * 180 / 60)}:{String(Math.floor((progress / 100) * 180 % 60)).padStart(2, '0')}</span>
                  <span>~3:00</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Genre Tags */}
      <section className="py-20 px-6 md:px-8" style={{ background: 'rgba(10,10,15,0.8)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="font-serif italic text-sm tracking-[0.3em] block mb-4 text-[#BBB1A4]">
              {t('genres.eyebrow')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              {t('genres.title')}
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {genres.map((genre, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${genre.color}40`,
                  color: genre.color,
                }}
              >
                <span className="font-medium">{genre.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 md:px-8" style={{ background: 'rgba(10,10,15,0.9)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="font-serif italic text-sm tracking-[0.3em] block mb-6 text-[#E3DED5]">
              {t('features.eyebrow')}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
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
                className="p-8 rounded-[32px]"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
                  }}
                >
                  <feature.icon className="w-7 h-7 text-[#BBB1A4]" />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/50">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#0a0a0f' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="font-serif italic text-sm tracking-[0.3em] block mb-6 text-[#E3DED5]">
              {t('screenshots.eyebrow')}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              {t('screenshots.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {screenshots.map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-3 rounded-[24px] cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
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

      {/* Use Cases */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#0a0a0f' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl mb-8 text-white">
                {t('useCases.title')}
              </h2>
              <div className="space-y-6">
                {useCases.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(139, 92, 246, 0.15)',
                      }}
                    >
                      <item.icon className="w-5 h-5 text-[#BBB1A4]" />
                    </div>
                    <span className="text-white/70">{item.text}</span>
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
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
                }}
              >
                <img
                  src="/apps/elow_player.webp"
                  alt={t('useCases.imageAlt')}
                  className="w-[280px] h-auto rounded-[24px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-8" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #1a0b2e 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div
            className="p-12 md:p-16 rounded-[40px] relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 relative z-10">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto relative z-10">
              {t('cta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://apps.apple.com/at/app/elow-generate-music/id6759220861"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-105 relative z-10"
                style={{
                  background: 'linear-gradient(135deg, #BBB1A4 0%, #E3DED5 100%)',
                  color: 'white',
                }}
              >
                <Download className="w-5 h-5" />
                {t('cta.buttonIos')}
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.elow.sonova&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-105 relative z-10 border border-white/20 text-white hover:bg-white/5"
              >
                <Download className="w-5 h-5" />
                {t('cta.buttonAndroid')}
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8" style={{ background: '#050508' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #BBB1A4 0%, #E3DED5 100%)' }}
            >
              <Radio className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-2xl text-white">Elow</span>
          </div>
          <p className="text-sm text-white/40">
            © 2025 Elow. {t('footer.productBy')}
          </p>
          <Link 
            to="/"
            className="flex items-center gap-2 text-sm text-[#BBB1A4]"
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

export default Elow;
