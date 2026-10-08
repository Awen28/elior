import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Apps', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer
      ref={sectionRef}
      className="relative pt-24 pb-8 px-8 overflow-hidden"
      style={{ background: '#20201E' }}
    >
      {/* Large Background Hebrew Text - the eternal light */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 right-0 text-center pointer-events-none select-none"
      >
        <span
          className="font-serif text-[18vw] leading-none block"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(217, 200, 169, 0.08)',
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
                src="/logos/elior-stone.png" 
                alt="Elior" 
                className="h-12 w-auto object-contain" 
                style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))' }}
              />
            </motion.a>
            <p 
              className="font-sans text-lg max-w-md mb-6"
              style={{ color: 'rgba(240, 235, 227, 0.65)' }}
            >
              Elior — Hebrew for „Gott ist mein Licht", God is my light. 
              Crafting digital experiences that carry meaning. From award-winning 
              iOS apps to conversion-focused websites.
            </p>
            <motion.a
              href="mailto:info@awen28.com"
              className="inline-flex items-center gap-2 text-lg transition-colors"
              style={{ color: '#BA986A' }}
              whileHover={{ x: 5 }}
            >
              info@awen28.com
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Navigation */}
          <div>
            <h4 
              className="font-sans text-sm tracking-widest uppercase mb-6"
              style={{ color: 'rgba(240, 235, 227, 0.4)' }}
            >
              Navigation
            </h4>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="block font-sans text-lg"
                  style={{ color: 'rgba(240, 235, 227, 0.7)' }}
                  whileHover={{ x: 5, color: '#D2B488' }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 
              className="font-sans text-sm tracking-widest uppercase mb-6"
              style={{ color: 'rgba(240, 235, 227, 0.4)' }}
            >
              Services
            </h4>
            <nav className="space-y-3">
              <Link to="/webdesign-tirol" className="block font-sans text-lg transition-colors" style={{ color: 'rgba(240, 235, 227, 0.7)' }}>Homepage programmieren</Link>
              <Link to="/app-entwicklung-tirol" className="block font-sans text-lg transition-colors" style={{ color: 'rgba(240, 235, 227, 0.7)' }}>App Entwicklung (iOS & Android)</Link>
              {['Web Design', 'AI Integration', 'Backend'].map((service) => (
                <motion.a
                  key={service}
                  href="#services"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }}
                  className="block font-sans text-lg"
                  style={{ color: 'rgba(240, 235, 227, 0.7)' }}
                  whileHover={{ x: 5, color: '#D2B488' }}
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
          style={{ background: 'rgba(217, 200, 169, 0.12)' }}
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p 
            className="font-sans text-sm"
            style={{ color: 'rgba(240, 235, 227, 0.4)' }}
          >
            © {new Date().getFullYear()} Elior. Built with meaning. All rights reserved.
          </p>
          {/* Legal Links - Small and unobtrusive */}
          <div className="flex items-center gap-4 text-[10px] tracking-wide">
            <Link
              to="/impressum"
              className="font-sans transition-colors hover:text-[#D2B488]"
              style={{ color: 'rgba(240, 235, 227, 0.35)' }}
            >
              Impressum
            </Link>
            <span style={{ color: 'rgba(240, 235, 227, 0.2)' }}>|</span>
            <Link
              to="/datenschutz"
              className="font-sans transition-colors hover:text-[#D2B488]"
              style={{ color: 'rgba(240, 235, 227, 0.35)' }}
            >
              Datenschutz
            </Link>
            <span style={{ color: 'rgba(240, 235, 227, 0.2)' }}>|</span>
            <Link
              to="/cookies"
              className="font-sans transition-colors hover:text-[#D2B488]"
              style={{ color: 'rgba(240, 235, 227, 0.35)' }}
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
