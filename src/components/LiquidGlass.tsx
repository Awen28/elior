import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform sampler2D uTex;
uniform vec2 uImg;
uniform vec2 uEl;
uniform float uTime;
uniform float uVel;
uniform vec2 uMouse;
uniform float uHover;
varying vec2 vUv;

vec2 cover(vec2 uv) {
  float s = max(uEl.x / uImg.x, uEl.y / uImg.y);
  vec2 size = uImg * s;
  vec2 off = (size - uEl) * 0.5;
  return (uv * uEl + off) / size;
}

void main() {
  vec2 uv = vUv;

  // ruhiger Grundatemzug
  uv.x += sin(uv.y * 16.0 + uTime * 1.3) * 0.0036;
  uv.y += cos(uv.x * 13.0 + uTime * 1.1) * 0.0036;

  // Welle, die mit dem Scrolltempo durch das Bild läuft
  float amp = 0.022 * uVel;
  uv.x += sin(uv.y * 20.0 - uTime * 2.4) * amp;
  uv.y += cos(uv.x * 17.0 + uTime * 2.0) * amp;

  // Lupe unter dem Zeiger
  vec2 d = (uv - uMouse) * vec2(uEl.x / uEl.y, 1.0);
  float lens = smoothstep(0.26, 0.0, length(d)) * uHover;
  uv += (uv - uMouse) * lens * 0.22;

  // chromatische Brechung
  float ab = 0.0035 * uVel + 0.004 * lens;
  float r = texture2D(uTex, cover(uv + vec2(ab, 0.0))).r;
  float g = texture2D(uTex, cover(uv)).g;
  float b = texture2D(uTex, cover(uv - vec2(ab, 0.0))).b;
  vec3 col = vec3(r, g, b);
  col += lens * 0.10;
  gl_FragColor = vec4(col, 1.0);
}
`;

const compile = (gl: WebGLRenderingContext, type: number, src: string) => {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
};

type Props = {
  src: string;
  alt: string;
  className?: string;
  radius?: string;
  active?: boolean;
  interactive?: boolean;
  eager?: boolean;
};

/**
 * Liquid Glass: ein WebGL-Shader über dem Bild. Er verformt den Screen mit dem
 * Scroll-Tempo, bricht das Licht in RGB auf und wölbt sich unter dem Cursor.
 * Ohne WebGL / bei reduced motion / inaktiv: schlichtes Bild — nichts bricht.
 */
const LiquidGlass = ({
  src,
  alt,
  className,
  radius = '1.5rem',
  active = true,
  interactive = false,
  eager = false,
}: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduce || !active) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    setReady(false);
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTex = gl.getUniformLocation(prog, 'uTex');
    const uImg = gl.getUniformLocation(prog, 'uImg');
    const uEl = gl.getUniformLocation(prog, 'uEl');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uVel = gl.getUniformLocation(prog, 'uVel');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uHover = gl.getUniformLocation(prog, 'uHover');

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.uniform1i(uTex, 0);

    let texW = 0;
    let texH = 0;
    let texReady = false;
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      texW = img.naturalWidth;
      texH = img.naturalHeight;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      texReady = true;
    };
    img.src = src;

    let W = 1;
    let H = 1;
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const mouse = { x: 0.5, y: 0.5 };
    let hoverTarget = 0;
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = 1 - (e.clientY - r.top) / r.height;
      hoverTarget = 1;
    };
    const onLeave = () => {
      hoverTarget = 0;
    };

    let raf = 0;
    let running = true;
    let last = performance.now();
    let vel = 0;
    let hover = 0;
    let lastScroll = window.scrollY;
    let lastCx = 0;
    let lastCy = 0;

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const sy = window.scrollY;
      const moved =
        Math.abs(sy - lastScroll) + Math.hypot(cx - lastCx, cy - lastCy);
      lastScroll = sy;
      lastCx = cx;
      lastCy = cy;
      const speed = Math.min(1, moved / Math.max(dt, 1e-3) / 2200);
      vel += (speed - vel) * (1 - Math.exp(-6 * dt));
      hover += (hoverTarget - hover) * (1 - Math.exp(-9 * dt));

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (texReady) {
        gl.uniform2f(uImg, texW, texH);
        gl.uniform2f(uEl, W, H);
        gl.uniform1f(uTime, now / 1000);
        gl.uniform1f(uVel, vel);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.uniform1f(uHover, hover);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      raf = requestAnimationFrame(frame);
    };

    const onLost = (e: Event) => {
      e.preventDefault();
      setReady(false);
    };

    resize();
    setReady(true);
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    if (interactive) {
      wrap.addEventListener('mousemove', onMove);
      wrap.addEventListener('mouseleave', onLeave);
    }
    canvas.addEventListener('webglcontextlost', onLost);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          last = performance.now();
          raf = requestAnimationFrame(frame);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      if (interactive) {
        wrap.removeEventListener('mousemove', onMove);
        wrap.removeEventListener('mouseleave', onLeave);
      }
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      const lose = gl.getExtension('WEBGL_lose_context');
      lose?.loseContext();
      setReady(false);
    };
  }, [src, reduce, active, interactive]);

  return (
    <div ref={wrapRef} className={className} style={{ borderRadius: radius }}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none"
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.5s ease',
          borderRadius: radius,
        }}
      />
    </div>
  );
};

export default LiquidGlass;
