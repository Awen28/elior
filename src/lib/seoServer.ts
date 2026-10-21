export interface ServerSeo {
  docTitle: string;
  fullTitle: string;
  description: string;
  keywords?: string;
  image: string;
  imageAlt: string;
  imageType: string;
  ogImageWidth: number;
  ogImageHeight: number;
  ogType: string;
  canonical?: string;
  author: string;
  region: string;
  appName?: string;
  appCategory?: string;
  rating?: string;
  reviewCount?: string;
  language: string;
  alternates: { hrefLang: string; href: string }[];
  structuredData?: object | object[];
  articlePublished?: string;
  articleModified?: string;
  robots: string;
}

let currentSeo: ServerSeo | null = null;

export function setServerSeo(seo: ServerSeo) {
  currentSeo = seo;
}

export function resetServerSeo() {
  currentSeo = null;
}

export function takeServerSeo() {
  const seo = currentSeo;
  currentSeo = null;
  return seo;
}
