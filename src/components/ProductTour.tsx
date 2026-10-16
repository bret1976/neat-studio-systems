"use client";
import { useRef } from "react";
import { DemoWorkspace } from "./DemoWorkspace";
import { useDrawingStages } from "./useDrawingStages";
const controlViews = [
  [
    "overview",
    "REVIEW OVERVIEW",
    "A structured picture of open, reviewed, and resolved observations.",
  ],
  [
    "observations",
    "ISSUE PRIORITIZATION",
    "Focus attention on matters most relevant to the project.",
  ],
  [
    "history",
    "APPROVAL HISTORY",
    "Record proposed changes, decisions, and review outcomes.",
  ],
  [
    "team",
    "TEAM COORDINATION",
    "Keep project observations connected to assigned responsibilities.",
  ],
  [
    "standards",
    "PROJECT STANDARDS",
    "Organize configurable requirements and internal design criteria.",
  ],
];
const assistViews = [
  [
    "questions",
    "MODEL QUESTIONS",
    "Ask contextual questions about the active design and available project information.",
  ],
  [
    "observations",
    "DESIGN OBSERVATIONS",
    "Review potential geometric, coordination, or compliance-related concerns.",
  ],
  [
    "actions",
    "SUGGESTED ACTIONS",
    "Explore proposed adjustments and understand what each change would affect.",
  ],
  [
    "approval",
    "APPROVAL CONTROL",
    "Keep consequential model changes subject to explicit authorization.",
  ],
];
export function ProductTour({ control = false }: { control?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const views = control ? controlViews : assistViews;
  const [stage, setStage] = useDrawingStages(root, views.length, true);
  return (
    <div
      className={`product-tour ${control ? "tour-control" : "tour-assist"}`}
      ref={root}
      style={{ "--tour-stages": views.length } as React.CSSProperties}
    >
      <div className="product-tour-sticky">
        <div className="product-tour-nav" aria-label="Product feature tour">
          {views.map(([, label], i) => (
            <button
              key={label}
              aria-pressed={stage === i}
              onClick={() => setStage(i)}
            >
              <span>0{i + 1}</span>
              {label}
            </button>
          ))}
        </div>
        <div className="tour-caption" aria-live="polite">
          <h2>{views[stage][1]}</h2>
          <p>{views[stage][2]}</p>
        </div>
        <DemoWorkspace
          control={control}
          view={control ? views[stage][0] : undefined}
          onViewChange={(view) => {
            const index = views.findIndex((v) => v[0] === view);
            if (index >= 0) setStage(index);
          }}
          mode={!control ? stage : undefined}
          onModeChange={setStage}
        />
      </div>
    </div>
  );
}
