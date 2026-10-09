import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, Image, CheckCircle, Loader2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';
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

const CreateAgent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profilePicture: '',
  });
  const [agentCode, setAgentCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (location.pathname === '/createAgent') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location]);

  // Generate random 4-digit code
  const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Check if code exists and generate unique one
  const generateUniqueCode = async (): Promise<string> => {
    const code = generateRandomNumber();
    const agentRef = ref(database, `Agents/${code}`);
    
    try {
      const snapshot = await get(agentRef);
      
      if (snapshot.exists()) {
        return generateUniqueCode();
      }
      return code;
    } catch (error) {
      console.error('Error checking code:', error);
      return generateUniqueCode();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const uniqueCode = await generateUniqueCode();
      setAgentCode(uniqueCode);

      const agentRef = ref(database, `Agents/${uniqueCode}`);
      await set(agentRef, {
        name: formData.firstName,
        surname: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        image: formData.profilePicture || '',
        registered: 'no',
        timestamp: Date.now(),
      });

      setShowSuccess(true);
      
      // Start countdown
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate('/download-suremate-pro');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Error saving agent:', error);
      alert('Fehler beim Speichern. Bitte versuchen Sie es erneut.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Create Agent Profile | Suremate Pro"
        description="Create your Suremate Pro agent profile and receive your unique agent code."
        keywords="Suremate Pro agent, create agent, insurance agent registration"
        canonical="https://elior.studio/createAgent"
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
              to="/agentregister"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/80 hover:text-white transition-colors"
              style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </nav>

        {/* Success Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{ background: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(10px)' }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center p-8 max-w-md"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                
                <h2 className="text-3xl font-serif text-white mb-4">
                  Agent erfolgreich angelegt!
                </h2>
                
                <div 
                  className="text-5xl font-bold mb-6 py-4 px-8 rounded-2xl"
                  style={{ 
                    background: 'linear-gradient(135deg, #BBB1A4, #E3DED5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {agentCode}
                </div>
                
                <p className="text-white/60 mb-2">
                  Dein Agent-Code lautet:
                </p>
                <p className="text-white/80 text-lg mb-8">
                  Merke dir diesen Code gut! Du brauchst ihn zum Login.
                </p>
                
                <div className="flex items-center justify-center gap-2 text-white/50">
                  <span>Weiterleitung in</span>
                  <motion.span 
                    key={countdown}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold"
                    style={{ color: '#BBB1A4' }}
                  >
                    {countdown}
                  </motion.span>
                  <span>Sekunden...</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Form */}
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
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-serif text-white mb-2">
                Agent anlegen
              </h1>
              <p className="text-white/50 text-sm">
                Erstelle dein Suremate Pro Profil
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm mb-2 text-white/70">
                  Vorname *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-white/30 transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    placeholder="Max"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-white/70">
                  Nachname *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-white/30 transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    placeholder="Mustermann"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-white/70">
                  E-Mail *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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

              <div>
                <label className="block text-sm mb-2 text-white/70">
                  Telefon *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-white/30 transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    placeholder="+43 677 12345678"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-white/70">
                  Profilbild URL <span className="text-white/40">(optional)</span>
                </label>
                <div className="relative">
                  <Image className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="url"
                    name="profilePicture"
                    value={formData.profilePicture}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-white/30 transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl flex items-center justify-center gap-3 text-white font-medium transition-all disabled:opacity-70"
                style={{
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Wird erstellt...</span>
                  </>
                ) : (
                  <>
                    <span>Agent anlegen</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-center text-white/40 text-sm mt-6">
              Bereits registriert?{' '}
              <Link to="/forgotcode" className="text-white/60 hover:text-white underline">
                Code vergessen
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CreateAgent;
