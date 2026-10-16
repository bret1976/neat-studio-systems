"use client";
import { PlanAssembly } from "./PlanAssembly";
import { ArchitecturalDrawing } from "./ArchitecturalDrawing";
export function PlanModel({
  assembly = false,
  layer = 0,
  highlight = 0,
  proposal,
  applied = false,
}: {
  assembly?: boolean;
  layer?: number;
  highlight?: number;
  proposal?: "corridor" | "door";
  applied?: boolean;
}) {
  return (
    <div className={`plan-model ${assembly ? "assembling-plan" : ""}`}>
      <ArchitecturalDrawing plan />
      {assembly && <PlanAssembly />}
      <svg
        viewBox="0 0 1000 700"
        className="plan-structural"
        aria-hidden="true"
      >
        <path
          pathLength="1"
          d="M150 100H850V600H150ZM150 260h200V100M350 260v190H150M350 450v150M430 260H650V460H430ZM650 100v160h200M650 460v140M750 260v100h100"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeDasharray="1"
          style={{ strokeDashoffset: "calc(1 - var(--plan-progress, 1))" }}
        />
      </svg>
      <svg viewBox="0 0 1000 700" className="plan-overlay" aria-hidden="true">
        <g className={layer >= 1 ? "layer active" : "layer"}>
          <path
            d="M155 105h190v150H155zM655 105h190v150H655zM155 455h190v140H155z"
            fill="#c84932"
            opacity=".12"
          />
          <path d="M435 265h210v190H435z" fill="#a7b39b" opacity=".3" />
        </g>
        <g className={layer >= 2 ? "layer active" : "layer"}>
          <path
            d="M500 610V490H390V220H620V490H710"
            fill="none"
            stroke="#c84932"
            strokeWidth="3"
            strokeDasharray="8 7"
          />
          <path
            d="M490 590l10 15 10-15"
            fill="none"
            stroke="#c84932"
            strokeWidth="3"
          />
        </g>
        <g
          className={layer >= 3 ? "layer active" : "layer"}
          fill="none"
          stroke="#c84932"
          strokeWidth="2"
        >
          <rect
            x={[330, 640, 650, 745][highlight % 4]}
            y={[200, 200, 460, 270][highlight % 4]}
            width="100"
            height="90"
          />
          <circle
            cx={[350, 650, 665, 755][highlight % 4]}
            cy={[200, 200, 460, 270][highlight % 4]}
            r="10"
            fill="#c84932"
          />
          <path d="M360 200h140l35-55h160" />
          <rect x="535" y="100" width="190" height="45" fill="#f0eee7" />
          <text
            x="545"
            y="127"
            fontFamily="monospace"
            fontSize="12"
            stroke="none"
            fill="#c84932"
          >
            REVIEW REGION / 0{highlight + 1}
          </text>
        </g>
        <g
          className={layer >= 4 ? "layer active" : "layer"}
          fontFamily="monospace"
          fontSize="12"
          fill="#20211e"
        >
          <rect
            x="70"
            y="360"
            width="210"
            height="65"
            fill="#f0eee7"
            stroke="#20211e"
          />
          <text x="80" y="382">
            PROJECT CRITERIA / v0.1
          </text>
          <text x="80" y="405">
            HUMAN REVIEW REQUIRED
          </text>
        </g>
        {proposal && (
          <g
            className="proposal-geometry"
            data-proposal={proposal}
            data-applied={applied}
          >
            <path
              d={
                proposal === "corridor"
                  ? "M350 270V450"
                  : "M650 190a70 70 0 0 0 70 70v-70z"
              }
              fill="none"
              stroke="#ab3523"
              strokeWidth="4"
              strokeDasharray="8 5"
              opacity={applied ? 0 : 0.7}
            />
            <path
              d={
                proposal === "corridor"
                  ? "M390 270V450"
                  : "M650 190a70 70 0 0 1-70 70v-70z"
              }
              fill="none"
              stroke="#20211e"
              strokeWidth="5"
            />
            <path
              d="M350 330h40m-10-7 10 7-10 7"
              fill="none"
              stroke="#20211e"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
