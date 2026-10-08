import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'abwun',
    name: 'ABWUN',
    category: 'iOS App',
    description: 'The opposite of manifestation. A daily path with God in three surrenders: Morning, Noon and Evening. "Trust Him."',
    image: '/apps/Abwun_home.png',
    color: '#C89B55',
    year: '2026',
    tags: ['Prayer', 'AI', 'Faith'],
  },
  {
    id: 'stradahub',
    name: 'StradaHub',
    category: 'iOS App',
    description: 'Community-Verkehrs-App für den DACH-Raum. Unfälle, Baustellen, Stau und Gefahren in Echtzeit auf der Karte. Keine Blitzer-Warnung!',
    image: '/apps/stradaHub_show_control.png',
    color: '#C49070',
    year: '2026',
    tags: ['Community', 'Verkehr', 'Karte'],
  },
  {
    id: '369',
    name: '369',
    category: 'iOS App',
    description: 'Transform your intentions into reality. The ancient 369 method combined with guided meditation.',
    image: '/apps/369_Homescreen.png',
    color: '#E9CFB9',
    year: '2024',
    tags: ['Swift', 'AI Integration'],
  },
  {
    id: 'numistellar',
    name: 'NumiStellar',
    category: 'iOS App',
    description: 'Discover your cosmic energy. Astrology, numerology, and Schumann resonance unite.',
    image: '/apps/Numistellar_homescreen.png',
    color: '#B29F86',
    year: '2025',
    tags: ['Swift', 'AI'],
  },
  {
    id: 'elow',
    name: 'Elow',
    category: 'iOS App',
    description: 'Create your unique sound. AI composer transforms emotions into original soundscapes.',
    image: '/apps/elow_homescreen.png',
    color: '#20201E',
    year: '2026',
    tags: ['AI', 'Audio'],
  },
  {
    id: 'orbit',
    name: 'Orbit',
    category: 'iOS Game',
    description: 'Epic space journey. Dodge asteroids, collect power-ups in this addictive arcade game.',
    image: '/apps/orbit_gameplay1.png',
    color: '#1a1a2e',
    year: '2026',
    tags: ['Game', 'Space', 'Arcade'],
    link: 'https://www.awen28.com/orbit',
  },
  {
    id: 'kibook',
    name: 'kiBook',
    category: 'iOS App',
    description: 'Magic stories in seconds. Transform imagination into beautifully illustrated tales.',
    image: '/apps/kiBook_homescreen.png',
    color: '#B29F86',
    year: '2025',
    tags: ['OpenAI', 'Image Gen'],
  },
  {
    id: 'suremate',
    name: 'Suremate',
    category: 'iOS App',
    description: 'Smart insurance management for everyone. Track claims, manage policies, and get instant support.',
    image: '/apps/Suremate_homescreen.png',
    color: '#E8E5E0',
    year: '2024',
    tags: ['InsureTech', 'Swift'],
    link: 'https://www.awen28.com/suremate',
  },
  {
    id: 'suremate-pro',
    name: 'Suremate Pro',
    category: 'iOS App',
    description: 'Professional insurance tools for agents. Client management, analytics, and advanced reporting.',
    image: '/apps/SurematePro_homescreen.png',
    color: '#E9CFB9',
    year: '2024',
    tags: ['InsureTech', 'Swift'],
    link: 'https://www.awen28.com/suremate-pro',
  },
  {
    id: 'visai',
    name: 'VisAI',
    category: 'iOS App',
    description: 'Dream it, see it, achieve it. AI-powered vision boards for manifestation.',
    image: '/apps/visAI_homescreen.png',
    color: '#E9CFB9',
    year: '2025',
    tags: ['Image AI', 'Vision'],
  },
];

const AppShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentApp, setCurrentApp] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    const slides = gsap.utils.toArray<HTMLElement>('.project-slide');
    const totalSlides = slides.length;

    const ctx = gsap.context(() => {
      // Main scroll timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalSlides * 180}%`,
          pin: true,
          scrub: 1.5,
          onUpdate: (self) => {
            setProgress(self.progress);
            const appIndex = Math.min(
              Math.floor(self.progress * totalSlides),
              totalSlides - 1
            );
            setCurrentApp(appIndex);
          },
        },
      });

      slides.forEach((slide, index) => {
        const content = slide.querySelector('.slide-content');
        const phone = slide.querySelector('.phone-clay');

        // Initial states
        gsap.set(slide, { opacity: 0, zIndex: index });
        gsap.set(phone, { 
          x: window.innerWidth > 768 ? '-60vw' : '-30vw',
          rotationY: window.innerWidth > 768 ? -45 : -25,
          scale: 0.7,
          opacity: 0 
        });
        gsap.set(content, { 
          x: window.innerWidth > 768 ? '40vw' : '20vw', 
          opacity: 0 
        });

        const slideStart = index / totalSlides;
        const holdEnd = slideStart + (1 / totalSlides) * 0.85;
        const exitEnd = slideStart + (1 / totalSlides);

        // ENTER ANIMATION
        // Slide appears
        scrollTl.fromTo(
          slide,
          { opacity: 0 },
          { opacity: 1, duration: 0.02, ease: 'none' },
          slideStart
        );

        // Phone enters from left with rotation
        scrollTl.fromTo(
          phone,
          { x: window.innerWidth > 768 ? '-60vw' : '-30vw', rotationY: window.innerWidth > 768 ? -45 : -25, scale: 0.7, opacity: 0 },
          { x: 0, rotationY: 0, scale: 1, opacity: 1, duration: 0.12, ease: 'power2.out' },
          slideStart
        );

        // Content enters from right
        scrollTl.fromTo(
          content,
          { x: window.innerWidth > 768 ? '40vw' : '20vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 0.1, ease: 'power2.out' },
          slideStart + 0.02
        );

        // EXIT ANIMATION
        // Phone exits to right with rotation
        scrollTl.fromTo(
          phone,
          { x: 0, rotationY: 0, scale: 1, opacity: 1 },
          { x: window.innerWidth > 768 ? '60vw' : '30vw', rotationY: window.innerWidth > 768 ? 45 : 25, scale: 0.7, opacity: 0, duration: 0.1, ease: 'power2.in' },
          holdEnd
        );

        // Content exits to left
        scrollTl.fromTo(
          content,
          { x: 0, opacity: 1 },
          { x: window.innerWidth > 768 ? '-40vw' : '-20vw', opacity: 0, duration: 0.08, ease: 'power2.in' },
          holdEnd + 0.01
        );

        // Slide fades out
        scrollTl.fromTo(
          slide,
          { opacity: 1 },
          { opacity: 0, duration: 0.02, ease: 'none' },
          exitEnd - 0.02
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Mouse interaction for current phone
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full h-screen overflow-hidden"
      style={{ background: '#F1EDE6' }}
    >
      {/* Progress Bar at top */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 z-50"
        style={{ background: 'rgba(32, 32, 30, 0.05)' }}
      >
        <div 
          className="h-full transition-none"
          style={{ 
            background: 'linear-gradient(90deg, #D2B488, #BA986A, #525240)',
            width: `${progress * 100}%`,
          }}
        />
      </div>

      {/* Progress Dots */}
      <div className="fixed top-6 right-8 z-50 flex gap-2">
        {projects.map((_, idx) => (
          <div
            key={idx}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              background: idx === currentApp ? '#BA986A' : 'rgba(32, 32, 30, 0.2)',
              transform: idx === currentApp ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-12 left-0 right-0 z-30 px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          <div>
            <span 
              className="font-serif italic text-sm tracking-wider block mb-2"
              style={{ color: '#BA986A' }}
            >
              Built with meaning
            </span>
            <h2 
              className="font-serif text-4xl md:text-5xl"
              style={{ color: '#20201E' }}
            >
              iOS{' '}
              <span className="italic" style={{ color: '#BA986A' }}>
                Applications
              </span>
            </h2>
          </div>
          <span 
            className="text-sm tracking-widest hidden md:block"
            style={{ color: 'rgba(32, 32, 30, 0.45)' }}
          >
            {String(currentApp + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Slides Container */}
      <div
        ref={wrapperRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="project-slide absolute inset-0 flex items-center justify-center px-6 md:px-8"
            style={{ 
              zIndex: idx,
              pointerEvents: currentApp === idx ? 'auto' : 'none',
            }}
          >
            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              
              {/* Phone - Claymorphism with Mouse Interaction */}
              <div className="slide-image flex justify-center md:justify-end">
                <div
                  className="phone-clay relative p-3 md:p-5 rounded-[32px] md:rounded-[44px]"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                    transition: 'transform 0.3s ease-out',
                    background: '#F1EDE6',
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.85),
                      inset -2px -2px 4px rgba(154, 143, 128, 0.12),
                      12px 12px 24px rgba(154, 143, 128, 0.3),
                      -12px -12px 24px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  {/* Inner clay rim */}
                  <div
                    className="p-2 md:p-3 rounded-[24px] md:rounded-[32px]"
                    style={{
                      background: '#F7F3ED',
                      boxShadow: `
                        inset 1px 1px 2px rgba(32, 32, 30, 0.06),
                        inset -1px -1px 2px rgba(255, 255, 255, 0.85)
                      `,
                    }}
                  >
                    {/* ONLY THE SCREENSHOT - NO BACKGROUND */}
                    <div 
                      className="relative overflow-hidden"
                      style={{
                        width: window.innerWidth > 768 ? '240px' : '180px',
                        height: window.innerWidth > 768 ? '480px' : '360px',
                        borderRadius: '20px',
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                        loading={idx < 2 ? 'eager' : 'lazy'}
                        style={{ 
                          filter: 'contrast(1.02) brightness(1.02)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="slide-content text-left" style={{ pointerEvents: 'auto' }}>
                {/* Category & Number */}
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <span 
                    className="text-xs md:text-sm tracking-widest font-light"
                    style={{ color: 'rgba(32, 32, 30, 0.45)' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="w-6 md:w-8 h-px" style={{ background: 'rgba(32, 32, 30, 0.2)' }} />
                  <span className="text-xs md:text-sm" style={{ color: 'rgba(32, 32, 30, 0.62)' }}>
                    {project.category} • {project.year}
                  </span>
                </div>

                {/* Name */}
                <h3 
                  className="font-serif text-4xl md:text-6xl lg:text-7xl mb-3 md:mb-4 tracking-tight"
                  style={{ color: '#20201E' }}
                >
                  {project.name}
                </h3>

                {/* Tags - Clay style */}
                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 md:px-3 py-1 md:py-1.5 text-xs rounded-lg md:rounded-xl"
                      style={{ 
                        background: '#F7F3ED',
                        color: 'rgba(32, 32, 30, 0.72)',
                        boxShadow: `
                          inset 1px 1px 1px rgba(255, 255, 255, 0.9),
                          inset -1px -1px 1px rgba(32, 32, 30, 0.04),
                          1px 1px 2px rgba(32, 32, 30, 0.06),
                          -1px -1px 2px rgba(255, 255, 255, 0.9)
                        `,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p 
                  className="text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-md"
                  style={{ color: 'rgba(32, 32, 30, 0.72)' }}
                >
                  {project.description}
                </p>

                {/* CTAs */}
                <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">
                  {project.id === 'suremate' ? (
                    <Link
                      to="/suremate"
                      onClick={(e) => e.stopPropagation()}
                      className="group px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                      style={{ background: '#525240', color: '#F7F3ED' }}
                    >
                      View Case
                      <ArrowRight className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : project.id === 'suremate-pro' ? (
                    <Link
                      to="/suremate-pro"
                      onClick={(e) => e.stopPropagation()}
                      className="group px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                      style={{ background: '#525240', color: '#F7F3ED' }}
                    >
                      View Case
                      <ArrowRight className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : project.id === 'visai' ? (
                    <Link
                      to="/visai"
                      onClick={(e) => e.stopPropagation()}
                      className="group px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                      style={{ background: '#525240', color: '#F7F3ED' }}
                    >
                      View Case
                      <ArrowRight className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : project.id === '369' ? (
                    <Link
                      to="/369"
                      onClick={(e) => e.stopPropagation()}
                      className="group px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                      style={{ background: '#525240', color: '#F7F3ED' }}
                    >
                      View Case
                      <ArrowRight className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : project.id === 'numistellar' ? (
                    <Link
                      to="/numistellar"
                      onClick={(e) => e.stopPropagation()}
                      className="group px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                      style={{ background: '#525240', color: '#F7F3ED' }}
                    >
                      View Case
                      <ArrowRight className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : project.id === 'kibook' ? (
                    <Link
                      to="/kibook"
                      onClick={(e) => e.stopPropagation()}
                      className="group px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                      style={{ background: '#525240', color: '#F7F3ED' }}
                    >
                      View Case
                      <ArrowRight className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : project.id === 'elow' ? (
                    <Link
                      to="/elow"
                      onClick={(e) => e.stopPropagation()}
                      className="group px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                      style={{ background: '#525240', color: '#F7F3ED' }}
                    >
                      View Case
                      <ArrowRight className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : project.id === 'orbit' ? (
                    <Link
                      to="/orbit"
                      onClick={(e) => e.stopPropagation()}
                      className="group px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                      style={{ background: '#525240', color: '#F7F3ED' }}
                    >
                      Play Game
                      <ArrowRight className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : project.id === 'abwun' ? (
                    <Link
                      to="/abwun"
                      onClick={(e) => e.stopPropagation()}
                      className="group px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                      style={{ background: '#525240', color: '#F7F3ED' }}
                    >
                      View App
                      <ArrowRight className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : project.id === 'stradahub' ? (
                    <Link
                      to="/stradahub"
                      onClick={(e) => e.stopPropagation()}
                      className="group px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                      style={{ background: '#525240', color: '#F7F3ED' }}
                    >
                      View App
                      <ArrowRight className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="group px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                      style={{ background: '#525240', color: '#F7F3ED' }}
                    >
                      View Project
                      <ExternalLink className="w-3 md:w-4 h-3 md:h-4" />
                    </a>
                  ) : (
                    <button 
                      className="group px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                      style={{ background: '#525240', color: '#F7F3ED' }}
                    >
                      View Case
                      <ArrowRight className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-30 px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <p 
            className="text-xs tracking-widest uppercase"
            style={{ color: 'rgba(32, 32, 30, 0.35)' }}
          >
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
