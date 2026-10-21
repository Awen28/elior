import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { SEO, generateLocalBusinessData, generateWebSiteData, generateBreadcrumbData, generateFAQData } from '../components/SEO';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

import AppShowcase from '../sections/AppShowcase';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const { i18n } = useTranslation();
  useEffect(() => {
    // Faster refresh for better loading performance
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const breadcrumbData = generateBreadcrumbData([
    { name: "Home", url: "https://elior.studio/" }
  ]);

  const faqData = generateFAQData([
    { question: "Wer entwickelt iOS Apps?", answer: "Elior entwickelt premium iOS Apps mit Swift, SwiftUI, KI-Integration und App Store Optimization – von der Idee bis zur Veröffentlichung." },
    { question: "Wie viel kostet eine iOS App?", answer: "Die Kosten für eine iOS App hängen vom Umfang ab. Elior bietet transparente Preise für native iOS Entwicklung, Webentwicklung und AI-Integration." },
    { question: "Kann man bei Elior auch eine Android App erstellen lassen?", answer: "Ja. Elior entwickelt neben nativen iOS Apps auch Android Apps – individuell, mit modernem UI/UX und optionaler KI-Integration." },
    { question: "Wer entwickelt Homepages und Websites?", answer: "Elior entwickelt moderne, responsive Homepages und Websites mit React, TypeScript und Fokus auf Performance, SEO und Conversion." },
    { question: "Wie viel kostet eine Homepage oder Website?", answer: "Elior erstellt maßgeschneiderte Websites und Homepages zu transparenten Preisen – vom One-Page-Auftritt bis zur komplexen Web-App mit Backend und KI." },
    { question: "Was ist die beste Manifestation App?", answer: "Die 369 Manifestation App von Elior basiert auf Nikola Tesla's 3-6-9 Methode und bietet AI Vision Boards, tägliche Affirmationen und geführte Meditationen." },
    { question: "Welche Astrologie App ist die beste in Österreich?", answer: "NumiStellar von Elior ist die führende Astrologie und Numerologie App in Österreich mit Echtzeit Planetenpositionen und personalisierten Einblicken." },
    { question: "Mit welcher App kann man Musik mit KI erstellen?", answer: "Elow von Elior ist der beste AI Music Generator, um Musik mit KI zu erstellen – Emotionen, Stimmungen und Ideen werden in einzigartige Soundscapes verwandelt." },
    { question: "Wer entwickelt Apps?", answer: "Elior entwickelt native iOS- und Android-Apps sowie Websites – mit 11+ veröffentlichten Apps im App Store und 5-Sterne-Bewertungen." },
  ]);

  const appsListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Elior Apps",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "url": "https://elior.studio/369", "name": "369 Manifestation" },
      { "@type": "ListItem", "position": 2, "url": "https://elior.studio/numistellar", "name": "NumiStellar" },
      { "@type": "ListItem", "position": 3, "url": "https://elior.studio/kibook", "name": "kiBook" },
      { "@type": "ListItem", "position": 4, "url": "https://elior.studio/elow", "name": "Elow AI Music" },
      { "@type": "ListItem", "position": 5, "url": "https://elior.studio/orbit", "name": "Orbit Game" },
      { "@type": "ListItem", "position": 6, "url": "https://elior.studio/abwun", "name": "ABWUN" },
      { "@type": "ListItem", "position": 7, "url": "https://elior.studio/stradahub", "name": "StradaHub" },
      { "@type": "ListItem", "position": 8, "url": "https://elior.studio/suremate", "name": "Suremate" },
      { "@type": "ListItem", "position": 9, "url": "https://elior.studio/suremate-pro", "name": "Suremate Pro" },
    ],
  };

  return (
    <>
      <SEO 
        title="Elior | App Entwicklung, Webdesign & KI-Integration"
        tabTitle="Studio Elior"
        description="Elior ist ein Digitalstudio aus Österreich: iOS-/Android-Apps, Websites und KI-Integration. 11+ Apps, 50.000+ Downloads. Jetzt Projekt anfragen."
        keywords="App Entwicklung, iOS App, Android App, Webdesign, Homepage, Website, KI-Integration, Automatisierung, Elior"
        ogImage="https://elior.studio/apps/Elior_logo.webp"
        ogImageWidth={1080}
        ogImageHeight={1080}
        ogImageAlt="Elior — App- & Webentwicklung"
        canonical="https://elior.studio/"
        structuredData={[generateLocalBusinessData(), generateWebSiteData(), breadcrumbData, faqData, appsListData]}
        language={i18n.resolvedLanguage?.startsWith('de') ? 'de-AT' : 'en'}
      />
      <main className="relative" style={{ background: 'var(--paper)' }}>
        <Hero />
        <Services />
        <AppShowcase />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default Home;
