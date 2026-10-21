import type { ServerSeo } from './seoServer';
import { ORGANIZATION_SCHEMA, PERSON_SCHEMA } from './organizationSchema';

const escapeAttr = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export function renderSeoHead(seo: ServerSeo): string {
  const tags: string[] = [];
  const meta = (attrs: Record<string, string | undefined>) => {
    const rendered = Object.entries(attrs)
      .filter(([, value]) => value != null)
      .map(([key, value]) => `${key}="${escapeAttr(String(value))}"`)
      .join(' ');
    tags.push(`<meta ${rendered} />`);
  };

  tags.push(`<title>${escapeAttr(seo.docTitle)}</title>`);

  meta({ name: 'description', content: seo.description });
  if (seo.keywords) meta({ name: 'keywords', content: seo.keywords });
  meta({ name: 'robots', content: seo.robots });
  meta({ name: 'googlebot', content: seo.robots });
  meta({ name: 'bingbot', content: seo.robots });
  meta({ name: 'author', content: seo.author });
  meta({ name: 'language', content: seo.language });
  meta({ name: 'geo.region', content: 'AT-7' });
  meta({ name: 'geo.placename', content: seo.region });
  meta({ name: 'geo.position', content: '47.259659;11.404102' });
  meta({ name: 'ICBM', content: '47.259659, 11.404102' });

  meta({ property: 'og:title', content: seo.fullTitle });
  meta({ property: 'og:description', content: seo.description });
  meta({ property: 'og:type', content: seo.ogType });
  meta({ property: 'og:image', content: seo.image });
  meta({ property: 'og:image:secure_url', content: seo.image });
  meta({ property: 'og:image:type', content: seo.imageType });
  meta({ property: 'og:image:width', content: String(seo.ogImageWidth) });
  meta({ property: 'og:image:height', content: String(seo.ogImageHeight) });
  meta({ property: 'og:image:alt', content: seo.imageAlt });
  meta({ property: 'og:locale', content: seo.language.toLowerCase().startsWith('de') ? 'de_AT' : 'en_US' });
  meta({ property: 'og:site_name', content: 'Elior' });
  if (seo.canonical) meta({ property: 'og:url', content: seo.canonical });
  meta({ property: 'article:author', content: seo.author });
  meta({ property: 'article:publisher', content: 'https://elior.studio' });
  if (seo.articlePublished) meta({ property: 'article:published_time', content: seo.articlePublished });
  if (seo.articleModified) meta({ property: 'article:modified_time', content: seo.articleModified });

  meta({ name: 'twitter:card', content: 'summary_large_image' });
  meta({ name: 'twitter:site', content: '@eliorstudio' });
  meta({ name: 'twitter:creator', content: '@thomasmayrl' });
  meta({ name: 'twitter:title', content: seo.fullTitle });
  meta({ name: 'twitter:description', content: seo.description });
  meta({ name: 'twitter:image', content: seo.image });
  meta({ name: 'twitter:image:alt', content: seo.imageAlt });
  meta({ name: 'twitter:domain', content: 'elior.studio' });

  if (seo.appName) meta({ name: 'application-name', content: seo.appName });
  if (seo.appCategory) meta({ name: 'application-category', content: seo.appCategory });
  if (seo.rating) meta({ name: 'rating', content: seo.rating });
  if (seo.reviewCount) meta({ name: 'review-count', content: seo.reviewCount });
  meta({ name: 'pinterest-rich-pin', content: 'true' });

  meta({ name: 'ai-purpose', content: 'App showcase, download landing page, and software development portfolio' });
  meta({ name: 'ai-content-type', content: seo.appCategory || 'SoftwareApplication' });
  meta({ name: 'ai-target-audience', content: 'iOS users, app seekers, businesses needing app development, Austria, Germany, Switzerland' });
  meta({ name: 'ai-generated', content: 'false' });
  meta({ name: 'ai-disclosure', content: 'Content created by Elior' });

  meta({ name: 'apple-itunes-app', content: 'app-id=1728579612' });

  meta({ name: 'DC.title', content: seo.fullTitle });
  meta({ name: 'DC.description', content: seo.description });
  meta({ name: 'DC.creator', content: seo.author });
  meta({ name: 'DC.publisher', content: 'Elior' });
  meta({ name: 'DC.date', content: seo.articlePublished || new Date().toISOString().split('T')[0] });
  meta({ name: 'DC.language', content: seo.language });
  meta({ name: 'DC.coverage', content: 'Austria, Germany, Switzerland, International' });

  if (seo.canonical) {
    tags.push(`<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`);
  }

  const alternates = [
    ...seo.alternates,
    ...(seo.canonical ? [{ hrefLang: 'x-default', href: seo.canonical }] : []),
  ];
  for (const alt of alternates) {
    tags.push(
      `<link rel="alternate" hreflang="${escapeAttr(alt.hrefLang)}" href="${escapeAttr(alt.href)}" />`
    );
  }

  const items = seo.structuredData
    ? Array.isArray(seo.structuredData)
      ? seo.structuredData
      : [seo.structuredData]
    : [];

  const hasOrganization = items.some((item) => {
    const type = (item as Record<string, unknown>)['@type'];
    const types = (Array.isArray(type) ? type : [type]) as string[];
    return types.includes('Organization') || types.includes('ProfessionalService') || types.includes('LocalBusiness');
  });

  const schemaItems = hasOrganization ? items : [...items, ORGANIZATION_SCHEMA, PERSON_SCHEMA];
  for (const item of schemaItems) {
    const json = JSON.stringify(item).replace(/</g, '\\u003c');
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }

  return tags.join('\n    ');
}
