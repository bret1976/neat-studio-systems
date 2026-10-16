"use client";
import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
export function FooterInk() {
  const id = useId().replaceAll(":", "");
  const circle = useRef<SVGCircleElement>(null);
  const wet = useRef<SVGCircleElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const current = useRef({ x: 720, y: 175, tx: 720, ty: 175 });
  const tick = useRef<(() => void) | null>(null);
  useEffect(() => {
    const c = circle.current,
      w = wet.current;
    if (matchMedia("(pointer:coarse), (prefers-reduced-motion:reduce)").matches)
      c?.setAttribute("r", "2000");
    return () => {
      if (tick.current) gsap.ticker.remove(tick.current);
      if (c) gsap.killTweensOf(c);
      if (w) gsap.killTweensOf(w);
    };
  }, []);
  return (
    <div
      className="footer-word ink-footer"
      onPointerEnter={(e) => {
        if (
          !matchMedia(
            "(pointer:fine) and (prefers-reduced-motion:no-preference)",
          ).matches
        )
          return;
        const bounds = svg.current?.getBoundingClientRect();
        if (bounds) {
          const p = current.current;
          p.x = p.tx = ((e.clientX - bounds.left) / bounds.width) * 1440;
          p.y = p.ty = ((e.clientY - bounds.top) / bounds.height) * 350;
          for (const mask of [circle.current, wet.current]) {
            mask?.setAttribute("cx", String(p.x));
            mask?.setAttribute("cy", String(p.y));
          }
        }
        gsap.to(wet.current, { attr: { r: 210 }, duration: 0.24 });
        gsap.to(circle.current, { attr: { r: 165 }, duration: 0.4 });
        tick.current = () => {
          const p = current.current;
          p.x += (p.tx - p.x) * 0.18;
          p.y += (p.ty - p.y) * 0.18;
          circle.current?.setAttribute("cx", String(p.x));
          circle.current?.setAttribute("cy", String(p.y));
          wet.current?.setAttribute("cx", String(p.x + (p.tx - p.x) * 0.55));
          wet.current?.setAttribute("cy", String(p.y + (p.ty - p.y) * 0.55));
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
        gsap.to(wet.current, { attr: { r: 0 }, duration: 0.65 });
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
          <mask id={`footer-wet-${id}`}>
            <circle
              ref={wet}
              cx="720"
              cy="175"
              r="0"
              fill="white"
              filter={`url(#footer-noise-${id})`}
            />
          </mask>
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
          fill="#8b8e82"
          opacity=".45"
          mask={`url(#footer-wet-${id})`}
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
