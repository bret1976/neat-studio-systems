"use client";
import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function TowerStudy() {
  const root = useRef<HTMLDivElement>(null);
  const shade = useRef<SVGRectElement>(null);
  const color = useRef<SVGRectElement>(null);
  const id = useId().replaceAll(":", "");
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion:no-preference)", () => {
      const state = { progress: 0 };
      const paint = () => {
        const p = state.progress;
        root.current?.style.setProperty("--tower-reveal", String(p));
        shade.current?.setAttribute(
          "height",
          String(Math.max(0, Math.min(1, (p - 0.08) / 0.78)) * 1450),
        );
        color.current?.setAttribute(
          "height",
          String(Math.max(0, Math.min(1, (p - 0.15) / 0.5)) * 700),
        );
      };
      const tween = gsap.to(state, {
        progress: 1,
        ease: "none",
        onUpdate: paint,
        scrollTrigger: {
          trigger: root.current,
          start: "top 85%",
          end: "bottom 25%",
          scrub: 0.22,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    media.add("(prefers-reduced-motion:reduce)", () => {
      shade.current?.setAttribute("height", "1450");
      color.current?.setAttribute("height", "700");
    });
    return () => media.revert();
  }, []);
  return (
    <div className="tower-drawing tower-study ruled" ref={root}>
      <Image
        className="tower-image tower-outline"
        src="/drawings/tower-outline.svg"
        width={1000}
        height={1100}
        alt=""
        unoptimized
      />
      <svg
        className="tower-ink"
        viewBox="0 0 1000 1100"
        role="img"
        aria-label="Original tower line drawing gains charcoal shading and a vermilion sun through an irregular ink reveal"
      >
        <defs>
          <filter
            id={`tower-edge-${id}`}
            x="-25%"
            y="-25%"
            width="150%"
            height="150%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".016 .027"
              numOctaves="3"
              seed="14"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="110"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation=".65" />
          </filter>
          <mask
            id={`tower-mask-${id}`}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1000"
            height="1100"
          >
            <rect
              ref={shade}
              className="tower-ink-front"
              x="-150"
              y="-150"
              width="1300"
              height="0"
              fill="white"
              filter={`url(#tower-edge-${id})`}
            />
          </mask>
          <mask
            id={`tower-color-${id}`}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1000"
            height="1100"
          >
            <rect
              ref={color}
              className="tower-color-front"
              x="500"
              y="-150"
              width="600"
              height="0"
              fill="white"
              filter={`url(#tower-edge-${id})`}
            />
          </mask>
        </defs>
        <circle
          cx="750"
          cy="210"
          r="170"
          fill="var(--red)"
          mask={`url(#tower-color-${id})`}
        />
        <image
          className="tower-shaded"
          href="/drawings/tower.svg"
          width="1000"
          height="1100"
          mask={`url(#tower-mask-${id})`}
        />
      </svg>
      <span className="mono">
        NORTH COURT / DESIGN STUDY
        <br />
        PRECISION WITHOUT REPETITION.
      </span>
    </div>
  );
}
