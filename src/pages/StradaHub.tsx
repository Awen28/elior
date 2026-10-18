import { useRef, useState, useEffect, useMemo, Fragment } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, MapPin, AlertTriangle, Construction, Ban, TrafficCone, ShieldAlert, CheckCircle2, Bell, Map, Users, Timer, Smartphone, ChevronRight, Download, Navigation } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO, generateAppStructuredData, generateBreadcrumbData, generateFAQData } from '../components/SEO';

// Terracotta brand palette
const TERRACOTTA = '#C49070';
const CREAM = '#F1EDE6';
const CREAM_SOFT = '#F5F1EC';
const CREAM_DEEP = '#EDE6DF';
const INK = '#4A4038';
const INK_SOFT = 'rgba(74, 64, 56, 0.65)';

const categoryIcons = [AlertTriangle, Construction, Ban, TrafficCone, ShieldAlert, CheckCircle2];
const categoryColors = ['#E2574C', '#D9A441', '#C49070', '#7BA7BC', '#8B5E3C', '#6B8F71'];

const featureIcons = [MapPin, Map, Users, Timer, Bell, Smartphone];

const screenshotDefs = [
  { src: '/apps/stradaHub_categories.webp', key: 'categories' },
  { src: '/apps/stradaHub_create_control.webp', key: 'createControl' },
  { src: '/apps/stradaHub_create_closeStreet.webp', key: 'createCloseStreet' },
  { src: '/apps/stradaHub_show_control.webp', key: 'showControl' },
  { src: '/apps/stradaHub_controlDetail.webp', key: 'controlDetail' },
];

const pulseAnimation = {
  animate: {
    scale: [1, 1.35, 1],
    opacity: [0.5, 0.1, 0.5],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

const driveAnimation = {
  animate: {
    x: ['-10%', '110%'],
    transition: { duration: 9, repeat: Infinity, ease: 'linear' as const },
  },
};

const StradaHub = () => {
  const { t, i18n } = useTranslation('stradaHub');
  const { t: tc } = useTranslation();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const appStructuredData = useMemo(
    () =>
      generateAppStructuredData(
        'StradaHub',
        t('structured.description'),
        'https://elior.studio/apps/stradaHub_show_control.webp',
        'https://apps.apple.com/us/app/stradahub/id6796659292',
        'NavigationApplication',
        '4.8',
        '1500',
        t('structured.featureList', { returnObjects: true }) as string[],
        ['/apps/stradaHub_categories.webp', '/apps/stradaHub_show_control.webp', '/apps/stradaHub_controlDetail.webp'],
        '2026-08-01',
        '35MB',
        '4+',
      ),
    [t],
  );

  const breadcrumbData = useMemo(
    () =>
      generateBreadcrumbData([
        { name: 'Home', url: 'https://elior.studio/' },
        { name: 'StradaHub', url: 'https://elior.studio/stradahub' },
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

  const categories = (
    t('categories.items', { returnObjects: true }) as { title: string; description: string }[]
  ).map((c, i) => ({ ...c, icon: categoryIcons[i], color: categoryColors[i] }));

  const features = (
    t('features.items', { returnObjects: true }) as { title: string; description: string }[]
  ).map((f, i) => ({ ...f, icon: featureIcons[i] }));

  const screenshots = screenshotDefs.map((s) => ({
    src: s.src,
    alt: t(`screenshots.alts.${s.key}`),
    label: t(`screenshots.labels.${s.key}`),
  }));

  const roadmap = t('roadmap', { returnObjects: true }) as { title: string; description: string }[];

  const disclaimerBullets = t('disclaimerBullets', { returnObjects: true }) as string[];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    if (location.pathname === '/stradahub') {
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
    <Fragment>
      <SEO
        title={t('seo.title')} tabTitle="StradaHub"
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        ogImage="https://elior.studio/apps/StradaHub_logo.webp"
        ogImageWidth={1024}
        ogImageHeight={1024}
        ogImageAlt="StradaHub — App-Logo"
        ogType="product"
        canonical="https://elior.studio/stradahub"
        structuredData={[appStructuredData, breadcrumbData, faqData]}
        appName="StradaHub"
        appCategory="NavigationApplication"
        rating="4.8"
        reviewCount="1500"
        language={i18n.resolvedLanguage?.startsWith('de') ? 'de-AT' : 'en'}
      />
      <div ref={containerRef} className="relative min-h-screen" style={{ background: CREAM }}>
        {/* Animated map-pin pulses background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(196, 144, 112, 0.12) 0%, transparent 70%)' }}
            variants={pulseAnimation}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232, 211, 196, 0.2) 0%, transparent 70%)' }}
            variants={pulseAnimation}
            animate="animate"
            transition={{ delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(169, 117, 85, 0.1) 0%, transparent 70%)' }}
            variants={pulseAnimation}
            animate="animate"
            transition={{ delay: 2 }}
          />
          {/* Driving car easter egg */}
          <motion.div
            className="absolute bottom-0 left-0 pointer-events-none"
            variants={driveAnimation}
            animate="animate"
          >
            <Navigation className="w-6 h-6" style={{ color: TERRACOTTA, opacity: 0.35 }} />
          </motion.div>
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
                boxShadow: '0 4px 12px rgba(74, 64, 56, 0.08)',
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
              style={{
                background: 'radial-gradient(circle, rgba(196, 144, 112, 0.3) 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full opacity-35"
              style={{
                background: 'radial-gradient(circle, rgba(232, 211, 196, 0.4) 0%, transparent 70%)',
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
                    background: 'linear-gradient(135deg, #C49070 0%, #E8D3C4 100%)',
                    boxShadow: '0 8px 32px rgba(196, 144, 112, 0.35)',
                  }}
                >
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl" style={{ color: INK }}>StradaHub</h1>
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
                <span style={{ color: TERRACOTTA }}>{t('hero.title2')}</span>
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

              {/* Not a radar warning app - clear badge */}
              <motion.div
                className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: CREAM_SOFT,
                  color: INK_SOFT,
                  boxShadow: `
                    inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                    inset -2px -2px 4px rgba(74, 64, 56, 0.04),
                    4px 4px 8px rgba(74, 64, 56, 0.06),
                    -4px -4px 8px rgba(255, 255, 255, 0.9)
                  `,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.45 }}
              >
                <ShieldAlert className="w-4 h-4" style={{ color: TERRACOTTA }} />
                {t('hero.radarBadge')}
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <a
                  href="https://apps.apple.com/us/app/stradahub/id6796659292"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: TERRACOTTA,
                    color: 'white',
                    boxShadow: '0 8px 24px rgba(196, 144, 112, 0.35)',
                  }}
                >
                  <Download className="w-4 h-4" />
                  {t('hero.download')}
                </a>
                <button
                  className="px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all"
                  style={{
                    background: CREAM_SOFT,
                    color: INK_SOFT,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(74, 64, 56, 0.04),
                      4px 4px 8px rgba(74, 64, 56, 0.06),
                      -4px -4px 8px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <Smartphone className="w-4 h-4" />
                  {t('hero.androidSoon')}
                </button>
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
                  background: CREAM_SOFT,
                  boxShadow: `
                    inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                    inset -3px -3px 6px rgba(74, 64, 56, 0.05),
                    20px 20px 40px rgba(196, 144, 112, 0.18),
                    -20px -20px 40px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <div
                  className="p-3 rounded-[28px]"
                  style={{
                    background: CREAM,
                    boxShadow: `
                      inset 2px 2px 4px rgba(74, 64, 56, 0.04),
                      inset -2px -2px 4px rgba(255, 255, 255, 0.8)
                    `,
                  }}
                >
                  <img
                    src="/apps/stradaHub_show_control.webp"
                    alt={t('hero.imageAlt')}
                    className="w-[260px] md:w-[300px] h-auto rounded-[24px]"
                  />
                </div>
                {/* Floating pin badge */}
                <motion.div
                  className="absolute -top-3 -right-3 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-medium"
                  style={{
                    background: TERRACOTTA,
                    color: 'white',
                    boxShadow: '0 8px 24px rgba(196, 144, 112, 0.4)',
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MapPin className="w-3 h-3" />
                  {t('hero.liveBadge')}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: CREAM_SOFT }}>
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
                style={{ color: TERRACOTTA }}
              >
                {t('categories.eyebrow')}
              </span>
              <h2
                className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
                style={{ color: INK }}
              >
                {t('categories.title')}
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: INK_SOFT }}>
                {t('categories.description')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-[32px]"
                  style={{
                    background: CREAM,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(74, 64, 56, 0.04),
                      8px 8px 16px rgba(74, 64, 56, 0.06),
                      -8px -8px 16px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: `${category.color}1f` }}
                  >
                    <category.icon className="w-7 h-7" style={{ color: category.color }} />
                  </div>
                  <h3 className="font-serif text-2xl mb-4" style={{ color: INK }}>
                    {category.title}
                  </h3>
                  <p style={{ color: INK_SOFT }}>{category.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Not a radar warning - dedicated section */}
        <section className="py-32 px-6 md:px-8" style={{ background: CREAM }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div
              className="p-10 md:p-14 rounded-[40px]"
              style={{
                background: CREAM_SOFT,
                boxShadow: `
                  inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                  inset -3px -3px 6px rgba(74, 64, 56, 0.05),
                  16px 16px 32px rgba(196, 144, 112, 0.1),
                  -16px -16px 32px rgba(255, 255, 255, 0.9)
                `,
              }}
            >
              <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: `${TERRACOTTA}1f` }}
                >
                  <ShieldAlert className="w-8 h-8" style={{ color: TERRACOTTA }} />
                </div>
                <div>
                  <span
                    className="font-serif italic text-sm tracking-[0.3em] block mb-3"
                    style={{ color: TERRACOTTA }}
                  >
                    {t('radar.eyebrow')}
                  </span>
                  <h2
                    className="font-serif text-3xl md:text-4xl mb-4"
                    style={{ color: INK }}
                  >
                    {t('radar.title')}
                  </h2>
                  <p className="text-lg leading-relaxed mb-6" style={{ color: INK_SOFT }}>
                    {t('radar.introStart')} <strong style={{ color: INK }}>{t('radar.introEmphasis')}</strong>{' '}
                    {t('radar.introEnd')}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div
                      className="flex items-center gap-3 px-5 py-4 rounded-2xl"
                      style={{
                        background: CREAM,
                        boxShadow: `
                          inset 1px 1px 2px rgba(255, 255, 255, 0.9),
                          inset -1px -1px 2px rgba(74, 64, 56, 0.03)
                        `,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: TERRACOTTA }} />
                      <span style={{ color: INK_SOFT }}>{disclaimerBullets[0]}</span>
                    </div>
                    <div
                      className="flex items-center gap-3 px-5 py-4 rounded-2xl"
                      style={{
                        background: CREAM,
                        boxShadow: `
                          inset 1px 1px 2px rgba(255, 255, 255, 0.9),
                          inset -1px -1px 2px rgba(74, 64, 56, 0.03)
                        `,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: TERRACOTTA }} />
                      <span style={{ color: INK_SOFT }}>{disclaimerBullets[1]}</span>
                    </div>
                    <div
                      className="flex items-center gap-3 px-5 py-4 rounded-2xl"
                      style={{
                        background: CREAM,
                        boxShadow: `
                          inset 1px 1px 2px rgba(255, 255, 255, 0.9),
                          inset -1px -1px 2px rgba(74, 64, 56, 0.03)
                        `,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: TERRACOTTA }} />
                      <span style={{ color: INK_SOFT }}>{disclaimerBullets[2]}</span>
                    </div>
                    <div
                      className="flex items-center gap-3 px-5 py-4 rounded-2xl"
                      style={{
                        background: CREAM,
                        boxShadow: `
                          inset 1px 1px 2px rgba(255, 255, 255, 0.9),
                          inset -1px -1px 2px rgba(74, 64, 56, 0.03)
                        `,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: TERRACOTTA }} />
                      <span style={{ color: INK_SOFT }}>{disclaimerBullets[3]}</span>
                    </div>
                  </div>
                  <p style={{ color: INK_SOFT }}>
                    {t('radar.outro')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* How it works */}
        <section className="py-32 px-6 md:px-8" style={{ background: CREAM_SOFT }}>
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
                style={{ color: TERRACOTTA }}
              >
                {t('howItWorks.eyebrow')}
              </span>
              <h2
                className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
                style={{ color: INK }}
              >
                {t('howItWorks.title')}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {roadmap.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative"
                >
                  <div
                    className="p-8 rounded-[32px] h-full"
                    style={{
                      background: CREAM,
                      boxShadow: `
                        inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                        inset -2px -2px 4px rgba(74, 64, 56, 0.04),
                        8px 8px 16px rgba(74, 64, 56, 0.06),
                        -8px -8px 16px rgba(255, 255, 255, 0.9)
                      `,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-6 font-serif text-xl"
                      style={{ background: `${TERRACOTTA}1f`, color: TERRACOTTA }}
                    >
                      {idx + 1}
                    </div>
                    <h3 className="font-serif text-xl mb-3" style={{ color: INK }}>
                      {step.title}
                    </h3>
                    <p className="text-sm" style={{ color: INK_SOFT }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: CREAM }}>
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
                style={{ color: TERRACOTTA }}
              >
                {t('features.eyebrow')}
              </span>
              <h2
                className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
                style={{ color: INK }}
              >
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
                    background: CREAM_SOFT,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(74, 64, 56, 0.04),
                      8px 8px 16px rgba(74, 64, 56, 0.06),
                      -8px -8px 16px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: `${TERRACOTTA}1f` }}
                  >
                    <feature.icon className="w-7 h-7" style={{ color: TERRACOTTA }} />
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

        {/* Screenshots */}
        <section className="py-32 px-6 md:px-8" style={{ background: CREAM_SOFT }}>
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
                style={{ color: TERRACOTTA }}
              >
                {t('screenshots.eyebrow')}
              </span>
              <h2
                className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
                style={{ color: INK }}
              >
                {t('screenshots.title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
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
                    background: CREAM,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(74, 64, 56, 0.04),
                      6px 6px 12px rgba(74, 64, 56, 0.06),
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
                    {screenshot.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: CREAM }}>
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
                background: 'linear-gradient(135deg, #C49070 0%, #E8D3C4 100%)',
                boxShadow: '0 32px 64px rgba(196, 144, 112, 0.35)',
              }}
            >
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
                {t('cta.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://apps.apple.com/us/app/stradahub/id6796659292"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: 'white',
                    color: TERRACOTTA,
                  }}
                >
                  <Download className="w-5 h-5" />
                  {t('cta.button')}
                </a>
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <Smartphone className="w-5 h-5" />
                  {t('cta.androidSoon')}
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 md:px-8" style={{ background: CREAM_DEEP }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C49070 0%, #E8D3C4 100%)' }}
              >
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl" style={{ color: INK }}>
                StradaHub
              </span>
            </div>
            <p className="text-sm" style={{ color: INK_SOFT }}>
              © 2026 StradaHub. {t('footer.productBy')}
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/stradahub/privacy"
                className="text-xs transition-opacity hover:opacity-70"
                style={{ color: INK_SOFT }}
              >
                {t('footer.privacy')}
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 text-sm"
                style={{ color: TERRACOTTA }}
              >
                {tc('appCommon.visitElior')}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default StradaHub;
