import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Shield, Check, Star, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO } from '../components/SEO';

// Stripe Pricing Table type declaration
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': {
        'pricing-table-id': string;
        'publishable-key': string;
      };
    }
  }
}

const features = [
  'Professional client management',
  'Advanced analytics dashboard', 
  'PDF report generation',
  'Priority support',
  'Team collaboration tools',
];

const AgentRegister = () => {
  const location = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [stripeLoaded, setStripeLoaded] = useState(false);

  useEffect(() => {
    if (location.pathname === '/agentregister') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location]);

  // Load Stripe Pricing Table Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    script.onload = () => setStripeLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <SEO
        title="Suremate Pro - Agent Registration | Professional Insurance Tools" tabTitle="Suremate Pro"
        description="Register as a Suremate Pro agent. Professional insurance tools for agents with client management, analytics, and advanced reporting."
        keywords="Suremate Pro, insurance agent registration, agent portal, insurance software, professional insurance tools"
        canonical="https://elior.studio/agentregister"
        noindex
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
              Back to Suremate Pro
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
              style={{ background: 'rgba(178, 159, 134, 0.15)' }}
            >
              <Shield className="w-4 h-4" style={{ color: '#BBB1A4' }} />
              <span className="text-sm" style={{ color: '#BBB1A4' }}>Agent Registration</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ color: '#525240' }}
            >
              Become a <span style={{ color: '#BBB1A4' }}>Suremate Pro</span> Agent
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-12 max-w-2xl mx-auto"
              style={{ color: 'rgba(82, 82, 64, 0.7)' }}
            >
              Join our network of professional insurance agents. Get access to advanced tools 
              designed to streamline your workflow and impress your clients.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: 'rgba(233, 207, 185, 0.3)' }}
                >
                  <Check className="w-4 h-4" style={{ color: '#BBB1A4' }} />
                  <span className="text-sm" style={{ color: '#525240' }}>{feature}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stripe Pricing Table Section */}
        <section className="py-20 px-6 md:px-8" style={{ background: '#F7F3ED' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: '#525240' }}>
                Choose Your Plan
              </h2>
              <p style={{ color: 'rgba(82, 82, 64, 0.6)' }}>
                Select the plan that fits your needs. All plans include a 14-day free trial.
              </p>
            </motion.div>

            {/* Stripe Pricing Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl p-8"
              style={{
                background: '#F1EDE6',
                boxShadow: `
                  inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                  inset -3px -3px 6px rgba(82, 82, 64, 0.04),
                  12px 12px 24px rgba(82, 82, 64, 0.06),
                  -12px -12px 24px rgba(255, 255, 255, 0.9)
                `,
              }}
            >
              {stripeLoaded ? (
                // @ts-ignore - Stripe pricing table web component
                <stripe-pricing-table
                  pricing-table-id="prctbl_1PMCc3G5F1MkX1ZGWH3uB99F"
                  publishable-key="pk_live_51PMBmdG5F1MkX1ZGm61NxAnZZrdJjUSLrgllGP5d70RbFL2Uo184sxWqU79Lqw4rid4eLN6inreGoULeUThlYGJI00SHboVlKb"
                />
              ) : (
                <div className="flex items-center justify-center py-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-3 rounded-full"
                    style={{ 
                      borderColor: 'rgba(178, 159, 134, 0.3)',
                      borderTopColor: '#BBB1A4',
                      borderWidth: '3px'
                    }}
                  />
                </div>
              )}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex flex-wrap justify-center gap-8"
            >
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.6)' }}>
                  4.9/5 Rating
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" style={{ color: '#BBB1A4' }} />
                <span className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.6)' }}>
                  Secure Payment
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm" style={{ color: 'rgba(82, 82, 64, 0.6)' }}>
                  14-Day Free Trial
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl text-center mb-12"
              style={{ color: '#525240' }}
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  q: 'What happens after I subscribe?',
                  a: 'After subscribing, you will be redirected to create your agent profile and receive your unique agent code.',
                },
                {
                  q: 'Can I cancel anytime?',
                  a: 'Yes, you can cancel your subscription at any time. Your access continues until the end of the billing period.',
                },
                {
                  q: 'Is there a free trial?',
                  a: 'Yes, all plans include a 14-day free trial. No credit card required to start.',
                },
                {
                  q: 'What payment methods are accepted?',
                  a: 'We accept all major credit cards, PayPal, and SEPA bank transfers for annual plans.',
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl"
                  style={{
                    background: '#F7F3ED',
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(82, 82, 64, 0.04)
                    `,
                  }}
                >
                  <h3 className="font-medium mb-2" style={{ color: '#525240' }}>
                    {faq.q}
                  </h3>
                  <p style={{ color: 'rgba(82, 82, 64, 0.6)' }}>{faq.a}</p>
                </motion.div>
              ))}
            </div>
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
              style={{ color: '#BBB1A4' }}
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

export default AgentRegister;
