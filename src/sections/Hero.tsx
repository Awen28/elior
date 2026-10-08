import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

const nameLetters = ['E', 'L', 'I', 'O', 'R'];
const subtitleWords = ['iOS', 'Web', 'Brand', 'AI'];
const services = ['iOS Development', 'Android', 'Webdesign', 'AI Integration', 'Brand Identity'];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [starHint, setStarHint] = useState(false);

  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Title rotation follows mouse
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);

  // אליאור watermark moves OPPOSITE to title (parallax) - like the old 28
  const shadowX = useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]);
  const shadowY = useTransform(smoothMouseY, [-0.5, 0.5], [18, -18]);

  // Background parallax
  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]);
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], [-16, 16]);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!e.beta || !e.gamma) return;
      const x = Math.min(Math.max(e.gamma / 45, -0.5), 0.5);
      const y = Math.min(Math.max(e.beta / 45, -0.5), 0.5);
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [mouseX, mouseY]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F7F3ED 0%, #F1EDE6 45%, #E9E2D7 100%)' }}
    >
      {/* Animated Clay Background - light formed in the stone */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: bgX, y: bgY }}
      >
        {/* soft god-light orb */}
        <motion.div
          className="absolute top-[12%] left-[12%] w-[420px] h-[420px] rounded-full"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.12, 0.24, 0.12],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: 'radial-gradient(circle, rgba(186,152,106,0.6) 0%, transparent 70%)',
          }}
        />
        {/* stone valley glow */}
        <motion.div
          className="absolute bottom-[22%] right-[8%] w-[380px] h-[380px] rounded-full"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(187,177,164,0.55) 0%, transparent 70%)',
          }}
        />
        {/* olive depth */}
        <motion.div
          className="absolute top-[45%] left-[55%] w-[300px] h-[300px] rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(82,82,64,0.5) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* אליאור - Hebrew watermark like the eternal light (the new "28") */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4 }}
        style={{
          x: shadowX,
          y: shadowY,
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="font-serif text-[14rem] md:text-[18rem] lg:text-[21rem] leading-none"
          style={{
            color: '#E9E2D7',
            textShadow: `
              2px 2px 4px rgba(255, 255, 255, 0.6),
              6px 8px 18px rgba(154, 143, 128, 0.18),
              12px 14px 30px rgba(82, 82, 64, 0.10),
              -2px -2px 4px rgba(255, 255, 255, 0.7)
            `,
            opacity: 0.95,
          }}
        >
          אליאור
        </span>
      </motion.div>

      {/* Elior Star - floating decorative easter egg */}
      <motion.div
        className="absolute top-16 right-8 md:top-20 md:right-16 w-16 h-16 md:w-20 md:h-20"
        animate={{
          y: [0, -12, 0],
          rotate: [0, 8, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15, rotate: 180, transition: { duration: 0.6 } }}
        onHoverStart={() => setStarHint(true)}
        onHoverEnd={() => setStarHint(false)}
        style={{
          x: useTransform(smoothMouseX, [-0.5, 0.5], [12, -12]),
          y: useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]),
        }}
      >
        <img src="/logos/elior-star.png" alt="Elior Star" className="w-full h-full object-contain drop-shadow-[4px_6px_10px_rgba(154,143,128,0.35)]" />
        {/* Easter egg: the star is the light */}
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: starHint ? 1 : 0, y: starHint ? 0 : -6 }}
          className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full clay-pressed pointer-events-none"
        >
          Gott ist mein Licht
        </motion.span>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-wider uppercase clay-pill"
            style={{ color: '#525240' }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#BA986A' }} />
            Elior · Digital Studio
          </span>
        </motion.div>

        {/* Main Title - ELIOR formed OUT of the background */}
        <div className="relative mb-6" style={{ perspective: '1000px' }}>
          {/* Elior - clay extruded letters */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="flex justify-center gap-1 md:gap-4">
              {nameLetters.map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  initial={{ y: 120, opacity: 0, rotateX: 40 }}
                  animate={isLoaded ? { y: 0, opacity: 1, rotateX: 0 } : {}}
                  transition={{
                    duration: 0.9,
                    delay: 0.25 + letterIndex * 0.09,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    scale: 1.08,
                    color: '#BA986A',
                    transition: { duration: 0.2 },
                  }}
                  onMouseEnter={() => letterIndex === 4 && setStarHint(true)}
                  onMouseLeave={() => setStarHint(false)}
                  className="font-serif text-[4.2rem] sm:text-[6rem] md:text-[8.5rem] lg:text-[10rem] xl:text-[11.5rem] font-medium leading-none cursor-default inline-block pb-2"
                  style={{
                    color: '#20201E',
                    // Realistic clay - carved out of the background
                    textShadow: `
                      /* raised edge top-left */
                      -1px -1px 1px rgba(255, 255, 255, 0.95),
                      -2px -2px 3px rgba(255, 255, 255, 0.8),
                      /* deep warm shadow bottom-right */
                      3px 3px 4px rgba(154, 143, 128, 0.35),
                      6px 8px 12px rgba(154, 143, 128, 0.25),
                      12px 16px 28px rgba(82, 82, 64, 0.14),
                      22px 28px 48px rgba(32, 32, 30, 0.08),
                      /* soft inner shadow */
                      0 2px 2px rgba(32, 32, 30, 0.06)
                    `,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mb-6"
        >
          <span
            className="font-serif italic text-2xl md:text-4xl"
            style={{ color: '#525240' }}
          >
            Built with <span style={{ color: '#BA986A' }}>meaning</span>.
          </span>
        </motion.div>

        {/* Animated Tagline Words */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-wrap justify-center items-center gap-3 md:gap-5 mb-10"
        >
          {subtitleWords.map((word, idx) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, x: -15 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.1 + idx * 0.1 }}
              whileHover={{
                scale: 1.1,
                color: '#BA986A',
                transition: { duration: 0.2 }
              }}
              className="font-sans text-lg md:text-xl font-light cursor-default px-3 py-1 rounded-full transition-colors"
              style={{ color: '#525240' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Description with meaning */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          style={{ color: 'rgba(32, 32, 30, 0.75)' }}
        >
          <span className="font-serif italic" style={{ color: '#525240' }}>Elior</span> is Hebrew for{' '}
          <span
            className="font-medium px-2 py-0.5 rounded-md mx-1 clay-pressed"
            style={{ color: '#BA986A' }}
          >
            „Gott ist mein Licht"
          </span>
          {' '}— we craft{' '}
          <span
            className="font-medium px-2 py-0.5 rounded-md mx-1"
            style={{ background: 'rgba(186, 152, 106, 0.14)', boxShadow: 'inset 0 -1px 0 rgba(186,152,106,0.3)' }}
          >
            iOS apps
          </span>
          ,{' '}
          <span
            className="font-medium px-2 py-0.5 rounded-md mx-1"
            style={{ background: 'rgba(187, 177, 164, 0.3)' }}
          >
            websites
          </span>
          , and{' '}
          <span
            className="font-medium px-2 py-0.5 rounded-md mx-1"
            style={{ background: 'rgba(82, 82, 64, 0.12)' }}
          >
            digital identities
          </span>
          {' '}that carry meaning.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => handleNavClick('#contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group px-8 py-4 rounded-full flex items-center gap-3 text-sm tracking-wider uppercase clay-dark"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            onClick={() => handleNavClick('#work')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full text-sm tracking-wider uppercase clay-pill"
            style={{ color: '#20201E' }}
          >
            View Our Work
          </motion.button>
        </motion.div>

        {/* Service Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex flex-wrap justify-center gap-3 mt-14"
        >
          {services.map((service, idx) => (
            <motion.span
              key={service}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.9 + idx * 0.08 }}
              whileHover={{
                scale: 1.08,
                y: -2,
                color: '#BA986A',
                transition: { duration: 0.2 }
              }}
              className="px-4 py-2 rounded-full text-xs cursor-default transition-colors"
              style={{
                color: 'rgba(32, 32, 30, 0.7)',
                background: 'rgba(247, 243, 237, 0.5)',
                boxShadow: `
                  inset 2px 2px 4px rgba(255, 255, 255, 0.7),
                  inset -2px -2px 5px rgba(154, 143, 128, 0.18),
                  3px 3px 7px rgba(154, 143, 128, 0.22),
                  6px 6px 14px rgba(154, 143, 128, 0.12)
                `,
              }}
            >
              {service}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 2.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => handleNavClick('#services')}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          className="flex flex-col items-center gap-2 group"
        >
          <span
            className="text-xs tracking-widest uppercase opacity-40 group-hover:opacity-70 transition-opacity"
            style={{ color: '#525240' }}
          >
            Scroll
          </span>
          <ChevronDown
            className="w-5 h-5 transition-colors"
            style={{ color: '#BA986A' }}
          />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;