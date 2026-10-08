import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

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

  const handleClose = () => {
    // Even if they just close it, we remember the choice
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
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div 
            className="max-w-4xl mx-auto p-5 md:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-4"
            style={{
              background: 'rgba(250, 249, 247, 0.98)',
              border: '1px solid rgba(82, 82, 64, 0.1)',
              boxShadow: '0 -10px 40px rgba(82, 82, 64, 0.1), 0 4px 20px rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Icon */}
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #E3DED5, #BBB1A4)' }}
            >
              <Cookie className="w-6 h-6 text-white" />
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3 
                className="font-medium text-base mb-1"
                style={{ color: '#525240' }}
              >
                Wir verwenden Cookies
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(82, 82, 64, 0.6)' }}
              >
                Diese Website nutzt ausschließlich technisch notwendige Cookies für den Betrieb der Seite. 
                Weitere Informationen finden Sie in unserer{' '}
                <a 
                  href="/cookies"
                  className="underline hover:no-underline"
                  style={{ color: '#BBB1A4' }}
                >
                  Cookie-Richtlinie
                </a>.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-6 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: '#525240',
                  color: '#F1EDE6',
                }}
              >
                Verstanden
              </button>
              
              <button
                onClick={handleClose}
                className="p-3 rounded-xl transition-colors hover:bg-black/5"
                style={{ color: 'rgba(82, 82, 64, 0.4)' }}
                aria-label="Schließen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
