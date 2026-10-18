import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import LiquidChrome from '../components/LiquidChrome';

const ease = [0.22, 1, 0.36, 1] as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const Hero = () => {
  const reduceMotion = useReducedMotion();

  // Licht folgt dem Cursor: Highlight zur Lichtquelle, Schatten davon weg
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const lightX = useSpring(pointerX, { stiffness: 55, damping: 22, mass: 0.7 });
  const lightY = useSpring(pointerY, { stiffness: 55, damping: 22, mass: 0.7 });
  const whiteX = useTransform(lightX, (v) => -1.5 + v * 3);
  const whiteY = useTransform(lightY, (v) => -1.5 + v * 3);
  const darkX = useTransform(lightX, (v) => 1.5 - v * 3);
  const darkY = useTransform(lightY, (v) => 2 - v * 3);
  const titleShadow = useMotionTemplate`
    ${whiteX}px ${whiteY}px 2px rgba(255, 255, 255, 0.42),
    ${darkX}px ${darkY}px 2px rgba(84, 76, 66, 0.38),
    0 12px 36px rgba(84, 76, 66, 0.18)
  `;

  useEffect(() => {
    if (reduceMotion) return;
    const handleMove = (e: MouseEvent) => {
      pointerX.set(clamp((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2), -1, 1));
      pointerY.set(clamp((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2), -1, 1));
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24"
      style={{ background: '#BBB1A4' }}
    >
      {/* Flüssiges Chrom hinter dem Schriftzug */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <LiquidChrome
          color="#bbb1a4"
          speed={0.05}
          amplitude={0.42}
          detail={1}
          thickness={0.5}
          interactive={true}
          frequencyX={4}
          frequencyY={5}
          depth={0.4}
          roughness={0.7}
          exposure={2}
          rippleSize={1.15}
          tilt={0.85}
        />
      </div>

      {/* soft light from above */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[70vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 50% 0%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      {/* Zentrierter Block in einem Rutsch, konsistente Abstände */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">

        {/* Symbol — Über ELIOR, gleicher Stanz-Effekt */}
        <motion.img
          src="/logos/elior-symbol.svg"
          alt="ELIOR symbol"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.4, ease }}
          className="w-14 md:w-20 mb-10 md:mb-14"
          style={{
            filter: `
              drop-shadow(-2px -2px 3px rgba(255, 255, 255, 0.55))
              drop-shadow(2px 3px 3px rgba(84, 76, 66, 0.45))
              drop-shadow(0 8px 24px rgba(84, 76, 66, 0.22))
            `,
          }}
        />

        {/* ELIOR — Licht folgt dem Cursor */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease }}
          className="font-serif font-semibold leading-none mb-10 md:mb-14"
          style={{
            fontSize: 'clamp(3.5rem, 14vw, 12rem)',
            color: '#BBB1A4',
            letterSpacing: '0.01em',
            textShadow: titleShadow,
          }}
        >
          ELIOR
        </motion.h1>

        {/* אליאור — small, subtle, static stamp */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 1.1, ease }}
          className="font-serif leading-none mb-10 md:mb-14"
          style={{
            fontSize: 'clamp(0.9rem, 1.6vw, 1.3rem)',
            color: '#BBB1A4',
            letterSpacing: '0.3em',
            textShadow: `
              -1px -1px 1px rgba(255, 255, 255, 0.35),
              1px 1px 1px rgba(84, 76, 66, 0.3),
              0 4px 14px rgba(84, 76, 66, 0.15)
            `,
          }}
        >
          <motion.span
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
            className="inline-block"
          >
            אליאור
          </motion.span>
        </motion.span>

      </div>
    </section>
  );
};

export default Hero;
