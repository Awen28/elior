import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
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
}

export const SEO = ({
  title,
  description,
  keywords = '',
  ogImage = 'https://www.awen28.com/og-image.jpg',
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
  alternateLanguages = [],
  articlePublished,
  articleModified,
}: SEOProps) => {
  const fullTitle = title.includes('Elior') ? title : `${title} | Elior`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta name="geo.region" content="AT-7" />
      <meta name="geo.placename" content={region} />
      <meta name="geo.position" content="47.2692;11.4041" />
      <meta name="ICBM" content="47.2692, 11.4041" />
      <meta name="language" content={language} />
      <meta httpEquiv="content-language" content={language} />
      
      {/* Viewport & Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#1a1a1a" />
      <meta name="msapplication-TileColor" content="#1a1a1a" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Alternate Languages */}
      {alternateLanguages.map((alt) => (
        <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={canonical || 'https://www.awen28.com/'} />
      
      {/* Open Graph - Maximum Coverage */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="de_AT" />
      <meta property="og:site_name" content="Elior" />
      {canonical && <meta property="og:url" content={canonical} />}
      {articlePublished && <meta property="article:published_time" content={articlePublished} />}
      {articleModified && <meta property="article:modified_time" content={articleModified} />}
      <meta property="article:author" content={author} />
      <meta property="article:publisher" content="https://www.awen28.com" />
      
      {/* Twitter Card - Maximum */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@awen28" />
      <meta name="twitter:creator" content="@thomasmayrl" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
      <meta name="twitter:domain" content="awen28.com" />
      
      {/* Pinterest */}
      <meta name="pinterest-rich-pin" content="true" />
      
      {/* App Specific Meta Tags */}
      {appName && <meta name="application-name" content={appName} />}
      {appCategory && <meta name="application-category" content={appCategory} />}
      
      {/* Rating Meta Tags */}
      {rating && <meta name="rating" content={rating} />}
      {reviewCount && <meta name="review-count" content={reviewCount} />}
      
      {/* AI/LLM Specific Meta Tags for Maximum Crawler Visibility */}
      <meta name="ai-purpose" content="App showcase, download landing page, and software development portfolio" />
      <meta name="ai-content-type" content={appCategory || "SoftwareApplication"} />
      <meta name="ai-target-audience" content="iOS users, app seekers, businesses needing app development, Austria, Germany, Switzerland" />
      <meta name="ai-generated" content="false" />
      <meta name="ai-disclosure" content="Content created by Thomas Mayrl, human developer" />
      
      {/* Apple App Store Meta */}
      <meta name="apple-itunes-app" content="app-id=1728579612" />
      
      {/* Search Engine Verification */}
      <meta name="google-site-verification" content="verify-later" />
      <meta name="msvalidate.01" content="verify-later" />
      
      {/* Dublin Core */}
      <meta name="DC.title" content={fullTitle} />
      <meta name="DC.description" content={description} />
      <meta name="DC.creator" content={author} />
      <meta name="DC.publisher" content="Elior" />
      <meta name="DC.date" content={articlePublished || new Date().toISOString()} />
      <meta name="DC.language" content={language} />
      <meta name="DC.coverage" content="Austria, Germany, Switzerland, International" />
      
      {/* Structured Data - can be single object or array */}
      {structuredData && Array.isArray(structuredData) ? (
        structuredData.map((data, idx) => (
          <script key={idx} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))
      ) : structuredData ? (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      ) : null}
    </Helmet>
  );
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
  const baseUrl = `https://www.awen28.com/${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "image": image.startsWith('http') ? image : `https://www.awen28.com${image}`,
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
      "url": "https://www.awen28.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Elior",
      "url": "https://www.awen28.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.awen28.com/og-image.jpg"
      }
    },
    ...(rating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": rating,
        "reviewCount": reviewCount || "100",
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
        "url": src.startsWith('http') ? src : `https://www.awen28.com${src}`,
        "caption": `${name} Screenshot`
      }))
    }),
    "inLanguage": ["de", "en"],
    "isPartOf": {
      "@type": "WebSite",
      "name": "Elior",
      "url": "https://www.awen28.com"
    }
  };
};

export const generateLocalBusinessData = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization", "ProfessionalService"],
  "@id": "https://www.awen28.com/#business",
  "name": "Elior Digital Studio",
  "alternateName": ["Elior App Development", "Elior Austria"],
  "description": "Premium iOS App Entwicklung und Webdesign aus Tirol, Österreich. Award-winning mobile apps by Thomas Mayrl. Elior bedeutet „Gott ist mein Licht\" – Built with meaning.",
  "url": "https://www.awen28.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.awen28.com/og-image.jpg",
    "width": 1200,
    "height": 630
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://www.awen28.com/og-image.jpg",
    "width": 1200,
    "height": 630
  },
  "founder": {
    "@type": "Person",
    "name": "Thomas Mayrl",
    "jobTitle": "Founder & Lead Developer",
    "url": "https://www.awen28.com",
    "sameAs": [
      "https://apps.apple.com/at/developer/thomas-mayrl/id1728579612"
    ]
  },
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AT",
    "addressRegion": "Tirol",
    "addressLocality": "Tirol"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.2692,
    "longitude": 11.4041
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
          "name": "App Store Optimization",
          "description": "Proven ASO strategies for #1 App Store rankings"
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
  "@id": "https://www.awen28.com/#website",
  "name": "Elior",
  "alternateName": "Elior Digital Studio",
  "url": "https://www.awen28.com",
  "description": "Premium iOS App Entwicklung und Webdesign aus Tirol, Österreich",
  "publisher": {
    "@type": "Organization",
    "name": "Elior",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.awen28.com/og-image.jpg"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.awen28.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
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
