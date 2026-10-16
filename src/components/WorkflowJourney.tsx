"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { phases } from "@/content/site";
import { WorkflowModel } from "./WorkflowModel";
gsap.registerPlugin(ScrollTrigger);
export function WorkflowJourney() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0),
    [approved, setApproved] = useState(false),
    [alternative, setAlternative] = useState(0);
  useEffect(() => {
    const rows = root.current?.querySelectorAll<HTMLElement>(".journey-row");
    const triggers = Array.from(rows || []).map((row, i) =>
      ScrollTrigger.create({
        trigger: row,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
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
      {phases.map((p, i) => (
        <article
          className={`journey-row journey-row-${i} ruled`}
          id={`workflow-stage-${i}`}
          key={p.name}
          data-stage={i}
        >
          <WorkflowModel
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
