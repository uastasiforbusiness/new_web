"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 60;
const DURATION = 1000;
const SCALE = 0.75;

export function StoryReveal({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let startTime = 0;
    let viewW = 0;
    let viewH = 0;

    const frames: HTMLImageElement[] = [];
    const ready = new Array<boolean>(FRAME_COUNT).fill(false);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const n = String(i + 1).padStart(4, "0");
      img.src = `/images/loading-frames/frame_${n}.webp`;
      img.onload = () => {
        ready[i] = true;
      };
      frames.push(img);
    }

    const drawFrame = (img: HTMLImageElement, alpha: number) => {
      if (!img.naturalWidth || !viewW || !viewH) return;
      const scale = Math.max(viewW / img.naturalWidth, viewH / img.naturalHeight) * SCALE;
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (viewW - w) / 2;
      const y = (viewH - h) / 2;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, x, y, w, h);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      viewW = window.innerWidth;
      viewH = window.innerHeight;
      canvas.width = viewW * dpr;
      canvas.height = viewH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, viewW, viewH);

      if (reducedRef.current) {
        drawFrame(frames[FRAME_COUNT - 1], 1);
        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(render);
        return;
      }

      if (elapsed >= DURATION) {
        drawFrame(frames[FRAME_COUNT - 1], 1);
        ctx.globalAlpha = 1;
        cancelAnimationFrame(raf);
        return;
      }

      const pos = (elapsed / DURATION) * FRAME_COUNT;
      const idxA = Math.floor(pos) % FRAME_COUNT;
      const idxB = (idxA + 1) % FRAME_COUNT;
      const mix = pos - Math.floor(pos);

      if (ready[idxA]) drawFrame(frames[idxA], 1);
      if (ready[idxB]) drawFrame(frames[idxB], mix * 0.5);

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    const timer = setTimeout(() => {
      onComplete();
    }, reducedRef.current ? 300 : DURATION + 200);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", resize);
    };
  }, [onComplete]);

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full brightness-[0.45] grayscale"
        style={{ width: "100vw", height: "100vh" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.7) 100%),
            linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.6) 100%)
          `,
        }}
      />
      <div className="relative z-10 px-6 text-center">
        <h1 className="font-elegant text-[48px] leading-none font-light text-ivory md:text-[96px]">
          B LEADER
        </h1>
        <p className="reveal-sub mt-3 font-sans text-[10px] tracking-[0.45em] uppercase text-gold/80 md:text-[12px] md:tracking-[0.6em]">
          The Apex of Movement
        </p>
      </div>
      <style jsx>{`
        .font-elegant {
          font-family: "Cormorant Garamond", serif;
        }
        .font-sans {
          font-family: "Outfit", sans-serif;
        }
        .reveal-sub {
          opacity: 0;
          animation: fadeUp 0.8s ease 0.5s forwards;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 0.6;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
