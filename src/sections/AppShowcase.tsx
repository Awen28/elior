import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

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

const StampedAlcove = ({ project, index }: {
  project: typeof projects[0];
  index: number;
}) => {
  const glowRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boxRef, { amount: 0.15, once: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    }
  };

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.transform = 'translate(0, 0)';
  };

  return (
    <div
      ref={boxRef}
      className="app-alkove relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* color glow — the light behind the object */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-full blur-3xl transition-transform duration-700 ease-out pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.color}66 0%, ${project.color}1A 55%, transparent 75%)`,
          transition: 'transform 0.7s ease-out',
          willChange: 'transform',
        }}
      />
      <motion.div
        animate={inView ? { opacity: [0.55, 0.9, 0.55] } : { opacity: 0.55 }}
        transition={{ duration: 5, repeat: inView ? Infinity : 0, ease: 'easeInOut', delay: index * 0.6 }}
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 55%, ${project.color}59 0%, transparent 70%)`,
          willChange: 'opacity',
        }}
      />

      {/* recessed stamped panel */}
      <div
        className="relative rounded-[3rem] p-3 md:p-4"
        style={{
          background:
            'linear-gradient(145deg, #B4A899 0%, #ADA092 100%)',
          boxShadow:
            'inset 0 3px 0 rgba(84, 76, 66, 0.55), inset 0 -2px 0 rgba(255, 255, 255, 0.5), inset 3px 0 0 rgba(84, 76, 66, 0.25), inset -3px 0 0 rgba(255, 255, 255, 0.35), 0 30px 60px -24px rgba(84, 76, 66, 0.45)',
        }}
      >
        {/* inner rim */}
        <div
          className="p-2.5 md:p-3.5 rounded-[2.25rem] md:rounded-[2.75rem]"
          style={{
            background: '#A89B8B',
            boxShadow:
              'inset 1px 1px 4px rgba(84, 76, 66, 0.5), inset -1px -1px 3px rgba(255, 255, 255, 0.5)',
          }}
        >
          <div
            className="relative overflow-hidden w-[168px] h-[336px] md:w-[220px] md:h-[440px]"
            style={{ borderRadius: '1.5rem' }}
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
              style={{ filter: 'contrast(1.02) brightness(1.02)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AppShowcase = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.app-row');
      items.forEach((row, index) => {
        const even = index % 2 === 0;
        const from = even ? { x: -60, opacity: 0 } : { x: 60, opacity: 0 };
        gsap.fromTo(row, { ...from, y: 40 }, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full py-32 md:py-40 overflow-hidden"
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

      <div ref={wrapperRef} className="relative max-w-7xl mx-auto px-8">
        {/* Section header */}
        <div className="text-center mb-24 md:mb-32">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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

        {/* Projects */}
        <div className="flex flex-col gap-28 md:gap-40">
          {projects.map((project, index) => {
            const even = index % 2 === 0;
            return (
              <div
                key={project.id}
                className="app-row grid md:grid-cols-12 gap-10 md:gap-8 items-center"
              >
                {/* Text */}
                <div
                  className={`md:col-span-6 ${even ? 'md:order-1' : 'md:order-2'} ${
                    even ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <span
                      className="font-serif text-sm"
                      style={{ color: '#525342' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div
                      className="w-8 h-px"
                      style={{ background: 'rgba(82, 83, 66, 0.35)' }}
                    />
                    <span
                      className="eyebrow"
                      style={{ color: 'rgba(82, 83, 66, 0.7)' }}
                    >
                      {t(`showcase.category.${project.categoryKey}`)} · {project.year}
                    </span>
                  </div>

                  <h3
                    className="font-serif font-semibold mb-5 tracking-tight"
                    style={{
                      fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
                      color: '#BBB1A4',
                      textShadow:
                        '-2px -2px 3px rgba(255,255,255,0.7), 2px 2px 3px rgba(84,76,66,0.5)',
                    }}
                  >
                    {project.name}
                  </h3>

                  <p
                    className="font-sans font-light text-base md:text-lg leading-relaxed max-w-md mb-8"
                    style={{ color: 'rgba(82, 83, 66, 0.82)' }}
                  >
                    {t(`showcase.description.${project.descriptionKey}`)}
                  </p>

                  <div className="flex items-center">
                    <Link
                      to={project.route}
                      className="clay-dark group px-6 py-3 rounded-full text-sm tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      {t(`showcase.label.${project.labelKey}`)}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Stamped object with light */}
                <div
                  className={`md:col-span-6 flex justify-center ${
                    even ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  <StampedAlcove project={project} index={index} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;