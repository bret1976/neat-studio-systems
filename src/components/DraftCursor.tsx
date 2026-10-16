"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
export function DraftCursor() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (
      !matchMedia("(pointer:fine) and (prefers-reduced-motion:no-preference)")
        .matches
    )
      return;
    const el = canvas.current,
      ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    let x = -100,
      y = -100,
      tx = -100,
      ty = -100,
      pressed = false,
      hover = false,
      active = false;
    const trail: { x: number; y: number }[] = [];
    const size = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      el.width = innerWidth * dpr;
      el.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const frame = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      x += (tx - x) * 0.3;
      y += (ty - y) * 0.3;
      trail.unshift({ x, y });
      trail.splice(7);
      ctx.fillStyle = "var(--red)";
      trail.forEach((p, i) => {
        ctx.globalAlpha = (1 - i / 7) * 0.2;
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
      });
      ctx.globalAlpha = 1;
      const n = hover ? 12 : 8;
      if (pressed) {
        ctx.strokeStyle = "var(--red)";
        ctx.strokeRect(x - 8, y - 8, 16, 16);
        ctx.fillRect(x - 1, y - 1, 2, 2);
      } else ctx.fillRect(x - n / 2, y - n / 2, n, n);
      if (Math.abs(tx - x) + Math.abs(ty - y) < 0.1) {
        gsap.ticker.remove(frame);
        active = false;
      }
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      hover = !!(e.target as HTMLElement).closest("a,button,summary,input");
      if (!active) {
        active = true;
        gsap.ticker.add(frame);
      }
    };
    const down = () => {
      pressed = true;
    };
    const up = () => {
      pressed = false;
    };
    const leave = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      gsap.ticker.remove(frame);
      active = false;
      trail.length = 0;
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerdown", down);
    document.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("resize", size);
    return () => {
      gsap.ticker.remove(frame);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", size);
    };
  }, []);
  return <canvas ref={canvas} className="draft-cursor" aria-hidden="true" />;
}
