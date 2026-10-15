"use client";
import { useState } from "react";
import { PlanModel } from "./DrawingStories";
const issues = [
  "East corridor clearance",
  "Adjacent door swing",
  "Balcony protection",
  "Stair geometry",
];
export function DemoWorkspace({ control = false }: { control?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState(0);
  const [approved, setApproved] = useState<number[]>([]);
  const [history, setHistory] = useState(false);
  const done = approved.includes(selected);
  return (
    <div className={`workspace ${control ? "control-workspace" : ""}`}>
      <div className="workspace-bar mono">
        <span>⌑ NEAT {control ? "CONTROL" : "ASSIST"}</span>
        <span>NORTH COURT / DESIGN STUDY</span>
        <b>ILLUSTRATIVE DEMO</b>
      </div>
      {control && (
        <div className="workspace-stats">
          {[
            ["OPEN OBSERVATIONS", 8 - approved.length],
            ["UNDER REVIEW", "04"],
            ["RESOLVED", 12 + approved.length],
          ].map(([a, b]) => (
            <div key={a}>
              <span className="mono">{a}</span>
              <strong>{String(b).padStart(2, "0")}</strong>
            </div>
          ))}
        </div>
      )}
      <div className="workspace-content">
        <div className="workspace-drawing">
          <PlanModel layer={done ? 4 : 3} highlight={selected % 3} />
          <span className="mono drawing-status">
            MODEL STATUS / ILLUSTRATIVE DEMO
          </span>
        </div>
        <div className="workspace-panel">
          {control ? (
            <>
              <div className="workspace-tabs">
                <button
                  aria-pressed={!history}
                  onClick={() => setHistory(false)}
                >
                  OBSERVATIONS
                </button>
                <button aria-pressed={history} onClick={() => setHistory(true)}>
                  HISTORY ({approved.length})
                </button>
              </div>
              {history ? (
                <div className="audit-history">
                  <h4>APPROVAL HISTORY</h4>
                  {approved.length ? (
                    approved.map((i) => (
                      <p key={i}>
                        ✓ {issues[i]} — demonstration approval recorded.
                      </p>
                    ))
                  ) : (
                    <p>
                      No decisions recorded. Review an observation before
                      approving a demonstration change.
                    </p>
                  )}
                </div>
              ) : (
                <>
                  {issues.map((issue, i) => (
                    <button
                      className="issue-row"
                      aria-pressed={selected === i}
                      key={issue}
                      onClick={() => setSelected(i)}
                    >
                      <span>0{i + 1}</span>
                      {issue}
                      <b>{approved.includes(i) ? "✓" : "↗"}</b>
                    </button>
                  ))}
                  <div className="issue-detail">
                    <span className="mono red">
                      {done ? "DEMO RESOLVED" : "REVIEW REQUIRED"}
                    </span>
                    <h4>{issues[selected]}</h4>
                    <p>
                      Review the highlighted region against the configured
                      project assumptions. No applicable code determination is
                      made by this demonstration.
                    </p>
                    <button
                      className="button dark"
                      disabled={done}
                      onClick={() => setApproved([...approved, selected])}
                    >
                      {done ? "DEMO APPROVED ✓" : "APPROVE DEMONSTRATION →"}
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <span className="mono">CONTEXTUAL MODEL ASSISTANT</span>
              <div className="message user">
                Review the main circulation corridor for potential clearance
                issues.
              </div>
              <div className="message assistant">
                <span className="mono red">NEAT ASSIST / EXAMPLE RESPONSE</span>
                <p>
                  Two areas may need review. The east corridor appears narrower
                  than the configured minimum, and the adjacent door may affect
                  the required clear path. Would you like to inspect both?
                </p>
              </div>
              {stage >= 1 && (
                <>
                  <div className="message user">Show me the options.</div>
                  <div className="message assistant">
                    <p>
                      I&apos;ve prepared two conceptual alternatives. Compare
                      the impact on the corridor and adjacent room layouts
                      before approving any change.
                    </p>
                  </div>
                  <div className="alternative-controls">
                    {["Adjust corridor", "Review door swing"].map((s, i) => (
                      <button
                        key={s}
                        aria-pressed={selected === i}
                        onClick={() => setSelected(i)}
                      >
                        {s} ↗
                      </button>
                    ))}
                  </div>
                </>
              )}
              {stage === 0 ? (
                <button className="button dark" onClick={() => setStage(1)}>
                  SHOW ME THE OPTIONS →
                </button>
              ) : (
                <button
                  className="button dark"
                  disabled={done}
                  onClick={() => {
                    setApproved([...approved, selected]);
                    setStage(2);
                  }}
                >
                  {done ? "DEMO CHANGE APPROVED ✓" : "APPROVE SELECTED DEMO →"}
                </button>
              )}
              <p className="demo-note">
                Local demonstration only. No AI service or BIM software is
                connected. Approval updates this preview, never an external
                model.
              </p>
              <button
                className="text-button"
                onClick={() => {
                  setStage(0);
                  setSelected(0);
                  setApproved([]);
                }}
              >
                RESET DEMONSTRATION ↺
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
