"use client";
import { useState } from "react";
import Link from "next/link";
import { PlanModel } from "./PlanModel";
export function ProductPreview({ control = false }: { control?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [approved, setApproved] = useState(false);
  return (
    <div className={`product-preview ${control ? "preview-control" : ""}`}>
      <PlanModel
        layer={3}
        highlight={selected}
        proposal={approved ? "corridor" : undefined}
        applied={approved}
      />
      {control && (
        <div className="preview-dashboard">
          <div className="preview-metrics">
            <span>
              08<small>OPEN</small>
            </span>
            <span>
              04<small>IN REVIEW</small>
            </span>
            <span>
              {approved ? "13" : "12"}
              <small>RESOLVED</small>
            </span>
          </div>
          <div className="mono">PROJECT ACTIVITY / NORTH COURT</div>
          {["Circulation review", "Door clearance", "Stair geometry"].map(
            (s, i) => (
              <button
                key={s}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                <span>0{i + 1}</span>
                {s}
                <b>↗</b>
              </button>
            ),
          )}
        </div>
      )}
      <div className="preview-popover">
        <div className="mono">
          ⌑ NEAT {control ? "CONTROL" : "ASSIST"} <span>− ×</span>
        </div>
        <p>
          {
            [
              "East corridor clearance",
              "Adjacent door swing",
              "Stair geometry",
            ][selected]
          }
        </p>
        <small>
          {approved
            ? "Human approval recorded in this demonstration."
            : "Review the model condition and compare a proposed adjustment."}
        </small>
        <div className="preview-response">
          {approved
            ? "✓ DEMO DECISION RECORDED"
            : "MODEL CONTEXT → GEOMETRY → REVIEW"}
        </div>
        <button onClick={() => setApproved(!approved)}>
          {approved ? "RESET DEMONSTRATION ↺" : "APPROVE DEMONSTRATION ↗"}
        </button>
        <Link href={control ? "/product/neat-control" : "/product/neat-assist"}>
          OPEN FULL WORKSPACE ↗
        </Link>
      </div>
      <span className="preview-tag mono">
        ILLUSTRATIVE PRODUCT STUDY / NO CONNECTED MODEL
      </span>
    </div>
  );
}
