"use client";
import { ArchitecturalDrawing } from "./ArchitecturalDrawing";
import { useState } from "react";
const nodes = [
  [180, 90],
  [370, 70],
  [540, 160],
  [580, 340],
  [430, 440],
  [220, 420],
  [90, 290],
  [290, 230],
];
const labels = [
  "Geometry",
  "Spatial relationships",
  "Circulation",
  "Review criteria",
  "Human decisions",
  "Project standards",
  "Review history",
  "Project context",
];
export function StandardsNetwork() {
  const [selected, setSelected] = useState(5);
  return (
    <div className="standards-network">
      <ArchitecturalDrawing plan className="network-floorplate" />
      <svg
        viewBox="0 0 650 500"
        aria-label="Original project-context drawing connecting model geometry, review criteria and human decisions"
        role="img"
      >
        <path
          d="M180 90L370 70 540 160 580 340 430 440 220 420 90 290Z"
          fill="none"
          stroke="#20211e"
          strokeWidth="2"
        />
        <g stroke="#ab3523" strokeWidth="1" opacity=".35">
          {nodes.map(([x, y], i) => (
            <path key={i} d={`M290 230L${x} ${y}`} />
          ))}
          <path d="M180 90L430 440M370 70L220 420M90 290L540 160" />
        </g>
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <rect
              x={x - 5}
              y={y - 5}
              width="10"
              height="10"
              fill={selected === i ? "#20211e" : "#ab3523"}
            />
            <text
              x={x + 10}
              y={y - 7}
              fontSize="10"
              fontFamily="monospace"
              fill="#68685f"
            >
              0{i + 1}
            </text>
          </g>
        ))}
        <rect
          x="240"
          y="220"
          width="110"
          height="35"
          fill="#f0eee7"
          stroke="#20211e"
        />
        <text
          x="248"
          y="241"
          fontFamily="monospace"
          fontSize="10"
          fill="#20211e"
        >
          NORTH COURT
        </text>
      </svg>
      <div className="network-criteria mono">
        {labels.map((t, i) => (
          <button
            key={t}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="mono" role="status">
        CONNECTED CONTEXT / {labels[selected]} · ILLUSTRATIVE DEMO
      </p>
    </div>
  );
}
