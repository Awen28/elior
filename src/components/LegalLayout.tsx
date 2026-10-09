import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO } from './../components/SEO';

interface LegalLayoutProps {
  title: string;
  description: string;
  eyebrow: string;
  canonical?: string;
  children: ReactNode;
  lastUpdated?: string;
}

const LEGAL_LINKS = [
  { to: '/impressum', label: 'Impressum' },
  { to: '/datenschutz', label: 'Datenschutz' },
  { to: '/privacy-apps', label: 'App Privacy' },
  { to: '/cookies', label: 'Cookies' },
];

const LegalLayout = ({
  title,
  description,
  eyebrow,
  canonical,
  children,
  lastUpdated,
}: LegalLayoutProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const location = useLocation();

  return (
    <div className="relative min-h-screen pt-28 md:pt-36 pb-16 px-6 md:px-8">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
      />

      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase transition-colors"
            style={{ color: 'rgba(82, 83, 66, 0.55)' }}
          >
            <ArrowLeft className="w-4 h-4" style={{ color: '#9A7A50' }} />
            <span className="border-b border-transparent hover:border-[#9A7A50] transition-colors">
              Back to Start
            </span>
          </Link>
        </motion.div>

        {/* Title */}
        <div ref={sectionRef}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow block mb-5"
            style={{
              color: '#918A7C',
              textShadow:
                '-1px -1px 1px rgba(255,255,255,0.55), 1px 1px 1px rgba(84,76,66,0.3)',
            }}
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-semibold leading-[1.05] mb-6"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              color: '#4E4F41',
            }}
          >
            {title}
          </motion.h1>
          {lastUpdated && (
            <p className="font-sans text-xs tracking-widest uppercase mb-12" style={{ color: '#9A7A50' }}>
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="pt-2 border-t" style={{ borderColor: 'rgba(82, 83, 66, 0.12)' }}>
          {children}
        </div>

        {/* Legal cross links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t flex flex-wrap gap-x-8 gap-y-3"
          style={{ borderColor: 'rgba(82, 83, 66, 0.12)' }}
        >
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-sans text-xs tracking-widest uppercase transition-colors"
              style={{
                color:
                  location.pathname === link.to ? '#9A7A50' : 'rgba(82, 83, 66, 0.5)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LegalLayout;