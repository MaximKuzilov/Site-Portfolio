"use client";
import { useEffect, useRef } from "react";

interface Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  shade: number; // gray value 0..255
  phase: number; // for ambient breathing offset
}

function createSphereParticles(
  cx: number,
  cy: number,
  maxRadius: number
): Particle[] {
  const particles: Particle[] = [];

  // --- Clustered particles for gooey blob merging ---
  const clusterCount = 65 + Math.floor(Math.random() * 10);

  for (let c = 0; c < clusterCount; c++) {
    // Uniform distribution within circle (sqrt trick)
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * maxRadius;
    const clCx = cx + Math.cos(angle) * r;
    const clCy = cy + Math.sin(angle) * r;

    const countInCluster = 5 + Math.floor(Math.random() * 5); // 5-9
    const clusterSpread = 14 + Math.random() * 12; // 14-26px

    for (let i = 0; i < countInCluster; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.random() * clusterSpread;
      const ox = clCx + Math.cos(a) * d;
      const oy = clCy + Math.sin(a) * d;

      // Larger near center, smaller near edges
      const distRatio = Math.sqrt(
        (ox - cx) * (ox - cx) + (oy - cy) * (oy - cy)
      ) / maxRadius;
      const radiusBase = distRatio < 0.4
        ? 4 + Math.random() * 5
        : 2.5 + Math.random() * 4;

      particles.push({
        originX: ox,
        originY: oy,
        x: ox,
        y: oy,
        vx: 0,
        vy: 0,
        radius: radiusBase,
        shade: 40 + Math.floor(Math.random() * 60), // 40-100 (subtle)
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  // --- Isolated scattered particles for texture ---
  for (let i = 0; i < 80; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * maxRadius;
    const ox = cx + Math.cos(angle) * r;
    const oy = cy + Math.sin(angle) * r;

    particles.push({
      originX: ox,
      originY: oy,
      x: ox,
      y: oy,
      vx: 0,
      vy: 0,
      radius: 1.5 + Math.random() * 3,
      shade: 30 + Math.floor(Math.random() * 50), // 30-80 (subtle)
      phase: Math.random() * Math.PI * 2,
    });
  }

  return particles;
}

export default function ParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const smoothMouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    // The effect is cursor-driven, so running it on coarse/touch pointers only
    // burns CPU/GPU and was the source of the mobile stutter. The old ref-based
    // check did not re-render after detecting touch, leaving the loop alive.
    const canUseCursorEffect = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches;
    if (!canUseCursorEffect) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // A higher backing-store resolution is visually indistinguishable after the
    // goo filter but significantly more expensive on high-DPI displays.
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Sphere centered on viewport
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const maxR = Math.max(window.innerWidth, window.innerHeight) * 0.7;
      particles.current = createSphereParticles(centerX, centerY, maxR);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      time += 0.016;

      // Smooth mouse lerp — viscous tracking
      const lerpFactor = 0.07;
      smoothMouse.current.x +=
        (mouse.current.x - smoothMouse.current.x) * lerpFactor;
      smoothMouse.current.y +=
        (mouse.current.y - smoothMouse.current.y) * lerpFactor;

      const mx = smoothMouse.current.x;
      const my = smoothMouse.current.y;

      const pts = particles.current;

      // Physics constants — tuned for thick viscous liquid
      const repelRadius = 160;
      const repelStrength = 8;
      const springStrength = 0.012; // soft spring = slow return
      const damping = 0.87;        // high damping = thick viscosity

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // Ambient breathing — subtle idle sway
        const ambientX = Math.sin(time * 0.3 + p.phase) * 3;
        const ambientY = Math.cos(time * 0.25 + p.phase * 1.3) * 3;

        // Spring force toward origin + ambient offset
        const targetX = p.originX + ambientX;
        const targetY = p.originY + ambientY;
        p.vx += (targetX - p.x) * springStrength;
        p.vy += (targetY - p.y) * springStrength;

        // Cursor repulsion with tangential flow component
        const cdx = p.x - mx;
        const cdy = p.y - my;
        const dist = Math.sqrt(cdx * cdx + cdy * cdy);
        if (dist < repelRadius && dist > 0.1) {
          const force =
            ((repelRadius - dist) / repelRadius) ** 2 * repelStrength;
          const nx = cdx / dist;
          const ny = cdy / dist;

          // Radial push (away from cursor)
          p.vx += nx * force * 0.6;
          p.vy += ny * force * 0.6;

          // Tangential push (liquid flowing around obstacle)
          p.vx += -ny * force * 0.4;
          p.vy += nx * force * 0.4;
        }

        // Viscous damping
        p.vx *= damping;
        p.vy *= damping;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle as solid circle
        const s = p.shade;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${s}, ${s}, ${s})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* SVG goo filter — creates metaball/liquid merge effect (GPU-accelerated) */}
      <svg
        style={{ position: "absolute", width: 0, height: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="goo-cursor">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="8"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
              result="goo"
            />
          </filter>
        </defs>
      </svg>
      <canvas
        ref={canvasRef}
        className="particle-cursor fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0, filter: "url(#goo-cursor)" }}
      />
    </>
  );
}
