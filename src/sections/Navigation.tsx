import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { scrollToSection } from '../lib/scroll';
import LanguageToggle from '../components/LanguageToggle';

const gold = '#C9A97B';
const olive = '#525342';
const oliveSoft = 'rgba(82, 83, 66, 0.62)';
const cream = '#EDE8DD';

const Navigation = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const navItems = [
    { label: t('nav.services'), href: '#services', index: '01' },
    { label: t('nav.work'), href: '#work', index: '02' },
    { label: t('nav.about'), href: '#about', index: '03' },
    { label: t('nav.contact'), href: '#contact', index: '04' },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar after scrolling past hero (approx 100px)
      if (currentScrollY > 100) {
        setIsScrolled(true);
        // Show when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsScrolled(false);
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* What you see on desktop: the open top bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{
          y: isVisible || isMobileMenuOpen ? 0 : -100,
          opacity: isVisible || isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden md:block fixed top-0 left-0 right-0 z-50 px-8 py-5"
        style={{
          background: isScrolled ? 'rgba(245, 241, 234, 0.82)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(160%)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(118, 102, 79, 0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src="/logos/elior-olive.webp"
              alt="Elior"
              width={36}
              height={36}
              className="h-9 w-auto object-contain"
              style={{ filter: 'drop-shadow(2px 3px 4px rgba(154,143,128,0.35))' }}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm tracking-widest uppercase relative group"
                style={{ color: oliveSoft }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ color: olive }}
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: gold }}
                />
              </motion.a>
            ))}

            {/* Language toggle */}
            <LanguageToggle variant="desktop" />

            {/* CTA Button */}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-6 py-3 font-sans text-[0.72rem] tracking-[0.18em] uppercase transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(160deg, #5C5C4C 0%, #3D3C32 100%)',
                color: cream,
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 10px 24px -12px rgba(82, 83, 66, 0.5), inset 0 1px 1px rgba(255,255,255,0.16)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('nav.startProject')}
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* What you see on mobile: a quiet logo + Menu pill */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{
          y: isMobileMenuOpen ? 0 : isVisible ? 0 : -100,
          opacity: 1,
        }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 px-5 py-4 flex items-center justify-between"
        style={{
          background: isScrolled || isMobileMenuOpen ? 'rgba(245, 241, 234, 0.82)' : 'transparent',
          backdropFilter: isScrolled || isMobileMenuOpen ? 'blur(20px) saturate(160%)' : 'none',
          borderBottom: isScrolled || isMobileMenuOpen ? '1px solid rgba(118, 102, 79, 0.1)' : 'none',
        }}
      >
        <motion.a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2"
          whileTap={{ scale: 0.96 }}
        >
          {!isMobileMenuOpen && (
            <img
              src="/logos/elior-olive.webp"
              alt="Elior"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
              style={{ filter: 'drop-shadow(2px 3px 4px rgba(154,143,128,0.32))' }}
            />
          )}
        </motion.a>

        {/* Menu pill */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-2.5 px-4 py-2 transition-transform"
          style={{
            color: '#525342',
            border: '1px solid rgba(82, 83, 66, 0.22)',
            background: 'rgba(245, 241, 234, 0.7)',
            backdropFilter: 'blur(8px)',
          }}
          whileTap={{ scale: 0.95 }}
          aria-label={isMobileMenuOpen ? t('nav.close') : t('nav.menu')}
        >
          <span className="font-sans text-[0.68rem] tracking-[0.22em] uppercase">
            {isMobileMenuOpen ? t('nav.close') : t('nav.menu')}
          </span>
          <span className="flex flex-col gap-[5px]">
            <span
              className="block w-4 h-px transition-transform duration-300"
              style={{
                background: '#525342',
                transform: isMobileMenuOpen ? 'translateY(3px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-4 h-px transition-transform duration-300"
              style={{
                background: '#525342',
                transform: isMobileMenuOpen ? 'translateY(-3px) rotate(-45deg)' : 'none',
              }}
            />
          </span>
        </motion.button>
      </motion.nav>

      {/* Mobile: fullscreen overlay menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: '#525342' }}
          >
            {/* faint stamped hebrew watermark */}
            <div className="absolute top-6 left-6 pointer-events-none select-none">
              <span
                className="font-serif text-[0.8rem] tracking-[0.35em] uppercase"
                style={{
                  color: '#525342',
                  textShadow: '-1px -1px 1px rgba(237,232,221,0.25), 1px 2px 2px rgba(20,18,14,0.5)',
                }}
              >
                אליאור
              </span>
            </div>

            <div className="relative h-full flex flex-col justify-center px-8">
              {/* nav links, staged */}
              <div className="flex flex-col gap-2">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="group py-3 border-b"
                    style={{ borderColor: 'rgba(237, 232, 221, 0.12)' }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + idx * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="flex items-baseline gap-4">
                      <span
                        className="font-sans text-xs tracking-[0.3em]"
                        style={{ color: gold }}
                      >
                        /{item.index}
                      </span>
                      <span
                        className="font-serif text-4xl leading-tight transition-all duration-300 group-hover:italic"
                        style={{ color: cream }}
                      >
                        {item.label}
                      </span>
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* contact block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12"
              >
                <div
                  className="pt-6 border-t"
                  style={{ borderColor: 'rgba(237, 232, 221, 0.12)' }}
                >
                  <p className="eyebrow mb-4" style={{ color: 'rgba(237, 232, 221, 0.5)' }}>
                    {t('nav.letsTalk')}
                  </p>
                  <a
                    href="mailto:info@elior.studio"
                    className="block font-serif text-xl mb-2"
                    style={{ color: cream }}
                  >
                    info@elior.studio
                  </a>
                  <a
                    href="tel:+4367764059711"
                    className="block font-serif text-lg mb-6"
                    style={{ color: 'rgba(237, 232, 221, 0.7)' }}
                  >
                    +43 677 6405 9711
                  </a>
                  <LanguageToggle variant="mobile" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;