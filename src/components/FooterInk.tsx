"use client";
import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
export function FooterInk() {
  const id = useId().replaceAll(":", "");
  const circle = useRef<SVGCircleElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const current = useRef({ x: 720, y: 175, tx: 720, ty: 175 });
  const tick = useRef<(() => void) | null>(null);
  useEffect(() => {
    const c = circle.current;
    if (matchMedia("(pointer:coarse), (prefers-reduced-motion:reduce)").matches)
      c?.setAttribute("r", "2000");
    return () => {
      if (tick.current) gsap.ticker.remove(tick.current);
      if (c) gsap.killTweensOf(c);
    };
  }, []);
  return (
    <div
      className="footer-word ink-footer"
      onPointerEnter={() => {
        if (
          !matchMedia(
            "(pointer:fine) and (prefers-reduced-motion:no-preference)",
          ).matches
        )
          return;
        gsap.to(circle.current, { attr: { r: 165 }, duration: 0.4 });
        tick.current = () => {
          const p = current.current;
          p.x += (p.tx - p.x) * 0.18;
          p.y += (p.ty - p.y) * 0.18;
          circle.current?.setAttribute("cx", String(p.x));
          circle.current?.setAttribute("cy", String(p.y));
        };
        gsap.ticker.add(tick.current);
      }}
      onPointerLeave={() => {
        if (
          !matchMedia(
            "(pointer:fine) and (prefers-reduced-motion:no-preference)",
          ).matches
        )
          return;
        gsap.to(circle.current, { attr: { r: 0 }, duration: 0.55 });
        if (tick.current) gsap.ticker.remove(tick.current);
      }}
      onPointerMove={(e) => {
        if (!svg.current) return;
        const r = svg.current.getBoundingClientRect();
        current.current.tx = ((e.clientX - r.left) / r.width) * 1440;
        current.current.ty = ((e.clientY - r.top) / r.height) * 350;
      }}
    >
      <svg viewBox="0 0 1440 350" ref={svg} aria-hidden="true">
        <defs>
          <filter id={`footer-noise-${id}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".025"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="65" />
            <feGaussianBlur stdDeviation="1" />
          </filter>
          <mask id={`footer-mask-${id}`}>
            <circle
              ref={circle}
              cx="720"
              cy="175"
              r="0"
              fill="white"
              filter={`url(#footer-noise-${id})`}
            />
          </mask>
        </defs>
        <text
          x="8"
          y="310"
          textLength="1410"
          lengthAdjust="spacingAndGlyphs"
          fontFamily="Inter Tight,Arial,sans-serif"
          fontSize="390"
          fontWeight="600"
          fill="none"
          stroke="#85847b"
          strokeWidth=".8"
        >
          NEAT.
        </text>
        <text
          x="8"
          y="310"
          textLength="1410"
          lengthAdjust="spacingAndGlyphs"
          fontFamily="Inter Tight,Arial,sans-serif"
          fontSize="390"
          fontWeight="600"
          fill="#20211e"
          mask={`url(#footer-mask-${id})`}
        >
          NEAT.
        </text>
      </svg>
    </div>
  );
}
