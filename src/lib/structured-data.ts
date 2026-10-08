export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Elior - Thomas Mayrl',
  alternateName: 'Elior',
  description:
    'Professionelle iOS App-Entwicklung, Website-Erstellung, KI-Integrationen und Logo-Design in Tirol. Komplette Medienagentur für digitale Lösungen.',
  url: 'https://awen28.com',
  logo: 'https://awen28.com/logo.png',
  image: 'https://awen28.com/og-image.jpg',
  email: 'info@awen28.com',
  telephone: '+43-677-64059711',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Johannesfeldstrasse 44',
    addressLocality: 'Volders',
    addressRegion: 'Tirol',
    postalCode: '6111',
    addressCountry: 'AT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.259659,
    longitude: 11.404102,
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 47.259659,
      longitude: 11.404102,
    },
    geoRadius: '50000',
  },
  sameAs: ['https://www.linkedin.com/in/thomas-mayrl-719267bb'],
  founder: {
    '@type': 'Person',
    name: 'Thomas Mayrl',
    jobTitle: 'App Developer & Web Developer',
    email: 'info@awen28.com',
    telephone: '+43-677-64059711',
    sameAs: ['https://www.linkedin.com/in/thomas-mayrl-719267bb'],
  },
  priceRange: '$$',
  knowsAbout: [
    'iOS App Development',
    'Web Development',
    'Artificial Intelligence Integration',
    'Logo Design',
    'Mobile Applications',
    'SwiftUI',
    'React',
    'TypeScript',
    'AI Integration',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'iOS App Entwicklung',
          description:
            'Professionelle iOS App-Entwicklung mit Swift und SwiftUI',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Erstellung',
          description: 'Moderne, responsive Websites mit React und TypeScript',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'KI Integration',
          description:
            'Integration von künstlicher Intelligenz in Apps, Websites und Arbeitsabläufe',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Logo Design',
          description: 'Professionelles Logo-Design und Corporate Identity',
        },
      },
    ],
  },
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Thomas Mayrl',
  alternateName: 'Elior',
  jobTitle: 'iOS App Developer & Web Developer',
  description:
    'Independent app developer specializing in iOS applications, web development, and AI integrations.',
  url: 'https://awen28.com',
  email: 'info@awen28.com',
  telephone: '+43-677-64059711',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Johannesfeldstrasse 44',
    addressLocality: 'Volders',
    addressRegion: 'Tirol',
    postalCode: '6111',
    addressCountry: 'AT',
  },
  sameAs: ['https://www.linkedin.com/in/thomas-mayrl-719267bb'],
  knowsAbout: [
    'iOS Development',
    'SwiftUI',
    'Swift',
    'Web Development',
    'React',
    'TypeScript',
    'AI Integration',
    'Mobile App Development',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Elior',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Elior Portfolio',
  alternateName: 'Elior',
  url: 'https://awen28.com',
  description:
    'Portfolio of iOS apps and web development projects by Thomas Mayrl',
  inLanguage: 'de-AT',
  author: {
    '@type': 'Person',
    name: 'Thomas Mayrl',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://awen28.com/?s={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const softwareAppSchema = (app: {
  name: string;
  description: string;
  category: string;
  url?: string;
  icon?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: app.name,
  description: app.description,
  applicationCategory: app.category,
  operatingSystem: 'iOS',
  author: {
    '@type': 'Person',
    name: 'Thomas Mayrl',
    email: 'info@awen28.com',
  },
  creator: {
    '@type': 'Organization',
    name: 'Elior',
  },
  ...(app.url && { url: app.url }),
  ...(app.icon && { image: app.icon }),
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
});
