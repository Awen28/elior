import { useRef, useState, useEffect, Fragment, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Sun, CloudSun, Moon, BookOpen, Sprout, MessageCircleHeart, Settings, Download, ChevronRight, Heart, Feather, HandHeart, Sparkles, FlameKindling, Cross, Church, CircleDot, HeartCrack, Eye, MessageSquareText, VolumeX } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO, generateAppStructuredData, generateBreadcrumbData, generateFAQData } from '../components/SEO';

// Elior brand palette - warm stone, paper, olive & gold
const SAND = '#BBB1A4';
const SAND_SOFT = '#F5F1EA';
const SAGE = '#525342';
const SAGE_SOFT = '#E4DCCE';
const OCHRE = '#C9A97B';
const TERRACOTTA = '#9A7A50';
const INK = '#26241F';
const INK_SOFT = 'rgba(38, 36, 31, 0.65)';
const IVORY = '#EDE8DD';

const stepIcons = [Sun, CloudSun, Moon];

const featureIcons = [
  MessageCircleHeart,
  BookOpen,
  Sprout,
  Heart,
  CircleDot,
  Church,
  Cross,
  HeartCrack,
  MessageSquareText,
  VolumeX,
  Eye,
  Settings,
];

const prayerPathIcons = [CircleDot, Church, Cross];
const screenshotKeys = ['home', 'prayer', 'wishes', 'meditation', 'progress', 'heartTalk'];

const prayerPathColors = [OCHRE, TERRACOTTA, SAGE];
const prayerPathSofts = [`${OCHRE}15`, `${TERRACOTTA}15`, `${SAGE}15`];

// Data will be loaded via i18next in component

const gentleFloat = {
  animate: { y: [-6, 6, -6], opacity: [0.5, 0.8, 0.5] },
  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const },
};

const sighAnimation = {
  animate: { scale: [1, 1.12, 1], opacity: [0.35, 0.15, 0.35] },
  transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const },
};

const Abwun = () => {
  const { t, i18n } = useTranslation('abwun');
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

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  useEffect(() => {
    if (location.pathname === '/abwun') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location]);

  const appStructuredData = useMemo(
    () =>
      generateAppStructuredData(
        'ABWUN',
        t('structured.description'),
        'https://elior.studio/apps/Abwun_home.webp',
        'https://apps.apple.com/us/app/abwun/id6810855629',
        'ReferenceApplication',
        '4.9',
        '4800',
        t('structured.featureList', { returnObjects: true }) as string[],
        ['/apps/Abwun_home.webp', '/apps/Abwun_prayer.webp', '/apps/Abwun_wishes.webp', '/apps/Abwun_heartTalk.webp', '/apps/Abwun_meditation.webp'],
        '2026-06-01',
        '45MB',
        '4+',
      ),
    [t],
  );

  const breadcrumbData = useMemo(
    () =>
      generateBreadcrumbData([
        { name: 'Home', url: 'https://elior.studio/' },
        { name: 'ABWUN', url: 'https://elior.studio/abwun' },
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

  const steps = (t('steps.items', { returnObjects: true }) as any[]).map((s, i) => ({
    ...s,
    icon: stepIcons[i],
  }));
  const features = (t('features.items', { returnObjects: true }) as any[]).map((f, i) => ({
    ...f,
    icon: featureIcons[i],
  }));
  const prayerPaths = (t('prayerPaths.items', { returnObjects: true }) as {
    label: string;
    title: string;
    verse: string;
    points: string[];
  }[]).map((p, i) => ({
    ...p,
    icon: prayerPathIcons[i],
    color: prayerPathColors[i],
    soft: prayerPathSofts[i],
  }));
  const lamentSteps = t('lament.steps', { returnObjects: true }) as any[];
  const gratitude = t('gratitude.items', { returnObjects: true }) as string[];
  const screenshots = screenshotKeys.map((key) => ({
    src: `/apps/Abwun_${key}.webp`,
    alt: t(`screenshots.alts.${key}`),
  }));
  const languageChips = t('languageChips', { returnObjects: true }) as any;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePos({ x, y });
  };

  return (
    <Fragment>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        ogImage="https://elior.studio/apps/Abwun_home.webp"
        ogType="product"
        canonical="https://elior.studio/abwun"
        structuredData={[appStructuredData, breadcrumbData, faqData]}
        appName="ABWUN"
        appCategory="ReferenceApplication"
        rating="4.9"
        reviewCount="4800"
        language={i18n.resolvedLanguage?.startsWith('de') ? 'de-AT' : 'en'}
      />
      <div ref={containerRef} className="relative min-h-screen" style={{ background: IVORY }}>
        {/* Animated calm background - soft breathing light */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201, 169, 123, 0.1) 0%, transparent 70%)' }}
            variants={sighAnimation}
            animate="animate"
          />
          <motion.div
            className="absolute top-1/3 -right-24 w-[450px] h-[450px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(82, 83, 66, 0.12) 0%, transparent 70%)' }}
            variants={sighAnimation}
            animate="animate"
            transition={{ delay: 1.5 }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(154, 122, 80, 0.1) 0%, transparent 70%)' }}
            variants={sighAnimation}
            animate="animate"
            transition={{ delay: 3 }}
          />

          {/* Floating feathers - subtle easter egg */}
          <motion.div
            className="absolute top-[18%] right-[12%]"
            variants={gentleFloat}
            animate="animate"
            transition={{ duration: 7 }}
          >
            <Feather className="w-6 h-6" style={{ color: SAGE, opacity: 0.4 }} />
          </motion.div>
          <motion.div
            className="absolute bottom-[25%] left-[8%]"
            variants={gentleFloat}
            animate="animate"
            transition={{ duration: 9, delay: 2 }}
          >
            <Feather className="w-4 h-4" style={{ color: TERRACOTTA, opacity: 0.35 }} />
          </motion.div>

          {/* Gentle rising prayer particles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: OCHRE,
                left: `${15 + i * 22}%`,
                boxShadow: '0 0 8px rgba(201, 169, 123, 0.4)',
              }}
              animate={{ y: [0, -220], opacity: [0, 0.5, 0] }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i * 1.7, ease: 'linear' }}
            />
          ))}
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
                color: INK,
                boxShadow: '0 4px 12px rgba(38, 36, 31, 0.08)',
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
              className="absolute top-[15%] left-[5%] w-[600px] h-[600px] rounded-full opacity-40"
              style={{ background: 'radial-gradient(circle, rgba(201, 169, 123, 0.18) 0%, transparent 70%)' }}
            />
            <div
              className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full opacity-35"
              style={{ background: 'radial-gradient(circle, rgba(82, 83, 66, 0.22) 0%, transparent 70%)' }}
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
                    background: 'linear-gradient(135deg, #C9A97B 0%, #525342 100%)',
                    boxShadow: '0 8px 32px rgba(201, 169, 123, 0.35)',
                  }}
                >
                  <HandHeart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl" style={{ color: INK }}>ABWUN</h1>
                  <p className="text-sm" style={{ color: INK_SOFT }}>{t('hero.tagline')}</p>
                </div>
              </motion.div>

              <motion.h2
                className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
                style={{ color: INK }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {t('hero.title1')}
                <br />
                <span style={{ color: OCHRE }}>{t('hero.title2')}</span>
              </motion.h2>

              <motion.p
                className="text-lg mb-8 max-w-md"
                style={{ color: INK_SOFT }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t('hero.description')}
              </motion.p>

              {/* Verse - subtle highlighted quote */}
              <motion.div
                className="mb-8 px-5 py-4 rounded-2xl border-l-4"
                style={{
                  background: `${SAGE_SOFT}55`,
                  borderColor: SAGE,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.45 }}
              >
                <p className="font-serif italic text-sm md:text-base" style={{ color: INK_SOFT }}>
                  {t('hero.verse')}
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <a
                  href="https://apps.apple.com/us/app/abwun/id6810855629"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #C9A97B 0%, #525342 100%)',
                    color: 'white',
                    boxShadow: '0 8px 24px rgba(201, 169, 123, 0.35)',
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
                  background: SAND_SOFT,
                  boxShadow: `
                    inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                    inset -3px -3px 6px rgba(38, 36, 31, 0.05),
                    20px 20px 40px rgba(201, 169, 123, 0.15),
                    -20px -20px 40px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <div
                  className="p-3 rounded-[28px]"
                  style={{
                    background: IVORY,
                    boxShadow: `
                      inset 2px 2px 4px rgba(38, 36, 31, 0.04),
                      inset -2px -2px 4px rgba(255, 255, 255, 0.8)
                    `,
                  }}
                >
                  <img
                    src="/apps/Abwun_home.webp"
                    alt={t('hero.imageAlt')}
                    className="w-[260px] md:w-[300px] h-auto rounded-[24px]"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Meaning Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: SAND_SOFT }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: OCHRE }}>
                  {t('meaning.eyebrow')}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl mb-8" style={{ color: INK }}>
                  {t('meaning.title')}
                </h2>
                <p className="text-lg mb-6" style={{ color: INK_SOFT }}>{t('meaning.paragraphs.0')}</p>
                <p className="text-lg mb-6" style={{ color: INK_SOFT }}>{t('meaning.paragraphs.1')}</p>
                <div className="flex flex-wrap gap-3">
                  {['en', 'de', 'it', 'es', 'ro'].map((key, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full text-xs"
                      style={{
                        background: SAGE_SOFT,
                        color: '#525342',
                        boxShadow: `
                          inset 1px 1px 2px rgba(255, 255, 255, 0.8),
                          inset -1px -1px 2px rgba(38, 36, 31, 0.04)
                        `,
                      }}
                    >
                      {languageChips[key]}
                    </span>
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
                  className="p-8 md:p-12 rounded-[40px] text-center"
                  style={{
                    background: SAND,
                    boxShadow: `
                      inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                      inset -3px -3px 6px rgba(38, 36, 31, 0.05),
                      16px 16px 32px rgba(201, 169, 123, 0.1),
                      -16px -16px 32px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex items-center gap-3 mb-6"
                  >
                    <FlameKindling className="w-5 h-5" style={{ color: OCHRE }} />
                    <span className="font-serif italic text-2xl" style={{ color: INK }}>
                      Abwun...
                    </span>
                  </motion.div>
                  <p className="font-serif italic text-sm mb-6" style={{ color: INK_SOFT }}>
                    {t('meaning.intro')}
                  </p>
                  <p className="font-serif text-3xl md:text-4xl mb-4" style={{ color: INK }}>
                    {t('meaning.aramaic')}
                  </p>
                  <p className="font-serif text-lg mb-6" style={{ color: INK_SOFT }}>
                    {t('meaning.translation')}
                  </p>
                  <div className="w-16 h-px mx-auto mb-6" style={{ background: SAGE }} />
                  <p className="font-serif italic text-lg" style={{ color: TERRACOTTA }}>
                    {t('meaning.footerVerse')}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ego Death / Not Manifestation Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: IVORY }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: OCHRE }}>
                {t('idea.eyebrow')}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: INK }}>
                {t('idea.title')}
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: INK_SOFT }}>
                {t('idea.description')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Manifestation */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-10 rounded-[32px]"
                style={{
                  background: '#F5F1EA',
                  boxShadow: `
                    inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                    inset -2px -2px 4px rgba(38, 36, 31, 0.03)
                  `,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#D8D0C0' }}>
                    <Sparkles className="w-5 h-5" style={{ color: 'rgba(82, 83, 66, 0.45)' }} />
                  </div>
                <h3 className="font-serif text-2xl" style={{ color: INK_SOFT }}>{t('idea.manifestation.title')}</h3>
              </div>
              <ul className="space-y-4">
                {(t('idea.manifestation.items', { returnObjects: true }) as string[]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: 'rgba(82, 83, 66, 0.45)', opacity: 0.5 }} />
                      <span style={{ color: 'rgba(38, 36, 31, 0.45)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* ABWUN */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="p-10 rounded-[32px] relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #BBB1A4 0%, #EDE8DD 100%)',
                  boxShadow: `
                    inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                    inset -2px -2px 4px rgba(38, 36, 31, 0.04),
                    12px 12px 24px rgba(82, 83, 66, 0.15),
                    -12px -12px 24px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: SAGE }}>
                    <HandHeart className="w-5 h-5 text-white" />
                  </div>
                <h3 className="font-serif text-2xl" style={{ color: INK }}>{t('idea.abwun.title')}</h3>
              </div>
              <ul className="space-y-4">
                {(t('idea.abwun.items', { returnObjects: true }) as string[]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: SAGE }} />
                      <span style={{ color: INK_SOFT }}>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Soft glow easter egg */}
                <motion.div
                  className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(82, 83, 66, 0.25) 0%, transparent 70%)' }}
                  variants={sighAnimation}
                  animate="animate"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mt-16"
            >
              <p className="font-serif italic text-lg" style={{ color: TERRACOTTA }}>
                {t('idea.verse')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Three Surrenders Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: SAND_SOFT }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: OCHRE }}>
                {t('steps.eyebrow')}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: INK }}>
                {t('steps.title')}
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: INK_SOFT }}>
                {t('steps.description')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-[32px]"
                  style={{
                    background: IVORY,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(38, 36, 31, 0.04),
                      8px 8px 16px rgba(38, 36, 31, 0.06),
                      -8px -8px 16px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${step.color}22` }}
                    >
                      <step.icon className="w-7 h-7" style={{ color: step.color }} />
                    </div>
                    <span className="text-xs tracking-widest uppercase" style={{ color: INK_SOFT }}>
                      {step.time}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl mb-1" style={{ color: INK }}>
                    {step.title}
                  </h3>
                  <p className="font-serif italic mb-4" style={{ color: OCHRE }}>
                    {step.subtitle}
                  </p>
                  <p style={{ color: INK_SOFT }}>{step.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mt-16"
            >
              <p className="font-serif italic text-lg" style={{ color: TERRACOTTA }}>
                {t('steps.verse')}
              </p>
              <p className="font-serif italic text-sm mt-2" style={{ color: INK_SOFT }}>
                {t('steps.subverse')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Prayer Paths Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: IVORY }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: OCHRE }}>
                {t('prayerPaths.eyebrow')}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: INK }}>
                {t('prayerPaths.title')}
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: INK_SOFT }}>
                {t('prayerPaths.description')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {prayerPaths.map((path, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-[32px] relative overflow-hidden"
                  style={{
                    background: SAND_SOFT,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(38, 36, 31, 0.04),
                      8px 8px 16px rgba(38, 36, 31, 0.06),
                      -8px -8px 16px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: `linear-gradient(90deg, ${path.color}, transparent)` }}
                  />
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: path.soft }}
                    >
                      <path.icon className="w-7 h-7" style={{ color: path.color }} />
                    </div>
                    <span className="text-xs tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: `${path.color}18`, color: INK_SOFT }}>
                      {path.label}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl mb-1" style={{ color: INK }}>
                    {path.title}
                  </h3>
                  <p className="font-serif italic text-sm mb-6" style={{ color: path.color }}>
                    {path.verse}
                  </p>
                  <ul className="space-y-4">
                    {path.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: path.color }} />
                        <span style={{ color: INK_SOFT }}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: IVORY }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: OCHRE }}>
                {t('features.eyebrow')}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: INK }}>
                {t('features.title')}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-[32px]"
                  style={{
                    background: SAND_SOFT,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(38, 36, 31, 0.04),
                      8px 8px 16px rgba(38, 36, 31, 0.06),
                      -8px -8px 16px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: `${SAGE}22` }}
                  >
                    <feature.icon className="w-7 h-7" style={{ color: '#9A7A50' }} />
                  </div>
                  <h3 className="font-serif text-2xl mb-4" style={{ color: INK }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: INK_SOFT }}>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lament & Unanswered Prayer Section */}
        <section className="py-32 px-6 md:px-8 relative overflow-hidden" style={{ background: SAND_SOFT }}>
          {/* Soft dimmed glow - quiet heaviness */}
          <motion.div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(154, 122, 80, 0.12) 0%, transparent 70%)' }}
            variants={sighAnimation}
            animate="animate"
          />
          <div className="max-w-7xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: TERRACOTTA }}>
                {t('lament.eyebrow')}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: INK }}>
                {t('lament.title')}
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: INK_SOFT }}>
                {t('lament.description')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {lamentSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-[32px]"
                  style={{
                    background: IVORY,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(38, 36, 31, 0.04),
                      8px 8px 16px rgba(38, 36, 31, 0.06),
                      -8px -8px 16px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg shrink-0"
                      style={{ background: `${TERRACOTTA}20` }}
                    >
                      <span style={{ color: TERRACOTTA }}>{idx + 1}</span>
                    </div>
                    <h3 className="font-serif text-xl leading-snug" style={{ color: INK }}>
                      {step.title}
                    </h3>
                  </div>
                  <p style={{ color: INK_SOFT }}>{step.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mt-16"
            >
              <p className="font-serif italic text-lg" style={{ color: TERRACOTTA }}>
                {t('lament.footer')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Inner Freedom / Gratitude Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: SAND_SOFT }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex justify-center md:order-2"
              >
                <div
                  className="p-4 md:p-6 rounded-[40px]"
                  style={{
                    background: SAND,
                    boxShadow: `
                      inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                      inset -3px -3px 6px rgba(38, 36, 31, 0.05),
                      16px 16px 32px rgba(201, 169, 123, 0.1),
                      -16px -16px 32px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <div
                    className="p-3 rounded-[28px]"
                    style={{
                      background: IVORY,
                      boxShadow: `
                        inset 2px 2px 4px rgba(38, 36, 31, 0.04),
                        inset -2px -2px 4px rgba(255, 255, 255, 0.8)
                      `,
                    }}
                  >
                    <img
                      src="/apps/Abwun_prayer.webp"
                      alt={t('gratitude.imageAlt')}
                      className="w-[280px] h-auto rounded-[24px]"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:order-1"
              >
                <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: OCHRE }}>
                  {t('gratitude.eyebrow')}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl mb-8" style={{ color: INK }}>
                  {t('gratitude.title')}
                </h2>
                <p className="text-lg mb-8" style={{ color: INK_SOFT }}>
                  {t('gratitude.description')}
                </p>
                <div className="space-y-5">
                  {gratitude.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="flex items-center gap-4"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${SAGE}22` }}
                      >
                        <Heart className="w-4 h-4" style={{ color: SAGE }} />
                      </div>
                      <span style={{ color: INK_SOFT }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Screenshots Gallery */}
        <section className="py-32 px-6 md:px-8" style={{ background: IVORY }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: OCHRE }}>
                {t('screenshots.eyebrow')}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: INK }}>
                {t('screenshots.title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
                    background: SAND_SOFT,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(38, 36, 31, 0.04),
                      6px 6px 12px rgba(38, 36, 31, 0.06),
                      -6px -6px 12px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className="w-full h-auto rounded-[16px]"
                  />
                  <p className="text-center text-xs mt-3 mb-1" style={{ color: INK_SOFT }}>
                    {screenshot.alt}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: SAND_SOFT }}>
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
                background: 'linear-gradient(135deg, #C9A97B 0%, #525342 100%)',
                boxShadow: '0 32px 64px rgba(201, 169, 123, 0.35)',
              }}
            >
              {/* Gentle light rays easter egg */}
              <motion.div
                className="absolute inset-0 opacity-25"
                animate={{
                  background: [
                    'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.4) 0%, transparent 40%)',
                    'radial-gradient(circle at 75% 50%, rgba(255,255,255,0.4) 0%, transparent 40%)',
                    'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.4) 0%, transparent 40%)',
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />

              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 relative z-10">
                {t('cta.title')}
              </h2>
              <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto relative z-10">
                {t('cta.description')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center relative z-10">
                <a
                  href="https://apps.apple.com/us/app/abwun/id6810855629"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: 'white',
                    color: '#9A7A50',
                  }}
                >
                  <Download className="w-5 h-5" />
                  {t('cta.button')}
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 md:px-8" style={{ background: '#D8D0C0' }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C9A97B 0%, #525342 100%)' }}
              >
                <HandHeart className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl" style={{ color: INK }}>ABWUN</span>
            </div>
            <p className="text-sm" style={{ color: INK_SOFT }}>
              © 2026 ABWUN. {t('footer.productBy')}
            </p>
            <Link
              to="/"
              className="flex items-center gap-2 text-sm"
              style={{ color: '#9A7A50' }}
            >
              {t('footer.visitElior')}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default Abwun;