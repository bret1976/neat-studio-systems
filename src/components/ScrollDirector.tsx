"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
export function ScrollDirector() {
  const path = usePathname();
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | undefined;
    let tick: ((t: number) => void) | undefined;
    if (!reduced) {
      lenis = new Lenis({ duration: 0.85, anchors: true, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t) => lenis?.raf(t * 1000);
      gsap.ticker.add(tick);
    }
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(".inspection-canvas .drawing", {
        opacity: 0,
        clipPath: "inset(100% 0 0 0)",
        duration: 1.4,
        ease: "power2.inOut",
      });
      gsap.from(".field-meta,.field-bottom", {
        opacity: 0,
        duration: 0.7,
        delay: 0.8,
      });
      gsap.from(".hero-caption h1", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          scrollTrigger: { trigger: el, start: "top 93%", once: true },
        }),
      );
    });
    const timer = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(timer);
      ctx.revert();
      lenis?.destroy();
      if (tick) gsap.ticker.remove(tick);
    };
  }, [path]);
  return null;
}
