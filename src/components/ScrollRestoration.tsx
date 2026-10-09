import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const posKey = (path: string) => `elior:scrollpos:${path}`;

export function ScrollRestoration() {
  const location = useLocation();
  const savedPath = useRef<string>(location.pathname);

  useEffect(() => {
    const from = savedPath.current;
    const to = location.pathname;
    savedPath.current = to;

    // Memorize the scroll position of the page we're leaving
    sessionStorage.setItem(posKey(from), String(window.scrollY));

    // Restore position when coming back (only the home page for now)
    const saved = sessionStorage.getItem(posKey(to));
    if (to === '/' && saved !== null) {
      const y = parseInt(saved, 10);
      if (Number.isFinite(y) && y > 0) {
        const restore = () => {
          if (window.__lenis) {
            window.__lenis.scrollTo(y, { immediate: true });
          } else {
            window.scrollTo(0, y);
          }
        };
        const timers = [setTimeout(restore, 60), setTimeout(restore, 250)];
        return () => timers.forEach(clearTimeout);
      }
    }
  }, [location.pathname]);

  return null;
}

export default ScrollRestoration;