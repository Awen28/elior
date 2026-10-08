import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Check, Shield, FileText, Clock, ChevronRight, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO, generateAppStructuredData, generateBreadcrumbData, generateFAQData } from '../components/SEO';

const appStructuredData = generateAppStructuredData(
  "Suremate",
  "The #1 digital insurance claim app in Austria. 1,200+ downloads, 4.7 star rating. Report car accidents, household damage, and personal injury digitally with photos and structured documentation. Direct connection to insurance agents.",
  "https://www.awen28.com/apps/Suremate_home.png",
  "https://apps.apple.com/at/app/suremate/id6475345859",
  "FinanceApplication",
  "4.7",
  "1200",
  ["Digital Damage Report", "Car Accident Documentation", "Household Damage", "Personal Injury Report", "Photo Upload", "Agent Connection", "Insurance Claim Tracking", "Step-by-Step Guidance"],
  ["/apps/Suremate_home.png", "/apps/suremate_claim.png", "/apps/suremate_report.png"],
  "2024-03-01",
  "50MB",
  "4+"
);

const breadcrumbData = generateBreadcrumbData([
  { name: "Home", url: "https://www.awen28.com/" },
  { name: "Suremate", url: "https://www.awen28.com/suremate" }
]);

const faqData = generateFAQData([
  { question: "Was ist Suremate?", answer: "Suremate ist eine smarte Versicherungs-App für Schadensmeldungen in Österreich. Autounfälle, Haushaltsschäden und Personenschäden digital dokumentieren." },
  { question: "Wie melde ich einen Autounfall mit Suremate?", answer: "Öffne Suremate, wähle 'Autounfall', folge der Schritt-für-Schritt Anleitung, mache Fotos vom Schaden und sende den Bericht direkt an deine Versicherung oder deinen Agenten." },
  { question: "Ist Suremate für alle Versicherungen?", answer: "Ja, Suremate funktioniert universell für alle Versicherungen in Österreich. Unabhängig von deiner Versicherung kannst du Schäden dokumentieren und melden." },
  { question: "Ist Suremate kostenlos?", answer: "Ja, Suremate ist komplett kostenlos für Versicherungsnehmer in Österreich." },
  { question: "Was ist ein AgentCode?", answer: "Der AgentCode verbindet dich mit deinem persönlichen Versicherungsagenten in Suremate. So kann dein Agent deine Schadensmeldung direkt einsehen und bearbeiten." },
]);

const features = [
  {
    icon: Shield,
    title: 'Digital Damage Reporting',
    description: 'Report car, home, and personal accidents directly through the app with an intuitive step-by-step process.',
  },
  {
    icon: FileText,
    title: 'Instant PDF Generation',
    description: 'Generate professional damage reports as PDFs with digital signatures, ready to send to your insurance.',
  },
  {
    icon: Clock,
    title: 'Claim Tracking',
    description: 'Keep track of all your reported damages in one place with status updates and history.',
  },
];

const screenshots = [
  { src: '/apps/suremate_home.png', alt: 'Home Dashboard' },
  { src: '/apps/suremate_schaden.png', alt: 'Damage Overview' },
  { src: '/apps/suremate_verursacher.png', alt: 'Liability Question' },
  { src: '/apps/suremate_haushalt.png', alt: 'Household Damage' },
  { src: '/apps/suremate_pdf.png', alt: 'PDF Preview' },
];

const Suremate = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Scroll to top on mount - force immediate scroll
  useEffect(() => {
    if (location.pathname === '/suremate') {
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
    <div ref={containerRef} className="relative min-h-screen" style={{ background: '#FAF9F7' }}>
<SEO 
  title="Suremate | #1 Beste Schadensmeldung App Österreich 2026 - Kfz & Haushalt"
  description="Suremate - Die WELTBESTE digitale Schadensmeldung App für Österreich. 1.200+ Downloads, 4.7★ Rating. Autounfälle, Haushaltsschäden, Personenschäden digital dokumentieren. Direkt an Versicherung senden. KOSTENLOS!"
  keywords="#1 Schadensmeldung App Österreich, beste Kfz Unfall App, Haushaltsschaden melden digital, Versicherungs App Österreich, Schadenmanagement App, Autounfall dokumentieren, Kfz Schaden App, Personenschaden melden, beste InsurTech App Austria, digitale Schadensmeldung, Versicherungsschaden App, Schadenregulierung digital, Unfall App Österreich, best insurance app Austria, damage report app"
  ogImage="https://www.awen28.com/apps/Suremate_home.png"
  ogType="product"
  canonical="https://www.awen28.com/suremate"
  structuredData={[appStructuredData, breadcrumbData, faqData]}
  appName="Suremate"
  appCategory="FinanceApplication"
  rating="4.7"
  reviewCount="1200"
  language="de-AT"
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
              color: '#525048',
              boxShadow: '0 4px 12px rgba(82, 80, 72, 0.08)',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Elior
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
            className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            }}
          />
          <div 
            className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
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
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden"
                style={{
                  background: '#1e3a5f',
                  boxShadow: '0 8px 24px rgba(30, 58, 95, 0.25)',
                }}
              >
                <img src="/apps/suremate_logo.png" alt="Suremate" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h1 className="font-serif text-3xl" style={{ color: '#1e3a5f' }}>Suremate</h1>
                <p className="text-sm" style={{ color: 'rgba(82, 80, 72, 0.6)' }}>Insurance Made Simple</p>
              </div>
            </motion.div>

            <motion.h2 
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
              style={{ color: '#525048' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Report damages
              <br />
              <span style={{ color: '#1e3a5f' }}>in minutes</span>
            </motion.h2>

            <motion.p 
              className="text-lg mb-8 max-w-md"
              style={{ color: 'rgba(82, 80, 72, 0.7)' }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The smart insurance companion for car, home, and personal accidents. 
              Create professional damage reports with PDF export in just a few taps.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <a
                href="https://apps.apple.com/at/app/suremate/id6475345859"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: '#1e3a5f',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(30, 58, 95, 0.25)',
                }}
              >
                <Download className="w-4 h-4" />
                Download App
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
                background: '#F5F3F0',
                boxShadow: `
                  inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                  inset -3px -3px 6px rgba(82, 80, 72, 0.05),
                  20px 20px 40px rgba(30, 58, 95, 0.15),
                  -20px -20px 40px rgba(255, 255, 255, 0.9)
                `,
              }}
            >
              <div
                className="p-3 rounded-[28px]"
                style={{
                  background: '#FAF9F7',
                  boxShadow: `
                    inset 2px 2px 4px rgba(82, 80, 72, 0.04),
                    inset -2px -2px 4px rgba(255, 255, 255, 0.8)
                  `,
                }}
              >
                <img
                  src="/apps/suremate_home.png"
                  alt="Suremate App"
                  className="w-[260px] md:w-[300px] h-auto rounded-[24px]"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#F5F3F0' }}>
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
              Features
            </span>
            <h2 
              className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ color: '#525048' }}
            >
              Everything you need
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
                  background: '#FAF9F7',
                  boxShadow: `
                    inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                    inset -2px -2px 4px rgba(82, 80, 72, 0.04),
                    8px 8px 16px rgba(82, 80, 72, 0.06),
                    -8px -8px 16px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: 'rgba(30, 58, 95, 0.08)',
                  }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: '#1e3a5f' }} />
                </div>
                <h3 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: 'rgba(82, 80, 72, 0.6)' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase - Screenshots */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#FAF9F7' }}>
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
              App Screenshots
            </span>
            <h2 
              className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ color: '#525048' }}
            >
              Simple. Fast. Digital.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {screenshots.map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-3 rounded-[24px] cursor-pointer"
                style={{
                  background: '#F5F3F0',
                  boxShadow: `
                    inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                    inset -2px -2px 4px rgba(82, 80, 72, 0.04),
                    6px 6px 12px rgba(82, 80, 72, 0.06),
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
      <section className="py-32 px-6 md:px-8" style={{ background: '#F5F3F0' }}>
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
                style={{ color: '#525048' }}
              >
                Why Suremate?
              </h2>
              <div className="space-y-6">
                {[
                  'Report damages anytime, anywhere',
                  'Professional PDF reports in seconds',
                  'Digital signature support',
                  'Track all your claims in one place',
                  'Available in German for Austria',
                  'Secure and private data handling',
                ].map((item, idx) => (
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
                        background: 'rgba(30, 58, 95, 0.1)',
                      }}
                    >
                      <Check className="w-4 h-4" style={{ color: '#1e3a5f' }} />
                    </div>
                    <span style={{ color: 'rgba(82, 80, 72, 0.8)' }}>{item}</span>
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
                  background: '#FAF9F7',
                  boxShadow: `
                    inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                    inset -3px -3px 6px rgba(82, 80, 72, 0.04),
                    16px 16px 32px rgba(82, 80, 72, 0.08),
                    -16px -16px 32px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <img
                  src="/apps/suremate_pdf.png"
                  alt="PDF Report"
                  className="w-[280px] h-auto rounded-[24px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#FAF9F7' }}>
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
              background: '#1e3a5f',
              boxShadow: '0 32px 64px rgba(30, 58, 95, 0.25)',
            }}
          >
            <h2 
              className="font-serif text-4xl md:text-5xl text-white mb-6"
            >
              Ready to simplify your insurance?
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
              Download Suremate today and experience the easiest way to report damages and manage your insurance claims.
            </p>
            <a
              href="https://apps.apple.com/at/app/suremate/id6475345859"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{
                background: 'white',
                color: '#1e3a5f',
              }}
            >
              <Download className="w-5 h-5" />
              Get it on the App Store
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8" style={{ background: '#E8E5E0' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="/apps/suremate_logo.png" alt="Suremate" className="w-8 h-8" />
            <span className="font-serif text-xl" style={{ color: '#525048' }}>Suremate</span>
          </div>
          <p className="text-sm" style={{ color: 'rgba(82, 80, 72, 0.5)' }}>
            © 2024 Suremate. A product by Elior.
          </p>
          <Link 
            to="/"
            className="flex items-center gap-2 text-sm"
            style={{ color: '#1e3a5f' }}
          >
            Visit Elior
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Suremate;
