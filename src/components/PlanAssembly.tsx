import type { CSSProperties } from "react";
const pieces = [
  ["M150 100H350V260H150", -330, -210],
  ["M350 100H650", 0, -270],
  ["M650 100H850V260", 320, -200],
  ["M150 260V450H350V600", -300, 40],
  ["M430 260H650V460H430Z", 120, 120],
  ["M650 260H850V360H750V460H650", 330, 50],
  ["M150 450V600H430", -220, 260],
  ["M650 460V600H850V360", 260, 250],
] as const;
export function PlanAssembly() {
  return (
    <svg
      className="plan-assembly-walls"
      viewBox="0 0 1000 700"
      aria-hidden="true"
    >
      <g fill="none" strokeLinejoin="miter" strokeLinecap="square">
        {pieces.map(([d, x, y], i) => (
          <g
            key={i}
            className="assembly-piece"
            style={
              { "--piece-x": `${x}px`, "--piece-y": `${y}px` } as CSSProperties
            }
          >
            <path d={d} stroke="var(--ink)" strokeWidth="8" />
            <path
              className="wall-interior"
              d={d}
              stroke="var(--paper)"
              strokeWidth="6.4"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
