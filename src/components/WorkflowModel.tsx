"use client";
import { ArchitecturalDrawing } from "./ArchitecturalDrawing";
import { StandardsNetwork } from "./StandardsNetwork";
import { PlanModel } from "./PlanModel";
export function WorkflowModel({
  phase,
  approved,
  alternative,
  onAlternative,
  onApprove,
  onReset,
}: {
  phase: number;
  approved: boolean;
  alternative: number;
  onAlternative: (n: number) => void;
  onApprove: () => void;
  onReset: () => void;
}) {
  return (
    <div
      className="review-scene"
      data-review-phase={phase}
      data-approved={approved}
    >
      <div className="review-building">
        <ArchitecturalDrawing />
        <div className="building-redline">
          <span>02 / CIRCULATION REVIEW</span>
        </div>
      </div>
      <div className="review-plan">
        <PlanModel
          layer={phase === 0 ? 0 : phase === 3 ? 4 : 3}
          highlight={alternative}
          proposal={
            phase >= 2 ? (alternative === 0 ? "corridor" : "door") : undefined
          }
          applied={approved}
        />
      </div>
      {phase === 0 && (
        <div className="review-scan mono">
          MODEL 001 / INSPECTING GEOMETRY
          <span className="scan-sweep" />
        </div>
      )}
      {phase === 1 && (
        <div className="review-explanation">
          <span className="mono">OBSERVATION 02 / CONTEXT</span>
          <p>
            Compare the east corridor and adjacent door against the configured
            project assumptions.
          </p>
          <span className="mono red">ILLUSTRATIVE / HUMAN REVIEW REQUIRED</span>
        </div>
      )}
      {phase === 2 && (
        <div className="review-proposal">
          <span className="mono">COMPARE PROPOSED CHANGE</span>
          <div className="alternative-controls">
            <button
              aria-pressed={alternative === 0}
              onClick={() => onAlternative(0)}
            >
              Adjust corridor ↗
            </button>
            <button
              aria-pressed={alternative === 1}
              onClick={() => onAlternative(1)}
            >
              Review door swing ↗
            </button>
          </div>
          <div className="drawing-legend mono">
            <span>┄ CURRENT GEOMETRY</span>
            <span>━ PROPOSED GEOMETRY</span>
          </div>
          <button
            className="button dark"
            disabled={approved}
            onClick={onApprove}
          >
            {approved ? "DEMO CHANGE APPROVED ✓" : "APPROVE WORKFLOW DEMO →"}
          </button>
          <small>
            Only this demonstration changes. No BIM application is connected.
          </small>
        </div>
      )}
      {phase === 3 && <StandardsNetwork />}
      {phase === 3 && (
        <div className="review-history">
          <span className="mono">REVIEW HISTORY / MODEL 001</span>
          <p>
            {approved
              ? "✓ Human approval recorded. The selected proposal is shown in its resolved demonstration state."
              : "Awaiting a human decision. Scrolling does not approve a change."}
          </p>
          <span className="mono">CRITERIA VERSION / DEMONSTRATION v0.1</span>
          <button className="text-button" onClick={onReset}>
            RESET WORKFLOW ↺
          </button>
        </div>
      )}
    </div>
  );
}
