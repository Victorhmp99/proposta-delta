"use client";

import { useEffect, useRef } from "react";

/* Prisma triangular 3D feito de partículas luminosas + hélice de dados
   girando em volta. Canvas 2D puro (sem three.js), pausa fora da tela e
   respeita prefers-reduced-motion. */

type P3 = { x: number; y: number; z: number; s: number; edge: boolean; h: number };

const VIOLET = [129, 44, 255];
const BLUE = [8, 123, 250];
const CYAN = [18, 216, 242];

function mix(a: number[], b: number[], t: number) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function gradientAt(t: number) {
  // roxo → azul → ciano (mesma direção da logo)
  return t < 0.5 ? mix(VIOLET, BLUE, t / 0.5) : mix(BLUE, CYAN, (t - 0.5) / 0.5);
}

function buildGeometry(): P3[] {
  const pts: P3[] = [];
  const R = 1;
  const depth = 0.32;
  // triângulo equilátero apontando para cima
  const tri = [0, 1, 2].map((i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 3;
    return { x: Math.cos(a) * R, y: Math.sin(a) * R + 0.12 };
  });

  const edgeSamples = 42;
  const addEdge = (ax: number, ay: number, az: number, bx: number, by: number, bz: number, n: number) => {
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      pts.push({ x: ax + (bx - ax) * t, y: ay + (by - ay) * t, z: az + (bz - az) * t, s: 1.25, edge: true, h: 0 });
    }
  };

  for (let i = 0; i < 3; i++) {
    const a = tri[i];
    const b = tri[(i + 1) % 3];
    addEdge(a.x, a.y, depth, b.x, b.y, depth, edgeSamples);
    addEdge(a.x, a.y, -depth, b.x, b.y, -depth, edgeSamples);
    addEdge(a.x, a.y, -depth, a.x, a.y, depth, 18);
  }

  // faces internas com poeira (dá volume)
  for (let i = 0; i < 110; i++) {
    let u = Math.random();
    let v = Math.random();
    if (u + v > 1) {
      u = 1 - u;
      v = 1 - v;
    }
    const x = tri[0].x + u * (tri[1].x - tri[0].x) + v * (tri[2].x - tri[0].x);
    const y = tri[0].y + u * (tri[1].y - tri[0].y) + v * (tri[2].y - tri[0].y);
    pts.push({ x, y, z: (Math.random() * 2 - 1) * depth, s: 0.6, edge: false, h: 0 });
  }

  // hélice de dados em volta (dupla, como uma fita de DNA)
  const turns = 2.2;
  const helixN = 110;
  for (let k = 0; k < 2; k++) {
    for (let i = 0; i < helixN; i++) {
      const t = i / helixN;
      const ang = t * Math.PI * 2 * turns + k * Math.PI;
      const r = 1.55;
      pts.push({
        x: Math.cos(ang) * r,
        y: -1.25 + t * 2.6,
        z: Math.sin(ang) * r,
        s: 0.75,
        edge: false,
        h: 1,
      });
    }
  }
  return pts;
}

export function DeltaCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pts = buildGeometry();
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const start = performance.now();

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    function onMove(e: PointerEvent) {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    let last = 0;
    function frame(now: number) {
      if (!ctx) return;
      if (!reduce && now - last < 33) {
        raf = requestAnimationFrame(frame);
        return;
      }
      last = now;
      const t = reduce ? 0 : (now - start) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const ry = t * 0.32 + mouse.x * 0.55;
      const rx = -0.18 + mouse.y * 0.25 + Math.sin(t * 0.5) * 0.06;
      const cy = Math.cos(ry);
      const sy = Math.sin(ry);
      const cx = Math.cos(rx);
      const sx = Math.sin(rx);
      const scale = Math.min(w, h) * 0.34;
      const ox = w / 2;
      const oy = h / 2;
      const breathe = 1 + Math.sin(t * 1.2) * 0.015;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        // hélice gira no sentido oposto, mais devagar
        let px = p.x;
        let pz = p.z;
        if (p.h) {
          const a = -t * 0.18;
          const c = Math.cos(a);
          const s = Math.sin(a);
          px = p.x * c - p.z * s;
          pz = p.x * s + p.z * c;
        }
        // rotação Y
        const x1 = px * cy - pz * sy;
        const z1 = px * sy + pz * cy;
        // rotação X
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;

        const persp = 3.2 / (3.2 + z2);
        const sxp = ox + x1 * scale * persp * breathe;
        const syp = oy + y2 * scale * persp * breathe;
        const depthA = Math.max(0.12, Math.min(1, (1.6 - z2) / 2.4));

        const g = gradientAt(Math.max(0, Math.min(1, (x1 + 1.3) / 2.6 + (y2 * -0.15))));
        let alpha: number;
        let size: number;
        if (p.edge) {
          // pulso de luz que corre pelas arestas
          const pulse = 0.55 + 0.45 * Math.sin(t * 2.4 - i * 0.05);
          alpha = depthA * (0.55 + 0.45 * pulse);
          size = p.s * persp * 1.35;
        } else if (p.h) {
          const twinkle = 0.5 + 0.5 * Math.sin(t * 3 + i * 1.7);
          alpha = depthA * 0.35 * twinkle;
          size = p.s * persp;
        } else {
          alpha = depthA * 0.28;
          size = p.s * persp;
        }

        ctx.fillStyle = `rgba(${g[0] | 0},${g[1] | 0},${g[2] | 0},${alpha})`;
        ctx.beginPath();
        ctx.arc(sxp, syp, size, 0, Math.PI * 2);
        ctx.fill();

      }

      if (visible && !reduce) raf = requestAnimationFrame(frame);
    }

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) frame(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
