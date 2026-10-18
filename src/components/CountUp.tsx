import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { EASE } from '../lib/motion';

/**
 * Zählt die führende Zahl einmal hoch, Suffix bleibt (z. B. "50k+").
 * Nicht-numerische Werte (z. B. "Tirol") werden unverändert gezeigt.
 */
const CountUp = ({ value, className }: { value: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^(\d+)(.*)$/);
  const isNumeric = match !== null;
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, isNumeric, target]);

  return (
    <span ref={ref} className={className}>
      {isNumeric ? `${n}${suffix}` : value}
    </span>
  );
};

export default CountUp;
