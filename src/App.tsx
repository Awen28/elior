import { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from './pages/Home';
import {
  Suremate,
  SurematePro,
  ThreeSixNine,
  NumiStellar,
  KiBook,
  Elow,
  Orbit,
  OrbitPrivacy,
  StradaHub,
  StradaHubPrivacy,
  Abwun,
  WebdesignTirol,
  AppEntwicklungTirol,
  AgentRegister,
  CreateAgent,
  ForgotCode,
  DownloadSurematePro,
  AgentPortal,
  Callback,
  NotFound,
  Impressum,
  Datenschutz,
  PrivacyApps,
  Cookies,
} from '@pages-registry';
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

  return (
    <div className="relative min-h-screen" style={{ background: '#F5F1EA' }}>
        {!isAppPage && <Navigation />}
        <Suspense fallback={<div className="min-h-screen" style={{ background: '#F5F1EA' }} aria-hidden />}>
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
          <Route path="/webdesign" element={<WebdesignTirol />} />
          <Route path="/app-entwicklung" element={<AppEntwicklungTirol />} />
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
        </Suspense>
        <CookieConsent />
    </div>
  );
}

export default App;