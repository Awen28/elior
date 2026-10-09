import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ease = [0.22, 1, 0.36, 1] as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const Hero = () => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  // Pointer position (-1..1) drives the carved light direction
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const lightX = useSpring(pointerX, { stiffness: 55, damping: 22, mass: 0.7 });
  const lightY = useSpring(pointerY, { stiffness: 55, damping: 22, mass: 0.7 });

  // Highlight leans toward the cursor, shadow away from it -> engraved depth
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
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMove = (e: MouseEvent) => {
      pointerX.set(clamp((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2), -1, 1));
      pointerY.set(clamp((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2), -1, 1));
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [pointerX, pointerY]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24"
      style={{ background: '#BBB1A4' }}
    >
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
          animate={isLoaded ? { opacity: 1 } : {}}
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

        {/* ELIOR — the same canvas, shaped only by shadow, reacts to the cursor */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
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
          animate={isLoaded ? { opacity: 1 } : {}}
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

        {/* Built with meaning. — static stamp, deeper tone */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 1.6, delay: 1.5, ease }}
          className="font-serif italic"
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
            color: '#525342',
            letterSpacing: '0.02em',
            textShadow: `
              -1px -1px 1px rgba(255, 255, 255, 0.3),
              1px 1px 1px rgba(38, 36, 26, 0.35),
              0 4px 14px rgba(38, 36, 26, 0.18)
            `,
          }}
        >
          {t('hero.tagline')}
        </motion.span>
      </div>
    </section>
  );
};

export default Hero;
