// Static brand entity schema used on pages that don't define their own Organization.
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": [
    "Organization",
    "ProfessionalService"
  ],
  "@id": "https://elior.studio/#organization",
  "name": "Elior",
  "alternateName": [
    "Elior Digital Studio",
    "Elior App Development"
  ],
  "description": "Digital Studio aus Österreich: iOS/Android App Entwicklung, Webdesign & Homepage Programmierung, KI-Integration und Automatisierung. Gegründet von Thomas Mayrl.",
  "url": "https://elior.studio/",
  "email": "info@elior.studio",
  "telephone": "+43-677-64059711",
  "logo": {
    "@type": "ImageObject",
    "url": "https://elior.studio/logos/elior-star.webp",
    "width": 1080,
    "height": 1080
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://elior.studio/apps/Elior_logo.webp",
    "width": 1080,
    "height": 1080
  },
  "founder": {
    "@id": "https://elior.studio/#person"
  },
  "foundingDate": "2020",
  "numberOfEmployees": "1-10",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Johannesfeldstrasse 44",
    "addressLocality": "Volders",
    "addressRegion": "Tirol",
    "postalCode": "6111",
    "addressCountry": "AT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.259659,
    "longitude": 11.404102
  },
  "areaServed": [
    {
      "@type": "AdministrativeArea",
      "name": "Tirol"
    },
    {
      "@type": "Country",
      "name": "Austria"
    },
    {
      "@type": "Country",
      "name": "Germany"
    },
    {
      "@type": "Country",
      "name": "Switzerland"
    }
  ],
  "serviceType": [
    "iOS App Entwicklung",
    "Android App Entwicklung",
    "iPhone App Programmierung",
    "Swift Entwicklung",
    "Webentwicklung",
    "Webdesign",
    "Homepage Programmierung",
    "UI/UX Design",
    "KI-Integration",
    "Automatisierung",
    "App Store Optimization"
  ],
  "knowsAbout": [
    "iOS Development",
    "Swift",
    "SwiftUI",
    "Android",
    "React",
    "TypeScript",
    "Webdesign",
    "Homepage Erstellung",
    "AI Integration",
    "Automation",
    "App Store Optimization",
    "UI/UX Design"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Elior Leistungen",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "App Entwicklung iOS & Android",
          "description": "Native iOS- (Swift/SwiftUI) und Android-Apps inkl. App Store Optimization.",
          "serviceType": "App Development",
          "areaServed": [
            {
              "@type": "Country",
              "name": "Austria"
            }
          ]
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Homepage & Webdesign",
          "description": "Individuelle, SEO-optimierte Websites und Homepages mit React und TypeScript.",
          "serviceType": "Webdesign",
          "areaServed": [
            {
              "@type": "AdministrativeArea",
              "name": "Tirol"
            }
          ]
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "KI-Integration & Automatisierung",
          "description": "KI-Integration (LLMs, Computer Vision) und Workflow-Automatisierung für Unternehmen.",
          "serviceType": "AI Automation"
        }
      }
    ]
  },
  "priceRange": "$$",
  "currenciesAccepted": "EUR",
  "sameAs": [
    "https://apps.apple.com/at/developer/thomas-mayrl/id1728579612",
    "https://www.linkedin.com/in/thomas-mayrl-719267bb"
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "369 Manifestation",
        "applicationCategory": "LifestyleApplication"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "NumiStellar",
        "applicationCategory": "LifestyleApplication"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "kiBook",
        "applicationCategory": "EducationApplication"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "Elow",
        "applicationCategory": "MultimediaApplication"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "Orbit",
        "applicationCategory": "GameApplication"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "ABWUN",
        "applicationCategory": "LifestyleApplication"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "StradaHub",
        "applicationCategory": "NavigationApplication"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "Suremate",
        "applicationCategory": "FinanceApplication"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "Suremate Pro",
        "applicationCategory": "BusinessApplication"
      }
    }
  ]
} as const;

export const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://elior.studio/#person",
  "name": "Thomas Mayrl",
  "jobTitle": "Founder & Owner",
  "url": "https://elior.studio/",
  "email": "info@elior.studio",
  "worksFor": {
    "@id": "https://elior.studio/#organization"
  },
  "knowsAbout": [
    "Swift",
    "SwiftUI",
    "iOS",
    "Android",
    "React",
    "TypeScript",
    "AI Integration",
    "Automation"
  ],
  "sameAs": [
    "https://www.linkedin.com/in/thomas-mayrl-719267bb"
  ]
} as const;
