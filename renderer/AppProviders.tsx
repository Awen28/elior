import { StrictMode, useEffect } from 'react';
import { SmoothScroll } from '../src/components/SmoothScroll';
import { CustomCursor } from '../src/components/CustomCursor';
import { ScrollRestoration } from '../src/components/ScrollRestoration';
import { PortalTransition } from '../src/components/PortalTransition';
import i18n, { LOCALE_STORAGE_KEY } from '../src/i18n';
import '../src/index.css';
import App from '../src/App';

function LanguageRestore() {
  useEffect(() => {
    let timer: number | undefined;
    let cancelled = false;

    const apply = () => {
      if (cancelled) return;
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      } catch {
        /* ignore unavailable storage */
      }
      if (!stored) return;
      const next = stored.toLowerCase().startsWith('de') ? 'de' : 'en';
      if (i18n.language !== next) void i18n.changeLanguage(next);
    };

    const start = () => {
      timer = window.setTimeout(apply, 250);
    };

    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
      window.removeEventListener('load', start);
    };
  }, []);

  return null;
}

export function AppProviders() {
  return (
    <StrictMode>
      <LanguageRestore />
      <SmoothScroll>
        <PortalTransition>
          <CustomCursor />
          <ScrollRestoration />
          <App />
        </PortalTransition>
      </SmoothScroll>
    </StrictMode>
  );
}
