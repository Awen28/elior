import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from './pages/Home';
import Suremate from './pages/Suremate';
import SurematePro from './pages/SurematePro';
import ThreeSixNine from './pages/ThreeSixNine';
import NumiStellar from './pages/NumiStellar';
import KiBook from './pages/KiBook';
import Elow from './pages/Elow';
import Orbit from './pages/Orbit';
import OrbitPrivacy from './pages/OrbitPrivacy';
import StradaHub from './pages/StradaHub';
import StradaHubPrivacy from './pages/StradaHubPrivacy';
import Abwun from './pages/Abwun';
import WebdesignTirol from './pages/WebdesignTirol';
import AppEntwicklungTirol from './pages/AppEntwicklungTirol';
import AgentRegister from './pages/AgentRegister';
import CreateAgent from './pages/CreateAgent';
import ForgotCode from './pages/ForgotCode';
import DownloadSurematePro from './pages/DownloadSurematePro';
import AgentPortal from './pages/AgentPortal';
import Callback from './pages/Callback';
import NotFound from './pages/NotFound';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import PrivacyApps from './pages/PrivacyApps';
import Cookies from './pages/Cookies';
import Navigation from './sections/Navigation';
import CookieConsent from './components/CookieConsent';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();
  const isAppPage = ['/suremate', '/suremate-pro', '/369', '/numistellar', '/kibook', '/elow', '/agentregister', '/createAgent', '/forgotcode', '/download-suremate-pro', '/agentportal', '/callback', '/orbit', '/orbit/privacy', '/stradahub', '/stradahub/privacy', '/abwun'].includes(location.pathname);

  // Any page that is not the home page always starts at the very top.
  // Leaf page position is restored separately by ScrollRestoration.
  useEffect(() => {
    if (location.pathname === '/') return;
    const scrollTop = () => {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    };
    const timers = [setTimeout(scrollTop, 0), setTimeout(scrollTop, 60), setTimeout(scrollTop, 250)];
    return () => timers.forEach(clearTimeout);
  }, [location.pathname]);

  useEffect(() => {
    // Faster refresh for better performance
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, [location]);

  // Update document title based on route
  useEffect(() => {
    const titles: { [key: string]: string } = {
      '/': 'Elior | Premium iOS Apps & Web Development Tirol Österreich',
      '/369': '369 Manifestation App - AI Vision Board & Meditation | Elior',
      '/numistellar': 'NumiStellar - Astrology & Numerology App | Elior',
      '/kibook': 'kiBook - AI Story Generator for Kids | Elior',
      '/elow': 'Elow - AI Music Generator | Elior',
      '/suremate': 'Suremate - Smart Insurance Management | Elior',
      '/suremate-pro': 'Suremate Pro - Insurance Agent Tools | Elior',
      '/agentregister': 'Suremate Pro - Agent Registration | Elior',
      '/createAgent': 'Suremate Pro - Create Agent Profile | Elior',
      '/forgotcode': 'Suremate Pro - Forgot Agent Code | Elior',
      '/download-suremate-pro': 'Download Suremate Pro | iOS App',
      '/stradahub': 'StradaHub - Community-Verkehrs-App für DACH | Elior',
      '/abwun': 'ABWUN - Trust Him | Prayer App | Elior',
      '/webdesign-tirol': 'Homepage programmieren Tirol & Österreich - Webdesign | Elior',
      '/app-entwicklung-tirol': 'App erstellen lassen Tirol & Österreich - iOS & Android | Elior',
    };
    
    const defaultTitle = 'Elior | Premium iOS Apps & Web Development Tirol';
    document.title = titles[location.pathname] || defaultTitle;
    
    // Update meta description based on route
    const descriptions: { [key: string]: string } = {
      '/': 'Elior ist ein Premium Digital Studio aus Tirol, Österreich, das Produkte mit Bedeutung baut. Entwickler Thomas Mayrl. Spezialisiert auf AI-gestützte iOS Apps und Webentwicklung.',
      '/369': '369 Manifestation App mit AI Vision Board, täglichen Affirmationen und Meditationen. Die 369 Methode für Manifestation - Morgens 3x, Mittags 6x, Abends 9x.',
      '/numistellar': 'NumiStellar vereint Astrologie, Numerologie und kosmische Energie. Echtzeit Planetenpositionen, Schumann Resonanz und Astrocartographie.',
      '/kibook': 'kiBook verwandelt Ideen in wunderschön illustrierte Geschichten. AI Story Generator für Kinder mit verschiedenen Kunststilen.',
      '/elow': 'Elow ist ein AI Music Generator der Emotionen in Musik verwandelt. Erstelle einzigartige Soundscapes für jede Stimmung und jeden Anlass.',
      '/suremate': 'Suremate - Smartes Versicherungsmanagement für Verbraucher. Schadensfälle verfolgen, Policen verwalten.',
      '/suremate-pro': 'Suremate Pro - Professionelle Versicherungstools für Agenten. Kundenmanagement und Analytik.',
      '/agentregister': 'Registriere dich als Suremate Pro Agent. Professionelle Versicherungs-Tools mit Kundenmanagement, Analytik und PDF-Reports.',
      '/createAgent': 'Erstelle dein Suremate Pro Agenten-Profil und erhalte deinen einzigartigen Agent-Code.',
      '/forgotcode': 'Finde deinen Suremate Pro Agent-Code per E-Mail. Einfach E-Mail eingeben und Code anzeigen lassen.',
      '/download-suremate-pro': 'Lade Suremate Pro für iOS herunter. Die professionelle Versicherungs-App für Agenten.',
      '/stradahub': 'StradaHub - Die Community-Verkehrs-App für den DACH-Raum. Unfälle, Baustellen, Straßensperren, Stau und Gefahren in Echtzeit auf der Karte. Kostenlos, ohne Registrierung, ohne Werbung. Keine Blitzer- oder Radarwarnung.',
      '/abwun': 'ABWUN ist das Gegenteil von Manifestation. Ein täglicher Weg mit Gott in drei Übergaben: Morgen, Mittag und Abend. KI-Gebetsbegleiter, biblisch fundierte Gebete, die mit "im Namen Jesu" enden. "Trust Him."',
      '/webdesign-tirol': 'Homepage programmieren lassen in Tirol & Österreich: Elior erstellt schnelle, moderne, Google-optimierte Websites mit React & TypeScript. One-Pager, Business-Sites, Shops & KI-Features.',
      '/app-entwicklung-tirol': 'App erstellen lassen in Tirol & Österreich: Elior entwickelt iOS & Android Apps mit KI-Integration, modernem Design und ASO. 50.000+ Downloads, 11+ Apps im App Store.',
    };
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[location.pathname] || descriptions['/']);
    }
  }, [location]);

  return (
    <HelmetProvider>
      <div className="relative min-h-screen" style={{ background: '#F5F1EA' }}>
        {!isAppPage && <Navigation />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/suremate" element={<Suremate />} />
          <Route path="/suremate-pro" element={<SurematePro />} />
          <Route path="/369" element={<ThreeSixNine />} />
          <Route path="/numistellar" element={<NumiStellar />} />
          <Route path="/kibook" element={<KiBook />} />
          <Route path="/elow" element={<Elow />} />
          <Route path="/orbit/privacy" element={<OrbitPrivacy />} />
          <Route path="/orbit" element={<Orbit />} />
          <Route path="/stradahub/privacy" element={<StradaHubPrivacy />} />
          <Route path="/stradahub" element={<StradaHub />} />
          <Route path="/abwun" element={<Abwun />} />
          <Route path="/webdesign-tirol" element={<WebdesignTirol />} />
          <Route path="/app-entwicklung-tirol" element={<AppEntwicklungTirol />} />
          <Route path="/agentregister" element={<AgentRegister />} />
          <Route path="/createAgent" element={<CreateAgent />} />
          <Route path="/forgotcode" element={<ForgotCode />} />
          <Route path="/download-suremate-pro" element={<DownloadSurematePro />} />
          <Route path="/agentportal" element={<AgentPortal />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/privacy-apps" element={<PrivacyApps />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </div>
    </HelmetProvider>
  );
}

export default App;