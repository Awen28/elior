import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { PortalContext, type PortalOpenArgs } from '../lib/portal';
import LightTunnel from './LightTunnel';

type Portal = {
  x: number;
  y: number;
  r: number;
  color: string;
  effect: 'sky' | 'tunnel';
  route: string;
  leaving: boolean;
};

const DIVE = 850;
const TUNNEL_DIVE = 1700;
const REVEAL = 900;
const EASE = [0.22, 1, 0.36, 1] as const;
const DIVE_EASE = [0.5, 0, 0.75, 0] as const;

/**
 * Wartet, bis die Zielseite tatsächlich sichtbar ist: oberhalb des Folds
 * liegende Bilder und die Webfonts. So bleibt das Portal vollständig
 * geschlossen, bis die neue Seite fertig geladen ist (kein Zurückblitzen
 * der alten Seite / des Karussells).
 */
function waitForPageReady(maxMs = 1600): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    };
    const cap = window.setTimeout(done, maxMs);

    const pending = Array.from(document.images).filter((img) => {
      if (img.complete) return false;
      try {
        return img.getBoundingClientRect().top < window.innerHeight * 1.5;
      } catch {
        return true;
      }
    });

    const imagesReady =
      pending.length === 0
        ? Promise.resolve()
        : new Promise<void>((res) => {
            let remaining = pending.length;
            const settle = () => {
              remaining -= 1;
              if (remaining <= 0) res();
            };
            pending.forEach((img) => {
              img.addEventListener('load', settle, { once: true });
              img.addEventListener('error', settle, { once: true });
            });
          });

    Promise.all([
      imagesReady,
      Promise.resolve(document.fonts?.ready).catch(() => undefined),
    ]).then(() => {
      window.clearTimeout(cap);
      done();
    });
  });
}

const SKY_URL = "url('/world/world.webp')";

const CLOUDS_FAR =
  'radial-gradient(40vmax 28vmax at 20% 30%, rgba(250,244,232,0.85) 0%, rgba(250,244,232,0) 68%), radial-gradient(48vmax 32vmax at 80% 22%, rgba(246,240,226,0.8) 0%, rgba(246,240,226,0) 70%), radial-gradient(54vmax 36vmax at 64% 80%, rgba(240,233,218,0.8) 0%, rgba(240,233,218,0) 72%), radial-gradient(42vmax 30vmax at 14% 84%, rgba(238,231,215,0.75) 0%, rgba(238,231,215,0) 70%)';

const CLOUDS_NEAR =
  'radial-gradient(46vmax 30vmax at 72% 24%, rgba(255,252,246,0.95) 0%, rgba(255,252,246,0) 62%), radial-gradient(52vmax 34vmax at 24% 74%, rgba(255,253,248,0.92) 0%, rgba(255,253,248,0) 64%), radial-gradient(38vmax 26vmax at 52% 52%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)';

const SHEEN =
  'conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.5) 34deg, rgba(255,255,255,0) 92deg, rgba(255,246,220,0.32) 168deg, rgba(255,255,255,0) 238deg, rgba(255,255,255,0.4) 308deg, rgba(255,255,255,0) 360deg)';

/**
 * Eine App-Vorschau ist ein Portal: Tippen lässt den Himmel von der
 * Berührungsstelle aus aufziehen — man fliegt durch Wolken — und die
 * neue Seite taucht auf, während das Portal wieder verfliegt.
 */
export function PortalTransition({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [portal, setPortal] = useState<Portal | null>(null);
  const busy = useRef(false);
  const revealTimer = useRef<number | null>(null);
  const watchdog = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (revealTimer.current) {
      window.clearTimeout(revealTimer.current);
      revealTimer.current = null;
    }
    if (watchdog.current) {
      window.clearTimeout(watchdog.current);
      watchdog.current = null;
    }
  }, []);

  // Das Portal schließt erst, wenn die Zielseite steht: leaving wird genau
  // dann gesetzt, wenn die neue Route gemountet und geladen ist.
  const finish = useCallback(() => {
    clearTimers();
    setPortal((p) => (p && !p.leaving ? { ...p, leaving: true } : p));
    revealTimer.current = window.setTimeout(() => {
      setPortal(null);
      busy.current = false;
      revealTimer.current = null;
    }, REVEAL);
  }, [clearTimers]);

  const open = useCallback(
    ({ route, x, y, color = '#C89B55', effect = 'sky' }: PortalOpenArgs) => {
      if (busy.current) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        navigate(route);
        return;
      }

      busy.current = true;
      const r = Math.hypot(window.innerWidth, window.innerHeight) * 1.2;
      const dive = effect === 'tunnel' ? TUNNEL_DIVE : DIVE;
      setPortal({ x, y, r, color, effect, route, leaving: false });

      window.setTimeout(() => navigate(route), dive);
      // Sicherheitsnetz, falls die Route nie übereinstimmt.
      watchdog.current = window.setTimeout(finish, dive + 5000);
    },
    [navigate, finish]
  );

  // Öffnet sich erst, nachdem die Zielroute tatsächlich gerendert wurde.
  useEffect(() => {
    if (!portal || portal.leaving) return;
    if (location.pathname !== portal.route) return;
    let cancelled = false;
    waitForPageReady().then(() => {
      if (!cancelled) finish();
    });
    return () => {
      cancelled = true;
    };
  }, [location.pathname, portal, finish]);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <PortalContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {portal && (
          <motion.div
            key="portal"
            aria-hidden
            className="fixed inset-0 z-[9990]"
            style={{ pointerEvents: portal.leaving ? 'none' : 'auto' }}
            initial={{ opacity: 1 }}
            animate={{ opacity: portal.leaving ? 0 : 1 }}
            transition={{ duration: REVEAL / 1000, ease: EASE }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: `circle(0px at ${portal.x}px ${portal.y}px)` }}
              animate={{ clipPath: `circle(${portal.r}px at ${portal.x}px ${portal.y}px)` }}
              transition={{ duration: DIVE / 1000 + 0.15, ease: [0.7, 0, 0.2, 1] }}
              style={{ willChange: 'clip-path' }}
            >
              {portal.effect === 'tunnel' ? (
                <div className="absolute inset-0" style={{ background: '#BBB1A4' }}>
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={
                      portal.leaving ? { opacity: 0, scale: 1.42 } : { opacity: 1, scale: 1 }
                    }
                    transition={
                      portal.leaving
                        ? { duration: REVEAL / 1000, ease: EASE }
                        : { duration: 0.6, ease: EASE }
                    }
                  >
                    <LightTunnel
                      cableColor="#bbb1a4"
                      pulseColor={portal.color}
                      cableCount={133}
                      pulseDensity={0.82}
                      flowDirection="outward"
                      mouseInteraction={false}
                      clickSurge={false}
                      tunnelColor="#bbb1a4"
                      tunnelOpacity={0.67}
                      speed={0.22}
                      pulseSpeed={2.7}
                      pulseLength={0.75}
                      pulseWidth={2.5}
                      thickness={1.19}
                      rimWidth={0.45}
                      sway={0.42}
                      bend={0}
                      glow={2.85}
                      size={1.35}
                      fadeNear={0.8}
                      brightness={2}
                      grain
                      mouseStrength={0.12}
                    />
                  </motion.div>
                </div>
              ) : (
                <>
              {/* Grundlicht */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0.95 }}
                animate={{ opacity: portal.leaving ? 0 : 0.95 }}
                transition={{ duration: portal.leaving ? REVEAL / 1000 : 0.3 }}
                style={{
                  background:
                    'radial-gradient(circle at 50% 46%, #FFFBF2 0%, #F4EAD8 30%, #D9CDB6 66%, #A99A80 100%)',
                }}
              />

              {/* Himmelsflug — der Blick taucht in die Wolken ein (Desktop) */}
              <motion.div
                className="absolute inset-0 hidden bg-cover bg-center lg:block"
                style={{ backgroundImage: SKY_URL, willChange: 'transform, filter, opacity' }}
                initial={{ scale: 1.02, filter: 'blur(4px) brightness(1.14) saturate(1.05)', opacity: 0.9 }}
                animate={
                  portal.leaving
                    ? { scale: 2.5, filter: 'blur(26px) brightness(1.28) saturate(1.05)', opacity: 0 }
                    : { scale: 1.5, filter: 'blur(10px) brightness(1.18) saturate(1.05)', opacity: 1 }
                }
                transition={
                  portal.leaving
                    ? { duration: REVEAL / 1000, ease: EASE }
                    : { duration: DIVE / 1000 + 0.15, ease: DIVE_EASE }
                }
              />

              {/* Wolkenschwaden — zwei Ebenen für Tiefe */}
              <motion.div
                className="absolute inset-[-20%]"
                style={{ background: CLOUDS_FAR, willChange: 'transform, opacity' }}
                initial={{ scale: 0.6, opacity: 0.7 }}
                animate={portal.leaving ? { scale: 2.1, opacity: 0 } : { scale: 1.15, opacity: 0.9 }}
                transition={
                  portal.leaving
                    ? { duration: REVEAL / 1000, ease: EASE }
                    : { duration: DIVE / 1000 + 0.15, ease: DIVE_EASE }
                }
              />
              <motion.div
                className="absolute inset-[-35%]"
                style={{ background: CLOUDS_NEAR, willChange: 'transform, opacity' }}
                initial={{ scale: 0.45, opacity: 0.85 }}
                animate={portal.leaving ? { scale: 3, opacity: 0 } : { scale: 1.35, opacity: 1 }}
                transition={
                  portal.leaving
                    ? { duration: REVEAL / 1000, ease: EASE }
                    : { duration: DIVE / 1000 + 0.15, ease: DIVE_EASE }
                }
              />

              {/* Lichtblitz an der Eintrittsstelle */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  left: portal.x,
                  top: portal.y,
                  width: '150vmax',
                  height: '150vmax',
                  x: '-50%',
                  y: '-50%',
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,248,232,0.5) 26%, rgba(255,248,232,0) 60%)',
                  willChange: 'transform, opacity',
                }}
                initial={{ scale: 0.05, opacity: 0 }}
                animate={{ scale: 1, opacity: portal.leaving ? 0 : 0.75 }}
                transition={{ duration: portal.leaving ? REVEAL / 1000 : 0.75, ease: EASE }}
              />

              {/* Umlaufender Schein */}
              <motion.div
                className="absolute inset-[-25%]"
                style={{ background: SHEEN, mixBlendMode: 'screen', opacity: 0.5 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
              />

              {/* Farbton der App */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 46%, ${portal.color}45 0%, transparent 62%)`,
                }}
              />
              <div className="grain absolute inset-0" />
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortalContext.Provider>
  );
}

export default PortalTransition;
