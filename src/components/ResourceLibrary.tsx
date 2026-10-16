"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
const notes = [
  {
    category: "Design Workflows",
    title: "PRECISION WITHOUT REPETITION.",
    copy: "Build a repeatable review process without turning every design decision into a routine task.",
    url: "/resources/design-workflows",
    image: "/drawings/tower.svg",
  },
  {
    category: "Model Review",
    title: "CONTEXT BEFORE CONCLUSIONS.",
    copy: "Keep geometry, requirements, professional judgment, and traceable assumptions connected.",
    url: "/resources/model-review",
    image: "/drawings/plan.svg",
  },
  {
    category: "Approval Systems",
    title: "YOUR DESIGN. YOUR CONTROL.",
    copy: "Make the proposed change clear before it becomes an action.",
    url: "/resources/approval-systems",
    image: "/drawings/elevation.svg",
  },
];
export function ResourceLibrary() {
  const [category, setCategory] = useState("All");
  const shown = notes.filter(
    (n) => category === "All" || n.category === category,
  );
  return (
    <div className="resource-library">
      <div className="resource-filters" aria-label="Resource categories">
        {["All", "Design Workflows", "Model Review", "Approval Systems"].map(
          (t) => (
            <button
              key={t}
              aria-pressed={category === t}
              onClick={() => setCategory(t)}
            >
              {t}
            </button>
          ),
        )}
      </div>
      <p className="mono resource-count" role="status">
        {shown.length} ORIGINAL NEAT {shown.length === 1 ? "NOTE" : "NOTES"}
      </p>
      <div className="resource-grid">
        {shown.map((note, i) => (
          <Link className="resource-card" key={note.url} href={note.url}>
            <div className={`resource-art art-${i}`}>
              <Image
                src={note.image}
                alt="Original NEAT architectural study"
                width={1000}
                height={700}
                unoptimized
              />
              <span aria-hidden="true" />
            </div>
            <span className="mono">{note.category} / FIELD NOTES</span>
            <h2>{note.title}</h2>
            <p>{note.copy}</p>
            <span className="technical-link">
              READ NOTE <b>↗</b>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
