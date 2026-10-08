import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Award, Clock, MapPin, Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';

const stats = [
  { icon: Code2, value: '11', suffix: '+', label: 'Apps Created', color: '#BA986A' },
  { icon: Award, value: '10', suffix: '+', label: 'Years Experience', color: '#D2B488' },
  { icon: Sparkles, value: 'AI', suffix: '', label: 'Powered Solutions', color: '#BA986A' },
  { icon: Clock, value: '100', suffix: '%', label: 'Crafted In-House', color: '#525240' },
  { icon: MapPin, value: 'Tirol', suffix: '', label: 'Austria Based', color: '#D2B488' },
  { icon: HeartHandshake, value: 'Meaning', suffix: '', label: 'In Every Pixel', color: '#BA986A' },
];

const values = [
  {
    title: 'Meaning',
    description: 'Elior is Hebrew for „Gott ist mein Licht" — God is my light. We believe every product should carry its own light: a purpose, a truth, a reason to exist.',
  },
  {
    title: 'Craftsmanship',
    description: 'Every project is treated as a work of art. No shortcuts, no templates — just digital experiences formed with care, like clay in the hands of a potter.',
  },
  {
    title: 'Partnership',
    description: 'You are not just a client. We walk alongside you from the first spark of the idea to the day the world receives it.',
  },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-8"
      style={{ background: '#F1EDE6' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-24 mb-32">
          {/* Left: Text */}
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-serif italic text-sm tracking-[0.3em] block mb-6"
              style={{ color: '#BA986A' }}
            >
              About Elior
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl leading-tight mb-8"
              style={{ color: '#20201E' }}
            >
              Not just code.
              <br />
              <span 
                className="italic"
                style={{ color: '#BA986A' }}
              >
                Built with meaning.
              </span>
            </motion.h2>
            <div className="space-y-6">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sans text-xl leading-relaxed"
                style={{ color: 'rgba(32, 32, 30, 0.8)' }}
              >
                Elior is a full-service digital studio from Tirol, Austria. {''}
                <span className="font-serif italic" style={{ color: '#525240' }}>Elior</span> means{' '}
                <span style={{ color: '#BA986A' }}>„Gott ist mein Licht"</span> — God is my light.
                It is the philosophy behind everything we build.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-sans text-lg leading-relaxed"
                style={{ color: 'rgba(32, 32, 30, 0.6)' }}
              >
                From award-winning iOS apps to conversion-focused websites and 
                complete brand identities — every line of code, every pixel, 
                every interaction carries intention. Nothing is empty. Nothing 
                is random.
              </motion.p>
            </div>
          </div>

          {/* Right: Values */}
          <div className="space-y-6">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="p-8 rounded-3xl clay-raised cursor-default"
              >
                <div className="flex items-start gap-6">
                  <span 
                    className="text-5xl font-serif"
                    style={{ color: 'rgba(186, 152, 106, 0.35)' }}
                  >
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 
                      className="font-serif text-2xl mb-3"
                      style={{ color: '#20201E' }}
                    >
                      {value.title}
                    </h3>
                    <p 
                      className="font-sans leading-relaxed"
                      style={{ color: 'rgba(32, 32, 30, 0.6)' }}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="py-16 rounded-3xl clay-pressed"
          style={{
            background: 'linear-gradient(160deg, rgba(247, 243, 237, 0.6) 0%, rgba(228, 222, 210, 0.5) 100%)',
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ 
                    background: `linear-gradient(145deg, ${stat.color}2E 0%, ${stat.color}14 100%)`,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.6),
                      inset -2px -2px 4px rgba(32, 32, 30, 0.06),
                      3px 3px 7px rgba(154, 143, 128, 0.2)
                    `,
                  }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div 
                  className="font-serif text-4xl mb-1"
                  style={{ color: '#20201E' }}
                >
                  {stat.value}{stat.suffix}
                </div>
                <div 
                  className="font-sans text-xs tracking-widest uppercase"
                  style={{ color: 'rgba(32, 32, 30, 0.5)' }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-24"
        >
          <p 
            className="font-sans text-xl mb-8"
            style={{ color: 'rgba(32, 32, 30, 0.6)' }}
          >
            Ready to build something that means something?
          </p>
          <motion.a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-wider uppercase clay-dark"
            style={{ color: '#F7F3ED' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;