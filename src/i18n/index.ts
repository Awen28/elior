import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import de from './locales/de';

export const LOCALE_STORAGE_KEY = 'elior:lang';

type AppModule = { default: Record<string, unknown> };

const toNamespaceMap = (modules: Record<string, AppModule>) =>
  Object.fromEntries(
    Object.entries(modules).map(([path, mod]) => [
      path.split('/').pop()!.replace(/\.ts$/, ''),
      mod.default,
    ]),
  );

const enApps = toNamespaceMap(
  import.meta.glob('./apps/en/*.ts', { eager: true }) as Record<string, AppModule>,
);
const deApps = toNamespaceMap(
  import.meta.glob('./apps/de/*.ts', { eager: true }) as Record<string, AppModule>,
);

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en, ...enApps },
      de: { translation: de, ...deApps },
    },
    ns: ['translation', ...Object.keys(enApps)],
    defaultNS: 'translation',
    lng: 'de',
    fallbackLng: 'en',
    supportedLngs: ['en', 'de'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
  });

export default i18n;
