import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Smartphone, Globe, Palette, Brain, Database, LineChart, ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../lib/scroll';

const serviceIcons = [Smartphone, Globe, Palette, Brain, Database, LineChart];

const ServiceCard = ({ service, index }: { service: { title: string; description: string }; index: number }) => {
  const num = String(index + 1).padStart(2, '0');
  const Icon = serviceIcons[index];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div
        className="relative h-full flex flex-col p-9 rounded-[1.5rem]"
        style={{
          background: '#525342',
          boxShadow:
            'inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 -1px 0 rgba(20, 18, 14, 0.6), inset 1px 0 0 rgba(255, 255, 255, 0.04), inset -1px 0 0 rgba(20, 18, 14, 0.28)',
        }}
      >
        <div className="flex items-start justify-between mb-8">
          <Icon className="w-6 h-6" style={{ color: '#C9A97B' }} />
          <span
            className="font-serif text-sm"
            style={{ color: 'rgba(255,255,255,0.22)' }}
          >
            {num}
          </span>
        </div>

        <h3 className="font-serif text-[1.6rem] leading-tight mb-4" style={{ color: '#E4DCCE' }}>
          {service.title}
        </h3>
        <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: '#BDB4A4' }}>
          {service.description}
        </p>

        <div className="mt-auto flex items-center justify-end">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full"
            style={{
              color: '#C9A97B',
              boxShadow:
                'inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(20, 18, 14, 0.5)',
              transition: 'background 0.3s ease, color 0.3s ease, transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#C9A97B';
              e.currentTarget.style.color = '#525342';
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#C9A97B';
              e.currentTarget.style.transform = 'translate(0, 0)';
            }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const services = t('services.items', { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 px-8"
      style={{ background: '#525342' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow block mb-6"
            style={{
              color: '#525342',
              textShadow:
                '-1px -1px 1px rgba(123, 119, 105, 0.5), 1px 1px 1px rgba(20, 18, 14, 0.5)',
            }}
          >
            {t('services.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-normal text-5xl md:text-6xl leading-[1.1] mb-7"
            style={{
              color: '#525342',
              textShadow:
                '-1px -1px 1px rgba(123, 119, 105, 0.45), 1px 1px 1px rgba(20, 18, 14, 0.5)',
            }}
          >
            {t('services.titleLine1')}
            <br />
            {t('services.titleLine2a')}
            <span className="italic">{t('services.titleLine2b')}</span>
            {t('services.titleLine2c')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans font-light text-lg max-w-xl mx-auto"
            style={{
              color: '#D8D0C0',
              textShadow: '0 1px 1px rgba(20, 18, 14, 0.25)',
            }}
          >
            {t('services.intro')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;