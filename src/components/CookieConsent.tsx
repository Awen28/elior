import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
        >
          <div
            className="max-w-4xl mx-auto p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4"
            style={{
              background: '#525342',
              border: '1px solid rgba(186, 154, 106, 0.2)',
              boxShadow:
                '0 -10px 40px rgba(38, 36, 31, 0.25), inset 0 1px 0 rgba(228, 220, 206, 0.08)',
            }}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: '#C9A97B',
                boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.25), inset -1px -1px 2px rgba(255,255,255,0.35)',
              }}
            >
              <Info className="w-5 h-5" style={{ color: '#4E4F41' }} />
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3
                className="font-serif text-base mb-1"
                style={{ color: '#EDE8DD' }}
              >
                Your privacy — simply explained
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(228, 220, 206, 0.7)' }}
              >
                This website sets{' '}
                <span className="font-medium" style={{ color: '#EDE8DD' }}>no tracking or advertising cookies</span>.
                A single entry in your browser's local storage remembers this choice. Read more in our{' '}
                <a
                  href="/cookies"
                  className="underline hover:no-underline"
                  style={{ color: '#C9A97B' }}
                >
                  Cookie Policy
                </a>
                .
              </p>
            </div>

            {/* Button */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleAccept}
                className="w-full md:w-auto px-7 py-3 font-sans text-[0.75rem] tracking-[0.16em] uppercase transition-all hover:scale-105"
                style={{
                  background: '#C9A97B',
                  color: '#4E4F41',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -2px 6px rgba(0,0,0,0.2)',
                }}
              >
                Understood
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;