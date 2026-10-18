import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

  return (
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
  );
}

export default App;