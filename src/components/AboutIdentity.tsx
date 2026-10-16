"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
const start = [
  [200, 520],
  [200, 180],
  [420, 180],
  [420, 300],
  [600, 300],
  [600, 180],
  [780, 180],
  [780, 520],
  [600, 520],
  [600, 400],
  [420, 400],
  [420, 520],
];
const end = [
  [280, 520],
  [280, 180],
  [400, 180],
  [600, 410],
  [600, 180],
  [720, 180],
  [720, 520],
  [600, 520],
  [400, 290],
  [400, 520],
  [340, 520],
  [280, 520],
];
export function AboutIdentity() {
  const root = useRef<HTMLDivElement>(null),
    path = useRef<SVGPathElement>(null);
  const [value, setValue] = useState(0);
  function update(p: number) {
    path.current?.setAttribute(
      "d",
      start
        .map(
          ([x, y], i) =>
            `${i ? "L" : "M"}${x + (end[i][0] - x) * p} ${y + (end[i][1] - y) * p}`,
        )
        .join("") + "Z",
    );
    path.current?.setAttribute("fill", `rgba(32,33,30,${p * 0.96})`);
    root.current?.style.setProperty("--identity-progress", String(p));
    setValue(Math.round(p * 100));
  }
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion:no-preference)", () => {
      const t = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => update(self.progress),
      });
      return () => t.kill();
    });
    return () => media.revert();
  }, []);
  return (
    <div className="about-identity" ref={root}>
      <div className="identity-sticky ruled">
        <div className="section-label">
          <span>FROM THE DRAWING / TO THE IDENTITY</span>
          <span>NEAT / ORIGINAL GEOMETRY</span>
        </div>
        <svg
          viewBox="0 0 1000 700"
          role="img"
          aria-label="Original floor-plan contours become the geometric NEAT mark"
        >
          <g
            className="identity-grid"
            stroke="#c9c7bd"
            fill="none"
            strokeWidth="1"
          >
            <path
              d="M100 180H900M100 350H900M100 520H900M200 80V620M420 80V620M600 80V620M780 80V620"
              strokeDasharray="8 6"
            />
            <path d="M200 180H780V520H200ZM200 350H420V520M600 350H780" />
            <rect
              x="580"
              y="330"
              width="60"
              height="60"
              fill="#ab352322"
              stroke="var(--red)"
            />
          </g>
          <path
            ref={path}
            d={
              start.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("") +
              "Z"
            }
            fill="none"
            stroke="#20211e"
            strokeWidth="5"
          />
        </svg>
        <div className="identity-controls mono">
          <span>INTELLIGENCE INSIDE THE DRAWING.</span>
          <label>
            EXPLORE IDENTITY
            <input
              type="range"
              aria-label="Plan to NEAT identity"
              min="0"
              max="100"
              value={value}
              onChange={(e) => update(Number(e.target.value) / 100)}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
