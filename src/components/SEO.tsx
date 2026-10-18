import { useEffect, useMemo } from 'react';

const SITE_URL = 'https://elior.studio';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/apps/Elior_logo.webp`;

interface SEOProps {
  title: string;
  tabTitle?: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageAlt?: string;
  ogType?: string;
  canonical?: string;
  structuredData?: object | object[];
  author?: string;
  region?: string;
  appName?: string;
  appCategory?: string;
  rating?: string;
  reviewCount?: string;
  language?: string;
  alternateLanguages?: { hrefLang: string; href: string }[];
  articlePublished?: string;
  articleModified?: string;
  noindex?: boolean;
}

const MANAGED = 'data-elior-seo';
const EMPTY_ALTS: { hrefLang: string; href: string }[] = [];

const imageType = (url: string) =>
  url.endsWith('.webp') ? 'image/webp'
    : url.endsWith('.png') ? 'image/png'
      : url.endsWith('.svg') ? 'image/svg+xml'
        : 'image/jpeg';

function removeStatic(tag: 'meta' | 'link', attr: string, value: string) {
  document.head.querySelectorAll(tag).forEach((node) => {
    if (node.getAttribute(attr) === value && !node.hasAttribute(MANAGED)) node.remove();
  });
}

function addMeta(attrs: Record<string, string | undefined>, identify: 'name' | 'property') {
  const value = attrs[identify];
  if (value) removeStatic('meta', identify, value);
  const el = document.createElement('meta');
  for (const [k, v] of Object.entries(attrs)) if (v != null) el.setAttribute(k, v);
  el.setAttribute(MANAGED, '');
  document.head.appendChild(el);
}

function addLink(attrs: Record<string, string | undefined>, identify: string) {
  const value = attrs[identify];
  if (value) removeStatic('link', identify, value);
  const el = document.createElement('link');
  for (const [k, v] of Object.entries(attrs)) if (v != null) el.setAttribute(k, v);
  el.setAttribute(MANAGED, '');
  document.head.appendChild(el);
}

/**
 * Selbst-verwaltetes <head> (kein react-helmet-async): setzt Titel, Meta,
 * Canonical, hreflang, Open Graph, Twitter und strukturierte Daten pro Seite
 * deterministisch und räumt doppelte statische Tags aus index.html auf.
 */
export const SEO = ({
  title,
  tabTitle,
  description,
  keywords = '',
  ogImage,
  ogImageWidth = 1080,
  ogImageHeight = 1080,
  ogImageAlt,
  ogType = 'website',
  canonical,
  structuredData,
  author = 'Thomas Mayrl',
  region = 'Tirol, Österreich',
  appName,
  appCategory,
  rating,
  reviewCount,
  language = 'de-AT',
  alternateLanguages = EMPTY_ALTS,
  articlePublished,
  articleModified,
  noindex = false,
}: SEOProps) => {
  const fullTitle = title.includes('Elior') ? title : `${title} | Elior`;
  const docTitle = tabTitle ?? fullTitle;
  const image = ogImage ?? DEFAULT_OG_IMAGE;
  const imageAlt = ogImageAlt ?? fullTitle;
  const robots = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const structuredKey = useMemo(() => JSON.stringify(structuredData ?? null), [structuredData]);
  const altKey = useMemo(() => JSON.stringify(alternateLanguages), [alternateLanguages]);

  useEffect(() => {
    document.title = docTitle;
    document.documentElement.lang = language;

    document.head.querySelectorAll(`[${MANAGED}]`).forEach((node) => node.remove());

    // Basic
    addMeta({ name: 'description', content: description }, 'name');
    if (keywords) addMeta({ name: 'keywords', content: keywords }, 'name');
    addMeta({ name: 'robots', content: robots }, 'name');
    addMeta({ name: 'googlebot', content: robots }, 'name');
    addMeta({ name: 'bingbot', content: robots }, 'name');
    addMeta({ name: 'author', content: author }, 'name');
    addMeta({ name: 'language', content: language }, 'name');
    addMeta({ name: 'geo.region', content: 'AT-7' }, 'name');
    addMeta({ name: 'geo.placename', content: region }, 'name');
    addMeta({ name: 'geo.position', content: '47.259659;11.404102' }, 'name');
    addMeta({ name: 'ICBM', content: '47.259659, 11.404102' }, 'name');

    // Open Graph
    addMeta({ property: 'og:title', content: fullTitle }, 'property');
    addMeta({ property: 'og:description', content: description }, 'property');
    addMeta({ property: 'og:type', content: ogType }, 'property');
    addMeta({ property: 'og:image', content: image }, 'property');
    addMeta({ property: 'og:image:secure_url', content: image }, 'property');
    addMeta({ property: 'og:image:type', content: imageType(image) }, 'property');
    addMeta({ property: 'og:image:width', content: String(ogImageWidth) }, 'property');
    addMeta({ property: 'og:image:height', content: String(ogImageHeight) }, 'property');
    addMeta({ property: 'og:image:alt', content: imageAlt }, 'property');
    addMeta({ property: 'og:locale', content: language.toLowerCase().startsWith('de') ? 'de_AT' : 'en_US' }, 'property');
    addMeta({ property: 'og:site_name', content: 'Elior' }, 'property');
    if (canonical) addMeta({ property: 'og:url', content: canonical }, 'property');
    addMeta({ property: 'article:author', content: author }, 'property');
    addMeta({ property: 'article:publisher', content: SITE_URL }, 'property');
    if (articlePublished) addMeta({ property: 'article:published_time', content: articlePublished }, 'property');
    if (articleModified) addMeta({ property: 'article:modified_time', content: articleModified }, 'property');

    // Twitter
    addMeta({ name: 'twitter:card', content: 'summary_large_image' }, 'name');
    addMeta({ name: 'twitter:site', content: '@eliorstudio' }, 'name');
    addMeta({ name: 'twitter:creator', content: '@thomasmayrl' }, 'name');
    addMeta({ name: 'twitter:title', content: fullTitle }, 'name');
    addMeta({ name: 'twitter:description', content: description }, 'name');
    addMeta({ name: 'twitter:image', content: image }, 'name');
    addMeta({ name: 'twitter:image:alt', content: imageAlt }, 'name');
    addMeta({ name: 'twitter:domain', content: 'elior.studio' }, 'name');

    // App / rating / Pinterest
    if (appName) addMeta({ name: 'application-name', content: appName }, 'name');
    if (appCategory) addMeta({ name: 'application-category', content: appCategory }, 'name');
    if (rating) addMeta({ name: 'rating', content: rating }, 'name');
    if (reviewCount) addMeta({ name: 'review-count', content: reviewCount }, 'name');
    addMeta({ name: 'pinterest-rich-pin', content: 'true' }, 'name');

    // AI / LLM
    addMeta({ name: 'ai-purpose', content: 'App showcase, download landing page, and software development portfolio' }, 'name');
    addMeta({ name: 'ai-content-type', content: appCategory || 'SoftwareApplication' }, 'name');
    addMeta({ name: 'ai-target-audience', content: 'iOS users, app seekers, businesses needing app development, Austria, Germany, Switzerland' }, 'name');
    addMeta({ name: 'ai-generated', content: 'false' }, 'name');
    addMeta({ name: 'ai-disclosure', content: 'Content created by Thomas Mayrl, human developer' }, 'name');

    // Apple
    addMeta({ name: 'apple-itunes-app', content: 'app-id=1728579612' }, 'name');

    // Dublin Core
    addMeta({ name: 'DC.title', content: fullTitle }, 'name');
    addMeta({ name: 'DC.description', content: description }, 'name');
    addMeta({ name: 'DC.creator', content: author }, 'name');
    addMeta({ name: 'DC.publisher', content: 'Elior' }, 'name');
    addMeta({ name: 'DC.date', content: articlePublished || new Date().toISOString().split('T')[0] }, 'name');
    addMeta({ name: 'DC.language', content: language }, 'name');
    addMeta({ name: 'DC.coverage', content: 'Austria, Germany, Switzerland, International' }, 'name');

    // Canonical
    if (canonical) addLink({ rel: 'canonical', href: canonical }, 'rel');

    // hreflang alternates (+ x-default)
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove());
    const alternates = [
      ...(JSON.parse(altKey) as { hrefLang: string; href: string }[]),
      ...(canonical ? [{ hrefLang: 'x-default', href: canonical }] : []),
    ];
    alternates.forEach((alt) => {
      const el = document.createElement('link');
      el.setAttribute('rel', 'alternate');
      el.setAttribute('hreflang', alt.hrefLang);
      el.setAttribute('href', alt.href);
      el.setAttribute(MANAGED, '');
      document.head.appendChild(el);
    });

    // Structured data
    if (structuredKey !== 'null') {
      const parsed = JSON.parse(structuredKey) as object | object[];
      const items = Array.isArray(parsed) ? parsed : [parsed];
      items.forEach((data) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute(MANAGED, '');
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }

    return () => {
      document.head.querySelectorAll(`[${MANAGED}]`).forEach((node) => node.remove());
    };
  }, [
    docTitle,
    fullTitle,
    description,
    keywords,
    image,
    imageAlt,
    ogImageWidth,
    ogImageHeight,
    ogType,
    canonical,
    author,
    region,
    appName,
    appCategory,
    rating,
    reviewCount,
    language,
    articlePublished,
    articleModified,
    robots,
    structuredKey,
    altKey,
  ]);

  return null;
};

// Enhanced Structured Data Generators

export const generateAppStructuredData = (
  name: string,
  description: string,
  image: string,
  appStoreUrl: string,
  category: string,
  rating?: string,
  reviewCount?: string,
  features?: string[],
  screenshots?: string[],
  releaseDate?: string,
  size?: string,
  ageRating?: string
) => {
  const baseUrl = `https://elior.studio/${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "image": image.startsWith('http') ? image : `https://elior.studio${image}`,
    "url": baseUrl,
    "applicationCategory": category,
    "applicationSubCategory": "MobileApplication",
    "operatingSystem": "iOS",
    "softwareVersion": "1.0",
    "fileSize": size || "50MB",
    "contentRating": ageRating || "4+",
    "datePublished": releaseDate || "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    },
    "author": {
      "@type": "Person",
      "name": "Thomas Mayrl",
      "url": "https://elior.studio"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Elior",
      "url": "https://elior.studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://elior.studio/apps/Elior_logo.webp"
      }
    },
    ...(rating && reviewCount && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": rating,
        "reviewCount": reviewCount,
        "bestRating": "5",
        "worstRating": "1"
      }
    }),
    "downloadUrl": appStoreUrl,
    "installUrl": appStoreUrl,
    "featureList": features || [description],
    ...(screenshots && screenshots.length > 0 && {
      "screenshot": screenshots.map(src => ({
        "@type": "ImageObject",
        "url": src.startsWith('http') ? src : `https://elior.studio${src}`,
        "caption": `${name} Screenshot`
      }))
    }),
    "inLanguage": ["de", "en"],
    "isPartOf": {
      "@type": "WebSite",
      "name": "Elior",
      "url": "https://elior.studio"
    }
  };
};

export const generateLocalBusinessData = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization", "ProfessionalService"],
  "@id": "https://elior.studio/#business",
  "name": "Elior Digital Studio",
  "alternateName": ["Elior App Development", "Elior Austria"],
  "description": "Premium iOS App Entwicklung und Webdesign aus Tirol, Österreich. Award-winning mobile apps by Thomas Mayrl. Elior bedeutet „Gott ist mein Licht\" – Built with meaning.",
  "url": "https://elior.studio",
  "email": "info@elior.studio",
  "telephone": "+43-677-64059711",
  "logo": {
    "@type": "ImageObject",
    "url": "https://elior.studio/apps/Elior_logo.webp",
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
    "@type": "Person",
    "name": "Thomas Mayrl",
    "jobTitle": "Founder & Lead Developer",
    "url": "https://elior.studio",
    "sameAs": [
      "https://apps.apple.com/at/developer/thomas-mayrl/id1728579612"
    ]
  },
  "foundingDate": "2020",
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
      "@type": "Place",
      "name": "Tirol"
    },
    {
      "@type": "Place",
      "name": "Österreich"
    },
    {
      "@type": "Place",
      "name": "Austria"
    },
    {
      "@type": "Place",
      "name": "Deutschland"
    },
    {
      "@type": "Place",
      "name": "Schweiz"
    },
    {
      "@type": "Place",
      "name": "International"
    }
  ],
  "serviceType": [
    "iOS App Entwicklung",
    "Android App Entwicklung",
    "iPhone App Programmierung",
    "Swift Entwicklung",
    "Webentwicklung",
    "Webdesign Tirol",
    "Homepage Programmierung",
    "Homepage erstellen",
    "UI/UX Design",
    "AI Integration",
    "KI-Integration",
    "KI-Agentur",
    "Automatisierung",
    "Automatisierung Tirol",
    "App Store Optimization",
    "B2B2C Plattform Entwicklung"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Elior Digital Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "iOS App Development",
          "description": "Native Swift/SwiftUI app development for iPhone and iPad"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Android App Entwicklung",
          "description": "Native and cross-platform Android app development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Development & Homepage Programmierung",
          "description": "Modern responsive websites and web applications with React, TypeScript, Vite"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Integration",
          "description": "OpenAI, DALL-E, machine learning features for apps"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "KI-Integration & Automatisierung",
          "description": "KI-Integration und Workflow-/Prozess-Automatisierung für Unternehmen"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "App Store Optimization",
          "description": "Proven ASO strategies for top App Store rankings"
        }
      }
    ]
  },
  "priceRange": "$$",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Bank Transfer, Credit Card",
  "sameAs": [
    "https://apps.apple.com/at/developer/thomas-mayrl/id1728579612"
  ],
  "knowsAbout": [
    "iOS Development",
    "Swift Programming",
    "SwiftUI",
    "React",
    "TypeScript",
    "AI Integration",
    "App Store Optimization",
    "UI/UX Design",
    "Astrology Apps",
    "Manifestation Apps",
    "InsurTech",
    "Retro Games",
    "Music AI"
  ]
});

export const generateWebSiteData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://elior.studio/#website",
  "name": "Elior",
  "alternateName": "Elior Digital Studio",
  "url": "https://elior.studio",
  "description": "Premium iOS App Entwicklung und Webdesign aus Tirol, Österreich",
  "publisher": {
    "@type": "Organization",
    "name": "Elior",
    "logo": {
      "@type": "ImageObject",
      "url": "https://elior.studio/apps/Elior_logo.webp"
    }
  },
  "inLanguage": ["de", "en"]
});

export const generateBreadcrumbData = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const generateFAQData = (questions: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": questions.map(q => ({
    "@type": "Question",
    "name": q.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.answer
    }
  }))
});

export default SEO;
