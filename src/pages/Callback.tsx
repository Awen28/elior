import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

const Callback = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 100);

    // Redirect after 2.5 seconds
    const redirectTimer = setTimeout(() => {
      window.location.href = 'kibook://auth-callback';
    }, 2500);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #F1EDE6 0%, #E3DED5 100%)' }}
    >
      <SEO 
        title="Erfolgreich verifiziert | kiBook"
        description="Deine E-Mail wurde erfolgreich verifiziert. Du wirst gleich zu kiBook weitergeleitet."
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div 
          className="p-10 md:p-12 rounded-[30px] text-center"
          style={{ 
            background: '#F1EDE6',
            boxShadow: `
              inset 3px 3px 6px rgba(82, 82, 64, 0.04),
              inset -3px -3px 6px rgba(82, 82, 64, 0.04),
              12px 12px 24px rgba(82, 82, 64, 0.06),
              -12px -12px 24px rgba(255, 255, 255, 0.9)
            `
          }}
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center"
            style={{ 
              background: 'linear-gradient(135deg, #10b981, #34d399)',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
            }}
          >
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
          </motion.div>

          {/* Text */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-3xl mb-4"
            style={{ color: '#2a2a2a' }}
          >
            Erfolgreich verifiziert 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base mb-10"
            style={{ color: 'rgba(82, 82, 64, 0.7)' }}
          >
            Du wirst gleich automatisch zu kiBook zurückgeleitet...
          </motion.p>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full h-2 rounded-full overflow-hidden mb-8"
            style={{ background: 'rgba(82, 82, 64, 0.1)' }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full rounded-full"
              style={{ 
                background: 'linear-gradient(90deg, #BBB1A4, #E3DED5)'
              }}
            />
          </motion.div>

          {/* App Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-3"
          >
            <div 
              className="w-10 h-10 rounded-xl overflow-hidden"
              style={{ background: '#1a1a2e' }}
            >
              <img 
                src="/apps/kiBook_Logo_gelb.webp" 
                alt="kiBook" 
                className="w-10 h-10 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <span className="font-serif text-lg" style={{ color: '#525240' }}>kiBook</span>
          </motion.div>
        </div>

        {/* Manual Redirect Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-sm"
          style={{ color: 'rgba(82, 82, 64, 0.5)' }}
        >
          Wird nicht weitergeleitet?{' '}
          <button
            onClick={() => window.location.href = 'kibook://auth-callback'}
            className="underline hover:text-[#BBB1A4] transition-colors"
            style={{ color: '#BBB1A4' }}
          >
            Hier klicken
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Callback;
