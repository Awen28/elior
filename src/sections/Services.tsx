import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Smartphone, Globe, Palette, Brain, Database, LineChart, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: 'iOS App Development',
    description: 'Native SwiftUI applications crafted for performance, elegance, and seamless user experience.',
    features: ['SwiftUI', 'SwiftData', 'HealthKit'],
    color: '#525240',
  },
  {
    icon: Globe,
    title: 'Web Development / Homepage',
    description: 'Modern, performant websites and web applications built with cutting-edge technologies.',
    features: ['React', 'TypeScript', 'SEO'],
    color: '#BA986A',
  },
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Comprehensive brand systems including logo design, visual identity, and guidelines.',
    features: ['Logo Design', 'Visual Identity', 'Print'],
    color: '#20201E',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Intelligent features powered by GPT, computer vision, and machine learning.',
    features: ['OpenAI', 'Computer Vision', 'Automation'],
    color: '#9A8F80',
  },
  {
    icon: Database,
    title: 'Backend Systems',
    description: 'Scalable backend solutions, APIs, and cloud infrastructure architecture.',
    features: ['Firebase', 'Node.js', 'REST APIs'],
    color: '#BA986A',
  },
  {
    icon: LineChart,
    title: 'Digital Strategy',
    description: 'Data-driven strategy, SEO optimization, and growth consulting.',
    features: ['SEO', 'ASO', 'Analytics'],
    color: '#525240',
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease-out',
      }}
      className="group h-full cursor-default"
    >
      {/* Claymorphism Card - formed out of the background */}
      <div
        className="h-full p-8 rounded-[32px] relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #F7F3ED 0%, #F1EDE6 30%, #E4DED2 100%)',
          boxShadow: `
            inset 3px 3px 6px 0 rgba(255, 255, 255, 0.9),
            inset -4px -4px 10px 0 rgba(154, 143, 128, 0.22),
            6px 6px 14px 0 rgba(154, 143, 128, 0.28),
            12px 12px 28px 0 rgba(154, 143, 128, 0.42),
            2px 2px 0 0 rgba(255, 255, 255, 0.6)
          `,
        }}
      >
        {/* Soft inner glow on hover - god-light */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${service.color === '#BA986A' ? 'rgba(186, 152, 106, 0.18)' : service.color + '18'} 0%, transparent 70%)`,
          }}
        />

        {/* Icon - raised clay */}
        <motion.div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10"
          style={{ 
            background: 'linear-gradient(145deg, #F7F3ED 0%, #EEE8DE 100%)',
            boxShadow: `
              inset 2px 2px 4px 0 rgba(255, 255, 255, 0.9),
              inset -3px -3px 7px 0 rgba(154, 143, 128, 0.2),
              4px 4px 9px 0 rgba(154, 143, 128, 0.26),
              8px 8px 18px 0 rgba(154, 143, 128, 0.16)
            `,
          }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.2 }}
        >
          <service.icon 
            className="w-6 h-6" 
            style={{ color: service.color }}
          />
        </motion.div>

        {/* Content */}
        <h3 
          className="font-serif text-2xl mb-3 relative z-10"
          style={{ color: '#20201E' }}
        >
          {service.title}
        </h3>
        <p 
          className="font-sans text-sm leading-relaxed mb-6 relative z-10"
          style={{ color: 'rgba(32, 32, 30, 0.6)' }}
        >
          {service.description}
        </p>

        {/* Features - Clay tags */}
        <div className="flex flex-wrap gap-2 mb-6 relative z-10">
          {service.features.map((feature, i) => (
            <span
              key={i}
              className="px-3 py-1.5 text-xs rounded-xl"
              style={{ 
                background: '#F1EDE6',
                color: 'rgba(32, 32, 30, 0.7)',
                boxShadow: `
                  inset 2px 2px 3px rgba(255, 255, 255, 0.85),
                  inset -2px -2px 4px rgba(154, 143, 128, 0.15),
                  2px 2px 5px rgba(154, 143, 128, 0.18),
                  5px 5px 12px rgba(154, 143, 128, 0.1)
                `,
              }}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Link */}
        <motion.a 
          href="#contact" 
          className="inline-flex items-center gap-2 font-sans text-sm relative z-10"
          style={{ color: service.color }}
          whileHover={{ x: 5 }}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>Discuss your project</span>
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 px-8"
      style={{ background: '#F1EDE6' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-sm tracking-[0.3em] block mb-6"
            style={{ color: '#BA986A' }}
          >
            What We Do
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6"
            style={{ color: '#20201E' }}
          >
            Full-service{' '}
            <span 
              className="italic"
              style={{ color: '#BA986A' }}
            >
              studio
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-lg max-w-2xl mx-auto"
            style={{ color: 'rgba(32, 32, 30, 0.6)' }}
          >
            From concept to launch. We architect, design, and build digital 
            experiences that stand out — and mean something.
          </motion.p>
        </div>

        {/* Services Grid - Claymorphism Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;