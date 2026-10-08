import { useRef, useState, useEffect, Fragment } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Sun, CloudSun, Moon, BookOpen, Sprout, MessageCircleHeart, Settings, Download, ChevronRight, Heart, Feather, HandHeart, Sparkles, FlameKindling, Cross, Church, CircleDot, HeartCrack, Eye, MessageSquareText, VolumeX } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO, generateAppStructuredData, generateBreadcrumbData, generateFAQData } from '../components/SEO';

// Pastel earth tones - calm, warm, like prayer
const SAND = '#F0E8DF';
const SAND_SOFT = '#F8F4EF';
const SAGE = '#A8B5A2';
const SAGE_SOFT = '#E4E9E0';
const OCHRE = '#C89B55';
const TERRACOTTA = '#C49070';
const INK = '#4A4038';
const INK_SOFT = 'rgba(74, 64, 56, 0.65)';
const IVORY = '#FAF9F7';

const steps = [
  {
    icon: Sun,
    title: 'Morning',
    subtitle: '“I surrender the day.”',
    description: 'Entrust your whole day - your dreams, your concerns, your plans - to God, before anything else speaks to you.',
    color: '#D9A06B',
    time: 'Morning',
  },
  {
    icon: CloudSun,
    title: 'Noon',
    subtitle: '“I anchor myself anew.”',
    description: 'A short, quiet conversation in the middle of the day to realign yourself with God\'s will - not with self-effort or worldly approval.',
    color: '#C89B55',
    time: 'Noon',
  },
  {
    icon: Moon,
    title: 'Evening',
    subtitle: '“I lay everything in God\'s hands.”',
    description: 'Grateful release: your day and your dreams now rest with God - also through the night.',
    color: '#A8B5A2',
    time: 'Evening',
  },
];

const features = [
  {
    icon: MessageCircleHeart,
    title: 'Heart Conversation',
    description: 'Write to God - and receive a response. An AI prayer companion (GPT-4o-mini) crafts personal, biblically grounded prayers that always end "in Jesus\' name".',
  },
  {
    icon: BookOpen,
    title: 'Today',
    description: 'Your daily path in three surrenders: morning, noon and evening - each with your own concern, a Bible verse and a personal AI-crafted prayer.',
  },
  {
    icon: Sprout,
    title: 'The Garden',
    description: 'A growing collection of promises. Every verse and word the Lord has given you, gathered in one peaceful place.',
  },
  {
    icon: Heart,
    title: 'My Journey',
    description: 'Your personal overview of prayers and surrenders. Watch how faithfully God has carried each day and commit.',
  },
  {
    icon: CircleDot,
    title: 'Prayer Rope',
    description: 'The ancient Jesus Prayer ("Lord Jesus Christ, Son of God, have mercy on me") on a prayer rope with 33, 50 or 100 knots. Tap at your own pace or follow the breath rhythm.',
  },
  {
    icon: Church,
    title: 'The Rosary',
    description: 'The complete Rosary in the traditional order - cross, cream, five decades with the mysteries of the day, in the official liturgical wording.',
  },
  {
    icon: Cross,
    title: 'The Simple Way',
    description: 'A christ-centered prayer path from God\'s word alone: incarnation, cross, resurrection, presence and surrender - for those who pray neither catholic nor orthodox.',
  },
  {
    icon: HeartCrack,
    title: 'Lament & Unanswered Prayer',
    description: 'The place for "God has not answered" - without placating. Honest lament in the language of the lament psalms. "I trust Him anyway" or "I can\'t yet" - both may stand before God.',
  },
  {
    icon: MessageSquareText,
    title: 'Faith & Answers',
    description: 'A chat for every question about God, Jesus, the Bible and faith. Every answer is Bible-anchored with verses, told in parables, with proven facts. Jesus at the center.',
  },
  {
    icon: VolumeX,
    title: 'Silence',
    description: 'The contemplative heart of the path: Lectio Divina, the presence mode in stillness, and letting-go moments - always skippable, never forced.',
  },
  {
    icon: Eye,
    title: 'The Examen',
    description: 'The Ignatian evening review in five steps: gratitude, light, review, guilt and tomorrow. Not self-improvement - but the recognition that you live by grace.',
  },
  {
    icon: Settings,
    title: 'Peaceful Settings',
    description: 'Gentle reminders for morning, noon and evening. Your name, your reminders, your full control - including deleting your account and all data.',
  },
];

const gratitude = [
  'You no longer need to force, panic or control',
  'You can let go - because God carries you',
  'You experience peace, not restless expectation',
  'Isaiah 55,8 comforts your thoughts',
  '"Ego death": you step back, Christ grows in you',
];

const prayerPaths = [
  {
    icon: CircleDot,
    label: 'Orthodox',
    title: 'The Prayer Rope',
    verse: '"Pray without ceasing." — 1 Thessalonians 5,17',
    color: OCHRE,
    soft: `${OCHRE}15`,
    points: [
      'The ancient Jesus Prayer on 33, 50 or 100 knots',
      'Two modes: "Tap" (your own pace) or "Breath" (one knot per breath: 4.5s in, 5.5s out)',
      'Visually guided knot circle with cross pendant',
      'Soft haptics per knot, stronger every tenth, gong at the end',
    ],
  },
  {
    icon: Church,
    label: 'Catholic',
    title: 'The Rosary',
    verse: '"Rejoice, Mary, full of grace." — Luke 1,28',
    color: TERRACOTTA,
    soft: `${TERRACOTTA}15`,
    points: [
      'Complete Rosary in the traditional order: cross, chain, medallion',
      'Five decades with the mysteries of the weekday (joyful, sorrowful, glorious, luminous)',
      'Official liturgical wording in every language',
      'Visual Rosary shape with loop, glowing active bead and progress arc',
    ],
  },
  {
    icon: Cross,
    label: 'Christ-centered',
    title: 'The Simple Way',
    verse: '"He must increase, but I must decrease." — John 3,30',
    color: SAGE,
    soft: `${SAGE}15`,
    points: [
      'A prayer path from God\'s word alone - no Marian invocations',
      'Five sections through the Christ mystery: incarnation, cross, resurrection, presence, surrender',
      'One large bead with Scripture, seven small ones with a breath prayer each',
      'For everyone who prays neither catholic nor orthodox',
    ],
  },
];

const lamentSteps = [
  {
    title: 'Tell Him honestly',
    description: 'No pious words, no prettifying. God can bear your raw words - He invented them.',
  },
  {
    title: 'You are not the first',
    description: 'A lament psalm gives you the language: Psalm 13, 22, 42, 88, 130 or Lamentations 3 - readable aloud.',
  },
  {
    title: 'And now?',
    description: 'Two equal answers stand before God: "I trust Him anyway" OR "I can\'t yet." Nothing is forced, no turning is demanded.',
  },
  {
    title: 'The close',
    description: '"The LORD is near to those who are brokenhearted." — Psalm 34,19. Acknowledged, heard, held.',
  },
];

const screenshots = [
  { src: '/apps/Abwun_home.png', alt: 'Today' },
  { src: '/apps/Abwun_prayer.png', alt: 'Prayer' },
  { src: '/apps/Abwun_wishes.png', alt: 'Wishes' },
  { src: '/apps/Abwun_meditation.png', alt: 'Meditation' },
  { src: '/apps/Abwun_progress.png', alt: 'My Journey' },
  { src: '/apps/Abwun_heartTalk.png', alt: 'Heart Conversation' },
];

// App Structured Data
const appStructuredData = generateAppStructuredData(
  "ABWUN",
  "ABWUN - the opposite of manifestation. A daily path with God in three surrenders: Morning, Noon and Evening. AI prayer companion, biblically grounded prayers, and inner freedom through complete surrender. 'Trust Him.'",
  "https://www.awen28.com/apps/Abwun_home.png",
  "https://apps.apple.com/us/app/abwun/id6810855629",
  "ReferenceApplication",
  "4.9",
  "4800",
  ["Prayer", "Bible", "AI Prayer Companion", "Surrender", "Faith", "Spirituality", "Inner Peace", "Trust God", "Ego Death", "Daily Devotion", "Prayer Rope", "Rosary", "Lament", "Examen", "Lectio Divina", "Jesus Prayer", "Christian Chat", "Contemplation"],
  ["/apps/Abwun_home.png", "/apps/Abwun_prayer.png", "/apps/Abwun_wishes.png", "/apps/Abwun_heartTalk.png", "/apps/Abwun_meditation.png"],
  "2026-06-01",
  "45MB",
  "4+"
);

const breadcrumbData = generateBreadcrumbData([
  { name: "Home", url: "https://www.awen28.com/" },
  { name: "ABWUN", url: "https://www.awen28.com/abwun" }
]);

const faqData = generateFAQData([
  { question: "What does ABWUN mean?", answer: "ABWUN is Aramaic and means 'Our Father'. It is the exact word Jesus used in the Lord's Prayer when he taught his disciples to pray. It is one unified name worldwide - regardless of whether you pray in German, English, Spanish, Italian or Romanian." },
  { question: "Is ABWUN a manifestation app?", answer: "No. ABWUN is the opposite of New-Age manifestation. Manifestation forces your own will onto the world. ABWUN surrenders your own will: 'Not my will, but your will be done.' (Luke 22,42) Your dreams are not thrown away - they are humbly placed in God's hands with trust, not control." },
  { question: "Does ABWUN include the Prayer Rope with the Jesus Prayer?", answer: "Yes. ABWUN contains a guided prayer rope (komboskini) with 33, 50 or 100 knots. On every knot the Jesus Prayer is spoken: 'Lord Jesus Christ, Son of God, have mercy on me.' You can tap at your own pace or pray in breath rhythm (4.5s in, 5.5s out) - with soft haptics, a stronger pulse every ten knots and a gong at the end." },
  { question: "Is the full Rosary included in ABWUN?", answer: "Yes. The complete Rosary is included in the traditional order - cross, chain, medallion, and five decades. All 20 mysteries appear by weekday (joyful, sorrowful, glorious, luminous), and every fixed prayer is available in the official liturgical wording of each language - not machine-translated." },
  { question: "What is Lament & Unanswered Prayer in ABWUN?", answer: "It is the place for 'God has not answered' - without placating. You can speak honestly, find your words in the lament psalms (Psalm 13, 22, 42, 88, 130, Lamentations 3), and then choose between two equal answers: 'I trust Him anyway' or 'I can't yet.' Both may stand before God." },
  { question: "How does the AI prayer companion work?", answer: "At each time of day you can write your current heart's concern. An AI prayer companion (GPT-4o-mini) then crafts a personal, biblically founded prayer for you that always ends 'in Jesus' name' - never manifestation, always surrender." },
  { question: "Is ABWUN free?", answer: "Yes, ABWUN is free to download. You can delete your account at any time in the settings - this deletes ALL your data: prayers, dreams, promises and heart conversations, as well as your account itself." },
  { question: "Which languages does ABWUN support?", answer: "ABWUN is available in German, English (fallback), Spanish, Italian and Romanian - with the unified name 'ABWUN' and a localized subtitle, e.g. 'ABWUN - Trust Him' or 'ABWUN - Überlass es Gott'." },
]);

const gentleFloat = {
  animate: { y: [-6, 6, -6], opacity: [0.5, 0.8, 0.5] },
  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const },
};

const sighAnimation = {
  animate: { scale: [1, 1.12, 1], opacity: [0.35, 0.15, 0.35] },
  transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const },
};

const Abwun = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  useEffect(() => {
    if (location.pathname === '/abwun') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePos({ x, y });
  };

  return (
    <Fragment>
      <SEO
        title="ABWUN | Trust Him - Prayer App with Prayer Rope, Rosary & AI Companion"
        description="ABWUN - the opposite of manifestation. Daily surrenders with AI prayer companion, Prayer Rope (Jesus Prayer), full Rosary, Lament for unanswered prayer, Examen and Faith & Answers. 'Trust Him.' Free on iOS."
        keywords="ABWUN, prayer app, AI prayer companion, Prayer Rope, Gebetsschnur, Jesus Prayer, Rosary, Rosenkranz, Lament, unanswered prayer, unbeantwortetes Gebet, Klage, Examen, Lectio Divina, Trust Him, surrender to God, not my will but your will, Lord's Prayer Aramaic, Abwun Our Father, christian app 2026, daily devotion app, ego death, spiritual freedom, bible based prayer, prayer journal app, Gospel app, faith app iOS"
        ogImage="https://www.awen28.com/apps/Abwun_home.png"
        ogType="product"
        canonical="https://www.awen28.com/abwun"
        structuredData={[appStructuredData, breadcrumbData, faqData]}
        appName="ABWUN"
        appCategory="ReferenceApplication"
        rating="4.9"
        reviewCount="4800"
        language="en"
      />
      <div ref={containerRef} className="relative min-h-screen" style={{ background: IVORY }}>
        {/* Animated calm background - soft breathing light */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(200, 155, 85, 0.1) 0%, transparent 70%)' }}
            variants={sighAnimation}
            animate="animate"
          />
          <motion.div
            className="absolute top-1/3 -right-24 w-[450px] h-[450px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(168, 181, 162, 0.12) 0%, transparent 70%)' }}
            variants={sighAnimation}
            animate="animate"
            transition={{ delay: 1.5 }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(196, 144, 112, 0.1) 0%, transparent 70%)' }}
            variants={sighAnimation}
            animate="animate"
            transition={{ delay: 3 }}
          />

          {/* Floating feathers - subtle easter egg */}
          <motion.div
            className="absolute top-[18%] right-[12%]"
            variants={gentleFloat}
            animate="animate"
            transition={{ duration: 7 }}
          >
            <Feather className="w-6 h-6" style={{ color: SAGE, opacity: 0.4 }} />
          </motion.div>
          <motion.div
            className="absolute bottom-[25%] left-[8%]"
            variants={gentleFloat}
            animate="animate"
            transition={{ duration: 9, delay: 2 }}
          >
            <Feather className="w-4 h-4" style={{ color: TERRACOTTA, opacity: 0.35 }} />
          </motion.div>

          {/* Gentle rising prayer particles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: OCHRE,
                left: `${15 + i * 22}%`,
                boxShadow: '0 0 8px rgba(200, 155, 85, 0.4)',
              }}
              animate={{ y: [0, -220], opacity: [0, 0.5, 0] }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i * 1.7, ease: 'linear' }}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                color: INK,
                boxShadow: '0 4px 12px rgba(74, 64, 56, 0.08)',
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Elior
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ y: bgY }}
          >
            <div
              className="absolute top-[15%] left-[5%] w-[600px] h-[600px] rounded-full opacity-40"
              style={{ background: 'radial-gradient(circle, rgba(200, 155, 85, 0.18) 0%, transparent 70%)' }}
            />
            <div
              className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full opacity-35"
              style={{ background: 'radial-gradient(circle, rgba(168, 181, 162, 0.22) 0%, transparent 70%)' }}
            />
          </motion.div>

          <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #C89B55 0%, #A8B5A2 100%)',
                    boxShadow: '0 8px 32px rgba(200, 155, 85, 0.35)',
                  }}
                >
                  <HandHeart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl" style={{ color: INK }}>ABWUN</h1>
                  <p className="text-sm" style={{ color: INK_SOFT }}>Trust Him</p>
                </div>
              </motion.div>

              <motion.h2
                className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
                style={{ color: INK }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Trust Him.
                <br />
                <span style={{ color: OCHRE }}>Let go.</span>
              </motion.h2>

              <motion.p
                className="text-lg mb-8 max-w-md"
                style={{ color: INK_SOFT }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                ABWUN is the opposite of manifestation. Instead of forcing your own
                will upon the world, you lay your dreams humbly in God's hands.
                A daily path in three surrenders - morning, noon and evening.
              </motion.p>

              {/* Verse - subtle highlighted quote */}
              <motion.div
                className="mb-8 px-5 py-4 rounded-2xl border-l-4"
                style={{
                  background: `${SAGE_SOFT}55`,
                  borderColor: SAGE,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.45 }}
              >
                <p className="font-serif italic text-sm md:text-base" style={{ color: INK_SOFT }}>
                  "Not my will, but your will be done." — Luke 22,42
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <a
                  href="https://apps.apple.com/us/app/abwun/id6810855629"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #C89B55 0%, #A8B5A2 100%)',
                    color: 'white',
                    boxShadow: '0 8px 24px rgba(200, 155, 85, 0.35)',
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download ABWUN
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center md:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            >
              <motion.div
                className="relative p-4 md:p-6 rounded-[40px]"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                  transition: 'transform 0.3s ease-out',
                  background: SAND_SOFT,
                  boxShadow: `
                    inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                    inset -3px -3px 6px rgba(74, 64, 56, 0.05),
                    20px 20px 40px rgba(200, 155, 85, 0.15),
                    -20px -20px 40px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <div
                  className="p-3 rounded-[28px]"
                  style={{
                    background: IVORY,
                    boxShadow: `
                      inset 2px 2px 4px rgba(74, 64, 56, 0.04),
                      inset -2px -2px 4px rgba(255, 255, 255, 0.8)
                    `,
                  }}
                >
                  <img
                    src="/apps/Abwun_home.png"
                    alt="ABWUN App"
                    className="w-[260px] md:w-[300px] h-auto rounded-[24px]"
                  />
                </div>

                {/* Floating heart badge - gentle easter egg */}
                <motion.div
                  className="absolute -top-3 -right-3 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #C89B55 0%, #A8B5A2 100%)',
                    color: 'white',
                    boxShadow: '0 8px 24px rgba(200, 155, 85, 0.4)',
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <HandHeart className="w-3 h-3" />
                  Trust Him
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Meaning Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: SAND_SOFT }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: OCHRE }}>
                  The Name
                </span>
                <h2 className="font-serif text-4xl md:text-5xl mb-8" style={{ color: INK }}>
                  What does &ldquo;ABWUN&rdquo; mean?
                </h2>
                <p className="text-lg mb-6" style={{ color: INK_SOFT }}>
                  ABWUN is Aramaic and means{" "}
                  <strong style={{ color: INK }}>"Our Father."</strong> It is the exact word
                  Jesus spoke when he taught his disciples to pray - the Lord's Prayer begins,
                  in Aramaic, with <em>Abwun</em>.
                </p>
                <p className="text-lg mb-6" style={{ color: INK_SOFT }}>
                  It is not an invented brand name, but the original word of prayer. And it is
                  unified worldwide: no matter whether you pray in German, English, Spanish,
                  Italian or Romanian - the name remains <strong style={{ color: INK }}>Abwun</strong>.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['EN: Trust Him', 'DE: Überlass es Gott', 'IT: Lascia fare a Dio', 'ES: Déjalo en manos de Dios', 'RO: Lasă-L pe Dumnezeu'].map((label, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full text-xs"
                      style={{
                        background: SAGE_SOFT,
                        color: '#5E6B58',
                        boxShadow: `
                          inset 1px 1px 2px rgba(255, 255, 255, 0.8),
                          inset -1px -1px 2px rgba(74, 64, 56, 0.04)
                        `,
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex justify-center"
              >
                <div
                  className="p-8 md:p-12 rounded-[40px] text-center"
                  style={{
                    background: SAND,
                    boxShadow: `
                      inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                      inset -3px -3px 6px rgba(74, 64, 56, 0.05),
                      16px 16px 32px rgba(200, 155, 85, 0.1),
                      -16px -16px 32px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex items-center gap-3 mb-6"
                  >
                    <FlameKindling className="w-5 h-5" style={{ color: OCHRE }} />
                    <span className="font-serif italic text-2xl" style={{ color: INK }}>
                      Abwun...
                    </span>
                  </motion.div>
                  <p className="font-serif italic text-sm mb-6" style={{ color: INK_SOFT }}>
                    The Lord's Prayer, in Aramaic, begins:
                  </p>
                  <p className="font-serif text-3xl md:text-4xl mb-4" style={{ color: INK }}>
                    &ldquo;Abwun d'bwaschmaja&rdquo;
                  </p>
                  <p className="font-serif text-lg mb-6" style={{ color: INK_SOFT }}>
                    "Our Father in heaven..."
                  </p>
                  <div className="w-16 h-px mx-auto mb-6" style={{ background: SAGE }} />
                  <p className="font-serif italic text-lg" style={{ color: TERRACOTTA }}>
                    "Your will be done - on earth as in heaven." — Matthew 6,10
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ego Death / Not Manifestation Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: IVORY }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: OCHRE }}>
                The Idea
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: INK }}>
                The opposite of manifestation
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: INK_SOFT }}>
                Manifestation pushes <em>your</em> will onto the world. ABWUN turns it around:
                you let your own will go, because God alone carries. Your dreams are not thrown
                away - they are humbly placed in His hands.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Manifestation */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-10 rounded-[32px]"
                style={{
                  background: '#F6F2EC',
                  boxShadow: `
                    inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                    inset -2px -2px 4px rgba(74, 64, 56, 0.03)
                  `,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#E8E0D5' }}>
                    <Sparkles className="w-5 h-5" style={{ color: '#A89880' }} />
                  </div>
                  <h3 className="font-serif text-2xl" style={{ color: INK_SOFT }}>Manifestation</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'My will, my ego, my "right to fulfillment"',
                    'My own will, forced upon the world',
                    'Self-affirmation before the eyes of the world',
                    'Control over the universe',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: '#A89880', opacity: 0.5 }} />
                      <span style={{ color: 'rgba(74, 64, 56, 0.45)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* ABWUN */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="p-10 rounded-[32px] relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #F0E8DF 0%, #E8EFE3 100%)',
                  boxShadow: `
                    inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                    inset -2px -2px 4px rgba(74, 64, 56, 0.04),
                    12px 12px 24px rgba(168, 181, 162, 0.15),
                    -12px -12px 24px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: SAGE }}>
                    <HandHeart className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl" style={{ color: INK }}>ABWUN</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'I let my own will go - "ego death"',
                    'Not I decide, but God alone',
                    '"Not my will, but your will be done." (Luke 22,42)',
                    'I lay my dreams humbly in God\'s hands',
                    'Trust, not control',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: SAGE }} />
                      <span style={{ color: INK_SOFT }}>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Soft glow easter egg */}
                <motion.div
                  className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(168, 181, 162, 0.25) 0%, transparent 70%)' }}
                  variants={sighAnimation}
                  animate="animate"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mt-16"
            >
              <p className="font-serif italic text-lg" style={{ color: TERRACOTTA }}>
                "I live, yet not I, but Christ lives in me." — Galatians 2,20
              </p>
            </motion.div>
          </div>
        </section>

        {/* Three Surrenders Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: SAND_SOFT }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: OCHRE }}>
                A Daily Path
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: INK }}>
                Three surrenders a day
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: INK_SOFT }}>
                Three times of day, three surrenders. A day lived with God - from the first
                thought to the last.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-[32px]"
                  style={{
                    background: IVORY,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(74, 64, 56, 0.04),
                      8px 8px 16px rgba(74, 64, 56, 0.06),
                      -8px -8px 16px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${step.color}22` }}
                    >
                      <step.icon className="w-7 h-7" style={{ color: step.color }} />
                    </div>
                    <span className="text-xs tracking-widest uppercase" style={{ color: INK_SOFT }}>
                      {step.time}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl mb-1" style={{ color: INK }}>
                    {step.title}
                  </h3>
                  <p className="font-serif italic mb-4" style={{ color: OCHRE }}>
                    {step.subtitle}
                  </p>
                  <p style={{ color: INK_SOFT }}>{step.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mt-16"
            >
              <p className="font-serif italic text-lg" style={{ color: TERRACOTTA }}>
                "For my thoughts are not your thoughts, neither are your ways my ways." — Isaiah 55,8
              </p>
              <p className="font-serif italic text-sm mt-2" style={{ color: INK_SOFT }}>
                What you do not understand is safely held in God's hands - and never lost.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Prayer Paths Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: IVORY }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: OCHRE }}>
                Guided Prayer Paths
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: INK }}>
                Beads, knots & the quiet path
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: INK_SOFT }}>
                Repeating prayer is lived "ego death": your own thinking grows quiet in the
                repetition - and Christ remains. Three traditions, one heart. Choose freely;
                none is imposed on you.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {prayerPaths.map((path, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-[32px] relative overflow-hidden"
                  style={{
                    background: SAND_SOFT,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(74, 64, 56, 0.04),
                      8px 8px 16px rgba(74, 64, 56, 0.06),
                      -8px -8px 16px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: `linear-gradient(90deg, ${path.color}, transparent)` }}
                  />
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: path.soft }}
                    >
                      <path.icon className="w-7 h-7" style={{ color: path.color }} />
                    </div>
                    <span className="text-xs tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: `${path.color}18`, color: INK_SOFT }}>
                      {path.label}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl mb-1" style={{ color: INK }}>
                    {path.title}
                  </h3>
                  <p className="font-serif italic text-sm mb-6" style={{ color: path.color }}>
                    {path.verse}
                  </p>
                  <ul className="space-y-4">
                    {path.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: path.color }} />
                        <span style={{ color: INK_SOFT }}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: IVORY }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: OCHRE }}>
                Features
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: INK }}>
                A gentle companion
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-[32px]"
                  style={{
                    background: SAND_SOFT,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(74, 64, 56, 0.04),
                      8px 8px 16px rgba(74, 64, 56, 0.06),
                      -8px -8px 16px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: `${SAGE}22` }}
                  >
                    <feature.icon className="w-7 h-7" style={{ color: '#71806A' }} />
                  </div>
                  <h3 className="font-serif text-2xl mb-4" style={{ color: INK }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: INK_SOFT }}>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lament & Unanswered Prayer Section */}
        <section className="py-32 px-6 md:px-8 relative overflow-hidden" style={{ background: SAND_SOFT }}>
          {/* Soft dimmed glow - quiet heaviness */}
          <motion.div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(196, 144, 112, 0.12) 0%, transparent 70%)' }}
            variants={sighAnimation}
            animate="animate"
          />
          <div className="max-w-7xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: TERRACOTTA }}>
                Lament & Unanswered Prayer
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: INK }}>
                "God has not answered."
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: INK_SOFT }}>
                Manifestation apps have no category for this. The Bible has an entire book.
                ABWUN is the place for the unanswered - without placating, without shame.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {lamentSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-[32px]"
                  style={{
                    background: IVORY,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(74, 64, 56, 0.04),
                      8px 8px 16px rgba(74, 64, 56, 0.06),
                      -8px -8px 16px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg shrink-0"
                      style={{ background: `${TERRACOTTA}20` }}
                    >
                      <span style={{ color: TERRACOTTA }}>{idx + 1}</span>
                    </div>
                    <h3 className="font-serif text-xl leading-snug" style={{ color: INK }}>
                      {step.title}
                    </h3>
                  </div>
                  <p style={{ color: INK_SOFT }}>{step.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mt-16"
            >
              <p className="font-serif italic text-lg" style={{ color: TERRACOTTA }}>
                Psalm 88 is deliberately included - the only psalm that ends without comfort.
                Yet it stands in Scripture. That too is allowed.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Inner Freedom / Gratitude Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: SAND_SOFT }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex justify-center md:order-2"
              >
                <div
                  className="p-4 md:p-6 rounded-[40px]"
                  style={{
                    background: SAND,
                    boxShadow: `
                      inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                      inset -3px -3px 6px rgba(74, 64, 56, 0.05),
                      16px 16px 32px rgba(200, 155, 85, 0.1),
                      -16px -16px 32px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <div
                    className="p-3 rounded-[28px]"
                    style={{
                      background: IVORY,
                      boxShadow: `
                        inset 2px 2px 4px rgba(74, 64, 56, 0.04),
                        inset -2px -2px 4px rgba(255, 255, 255, 0.8)
                      `,
                    }}
                  >
                    <img
                      src="/apps/Abwun_prayer.png"
                      alt="ABWUN Prayer"
                      className="w-[280px] h-auto rounded-[24px]"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:order-1"
              >
                <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: OCHRE }}>
                  What it creates
                </span>
                <h2 className="font-serif text-4xl md:text-5xl mb-8" style={{ color: INK }}>
                  Real inner freedom
                </h2>
                <p className="text-lg mb-8" style={{ color: INK_SOFT }}>
                  The goal is not control of the universe - it is emotional freedom through
                  complete surrender:
                </p>
                <div className="space-y-5">
                  {gratitude.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="flex items-center gap-4"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${SAGE}22` }}
                      >
                        <Heart className="w-4 h-4" style={{ color: SAGE }} />
                      </div>
                      <span style={{ color: INK_SOFT }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Screenshots Gallery */}
        <section className="py-32 px-6 md:px-8" style={{ background: IVORY }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="font-serif italic text-sm tracking-[0.3em] block mb-6" style={{ color: OCHRE }}>
                App Screenshots
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: INK }}>
                Walk with Him
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {screenshots.map((screenshot, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="p-3 rounded-[24px] cursor-pointer"
                  style={{
                    background: SAND_SOFT,
                    boxShadow: `
                      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                      inset -2px -2px 4px rgba(74, 64, 56, 0.04),
                      6px 6px 12px rgba(74, 64, 56, 0.06),
                      -6px -6px 12px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className="w-full h-auto rounded-[16px]"
                  />
                  <p className="text-center text-xs mt-3 mb-1" style={{ color: INK_SOFT }}>
                    {screenshot.alt}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 md:px-8" style={{ background: SAND_SOFT }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div
              className="p-12 md:p-16 rounded-[40px] relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #C89B55 0%, #A8B5A2 100%)',
                boxShadow: '0 32px 64px rgba(200, 155, 85, 0.35)',
              }}
            >
              {/* Gentle light rays easter egg */}
              <motion.div
                className="absolute inset-0 opacity-25"
                animate={{
                  background: [
                    'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.4) 0%, transparent 40%)',
                    'radial-gradient(circle at 75% 50%, rgba(255,255,255,0.4) 0%, transparent 40%)',
                    'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.4) 0%, transparent 40%)',
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />

              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 relative z-10">
                Your dream, in God's hands.
              </h2>
              <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto relative z-10">
                ABWUN does not shape the world to your will - it frees you from it.
                Download ABWUN and begin the quiet path of surrender.
              </p>
              <div className="flex flex-wrap gap-4 justify-center relative z-10">
                <a
                  href="https://apps.apple.com/us/app/abwun/id6810855629"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: 'white',
                    color: '#8A6D3B',
                  }}
                >
                  <Download className="w-5 h-5" />
                  Get ABWUN on the App Store
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 md:px-8" style={{ background: '#E6DED3' }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C89B55 0%, #A8B5A2 100%)' }}
              >
                <HandHeart className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl" style={{ color: INK }}>ABWUN</span>
            </div>
            <p className="text-sm" style={{ color: INK_SOFT }}>
              © 2026 ABWUN. A product by Elior.
            </p>
            <Link
              to="/"
              className="flex items-center gap-2 text-sm"
              style={{ color: '#8A6D3B' }}
            >
              Visit Elior
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default Abwun;