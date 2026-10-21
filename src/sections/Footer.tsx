import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../lib/scroll';

const gold = '#C9A97B';
const inkSoft = 'rgba(228, 220, 206, 0.62)';
const inkFaint = 'rgba(228, 220, 206, 0.38)';

const Footer = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  const handleNavClick = (href: string) => {
    scrollToSection(href);
  };

  const navLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.work'), href: '#work' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <footer
      ref={sectionRef}
      className="relative pt-24 pb-8 px-8 overflow-hidden"
      style={{ background: '#525342' }}
    >
      {/* Large Background Hebrew Text - the eternal light */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="absolute -top-4 left-0 right-0 text-center pointer-events-none select-none"
      >
        <span
          className="font-serif text-[18vw] leading-none block"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201, 169, 123, 0.07)',
          }}
        >
          אליאור
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        {/* Top Section */}
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
              className="inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/logos/elior-symbol.svg"
                alt="Elior"
                width={40}
                height={40}
                className="h-10 w-auto object-contain"
                style={{ filter: 'drop-shadow(-2px 0 3px rgba(228,220,206,0.35)) drop-shadow(3px 3px 4px rgba(20,18,14,0.45))' }}
              />
            </motion.a>
            <p
              className="font-sans text-lg font-light max-w-md mb-6"
              style={{ color: inkSoft }}
            >
              {t('footer.tagline')}
            </p>
            <motion.a
              href="mailto:info@elior.studio"
              className="inline-flex items-center gap-2 text-lg transition-colors"
              style={{ color: gold }}
              whileHover={{ x: 5 }}
            >
              info@elior.studio
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="font-sans text-sm tracking-widest uppercase mb-6"
              style={{ color: inkFaint }}
            >
              {t('footer.navigation')}
            </h3>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="block font-sans text-lg transition-colors"
                  style={{ color: inkSoft }}
                  whileHover={{ x: 5, color: gold }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3
              className="font-sans text-sm tracking-widest uppercase mb-6"
              style={{ color: inkFaint }}
            >
              {t('footer.services')}
            </h3>
            <nav className="space-y-3">
              <Link to="/webdesign" className="block font-sans text-lg transition-colors hover:text-[#D2B488]" style={{ color: inkSoft }}>
                {t('footer.webDesign')}
              </Link>
              <Link to="/app-entwicklung" className="block font-sans text-lg transition-colors hover:text-[#D2B488]" style={{ color: inkSoft }}>
                {t('footer.appDevelopment')}
              </Link>
              {[t('footer.aiIntegration'), t('footer.backend')].map((service) => (
                <motion.a
                  key={service}
                  href="#services"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }}
                  className="block font-sans text-lg"
                  style={{ color: inkSoft }}
                  whileHover={{ x: 5, color: gold }}
                >
                  {service}
                </motion.a>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ background: 'rgba(228, 220, 206, 0.12)' }}
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            className="font-sans text-sm"
            style={{ color: inkFaint }}
          >
            © {new Date().getFullYear()} Elior. {t('footer.rights')}
          </p>
          {/* Legal Links - Small and unobtrusive */}
          <div className="flex items-center gap-4 text-[10px] tracking-wide">
            <Link
              to="/impressum"
              className="font-sans transition-colors hover:text-[#D2B488]"
              style={{ color: inkFaint }}
            >
              Impressum
            </Link>
            <span style={{ color: 'rgba(228, 220, 206, 0.2)' }}>|</span>
            <Link
              to="/datenschutz"
              className="font-sans transition-colors hover:text-[#D2B488]"
              style={{ color: inkFaint }}
            >
              Datenschutz
            </Link>
            <span style={{ color: 'rgba(228, 220, 206, 0.2)' }}>|</span>
            <Link
              to="/cookies"
              className="font-sans transition-colors hover:text-[#D2B488]"
              style={{ color: inkFaint }}
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;