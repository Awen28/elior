import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Shield, Database, Cloud, Globe, ChevronRight, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const OrbitPrivacy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const handleBackClick = () => {
    sessionStorage.setItem('orbitScrollPosition', window.scrollY.toString());
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0a12' }}>
      <SEO
        title="Privacy Policy | Orbit - The Game | Elior"
        description="Privacy Policy for Orbit - The Game iOS app by Elior."
        canonical="https://elior.studio/orbit/privacy"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-8" style={{ background: 'rgba(10, 10, 18, 0.8)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/orbit" onClick={handleBackClick} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Orbit
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #BBB1A4, #E3DED5)' }}>
              <Circle className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif text-2xl text-white">Orbit</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a12 50%, #050508 100%)' }} />
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(178, 159, 134, 0.15) 0%, transparent 60%)' }}
          />
        </div>

        {/* Floating stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i * 0.2, delay: i * 0.1, repeat: Infinity }}
            className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
            style={{
              background: '#BBB1A4',
              left: `${5 + (i * 6.5) % 90}%`,
              top: `${10 + (i % 5) * 15}%`,
              boxShadow: '0 0 8px rgba(178, 159, 134, 0.8)',
            }}
          />
        ))}

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #BBB1A4, #E3DED5)' }}
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-6xl text-white mb-4"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/50"
            >
              For Orbit - The Game
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <main className="px-6 md:px-8 py-12 relative" style={{ background: '#0a0a12' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(26, 26, 46, 0.3) 0%, transparent 60%)' }} />

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="p-8 md:p-12 rounded-[30px]"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="space-y-10">

              <section>
                <p className="text-sm leading-relaxed text-white/60">
                  This Privacy Policy describes how Elior ("we", "us", or "our") collects, uses, and protects your personal information when you use the Orbit mobile application (the "App"). By using the App, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-white">
                  Data Controller
                </h2>
                <div className="p-6 rounded-2xl" style={{ background: 'rgba(178, 159, 134, 0.1)', border: '1px solid rgba(178, 159, 134, 0.2)' }}>
                  <p className="font-medium text-white">
                    Thomas Mayrl
                  </p>
                  <p className="text-white/60">
                    Johannesfeldstrasse 44, 6111 Volders, Austria
                  </p>
                  <p className="text-white/60">
                    info@elior.studio
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-white">
                  Information We Collect
                </h2>
                <p className="text-sm leading-relaxed text-white/60 mb-4">
                  We collect information to provide and improve the App. The types of information we may collect include:
                </p>
                <div className="space-y-3">
                  {[
                    { label: 'Game Data', desc: 'High scores, game progress, achievements, and gameplay statistics' },
                    { label: 'Device Information', desc: 'Device model, iOS version, unique device identifiers' },
                    { label: 'Usage Data', desc: 'App interactions, session duration, feature usage, crash reports' },
                    { label: 'Advertising Data', desc: 'Ad interactions, ad preferences (via Google AdMob)' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-xl gap-1"
                      style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                      <span className="font-medium text-sm text-white">
                        {item.label}
                      </span>
                      <span className="text-sm text-white/50 sm:text-right">
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-white">
                  How We Use Your Information
                </h2>
                <div className="space-y-3">
                  {[
                    'To provide and maintain the App',
                    'To track high scores and leaderboard rankings',
                    'To improve the App experience and fix bugs',
                    'To display relevant advertisements',
                    'To analyze usage patterns and optimize performance',
                    'To communicate with you about updates or support',
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#BBB1A4' }} />
                      <span className="text-sm text-white/60">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-white">
                  Third-Party Services
                </h2>
                <p className="text-sm text-white/60 mb-4">
                  The App uses the following third-party services that may collect information:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      icon: Database,
                      name: 'Google AdMob',
                      purpose: 'Serving advertisements',
                      data: 'Device ID, ad interactions, advertising identifiers',
                    },
                    {
                      icon: Cloud,
                      name: 'Firebase Analytics',
                      purpose: 'App usage analytics and crash reporting',
                      data: 'App usage events, session data, device info',
                    },
                    {
                      icon: Globe,
                      name: 'Game Center',
                      purpose: 'Leaderboards and achievements',
                      data: 'Apple Game Center ID, scores, achievements',
                    },
                  ].map((party, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <party.icon className="w-5 h-5" style={{ color: '#BBB1A4' }} />
                        <p className="font-medium text-white">
                          {party.name}
                        </p>
                      </div>
                      <p className="text-sm text-white/50 mb-1">
                        <strong className="text-white/60">Purpose:</strong> {party.purpose}
                      </p>
                      <p className="text-xs text-white/40">
                        <strong className="text-white/50">Data:</strong> {party.data}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-white">
                  Data Sharing
                </h2>
                <p className="text-sm leading-relaxed text-white/60">
                  We do not sell your personal information. We may share information with third-party service providers
                  (as listed above) solely for the purposes described in this policy. These providers are obligated to
                  protect your data and use it only for the purposes we specify.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-white">
                  Data Retention
                </h2>
                <p className="text-sm leading-relaxed text-white/60">
                  We retain your game data and high scores as long as you use the App.
                  If you delete the App, your game progress and scores will be lost.
                  Advertising and analytics data may be retained by third-party providers according to their own retention policies.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-white">
                  Your Rights (GDPR)
                </h2>
                <div className="p-6 rounded-2xl" style={{ background: 'rgba(178, 159, 134, 0.1)', border: '1px solid rgba(178, 159, 134, 0.2)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5" style={{ color: '#BBB1A4' }} />
                    <p className="font-medium text-white">
                      Your Data Protection Rights
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm text-white/60 list-disc list-inside">
                    <li>Right to access your personal data</li>
                    <li>Right to rectification of inaccurate data</li>
                    <li>Right to erasure of your data</li>
                    <li>Right to restrict processing</li>
                    <li>Right to data portability</li>
                    <li>Right to object to processing</li>
                    <li>Right to withdraw consent at any time</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-white">
                  Children's Privacy
                </h2>
                <p className="text-sm leading-relaxed text-white/60">
                  The App is rated 4+ and suitable for all ages. We do not knowingly collect personally identifiable
                  information from children under 13. If we become aware that a child under 13 has provided us with
                  personal information, we will take steps to delete such information promptly.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-white">
                  Changes to This Policy
                </h2>
                <p className="text-sm leading-relaxed text-white/60">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                  the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically
                  for any changes.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl mb-4 text-white">
                  Contact Us
                </h2>
                <p className="text-sm text-white/60">
                  If you have any questions about this Privacy Policy, please contact us at:<br />
                  <a
                    href="mailto:info@elior.studio"
                    className="underline hover:no-underline"
                    style={{ color: '#BBB1A4' }}
                  >
                    info@elior.studio
                  </a>
                </p>
              </section>

              <section>
                <p
                  className="text-xs text-center pt-8 border-t"
                  style={{
                    color: 'rgba(255,255,255,0.3)',
                    borderColor: 'rgba(255,255,255,0.08)'
                  }}
                >
                  Last updated: July 2026
                </p>
              </section>
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-8 flex justify-center gap-6 text-xs"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            <Link to="/orbit" onClick={handleBackClick} className="hover:text-white/60 transition-colors">Back to Orbit</Link>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8" style={{ background: '#050508', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #BBB1A4, #E3DED5)' }}>
              <Circle className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif text-2xl text-white">Orbit</span>
          </div>
          <p className="text-sm text-white/40">
            &copy; 2026 Orbit. A product by Elior.
          </p>
          <Link to="/" onClick={handleBackClick} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            Visit Elior
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default OrbitPrivacy;
