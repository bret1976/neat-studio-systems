"use client";
import { useRef, useState } from "react";
import { PlanModel } from "./DrawingStories";
import { useDrawingStages } from "./useDrawingStages";
const names = ["Observation", "Recommendation", "Review", "Approval"];
export function DesignerControl() {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useDrawingStages(root, 4);
  const [approved, setApproved] = useState(false);
  return (
    <div className="approval-story" ref={root}>
      <div className="approval-sticky">
        <div className="approval-model">
          <PlanModel
            layer={step === 0 ? 3 : 4}
            highlight={0}
            proposal={step >= 1 ? "corridor" : undefined}
            applied={approved}
          />
        </div>
        <div className="approval-details">
          <ol className="approval-sequence">
            {names.map((t, i) => (
              <li key={t} data-current={step === i}>
                <button aria-pressed={step === i} onClick={() => setStep(i)}>
                  <span>0{i + 1}</span>
                  {t}
                  <b>{i === 3 ? "HUMAN DECISION" : "→"}</b>
                </button>
              </li>
            ))}
          </ol>
          <div className="approval-state" aria-live="polite">
            <span className="mono">
              {names[step].toUpperCase()} / DEMONSTRATION
            </span>
            <p>
              {
                [
                  "An observation is connected to its drawing region. Verify the assumptions before making a decision.",
                  "A proposed corridor adjustment is shown against the original geometry. Nothing is applied automatically.",
                  "Review the affected region and compare the two states. You decide whether the proposal should proceed.",
                  approved
                    ? "Human approval recorded in this local demonstration. The designer stays in control."
                    : "Awaiting your explicit approval. Reaching this step by scrolling does not authorize a change.",
                ][step]
              }
            </p>
            <button
              className="button dark"
              disabled={step < 2 || approved}
              onClick={() => {
                setApproved(true);
                setStep(3);
              }}
            >
              {approved ? "APPROVAL RECORDED ✓" : "AUTHORIZE DEMONSTRATION →"}
            </button>
            <button
              className="text-button"
              onClick={() => {
                setApproved(false);
                setStep(0);
              }}
            >
              RESET APPROVAL SEQUENCE ↺
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
