"use client";
import { useRef } from "react";
const names = ["REVIT", "RHINO", "ARCHICAD", "SKETCHUP", "IFC"];
export function SoftwareStrip() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) =>
    track.current?.scrollBy({
      left: direction * (track.current.clientWidth / 2),
      behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
        ? "instant"
        : "smooth",
    });
  return (
    <div className="software-carousel">
      <div className="software-carousel-label mono">
        <span>
          SOFTWARE INTERESTS
          <br />
          <small>FUTURE ADAPTERS / NOT LIVE INTEGRATIONS</small>
        </span>
        <div>
          <button
            aria-label="Previous software interests"
            onClick={() => move(-1)}
          >
            ←
          </button>
          <button aria-label="Next software interests" onClick={() => move(1)}>
            →
          </button>
        </div>
      </div>
      <div
        className="software-carousel-track"
        ref={track}
        tabIndex={0}
        role="region"
        aria-label="Software interests; scroll horizontally"
      >
        {names.map((name, i) => (
          <span key={name}>
            <b aria-hidden="true">{["⌑", "◇", "Λ", "▧", "⌘"][i]}</b>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
