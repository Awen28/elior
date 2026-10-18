import { useEffect, useState } from 'react';

/**
 * Reagiert auf Media Queries (z. B. "(hover: hover) and (pointer: fine)").
 * Liefert beim ersten Render bereits den echten Wert (kein SSR hier).
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
