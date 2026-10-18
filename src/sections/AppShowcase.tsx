import { useMemo, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LiquidGlass from '../components/LiquidGlass';
import CircularCarousel, { type CarouselItem } from '../components/CircularCarousel';
import { usePortal } from '../lib/portal';

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

const pad = (n: number) => String(n).padStart(2, '0');

/** Ein Blatt Papier, das auf dem Papier der Seite liegt. */
const paperStyle = {
  background: 'linear-gradient(150deg, #C9BFAD 0%, #C0B5A3 45%, #B8AD9B 100%)',
  border: '1px solid rgba(255, 255, 255, 0.42)',
  boxShadow:
    '0 50px 100px -45px rgba(60, 50, 38, 0.55), 0 8px 24px -18px rgba(60, 50, 38, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.65), inset 0 -1px 0 rgba(84, 76, 66, 0.14)',
} as const;

/**
 * Der Grund: eine ruhige Fläche in Ton und Licht — kein Bild, nur Farbe
 * mit etwas Tiefe. Der Farbton der vordersten App färbt sie sanft ein.
 */
const Ground = ({ index }: { index: number }) => {
  const project = projects[index];
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(150deg, #CCC2B0 0%, #C2B7A5 45%, #B7AC9A 100%)',
        }}
      />
      {/* Farbton der App, ruhig */}
      <div
        className="absolute inset-0 transition-[background] ease-out"
        style={{
          transitionDuration: '1200ms',
          background: `radial-gradient(120% 90% at 50% 0%, ${project.color}33 0%, transparent 70%)`,
        }}
      />
      {/* Tiefe: hell oben, weich dunkel unten */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 65% at 50% 12%, rgba(255,252,245,0.34) 0%, rgba(255,252,245,0) 62%), linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(60,50,38,0) 42%, rgba(60,50,38,0.20) 100%)',
        }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
};

/** Das Objekt zum Anfassen. Neigung nur an feinen Zeigern. */
const TiltPhone = ({
  project,
  index,
  active = true,
}: {
  project: Project;
  index: number;
  active?: boolean;
}) => {
  const [canHover] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 16, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 140, damping: 16, mass: 0.6 });
  const shadowX = useTransform(sry, (v) => v * 1.3);
  const shadowY = useTransform(srx, (v) => -v * 1.3);
  const openPortal = usePortal().open;

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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-3%] flex justify-center"
      >
        <motion.div
          className="h-7 w-[58%] rounded-[50%] blur-xl"
          style={{ background: 'rgba(84, 76, 66, 0.5)', x: shadowX, y: shadowY }}
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none opacity-70"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.color}66 0%, ${project.color}1A 55%, transparent 75%)`,
        }}
      />

      <div
        className="relative rounded-[2.6rem] md:rounded-[3.1rem] p-3 md:p-4"
        style={{
          background: 'linear-gradient(145deg, #B4A899 0%, #ADA092 100%)',
          boxShadow:
            'inset 0 3px 0 rgba(84, 76, 66, 0.55), inset 0 -2px 0 rgba(255, 255, 255, 0.5), inset 3px 0 0 rgba(84, 76, 66, 0.25), inset -3px 0 0 rgba(255, 255, 255, 0.35), 0 40px 70px -26px rgba(84, 76, 66, 0.5)',
        }}
      >
        <div
          className="p-2 md:p-3.5 rounded-[2rem] md:rounded-[2.85rem]"
          style={{
            background: '#A89B8B',
            boxShadow:
              'inset 1px 1px 4px rgba(84, 76, 66, 0.5), inset -1px -1px 3px rgba(255, 255, 255, 0.5)',
          }}
        >
          <button
            type="button"
            aria-label={project.name}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              openPortal({
                route: project.route,
                x: r.left + r.width / 2,
                y: r.top + r.height / 2,
                color: project.color,
              });
            }}
            className="portal-preview relative block cursor-pointer focus-visible:outline-none"
          >
            <LiquidGlass
              src={project.image}
              alt={project.name}
              active={active}
              interactive={canHover}
              eager={index < 2}
              radius="1.5rem"
              className="relative overflow-hidden w-[160px] h-[320px] sm:w-[190px] sm:h-[380px] md:w-[230px] md:h-[460px] lg:w-[260px] lg:h-[520px]"
            />

            {/* Glasglanz über dem Display */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                borderRadius: '1.5rem',
                background:
                  'linear-gradient(115deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 26%, rgba(255,255,255,0) 68%, rgba(255,255,255,0.12) 100%)',
                mixBlendMode: 'screen',
              }}
            />
            {/* Glasrand */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                borderRadius: '1.5rem',
                boxShadow:
                  'inset 0 0 0 1px rgba(255,255,255,0.45), inset 0 8px 16px rgba(255,255,255,0.18), inset 0 -16px 30px rgba(60,50,38,0.22), 0 12px 40px -18px rgba(60,50,38,0.5)',
              }}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/** Text eines Objekts — geteilt von Bühne und ruhiger Liste. */
const PanelText = ({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) => {
  const { t } = useTranslation();
  const openPortal = usePortal().open;
  return (
    <>
      <div className="flex items-center gap-4 mb-3 md:mb-4">
        <span className="font-serif text-sm tabular-nums" style={{ color: '#9A7A50' }}>
          {pad(index + 1)} / {pad(total)}
        </span>
        <div className="w-8 h-px" style={{ background: 'rgba(82, 83, 66, 0.35)' }} />
        <span className="eyebrow" style={{ color: 'rgba(82, 83, 66, 0.7)' }}>
          {t(`showcase.category.${project.categoryKey}`)} · {project.year}
        </span>
      </div>

      <h3
        className="font-serif font-semibold tracking-tight"
        style={{
          fontSize: 'clamp(2.4rem, 6vw, 5.2rem)',
          lineHeight: 0.98,
          color: '#575845',
          textShadow: '-2px -2px 3px rgba(255,255,255,0.7), 2px 2px 3px rgba(84,76,66,0.4)',
        }}
      >
        {project.name}
      </h3>

      <p
        className="font-serif italic mt-3 md:mt-4"
        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', color: '#6E5A38' }}
      >
        {t(`showcase.essence.${project.descriptionKey}`)}
      </p>

      <p
        className="hidden sm:block font-sans font-light text-base leading-relaxed max-w-md mt-3"
        style={{ color: 'rgba(74, 75, 58, 0.85)' }}
      >
        {t(`showcase.description.${project.descriptionKey}`)}
      </p>

      <div className="mt-5 md:mt-7">
        <button
          type="button"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            openPortal({
              route: project.route,
              x: r.left + r.width / 2,
              y: r.top + r.height / 2,
              color: project.color,
            });
          }}
          className="clay-dark group inline-flex px-6 py-3 rounded-full text-sm tracking-wider transition-all duration-300 hover:scale-105 items-center gap-2"
        >
          {t(`showcase.label.${project.labelKey}`)}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </>
  );
};

/** Ruhige Fassung ohne Pin — reduced motion. */
const StaticList = () => (
  <div className="mx-auto max-w-6xl px-8 flex flex-col gap-24 py-20">
    {projects.map((p, i) => (
      <div key={p.id} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
        <div className="order-2 md:order-1">
          <PanelText project={p} index={i} total={projects.length} />
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <TiltPhone project={p} index={i} />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Die Kollektion. Die Apps gleiten als 3D-Karussell durch den Raum; die
 * vorderste App steht groß im Bild und öffnet beim Klick das Portal.
 * Reduced motion: ruhige Liste.
 */
const AppShowcase = () => {
  const reduce = useReducedMotion();
  const { t } = useTranslation();
  const openPortal = usePortal().open;
  const [active, setActive] = useState(0);

  const items = useMemo<CarouselItem[]>(
    () =>
      projects.map((p) => ({
        src: p.image.replace('/apps/', '/apps/float/'),
        alt: p.name,
        title: p.name,
        subtitle: t(`showcase.essence.${p.descriptionKey}`),
      })),
    [t]
  );

  if (reduce) {
    return (
      <section id="work" className="relative w-full" style={{ background: '#BBB1A4' }}>
        <div className="px-3 pb-10">
          <div className="grain relative rounded-[3px]" style={paperStyle}>
            <StaticList />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="work"
      className="relative w-full overflow-hidden"
      style={{ background: '#BBB1A4' }}
    >
      <div className="relative h-[100svh] w-full">
        <Ground index={active} />
        <CircularCarousel
          className="relative z-10"
          items={items}
          preset="orbit"
          intro="rise"
          cardWidth={170}
          aspectRatio={0.4925}
          speed={7}
          captions
          tilt={-16}
          curve={0}
          perspective={1500}
          cornerRadius={0}
          fadeColor="#bbb1a4"
          depthFade={0}
          onChange={setActive}
          onItemClick={(item, index) => {
            if (index !== active) return;
            const project = projects.find((p) => p.name === item.title);
            if (!project) return;
            openPortal({
              route: project.route,
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
              color: project.color,
              effect: 'tunnel',
            });
          }}
        />
      </div>
    </section>
  );
};

export default AppShowcase;
