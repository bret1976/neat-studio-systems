"use client";
import { useState } from "react";
const findings = [
  [
    "CIRCULATION",
    "Compare circulation against project review criteria.",
    "Check clear widths and keep the observation connected to the model.",
  ],
  [
    "DOOR CLEARANCE",
    "Review the adjacent door swing.",
    "Compare the proposed direction before recording a designer decision.",
  ],
  [
    "STAIR GEOMETRY",
    "Inspect the stair geometry.",
    "Review the drawing and confirm the project requirements with your team.",
  ],
];
export function ContextNarrative({ layer }: { layer: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <>
      <div className="context-clock" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="94" fill="var(--ink)" />
          {Array.from({ length: 60 }, (_, i) => (
            <path
              key={i}
              d={`M100 ${i % 5 === 0 ? 13 : 18}V24`}
              transform={`rotate(${i * 6} 100 100)`}
              stroke="var(--paper)"
              strokeWidth={i % 5 === 0 ? 2 : 1}
            />
          ))}
          <path
            className="clock-hour"
            d="M100 100V55"
            stroke="var(--paper)"
            strokeWidth="4"
          />
          <path
            className="clock-minute"
            d="M100 100V26"
            stroke="var(--paper)"
            strokeWidth="2"
          />
          <circle cx="100" cy="100" r="4" fill="var(--red)" />
        </svg>
      </div>
      <aside
        className="context-introduction"
        data-stage={layer}
        aria-label="Drawing sequence introduction"
      >
        <span className="mono">INTELLIGENCE WITH CONTEXT</span>
        <div className="context-intro-states">
          <p className="context-intro-a">
            A wall is connected to a room. A room is connected to an occupancy.
          </p>
          <p className="context-intro-b">
            An occupancy influences circulation, accessibility, life safety, and
            technical requirements.
          </p>
          <p className="context-intro-c">
            NEAT is envisioned as an intelligence layer capable of combining
            model geometry, project context, review criteria, and team
            preferences into a more connected workflow.
          </p>
        </div>
        <small className="mono">
          {layer >= 3 ? "[SELECT AN OBSERVATION]" : "[SCROLL TO CONTINUE]"}
        </small>
      </aside>
      <div
        className="context-findings"
        style={{ visibility: layer >= 3 ? "visible" : "hidden" }}
        data-selected={selected ?? "none"}
      >
        {findings.map(([title, description, action], i) => (
          <div
            key={title}
            className={`context-finding context-finding-${i} ${selected === i ? "selected" : ""}`}
          >
            <button
              aria-label={`Review plan ${title.toLowerCase()}`}
              aria-expanded={selected === i}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              0{i + 1}
              <span>+</span>
            </button>
            {selected === i && (
              <div className="context-finding-detail" role="status">
                <span className="mono">{title}</span>
                <p>{description}</p>
                <small>{action}</small>
                <b className="mono">ILLUSTRATIVE / HUMAN REVIEW REQUIRED</b>
                <button
                  aria-label="Close plan observation"
                  onClick={() => setSelected(null)}
                >
                  CLOSE ×
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
