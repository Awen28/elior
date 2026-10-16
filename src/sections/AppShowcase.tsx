import { useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ease = [0.22, 1, 0.36, 1] as const;

const projects = [
  {
    id: 'abwun',
    name: 'ABWUN',
    categoryKey: 'app',
    descriptionKey: 'abwun',
    image: '/apps/Abwun_home.webp',
    color: '#525342',
    year: '2026',
    route: '/abwun',
    labelKey: 'viewApp',
  },
  {
    id: 'stradahub',
    name: 'StradaHub',
    categoryKey: 'app',
    descriptionKey: 'stradahub',
    image: '/apps/stradaHub_show_control.webp',
    color: '#C49070',
    year: '2026',
    route: '/stradahub',
    labelKey: 'viewApp',
  },
  {
    id: '369',
    name: '369',
    categoryKey: 'app',
    descriptionKey: '369',
    image: '/apps/369_Homescreen.webp',
    color: '#C89B55',
    year: '2024',
    route: '/369',
    labelKey: 'viewCase',
  },
  {
    id: 'numistellar',
    name: 'NumiStellar',
    categoryKey: 'app',
    descriptionKey: 'numistellar',
    image: '/apps/numistellar_home.webp',
    color: '#8A7F6F',
    year: '2025',
    route: '/numistellar',
    labelKey: 'viewCase',
  },
  {
    id: 'elow',
    name: 'Elow',
    categoryKey: 'app',
    descriptionKey: 'elow',
    image: '/apps/elow_homescreen.webp',
    color: '#3D3C32',
    year: '2026',
    route: '/elow',
    labelKey: 'viewCase',
  },
  {
    id: 'orbit',
    name: 'Orbit',
    categoryKey: 'game',
    descriptionKey: 'orbit',
    image: '/apps/orbit_gameplay1.webp',
    color: '#525342',
    year: '2026',
    route: '/orbit',
    labelKey: 'playGame',
  },
  {
    id: 'kibook',
    name: 'kiBook',
    categoryKey: 'app',
    descriptionKey: 'kibook',
    image: '/apps/kiBook_homescreen.webp',
    color: '#C89B55',
    year: '2025',
    route: '/kibook',
    labelKey: 'viewCase',
  },
  {
    id: 'suremate',
    name: 'Suremate',
    categoryKey: 'app',
    descriptionKey: 'suremate',
    image: '/apps/Suremate_homescreen.webp',
    color: '#525342',
    year: '2024',
    route: '/suremate',
    labelKey: 'viewCase',
  },
];

type Project = (typeof projects)[number];

/**
 * Das Objekt zum Anfassen: neigt sich der Hand entgegen (Federphysik),
 * der Glow folgt mit. Reine Zeiger-Interaktion — beim Scrollen steht alles.
 */
const TiltPhone = ({ project, index }: { project: Project; index: number }) => {
  const [canHover] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 16, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 140, damping: 16, mass: 0.6 });

  return (
    <motion.div
      className="relative"
      style={
        canHover
          ? { rotateX: srx, rotateY: sry, transformPerspective: 900 }
          : undefined
      }
      onMouseMove={(e) => {
        if (!canHover) return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {/* Glow — ruht, atmet nur per CSS-Hover */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none opacity-70 transition-opacity duration-700 hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.color}66 0%, ${project.color}1A 55%, transparent 75%)`,
        }}
      />
      <div
        className="relative rounded-[3rem] p-3 md:p-4 transition-shadow duration-500"
        style={{
          background: 'linear-gradient(145deg, #B4A899 0%, #ADA092 100%)',
          boxShadow:
            'inset 0 3px 0 rgba(84, 76, 66, 0.55), inset 0 -2px 0 rgba(255, 255, 255, 0.5), inset 3px 0 0 rgba(84, 76, 66, 0.25), inset -3px 0 0 rgba(255, 255, 255, 0.35), 0 30px 60px -24px rgba(84, 76, 66, 0.45)',
        }}
      >
        <div
          className="p-2.5 md:p-3.5 rounded-[2.25rem] md:rounded-[2.75rem]"
          style={{
            background: '#A89B8B',
            boxShadow:
              'inset 1px 1px 4px rgba(84, 76, 66, 0.5), inset -1px -1px 3px rgba(255, 255, 255, 0.5)',
          }}
        >
          <div
            className="relative overflow-hidden w-[190px] h-[380px] md:w-[230px] md:h-[460px]"
            style={{ borderRadius: '1.5rem' }}
          >
            <img
              src={project.image}
              alt={project.name}
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              className="w-full h-full object-cover select-none"
              style={{ filter: 'contrast(1.02) brightness(1.02)' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Galerie zum Anfassen: alles voll sichtbar, alles steht still.
 * Einziges Leben: Zeiger-Physik + einmaliges Erscheinen.
 */
const AppShowcase = () => {
  const { t } = useTranslation();

  return (
    <section
      id="work"
      className="relative w-full py-32 md:py-40 overflow-clip"
      style={{ background: '#BBB1A4' }}
    >
      {/* soft light from above */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[60vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 50% 0%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-8">
        {/* Section header */}
        <div className="text-center mb-24 md:mb-32">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="eyebrow block mb-8"
            style={{
              color: '#BBB1A4',
              textShadow:
                '-1px -1px 2px rgba(255,255,255,0.4), 1px 2px 2px rgba(84,76,66,0.35)',
            }}
          >
            {t('showcase.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="font-serif font-semibold leading-[1.05]"
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 6rem)',
              color: '#BBB1A4',
              textShadow:
                '-1px -1px 2px rgba(255,255,255,0.45), 1px 2px 2px rgba(84,76,66,0.35)',
            }}
          >
            {t('showcase.titleA')}
            <span className="italic">{t('showcase.titleB')}</span>
          </motion.h2>
        </div>

        <div className="flex flex-col gap-28 md:gap-36">
          {projects.map((p, i) => {
            const even = i % 2 === 0;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.9, ease }}
                className="grid md:grid-cols-12 gap-10 md:gap-8 items-center"
              >
                {/* Text */}
                <div className={`md:col-span-6 ${even ? 'md:order-1 md:pr-12' : 'md:order-2 md:pl-12'}`}>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-serif text-sm tabular-nums" style={{ color: '#9A7A50' }}>
                      {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </span>
                    <div className="w-8 h-px" style={{ background: 'rgba(82, 83, 66, 0.35)' }} />
                    <span className="eyebrow" style={{ color: 'rgba(82, 83, 66, 0.7)' }}>
                      {t(`showcase.category.${p.categoryKey}`)} · {p.year}
                    </span>
                  </div>

                  <h3
                    className="font-serif font-semibold tracking-tight"
                    style={{
                      fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
                      lineHeight: 1.02,
                      color: '#BBB1A4',
                      textShadow:
                        '-2px -2px 3px rgba(255,255,255,0.7), 2px 2px 3px rgba(84,76,66,0.5)',
                    }}
                  >
                    {p.name}
                  </h3>

                  <p
                    className="font-serif italic mt-4"
                    style={{
                      fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)',
                      color: '#6E5A38',
                    }}
                  >
                    {t(`showcase.essence.${p.descriptionKey}`)}
                  </p>

                  <p
                    className="font-sans font-light text-base md:text-lg leading-relaxed max-w-md mt-4"
                    style={{ color: 'rgba(82, 83, 66, 0.82)' }}
                  >
                    {t(`showcase.description.${p.descriptionKey}`)}
                  </p>

                  <div className="mt-8">
                    <Link
                      to={p.route}
                      className="clay-dark group inline-flex px-6 py-3 rounded-full text-sm tracking-wider transition-all duration-300 hover:scale-105 items-center gap-2"
                    >
                      {t(`showcase.label.${p.labelKey}`)}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Objekt */}
                <div className={`md:col-span-6 flex justify-center ${even ? 'md:order-2' : 'md:order-1'}`}>
                  <TiltPhone project={p} index={i} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
