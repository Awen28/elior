import { useEffect, useRef, useState } from 'react';

const SRC = '/mesh/deformed-grid-mesh-olive.svg';
const BG = '#BBB1A4';

/**
 * Das Mesh als Wasser: Das SVG wird einmal gerastert, dann pro Frame
 * in Streifen mit Sinus-Versatz am Cursor verformt (Wellen).
 * Keine React-Renders in der Schleife — nur Canvas-Blits.
 * Ohne feinen Zeiger / mit reduced-motion: statisches Bild.
 */
export default function MeshWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [staticFallback] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !window.matchMedia('(pointer: fine)').matches)
  );

  useEffect(() => {
    if (staticFallback) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const off = document.createElement('canvas');
    const offCtx = off.getContext('2d');
    if (!offCtx) return;

    const img = new Image();
    let loaded = false;
    let raf = 0;
    let running = false;
    let W = 0;
    let H = 0;
    let t = Math.random() * 100;
    let last = performance.now();
    let energy = 0;
    const cursor = { x: 0, y: 0, tx: 0, ty: 0 };

    const paintCover = () => {
      if (!loaded) return;
      off.width = W;
      off.height = H;
      const iw = img.naturalWidth || 851;
      const ih = img.naturalHeight || 854;
      const s = Math.max(W / iw, H / ih);
      const dw = iw * s;
      const dh = ih * s;
      offCtx.clearRect(0, 0, W, H);
      offCtx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintCover();
      cursor.x = W / 2;
      cursor.y = H / 2;
      cursor.tx = W / 2;
      cursor.ty = H / 2;
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      cursor.tx = e.clientX - r.left;
      cursor.ty = e.clientY - r.top;
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;

      const px = cursor.x;
      const py = cursor.y;
      cursor.x += (cursor.tx - cursor.x) * 0.12;
      cursor.y += (cursor.ty - cursor.y) * 0.12;
      const speed = Math.hypot(cursor.x - px, cursor.y - py) / Math.max(dt, 1e-3);
      energy += (Math.min(1, speed / 900) - energy) * 0.08;

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      if (loaded) {
        const SH = 14;
        const sigma = 150;
        const drift = (cursor.x - W / 2) * 0.03;
        const amp = 2.5 + energy * 16;
        for (let y = 0; y < H; y += SH) {
          const yc = y + SH / 2;
          const d = yc - cursor.y;
          const fall = Math.exp(-(d * d) / (2 * sigma * sigma));
          const wave =
            Math.sin(d * 0.045 - t * 4.2) * amp * fall +
            Math.sin(yc * 0.014 + t * 0.9) * 2;
          ctx.drawImage(off, 0, y, W, SH, wave + drift, y, W, SH);
        }
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    img.onload = () => {
      loaded = true;
      paintCover();
    };
    img.src = SRC;

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    window.addEventListener('mousemove', onMove, { passive: true });
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, [staticFallback]);

  if (staticFallback) {
    return (
      <img
        src={SRC}
        alt=""
        aria-hidden
        draggable={false}
        className="block h-full w-full object-cover"
      />
    );
  }
  return <canvas ref={canvasRef} aria-hidden className="block h-full w-full" />;
}
