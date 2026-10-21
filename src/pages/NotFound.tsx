import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Home, ArrowLeft, Search, Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const NotFound = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const { t, i18n } = useTranslation();
  const isGerman = i18n.resolvedLanguage?.startsWith('de') ?? true;

  const links = [
    { label: t('notFound.links.home'), href: '/' },
    { label: t('notFound.links.webdesign'), href: '/webdesign' },
    { label: t('notFound.links.appDev'), href: '/app-entwicklung' },
    { label: t('notFound.links.abwun'), href: '/abwun' },
    { label: t('notFound.links.stradahub'), href: '/stradahub' },
    { label: t('notFound.links.suremate'), href: '/suremate' },
    { label: t('notFound.links.kibook'), href: '/kibook' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F1EDE6' }}>
      <SEO
        title={t('notFound.seo.title')}
        description={t('notFound.seo.description')}
        canonical="https://elior.studio/404"
        language={isGerman ? 'de-AT' : 'en'}
        ogImage="https://elior.studio/apps/Elior_logo.webp"
        ogImageWidth={1080}
        ogImageHeight={1080}
        ogImageAlt={t('notFound.seo.title')}
        structuredData={{ '@context': 'https://schema.org', '@type': 'WebPage', name: t('notFound.title'), url: 'https://elior.studio/404', inLanguage: isGerman ? 'de-AT' : 'en', isPartOf: { '@type': 'WebSite', name: 'Elior', url: 'https://elior.studio' } }}
        noindex
      />

      {/* Header */}
      <header className="py-6 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/"
            className="flex items-center gap-2 text-sm tracking-wider uppercase"
            style={{ color: '#525240' }}
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: '#525240' }}
            >
              <span className="text-white font-serif text-lg">A</span>
            </div>
            <span className="font-serif">Elior</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main 
        ref={sectionRef}
        className="flex-1 flex items-center justify-center px-6 md:px-8 py-20"
      >
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="relative mb-12"
          >
            {/* Background decoration */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute inset-0 w-48 h-48 mx-auto opacity-10"
              style={{
                background: 'radial-gradient(circle, #BBB1A4 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />
            
            {/* Compass Icon */}
            <motion.div
              animate={{ rotate: -10 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="relative w-32 h-32 mx-auto rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #E3DED5 0%, #BBB1A4 100%)',
                boxShadow: '0 20px 40px rgba(178, 159, 134, 0.3)',
              }}
            >
              <Compass className="w-16 h-16 text-white" strokeWidth={1.5} />
            </motion.div>

            {/* 404 Numbers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <span 
                className="font-serif text-9xl md:text-[12rem] font-bold opacity-10"
                style={{ 
                  color: '#BBB1A4',
                  WebkitTextStroke: '2px #BBB1A4',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                404
              </span>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: 'rgba(82, 82, 64, 0.45)' }}
            >
              {t('notFound.eyebrow')}
            </p>
            <h1 
              className="font-serif text-5xl md:text-6xl mb-6"
              style={{ color: '#525240' }}
            >
              {t('notFound.title')}
            </h1>
            <p 
              className="text-xl md:text-2xl mb-4"
              style={{ color: 'rgba(82, 82, 64, 0.7)' }}
            >
              {t('notFound.subtitle')}
            </p>
            <p 
              className="text-lg mb-12 max-w-md mx-auto"
              style={{ color: 'rgba(82, 82, 64, 0.5)' }}
            >
              {t('notFound.description')}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: '#525240',
                color: '#F1EDE6',
              }}
            >
              <Home className="w-4 h-4" />
              {t('notFound.backHome')}
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: 'transparent',
                color: '#525240',
                border: '1px solid rgba(82, 82, 64, 0.2)',
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              {t('notFound.back')}
            </button>
          </motion.div>

          {/* Suggested Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 pt-12 border-t"
            style={{ borderColor: 'rgba(82, 82, 64, 0.1)' }}
          >
            <p 
              className="text-sm mb-6 flex items-center justify-center gap-2"
              style={{ color: 'rgba(82, 82, 64, 0.5)' }}
            >
              <Search className="w-4 h-4" />
              {t('notFound.popular')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-5 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(178, 159, 134, 0.1)',
                    color: '#525240',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.4)' }}>
            © {new Date().getFullYear()} Elior. {t('notFound.rights')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
