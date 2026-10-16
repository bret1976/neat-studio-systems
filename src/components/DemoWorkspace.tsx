"use client";
import { useState } from "react";
import { PlanModel } from "./PlanModel";
const issues = [
  "East corridor clearance",
  "Adjacent door swing",
  "Balcony protection",
  "Stair geometry",
];
const roles = ["Architect", "BIM Manager", "Interior Designer", "Engineer"];
const details = [
  [
    "Corridor / east wing",
    "Compare the available clear path with the configured project criteria. The solid line previews a corridor adjustment; the dashed line identifies the current geometry.",
  ],
  [
    "Door / east wing",
    "Review the adjacent door swing and approach. The proposed arc shows an alternative swing for comparison, subject to a designer’s review.",
  ],
  [
    "Balcony / level 02",
    "Inspect the balcony protection against the project’s adopted criteria. The highlighted region is an illustrative review location, not a confirmed violation.",
  ],
  [
    "Stair / north core",
    "Review riser consistency, tread depth, and the intended stair configuration. Confirm assumptions before issuing documentation.",
  ],
];
export function DemoWorkspace({
  control = false,
  view,
  onViewChange,
  mode,
  onModeChange,
}: {
  control?: boolean;
  view?: string;
  onViewChange?: (view: string) => void;
  mode?: number;
  onModeChange?: (mode: number) => void;
}) {
  const [selected, setSelected] = useState(0),
    [stage, setStage] = useState(0),
    [approved, setApproved] = useState<number[]>([]),
    [rejected, setRejected] = useState<number[]>([]),
    [internalTab, setInternalTab] = useState("observations"),
    [internalAssistMode, setInternalAssistMode] = useState(0),
    [before, setBefore] = useState(false),
    [criteria, setCriteria] = useState([true, true, true, true]),
    [assignments, setAssignments] = useState(roles);
  const tab = view ?? internalTab;
  const setTab = (next: string) => {
    setInternalTab(next);
    onViewChange?.(next);
  };
  const assistMode = mode ?? internalAssistMode;
  const setAssistMode = (next: number) => {
    setInternalAssistMode(next);
    onModeChange?.(next);
  };
  const done = approved.includes(selected),
    declined = rejected.includes(selected);
  const showProposal = !before && (stage > 0 || control);
  const approve = () => {
    setApproved((old) => Array.from(new Set([...old, selected])));
    setRejected((old) => old.filter((i) => i !== selected));
    if (!control) setStage(2);
  };
  return (
    <div
      className={`workspace ${control ? "control-workspace" : ""}`}
      data-active-view={control ? tab : assistMode}
    >
      <div className="workspace-bar mono">
        <span>⌑ NEAT {control ? "CONTROL" : "ASSIST"}</span>
        <span>NORTH COURT / DESIGN STUDY</span>
        <b>ILLUSTRATIVE DEMO</b>
      </div>
      {control ? (
        <div className="workspace-stats">
          {[
            ["OPEN OBSERVATIONS", 8 - approved.length - rejected.length],
            ["UNDER REVIEW", 4 + rejected.length],
            ["RESOLVED", 12 + approved.length],
          ].map(([a, b]) => (
            <div key={a}>
              <span className="mono">{a}</span>
              <strong>{String(b).padStart(2, "0")}</strong>
            </div>
          ))}
        </div>
      ) : (
        <div className="assist-modes" aria-label="Assist capabilities">
          {[
            "MODEL QUESTIONS",
            "DESIGN OBSERVATIONS",
            "SUGGESTED ACTIONS",
            "APPROVAL CONTROL",
          ].map((t, i) => (
            <button
              aria-pressed={assistMode === i}
              key={t}
              onClick={() => {
                setAssistMode(i);
                if (i >= 2) setStage((n) => Math.max(1, n));
              }}
            >
              <span>0{i + 1}</span>
              {t}
            </button>
          ))}
        </div>
      )}
      <div className="workspace-content">
        <div className="workspace-drawing">
          <PlanModel
            layer={done ? 4 : 3}
            highlight={selected}
            proposal={
              showProposal ? (selected === 1 ? "door" : "corridor") : undefined
            }
            applied={done}
          />
          <div className="model-view-controls mono">
            <button aria-pressed={before} onClick={() => setBefore(true)}>
              CURRENT
            </button>
            <button aria-pressed={!before} onClick={() => setBefore(false)}>
              PROPOSED
            </button>
          </div>
          <span className="mono drawing-status">
            MODEL STATUS / ILLUSTRATIVE DEMO · REGION 0{selected + 1}
          </span>
        </div>
        <div className="workspace-panel">
          {control ? (
            <>
              <div className="workspace-tabs" aria-label="Control views">
                {[
                  ["observations", "OBSERVATIONS"],
                  ["overview", "PROJECT"],
                  ["standards", "STANDARDS"],
                  ["team", "TEAM"],
                  ["history", `HISTORY (${approved.length + rejected.length})`],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    aria-pressed={tab === key}
                    onClick={() => setTab(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {tab === "history" ? (
                <div className="audit-history">
                  <h4>APPROVAL HISTORY</h4>
                  {!approved.length && !rejected.length ? (
                    <p>
                      No decisions recorded. Review an observation before
                      approving a demonstration change.
                    </p>
                  ) : (
                    <>
                      {approved.map((i) => (
                        <p key={i}>
                          ✓ {issues[i]} — demonstration approval recorded.
                        </p>
                      ))}
                      {rejected.map((i) => (
                        <p key={i}>
                          ↺ {issues[i]} — revision requested by the reviewer.
                        </p>
                      ))}
                    </>
                  )}
                  <button
                    className="text-button"
                    onClick={() => {
                      setApproved([]);
                      setRejected([]);
                    }}
                  >
                    CLEAR DEMO HISTORY ↺
                  </button>
                </div>
              ) : tab === "overview" ? (
                <div className="project-overview">
                  <span className="mono">PROJECT OVERVIEW / DEMONSTRATION</span>
                  <h4>NORTH COURT</h4>
                  <dl>
                    <dt>Model version</dt>
                    <dd>001 / Residential study</dd>
                    <dt>Drawing</dt>
                    <dd>Level 01 / A—101</dd>
                    <dt>Review criteria</dt>
                    <dd>
                      {criteria.filter(Boolean).length} enabled in this demo
                    </dd>
                    <dt>Decisions</dt>
                    <dd>
                      {approved.length} approved / {rejected.length} revision
                      requests
                    </dd>
                    <dt>Connection</dt>
                    <dd>Local demonstration only</dd>
                  </dl>
                  <button
                    className="button"
                    onClick={() => setTab("observations")}
                  >
                    OPEN MODEL REVIEW ↗
                  </button>
                </div>
              ) : tab === "standards" ? (
                <div className="standards-panel">
                  <span className="mono">CONFIGURABLE REVIEW CRITERIA</span>
                  <h4>PROJECT STANDARDS</h4>
                  <p>
                    Enable or disable illustrative review categories. No real
                    code rules or external model checks are run.
                  </p>
                  {[
                    "Circulation review",
                    "Door clearance review",
                    "Balcony protection review",
                    "Stair geometry review",
                  ].map((t, i) => (
                    <label key={t}>
                      <input
                        type="checkbox"
                        checked={criteria[i]}
                        onChange={() =>
                          setCriteria((old) =>
                            old.map((v, j) => (j === i ? !v : v)),
                          )
                        }
                      />
                      {t}
                      <span>{criteria[i] ? "ENABLED" : "OFF"}</span>
                    </label>
                  ))}
                  <p className="mono" role="status">
                    {criteria.filter(Boolean).length} OF 4 CRITERIA ENABLED /
                    DEMO v0.1
                  </p>
                </div>
              ) : tab === "team" ? (
                <div className="team-panel">
                  <span className="mono">
                    REVIEW ASSIGNMENTS / DEMONSTRATION
                  </span>
                  <h4>TEAM COORDINATION</h4>
                  <p>
                    Keep each review connected to a responsible role. These are
                    demonstration assignments, not real team members.
                  </p>
                  {issues.map((t, i) => (
                    <label key={t}>
                      {t}
                      <select
                        aria-label={`Assign ${t}`}
                        value={assignments[i]}
                        onChange={(e) =>
                          setAssignments((old) =>
                            old.map((v, j) => (j === i ? e.target.value : v)),
                          )
                        }
                      >
                        {roles.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              ) : (
                <>
                  <span className="mono sample-count">
                    SHOWING 04 OF 08 SAMPLE OBSERVATIONS
                  </span>
                  {issues.map((issue, i) => (
                    <button
                      className="issue-row"
                      aria-pressed={selected === i}
                      key={issue}
                      onClick={() => {
                        setSelected(i);
                        setBefore(false);
                      }}
                    >
                      <span>0{i + 1}</span>
                      {issue}
                      <b>
                        {approved.includes(i)
                          ? "✓"
                          : rejected.includes(i)
                            ? "↺"
                            : "↗"}
                      </b>
                    </button>
                  ))}
                  <div className="issue-detail">
                    <span className="mono red">
                      {done
                        ? "DEMO RESOLVED"
                        : declined
                          ? "REVISION REQUESTED"
                          : "REVIEW REQUIRED"}
                    </span>
                    <h4>{issues[selected]}</h4>
                    <span className="mono">
                      {details[selected][0]} / {assignments[selected]}
                    </span>
                    <p>{details[selected][1]}</p>
                    <div className="decision-buttons">
                      <button
                        className="button dark"
                        disabled={done}
                        onClick={approve}
                      >
                        {done ? "DEMO APPROVED ✓" : "APPROVE DEMONSTRATION →"}
                      </button>
                      <button
                        className="button"
                        disabled={declined}
                        onClick={() => {
                          setRejected((old) =>
                            Array.from(new Set([...old, selected])),
                          );
                          setApproved((old) =>
                            old.filter((i) => i !== selected),
                          );
                        }}
                      >
                        {declined ? "REVISION REQUESTED" : "REQUEST REVISION ↺"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <span className="mono">CONTEXTUAL MODEL ASSISTANT</span>
              {assistMode === 1 ? (
                <>
                  <h4 className="assistant-subheading">DESIGN OBSERVATIONS</h4>
                  {issues.slice(0, 2).map((t, i) => (
                    <button
                      key={t}
                      className="issue-row"
                      aria-pressed={selected === i}
                      onClick={() => setSelected(i)}
                    >
                      <span>0{i + 1}</span>
                      {t}
                      <b>↗</b>
                    </button>
                  ))}
                  <p className="demo-note">{details[selected][1]}</p>
                </>
              ) : assistMode === 3 ? (
                <div className="approval-mode">
                  <h4>
                    YOUR APPROVAL.
                    <br />
                    YOUR CONTROL.
                  </h4>
                  <p>
                    Compare the current and proposed drawing states before
                    authorizing the demonstration.
                  </p>
                  <p className="mono">SELECTED / {issues[selected]}</p>
                  <p className="mono" role="status">
                    {done
                      ? "APPROVED BY YOU IN THIS DEMO"
                      : "AWAITING EXPLICIT APPROVAL"}
                  </p>
                </div>
              ) : (
                <>
                  <div className="message user">
                    Review the main circulation corridor for potential clearance
                    issues.
                  </div>
                  <div className="message assistant">
                    <span className="mono red">
                      NEAT ASSIST / EXAMPLE RESPONSE
                    </span>
                    <p>
                      Two areas may need review. The east corridor appears
                      narrower than the configured minimum, and the adjacent
                      door may affect the required clear path. Would you like to
                      inspect both?
                    </p>
                  </div>
                  {stage >= 1 && (
                    <>
                      <div className="message user">Show me the options.</div>
                      <div className="message assistant">
                        <p>
                          I&apos;ve prepared two conceptual alternatives.
                          Compare the impact on the corridor and adjacent room
                          layouts before approving any change.
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
              {stage >= 1 && (
                <div className="alternative-controls">
                  {["Adjust corridor", "Review door swing"].map((s, i) => (
                    <button
                      key={s}
                      aria-pressed={selected === i}
                      onClick={() => {
                        setSelected(i);
                        setBefore(false);
                      }}
                    >
                      {s} ↗
                    </button>
                  ))}
                </div>
              )}
              {stage === 0 ? (
                <button
                  className="button dark"
                  onClick={() => {
                    setStage(1);
                    setAssistMode(2);
                  }}
                >
                  SHOW ME THE OPTIONS →
                </button>
              ) : (
                <button
                  className="button dark"
                  disabled={done}
                  onClick={approve}
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
                  setAssistMode(0);
                  setBefore(false);
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
