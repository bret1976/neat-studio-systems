"use client";
import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchitecturalDrawing } from "./ArchitecturalDrawing";
import { phases } from "@/content/site";
gsap.registerPlugin(ScrollTrigger);
export function PlanModel({
  layer = 0,
  highlight = 0,
}: {
  layer?: number;
  highlight?: number;
}) {
  return (
    <div className="plan-model">
      <ArchitecturalDrawing plan />
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
            x={highlight === 1 ? 640 : 330}
            y={highlight === 2 ? 460 : 200}
            width="100"
            height="90"
          />
          <circle
            cx={highlight === 1 ? 650 : 350}
            cy={highlight === 2 ? 460 : 200}
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
            REVIEW REGION / 02
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
      </svg>
    </div>
  );
}
export function DesignContext() {
  const root = useRef<HTMLElement>(null);
  const [layer, setLayer] = useState(0);
  useEffect(() => {
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      matchMedia("(max-width: 760px)").matches
    )
      return;
    const t = ScrollTrigger.create({
      trigger: root.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setLayer(Math.min(4, Math.floor(self.progress * 5))),
    });
    return () => t.kill();
  }, []);
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
        <PlanModel layer={layer} />
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
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      matchMedia("(max-width: 760px)").matches
    )
      return;
    const t = ScrollTrigger.create({
      trigger: root.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setPhase(Math.min(3, Math.floor(self.progress * 4))),
    });
    return () => t.kill();
  }, []);
  const p = phases[phase];
  return (
    <section className="workflow story-section" id="workflow" ref={root}>
      <div className="story-sticky ruled" data-phase={phase}>
        <div className="section-label">
          <span>04 / HOW NEAT WORKS</span>
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
          <ArchitecturalDrawing />
          <div className={`workflow-region phase-${phase}`}>
            <span>{phase === 3 ? "✓" : "02"}</span>
          </div>
          {phase >= 1 && (
            <div className="workflow-callout">
              <span className="mono">{p.status}</span>
              <p>{p.note}</p>
              {phase === 2 && (
                <span className="approval-tag">HUMAN APPROVAL REQUIRED</span>
              )}
            </div>
          )}
          <div className="scan-line" />
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
          <h3>{p.title}</h3>
          <p>{p.description}</p>
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
