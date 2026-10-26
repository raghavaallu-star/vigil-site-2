"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Trace = { color: string; y: number; amp: number; freq: number; speed: number; width: number; spiky?: boolean; phase: number };

const TRACES: Trace[] = [
  { color: "rgba(20,184,166,0.55)", y: 0.22, amp: 10, freq: 0.012, speed: 0.6, width: 1.2, phase: 0 },
  { color: "rgba(20,184,166,0.32)", y: 0.38, amp: 14, freq: 0.008, speed: 0.4, width: 1, phase: 2 },
  { color: "rgba(217,113,26,0.75)", y: 0.56, amp: 12, freq: 0.01, speed: 0.75, width: 1.6, spiky: true, phase: 4 },
  { color: "rgba(58,70,86,0.18)", y: 0.72, amp: 8, freq: 0.016, speed: 0.5, width: 1, phase: 1 },
  { color: "rgba(20,184,166,0.28)", y: 0.86, amp: 9, freq: 0.011, speed: 0.35, width: 1, phase: 3 },
];

/**
 * Live-looking time-series traces with a sweeping scan line: the
 * "always watching" motif. Pauses offscreen and renders a single static
 * frame when the user prefers reduced motion.
 */
export function LiveTraces({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const noise = (x: number, p: number) =>
      Math.sin(x * 0.9 + p) * 0.5 + Math.sin(x * 2.3 + p * 1.7) * 0.3 + Math.sin(x * 5.1 + p * 0.4) * 0.2;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const scanX = ((t * 0.9) % (w + 200)) - 100;

      for (const tr of TRACES) {
        ctx.beginPath();
        ctx.strokeStyle = tr.color;
        ctx.lineWidth = tr.width;
        for (let x = 0; x <= w; x += 3) {
          const k = (x + t * tr.speed) * tr.freq;
          let y = tr.y * h + noise(k * 6, tr.phase) * tr.amp;
          if (tr.spiky) {
            // An excursion that drifts upward, like a developing anomaly.
            const local = ((x + t * tr.speed) % 900) / 900;
            if (local > 0.62 && local < 0.8) y -= Math.sin(((local - 0.62) / 0.18) * Math.PI) * 34;
          }
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Scan line
      const grad = ctx.createLinearGradient(scanX - 80, 0, scanX, 0);
      grad.addColorStop(0, "rgba(242,140,40,0)");
      grad.addColorStop(1, "rgba(242,140,40,0.12)");
      ctx.fillStyle = grad;
      ctx.fillRect(scanX - 80, 0, 80, h);
      ctx.fillStyle = "rgba(217,113,26,0.5)";
      ctx.fillRect(scanX, 0, 1, h);
    };

    const loop = () => {
      if (visible) {
        t += 1;
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    // Paint one frame now; start the loop once the browser is idle so it stays off the critical path.
    t = 420;
    draw();
    let idle = 0;
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    if (!reduce) idle = ric(() => (raf = requestAnimationFrame(loop)));

    return () => {
      window.cancelIdleCallback?.(idle);
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={cn("pointer-events-none h-full w-full", className)} />;
}
