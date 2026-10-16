import type { CSSProperties } from "react";
const pieces = [
  ["M280 50H420M470 50H720V200", -230, -160],
  ["M280 50V200H720", 0, -180],
  ["M280 200V360H420V440H280", -250, 0],
  ["M720 200V480H600V650", 250, 0],
  ["M280 440V650H430", -170, 160],
  ["M480 650H720V480", 180, 160],
  ["M420 200V310M420 360H600V200", 110, -90],
  ["M280 520H410V650", -170, 100],
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
