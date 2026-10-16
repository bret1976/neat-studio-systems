"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { phases } from "@/content/site";
import { WorkflowModel } from "./WorkflowModel";
gsap.registerPlugin(ScrollTrigger);
export function WorkflowJourney() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const scanner = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0),
    [approved, setApproved] = useState(false),
    [alternative, setAlternative] = useState(0);
  useEffect(() => {
    const rows = Array.from(
      root.current?.querySelectorAll<HTMLElement>(".journey-row") || [],
    );
    const reduced = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const triggers = rows.map((row, i) =>
      ScrollTrigger.create({
        trigger: row,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          if (reduced) setActive(i);
        },
        onEnterBack: () => {
          if (reduced) setActive(i);
        },
        onUpdate: (s) =>
          row.style.setProperty("--journey-progress", String(s.progress)),
      }),
    );

    let metrics: Array<{ top: number; height: number }> = [],
      top = 0,
      height = 0;
    let targetY = innerHeight * 0.4,
      currentY = targetY,
      last = performance.now();
    const measure = () => {
      if (!track.current) return;
      top = track.current.getBoundingClientRect().top + scrollY;
      height = track.current.offsetHeight;
      metrics = rows.map((row) => ({
        top: row.getBoundingClientRect().top + scrollY,
        height: row.offsetHeight,
      }));
    };
    const pointer = (e: PointerEvent) => {
      if (e.pointerType === "mouse") targetY = e.clientY;
    };
    const draw = () => {
      if (!scanner.current || !metrics.length) return;
      const now = performance.now(),
        delta = Math.min(0.1, (now - last) / 1000);
      last = now;
      currentY += (targetY - currentY) * (1 - Math.exp(-16 * delta));
      const local = Math.min(
        height - 20,
        Math.max(20, currentY + scrollY - top),
      );
      scanner.current.style.transform = `translate3d(0,${local - 24}px,0)`;
      const docY = scrollY + currentY;
      let closest = 0,
        distance = Infinity;
      metrics.forEach((m, i) => {
        const d = Math.abs(docY - (m.top + m.height * 0.43));
        if (d < distance) {
          distance = d;
          closest = i;
        }
        rows[i].style.setProperty(
          "--scanner-progress",
          String(Math.min(1, Math.max(0, (docY - m.top) / m.height))),
        );
      });
      const inside = docY >= top && docY <= top + height;
      const reading = inside && distance < metrics[closest].height * 0.42;
      scanner.current.style.setProperty(
        "--scanner-reading",
        reading ? "1" : "0",
      );
      scanner.current.style.opacity = inside ? "1" : "0";
      if (closest !== activeRef.current) {
        activeRef.current = closest;
        setActive(closest);
      }
    };
    measure();
    ScrollTrigger.addEventListener("refresh", measure);
    if (!reduced) {
      addEventListener("pointermove", pointer, { passive: true });
      gsap.ticker.add(draw);
    }
    return () => {
      triggers.forEach((t) => t.kill());
      ScrollTrigger.removeEventListener("refresh", measure);
      removeEventListener("pointermove", pointer);
      gsap.ticker.remove(draw);
    };
  }, []);
  return (
    <section className="workflow-journey" id="workflow" ref={root}>
      <div className="section-label">
        <span>06 / HOW NEAT WORKS</span>
        <span>FOUR CONNECTED STAGES</span>
      </div>
      <div className="section-heading">
        <h2>
          FROM OBSERVATION
          <br />
          TO ACTION.
        </h2>
        <p>
          NEAT is designed around a simple idea: the system should bring useful
          information to the designer, explain what matters, and leave every
          consequential decision under human control.
        </p>
      </div>
      <nav className="journey-progress mono" aria-label="Workflow stages">
        {phases.map((p, i) => (
          <a
            key={p.name}
            href={`#workflow-stage-${i}`}
            aria-current={active === i ? "step" : undefined}
          >
            0{i + 1} {p.name}
            <span>{active === i ? "−" : "+"}</span>
          </a>
        ))}
      </nav>
      <div className="journey-track" ref={track}>
        <div
          className="journey-scanner"
          ref={scanner}
          aria-hidden="true"
          data-stage={active}
        >
          <span className="journey-scanner-line" />
          <div
            key={active}
            className={`journey-scanner-caption side-${active % 2}`}
          >
            <strong>{phases[active].name}</strong>
            <span>{phases[active].title}</span>
            <i />
          </div>
        </div>
        {phases.map((p, i) => (
          <article
            className={`journey-row journey-row-${i} ruled`}
            id={`workflow-stage-${i}`}
            key={p.name}
            data-stage={i}
          >
            <WorkflowModel
              journey
              phase={i}
              approved={approved}
              alternative={alternative}
              onAlternative={setAlternative}
              onApprove={() => setApproved(true)}
              onReset={() => {
                setApproved(false);
                setAlternative(0);
              }}
            />
            <div className="journey-stage">
              <h3>{p.name}</h3>
              <p>{p.title}</p>
              <span>0{i + 1}</span>
            </div>
            <details className="journey-description">
              <summary>
                0{i + 1} / {p.status} <span>+</span>
              </summary>
              <p>{p.description}</p>
            </details>
          </article>
        ))}
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
