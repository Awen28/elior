import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { scrollToSection } from '../lib/scroll';
import { ScrollSpotlight } from '../components/ScrollSpotlight';

const About = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const values = t('about.values', { returnObjects: true }) as {
    title: string;
    description: string;
  }[];
  const stats = t('about.stats', { returnObjects: true }) as {
    value: string;
    label: string;
  }[];
  const valueIndexes = ['01', '02', '03'];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-8 overflow-hidden"
      style={{ background: '#525342' }}
    >
      {/* soft light from above */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[50vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 50% 0%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header — same stamped language as the rest */}
        <div className="text-center mb-24 md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow block mb-8"
            style={{
              color: '#525342',
              textShadow:
                '-1px -1px 1px rgba(123, 119, 105, 0.5), 1px 1px 1px rgba(20, 18, 14, 0.5)',
            }}
          >
            {t('about.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-normal leading-[1.1] mb-8"
            style={{
              fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)',
              color: '#525342',
              textShadow:
                '-1px -1px 1px rgba(123, 119, 105, 0.45), 1px 1px 1px rgba(20, 18, 14, 0.5)',
            }}
          >
            {t('about.titleA')}
            <span className="italic">{t('about.titleB')}</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto"
          >
            <ScrollSpotlight
              text={t('about.intro')}
              className="font-sans font-light text-lg"
              dimColor="#6E6C58"
              litColor="#E8E0D1"
            />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Story */}
          <div className="lg:pt-6">
            <div
              className="inline-flex items-center gap-5 mb-10"
              style={{ color: 'rgba(201,169,123,0.5)' }}
            >
              <span
                className="font-serif italic text-3xl md:text-4xl leading-none select-none"
                style={{ textShadow: '0 1px 1px rgba(20, 18, 14, 0.3)' }}
              >
                אליאור
              </span>
              <div
                className="h-px flex-1 w-16 md:w-24"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(201,169,123,0.4), rgba(201,169,123,0))',
                }}
              />
            </div>

            <div className="space-y-6">
              <ScrollSpotlight
                text={t('about.storyP1')}
                className="font-sans font-light text-lg leading-relaxed"
                dimColor="#6E6C58"
                litColor="#F0E9DA"
              />
              <ScrollSpotlight
                text={t('about.storyP2')}
                className="font-sans font-light text-lg leading-relaxed"
                dimColor="#64624E"
                litColor="#CFC7B6"
              />
              <ScrollSpotlight
                text={t('about.storyP3')}
                className="font-serif italic text-xl md:text-2xl leading-relaxed"
                dimColor="rgba(201, 169, 123, 0.22)"
                litColor="rgba(201, 169, 123, 0.95)"
              />
            </div>
          </div>

          {/* Values — editorial list, not cards */}
          <div className="allow-list">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="py-8 first:pt-0 border-t"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-start gap-8">
                  <span
                    className="font-serif text-lg leading-none pt-1"
                    style={{ color: 'rgba(201,169,123,0.6)' }}
                  >
                    {valueIndexes[idx]}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl md:text-[1.7rem] mb-3" style={{ color: '#E4DCCE' }}>
                      {value.title}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed" style={{ color: '#BDB4A4' }}>
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats — flat editorial, hairline divided */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 border-t pt-14"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-center md:text-left md:px-8 first:md:pl-0 border-t md:border-t-0"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                    color: '#525342',
                    textShadow:
                      '-1px -1px 1px rgba(123, 119, 105, 0.5), 1px 1px 1px rgba(20, 18, 14, 0.5)',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="eyebrow mt-2"
                  style={{ color: 'rgba(201,169,123,0.65)' }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-28"
        >
          <p
            className="font-serif italic mb-10"
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              color: '#E4DCCE',
              textShadow: '0 2px 18px rgba(20, 18, 14, 0.45)',
            }}
          >
            {t('about.cta')}
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="clay-dark inline-flex items-center gap-3 px-9 py-4 rounded-full font-sans text-sm tracking-[0.14em] uppercase transition-all duration-300 hover:scale-105"
          >
            {t('about.ctaButton')}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;