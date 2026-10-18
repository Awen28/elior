import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, Search, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { SEO } from '../components/SEO';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU6UYtuuhdpCjo6JxncwjX7iAnruB-dEA",
  authDomain: "insurancehelp-ea254.firebaseapp.com",
  databaseURL: "https://insurancehelp-ea254-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "insurancehelp-ea254",
  storageBucket: "insurancehelp-ea254.appspot.com",
  messagingSenderId: "943116013085",
  appId: "G-8MZY96YFTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const ForgotCode = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<{ found: boolean; code?: string; name?: string } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSearching(true);
    setResult(null);

    try {
      const agentsRef = ref(database, 'Agents');
      const emailQuery = query(agentsRef, orderByChild('email'), equalTo(email));
      const snapshot = await get(emailQuery);

      if (snapshot.exists()) {
        const agentData = snapshot.val();
        const agentCode = Object.keys(agentData)[0];
        const agent = agentData[agentCode];
        
        setResult({
          found: true,
          code: agentCode,
          name: `${agent.name} ${agent.surname}`,
        });
      } else {
        setResult({ found: false });
      }
    } catch (error) {
      console.error('Error searching agent:', error);
      setResult({ found: false });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <SEO
        title="Agent Code Forgotten | Suremate Pro" tabTitle="Suremate Pro"
        description="Retrieve your Suremate Pro agent code by email."
        keywords="Suremate Pro agent code, forgot code, agent login help"
        canonical="https://elior.studio/forgotcode"
        noindex
      />
      <div className="relative min-h-screen flex items-center justify-center" style={{ background: '#000000' }}>
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #BBB1A4 0%, transparent 70%)' }}
          />
          <div 
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #525240 0%, transparent 70%)' }}
          />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4">
          <div className="max-w-7xl mx-auto">
            <Link 
              to="/createAgent"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/80 hover:text-white transition-colors"
              style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md mx-4"
        >
          <div 
            className="p-8 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div 
                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #BBB1A4, #E3DED5)' }}
              >
                <Search className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-serif text-white mb-2">
                Agentcode finden
              </h1>
              <p className="text-white/50 text-sm">
                Gib deine E-Mail-Adresse ein um deinen Code zu finden
              </p>
            </div>

            <form onSubmit={handleSearch} className="space-y-5">
              <div>
                <label className="block text-sm mb-2 text-white/70">
                  E-Mail-Adresse
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-white/30 transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    placeholder="max@beispiel.at"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSearching}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl flex items-center justify-center gap-3 text-white font-medium transition-all disabled:opacity-70"
                style={{
                  background: 'linear-gradient(135deg, #BBB1A4, #E3DED5)',
                }}
              >
                {isSearching ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>Suche...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Agentcode finden</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Results */}
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6"
                >
                  {result.found ? (
                    <div 
                      className="p-6 rounded-2xl text-center"
                      style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                      }}
                    >
                      <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                      <p className="text-white/60 text-sm mb-2">
                        Agent gefunden{result.name ? `: ${result.name}` : ''}
                      </p>
                      <p className="text-white/80 text-sm mb-3">
                        Dein Agentcode lautet:
                      </p>
                      <div 
                        className="text-4xl font-bold py-3 px-6 rounded-xl"
                        style={{ 
                          background: 'rgba(34, 197, 94, 0.2)',
                          color: '#22c55e',
                        }}
                      >
                        {result.code}
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="p-6 rounded-2xl text-center"
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                      }}
                    >
                      <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                      <p className="text-white/60 text-sm">
                        Kein Agent mit dieser E-Mail-Adresse gefunden.
                      </p>
                      <p className="text-white/40 text-xs mt-2">
                        Bitte überprüfe die Eingabe oder registriere dich neu.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-white/40 text-sm mt-6">
              Noch kein Agent?{' '}
              <Link to="/createAgent" className="text-white/60 hover:text-white underline">
                Jetzt registrieren
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ForgotCode;
