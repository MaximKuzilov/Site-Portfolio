"use client";

import { useEffect, useRef } from "react";

interface GlitchOverlayProps {
  active: boolean;
}

export default function GlitchOverlay({ active }: GlitchOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const lastRedraw = useRef(0);
  const noiseCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canUseCanvasEffect = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches;

    // Phones use the lightweight CSS version below. Do not create image buffers
    // or animation loops for cards that are already revealed.
    if (!active || !canUseCanvasEffect) {
      canvas.style.opacity = "0";
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    // Tight overflow — just a few pixels poke beyond the card edges
    const pad = 12;

    // Low-res offscreen canvas for pixel noise (pixelation = authentic static)
    const noiseCanvas = document.createElement("canvas");
    noiseCanvasRef.current = noiseCanvas;

    const resizeCanvas = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = rect.width + pad * 2;
      const h = rect.height + pad * 2;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.style.left = `${-pad}px`;
      canvas.style.top = `${-pad}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // A deliberately coarse buffer preserves the look while cutting the
      // amount of random pixel data generated for each frame.
      noiseCanvas.width = Math.max(1, Math.floor(w / 4));
      noiseCanvas.height = Math.max(1, Math.floor(h / 4));
    };
    resizeCanvas();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(parent);

    function drawStaticFrame() {
      if (!canvas || !ctx || !noiseCanvasRef.current) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      const nc = noiseCanvasRef.current;
      const nCtx = nc.getContext("2d");
      if (!nCtx) return;

      const nw = nc.width;
      const nh = nc.height;

      // === 1. Dense pixel noise via ImageData (fast) ===
      const imageData = nCtx.createImageData(nw, nh);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const roll = Math.random();
        if (roll < 0.35) {
          // Dark noise grain
          const gray = Math.floor(Math.random() * 70);
          data[i] = gray;
          data[i + 1] = gray;
          data[i + 2] = gray;
          data[i + 3] = 90 + Math.floor(Math.random() * 140);
        } else if (roll < 0.42) {
          // Bright noise speck
          const gray = 140 + Math.floor(Math.random() * 116);
          data[i] = gray;
          data[i + 1] = gray;
          data[i + 2] = gray;
          data[i + 3] = 50 + Math.floor(Math.random() * 100);
        } else {
          // Transparent — let background show through
          data[i + 3] = 0;
        }
      }

      // Add horizontal streak artifacts directly into noise data
      const streakCount = 2 + Math.floor(Math.random() * 4);
      for (let s = 0; s < streakCount; s++) {
        const sy = Math.floor(Math.random() * nh);
        const bright = 60 + Math.floor(Math.random() * 140);
        const alpha = 120 + Math.floor(Math.random() * 136);
        const startX = Math.floor(Math.random() * nw * 0.3);
        const endX = startX + Math.floor(nw * 0.3 + Math.random() * nw * 0.5);
        for (let x = startX; x < Math.min(endX, nw); x++) {
          const idx = (sy * nw + x) * 4;
          data[idx] = bright;
          data[idx + 1] = bright;
          data[idx + 2] = bright;
          data[idx + 3] = alpha;
        }
      }

      nCtx.putImageData(imageData, 0, 0);

      // === 2. Draw noise scaled up (pixelated nearest-neighbor) ===
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(nc, 0, 0, w, h);
      ctx.imageSmoothingEnabled = true;

      // === 3. Glitch blocks — uniformly scattered ===
      const blockCount = 25 + Math.floor(Math.random() * 20);
      for (let i = 0; i < blockCount; i++) {
        const bx = Math.random() * w;
        const by = Math.random() * h;
        const bw = 4 + Math.random() * 50;
        const bh = 2 + Math.random() * 10;
        const gray = Math.floor(Math.random() * 220);
        ctx.globalAlpha = 0.12 + Math.random() * 0.4;
        ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
        ctx.fillRect(bx, by, bw, bh);
      }

      // === 4. Scan lines (subtle horizontal stripes) ===
      ctx.globalAlpha = 1;
      for (let y = 0; y < h; y += 3) {
        ctx.fillStyle = `rgba(0, 0, 0, ${0.02 + Math.random() * 0.05})`;
        ctx.fillRect(0, y, w, 1);
      }

      // === 5. Wide displacement bars ===
      const barCount = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < barCount; i++) {
        const by = pad + Math.random() * (h - pad * 2);
        const bh = 1 + Math.random() * 5;
        const gray = 80 + Math.floor(Math.random() * 120);
        ctx.globalAlpha = 0.08 + Math.random() * 0.2;
        ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
        ctx.fillRect(0, by, w, bh);
      }

      // === 6. Bright flash fragments ===
      const flashCount = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < flashCount; i++) {
        const fx = Math.random() * w;
        const fy = Math.random() * h;
        const fw = 8 + Math.random() * 50;
        const fh = 1 + Math.random() * 2;
        const br = 200 + Math.floor(Math.random() * 56);
        ctx.globalAlpha = 0.15 + Math.random() * 0.25;
        ctx.fillStyle = `rgb(${br}, ${br}, ${br})`;
        ctx.fillRect(fx, fy, fw, fh);
      }

      // === 7. Soft edge fade (destination-out erases edges smoothly) ===
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "destination-out";

      // Top
      const gT = ctx.createLinearGradient(0, 0, 0, pad + 4);
      gT.addColorStop(0, "rgba(0,0,0,1)");
      gT.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gT;
      ctx.fillRect(0, 0, w, pad + 4);

      // Bottom
      const gB = ctx.createLinearGradient(0, h, 0, h - pad - 4);
      gB.addColorStop(0, "rgba(0,0,0,1)");
      gB.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gB;
      ctx.fillRect(0, h - pad - 4, w, pad + 4);

      // Left
      const gL = ctx.createLinearGradient(0, 0, pad + 4, 0);
      gL.addColorStop(0, "rgba(0,0,0,1)");
      gL.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gL;
      ctx.fillRect(0, 0, pad + 4, h);

      // Right
      const gR = ctx.createLinearGradient(w, 0, w - pad - 4, 0);
      gR.addColorStop(0, "rgba(0,0,0,1)");
      gR.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gR;
      ctx.fillRect(w - pad - 4, 0, pad + 4, h);

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    }

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: "120px" }
    );
    intersectionObserver.observe(parent);

    canvas.style.opacity = "1";

    const animate = (time: number) => {
      // Redraw static every ~80ms for flickering effect
      if (isVisible && time - lastRedraw.current > 80) {
        lastRedraw.current = time;
        drawStaticFrame();
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [active]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="glitch-canvas absolute pointer-events-none"
        style={{ zIndex: 20 }}
      />
      <div
        aria-hidden="true"
        className={`glitch-mobile absolute pointer-events-none ${
          active ? "glitch-mobile--active" : ""
        }`}
      />
    </>
  );
}
