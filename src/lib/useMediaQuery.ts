import { useEffect, useState } from 'react';

/**
 * Reagiert auf Media Queries (z. B. "(hover: hover) and (pointer: fine)").
 * SSR-safe: starts as false so the server and the first client render match,
 * then syncs with the real value after mount.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
