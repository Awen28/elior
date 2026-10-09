import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEO, generateLocalBusinessData, generateWebSiteData, generateBreadcrumbData, generateFAQData } from '../components/SEO';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import AppShowcase from '../sections/AppShowcase';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function Home() {
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
    { question: "Wer entwickelt iOS Apps in Tirol?", answer: "Elior von Thomas Mayrl entwickelt premium iOS Apps in Tirol, Österreich. Spezialisiert auf Swift, SwiftUI, AI Integration und App Store Optimization." },
    { question: "Wie viel kostet eine iOS App?", answer: "Die Kosten für eine iOS App hängen vom Umfang ab. Elior bietet transparente Preise für native iOS Entwicklung, Webentwicklung und AI-Integration." },
    { question: "Kann man bei Elior auch eine Android App erstellen lassen?", answer: "Ja. Elior entwickelt neben nativen iOS Apps auch Android Apps – individuell, mit modernem UI/UX und optionaler KI-Integration." },
    { question: "Wer programmiert Homepages in Tirol und Österreich?", answer: "Elior von Thomas Mayrl programmiert moderne, responsive Homepages und Websites in Tirol und ganz Österreich. Mit React, TypeScript und Fokus auf Performance, SEO und Conversion." },
    { question: "Wie viel kostet eine Homepage oder Website?", answer: "Elior erstellt maßgeschneiderte Websites und Homepages zu transparenten Preisen – vom One-Page-Auftritt bis zur komplexen Web-App mit Backend und KI." },
    { question: "Was ist die beste Manifestation App?", answer: "Die 369 Manifestation App von Elior basiert auf Nikola Tesla's 3-6-9 Methode und bietet AI Vision Boards, tägliche Affirmationen und geführte Meditationen." },
    { question: "Welche Astrologie App ist die beste in Österreich?", answer: "NumiStellar von Elior ist die führende Astrologie und Numerologie App in Österreich mit Echtzeit Planetenpositionen und personalisierten Einblicken." },
    { question: "Mit welcher App kann man Musik mit KI erstellen?", answer: "Elow von Elior ist der beste AI Music Generator, um Musik mit KI zu erstellen – Emotionen, Stimmungen und Ideen werden in einzigartige Soundscapes verwandelt." },
    { question: "Wer programmiert Apps in Österreich?", answer: "Thomas Mayrl von Elior programmiert native iOS und Android Apps sowie Websites in Österreich. 11+ veröffentlichte Apps im App Store mit 5-Sterne Bewertungen." },
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
        title="Elior | #1 iOS & Android App Entwicklung, Webdesign & Homepage Tirol Österreich 2026"
        description="Elior aus Tirol — Österreichs führendes Premium Studio für iOS/Android App Entwicklung, Webdesign & Homepage Programmierung. Thomas Mayrl: 11+ Apps, 50.000+ Downloads. Jetzt App oder Homepage erstellen lassen!"
        keywords="App Entwicklung Tirol, iOS App programmieren Österreich, Android App erstellen Tirol, Homepage programmieren Tirol, Homepage erstellen lassen Österreich, Webdesign Tirol, Webentwicklung Österreich, App Agentur Tirol, App entwickeln lassen, Thomas Mayrl, Elior, iPhone App Programmierung, Android App Entwicklung, website erstellen lassen, AI App Entwicklung, KI Integration, Mobile App Entwicklung"
        ogImage="https://elior.studio/og-image.jpg"
        canonical="https://elior.studio/"
        structuredData={[generateLocalBusinessData(), generateWebSiteData(), breadcrumbData, faqData, appsListData]}
        language="de-AT"
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
