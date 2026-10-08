import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Download, Check, Smartphone, Shield, ChevronRight, Star, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const features = [
  'Professional client management',
  'Advanced claim analytics',
  'PDF report generation',
  'Offline access',
  'Secure data encryption',
  'Team collaboration',
];

const steps = [
  {
    icon: Download,
    title: 'Download the App',
    description: 'Get Suremate Pro from the App Store on your iPhone or iPad.',
  },
  {
    icon: Smartphone,
    title: 'Open the App',
    description: 'Launch Suremate Pro and tap on "Agent Login".',
  },
  {
    icon: Shield,
    title: 'Enter Your Code',
    description: 'Use your unique 4-digit agent code to access your account.',
  },
];

const DownloadSurematePro = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <SEO
        title="Download Suremate Pro | Professional Insurance Agent App"
        description="Download Suremate Pro for iOS. The professional insurance management app for agents with client management, analytics, and reporting tools."
        keywords="Suremate Pro download, insurance agent app, iOS app download, insurance management"
        canonical="https://www.awen28.com/download-suremate-pro"
      />
      <div className="relative min-h-screen" style={{ background: '#F1EDE6' }}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link 
              to="/suremate-pro"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ 
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                color: '#525240',
                boxShadow: '0 4px 12px rgba(82, 82, 64, 0.08)',
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section ref={sectionRef} className="relative pt-32 pb-20 px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ background: 'rgba(107, 107, 107, 0.15)' }}
            >
              <Check className="w-4 h-4" style={{ color: '#6b6b6b' }} />
              <span className="text-sm" style={{ color: '#6b6b6b' }}>Registration Complete</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ color: '#525240' }}
            >
              Download <span style={{ color: '#6b6b6b' }}>Suremate Pro</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: 'rgba(82, 82, 64, 0.7)' }}
            >
              Your agent account has been created successfully. Download the app now and start managing your clients like a pro.
            </motion.p>

            {/* Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <motion.a
                href="https://apps.apple.com/at/app/suremate-pro/id6502916525"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-medium"
                style={{
                  background: '#000000',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                }}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-lg font-semibold -mt-1">App Store</div>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full"
                style={{
                  background: '#F7F3ED',
                  border: '1px solid rgba(82, 82, 64, 0.1)',
                }}
              >
                <QrCode className="w-6 h-6" style={{ color: '#525240' }} />
                <div className="text-left">
                  <div className="text-xs" style={{ color: 'rgba(82, 82, 64, 0.6)' }}>Scan to download</div>
                  <div className="text-sm font-medium" style={{ color: '#525240' }}>QR Code</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Rating */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-2"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.6)' }}>
                4.9 Rating • 500+ Downloads
              </span>
            </motion.div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 px-6 md:px-8" style={{ background: '#F7F3ED' }}>
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl text-center mb-16"
              style={{ color: '#525240' }}
            >
              Get Started in 3 Easy Steps
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div 
                    className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                    style={{ 
                      background: 'linear-gradient(135deg, #6b6b6b20, #6b6b6b10)',
                      border: '1px solid rgba(107, 107, 107, 0.2)',
                    }}
                  >
                    <step.icon className="w-10 h-10" style={{ color: '#6b6b6b' }} />
                  </div>
                  <div 
                    className="w-8 h-8 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: '#6b6b6b' }}
                  >
                    {idx + 1}
                  </div>
                  <h3 className="font-serif text-xl mb-3" style={{ color: '#525240' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'rgba(82, 82, 64, 0.6)' }}>
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-3xl"
              style={{
                background: '#F7F3ED',
                boxShadow: `
                  inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                  inset -3px -3px 6px rgba(82, 82, 64, 0.04),
                  12px 12px 24px rgba(82, 82, 64, 0.06),
                  -12px -12px 24px rgba(255, 255, 255, 0.9)
                `,
              }}
            >
              <h2 
                className="font-serif text-3xl text-center mb-12"
                style={{ color: '#525240' }}
              >
                Everything You Need
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(107, 107, 107, 0.15)' }}
                    >
                      <Check className="w-5 h-5" style={{ color: '#6b6b6b' }} />
                    </div>
                    <span style={{ color: 'rgba(82, 82, 64, 0.8)' }}>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-20 px-6 md:px-8" style={{ background: '#F7F3ED' }}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl mb-6" style={{ color: '#525240' }}>
                Need Help?
              </h2>
              <p className="mb-8" style={{ color: 'rgba(82, 82, 64, 0.6)' }}>
                Our support team is here to help you get started with Suremate Pro.
              </p>
              <motion.a
                href="mailto:support@awen28.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
                style={{
                  background: '#525240',
                  color: '#F1EDE6',
                }}
              >
                <span>Contact Support</span>
                <ChevronRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 md:px-8" style={{ background: '#E8E5E0' }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: '#6b6b6b' }}
              >
                <span className="text-white font-serif text-sm font-bold">SP</span>
              </div>
              <span className="font-serif text-xl" style={{ color: '#525240' }}>Suremate Pro</span>
            </div>
            <p className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.5)' }}>
              © 2024 Suremate Pro. A product by Elior.
            </p>
            <Link 
              to="/"
              className="flex items-center gap-2 text-sm"
              style={{ color: '#6b6b6b' }}
            >
              Visit Elior
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default DownloadSurematePro;
