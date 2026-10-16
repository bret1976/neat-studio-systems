"use client";
import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { phases } from "@/content/site";
import { useDrawingStages } from "./useDrawingStages";
import { WorkflowModel } from "./WorkflowModel";
gsap.registerPlugin(ScrollTrigger);
import { PlanModel } from "./PlanModel";
export { PlanModel } from "./PlanModel";
export function DesignContext() {
  const root = useRef<HTMLElement>(null);
  const [layer, setLayer] = useDrawingStages(root, 5);
  return (
    <section className="context-story story-section" ref={root} id="context">
      <div className="story-sticky ruled">
        <div className="section-label">
          <span>03 / INTELLIGENCE WITH CONTEXT</span>
          <span>THE PROJECT IS A SYSTEM.</span>
        </div>
        <div className="context-title">
          <h2>
            THE DRAWING
            <br />
            IS MORE THAN LINES.
          </h2>
          <p>
            A wall is connected to a room. A room is connected to an occupancy.
            An occupancy influences circulation, accessibility, life safety, and
            technical requirements.
          </p>
        </div>
        <div className="context-model-stage">
          <span className="context-interstitial" aria-hidden="true">
            <span>
              INTELLIGENCE INSIDE
              <br />
              THE DRAWING.
            </span>
            <span>
              THE PROJECT
              <br />
              IS A SYSTEM.
            </span>
          </span>
          <PlanModel layer={layer} assembly />
          <div className="context-flow-copy">
            <span className="mono">INTELLIGENCE WITH CONTEXT</span>
            <h3>
              THE BETTER THE CONTEXT,
              <br />
              THE BETTER THE DECISION.
            </h3>
            <p>
              GEOMETRY — Understand the spatial relationships within the model.
            </p>
            <p>
              REQUIREMENTS — Compare relevant design conditions against
              configured review criteria.
            </p>
            <p>
              DECISIONS — Keep observations, recommendations, and approvals
              connected to their context.
            </p>
          </div>
        </div>
        <div className="layer-controls" aria-label="Drawing layers">
          {["WALLS", "GEOMETRY", "CIRCULATION", "REVIEW", "DECISIONS"].map(
            (l, i) => (
              <button
                key={l}
                aria-pressed={layer === i}
                onClick={() => setLayer(i)}
              >
                <span>0{i + 1}</span>
                {l}
              </button>
            ),
          )}
        </div>
        <div className="context-note">
          <span className="mono">LAYER 0{layer + 1} / 05</span>
          <p>
            {
              [
                "Good design decisions depend on understanding these relationships.",
                "GEOMETRY — Understand the spatial relationships within the model.",
                "REQUIREMENTS — Compare relevant design conditions against configured review criteria.",
                "Review observations remain connected to the drawing.",
                "DECISIONS — Keep observations, recommendations, and approvals connected to their context.",
              ][layer]
            }
          </p>
        </div>
      </div>
      <div className="story-after">
        <p>
          NEAT is envisioned as an intelligence layer capable of combining model
          geometry, project context, review criteria, and team preferences into
          a more connected workflow.
        </p>
        <h3>
          THE BETTER THE CONTEXT,
          <br />
          THE BETTER THE DECISION.
        </h3>
      </div>
    </section>
  );
}
export function WorkflowStory() {
  const root = useRef<HTMLElement>(null);
  const [phase, setPhase] = useDrawingStages(root, 4);
  const [approved, setApproved] = useState(false);
  const [alternative, setAlternative] = useState(0);
  const p = phases[phase];
  return (
    <section className="workflow story-section" id="workflow" ref={root}>
      <div className="story-sticky ruled" data-phase={phase}>
        <div className="section-label">
          <span>06 / HOW NEAT WORKS</span>
          <span>ILLUSTRATIVE WORKFLOW / NO CONNECTED MODEL</span>
        </div>
        <div className="workflow-heading">
          <h2>
            FROM OBSERVATION
            <br />
            TO ACTION.
          </h2>
          <p>
            NEAT is designed around a simple idea: the system should bring
            useful information to the designer, explain what matters, and leave
            every consequential decision under human control.
          </p>
        </div>
        <div className="workflow-visual">
          <WorkflowModel
            phase={phase}
            approved={approved}
            alternative={alternative}
            onAlternative={setAlternative}
            onApprove={() => setApproved(true)}
            onReset={() => {
              setApproved(false);
              setAlternative(0);
              setPhase(0);
            }}
          />
          <div className={`workflow-stage-bar side-${phase % 2}`}>
            <span>{p.name}</span>
            <span>{p.title}</span>
          </div>
        </div>
        <div className="phase-nav" aria-label="Workflow stages">
          {phases.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setPhase(i)}
              aria-pressed={phase === i}
            >
              <span>0{i + 1}</span>
              {s.name}
              <b>{phase === i ? "−" : "+"}</b>
            </button>
          ))}
        </div>
        <div className="phase-caption" aria-live="polite">
          <details>
            <summary>
              PHASE DETAILS <span>+</span>
            </summary>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </details>
        </div>
      </div>
      <div className="story-after">
        <h3>
          YOUR MODEL. YOUR DECISIONS.
          <br />
          MORE CLARITY AT EVERY STEP.
        </h3>
      </div>
    </section>
  );
}
export function InkTransformation({ closing = false }: { closing?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const mask = useRef<SVGCircleElement>(null);
  const [value, setValue] = useState(0);
  const manual = useRef(false);
  const id = useId().replaceAll(":", "");
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = ScrollTrigger.create({
      trigger: root.current,
      start: "top 80%",
      end: "bottom 35%",
      scrub: true,
      onUpdate: (self) => {
        if (manual.current) return;
        setValue(Math.round(self.progress * 100));
        mask.current?.setAttribute("r", String(self.progress * 1200));
      },
    });
    return () => t.kill();
  }, []);
  return (
    <div
      className={`ink-transformation ${closing ? "closing-ink" : ""}`}
      ref={root}
    >
      <svg
        viewBox="0 0 1500 1000"
        role="img"
        aria-label="Original North Court building transforms from a line sketch to a rendered visualization"
      >
        <defs>
          <filter
            id={`ink-filter-${id}`}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".018 .025"
              numOctaves="3"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="85"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="1.3" />
          </filter>
          <mask id={`ink-${id}`}>
            <circle
              ref={mask}
              cx="750"
              cy="500"
              r="0"
              fill="white"
              filter={`url(#ink-filter-${id})`}
            />
          </mask>
        </defs>
        <image
          href="/images/north-court-sketch.webp"
          x="0"
          y="0"
          width="1500"
          height="1000"
          preserveAspectRatio="xMidYMid slice"
        />
        <image
          href="/images/north-court-render.webp"
          x="0"
          y="0"
          width="1500"
          height="1000"
          preserveAspectRatio="xMidYMid slice"
          mask={`url(#ink-${id})`}
        />
      </svg>
      <div className="ink-controls mono">
        <span>DRAWING → DESIGN / {value.toString().padStart(3, "0")}%</span>
        <label>
          EXPLORE TRANSFORMATION
          <input
            aria-label="Drawing to render transformation"
            type="range"
            min="0"
            max="100"
            value={value}
            onFocus={() => {
              manual.current = true;
            }}
            onBlur={() => {
              manual.current = false;
            }}
            onChange={(e) => {
              manual.current = true;
              const n = Number(e.target.value);
              setValue(n);
              mask.current?.setAttribute("r", String(n * 12));
            }}
          />
        </label>
      </div>
    </div>
  );
}
