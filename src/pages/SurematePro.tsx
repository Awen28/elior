import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Check, Users, FileText, BarChart3, ChevronRight, Download, UserPlus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO, generateAppStructuredData, generateBreadcrumbData, generateFAQData } from '../components/SEO';

const featureIcons = [Users, FileText, BarChart3];
const screenshotKeys = ['home', 'kunden', 'profil', 'schaden', 'pdf', 'share'];

const SurematePro = () => {
  const { t, i18n } = useTranslation('surematePro');
  const { t: tc } = useTranslation();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const appStructuredData = useMemo(
    () =>
      generateAppStructuredData(
        'Suremate Pro',
        t('structured.description'),
        'https://elior.studio/apps/Suremate_pro_home.webp',
        'https://apps.apple.com/at/app/suremate-pro/id6502916525',
        'BusinessApplication',
        '4.9',
        '200',
        t('structured.featureList', { returnObjects: true }) as string[],
        ['/apps/Suremate_pro_home.webp', '/apps/surematepro_home.webp', '/apps/surematepro_kunden.webp'],
        '2024-06-01',
        '55MB',
        '4+',
      ),
    [t],
  );

  const breadcrumbData = useMemo(
    () =>
      generateBreadcrumbData([
        { name: 'Home', url: 'https://elior.studio/' },
        { name: 'Suremate Pro', url: 'https://elior.studio/suremate-pro' },
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

  const screenshots = screenshotKeys.map((key) => ({
    src: `/apps/surematepro_${key}.webp`,
    alt: t(`screenshots.alts.${key}`),
  }));
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Scroll to top on mount - force immediate scroll
  useEffect(() => {
    if (location.pathname === '/suremate-pro') {
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
    <div ref={containerRef} className="relative min-h-screen" style={{ background: '#F1EDE6' }}>
      <SEO 
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        ogImage="https://elior.studio/apps/Suremate_pro_home.webp"
        ogType="product"
        canonical="https://elior.studio/suremate-pro"
        structuredData={[appStructuredData, breadcrumbData, faqData]}
        appName="Suremate Pro"
        appCategory="BusinessApplication"
        rating="4.9"
        reviewCount="200"
        language={i18n.resolvedLanguage?.startsWith('de') ? 'de-AT' : 'en'}
      />
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
            className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(180, 160, 120, 0.3) 0%, transparent 70%)',
            }}
          />
          <div 
            className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(100, 100, 100, 0.2) 0%, transparent 70%)',
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
            {/* Logo - with dark background since logo has gray background */}
            <motion.div 
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden"
                style={{
                  background: '#6b6b6b',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                }}
              >
                <img src="/apps/surematepro_logo.webp" alt="Suremate Pro" className="w-16 h-16 object-cover" />
              </div>
              <div>
                <h1 className="font-serif text-3xl" style={{ color: '#2a2a2a' }}>Suremate Pro</h1>
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
              <span style={{ color: '#1e3a5f' }}>{t('hero.title2')}</span>
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
              <a
                href="https://apps.apple.com/at/app/suremate-pro/id6502916525"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: '#2a2a2a',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                }}
              >
                <Download className="w-4 h-4" />
                {t('hero.download')}
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
                  20px 20px 40px rgba(0, 0, 0, 0.15),
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
                  src="/apps/surematepro_home.webp"
                  alt="Suremate Pro App"
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
              style={{ color: '#1e3a5f' }}
            >
              {t('features.eyebrow')}
            </span>
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
                    background: 'rgba(42, 42, 42, 0.08)',
                  }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: '#2a2a2a' }} />
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
              style={{ color: '#1e3a5f' }}
            >
              {t('screenshots.eyebrow')}
            </span>
            <h2 
              className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ color: '#525240' }}
            >
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
                transition={{ duration: 0.6, delay: idx * 0.08 }}
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
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(42, 42, 42, 0.1)',
                      }}
                    >
                      <Check className="w-4 h-4" style={{ color: '#2a2a2a' }} />
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
                  background: '#2a2a2a',
                  boxShadow: `
                    inset 3px 3px 6px rgba(255, 255, 255, 0.1),
                    inset -3px -3px 6px rgba(0, 0, 0, 0.3),
                    16px 16px 32px rgba(0, 0, 0, 0.2),
                    -16px -16px 32px rgba(255, 255, 255, 0.5)
                  `,
                }}
              >
                <img
                  src="/apps/surematepro_pdf.webp"
                  alt="PDF Report Dark"
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
              background: 'linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 100%)',
              boxShadow: '0 32px 64px rgba(0, 0, 0, 0.25)',
            }}
          >
            <h2 
              className="font-serif text-4xl md:text-5xl text-white mb-6"
            >
              {t('cta.title')}
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/agentregister"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #BBB1A4, #E3DED5)',
                  color: 'white',
                }}
              >
                <UserPlus className="w-5 h-5" />
                {t('cta.registerButton')}
              </Link>
              <a
                href="https://apps.apple.com/at/app/suremate-pro/id6502916525"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'white',
                  color: '#2a2a2a',
                }}
              >
                <Download className="w-5 h-5" />
                {t('cta.downloadButton')}
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8" style={{ background: '#E8E5E0' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-8 h-8 rounded-lg overflow-hidden"
              style={{ background: '#6b6b6b' }}
            >
              <img src="/apps/surematepro_logo.webp" alt="Suremate Pro" className="w-8 h-8 object-cover" />
            </div>
            <span className="font-serif text-xl" style={{ color: '#525240' }}>Suremate Pro</span>
          </div>
          <p className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.5)' }}>
            © 2024 Suremate Pro. {t('footer.productBy')}
          </p>
          <div className="flex items-center gap-6">
            <Link 
              to="/agentportal"
              className="flex items-center gap-2 text-sm"
              style={{ color: '#2a2a2a' }}
            >
              {t('footer.agentPortal')}
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/"
              className="flex items-center gap-2 text-sm"
              style={{ color: '#2a2a2a' }}
            >
              {tc('appCommon.visitElior')}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SurematePro;
