import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Check, Users, FileText, BarChart3, ChevronRight, Download, UserPlus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO, generateAppStructuredData, generateBreadcrumbData, generateFAQData } from '../components/SEO';

const features = [
  {
    icon: Users,
    title: 'Client Management',
    description: 'Manage all your clients in one place. Quick access to customer data, policies, and damage history.',
  },
  {
    icon: FileText,
    title: 'Professional Reports',
    description: 'Generate comprehensive damage reports with digital signatures and instant PDF export.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track your performance with detailed analytics. Overview of claims, clients, and statistics.',
  },
];

const screenshots = [
  { src: '/apps/surematepro_home.png', alt: 'Agent Dashboard' },
  { src: '/apps/surematepro_kunden.png', alt: 'Client List' },
  { src: '/apps/surematepro_profil.png', alt: 'Agent Profile' },
  { src: '/apps/surematepro_schaden.png', alt: 'Damage Categories' },
  { src: '/apps/surematepro_pdf.png', alt: 'PDF Report Dark' },
  { src: '/apps/surematepro_share.png', alt: 'Share Options' },
];

const appStructuredData = generateAppStructuredData(
  "Suremate Pro",
  "Professional B2B insurance CRM for agents in Austria. Complete customer overview, real-time claim notifications, damage report access, customer database, and mobile CRM functionality. Best insurance agent software Austria.",
  "https://www.awen28.com/apps/Suremate_pro_home.png",
  "https://apps.apple.com/at/app/suremate-pro/id6502916525",
  "BusinessApplication",
  "4.9",
  "200",
  ["Customer CRM", "Real-time Notifications", "Damage Report Access", "Customer Database", "Mobile CRM", "Claim Management", "Agent Dashboard", "B2B Insurance Tools"],
  ["/apps/Suremate_pro_home.png", "/apps/surematepro_dashboard.png", "/apps/surematepro_customers.png"],
  "2024-06-01",
  "55MB",
  "4+"
);

const breadcrumbData = generateBreadcrumbData([
  { name: "Home", url: "https://www.awen28.com/" },
  { name: "Suremate Pro", url: "https://www.awen28.com/suremate-pro" }
]);

const faqData = generateFAQData([
  { question: "Was ist Suremate Pro?", answer: "Suremate Pro ist die professionelle B2B Versicherungs-Software für Agenten in Österreich. Kundenverwaltung, Schadensübersicht und mobiles CRM in einer App." },
  { question: "Für wen ist Suremate Pro gedacht?", answer: "Suremate Pro ist für Versicherungsagenten, Makler und Versicherungsvertreter in Österreich die ihre Kunden und Schadensfälle digital verwalten möchten." },
  { question: "Wie erhalte ich Kundenschadensmeldungen?", answer: "Wenn Kunden sich in der Suremate App mit deinem AgentCode registrieren, siehst du alle ihre Schadensmeldungen in Echtzeit in Suremate Pro." },
  { question: "Ist Suremate Pro kostenlos?", answer: "Suremate Pro ist für registrierte Versicherungsagenten verfügbar. Kontaktiere uns für Preise und Lizenzierung." },
]);

const SurematePro = () => {
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
    <div ref={containerRef} className="relative min-h-screen" style={{ background: '#FAF9F7' }}>
      <SEO 
        title="Suremate Pro | #1 Beste Versicherungsvertreter Software Österreich 2026 - CRM"
        description="Suremate Pro - Die professionelle Versicherungsvertreter Software für Österreich. Kundenmanagement, Schadensübersicht, mobiles CRM und Echtzeit-Benachrichtigungen. Jetzt registrieren!"
        keywords="Versicherungsvertreter Software, Versicherungsagentur CRM, Schadenmanagement Software, Versicherungsmakler App, Kundenverwaltung Versicherung, mobile CRM Versicherung, B2B Versicherung Software, Schadensfall Management, Versicherungs Software Österreich, Agenten Tools, InsurTech B2B, Versicherungsvertreter Digitalisierung, best insurance CRM Austria"
        ogImage="https://www.awen28.com/apps/Suremate_pro_home.png"
        ogType="product"
        canonical="https://www.awen28.com/suremate-pro"
        structuredData={[appStructuredData, breadcrumbData, faqData]}
        appName="Suremate Pro"
        appCategory="BusinessApplication"
        rating="4.9"
        reviewCount="200"
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
                <img src="/apps/surematepro_logo.png" alt="Suremate Pro" className="w-16 h-16 object-cover" />
              </div>
              <div>
                <h1 className="font-serif text-3xl" style={{ color: '#2a2a2a' }}>Suremate Pro</h1>
                <p className="text-sm" style={{ color: 'rgba(82, 80, 72, 0.6)' }}>For Insurance Agents</p>
              </div>
            </motion.div>

            <motion.h2 
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
              style={{ color: '#525048' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Professional tools
              <br />
              <span style={{ color: '#1e3a5f' }}>for agents</span>
            </motion.h2>

            <motion.p 
              className="text-lg mb-8 max-w-md"
              style={{ color: 'rgba(82, 80, 72, 0.7)' }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The professional companion for insurance agents. Manage clients, 
              create reports, and track your performance—all in one powerful app.
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
                Download Pro
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
                  20px 20px 40px rgba(0, 0, 0, 0.15),
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
                  src="/apps/surematepro_home.png"
                  alt="Suremate Pro App"
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
              Built for professionals
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
                    background: 'rgba(42, 42, 42, 0.08)',
                  }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: '#2a2a2a' }} />
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
              Powerful & Intuitive
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
                Why Suremate Pro?
              </h2>
              <div className="space-y-6">
                {[
                  'Manage unlimited clients',
                  'Advanced search & filtering',
                  'Detailed damage categorization',
                  'Professional PDF exports',
                  'Performance analytics & insights',
                  'Secure data synchronization',
                  'Built for Austrian insurance market',
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
                        background: 'rgba(42, 42, 42, 0.1)',
                      }}
                    >
                      <Check className="w-4 h-4" style={{ color: '#2a2a2a' }} />
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
                  src="/apps/surematepro_pdf.png"
                  alt="PDF Report Dark"
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
              background: 'linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 100%)',
              boxShadow: '0 32px 64px rgba(0, 0, 0, 0.25)',
            }}
          >
            <h2 
              className="font-serif text-4xl md:text-5xl text-white mb-6"
            >
              Elevate your insurance workflow
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
              Join professional agents using Suremate Pro to streamline their client management and damage reporting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/agentregister"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #B29F86, #E9CFB9)',
                  color: 'white',
                }}
              >
                <UserPlus className="w-5 h-5" />
                Register as Agent
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
                Download Pro
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
              <img src="/apps/surematepro_logo.png" alt="Suremate Pro" className="w-8 h-8 object-cover" />
            </div>
            <span className="font-serif text-xl" style={{ color: '#525048' }}>Suremate Pro</span>
          </div>
          <p className="text-sm" style={{ color: 'rgba(82, 80, 72, 0.5)' }}>
            © 2024 Suremate Pro. A product by Elior.
          </p>
          <div className="flex items-center gap-6">
            <Link 
              to="/agentportal"
              className="flex items-center gap-2 text-sm"
              style={{ color: '#2a2a2a' }}
            >
              Agent Portal
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/"
              className="flex items-center gap-2 text-sm"
              style={{ color: '#2a2a2a' }}
            >
              Visit Elior
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SurematePro;
