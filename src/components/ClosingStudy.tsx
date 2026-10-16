"use client";
import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchitecturalPortal } from "./ArchitecturalPortal";
gsap.registerPlugin(ScrollTrigger);
export function ClosingStudy() {
  const root = useRef<HTMLDivElement>(null),
    mask = useRef<SVGRectElement>(null),
    manual = useRef(false);
  const [value, setValue] = useState(0);
  const id = useId().replaceAll(":", "");
  const update = (n: number) => {
    setValue(n);
    mask.current?.setAttribute("height", String(n * 14));
  };
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
      mask.current?.setAttribute("height", "1400");
      return;
    }
    const t = ScrollTrigger.create({
      trigger: root.current,
      start: "top 85%",
      end: "bottom 55%",
      onUpdate: (s) => {
        if (!manual.current) {
          const n = Math.round(s.progress * 100);
          setValue(n);
          mask.current?.setAttribute("height", String(s.progress * 1400));
        }
      },
    });
    return () => t.kill();
  }, []);
  return (
    <div className="closing-study" ref={root}>
      <svg
        viewBox="0 0 800 1000"
        role="img"
        aria-label="Original architectural portal develops from a drawing into a shaded study"
      >
        <defs>
          <filter id={`closing-edge-${id}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".024"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="90" />
          </filter>
          <mask id={`closing-mask-${id}`}>
            <rect
              ref={mask}
              className="closing-ink-front"
              x="-150"
              y="-150"
              width="1100"
              height="0"
              fill="white"
              filter={`url(#closing-edge-${id})`}
            />
          </mask>
        </defs>
        <g className="closing-outline">
          <ArchitecturalPortal idPrefix={`${id}-outline`} />
        </g>
        <g mask={`url(#closing-mask-${id})`}>
          <ArchitecturalPortal idPrefix={`${id}-shaded`} />
        </g>
      </svg>
      <details className="closing-controls">
        <summary className="mono">EXPLORE DRAWING → DESIGN +</summary>
        <input
          type="range"
          aria-label="Closing architectural drawing transformation"
          min="0"
          max="100"
          value={value}
          onFocus={() => {
            manual.current = true;
          }}
          onBlur={() => {
            manual.current = false;
          }}
          onChange={(e) => {
            manual.current = true;
            update(Number(e.target.value));
          }}
        />
      </details>
    </div>
  );
}
