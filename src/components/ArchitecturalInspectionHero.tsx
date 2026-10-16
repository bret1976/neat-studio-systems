"use client";
import { useRef, useState, PointerEvent } from "react";
import Link from "next/link";
import { DrawingOpening } from "./DrawingOpening";
import { observations } from "@/content/site";
import { ArchitecturalDrawing } from "./ArchitecturalDrawing";
import {
  intersects,
  normalizedPointer,
  selectionRect,
  Point,
  Region,
} from "@/lib/geometry";
export function ArchitecturalInspectionHero({
  compact = false,
}: {
  compact?: boolean;
}) {
  const Heading = compact ? "h2" : "h1";
  const canvas = useRef<HTMLDivElement>(null);
  const start = useRef<Point | null>(null);
  const [box, setBox] = useState<Region | null>(null);
  const [found, setFound] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [pointing, setPointing] = useState(false);
  const [coords, setCoords] = useState<Point>({ x: 0, y: 0 });
  const active = observations.find((o) => o.id === selected);
  function update(e: PointerEvent<HTMLDivElement>) {
    if (!canvas.current) return;
    const pt = normalizedPointer(
      e.clientX,
      e.clientY,
      canvas.current.getBoundingClientRect(),
    );
    setCoords(pt);
    if (start.current) {
      const rect = selectionRect(start.current, pt);
      setBox(rect);
      const ids = observations
        .filter((o) => intersects(rect, o.region))
        .map((o) => o.id);
      setFound((old) => Array.from(new Set([...old, ...ids])));
      if (ids.length) setSelected(ids[ids.length - 1]);
    }
  }
  function down(e: PointerEvent<HTMLDivElement>) {
    if (e.button !== 0 || (e.target as HTMLElement).closest("button,a")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = normalizedPointer(
      e.clientX,
      e.clientY,
      e.currentTarget.getBoundingClientRect(),
    );
    setBox({ ...start.current, w: 0, h: 0 });
  }
  function end(e: PointerEvent<HTMLDivElement>) {
    start.current = null;
    setBox(null);
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
  }
  function inspect(id: string) {
    setFound((old) => Array.from(new Set([...old, id])));
    setSelected(id);
  }
  return (
    <section
      className={`inspection-hero ${compact ? "compact" : ""}`}
      id="inspection"
      data-inspection-active={!!active}
    >
      {!compact && <DrawingOpening />}
      <div className="drawing-field ruled">
        <div className="field-meta">
          <span>
            FOCUS: INTELLIGENT MODEL REVIEW &amp; ARCHITECTURAL AUTOMATION
          </span>
          <span>BIM / DESIGN COORDINATION</span>
        </div>
        <div
          className="inspection-canvas"
          ref={canvas}
          onPointerEnter={() => setPointing(true)}
          onPointerLeave={() => setPointing(false)}
          onPointerDown={down}
          onPointerMove={update}
          onPointerUp={end}
          onPointerCancel={end}
          role="group"
          aria-label="Interactive architectural inspection drawing. Drag to discover observations, or use the observation buttons below."
        >
          <ArchitecturalDrawing eager />
          <span className="drawing-ruler ruler-top" aria-hidden="true" />
          <span className="drawing-ruler ruler-side" aria-hidden="true" />
          {observations.map((o, i) => (
            <button
              key={o.id}
              className={`observation-marker ${found.includes(o.id) ? "discovered" : ""}`}
              style={{
                left: `${o.region.x * 100}%`,
                top: `${o.region.y * 100}%`,
                width: `${o.region.w * 100}%`,
                height: `${o.region.h * 100}%`,
              }}
              aria-label={`Inspect ${o.title}`}
              aria-pressed={selected === o.id}
              onClick={() => inspect(o.id)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
          {pointing && (
            <span
              className="inspection-pointer mono"
              style={{ left: `${coords.x * 100}%`, top: `${coords.y * 100}%` }}
              aria-hidden="true"
            >
              X {Math.round(coords.x * 1200)}
              <br />Y {Math.round(coords.y * 700)}
            </span>
          )}
          {box && (
            <div
              className="selection-rectangle"
              data-testid="selection"
              style={{
                left: `${box.x * 100}%`,
                top: `${box.y * 100}%`,
                width: `${box.w * 100}%`,
                height: `${box.h * 100}%`,
              }}
            />
          )}
        </div>
        {active && (
          <div className="inspection-callout" aria-hidden="true">
            <span className="mono">{active.title}</span>
            <p>{active.description}</p>
            <small>ILLUSTRATIVE / HUMAN REVIEW REQUIRED</small>
          </div>
        )}
        <div className="field-bottom mono">
          <span>
            MODEL 001 / RESIDENTIAL STUDY
            <br />
            DRAWING STATUS / UNDER REVIEW
          </span>
          <span className="drag-instruction">
            <i />
            DRAG ACROSS THE DRAWING TO REVEAL DESIGN ISSUES.
          </span>
          <span>
            X:
            {Math.round(coords.x * 1200)
              .toString()
              .padStart(4, "0")}{" "}
            / Y:
            {Math.round(coords.y * 700)
              .toString()
              .padStart(3, "0")}
          </span>
        </div>
      </div>
      <div className="hero-caption">
        <Heading className="hero-title">
          YOUR DESIGN DESERVES
          <br />A SECOND SET OF EYES.
        </Heading>
        <div>
          <p>
            NEAT brings intelligent review, contextual design assistance, and
            controlled automation closer to where architectural decisions
            happen.
          </p>
          <p className="mono">DESIGN FREELY. BUILD INTELLIGENTLY.</p>
        </div>
        <Link
          className="technical-link red"
          href={compact ? "/product" : "#design-bottleneck"}
        >
          EXPLORE NEAT <span>↗</span>
        </Link>
      </div>
      <div className="inspection-tray">
        <div className="inspection-options">
          <span className="mono" aria-live="polite">
            DESIGN OBSERVATIONS / INTERACTIVE EXAMPLE
            <br />
            <strong data-testid="discovery-count">
              {found.length} / 04
            </strong>{" "}
            DISCOVERED
          </span>
          {observations.map((o, i) => (
            <button
              key={o.id}
              aria-pressed={selected === o.id}
              onClick={() => inspect(o.id)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {o.category}
              <b>{found.includes(o.id) ? "−" : "+"}</b>
            </button>
          ))}
          <button
            className="reset"
            onClick={() => {
              setFound([]);
              setSelected(null);
              setBox(null);
            }}
          >
            INSPECT AGAIN ↺
          </button>
        </div>
        <div className="observation-detail" aria-live="polite">
          {active ? (
            <>
              <span className="mono red">
                ILLUSTRATIVE OBSERVATION / {active.title}
              </span>
              <p>{active.description}</p>
              <small>{active.action}</small>
            </>
          ) : (
            <>
              <span className="mono">YOUR DESIGN. YOUR CONTROL.</span>
              <p>
                Inspect the model. Understand the issue. Evaluate the solution.
                Keep control of every change.
              </p>
              <small>
                Illustrative model review. These observations are examples for
                human review, not definitive compliance findings.
              </small>
            </>
          )}
          <Link href="/contact">REQUEST A DEMO ↗</Link>
        </div>
      </div>
    </section>
  );
}
